import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogArticle, BlogCategory } from '@/lib/data/blog';
import { getAllBlogArticles, saveBlogArticles } from '@/lib/server/store';
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  sanitizeSingleLine,
} from '@/lib/server/security';

const VALID_CATEGORIES: BlogCategory[] = [
  'Web Development',
  'AI Engineering',
  'SEO & Growth',
  'Design & UX',
];

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET() {
  try {
    const articles = await getAllBlogArticles();
    return NextResponse.json({ ok: true, articles });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to load blog articles.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden request origin.' },
        { status: 403 }
      );
    }

    const adminKey = process.env.BLOG_ADMIN_KEY?.trim();
    if (adminKey) {
      const authHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
      if (authHeader !== adminKey) {
        return NextResponse.json(
          { ok: false, error: 'Unauthorized blog publish request.' },
          { status: 401 }
        );
      }
    }

    const rate = checkRateLimit('blog-write', getClientIp(req), 15, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const titleEn =
      typeof body.titleEn === 'string' ? sanitizeSingleLine(body.titleEn, 200) : '';
    const excerptEn =
      typeof body.excerptEn === 'string' ? sanitizeSingleLine(body.excerptEn, 500) : '';
    const contentEnRaw =
      typeof body.contentEn === 'string' ? body.contentEn.trim().slice(0, 30000) : '';
    const titleSw =
      typeof body.titleSw === 'string' ? sanitizeSingleLine(body.titleSw, 200) : '';
    const excerptSw =
      typeof body.excerptSw === 'string' ? sanitizeSingleLine(body.excerptSw, 500) : '';
    const contentSwRaw =
      typeof body.contentSw === 'string' ? body.contentSw.trim().slice(0, 30000) : '';
    const category = VALID_CATEGORIES.includes(body.category)
      ? (body.category as BlogCategory)
      : 'Web Development';
    const featuredImage =
      typeof body.featuredImage === 'string' &&
      /^\/images\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp)$/.test(body.featuredImage)
        ? body.featuredImage
        : '/images/blog_business_website_1794830658161.jpg';

    if (titleEn.length < 4 || excerptEn.length < 15 || contentEnRaw.length < 30) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid title, excerpt, and article body.' },
        { status: 400 }
      );
    }

    const baseSlug = toSlug(typeof body.slug === 'string' && body.slug ? body.slug : titleEn);
    const articles = await getAllBlogArticles();
    const uniqueSlug = articles.some((a) => a.slug === baseSlug)
      ? `${baseSlug}-${Date.now().toString(36)}`
      : baseSlug;

    const paragraphsEn = contentEnRaw
      .split(/\n{2,}|\n/)
      .map((p: string) => p.trim())
      .filter(Boolean);
    const paragraphsSw = (contentSwRaw || contentEnRaw)
      .split(/\n{2,}|\n/)
      .map((p: string) => p.trim())
      .filter(Boolean);

    const wordCount = contentEnRaw.split(/\s+/).length;
    const readTimeMinutes = Math.max(2, Math.ceil(wordCount / 180));

    const newArticle: BlogArticle = {
      slug: uniqueSlug,
      category,
      publishedAt: new Date().toISOString().slice(0, 10),
      readTimeMinutes,
      featuredImage,
      author: 'Charles Websites Editorial',
      en: {
        title: titleEn,
        excerpt: excerptEn,
        content: paragraphsEn,
        imageAlt: titleEn,
      },
      sw: {
        title: titleSw || titleEn,
        excerpt: excerptSw || excerptEn,
        content: paragraphsSw,
        imageAlt: titleSw || titleEn,
      },
    };

    const updated = [newArticle, ...articles];
    await saveBlogArticles(updated);
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ ok: true, article: newArticle }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not save the new blog article.' },
      { status: 500 }
    );
  }
}
