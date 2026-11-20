import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';
import { getAllCertifications } from '@/lib/server/store';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { getSiteBaseUrl } from '@/lib/config/site';

export const revalidate = 60;

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'About Us — Web Developer & AI Agency',
  description:
    'Learn about Charles Websites, a web design, mobile app, and AI engineering agency serving businesses across Nairobi, Mombasa, Nanyuki, Kisumu, Nakuru, and worldwide.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us — Web Developer & AI Agency | Charles Websites',
    description:
      'Custom web development, Android & iOS apps, practical AI engineering, and transparent KES solutions across Kenya and globally.',
    url: `${baseUrl}/about`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — Web Developer & AI Agency | Charles Websites',
    description:
      'Discover how Charles Websites builds fast websites, AI chatbots, and SEO-ready business systems.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default async function AboutPage() {
  const certifications = await getAllCertifications();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  const webPageSchema = buildWebPageSchema({
    type: 'AboutPage',
    name: 'About Charles Websites',
    description:
      'Web Development, Android & iOS Mobile Apps, and AI Engineering agency helping businesses grow online.',
    path: '/about',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <AboutClient initialCertifications={certifications} />
    </>
  );
}
