'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqAccordionItem {
  question: string;
  answer: string;
}

interface FaqAccordionListProps {
  items: FaqAccordionItem[];
  defaultOpenIndex?: number | null;
}

export default function FaqAccordionList({
  items,
  defaultOpenIndex = 0,
}: FaqAccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-trigger-${index}`;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-[#E8E8EC] bg-white"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-[family-name:var(--font-jakarta)] text-base font-bold text-[#151515] hover:text-[#7137D8] cursor-pointer"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[#686868] transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#7137D8]' : ''
                }`}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={
                isOpen
                  ? 'border-t border-[#E8E8EC] px-6 py-4 text-sm leading-relaxed text-[#686868]'
                  : 'sr-only'
              }
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
