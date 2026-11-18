'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Download,
  ExternalLink,
  Globe,
  MessageCircle,
  Monitor,
  Smartphone,
  TabletSmartphone,
  X,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';
import {
  ClientPlatformId,
  getAppClientPlatforms,
} from '@/lib/config/app-clients';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
  const { locale, t } = useLanguage();
  const platforms = getAppClientPlatforms();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const platformIcons: Record<ClientPlatformId, React.ReactNode> = {
    android: <Smartphone className="h-6 w-6 text-[#E5092F]" />,
    ios: <TabletSmartphone className="h-6 w-6 text-[#7137D8]" />,
    windows: <Monitor className="h-6 w-6 text-[#151515]" />,
  };

  const whatsappAppMessage =
    locale === 'sw'
      ? 'Habari Charles Websites, naomba taarifa programu zenu za Android, iOS na Windows zitakapokuwa tayari.'
      : 'Hello Charles Websites, please notify me when the official Android, iOS, and Windows apps are ready for download.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-app-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E8E8EC] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#E8E8EC] bg-[#111111] px-6 py-5 text-white">
          <div className="space-y-1">
            <p className="text-[11px] font-bold tracking-widest text-[#8B5CF6]">
              {t.downloadModal.kicker}
            </p>
            <h2
              id="download-app-modal-title"
              className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold tracking-tight text-white sm:text-2xl"
            >
              {t.downloadModal.title}
            </h2>
            <p className="text-xs leading-relaxed text-[#D4D4D8] sm:text-sm">
              {t.downloadModal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.downloadModal.closeModal}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Unified Platform Target Notice (static display — no external requests) */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E8E8EC] text-[#7137D8]">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  {t.downloadModal.livePlatformLabel}:{' '}
                  <span className="font-mono text-[#7137D8]">{SITE_CONFIG.productionDomain}</span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#686868]">
                  {t.downloadModal.releaseNotice}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Platform Cards: Android, iOS, Windows */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {platforms.map((platform) => {
              const isAvailable = platform.status === 'available' && Boolean(platform.downloadUrl);
              const description = t.downloadModal.platformDescriptions[platform.id];

              return (
                <div
                  key={platform.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white p-5 transition-colors hover:border-[#7137D8]/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F7F9] border border-[#E8E8EC]">
                        {platformIcons[platform.id]}
                      </div>

                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <Download className="h-3 w-3" />
                          <span>Ready</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F7F9] px-2.5 py-1 text-[11px] font-bold text-[#7137D8] border border-[#7137D8]/25">
                          <Clock className="h-3 w-3" />
                          <span>{t.downloadModal.comingSoon}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                      {platform.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] font-medium text-[#686868]">
                      {platform.requirements}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#686868]">{description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E8EC]">
                    {isAvailable && platform.downloadUrl ? (
                      <a
                        href={platform.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-cta flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wide"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>{t.downloadModal.downloadNow}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#E8E8EC] bg-[#F7F7F9] px-4 py-2.5 text-xs font-bold text-[#686868]"
                      >
                        <Clock className="h-3.5 w-3.5 text-[#7137D8]" />
                        <span>{t.downloadModal.comingSoon}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col gap-3 border-t border-[#E8E8EC] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={buildWhatsAppUrl(whatsappAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn-secondary-outline inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>{t.downloadModal.whatsappCta}</span>
            </a>

            <Link
              href={`/contact?service=${encodeURIComponent('Android & iOS Mobile App Development')}`}
              onClick={onClose}
              className="btn-primary-cta inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold tracking-wide whitespace-nowrap"
            >
              <span>{t.downloadModal.notifyCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
