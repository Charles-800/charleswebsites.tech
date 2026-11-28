'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { SeoLandingPageData } from '@/lib/data/seo-pages';
import { PORTFOLIO_PROJECTS } from '@/lib/data/projects';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ResilientImage from '@/components/ui/ResilientImage';
import FaqAccordionList from '@/components/seo/FaqAccordionList';
import { RevealBlock, RevealItem, RevealStagger } from '@/components/ui/MotionPrimitives';

interface ServiceLandingViewProps {
  page: SeoLandingPageData;
}

export default function ServiceLandingView({ page }: ServiceLandingViewProps) {
  const { locale } = useLanguage();

  const relatedProjects = PORTFOLIO_PROJECTS.filter((project) =>
    page.relatedProjectSlugs.includes(project.slug)
  );

  const whatsappUrl = buildWhatsAppUrl(
    `Hello Charles Websites, I would like to inquire about ${page.serviceType}.`
  );

  const breadcrumbRootLabel = page.category === 'industry' ? 'Industries' : 'Services';
  const breadcrumbRootHref = page.category === 'industry' ? '/#industries' : '/services';

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#686868]">
            <Link href="/" className="hover:text-[#7137D8] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <Link href={breadcrumbRootHref} className="hover:text-[#7137D8] transition-colors">
              {breadcrumbRootLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span className="text-[#151515]">{page.serviceType}</span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-bold tracking-widest text-[#7137D8]">
              {page.kicker}
            </p>
            <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold leading-tight tracking-tight text-[#151515] sm:text-5xl">
              {page.h1}
            </h1>
            <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
              {page.intro}
            </p>
            <p className="font-mono text-xs font-semibold tracking-wide text-[#151515] sm:text-sm">
              {page.startingPriceNote}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={`/contact?service=${encodeURIComponent(page.serviceType)}`}
                className="btn-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outline inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold tracking-wider whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                <span>WHATSAPP {SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={SITE_CONFIG.phoneHref}
                className="link-interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold text-[#151515] hover:bg-white hover:text-[#7137D8] whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-[#E5092F]" />
                <span>Call {SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Sections */}
      <section className="py-16 sm:py-20">
        <RevealStagger className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-8">
          {page.sections.map((section, idx) => (
            <RevealItem key={section.title}>
              <article className="group card-interactive grid grid-cols-1 gap-8 rounded-2xl border border-[#E8E8EC] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5 space-y-3">
                  <p className="card-icon-float inline-block font-mono text-xs font-bold tracking-widest text-[#E5092F] group-hover:text-[#7137D8]">
                    0{idx + 1}
                  </p>
                  <h2 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight text-[#151515]">
                    {section.title}
                  </h2>
                  <p className="card-desc-enhance text-sm leading-relaxed text-[#686868] sm:text-base">
                    {section.description}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-6 transition-colors duration-200 group-hover:border-[#7137D8]/25">
                    <ul className="space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[#151515]"
                        >
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#7137D8] transition-transform duration-200 group-hover:scale-110" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* Deliverables & Service Coverage */}
      <section className="border-y border-[#E8E8EC] bg-[#F7F7F9] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <RevealBlock className="lg:col-span-7 space-y-6">
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
                {page.deliverablesTitle}
              </h2>
              <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {page.deliverables.map((item) => (
                  <li
                    key={item}
                    className="group card-interactive flex items-start gap-3 rounded-xl border border-[#E8E8EC] bg-white p-4 text-sm text-[#151515]"
                  >
                    <CheckCircle2 className="card-icon-float mt-0.5 h-4 w-4 shrink-0 text-[#E5092F] group-hover:text-[#7137D8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-5">
              <div className="card-interactive-dark rounded-2xl border border-[#111111] bg-[#111111] p-7 text-white space-y-4">
                <p className="text-xs font-bold tracking-widest text-[#E5092F]">
                  KENYA & REMOTE COVERAGE
                </p>
                <h3 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-white">
                  Built for Nairobi, Mombasa, Nanyuki, Kisumu, Nakuru & Worldwide
                </h3>
                <p className="card-desc-enhance text-sm leading-relaxed text-[#A1A1AA]">
                  Every project includes transparent KES or international scoping, responsive mobile testing, direct WhatsApp/email collaboration, and clean ownership of your domain and website code.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
                  >
                    <span>COMPARE PACKAGES</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary-outline-dark inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
                  >
                    <span>CONTACT US</span>
                  </Link>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Verified Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <RevealBlock className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
                  Selected Client Projects
                </h2>
                <p className="mt-2 text-base text-[#686868]">
                  Inspect live websites and case studies delivered by Charles Websites.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="link-interactive inline-flex items-center gap-1.5 text-sm font-bold text-[#7137D8] hover:text-[#E5092F]"
              >
                <span>View Full Portfolio</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </RevealBlock>

            <RevealStagger className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedProjects.map((project) => {
                const copy = locale === 'sw' ? project.sw : project.en;
                return (
                  <RevealItem key={project.id} className="h-full">
                    <article className="group card-interactive flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white">
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
                          className={`img-zoom-target ${
                            project.imageFit === 'contain'
                              ? 'object-contain'
                              : project.imageFit === 'cover-top'
                                ? 'object-cover object-top'
                                : 'object-cover'
                          }`}
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-semibold text-[#7137D8]">{copy.industry}</p>
                        <h3 className="mt-1.5 font-[family-name:var(--font-jakarta)] text-xl font-bold text-[#151515]">
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="card-title-scale inline-block hover:text-[#7137D8]"
                          >
                            {project.name}
                          </Link>
                        </h3>
                        <p className="card-desc-enhance mt-2 flex-1 text-sm leading-relaxed text-[#686868]">
                          {copy.shortDescription}
                        </p>
                        <div className="mt-5 pt-4 border-t border-[#E8E8EC] flex flex-wrap items-center justify-between gap-2">
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="link-interactive inline-flex items-center gap-1.5 text-xs font-bold text-[#E5092F] hover:text-[#7137D8]"
                          >
                            <span>Read Case Study</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-interactive inline-flex items-center gap-1 text-xs font-semibold text-[#686868] hover:text-[#151515]"
                            >
                              <span>Live Site</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="border-t border-[#E8E8EC] bg-[#F7F7F9] py-16 sm:py-20">
          <RevealBlock className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-base text-[#686868]">
              Clear answers about scope, timelines, payments, and support.
            </p>
            <div className="mt-8">
              <FaqAccordionList items={page.faqs} defaultOpenIndex={0} />
            </div>
          </RevealBlock>
        </section>
      )}

      {/* Related Services & Next Steps */}
      {page.relatedLinks.length > 0 && (
        <section className="border-t border-[#E8E8EC] bg-white py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <RevealBlock>
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                Explore Related Services & Guides
              </h2>
            </RevealBlock>
            <RevealStagger className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.relatedLinks.map((item) => (
                <RevealItem key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    className="group card-interactive flex h-full flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-6 hover:bg-white"
                  >
                    <div>
                      <h3 className="card-title-scale inline-block font-[family-name:var(--font-jakarta)] text-base font-bold text-[#151515]">
                        {item.label}
                      </h3>
                      <p className="card-desc-enhance mt-2 text-xs leading-relaxed text-[#686868]">
                        {item.description}
                      </p>
                    </div>
                    <span className="link-interactive mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#E5092F] group-hover:text-[#7137D8]">
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#111111] py-16 sm:py-20 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-[#7137D8]/15 blur-3xl"
        />
        <RevealBlock className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Launch Your {page.serviceType} Project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
            Speak directly with Charles Websites by phone ({SITE_CONFIG.phoneDisplay}), WhatsApp, or our project inquiry form.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/contact?service=${encodeURIComponent(page.serviceType)}`}
              className="btn-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <span>GET A CUSTOM QUOTE</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline-dark inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
