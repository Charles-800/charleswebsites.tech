import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogArticles, getBlogArticleBySlug } from '@/lib/server/store';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';
import BlogPostClient from '@/components/pages/BlogPostClient';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.en.title,
    description: article.en.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.en.title,
      description: article.en.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [article.featuredImage],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const allArticles = await getAllBlogArticles();
  const relatedArticles = allArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const baseUrl = getSiteBaseUrl();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.en.title,
    description: article.en.excerpt,
    image: `${baseUrl}${article.featuredImage}`,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/aistudio/CHARLES_WEBSITES_91d4851c.png`,
      },
    },
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: article.en.title, path: `/blog/${article.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
