'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { RevealBlock, RevealItem, RevealStagger } from '@/components/ui/MotionPrimitives';

interface SkillsSectionProps {
  variant?: 'gray' | 'white';
}

export default function SkillsSection({ variant = 'gray' }: SkillsSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className={
        variant === 'gray'
          ? 'border-y border-[#E8E8EC] bg-[#F7F7F9] py-20 sm:py-24'
          : 'border-t border-[#E8E8EC] bg-white py-20 sm:py-24'
      }
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <RevealBlock className="max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-[#7137D8]">
            {t.skills.kicker}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
            {t.skills.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
            {t.skills.subheading}
          </p>
        </RevealBlock>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.skills.items.map((skill) => (
            <RevealItem key={skill.id} className="h-full">
              <article className="group card-interactive flex h-full flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white p-7">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="card-icon-float flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-3 group-hover:border-[#7137D8]/40 group-hover:bg-white">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        width={32}
                        height={32}
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <span className="text-right text-xs font-semibold text-[#7137D8]">
                      {skill.role}
                    </span>
                  </div>

                  <h3 className="card-title-scale mt-6 inline-block font-[family-name:var(--font-jakarta)] text-xl font-extrabold tracking-tight text-[#151515]">
                    {skill.name}
                  </h3>
                  <p className="card-desc-enhance mt-3 text-sm leading-relaxed text-[#686868] sm:text-[15px]">
                    {skill.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
