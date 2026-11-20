import type { Metadata } from 'next';
import { SERVICE_LANDING_PAGES } from '@/lib/data/seo-pages';
import { buildLandingMetadata } from '@/lib/seo/metadata';
import SeoLandingPageRenderer from '@/components/seo/SeoLandingPageRenderer';

const pageData = SERVICE_LANDING_PAGES['ai-solutions'];

export const metadata: Metadata = buildLandingMetadata(pageData);

export default function AiSolutionsPage() {
  return <SeoLandingPageRenderer page={pageData} />;
}
