export interface SocialLink {
  label: string;
  href: string;
  key: 'linkedin' | 'twitter' | 'instagram' | 'github';
}

export type AppEnvironment = 'development' | 'production';

export const PRODUCTION_SITE_URL = 'https://charleswebsites.tech';

export function getAppEnvironment(): AppEnvironment {
  const explicit = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase();
  if (explicit === 'production') return 'production';
  if (explicit === 'development') return 'development';

  // Keep Google AI Studio preview & local Node dev separate from production domain
  if (
    process.env.NODE_ENV !== 'production' ||
    Boolean(process.env.APP_URL) ||
    process.env.DISABLE_HMR === 'true'
  ) {
    return 'development';
  }

  return 'production';
}

export function isProductionEnvironment(): boolean {
  return getAppEnvironment() === 'production';
}

const configuredSocials: SocialLink[] = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL
    ? { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL, key: 'linkedin' }
    : null,
  process.env.NEXT_PUBLIC_X_URL
    ? { label: 'X (Twitter)', href: process.env.NEXT_PUBLIC_X_URL, key: 'twitter' }
    : null,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL
    ? { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, key: 'instagram' }
    : null,
  process.env.NEXT_PUBLIC_GITHUB_URL
    ? { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL, key: 'github' }
    : null,
].filter((item): item is SocialLink => item !== null && item.href.startsWith('http'));

export const SITE_CONFIG = {
  name: 'Charles Websites',
  title: 'Web Developer & AI Engineer',
  productionDomain: 'charleswebsites.tech',
  productionUrl: PRODUCTION_SITE_URL,
  phoneDisplay: '0112298275',
  phoneHref: 'tel:+254112298275',
  whatsappNumber: '254112298275',
  whatsappDisplay: '+254112298275',
  currency: 'KES',
  location: 'Nairobi, Kenya',
  email: 'ramoyacharles920@gmail.com',
  emailHref: 'mailto:ramoyacharles920@gmail.com',
  socials: configuredSocials,
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE_CONFIG.email}${query ? `?${query}` : ''}`;
}

export function getSiteBaseUrl(): string {
  const env = getAppEnvironment();

  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicitUrl && explicitUrl !== 'MY_APP_URL' && explicitUrl.startsWith('http')) {
    return explicitUrl.replace(/\/$/, '');
  }

  if (env === 'development') {
    const devUrl = process.env.NEXT_PUBLIC_DEV_APP_URL || process.env.APP_URL;
    if (devUrl && devUrl !== 'MY_APP_URL' && devUrl.startsWith('http')) {
      return devUrl.replace(/\/$/, '');
    }
    return 'http://localhost:3000';
  }

  const configuredProdUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  if (configuredProdUrl && configuredProdUrl.startsWith('http')) {
    return configuredProdUrl.replace(/\/$/, '');
  }

  return PRODUCTION_SITE_URL;
}
