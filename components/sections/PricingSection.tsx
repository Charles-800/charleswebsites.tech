'use client';

import React from 'react';
import Link from 'next/link';
import { Check, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';

interface PricingSectionProps {
  compactHeading?: boolean;
}

export default function PricingSection({ compactHeading = false }: PricingSectionProps) {
  const { locale, t } = useLanguage();

  return (
    <section id="pricing" className="bg-[#F7F7F9] py-20 sm:py-24 border-y border-[#E8E8EC]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {compactHeading ? (
            <>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl">
                {locale === 'sw'
                  ? 'Vifurushi na Gharama za Tovuti (KES)'
                  : 'Website & AI Packages (KES)'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
                {locale === 'sw'
                  ? 'Chagua kifurushi kinachoendana na ukubwa na malengo ya biashara yako.'
                  : 'Select a package tailored to your business goals and growth stage.'}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
                {t.pricing.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
                {t.pricing.subheading}
              </p>
            </>
          )}
        </div>

        {/* 3 Equal-Height Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {t.pricing.packages.map((pkg) => {
            const isPopular = Boolean(pkg.popular);
            const whatsappHref = buildWhatsAppUrl(pkg.whatsappMessage);

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl transition-all duration-200 ${
                  isPopular
                    ? 'bg-[#111111] text-white ring-2 ring-[#7137D8] shadow-2xl lg:-translate-y-2'
                    : 'bg-white text-[#151515] border border-[#E8E8EC] shadow-sm hover:border-[#7137D8]/50'
                }`}
              >
                {/* Prominent MOST POPULAR Header Strip */}
                {isPopular && (
                  <div className="rounded-t-2xl bg-gradient-to-r from-[#E5092F] to-[#7137D8] px-6 py-2.5 text-center text-xs font-extrabold tracking-widest text-white">
                    {t.pricing.mostPopular}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div>
                    <h3
                      className={`font-[family-name:var(--font-jakarta)] text-sm font-extrabold tracking-wider ${
                        isPopular ? 'text-[#8B5CF6]' : 'text-[#7137D8]'
                      }`}
                    >
                      {pkg.name}
                    </h3>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span
                        className={`font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight tabular-nums ${
                          pkg.id === 'premium'
                            ? 'text-2xl sm:text-[26px]'
                            : 'text-3xl sm:text-4xl'
                        } ${isPopular ? 'text-white' : 'text-[#151515]'}`}
                      >
                        {pkg.price}
                      </span>
                    </div>

                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isPopular ? 'text-[#D4D4D8]' : 'text-[#686868]'
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div
                    className={`my-6 h-px w-full ${
                      isPopular ? 'bg-white/15' : 'bg-[#E8E8EC]'
                    }`}
                  />

                  {/* Features List */}
                  <ul className="flex-1 space-y-3.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isPopular
                              ? 'bg-[#7137D8]/30 text-[#8B5CF6]'
                              : 'bg-[#F7F7F9] text-[#E5092F]'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span className={isPopular ? 'text-white/95' : 'text-[#151515]'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-8 space-y-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-cta flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-center text-xs font-extrabold tracking-wider whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>{pkg.cta}</span>
                    </a>

                    <Link
                      href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                      className={`flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${
                        isPopular
                          ? 'border border-white/20 text-white/90 hover:border-[#8B5CF6] hover:text-white'
                          : 'border border-[#E8E8EC] text-[#686868] hover:border-[#7137D8] hover:text-[#7137D8]'
                      }`}
                    >
                      <span>{t.nav.getQuote}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Verification Note */}
        <div className="mt-10 flex items-center justify-center gap-2.5 text-center text-xs text-[#686868]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#7137D8]" />
          <p className="max-w-2xl">{t.pricing.paymentSecurityNote}</p>
        </div>
      </div>
    </section>
  );
}
