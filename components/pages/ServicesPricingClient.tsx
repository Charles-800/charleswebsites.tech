'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Check,
  MessageCircle,
  Monitor,
  Palette,
  Smartphone,
  Terminal,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';
import PricingSection from '@/components/sections/PricingSection';
import FaqAccordionList from '@/components/seo/FaqAccordionList';

interface ServicesPricingClientProps {
  mode: 'services' | 'pricing';
}

export default function ServicesPricingClient({ mode }: ServicesPricingClientProps) {
  const { locale, t } = useLanguage();

  const dedicatedServiceRoutes = [
    '/web-design-kenya',
    '/ai-solutions',
    '/graphic-design',
    '/seo-services',
    null,
    '/software-development',
  ];

  const serviceIcons = [
    <Monitor key="s1" className="h-6 w-6 text-[#E5092F]" />,
    <Bot key="s2" className="h-6 w-6 text-[#7137D8]" />,
    <Palette key="s3" className="h-6 w-6 text-[#E5092F]" />,
    <TrendingUp key="s4" className="h-6 w-6 text-[#7137D8]" />,
    <Smartphone key="s5" className="h-6 w-6 text-[#E5092F]" />,
    <Terminal key="s6" className="h-6 w-6 text-[#7137D8]" />,
  ];

  const comparisonRows = [
    {
      label: locale === 'sw' ? 'Idadi ya Kurasa' : 'Website Pages',
      starter: locale === 'sw' ? 'Kurasa 4' : '4 pages',
      business: locale === 'sw' ? 'Kurasa 4–7' : '4–7 pages',
      premium: locale === 'sw' ? 'Hadi kurasa 10' : 'Up to 10 pages',
    },
    {
      label: locale === 'sw' ? 'Muundo wa Simu na Tableti' : 'Mobile & Tablet Optimization',
      starter: true,
      business: true,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Muunganisho wa WhatsApp' : 'WhatsApp Integration',
      starter: true,
      business: true,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Blogu na Lugha Nyingi' : 'Blog & Multilingual Support',
      starter: true,
      business: true,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Uboreshaji wa Kasi' : 'Speed Optimization',
      starter: locale === 'sw' ? 'Msingi' : 'Standard',
      business: true,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Marekebisho ya Muundo' : 'Design Revisions',
      starter: locale === 'sw' ? '1–2' : '1–2',
      business: locale === 'sw' ? '2–3' : '2–3',
      premium: locale === 'sw' ? 'Kulingana na mradi' : 'Full project scope',
    },
    {
      label: locale === 'sw' ? 'Muunganisho wa AI Chatbot' : 'AI Chatbot Integration',
      starter: false,
      business: true,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Malipo ya M-Pesa / Paystack' : 'Paystack / M-Pesa Integration',
      starter: false,
      business: false,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Duka Mtandaoni na Miadi' : 'E-Commerce & Booking Setup',
      starter: false,
      business: false,
      premium: true,
    },
    {
      label: locale === 'sw' ? 'Kiwango cha SEO' : 'SEO Setup Level',
      starter: locale === 'sw' ? 'Msingi' : 'Basic',
      business: locale === 'sw' ? 'Imara' : 'Standard+',
      premium: locale === 'sw' ? 'Ya Kina' : 'Advanced',
    },
  ];

  const renderCell = (val: boolean | string) => {
    if (typeof val === 'string') {
      return <span className="text-xs font-semibold text-[#151515]">{val}</span>;
    }
    return val ? (
      <Check className="mx-auto h-4 w-4 text-[#7137D8]" strokeWidth={2.5} />
    ) : (
      <span className="text-xs text-[#A1A1AA]">—</span>
    );
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="border-b border-[#E8E8EC] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-[#7137D8]">
              {t.hero.kicker}
            </p>
            <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
              {mode === 'pricing' ? t.pricing.headline : t.servicesPage.headline}
            </h1>
            <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
              {mode === 'pricing' ? t.pricing.subheading : t.servicesPage.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed 4 Service Categories (Shown prominently on /services) */}
      {mode === 'services' && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-8">
            {t.services.cards.map((card, idx) => (
              <div
                key={card.id}
                id={card.id}
                className="scroll-mt-24 grid grid-cols-1 gap-8 rounded-2xl border border-[#E8E8EC] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F7F9]">
                      {serviceIcons[idx]}
                    </div>
                    <span className="font-mono text-sm font-bold text-[#686868]">
                      {card.number}.
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                    {card.title}
                  </h2>
                  <p className="text-base leading-relaxed text-[#686868]">{card.description}</p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/contact?service=${encodeURIComponent(card.title)}`}
                      className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap"
                    >
                      <span>{t.nav.getQuote}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={buildWhatsAppUrl(
                        `Hello Charles Websites, I would like to inquire about ${card.title}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                      <span>{t.nav.whatsappUs}</span>
                    </a>
                    {dedicatedServiceRoutes[idx] && (
                      <Link
                        href={dedicatedServiceRoutes[idx] as string}
                        className="inline-flex items-center gap-1 px-2 py-2 text-xs font-bold text-[#7137D8] hover:text-[#E5092F] transition-colors"
                      >
                        <span>{locale === 'sw' ? 'Maelezo Kamili' : 'Detailed Guide'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {idx === 0 && (
                      <Link
                        href="/ecommerce-website-development"
                        className="inline-flex items-center gap-1 px-2 py-2 text-xs font-bold text-[#E5092F] hover:text-[#7137D8] transition-colors"
                      >
                        <span>{locale === 'sw' ? 'Duka Mtandaoni & M-Pesa' : 'E-Commerce & M-Pesa'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-6">
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {card.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-[#151515]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7137D8]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pricing Cards Section */}
      <PricingSection compactHeading={mode === 'pricing'} />

      {/* Package Comparison Table */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515] sm:text-3xl">
            {t.pricing.comparisonTitle}
          </h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E8E8EC]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E8E8EC] bg-[#F7F7F9]">
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-[#686868]">
                    {t.pricing.comparisonFeature}
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-[#151515]">
                    Starter
                    <span className="mt-0.5 block font-mono text-[11px] font-semibold text-[#686868] tabular-nums">
                      KES 39,890
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-[#7137D8]">
                    Business
                    <span className="mt-0.5 block font-mono text-[11px] font-semibold text-[#151515] tabular-nums">
                      KES 52,660
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-[#151515]">
                    Premium
                    <span className="mt-0.5 block font-mono text-[11px] font-semibold text-[#E5092F]">
                      Quote
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8EC] bg-white">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="hover:bg-[#F7F7F9]/60">
                    <td className="px-6 py-3.5 text-sm font-medium text-[#151515]">{row.label}</td>
                    <td className="px-6 py-3.5 text-center">{renderCell(row.starter)}</td>
                    <td className="px-6 py-3.5 text-center bg-[#F7F7F9]/40">
                      {renderCell(row.business)}
                    </td>
                    <td className="px-6 py-3.5 text-center">{renderCell(row.premium)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Accordion (all answers rendered in SSR DOM) */}
      <section id="faq" className="scroll-mt-24 border-t border-[#E8E8EC] bg-[#F7F7F9] py-16 sm:py-20">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
              {t.servicesPage.faqHeadline}
            </h2>
            <p className="mt-3 text-base text-[#686868]">{t.servicesPage.faqSubheading}</p>
          </div>

          <div className="mt-10">
            <FaqAccordionList items={t.servicesPage.faqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>
    </div>
  );
}
