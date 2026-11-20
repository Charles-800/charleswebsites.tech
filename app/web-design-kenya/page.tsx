import type { Metadata } from 'next';
import { SERVICE_LANDING_PAGES } from '@/lib/data/seo-pages';
import { buildLandingMetadata } from '@/lib/seo/metadata';
import SeoLandingPageRenderer from '@/components/seo/SeoLandingPageRenderer';

const pageData = SERVICE_LANDING_PAGES['web-design-kenya'];

export const metadata: Metadata = buildLandingMetadata(pageData);

export default function WebDesignKenyaPage() {
  return <SeoLandingPageRenderer page={pageData} />;
}
