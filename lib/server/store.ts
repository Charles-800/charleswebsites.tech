import { promises as fs } from 'fs';
import path from 'path';
import { BlogArticle, INITIAL_BLOG_ARTICLES } from '@/lib/data/blog';
import { CertificationItem, INITIAL_CERTIFICATIONS } from '@/lib/data/certifications';

export interface ContactInquiry {
  id: string;
  recipientEmail: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceRequired: string;
  budgetRange: string;
  projectDescription: string;
  locale: 'en' | 'sw';
  createdAt: string;
  emailDelivered: boolean;
  forwardedToWebhook: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const CERTIFICATIONS_FILE = path.join(DATA_DIR, 'certifications.json');
export const CERTIFICATIONS_UPLOAD_DIR = path.join(DATA_DIR, 'certifications-uploads');

// In-memory fallback in case the runtime filesystem is read-only
let memoryBlogCache: BlogArticle[] | null = null;
let memoryCertificationsCache: CertificationItem[] | null = null;

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function ensureCertificationsUploadDir(): Promise<void> {
  await fs.mkdir(CERTIFICATIONS_UPLOAD_DIR, { recursive: true });
}

export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  if (memoryBlogCache && memoryBlogCache.length > 0) {
    return [...memoryBlogCache].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  try {
    await ensureDataDir();
    const raw = await fs.readFile(BLOG_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as BlogArticle[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryBlogCache = parsed;
      return [...parsed].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
  } catch {
    // File does not exist yet — seed from initial articles
    try {
      await ensureDataDir();
      await fs.writeFile(BLOG_FILE, JSON.stringify(INITIAL_BLOG_ARTICLES, null, 2), 'utf-8');
    } catch {
      // Ignore write error on read-only FS; use memory cache
    }
  }

  memoryBlogCache = INITIAL_BLOG_ARTICLES;
  return [...INITIAL_BLOG_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const articles = await getAllBlogArticles();
  return articles.find((item) => item.slug === slug) ?? null;
}

export async function saveBlogArticles(articles: BlogArticle[]): Promise<BlogArticle[]> {
  memoryBlogCache = articles;
  await ensureDataDir();
  await fs.writeFile(BLOG_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  return articles;
}

export async function getAllCertifications(): Promise<CertificationItem[]> {
  if (memoryCertificationsCache) {
    return [...memoryCertificationsCache];
  }

  try {
    await ensureDataDir();
    const raw = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as CertificationItem[];
    if (Array.isArray(parsed)) {
      memoryCertificationsCache = parsed;
      return [...parsed];
    }
  } catch {
    // File does not exist yet — initialize strictly empty array
    try {
      await ensureDataDir();
      await fs.writeFile(
        CERTIFICATIONS_FILE,
        JSON.stringify(INITIAL_CERTIFICATIONS, null, 2),
        'utf-8'
      );
    } catch {
      // Ignore write error on read-only FS; use memory cache
    }
  }

  memoryCertificationsCache = INITIAL_CERTIFICATIONS;
  return [...INITIAL_CERTIFICATIONS];
}

export async function saveCertifications(
  items: CertificationItem[]
): Promise<CertificationItem[]> {
  memoryCertificationsCache = items;
  await ensureDataDir();
  await fs.writeFile(CERTIFICATIONS_FILE, JSON.stringify(items, null, 2), 'utf-8');
  return items;
}

export async function saveContactInquiry(inquiry: ContactInquiry): Promise<void> {
  await ensureDataDir();
  let existing: ContactInquiry[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.unshift(inquiry);
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}
