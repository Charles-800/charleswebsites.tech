'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, Compass, Eye, Shield, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { buildWhatsAppUrl } from '@/lib/config/site';
import { CertificationItem } from '@/lib/data/certifications';
import SkillsSection from '@/components/sections/SkillsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';

interface AboutClientProps {
  initialCertifications: CertificationItem[];
}

export default function AboutClient({ initialCertifications }: AboutClientProps) {
  const { t } = useLanguage();

  const valueIcons = [
    <Compass key="v1" className="h-5 w-5 text-[#E5092F]" />,
    <Shield key="v2" className="h-5 w-5 text-[#7137D8]" />,
    <Layers key="v3" className="h-5 w-5 text-[#E5092F]" />,
    <Eye key="v4" className="h-5 w-5 text-[#7137D8]" />,
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-bold tracking-widest text-[#7137D8]">
              {t.hero.kicker}
            </p>
            <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
              {t.about.headline}
            </h1>
            <p className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[#E5092F] sm:text-2xl">
              {t.about.supportingHeadline}
            </p>
            <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.about.introParagraph}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E8E8EC] bg-white p-8">
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                {t.about.missionTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#686868]">
                {t.about.missionText}
              </p>
            </div>

            <div className="rounded-2xl border border-[#111111] bg-[#111111] p-8 text-white">
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-white">
                {t.about.visionTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#D4D4D8]">
                {t.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-y border-[#E8E8EC] bg-[#F7F7F9] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
            {t.about.valuesTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {t.about.values.map((val, idx) => (
              <div key={val.title} className="rounded-2xl border border-[#E8E8EC] bg-white p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F7F9]">
                  {valueIcons[idx]}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[#151515]">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#686868]">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Project Approach */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515]">
                {t.about.expertiseTitle}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {t.about.expertise.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-6"
                  >
                    <h3 className="font-[family-name:var(--font-jakarta)] text-base font-bold text-[#151515]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#686868]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-2xl border border-[#E8E8EC] bg-white p-7">
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
                  {t.about.approachTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#686868]">
                  {t.about.approachText}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8E8EC] bg-white p-7">
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
                  {t.about.whyWorkTitle}
                </h2>
                <ul className="mt-4 space-y-3">
                  {t.about.whyWorkPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[#151515]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E5092F]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills & Stack */}
      <SkillsSection variant="gray" />

      {/* Certifications & Professional Credentials */}
      <CertificationsSection initialCertifications={initialCertifications} />

      {/* Consultation CTA */}
      <section className="bg-[#111111] py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.about.ctaHeadline}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="btn-primary-cta inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <span>{t.about.ctaButton}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppUrl(t.contact.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline-dark inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>{t.nav.whatsappUs}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
