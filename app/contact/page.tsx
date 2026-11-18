import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactClient from '@/components/pages/ContactClient';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Contact Charles Websites — Start Your Project',
  description:
    'Get in touch with Charles Websites for web development, AI chatbot integration, M-Pesa e-commerce, and SEO. Call 0112298275 or message on WhatsApp (+254112298275).',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Charles Websites | Request a Website or AI Quote',
    description:
      'Discuss your next website or AI automation project. Direct phone, WhatsApp, and online project inquiry form.',
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
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <ContactClient />
      </Suspense>
    </>
  );
}
