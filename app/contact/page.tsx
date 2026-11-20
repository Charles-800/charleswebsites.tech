import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';
import { getSiteBaseUrl } from '@/lib/config/site';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Contact Us — Request a Website Quote',
  description:
    'Contact Charles Websites for web development, AI chatbot integration, M-Pesa e-commerce, and SEO in Kenya. Call 0112298275 or WhatsApp +254112298275.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us — Request a Website Quote | Charles Websites',
    description:
      'Discuss your next website, online store, or AI automation project. Direct phone, WhatsApp, email, and project inquiry form.',
    url: `${baseUrl}/contact`,
    type: 'website',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Request a Website Quote | Charles Websites',
    description:
      'Call 0112298275, WhatsApp +254112298275, or submit a project inquiry online.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);
  const contactPageSchema = buildWebPageSchema({
    type: 'ContactPage',
    name: 'Contact Charles Websites',
    description:
      'Request a quote for web development, Android & iOS mobile apps, AI chatbot integration, or SEO.',
    path: '/contact',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactClient />
    </>
  );
}
