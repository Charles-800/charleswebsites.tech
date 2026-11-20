import type { Metadata } from 'next';
import { getAllBlogArticles } from '@/lib/server/store';
import BlogListClient from '@/components/pages/BlogListClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { getSiteBaseUrl } from '@/lib/config/site';

export const revalidate = 60;

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Web Design, AI & SEO Insights Blog',
  description:
    'Practical guides on website pricing in Kenya, M-Pesa e-commerce, Core Web Vitals speed, AI chatbots, Google ranking factors, and industry web design.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Web Design, AI & SEO Insights Blog | Charles Websites',
    description:
      'Actionable guides on building fast business websites, M-Pesa integrations, AI chatbots, and technical SEO in Kenya.',
    url: `${baseUrl}/blog`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design, AI & SEO Insights Blog | Charles Websites',
    description:
      'Actionable guides on website design, M-Pesa payments, AI chatbots, and Google SEO in Kenya.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
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
