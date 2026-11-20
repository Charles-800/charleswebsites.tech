import type { Metadata } from 'next';
import { getAllBlogArticles, getAllCertifications } from '@/lib/server/store';
import HomeClient from '@/components/home/HomeClient';
import { buildFaqSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { getSiteBaseUrl } from '@/lib/config/site';
import { TRANSLATIONS } from '@/lib/i18n/translations';

export const revalidate = 60;

const siteBaseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: {
    absolute: 'Website Design & Web Development Kenya | Charles Websites',
  },
  description:
    'Custom website design, web development, e-commerce M-Pesa stores, AI chatbots, graphic branding, and SEO in Kenya starting at KES 39,890.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Website Design & Web Development Kenya | Charles Websites',
    description:
      'Custom business websites, AI chatbots, e-commerce stores, and technical SEO serving Nairobi, Mombasa, Nanyuki, Kisumu, Nakuru, and worldwide.',
    url: siteBaseUrl,
    type: 'website',
    images: [
      {
        url: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
        alt: 'Charles Websites — Website Design & Web Development Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design & Web Development Kenya | Charles Websites',
    description:
      'Custom websites, AI chatbots, M-Pesa e-commerce, and technical SEO starting at KES 39,890.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default async function HomePage() {
  const [articles, certifications] = await Promise.all([
    getAllBlogArticles(),
    getAllCertifications(),
  ]);

  const homePageSchema = buildWebPageSchema({
    name: 'Website Design & Web Development Kenya | Charles Websites',
    description:
      'Custom business websites, Android & iOS apps, AI chatbots, M-Pesa integrations, and technical SEO in Kenya.',
    path: '/',
  });

  const faqSchema = buildFaqSchema(TRANSLATIONS.en.servicesPage.faqs.slice(0, 6));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient
        recentArticles={articles.slice(0, 3)}
        initialCertifications={certifications}
      />
    </>
  );
}
