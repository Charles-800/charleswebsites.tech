import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { getSiteBaseUrl } from '@/lib/config/site';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Client Website Portfolio & Case Studies',
  description:
    'Explore real website projects and case studies by Charles Websites for Ruevan Limited, Nyati AutoSpares, Lenanns Healthcare, Makuri Auctioneers, and MMS Advocates.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Client Website Portfolio & Case Studies | Charles Websites',
    description:
      'Verified corporate, e-commerce, healthcare, auctioneering, and legal website projects built by Charles Websites.',
    url: `${baseUrl}/portfolio`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Website Portfolio & Case Studies | Charles Websites',
    description:
      'Inspect live websites and engineering case studies across corporate, automotive, healthcare, and legal sectors.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default function PortfolioPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ]);

  const collectionSchema = buildWebPageSchema({
    type: 'CollectionPage',
    name: 'Portfolio — Selected Client Website Projects',
    description:
      'Selected corporate, e-commerce, healthcare, auctioneering, and legal website projects by Charles Websites.',
    path: '/portfolio',
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
      <PortfolioClient />
    </>
  );
}
  