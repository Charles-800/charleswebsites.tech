import React from 'react';
import type { SeoLandingPageData } from '@/lib/data/seo-pages';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
} from '@/lib/seo/schema';
import ServiceLandingView from '@/components/seo/ServiceLandingView';

interface SeoLandingPageRendererProps {
  page: SeoLandingPageData;
}

export default function SeoLandingPageRenderer({ page }: SeoLandingPageRendererProps) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    {
      name: page.category === 'industry' ? 'Industries' : 'Services',
      path: page.category === 'industry' ? '/services' : '/services',
    },
    { name: page.serviceType, path: page.path },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: page.h1,
    description: page.seoDescription,
    path: page.path,
  });

  const serviceSchema = buildServiceSchema({
    name: page.serviceType,
    serviceType: page.serviceType,
    description: page.seoDescription,
    path: page.path,
    offerings: page.sections.map((section) => ({
      name: section.title,
      description: section.description,
    })),
  });

  const faqSchema = page.faqs.length > 0 ? buildFaqSchema(page.faqs) : null;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ServiceLandingView page={page} />
    </>
  );
}
