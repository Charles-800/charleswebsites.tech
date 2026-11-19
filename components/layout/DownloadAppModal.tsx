'use client';

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Globe,
  Laptop,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  X,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';
import {
  AppDownloadOverrides,
  AppPlatformConfig,
  ClientPlatformId,
  DetectedDeviceType,
  detectVisitorDevice,
  getAppDownloadPlatforms,
  getOrderedPlatforms,
} from '@/lib/config/app-clients';

const emptySubscribe = () => () => {};

function getClientDetectedDevice(): DetectedDeviceType {
  if (typeof window === 'undefined') return 'other';
  return detectVisitorDevice(
    window.navigator.userAgent,
    window.navigator.platform || '',
    window.navigator.maxTouchPoints || 0
  );
}

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileSizes?: Partial<Record<ClientPlatformId, string>>;
  appDownloads?: AppDownloadOverrides;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
  fileSizes,
  appDownloads,
}: DownloadAppModalProps) {
  const { locale, t } = useLanguage();
  const detectedDevice = useSyncExternalStore<DetectedDeviceType>(
    emptySubscribe,
    getClientDetectedDevice,
    () => 'other'
  );
  const [downloadStartedFor, setDownloadStartedFor] = useState<ClientPlatformId | null>(null);

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

  const allPlatforms = useMemo(
    () => getAppDownloadPlatforms(appDownloads ?? { fileSizes }),
    [appDownloads, fileSizes]
  );
  const orderedPlatforms = useMemo(
    () => getOrderedPlatforms(allPlatforms, detectedDevice),
    [allPlatforms, detectedDevice]
  );

  if (!isOpen) return null;

  const iosAvailable = Boolean(
    allPlatforms.find((item) => item.id === 'ios')?.downloadUrl
  );

  const platformIcons: Record<ClientPlatformId, React.ReactNode> = {
    android: <Smartphone className="h-6 w-6 text-[#E5092F]" />,
    windows: <Monitor className="h-6 w-6 text-[#151515]" />,
    ios: <TabletSmartphone className="h-6 w-6 text-[#7137D8]" />,
    mac: <Laptop className="h-6 w-6 text-[#151515]" />,
  };

  const buttonLabelForPlatform = (platform: AppPlatformConfig): string => {
    switch (platform.id) {
      case 'android':
        return t.downloadModal.downloadAndroidBtn;
      case 'windows':
        return t.downloadModal.downloadWindowsBtn;
      case 'ios':
        return platform.downloadUrl
          ? t.downloadModal.downloadAppStoreBtn
          : t.downloadModal.getIosBtn;
      case 'mac':
        return t.downloadModal.downloadMacBtn;
    }
  };

  const whatsappAppMessage =
    locale === 'sw'
      ? 'Habari Charles Websites, nahitaji msaada au taarifa kuhusu kupakua na kusakinisha programu yenu.'
      : 'Hello Charles Websites, please assist me with downloading or installing the app.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-app-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#E8E8EC] bg-white shadow-2xl"
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

        <div className="space-y-6 p-6">
          {/* Device Detection + Official Domain Bar */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#151515]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#7137D8]" />
              <span>
                {t.downloadModal.detectedLabel}:{' '}
                <span className="text-[#E5092F]">
                  {t.downloadModal.deviceNames[detectedDevice]}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#686868]">
              <Globe className="h-3.5 w-3.5 text-[#7137D8]" />
              <span>{SITE_CONFIG.productionDomain}</span>
            </div>
          </div>

          {/* Download Started Confirmation */}
          {downloadStartedFor && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <p className="text-sm font-extrabold text-emerald-900">
                  {t.downloadModal.downloadStartedTitle} —{' '}
                  {allPlatforms.find((p) => p.id === downloadStartedFor)?.suggestedFileName ||
                    allPlatforms.find((p) => p.id === downloadStartedFor)?.name}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-emerald-800">
                  {t.downloadModal.downloadStartedSubtitle}
                </p>
              </div>
            </div>
          )}

          {/* Ordered Platform Cards */}
          <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
              orderedPlatforms.length >= 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            }`}
          >
            {orderedPlatforms.map((platform) => {
              const hasUrl = Boolean(platform.downloadUrl);
              const isRecommended = detectedDevice === platform.id;

              return (
                <div
                  key={platform.id}
                  className={`flex flex-col justify-between rounded-2xl border bg-white p-5 transition-colors ${
                    isRecommended
                      ? 'border-[#7137D8] ring-1 ring-[#7137D8]/20'
                      : 'border-[#E8E8EC] hover:border-[#7137D8]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8E8EC] bg-[#F7F7F9]">
                        {platformIcons[platform.id]}
                      </div>

                      <div className="flex flex-wrap justify-end gap-1.5">
                        {isRecommended && (
                          <span className="rounded-md border border-[#7137D8]/25 bg-[#7137D8]/10 px-2 py-1 text-[10px] font-bold text-[#7137D8]">
                            {t.downloadModal.recommendedBadge}
                          </span>
                        )}
                        {hasUrl ? (
                          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                            <Download className="h-3 w-3" />
                            <span>{locale === 'sw' ? 'Tayari' : 'Direct'}</span>
                          </span>
                        ) : platform.status === 'coming_soon' ? (
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#E8E8EC] bg-[#F7F7F9] px-2 py-1 text-[10px] font-bold text-[#686868]">
                            <Clock className="h-3 w-3 text-[#7137D8]" />
                            <span>{t.downloadModal.comingSoon}</span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                      {platform.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] font-medium text-[#686868]">
                      {platform.fileType}
                      {platform.fileSize ? ` · ${platform.fileSize}` : ''}
                    </p>

                    {platform.id === 'ios' && !hasUrl ? (
                      <div className="mt-3 rounded-xl border border-[#7137D8]/20 bg-[#F7F7F9] p-3">
                        <p className="text-xs font-bold text-[#151515]">
                          {t.downloadModal.iosComingSoonTitle}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#686868]">
                          {t.downloadModal.iosComingSoonBody}
                        </p>
                      </div>
                    ) : platform.id === 'mac' && !hasUrl ? (
                      <div className="mt-3 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-3">
                        <p className="text-xs font-bold text-[#151515]">
                          {t.downloadModal.macComingSoonTitle}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#686868]">
                          {t.downloadModal.macComingSoonBody}
                        </p>
                      </div>
                    ) : (
                      <p className="mt-2 text-xs leading-relaxed text-[#686868]">
                        {t.downloadModal.platformDescriptions[platform.id]}
                      </p>
                    )}

                    {platform.id === 'android' && hasUrl && (
                      <p className="mt-2.5 flex items-start gap-2 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-2.5 py-2 text-[11px] leading-relaxed text-[#151515]">
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7137D8]" />
                        <span>{t.downloadModal.androidDirectReassurance}</span>
                      </p>
                    )}

                    {platform.id === 'windows' && hasUrl && (
                      <p className="mt-2.5 flex items-start gap-2 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-2.5 py-2 text-[11px] leading-relaxed text-[#151515]">
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7137D8]" />
                        <span>{t.downloadModal.windowsDirectReassurance}</span>
                      </p>
                    )}

                    {/* Installation Steps on Android/Windows when downloaded or ready */}
                    {(platform.id === 'android' || platform.id === 'windows') &&
                      (hasUrl || downloadStartedFor === platform.id) && (
                        <ol className="mt-3 space-y-1 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-3 text-[11px] leading-relaxed text-[#151515]">
                          {platform.installSteps.map((step, idx) => (
                            <li key={step} className="flex items-start gap-1.5">
                              <span className="font-mono font-bold text-[#7137D8]">
                                {idx + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                  </div>

                  <div className="mt-5 border-t border-[#E8E8EC] pt-4">
                    {hasUrl && platform.downloadUrl ? (
                      platform.isExternalStore ? (
                        <a
                          href={platform.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-cta flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wide"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>{buttonLabelForPlatform(platform)}</span>
                        </a>
                      ) : (
                        <a
                          href={platform.downloadUrl}
                          download={platform.suggestedFileName || true}
                          onClick={() => setDownloadStartedFor(platform.id)}
                          className="btn-primary-cta flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wide"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{buttonLabelForPlatform(platform)}</span>
                        </a>
                      )
                    ) : platform.status === 'unconfigured' ? (
                      <p className="text-[11px] font-medium text-[#686868]">
                        {t.downloadModal.installerPendingNote}
                      </p>
                    ) : (
                      <p className="text-[11px] font-semibold text-[#7137D8]">
                        {platform.id === 'ios'
                          ? t.downloadModal.getIosBtn
                          : t.downloadModal.comingSoon}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security & Support Note */}
          <div className="flex items-start gap-2.5 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4 text-xs leading-relaxed text-[#686868]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#7137D8]" />
            <p>
              {iosAvailable
                ? t.downloadModal.securitySupportNoteIosLive
                : t.downloadModal.securitySupportNote}
            </p>
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
