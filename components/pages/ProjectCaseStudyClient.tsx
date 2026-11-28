'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  MessageCircle,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '@/lib/data/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';
import ResilientImage from '@/components/ui/ResilientImage';
import { RevealBlock, RevealItem, RevealStagger } from '@/components/ui/MotionPrimitives';

interface ProjectCaseStudyClientProps {
  project: PortfolioProject;
}

export default function ProjectCaseStudyClient({ project }: ProjectCaseStudyClientProps) {
  const { locale, t } = useLanguage();
  const localized = locale === 'sw' ? project.sw : project.en;
  const otherProjects = PORTFOLIO_PROJECTS.filter((item) => item.slug !== project.slug).slice(0, 3);

  const whatsappUrl = buildWhatsAppUrl(
    `Hello Charles Websites, I viewed your ${project.name} case study and want a similar website.`
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#686868]">
            <Link href="/" className="hover:text-[#7137D8] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <Link href="/portfolio" className="hover:text-[#7137D8] transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span className="text-[#151515]">{project.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-bold tracking-widest text-[#7137D8]">
                {localized.industry.toUpperCase()} · {localized.locationContext.toUpperCase()}
              </p>
              <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
                {project.name} — {localized.serviceLabel}
              </h1>
              <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
                {localized.shortDescription}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold"
                >
                  <span>
                    {project.category === 'software'
                      ? t.portfolio.visitLiveSoftware
                      : t.portfolio.visitLiveSite}
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link
                href={`/contact?project=${encodeURIComponent(project.name)}`}
                className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-extrabold tracking-wider"
              >
                <span>{t.portfolio.startSimilarProject}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealBlock className="group overflow-hidden rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9]">
            {project.imageFit === 'cover-top' ? (
              <div className="h-[420px] sm:h-[520px] w-full overflow-y-auto bg-white">
                <ResilientImage
                  src={project.image}
                  alt={`${project.name} — ${localized.serviceLabel}`}
                  fill={false}
                  width={1200}
                  height={9632}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="block h-auto w-full"
                  fallbackLabel={project.name}
                  priority={true}
                />
              </div>
            ) : (
              <div
                className={`relative w-full overflow-hidden ${
                  project.imageFit === 'contain' ? 'aspect-video bg-[#F3F4F6]' : 'aspect-[16/9]'
                }`}
              >
                <ResilientImage
                  src={project.image}
                  alt={`${project.name} — ${localized.serviceLabel}`}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className={`img-zoom-target ${
                    project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                  }`}
                  fallbackLabel={project.name}
                  priority={true}
                />
              </div>
            )}
          </RevealBlock>

          <RevealBlock className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Challenge & Engineering Solution */}
            <div className="lg:col-span-7 space-y-8">
              <div className="group card-interactive rounded-2xl border border-[#E8E8EC] bg-white p-7 sm:p-8 space-y-3">
                <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                  Project Overview & Objective
                </h2>
                <p className="card-desc-enhance text-base leading-relaxed text-[#686868]">
                  {localized.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group card-interactive rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-6 space-y-3 hover:bg-white">
                  <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                    Business Challenge
                  </h2>
                  <p className="card-desc-enhance text-sm leading-relaxed text-[#686868]">
                    {localized.challenge}
                  </p>
                </div>

                <div className="group card-interactive rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-6 space-y-3 hover:bg-white">
                  <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                    Solution Implemented
                  </h2>
                  <p className="card-desc-enhance text-sm leading-relaxed text-[#686868]">
                    {localized.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables & Stack */}
            <div className="lg:col-span-5 space-y-6">
              <div className="group card-interactive rounded-2xl border border-[#E8E8EC] bg-white p-7 space-y-4">
                <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                  {t.portfolio.deliverablesLabel}
                </h2>
                <ul className="space-y-3">
                  {localized.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#151515]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7137D8] transition-transform duration-200 group-hover:scale-110" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="group card-interactive rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-7 space-y-4 hover:bg-white">
                <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                  Architecture & Technologies
                </h2>
                <ul className="space-y-2 text-sm text-[#686868]">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="font-mono text-xs font-medium text-[#151515]">
                      · {tech}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#E8E8EC] flex flex-col gap-3">
                  <Link
                    href={project.servicePath}
                    className="link-interactive inline-flex items-center gap-2 text-xs font-bold text-[#7137D8] hover:text-[#E5092F]"
                  >
                    <Layers className="h-4 w-4" />
                    <span>Explore {localized.serviceLabel} Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-interactive inline-flex items-center gap-2 text-xs font-bold text-[#E5092F] hover:text-[#7137D8]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Discuss a Similar Project on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Other Projects */}
      <section className="border-t border-[#E8E8EC] bg-[#F7F7F9] py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <RevealBlock className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
              More Client Case Studies
            </h2>
            <Link
              href="/portfolio"
              className="link-interactive inline-flex items-center gap-1.5 text-xs font-bold text-[#7137D8] hover:text-[#E5092F]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Portfolio Projects</span>
            </Link>
          </RevealBlock>

          <RevealStagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherProjects.map((item) => {
              const itemLoc = locale === 'sw' ? item.sw : item.en;
              return (
                <RevealItem key={item.slug} className="h-full">
                  <article className="group card-interactive flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#E8E8EC] bg-[#F3F4F6]"
                    >
                      <ResilientImage
                        src={item.image}
                        alt={`${item.name} — ${itemLoc.industry}`}
                        fallbackLabel={item.name}
                        className={`img-zoom-target ${
                          item.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                        }`}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-semibold text-[#7137D8]">{itemLoc.industry}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[#151515]">
                        <Link href={`/portfolio/${item.slug}`} className="card-title-scale inline-block hover:text-[#7137D8]">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="mt-4 pt-3 border-t border-[#E8E8EC]">
                        <Link
                          href={`/portfolio/${item.slug}`}
                          className="link-interactive inline-flex items-center gap-1 text-xs font-bold text-[#E5092F] hover:text-[#7137D8]"
                        >
                          <span>Read Case Study</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
