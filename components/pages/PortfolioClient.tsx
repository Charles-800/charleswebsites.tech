'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';
import PortfolioSection from '@/components/sections/PortfolioSection';

export default function PortfolioClient() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      <PortfolioSection showFilters={true} showViewAllButton={false} headingAs="h1" />

      <section className="bg-[#111111] py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
            {t.finalCta.supportingText}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <span>{t.finalCta.primaryBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppUrl(t.finalCta.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline-dark inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>{t.finalCta.whatsappBtn}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
