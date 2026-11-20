import type { Metadata } from 'next';
import ServicesPricingClient from '@/components/pages/ServicesPricingClient';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { TRANSLATIONS } from '@/lib/i18n/translations';

const siteBaseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Website Packages & Pricing in KES',
  description:
    'Transparent website design packages in Kenyan Shillings: Starter Package (KES 39,890), Business Package with AI Chatbot (KES 52,660), and Custom Premium solutions.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Website Packages & Pricing in KES | Charles Websites',
    description:
      'Compare Starter (KES 39,890), Business (KES 52,660), and Premium website packages built for Kenyan and global businesses.',
    url: `${siteBaseUrl}/pricing`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Packages & Pricing in KES | Charles Websites',
    description:
      'Starter website KES 39,890, Business website + AI chatbot KES 52,660, and Custom Premium quotes.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default function PricingPage() {
  const baseUrl = siteBaseUrl;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ]);
  const faqSchema = buildFaqSchema(TRANSLATIONS.en.servicesPage.faqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesPricingClient mode="pricing" />
    </>
  );
}
