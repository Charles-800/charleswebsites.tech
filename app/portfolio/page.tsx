import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Portfolio — Selected Client Website Projects',
  description:
    'Explore website projects crafted by Charles Websites for Ruevan Limited, Nyati AutoSpares, Lenanns Healthcare, Makuri Auctioneers, and MMS Advocates.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Charles Websites',
    description:
      'Selected business, e-commerce, healthcare, auctioneering, and legal website projects.',
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
  