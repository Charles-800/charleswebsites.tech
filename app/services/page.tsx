import type { Metadata } from 'next';
import ServicesPricingClient from '@/components/pages/ServicesPricingClient';
import { TRANSLATIONS } from '@/lib/i18n/translations';
import { getSiteBaseUrl } from '@/lib/config/site';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from '@/lib/seo/schema';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Web Design, AI & SEO Services Kenya',
  description:
    'Explore custom website design, e-commerce M-Pesa stores, AI chatbots, mobile apps, graphic branding, and technical SEO in Kenya starting at KES 39,890.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Web Design, AI & SEO Services Kenya | Charles Websites',
    description:
      'Website Design, AI Engineering & Automation, Mobile Apps, Branding, SEO, and transparent KES website packages.',
    url: `${baseUrl}/services`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design, AI & SEO Services Kenya | Charles Websites',
    description:
      'Explore custom website design, AI automation, branding, and SEO packages in KES.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default function ServicesPage() {
  const faqSchema = buildFaqSchema(TRANSLATIONS.en.servicesPage.faqs);

  const serviceSchema = buildServiceSchema({
    name: 'Web Development, AI Engineering & SEO Services',
    serviceType: 'Web Development, AI Engineering & Mobile App Development',
    description:
      'Custom website design, e-commerce, AI chatbots, branding, mobile apps, and technical SEO in Kenya.',
    path: '/services',
    offerings: TRANSLATIONS.en.services.cards.map((card) => ({
      name: card.title,
      description: card.description,
    })),
  });

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
