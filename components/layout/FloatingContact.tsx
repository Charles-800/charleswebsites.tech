'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';

export default function FloatingContact() {
  const { t } = useLanguage();
  const whatsappUrl = buildWhatsAppUrl(t.contact.whatsappPrefill);

  return (
    <>
      {/* Desktop Floating WhatsApp CTA */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.nav.whatsappUs}
          className="btn-primary-cta inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-bold shadow-xl"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="whitespace-nowrap">{t.nav.whatsappUs}</span>
        </a>
      </div>

      {/* Mobile Compact Sticky Contact Bar (< 60px height, within 15% mobile sticky cap) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[#E8E8EC] bg-white/95 backdrop-blur-md px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={SITE_CONFIG.phoneHref}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3 text-xs font-bold text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8]"
          >
            <Phone className="h-4 w-4 text-[#7137D8]" />
            <span className="truncate">{t.nav.callUs}</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-cta flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-xs font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="truncate">{t.nav.whatsappUs}</span>
          </a>
        </div>
      </div>
    </>
  );
}
