'use client';

import React from 'react';
import Image from 'next/image';
import { Bot, Code2, Smartphone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HeroVisual() {
  const { locale } = useLanguage();

  return (
    <div className="relative w-full">
      {/* Subtle architectural accent glow behind the portrait frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-4 h-44 w-44 rounded-full bg-[#7137D8]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-4 h-40 w-40 rounded-full bg-[#E5092F]/10 blur-3xl"
      />

      <div className="group card-interactive relative mx-auto max-w-[460px] lg:ml-auto lg:mr-0 overflow-hidden rounded-3xl border border-[#E8E8EC] bg-white shadow-2xl">
        {/* Main Hero Portrait */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F7F9]">
          <Image
            src="/assets/aistudio/GPM_4716_828be8f9.jpg"
            alt="Charles Websites — Software Developer, Web Developer, AI Engineer & Android and iOS Apps Developer"
            fill
            priority
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 460px, 460px"
            referrerPolicy="no-referrer"
            className="img-zoom-target object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* Clean Founder & Agency Credential Bar Below Image */}
        <div className="space-y-3 bg-[#111111] px-5 py-4 text-white">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#E5092F] uppercase">
              {locale === 'sw' ? 'MWANZILISHI — CHARLES WEBSITES AI' : 'FOUNDER — CHARLES WEBSITES AI'}
            </p>
            <p className="mt-1 font-[family-name:var(--font-jakarta)] text-base font-extrabold tracking-tight text-white">
              CHARLES <span className="text-[#E5092F]">WEBSITES</span>
            </p>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#D4D4D8]">
              {locale === 'sw'
                ? 'Msanidi wa Software, Tovuti, Mhandisi wa AI & Mtengenezaji wa Programu za Android na iOS'
                : 'Software Developer, Web Developer, AI Engineer & Android / iOS Apps Developer'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E5092F]/60 hover:bg-white/10">
              <Code2 className="h-3.5 w-3.5 text-[#E5092F] transition-transform duration-200 group-hover/pill:scale-110" />
              <span>{locale === 'sw' ? 'Tovuti' : 'Web Dev'}</span>
            </span>
            <span className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B5CF6]/70 hover:bg-white/10">
              <Bot className="h-3.5 w-3.5 text-[#8B5CF6] transition-transform duration-200 group-hover/pill:scale-110" />
              <span>AI</span>
            </span>
            <span className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E5092F]/60 hover:bg-white/10">
              <Smartphone className="h-3.5 w-3.5 text-[#E5092F] transition-transform duration-200 group-hover/pill:scale-110" />
              <span>{locale === 'sw' ? 'Programu za Android & iOS' : 'Android & iOS Apps'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
