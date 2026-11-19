'use client';

import React, { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
} from 'lucide-react';
import {
  AppDownloadOverrides,
  AppPlatformConfig,
  ClientPlatformId,
  DetectedDeviceType,
  detectVisitorDevice,
  getAppDownloadPlatforms,
  getOrderedPlatforms,
} from '@/lib/config/app-clients';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const emptySubscribe = () => () => {};

function getClientDetectedDevice(): DetectedDeviceType {
  if (typeof window === 'undefined') return 'other';
  return detectVisitorDevice(
    window.navigator.userAgent,
    window.navigator.platform || '',
    window.navigator.maxTouchPoints || 0
  );
}

interface DownloadAppSectionProps {
  fileSizes?: Partial<Record<ClientPlatformId, string>>;
  appDownloads?: AppDownloadOverrides;
  variant?: 'white' | 'gray';
}

export default function DownloadAppSection({
  fileSizes,
  appDownloads,
  variant = 'gray',
}: DownloadAppSectionProps) {
  const { locale, t } = useLanguage();
  const detectedDevice = useSyncExternalStore<DetectedDeviceType>(
    emptySubscribe,
    getClientDetectedDevice,
    () => 'other'
  );
  const [selectedTab, setSelectedTab] = useState<ClientPlatformId | null>(null);
  const activeTab: ClientPlatformId =
    selectedTab ?? (detectedDevice !== 'other' ? detectedDevice : 'android');
  const setActiveTab = (platformId: ClientPlatformId) => setSelectedTab(platformId);
  const [downloadStartedFor, setDownloadStartedFor] = useState<ClientPlatformId | null>(null);
  const [openGuideFor, setOpenGuideFor] = useState<ClientPlatformId | null>(null);

  const allPlatforms = useMemo(
    () => getAppDownloadPlatforms(appDownloads ?? { fileSizes }),
    [appDownloads, fileSizes]
  );
  const orderedPlatforms = useMemo(
    () => getOrderedPlatforms(allPlatforms, detectedDevice),
    [allPlatforms, detectedDevice]
  );

  const iosAvailable = Boolean(
    allPlatforms.find((item) => item.id === 'ios')?.downloadUrl
  );

  const platformIcon = (id: ClientPlatformId) => {
    switch (id) {
      case 'android':
        return <Smartphone className="h-5 w-5 text-[#E5092F]" />;
      case 'windows':
        return <Monitor className="h-5 w-5 text-[#151515]" />;
      case 'ios':
        return <TabletSmartphone className="h-5 w-5 text-[#7137D8]" />;
      case 'mac':
        return <Laptop className="h-5 w-5 text-[#151515]" />;
    }
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

  const switcherLabelForPlatform = (platform: AppPlatformConfig): string => {
    if (platform.id === 'ios') return t.downloadModal.getIosBtn;
    return platform.name;
  };

  const handleDirectDownloadStart = (platformId: ClientPlatformId) => {
    setDownloadStartedFor(platformId);
    setOpenGuideFor(platformId);
    setActiveTab(platformId);
  };

  const whatsappAppMessage =
    locale === 'sw'
      ? 'Habari Charles Websites, nahitaji msaada au taarifa kuhusu kupakua na kusakinisha programu yenu.'
      : 'Hello Charles Websites, I would like assistance with downloading or installing your app.';

  const sectionBg = variant === 'white' ? 'bg-white' : 'bg-[#F7F7F9] border-y border-[#E8E8EC]';

  return (
    <section id="download-app" className={`${sectionBg} py-20 sm:py-24`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header Row + Live Device Detection */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-[#7137D8]">
              {t.downloadModal.kicker}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
              {t.downloadModal.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.downloadModal.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 sm:flex-row sm:items-center lg:self-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-[#151515]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#7137D8]" />
              <span>
                {t.downloadModal.detectedLabel}:{' '}
                <span className="text-[#E5092F]">
                  {t.downloadModal.deviceNames[detectedDevice]}
                </span>
              </span>
            </div>
            <span className="hidden text-[#E8E8EC] sm:inline" aria-hidden="true">
              |
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[#686868]">
              <Globe className="h-3.5 w-3.5 text-[#7137D8]" />
              <span>{SITE_CONFIG.productionDomain}</span>
            </span>
          </div>
        </div>

        {/* Platform Switcher */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5" role="group" aria-label={t.downloadModal.switchPlatformLabel}>
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-[#686868]">
            {t.downloadModal.switchPlatformLabel}:
          </span>
          {orderedPlatforms.map((platform) => {
            const isSelected = activeTab === platform.id;
            const isDetected = detectedDevice === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => setActiveTab(platform.id)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E8E8EC] bg-white text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8]'
                }`}
              >
                {platformIcon(platform.id)}
                <span>{switcherLabelForPlatform(platform)}</span>
                {isDetected && (
                  <span className="rounded bg-[#7137D8] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {locale === 'sw' ? 'Kifaa Chako' : 'Detected'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Download Started Live Confirmation Banner */}
        {downloadStartedFor && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <p className="font-[family-name:var(--font-jakarta)] text-sm font-extrabold text-emerald-900">
                  {t.downloadModal.downloadStartedTitle} —{' '}
                  {allPlatforms.find((p) => p.id === downloadStartedFor)?.suggestedFileName ||
                    allPlatforms.find((p) => p.id === downloadStartedFor)?.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                  {t.downloadModal.downloadStartedSubtitle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ordered Platform Cards Grid (Detected/Recommended Device Shown First) */}
        <div
          className={`mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 ${
            orderedPlatforms.length >= 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {orderedPlatforms.map((platform) => {
            const isRecommended =
              detectedDevice === platform.id ||
              (detectedDevice === 'other' && platform.id === activeTab);
            const isSelected = activeTab === platform.id;
            const hasUrl = Boolean(platform.downloadUrl);
            const guideExpanded =
              openGuideFor === platform.id ||
              downloadStartedFor === platform.id ||
              isSelected;

            return (
              <article
                key={platform.id}
                onClick={() => setActiveTab(platform.id)}
                className={`flex flex-col justify-between rounded-2xl border bg-white p-6 transition-all ${
                  isRecommended
                    ? 'border-[#7137D8] ring-1 ring-[#7137D8]/20 shadow-md'
                    : isSelected
                      ? 'border-[#151515]/40 shadow-sm'
                      : 'border-[#E8E8EC] hover:border-[#7137D8]/50'
                }`}
              >
                <div>
                  {/* Card Top Meta Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8E8EC] bg-[#F7F7F9]">
                      {platformIcon(platform.id)}
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {isRecommended && (
                        <span className="rounded-md bg-[#7137D8]/10 px-2.5 py-1 text-[11px] font-bold text-[#7137D8] border border-[#7137D8]/25">
                          {t.downloadModal.recommendedBadge}
                        </span>
                      )}

                      {hasUrl ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          <Download className="h-3 w-3" />
                          <span>{locale === 'sw' ? 'Tayari' : 'Direct File'}</span>
                        </span>
                      ) : platform.status === 'coming_soon' ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#E8E8EC] bg-[#F7F7F9] px-2.5 py-1 text-[11px] font-bold text-[#686868]">
                          <Clock className="h-3 w-3 text-[#7137D8]" />
                          <span>{t.downloadModal.comingSoon}</span>
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Platform Title & File Specs */}
                  <h3 className="mt-5 font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
                    {platform.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-medium text-[#686868]">
                    {platform.fileType}
                    {platform.fileSize ? ` · ${platform.fileSize}` : ''}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#686868]">
                    {platform.requirements}
                  </p>

                  {/* Body Copy */}
                  {platform.id === 'ios' && !hasUrl ? (
                    <div className="mt-4 rounded-xl border border-[#7137D8]/20 bg-[#F7F7F9] p-4">
                      <p className="text-sm font-bold text-[#151515]">
                        {t.downloadModal.iosComingSoonTitle}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#686868]">
                        {t.downloadModal.iosComingSoonBody}
                      </p>
                    </div>
                  ) : platform.id === 'mac' && !hasUrl ? (
                    <div className="mt-4 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4">
                      <p className="text-sm font-bold text-[#151515]">
                        {t.downloadModal.macComingSoonTitle}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#686868]">
                        {t.downloadModal.macComingSoonBody}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-[#686868]">
                      {t.downloadModal.platformDescriptions[platform.id]}
                    </p>
                  )}

                  {platform.id === 'android' && hasUrl && (
                    <p className="mt-3 flex items-start gap-2 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3 py-2 text-[11px] leading-relaxed text-[#151515]">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7137D8]" />
                      <span>{t.downloadModal.androidDirectReassurance}</span>
                    </p>
                  )}

                  {platform.id === 'windows' && hasUrl && (
                    <p className="mt-3 flex items-start gap-2 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-3 py-2 text-[11px] leading-relaxed text-[#151515]">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7137D8]" />
                      <span>{t.downloadModal.windowsDirectReassurance}</span>
                    </p>
                  )}

                  {/* Installation Guide for Android & Windows (when configured) */}
                  {(platform.id === 'android' || platform.id === 'windows') && hasUrl && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenGuideFor((prev) =>
                            prev === platform.id ? null : platform.id
                          );
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7137D8] hover:text-[#E5092F] transition-colors cursor-pointer"
                        aria-expanded={guideExpanded}
                      >
                        <span>{t.downloadModal.installGuideTitle}</span>
                        {guideExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {guideExpanded && (
                        <ol className="mt-2.5 space-y-1.5 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-3.5 text-xs leading-relaxed text-[#151515]">
                          {platform.installSteps.map((step, idx) => (
                            <li key={step} className="flex items-start gap-2">
                              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#111111] font-mono text-[10px] font-bold text-white">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Button Area (Hidden cleanly when env var is empty/invalid) */}
                <div className="mt-6 border-t border-[#E8E8EC] pt-4">
                  {hasUrl && platform.downloadUrl ? (
                    platform.isExternalStore ? (
                      <a
                        href={platform.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${buttonLabelForPlatform(platform)} — ${platform.name}`}
                        className="btn-primary-cta flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        <span>{buttonLabelForPlatform(platform)}</span>
                      </a>
                    ) : (
                      <a
                        href={platform.downloadUrl}
                        download={platform.suggestedFileName || true}
                        onClick={() => handleDirectDownloadStart(platform.id)}
                        aria-label={`${buttonLabelForPlatform(platform)} (${platform.fileType})`}
                        className="btn-primary-cta flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide"
                      >
                        <Download className="h-4 w-4 shrink-0" />
                        <span>{buttonLabelForPlatform(platform)}</span>
                      </a>
                    )
                  ) : platform.status === 'unconfigured' ? (
                    <p className="text-xs font-medium text-[#686868]">
                      {t.downloadModal.installerPendingNote}
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-[#7137D8]">
                      {platform.id === 'ios'
                        ? t.downloadModal.getIosBtn
                        : t.downloadModal.comingSoon}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Security & Support Note + Help Actions */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#E8E8EC] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7137D8]/20 bg-[#7137D8]/10 text-[#7137D8]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-xs leading-relaxed text-[#686868] sm:text-sm">
              {iosAvailable
                ? t.downloadModal.securitySupportNoteIosLive
                : t.downloadModal.securitySupportNote}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(whatsappAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-outline inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>{t.downloadModal.whatsappCta}</span>
            </a>

            <Link
              href={`/contact?service=${encodeURIComponent('Android & iOS Mobile App Development')}`}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] px-4 py-2.5 text-xs font-bold text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8] transition-colors whitespace-nowrap"
            >
              <span>{t.downloadModal.notifyCta}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
