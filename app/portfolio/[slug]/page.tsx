import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PORTFOLIO_PROJECTS, getPortfolioProjectBySlug } from '@/lib/data/projects';
import { getSiteBaseUrl } from '@/lib/config/site';
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
  buildWebPageSchema,
} from '@/lib/seo/schema';
import ProjectCaseStudyClient from '@/components/pages/ProjectCaseStudyClient';

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const baseUrl = getSiteBaseUrl();
  const pageTitle = `${project.name} Case Study`;
  const description = project.en.shortDescription;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — ${project.en.serviceLabel} | Charles Websites`,
      description,
      url: `${baseUrl}/portfolio/${project.slug}`,
      type: 'article',
      images: [
        {
          url: project.image,
          alt: `${project.name} — ${project.en.industry}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} Case Study | Charles Websites`,
      description,
      images: [project.image],
    },
  };
}

export default async function PortfolioCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: project.name, path: `/portfolio/${project.slug}` },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: `${project.name} — ${project.en.serviceLabel}`,
    description: project.en.shortDescription,
    path: `/portfolio/${project.slug}`,
  });

  const creativeWorkSchema = buildCreativeWorkSchema(project);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <ProjectCaseStudyClient project={project} />
    </>
  );
}
