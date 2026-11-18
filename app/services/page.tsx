import type { Metadata } from 'next';
import ServicesPricingClient from '@/components/pages/ServicesPricingClient';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Web Development, AI Engineering & Pricing Services',
  description:
    'Explore website design, AI chatbot automation, Android & iOS mobile apps, graphic branding, SEO services, and transparent KES packages starting at KES 39,890.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services & Pricing | Charles Websites',
    description:
      'Website Design, AI Engineering & Automation, Mobile Apps, Branding, SEO, and transparent KES website packages.',
  },
};

export default function ServicesPage() {
  const baseUrl = getSiteBaseUrl();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TRANSLATIONS.en.servicesPage.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development, AI Engineering & Mobile App Development',
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: baseUrl,
      telephone: '+254112298275',
    },
    areaServed: 'KE',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development & AI Engineering Services',
      itemListElement: TRANSLATIONS.en.services.cards.map((card) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: card.title,
          description: card.description,
        },
      })),
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: 'Web Development, AI Engineering & Pricing Services',
    description:
      'Website design, AI chatbot automation, Android & iOS app development, graphic branding, and SEO services.',
    path: '/services',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ServicesPricingClient mode="services" />
    </>
  );
}
