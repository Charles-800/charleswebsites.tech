import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import type { PortfolioProject } from '@/lib/data/projects';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export function buildOrganizationAndServiceSchema() {
  const baseUrl = getSiteBaseUrl();
  const sameAs = [
    ...SITE_CONFIG.socials.map((s) => s.href),
    ...(SITE_CONFIG.gbpUrl ? [SITE_CONFIG.gbpUrl] : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${baseUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: baseUrl,
    logo: `${baseUrl}/assets/aistudio/CHARLES_WEBSITES_91d4851c.png`,
    image: `${baseUrl}/assets/aistudio/GPM_4716_828be8f9.jpg`,
    description:
      'Web development, website design, e-commerce engineering, graphic design, technical SEO, and AI automation agency serving businesses across Kenya and remotely worldwide.',
    telephone: '+254112298275',
    email: SITE_CONFIG.email,
    priceRange: 'KES 39,890 - Custom',
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'City', name: 'Mombasa' },
      { '@type': 'Place', name: 'Nanyuki' },
      { '@type': 'City', name: 'Kisumu' },
      { '@type': 'City', name: 'Nakuru' },
    ],
    knowsAbout: [
      'Website Design Kenya',
      'Web Development',
      'Next.js & React Engineering',
      'E-Commerce & M-Pesa Integration',
      'AI Chatbots & Business Automation',
      'Technical SEO & Local SEO',
      'Graphic Design & Branding',
      'Android & iOS Mobile Apps',
      'Custom Software Development',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254112298275',
      contactType: 'sales',
      email: SITE_CONFIG.email,
      areaServed: 'KE',
      availableLanguage: ['English', 'Swahili'],
    },
  };
}

export function buildWebSiteSchema() {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: SITE_CONFIG.name,
    url: baseUrl,
    inLanguage: ['en', 'sw'],
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${baseUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function buildWebPageSchema({
  type = 'WebPage',
  name,
  description,
  path,
}: {
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage';
  name: string;
  description: string;
  path: string;
}) {
  const baseUrl = getSiteBaseUrl();
  const pageUrl = `${baseUrl}${path === '/' ? '' : path}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${pageUrl}#webpage`,
    name,
    description,
    url: pageUrl,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

export function buildServiceSchema({
  name,
  serviceType,
  description,
  path,
  offerings,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  offerings: Array<{ name: string; description?: string }>;
}) {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: `${baseUrl}${path}`,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'City', name: 'Mombasa' },
      { '@type': 'Place', name: 'Nanyuki' },
      { '@type': 'City', name: 'Kisumu' },
      { '@type': 'City', name: 'Nakuru' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: offerings.map((item) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  };
}

export function buildFaqSchema(faqs: FaqSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildCreativeWorkSchema(project: PortfolioProject) {
  const baseUrl = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.en.overview,
    genre: project.en.industry,
    url: `${baseUrl}/portfolio/${project.slug}`,
    image: `${baseUrl}${project.image}`,
    creator: {
      '@id': `${baseUrl}/#organization`,
    },
    ...(project.liveUrl ? { mainEntityOfPage: project.liveUrl } : {}),
    keywords: project.technologies.join(', '),
  };
}
