'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  MessageCircle,
  Monitor,
  Palette,
  Quote,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Zap,
  Headphones,
} from 'lucide-react';
import { BlogArticle } from '@/lib/data/blog';
import { CertificationItem } from '@/lib/data/certifications';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';
import HeroVisual from '@/components/home/HeroVisual';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PricingSection from '@/components/sections/PricingSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ResilientImage from '@/components/ui/ResilientImage';

interface HomeClientProps {
  recentArticles: BlogArticle[];
  initialCertifications: CertificationItem[];
}

export default function HomeClient({
  recentArticles,
  initialCertifications,
}: HomeClientProps) {
  const { locale, t } = useLanguage();

  const serviceIcons = [
    <Monitor key="web" className="h-6 w-6" />,
    <Bot key="ai" className="h-6 w-6" />,
    <Palette key="brand" className="h-6 w-6" />,
    <TrendingUp key="seo" className="h-6 w-6" />,
    <Smartphone key="mobile" className="h-6 w-6" />,
  ];

  const whyIcons = [
    <Sparkles key="w1" className="h-5 w-5" />,
    <Smartphone key="w2" className="h-5 w-5" />,
    <Bot key="w3" className="h-5 w-5" />,
    <Search key="w4" className="h-5 w-5" />,
    <Zap key="w5" className="h-5 w-5" />,
    <Headphones key="w6" className="h-5 w-5" />,
  ];

  const trustIcons = [
    <Code2 key="t1" className="h-5 w-5 text-[#E5092F]" />,
    <Bot key="t2" className="h-5 w-5 text-[#7137D8]" />,
    <ShieldCheck key="t3" className="h-5 w-5 text-[#E5092F]" />,
    <Zap key="t4" className="h-5 w-5 text-[#7137D8]" />,
  ];

  const heroWhatsappUrl = buildWhatsAppUrl(t.finalCta.whatsappPrefill);

  return (
    <div>
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <p className="text-xs font-bold tracking-widest text-[#7137D8]">
                {t.hero.kicker}
              </p>

              <h1 className="font-[family-name:var(--font-jakarta)] text-[34px] leading-[1.12] font-extrabold tracking-tight text-[#151515] sm:text-5xl lg:text-[52px]">
                {t.hero.headlinePre}
                <span className="text-[#E5092F]">{t.hero.headlineAccentRed}</span>
                {t.hero.headlineMid}
                <span className="text-[#7137D8]">{t.hero.headlineAccentPurple}</span>
                {t.hero.headlinePost}
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#686868] sm:text-lg">
                {t.hero.supportingText}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="btn-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="btn-secondary-outline inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold tracking-wider whitespace-nowrap"
                >
                  <span>{t.hero.secondaryCta}</span>
                </Link>

                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 px-2 py-2 text-xs font-bold text-[#151515] hover:text-[#7137D8] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                  <span>{t.hero.whatsappCta}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E8E8EC]">
                <p className="text-sm font-medium text-[#686868]">{t.hero.trustStatement}</p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST AND INTRODUCTION */}
      <section className="bg-[#F7F7F9] py-20 sm:py-24 border-y border-[#E8E8EC]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-widest text-[#E5092F]">
                {t.hero.tagline}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl">
                {t.trust.headline}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-[#686868]">{t.trust.description}</p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-[#E8E8EC] bg-white p-6 transition-colors hover:border-[#7137D8]/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F7F9]">
                  {trustIcons[idx]}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[#151515]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#686868]">{pillar.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
              {t.services.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.services.subheading}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {t.services.cards.map((card, idx) => (
              <div
                key={card.id}
                className={`group flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white p-7 sm:p-8 transition-all duration-200 hover:border-[#7137D8]/60 hover:shadow-lg ${
                  idx === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F7F9] text-[#E5092F] transition-colors group-hover:bg-[#7137D8] group-hover:text-white">
                      {serviceIcons[idx]}
                    </div>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#686868]">
                      {card.number}.
                    </span>
                  </div>

                  <h3 className="mt-6 font-[family-name:var(--font-jakarta)] text-xl font-extrabold tracking-tight text-[#151515]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#686868] sm:text-base">
                    {card.description}
                  </p>

                  <ul
                    className={`mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${
                      idx === 4 ? 'lg:grid-cols-3' : ''
                    }`}
                  >
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-[#151515]">
                        <Check className="h-4 w-4 shrink-0 text-[#7137D8]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E8E8EC]">
                  <Link
                    href={`/services#${card.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E5092F] hover:text-[#7137D8] transition-colors"
                  >
                    <span>{t.services.learnMore}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="bg-[#111111] py-20 sm:py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.whyUs.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              {t.whyUs.subheading}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.whyUs.items.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 transition-colors hover:border-[#8B5CF6]/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5092F]/15 text-[#E5092F]">
                  {whyIcons[idx]}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-jakarta)] text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SKILLS & TECHNOLOGIES */}
      <SkillsSection variant="gray" />

      {/* SECTION 6: CERTIFICATIONS & PROFESSIONAL CREDENTIALS */}
      <CertificationsSection initialCertifications={initialCertifications} />

      {/* SECTION 7: FEATURED PORTFOLIO */}
      <PortfolioSection showFilters={false} showViewAllButton={true} />

      {/* SECTION 6: PRICING */}
      <PricingSection />

      {/* SECTION 7: OUR WORKING PROCESS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
              {t.process.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.process.subheading}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-7"
              >
                <div>
                  <span className="font-mono text-2xl font-extrabold tabular-nums text-[#E5092F]">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-extrabold tracking-tight text-[#151515]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#686868]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="bg-[#F7F7F9] py-20 sm:py-24 border-y border-[#E8E8EC]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl">
                {t.testimonials.headline}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#686868]">
                {t.testimonials.subheading}
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary-cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap self-start md:self-auto"
            >
              <span>{t.testimonials.shareFeedbackCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {t.testimonials.slots.map((slot, idx) => (
              <article
                key={slot.companyPlaceholder}
                className={`flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white p-7 transition-colors hover:border-[#7137D8]/50 ${
                  idx < 3
                    ? 'lg:col-span-2'
                    : idx === 4
                      ? 'md:col-span-2 lg:col-span-3'
                      : 'lg:col-span-3'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#7137D8]">
                      {slot.slotLabel}
                    </span>
                    <Quote className="h-4 w-4 shrink-0 text-[#E5092F]" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#151515] sm:text-[15px]">
                    &ldquo;{slot.quotePlaceholder}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-[#E8E8EC] pt-4">
                  <p className="text-sm font-bold text-[#151515]">{slot.companyPlaceholder}</p>
                  <p className="mt-0.5 text-xs text-[#686868]">{slot.authorPlaceholder}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: BLOG PREVIEW */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl">
                {t.blog.previewHeadline}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#686868]">
                {t.blog.previewSubheading}
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-secondary-outline inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap self-start md:self-auto"
            >
              <span>{t.blog.viewAllArticles}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {recentArticles.slice(0, 3).map((article) => {
              const localized = locale === 'sw' ? article.sw : article.en;
              return (
                <article
                  key={article.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white transition-all duration-200 hover:border-[#7137D8]/50 hover:shadow-lg"
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F7F9]"
                  >
                    <ResilientImage
                      src={article.featuredImage}
                      alt={localized.imageAlt}
                      fallbackLabel={localized.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-[#686868]">
                      <span className="font-semibold text-[#7137D8]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                    </div>
                    <h3 className="mt-3 font-[family-name:var(--font-jakarta)] text-lg font-bold leading-snug text-[#151515]">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="hover:text-[#7137D8] transition-colors"
                      >
                        {localized.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#686868]">
                      {localized.excerpt}
                    </p>
                    <div className="mt-6 pt-4 border-t border-[#E8E8EC]">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-[#E5092F] hover:text-[#7137D8] transition-colors"
                      >
                        <span>{t.blog.readMore}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CALL TO ACTION */}
      <section className="bg-[#111111] py-20 sm:py-24 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.finalCta.headline}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              {t.finalCta.supportingText}
            </p>
            <div className="pt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="btn-primary-cta inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
              >
                <span>{t.finalCta.primaryBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={heroWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-outline-dark inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                <span>{t.finalCta.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
