import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';
import { getAllCertifications } from '@/lib/server/store';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Charles Websites — Web Developer & AI Engineer',
  description:
    'Learn about Charles Websites, a Web Development, Mobile App & AI Engineering agency helping businesses grow through modern websites, intelligent automation, and SEO.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Charles Websites — Web Development & AI Engineering Agency',
    description:
      'Building the future of digital business with custom web development, Android & iOS apps, practical AI engineering, and transparent KES solutions.',
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
