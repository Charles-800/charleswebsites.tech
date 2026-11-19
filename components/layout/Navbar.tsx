'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Globe, Download } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';
import type { AppDownloadOverrides } from '@/lib/config/app-clients';
import DownloadAppModal from '@/components/layout/DownloadAppModal';

const PRIMARY_ROUTES = ['/', '/about', '/services', '/portfolio', '/pricing', '/blog', '/contact'];

interface NavbarProps {
  appDownloads?: AppDownloadOverrides;
}

export default function Navbar({ appDownloads }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, t } = useLanguage();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [navTarget, setNavTarget] = useState<{ from: string; to: string } | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const mobileOpen = openPathname === pathname;
  const isNavigating = navTarget !== null && navTarget.from === pathname && navTarget.to !== pathname;

  const setMobileOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === 'function' ? next(mobileOpen) : next;
    setOpenPathname(resolved ? pathname : null);
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    const timer = window.setTimeout(() => {
      PRIMARY_ROUTES.forEach((route) => {
        router.prefetch(route);
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/services', label: t.nav.services },
    { href: '/portfolio', label: t.nav.portfolio },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/blog', label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E8EC] bg-white">
      {isNavigating && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#E5092F] via-[#7137D8] to-[#8B5CF6]"
        />
      )}
      <div className="mx-auto flex h-[76px] sm:h-[84px] lg:h-[88px] max-w-[1280px] items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <Link
          href="/"
          prefetch={true}
          onClick={() => {
            setMobileOpen(false);
            setNavTarget({ from: pathname, to: '/' });
          }}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3.5 text-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7137D8] rounded-xl active:scale-[0.98] transition-transform duration-75"
        >
          <Image
            src="/assets/aistudio/CHARLES_WEBSITES_91d4851c.png"
            alt="Charles Websites AI Logo"
            width={72}
            height={72}
            priority
            referrerPolicy="no-referrer"
            className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px] shrink-0 rounded-xl bg-[#0C152B] object-cover shadow-sm ring-1 ring-[#151515]/15"
          />
          <span className="truncate font-[family-name:var(--font-jakarta)] text-[14px] font-extrabold tracking-tight text-[#151515] sm:text-lg lg:text-xl">
            CHARLES <span className="text-[#E5092F]">WEBSITES</span>
          </span>
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onMouseEnter={() => router.prefetch(item.href)}
                onFocus={() => router.prefetch(item.href)}
                onTouchStart={() => router.prefetch(item.href)}
                onClick={() => setNavTarget({ from: pathname, to: item.href })}
                className={`relative whitespace-nowrap shrink-0 py-1 text-sm font-medium transition-colors duration-75 active:scale-[0.97] ${
                  active
                    ? 'text-[#7137D8] font-semibold'
                    : 'text-[#151515] hover:text-[#7137D8]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-[#7137D8]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Desktop Language Switcher + Primary CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div
            className="flex items-center rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] p-0.5"
            role="group"
            aria-label={t.nav.languageLabel}
          >
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                locale === 'en'
                  ? 'bg-white text-[#151515] shadow-xs'
                  : 'text-[#686868] hover:text-[#7137D8]'
              }`}
              aria-pressed={locale === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('sw')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                locale === 'sw'
                  ? 'bg-white text-[#151515] shadow-xs'
                  : 'text-[#686868] hover:text-[#7137D8]'
              }`}
              aria-pressed={locale === 'sw'}
            >
              SW
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setDownloadModalOpen(true);
            }}
            className="btn-primary-cta inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span>{t.nav.downloadApp}</span>
          </button>
        </div>

        {/* Mobile Controls (Always visible below lg) */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'sw' : 'en')}
            className="inline-flex h-10 items-center gap-1 rounded-lg border border-[#E8E8EC] bg-[#F7F7F9] px-2.5 text-xs font-bold text-[#151515] hover:text-[#7137D8] active:scale-95 transition-transform duration-75 cursor-pointer"
            aria-label={t.nav.languageLabel}
          >
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>{locale === 'en' ? 'SW' : 'EN'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setDownloadModalOpen(true);
            }}
            className="btn-primary-cta hidden sm:inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-xs font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span>{t.nav.downloadApp}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#111111] px-3 text-xs font-bold text-white transition-all duration-75 hover:bg-[#7137D8] active:scale-95 cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? (
              <>
                <X className="h-4 w-4 shrink-0" />
                <span>{locale === 'sw' ? 'Funga' : 'Close'}</span>
              </>
            ) : (
              <>
                <Menu className="h-4 w-4 shrink-0" />
                <span>{locale === 'sw' ? 'Menyu' : 'Menu'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full-Viewport Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[76px] sm:top-[84px] bottom-0 z-50 overflow-y-auto border-t border-[#E8E8EC] bg-white px-4 pb-10 pt-4"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onTouchStart={() => router.prefetch(item.href)}
                  onClick={() => {
                    setMobileOpen(false);
                    setNavTarget({ from: pathname, to: item.href });
                  }}
                  className={`flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-75 active:scale-[0.99] ${
                    active
                      ? 'bg-[#F7F7F9] text-[#7137D8] border border-[#7137D8]/25'
                      : 'text-[#151515] hover:bg-[#F7F7F9] hover:text-[#7137D8]'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle Row */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#686868]">
              {t.nav.languageLabel}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  locale === 'en'
                    ? 'bg-[#111111] text-white'
                    : 'bg-white text-[#151515] border border-[#E8E8EC]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale('sw')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  locale === 'sw'
                    ? 'bg-[#111111] text-white'
                    : 'bg-white text-[#151515] border border-[#E8E8EC]'
                }`}
              >
                Kiswahili
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#E8E8EC] pt-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setDownloadModalOpen(true);
              }}
              className="btn-primary-cta flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold tracking-wide cursor-pointer"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span>{t.nav.downloadApp}</span>
            </button>
            <a
              href={buildWhatsAppUrl(t.contact.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary-outline flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
            >
              <MessageCircle className="h-4 w-4 text-[#E5092F]" />
              <span>{t.nav.whatsappUs}</span>
            </a>
            <a
              href={SITE_CONFIG.phoneHref}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] px-4 py-3 text-sm font-bold text-[#151515] hover:text-[#7137D8] sm:col-span-2"
            >
              <Phone className="h-4 w-4 text-[#7137D8]" />
              <span>{t.nav.callUs}</span>
            </a>
          </div>
        </div>
      )}

      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        appDownloads={appDownloads}
      />
    </header>
  );
}
