'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, ArrowUpRight, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl } from '@/lib/config/site';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white border-t border-white/10 pb-20 md:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-4 whitespace-nowrap">
              <Image
                src="/assets/aistudio/CHARLES_WEBSITES_91d4851c.png"
                alt="Charles Websites AI Logo"
                width={96}
                height={96}
                referrerPolicy="no-referrer"
                className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-[#0C152B] object-cover shadow-lg ring-1 ring-white/20"
              />
              <span className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold tracking-tight text-white">
                CHARLES <span className="text-[#E5092F]">WEBSITES</span>
              </span>
            </Link>

            <p className="text-sm font-semibold tracking-wide text-white/90">
              {t.hero.tagline}
            </p>

            <p className="max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
              {t.footer.description}
            </p>

            {SITE_CONFIG.socials.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-3">
                {SITE_CONFIG.socials.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/" className="hover:text-[#8B5CF6] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B5CF6] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#8B5CF6] transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8B5CF6] transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8B5CF6] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Solutions Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/web-design-kenya" className="hover:text-[#8B5CF6] transition-colors">
                  Website Design & Development Kenya
                </Link>
              </li>
              <li>
                <Link
                  href="/ecommerce-website-development"
                  className="hover:text-[#8B5CF6] transition-colors"
                >
                  E-Commerce & M-Pesa Websites
                </Link>
              </li>
              <li>
                <Link href="/ai-solutions" className="hover:text-[#8B5CF6] transition-colors">
                  AI Chatbots & Business Automation
                </Link>
              </li>
              <li>
                <Link href="/seo-services" className="hover:text-[#8B5CF6] transition-colors">
                  Technical & Local SEO Services
                </Link>
              </li>
              <li>
                <Link href="/graphic-design" className="hover:text-[#8B5CF6] transition-colors">
                  Graphic Design & Branding
                </Link>
              </li>
              <li>
                <Link href="/software-development" className="hover:text-[#8B5CF6] transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/healthcare-websites"
                  className="hover:text-[#8B5CF6] transition-colors"
                >
                  Hospitals & Clinics Websites
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/law-firm-websites"
                  className="hover:text-[#8B5CF6] transition-colors"
                >
                  Law Firm & Statutory Websites
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/hotel-hospitality-websites"
                  className="hover:text-[#8B5CF6] transition-colors"
                >
                  Hotels & Real Estate Websites
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing & Direct Contact Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                {t.footer.pricingTitle}
              </h3>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                {t.pricing.packages.map((pkg) => (
                  <li key={pkg.id}>
                    <Link
                      href="/pricing"
                      className="flex items-center justify-between hover:text-[#8B5CF6] transition-colors"
                    >
                      <span>{pkg.name}</span>
                      <span className="font-mono text-xs tabular-nums text-white/80">
                        {pkg.id === 'premium' ? 'Quote' : pkg.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                {t.footer.contactTitle}
              </h3>
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center gap-2.5 text-sm text-white/90 hover:text-[#8B5CF6] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#E5092F]" />
                <span>
                  {t.footer.phoneLabel}: {SITE_CONFIG.phoneDisplay}
                </span>
              </a>
              <a
                href={buildWhatsAppUrl(t.contact.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/90 hover:text-[#8B5CF6] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#E5092F]" />
                <span>
                  {t.footer.whatsappLabel}: {SITE_CONFIG.whatsappDisplay}
                </span>
              </a>
              <a
                href={SITE_CONFIG.emailHref}
                className="flex items-center gap-2.5 text-sm text-white/90 hover:text-[#8B5CF6] transition-colors break-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#E5092F]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              {SITE_CONFIG.gbpUrl && (
                <a
                  href={SITE_CONFIG.gbpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors"
                >
                  <span>Google Business Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#A1A1AA] sm:flex-row sm:items-center">
          <p>
            © {currentYear} {SITE_CONFIG.name} — {SITE_CONFIG.title}. {t.footer.rightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#8B5CF6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#8B5CF6] transition-colors">
              Terms of Service
            </Link>
            <span className="font-mono tabular-nums text-white/60">
              {SITE_CONFIG.currency} · {SITE_CONFIG.location}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
