'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ExternalLink, X, Globe } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject, ProjectCategory } from '@/lib/data/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ResilientImage from '@/components/ui/ResilientImage';

interface PortfolioSectionProps {
  showFilters?: boolean;
  showViewAllButton?: boolean;
  headingAs?: 'h1' | 'h2';
}

export default function PortfolioSection({
  showFilters = false,
  showViewAllButton = true,
  headingAs = 'h2',
}: PortfolioSectionProps) {
  const { locale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  const filteredProjects =
    selectedCategory === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const filterButtons: Array<{ key: 'all' | ProjectCategory; label: string }> = [
    { key: 'all', label: t.portfolio.filterAll },
    { key: 'software', label: t.portfolio.filterSoftware },
    { key: 'corporate', label: t.portfolio.filterCorporate },
    { key: 'ecommerce', label: t.portfolio.filterEcommerce },
    { key: 'healthcare', label: t.portfolio.filterHealthcare },
    { key: 'legal', label: t.portfolio.filterLegal },
  ];

  return (
    <section id="portfolio" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {headingAs === 'h1' ? (
              <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
                {t.portfolio.headline}
              </h1>
            ) : (
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
                {t.portfolio.headline}
              </h2>
            )}
            <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.portfolio.subheading}
            </p>
          </div>

          {showViewAllButton && (
            <Link
              href="/portfolio"
              className="btn-secondary-outline inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>{t.portfolio.viewAllProjects}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Category Filter Tabs */}
        {showFilters && (
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setSelectedCategory(btn.key)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === btn.key
                    ? 'bg-[#111111] text-white'
                    : 'border border-[#E8E8EC] bg-[#F7F7F9] text-[#686868] hover:text-[#7137D8]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const copy = locale === 'sw' ? project.sw : project.en;
            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white transition-all duration-200 hover:border-[#7137D8]/50 hover:shadow-lg"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className={`relative aspect-[4/3] w-full overflow-hidden border-b border-[#E8E8EC] ${
                    project.imageFit === 'contain' ? 'bg-[#F3F4F6]' : 'bg-[#F7F7F9]'
                  }`}
                >
                  <ResilientImage
                    src={project.image}
                    alt={`${project.name} — ${copy.industry}`}
                    fallbackLabel={project.name}
                    className={`${
                      project.imageFit === 'contain'
                        ? 'object-contain'
                        : project.imageFit === 'cover-top'
                          ? 'object-cover object-top'
                          : 'object-cover'
                    } transition-transform duration-300 group-hover:scale-[1.02]`}
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wide text-[#7137D8]">
                    {copy.industry}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-jakarta)] text-xl font-bold text-[#151515]">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="hover:text-[#7137D8] transition-colors"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#686868]">
                    {copy.shortDescription}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#E8E8EC] flex flex-wrap items-center justify-between gap-2.5">
                    {project.liveUrl ? (
                      <>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-cta inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap"
                        >
                          <span>
                            {project.category === 'software'
                              ? t.portfolio.visitLiveSoftware
                              : t.portfolio.visitLiveSite}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="btn-secondary-outline inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-xs font-bold whitespace-nowrap"
                          >
                            <span>{locale === 'sw' ? 'Kifani' : 'Case Study'}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setActiveProject(project)}
                            className="px-2 py-2 text-xs font-semibold text-[#686868] hover:text-[#7137D8] cursor-pointer"
                          >
                            {locale === 'sw' ? 'Hakiki' : 'Preview'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="btn-primary-cta inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap"
                        >
                          <span>{locale === 'sw' ? 'Soma Kifani' : 'Read Case Study'}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="btn-secondary-outline inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer"
                        >
                          <span>{t.portfolio.viewProject}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Detail Preview Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8E8EC] bg-white px-6 py-4">
              <div>
                <p className="text-xs font-semibold text-[#7137D8]">
                  {(locale === 'sw' ? activeProject.sw : activeProject.en).industry}
                </p>
                <h3
                  id="portfolio-modal-title"
                  className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]"
                >
                  {activeProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label={t.portfolio.closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8E8EC] text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeProject.imageFit === 'cover-top' ? (
                <div className="h-[340px] sm:h-[420px] w-full overflow-y-auto rounded-xl border border-[#E8E8EC] bg-white">
                  <ResilientImage
                    src={activeProject.image}
                    alt={activeProject.name}
                    fill={false}
                    width={1200}
                    height={9632}
                    sizes="(max-width: 768px) 100vw, 760px"
                    className="block h-auto w-full"
                    fallbackLabel={activeProject.name}
                  />
                </div>
              ) : (
                <div
                  className={`relative w-full overflow-hidden rounded-xl border border-[#E8E8EC] bg-[#F3F4F6] ${
                    activeProject.imageFit === 'contain' ? 'aspect-video' : 'aspect-[16/10]'
                  }`}
                >
                  <ResilientImage
                    src={activeProject.image}
                    alt={activeProject.name}
                    sizes="(max-width: 768px) 100vw, 760px"
                    className={
                      activeProject.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                    }
                    fallbackLabel={activeProject.name}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                    {t.portfolio.overviewLabel}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#686868]">
                    {(locale === 'sw' ? activeProject.sw : activeProject.en).overview}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                    {t.portfolio.deliverablesLabel}
                  </h4>
                  <ul className="space-y-2">
                    {(locale === 'sw' ? activeProject.sw : activeProject.en).deliverables.map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#151515]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7137D8]" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#E8E8EC] pt-5 sm:flex-row sm:items-center sm:justify-between">
                {activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-outline inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                  >
                    <Globe className="h-4 w-4" />
                    <span>
                      {activeProject.category === 'software'
                        ? t.portfolio.visitLiveSoftware
                        : t.portfolio.visitLiveSite}
                    </span>
                  </a>
                ) : (
                  <p className="text-xs text-[#686868]">{t.portfolio.liveUrlPending}</p>
                )}

                <Link
                  href={`/contact?project=${encodeURIComponent(activeProject.name)}`}
                  onClick={() => setActiveProject(null)}
                  className="btn-primary-cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wide whitespace-nowrap"
                >
                  <span>{t.portfolio.startSimilarProject}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
