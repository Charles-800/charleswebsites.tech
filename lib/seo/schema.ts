import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';

export interface BreadcrumbItem {
  name: string;
  path: string;
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
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: `${baseUrl}${path === '/' ? '' : path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
  };
}
