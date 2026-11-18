import type { Metadata } from 'next';
import { getAllBlogArticles } from '@/lib/server/store';
import BlogListClient from '@/components/pages/BlogListClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog — Web Development, AI Chatbots & SEO Insights',
  description:
    'Read practical guides on business websites, AI chatbot lead generation, customer support automation, modern design trends, and SEO growth.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Insights & Engineering Journal | Charles Websites',
    description:
      'Actionable guides on building high-converting websites, integrating AI chatbots, and growing your online visibility.',
  },
};

export default async function BlogPage() {
  const articles = await getAllBlogArticles();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);
  const collectionSchema = buildWebPageSchema({
    type: 'CollectionPage',
    name: 'Blog — Web Development, AI Chatbots & SEO Insights',
    description:
      'Actionable guides on business websites, AI chatbots, customer support automation, and SEO growth.',
    path: '/blog',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BlogListClient initialArticles={articles} />
    </>
  );
}
