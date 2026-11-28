'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Copy, MessageCircle, Share2 } from 'lucide-react';
import { BlogArticle } from '@/lib/data/blog';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl, getSiteBaseUrl } from '@/lib/config/site';
import ResilientImage from '@/components/ui/ResilientImage';
import { RevealBlock, RevealItem, RevealStagger } from '@/components/ui/MotionPrimitives';

interface BlogPostClientProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export default function BlogPostClient({ article, relatedArticles }: BlogPostClientProps) {
  const { locale, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const localized = locale === 'sw' ? article.sw : article.en;

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `${getSiteBaseUrl()}/blog/${article.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked
    }
  };

  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
    `${localized.title} — ${shareUrl}`
  )}`;
  const xShareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    localized.title
  )}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  const categoryFallbackPath: Record<BlogArticle['category'], { href: string; label: string }> = {
    'Web Development': { href: '/web-design-kenya', label: 'Explore Website Design & Development Kenya' },
    'AI Engineering': { href: '/ai-solutions', label: 'Explore AI Chatbot & Automation Solutions' },
    'SEO & Growth': { href: '/seo-services', label: 'Explore Technical & Local SEO Services' },
    'Design & UX': { href: '/graphic-design', label: 'Explore Graphic Design & Branding Services' },
  };
  const serviceCtaHref =
    article.relatedServicePath || categoryFallbackPath[article.category].href;
  const serviceCtaLabel =
    article.relatedServiceLabel || categoryFallbackPath[article.category].label;

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-[920px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#686868]">
          <Link href="/" className="hover:text-[#7137D8]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
          <Link href="/blog" className="hover:text-[#7137D8]">
            Blog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
          <span className="truncate max-w-[260px] text-[#151515]">{localized.title}</span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#686868] hover:text-[#7137D8] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.blog.backToBlog}</span>
        </Link>

        <header className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#686868]">
            <span className="font-bold text-[#7137D8]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {t.blog.publishedOn} {article.publishedAt}
            </time>
            <span aria-hidden="true">·</span>
            <span>
              {article.readTimeMinutes} {t.blog.minRead}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold leading-tight tracking-tight text-[#151515] sm:text-4xl lg:text-[44px]">
            {localized.title}
          </h1>

          <p className="text-lg leading-relaxed text-[#686868]">{localized.excerpt}</p>
        </header>

        <div className="group relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9]">
          <ResilientImage
            src={article.featuredImage}
            alt={localized.imageAlt}
            sizes="(max-width: 920px) 100vw, 880px"
            priority={true}
            className="img-zoom-target object-cover"
            fallbackLabel={localized.title}
          />
        </div>

        {/* Body Content */}
        <div className="mt-10 space-y-6 text-base leading-[1.8] text-[#151515] sm:text-[17px]">
          {localized.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Explore Related Service CTA */}
        <RevealBlock className="mt-10">
          <div className="card-interactive flex flex-col gap-4 rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-6 hover:bg-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7137D8]">
                {locale === 'sw' ? 'Huduma Husika' : 'Related Service'}
              </p>
              <p className="card-title-scale mt-1 inline-block font-[family-name:var(--font-jakarta)] text-base font-bold text-[#151515]">
                {serviceCtaLabel}
              </p>
            </div>
            <Link
              href={serviceCtaHref}
              className="btn-secondary-outline inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold whitespace-nowrap"
            >
              <span>{locale === 'sw' ? 'Fungua Huduma' : 'Explore Service'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </RevealBlock>

        {/* Social Share Bar */}
        <div className="mt-12 flex flex-col gap-4 border-y border-[#E8E8EC] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-[#151515]">
            <Share2 className="h-4 w-4 text-[#7137D8]" />
            <span>{t.blog.shareArticle}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={whatsappShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3.5 py-2 text-xs font-semibold text-[#151515] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7137D8] hover:text-[#7137D8]"
            >
              WhatsApp
            </a>
            <a
              href={linkedInShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3.5 py-2 text-xs font-semibold text-[#151515] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7137D8] hover:text-[#7137D8]"
            >
              LinkedIn
            </a>
            <a
              href={xShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3.5 py-2 text-xs font-semibold text-[#151515] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7137D8] hover:text-[#7137D8]"
            >
              X / Twitter
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E8EC] bg-white px-3.5 py-2 text-xs font-semibold text-[#151515] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7137D8] hover:text-[#7137D8] cursor-pointer active:scale-95"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#7137D8]" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? t.blog.linkCopied : t.blog.copyLink}</span>
            </button>
          </div>
        </div>

        {/* Inline Conversion CTA */}
        <RevealBlock className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-[#111111] p-8 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 right-0 h-44 w-44 rounded-full bg-[#7137D8]/20 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-white">
                {t.finalCta.headline}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">
                {t.finalCta.supportingText}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
                >
                  <span>{t.finalCta.primaryBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={buildWhatsAppUrl(t.finalCta.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline-dark inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
                >
                  <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                  <span>{t.finalCta.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-[#E8E8EC] bg-[#F7F7F9] py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <RevealBlock>
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                {t.blog.relatedArticles}
              </h2>
            </RevealBlock>
            <RevealStagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((rel) => {
                const relLoc = locale === 'sw' ? rel.sw : rel.en;
                return (
                  <RevealItem key={rel.slug} className="h-full">
                    <article className="group card-interactive flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F7F9]"
                      >
                        <ResilientImage
                          src={rel.featuredImage}
                          alt={relLoc.imageAlt}
                          fallbackLabel={relLoc.title}
                          className="img-zoom-target object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs font-semibold text-[#7137D8]">{rel.category}</p>
                        <h3 className="mt-2 font-[family-name:var(--font-jakarta)] text-base font-bold text-[#151515]">
                          <Link href={`/blog/${rel.slug}`} className="card-title-scale inline-block hover:text-[#7137D8]">
                            {relLoc.title}
                          </Link>
                        </h3>
                        <div className="mt-4 pt-3 border-t border-[#E8E8EC]">
                          <Link
                            href={`/blog/${rel.slug}`}
                            className="link-interactive inline-flex items-center gap-1 text-xs font-bold text-[#E5092F] hover:text-[#7137D8]"
                          >
                            <span>{t.blog.readMore}</span>
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
      )}
    </div>
  );
}
