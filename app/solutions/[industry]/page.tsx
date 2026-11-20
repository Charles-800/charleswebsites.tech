import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRY_SOLUTION_PAGES, getIndustrySolutionBySlug } from '@/lib/data/seo-pages';
import { buildLandingMetadata } from '@/lib/seo/metadata';
import SeoLandingPageRenderer from '@/components/seo/SeoLandingPageRenderer';

export function generateStaticParams() {
  return Object.keys(INDUSTRY_SOLUTION_PAGES).map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const pageData = getIndustrySolutionBySlug(industry);
  if (!pageData) {
    return {
      title: 'Solution Not Found',
    };
  }
  return buildLandingMetadata(pageData);
}

export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const pageData = getIndustrySolutionBySlug(industry);
  if (!pageData) {
    notFound();
  }

  return <SeoLandingPageRenderer page={pageData} />;
}
