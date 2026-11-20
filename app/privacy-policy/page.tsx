import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read how Charles Websites collects, uses, and protects project inquiry details submitted through contact forms, email, and WhatsApp.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Charles Websites',
    description:
      'Data handling, inquiry confidentiality, and security practices at Charles Websites.',
    url: `${baseUrl}/privacy-policy`,
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: 'Privacy Policy — Charles Websites',
    description:
      'How Charles Websites handles client inquiry data, email correspondence, and website security.',
    path: '/privacy-policy',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-14 sm:py-20">
        <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#686868]">
            <Link href="/" className="hover:text-[#7137D8]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span className="text-[#151515]">Privacy Policy</span>
          </nav>
          <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-[#686868]">
            How {SITE_CONFIG.name} collects, uses, and safeguards information you share when inquiring about web development, design, or AI services.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[920px] space-y-8 px-4 sm:px-6 lg:px-8 text-sm leading-relaxed text-[#151515] sm:text-base">
          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              1. Information We Collect
            </h2>
            <p className="text-[#686868]">
              When you submit a project inquiry on our contact page, we collect only the details you provide directly: your full name, email address, phone number, optional company name, selected service, estimated budget range, and project description.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              2. How We Use Your Information
            </h2>
            <p className="text-[#686868]">
              Your details are used strictly to respond to your inquiry, prepare project proposals or quotations, communicate regarding active builds, and provide requested support. We do not sell, rent, or trade client contact information to third parties or marketing brokers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              3. Language Preferences & Essential Cookies
            </h2>
            <p className="text-[#686868]">
              This website may store basic interface preferences such as your chosen display language (English or Kiswahili) locally in your browser so pages remain consistent as you navigate. If optional analytics measurement is enabled in production, aggregate usage telemetry helps improve site speed and page usability without selling personal data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              4. Security & Data Retention
            </h2>
            <p className="text-[#686868]">
              All inquiries are transmitted over HTTPS encryption. We retain correspondence only as long as reasonably required to manage client consultations, proposals, or ongoing technical support.
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E8E8EC] pt-6">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              5. Privacy Requests & Contact
            </h2>
            <p className="text-[#686868]">
              You may request updates or deletion of inquiry details you previously submitted by emailing{' '}
              <a href={SITE_CONFIG.emailHref} className="font-semibold text-[#7137D8] hover:underline">
                {SITE_CONFIG.email}
              </a>{' '}
              or calling{' '}
              <a href={SITE_CONFIG.phoneHref} className="font-semibold text-[#7137D8] hover:underline">
                {SITE_CONFIG.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
