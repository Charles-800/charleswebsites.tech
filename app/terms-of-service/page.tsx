import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/seo/schema';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Service terms governing web development, AI integration, design deliverables, ownership, and project quotes from Charles Websites.',
  alternates: {
    canonical: '/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Charles Websites',
    description:
      'Transparent project scoping, ownership, and delivery terms for websites and digital solutions.',
    url: `${baseUrl}/terms-of-service`,
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: 'Terms of Service — Charles Websites',
    description:
      'Terms covering project quotes, scope, domain ownership, and technical services at Charles Websites.',
    path: '/terms-of-service',
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
            <span className="text-[#151515]">Terms of Service</span>
          </nav>
          <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base text-[#686868]">
            Clear expectations for scoping, building, launching, and maintaining websites and software with {SITE_CONFIG.name}.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[920px] space-y-8 px-4 sm:px-6 lg:px-8 text-sm leading-relaxed text-[#151515] sm:text-base">
          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              1. Project Scope & Quotes
            </h2>
            <p className="text-[#686868]">
              Starter (KES 39,890) and Business (KES 52,660) package pricing reflects the listed feature deliverables. Custom Premium applications, M-Pesa/Paystack commerce builds, and complex integrations are scoped individually in writing prior to project kickoff.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              2. Client Content & Approvals
            </h2>
            <p className="text-[#686868]">
              Delivery timelines depend on timely receipt of required business copy, photography, logos, domain/hosting credentials, and milestone review feedback. Upon final settlement of agreed invoices, clients retain ownership of their custom delivered website assets and domain registrations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              3. Third-Party Services & SEO Disclaimers
            </h2>
            <p className="text-[#686868]">
              Third-party platforms such as hosting providers, Safaricom M-Pesa Daraja APIs, Paystack, and search engines operate under their own terms and algorithms. While we implement technical SEO best practices, structured data, and speed optimization, no ethical provider can guarantee specific third-party search ranking positions.
            </p>
          </div>

          <div className="space-y-3 border-t border-[#E8E8EC] pt-6">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]">
              4. Inquiries
            </h2>
            <p className="text-[#686868]">
              Questions regarding project terms can be directed to{' '}
              <a href={SITE_CONFIG.emailHref} className="font-semibold text-[#7137D8] hover:underline">
                {SITE_CONFIG.email}
              </a>{' '}
              or via our{' '}
              <Link href="/contact" className="font-semibold text-[#E5092F] hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
