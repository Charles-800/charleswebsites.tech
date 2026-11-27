import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
import { getSiteBaseUrl } from '@/lib/config/site';
import {
  buildOrganizationAndServiceSchema,
  buildWebSiteSchema,
} from '@/lib/seo/schema';

const jakarta = localFont({
  src: './fonts/plus-jakarta-sans-latin.woff2',
  weight: '500 800',
  style: 'normal',
  variable: '--font-jakarta',
  display: 'swap',
});

const manrope = localFont({
  src: './fonts/manrope-latin.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin.woff2',
  weight: '400 600',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
});

const siteBaseUrl = getSiteBaseUrl();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification =
  process.env.NEXT_PUBLIC_BING_VERIFICATION?.trim() || '70FAF451D53FE356E7829A6C438890AD';
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Website Design & Web Development Kenya | Charles Websites',
    template: '%s | Charles Websites',
  },
  description:
    'Custom website design, web development, e-commerce M-Pesa stores, AI chatbots, graphic branding, and technical SEO in Kenya starting at KES 39,890.',
  icons: {
    icon: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
    apple: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
  },
  alternates: {
    canonical: '/',
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
        },
      }
    : {}),
  openGraph: {
    title: 'Website Design & Web Development Kenya | Charles Websites',
    description:
      'We build websites, engineer AI intelligence, and grow businesses across Kenya and worldwide. Explore custom web design, e-commerce, SEO, and KES packages.',
    url: siteBaseUrl,
    siteName: 'Charles Websites',
    type: 'website',
    locale: 'en_KE',
    images: [
      {
        url: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
        alt: 'Charles Websites AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design & Web Development Kenya | Charles Websites',
    description:
      'Custom business websites, AI chatbots, M-Pesa integrations, and SEO engineered for growth.',
    images: ['/assets/aistudio/CHARLES_WEBSITES_91d4851c.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = buildOrganizationAndServiceSchema();
  const websiteSchema = buildWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="min-h-screen bg-white text-[#151515] antialiased selection:bg-[#7137D8] selection:text-white"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        )}
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingContact />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
