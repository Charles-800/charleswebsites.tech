import type { Metadata } from 'next';
import { getAllBlogArticles, getAllCertifications } from '@/lib/server/store';
import HomeClient from '@/components/home/HomeClient';
import { buildWebPageSchema } from '@/lib/seo/schema';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Charles Websites — Web Development & AI Engineering Agency',
  description:
    'We build websites, engineer intelligence, and grow businesses. Custom web development, Android & iOS apps, AI chatbots, SEO, and transparent KES pricing.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const [articles, certifications] = await Promise.all([
    getAllBlogArticles(),
    getAllCertifications(),
  ]);
  const homePageSchema = buildWebPageSchema({
    name: 'Charles Websites — Web Development & AI Engineering Agency',
    description:
      'Custom business websites, Android & iOS apps, AI chatbots, M-Pesa integrations, and SEO in Kenya.',
    path: '/',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <HomeClient
        recentArticles={articles.slice(0, 3)}
        initialCertifications={certifications}
      />
    </>
  );
}
