import type { Metadata } from 'next';
import { getSiteBaseUrl } from '@/lib/config/site';
import type { SeoLandingPageData } from '@/lib/data/seo-pages';

export function buildLandingMetadata(page: SeoLandingPageData): Metadata {
  const baseUrl = getSiteBaseUrl();
  const fullUrl = `${baseUrl}${page.path}`;
  const fullWithTemplate = `${page.seoTitle} | Charles Websites`;
  const titleConfig: Metadata['title'] =
    fullWithTemplate.length > 62 ? { absolute: page.seoTitle } : page.seoTitle;

  const ogTitle =
    fullWithTemplate.length > 65 ? `${page.seoTitle} — Charles Websites` : fullWithTemplate;

  return {
    title: titleConfig,
    description: page.seoDescription,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: ogTitle,
      description: page.seoDescription,
      url: fullUrl,
      siteName: 'Charles Websites',
      type: 'website',
      locale: 'en_KE',
      images: [
        {
          url: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
          alt: `${page.serviceType} — Charles Websites`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: page.seoDescription,
      images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
    },
  };
}
