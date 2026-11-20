import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogCategory } from '@/lib/data/blog';
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

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const articles = await getAllBlogArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return NextResponse.json({ ok: false, error: 'Article not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, article });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
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
          { ok: false, error: 'Unauthorized blog update request.' },
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

    const { slug } = await context.params;
    const body = await req.json();
    const articles = await getAllBlogArticles();
    const idx = articles.findIndex((a) => a.slug === slug);

    if (idx === -1) {
      return NextResponse.json({ ok: false, error: 'Article not found.' }, { status: 404 });
    }

    const existing = articles[idx];
    const titleEn =
      typeof body.titleEn === 'string'
        ? sanitizeSingleLine(body.titleEn, 200)
        : existing.en.title;
    const excerptEn =
      typeof body.excerptEn === 'string'
        ? sanitizeSingleLine(body.excerptEn, 500)
        : existing.en.excerpt;
    const contentEnRaw =
      typeof body.contentEn === 'string'
        ? body.contentEn.trim().slice(0, 30000)
        : existing.en.content.join('\n\n');

    const titleSw =
      typeof body.titleSw === 'string'
        ? sanitizeSingleLine(body.titleSw, 200)
        : existing.sw.title;
    const excerptSw =
      typeof body.excerptSw === 'string'
        ? sanitizeSingleLine(body.excerptSw, 500)
        : existing.sw.excerpt;
    const contentSwRaw =
      typeof body.contentSw === 'string'
        ? body.contentSw.trim().slice(0, 30000)
        : existing.sw.content.join('\n\n');

    const category = VALID_CATEGORIES.includes(body.category)
      ? (body.category as BlogCategory)
      : existing.category;

    const updatedArticle = {
      ...existing,
      category,
      en: {
        ...existing.en,
        title: titleEn,
        excerpt: excerptEn,
        content: contentEnRaw
          .split(/\n{2,}|\n/)
          .map((p: string) => p.trim())
          .filter(Boolean),
      },
      sw: {
        ...existing.sw,
        title: titleSw || titleEn,
        excerpt: excerptSw || excerptEn,
        content: (contentSwRaw || contentEnRaw)
          .split(/\n{2,}|\n/)
          .map((p: string) => p.trim())
          .filter(Boolean),
      },
    };

    const nextList = [...articles];
    nextList[idx] = updatedArticle;
    await saveBlogArticles(nextList);
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ ok: true, article: updatedArticle });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to update article.' },
      { status: 500 }
    );
  }
}
