import type { Metadata } from 'next';
import ServicesPricingClient from '@/components/pages/ServicesPricingClient';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Website Packages & Pricing in KES',
  description:
    'Transparent website packages in Kenyan Shillings: Starter Package (KES 39,890), Business Package (KES 52,660), and custom Premium solutions.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Website Pricing Packages (KES) | Charles Websites',
    description:
      'Compare Starter, Business, and Premium website packages built for Kenyan and global businesses.',
  },
};

export default function PricingPage() {
  const baseUrl = getSiteBaseUrl();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ]);

  const pricingCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development Packages',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Packages (KES)',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter Package',
          price: '39890',
          priceCurrency: 'KES',
        },
        {
          '@type': 'Offer',
          name: 'Business Package',
          price: '52660',
          priceCurrency: 'KES',
        },
        {
          '@type': 'Offer',
          name: 'Premium Package',
          priceCurrency: 'KES',
          description: 'Custom Quote for e-commerce, M-Pesa / Paystack payments, and AI integration',
        },
      ],
    },
  };

  const webPageSchema = buildWebPageSchema({
    name: 'Website Packages & Pricing in KES',
    description: 'Transparent Starter, Business, and Premium website packages in KES.',
    path: '/pricing',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ServicesPricingClient mode="pricing" />
    </>
  );
}
