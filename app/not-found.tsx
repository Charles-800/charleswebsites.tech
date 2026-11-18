import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home, Layers, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config/site';

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[760px] px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-sm font-bold tracking-widest text-[#E5092F]">
          ERROR 404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#686868] sm:text-lg">
          The page you are looking for may have been moved or does not exist. Explore our services,
          portfolio, or reach out directly to start your project.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="btn-primary-cta inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-xs font-extrabold tracking-wider"
          >
            <Home className="h-4 w-4" />
            <span>BACK TO HOMEPAGE</span>
          </Link>

          <Link
            href="/services"
            className="btn-secondary-outline inline-flex min-h-[48px] items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
          >
            <Layers className="h-4 w-4 text-[#7137D8]" />
            <span>VIEW SERVICES</span>
          </Link>

          <Link
            href="/contact"
            className="btn-secondary-outline inline-flex min-h-[48px] items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="h-4 w-4 text-[#E5092F]" />
          </Link>
        </div>

        <div className="mt-10 border-t border-[#E8E8EC] pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#686868]">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 hover:text-[#7137D8]">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Explore Portfolio</span>
          </Link>
          <a href={SITE_CONFIG.phoneHref} className="inline-flex items-center gap-1.5 hover:text-[#7137D8]">
            <Phone className="h-3.5 w-3.5 text-[#E5092F]" />
            <span>Call {SITE_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
