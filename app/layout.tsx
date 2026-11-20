import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
import { SITE_CONFIG, getSiteBaseUrl } from '@/lib/config/site';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteBaseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Charles Websites — Web Development & AI Engineering Agency',
    template: '%s | Charles Websites',
  },
  description:
    'Your digital growth partner. We create powerful websites, AI chatbots, and intelligent business automation in Kenya to attract customers and grow online.',
  icons: {
    icon: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
    apple: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Charles Websites — Web Development & AI Engineering Agency',
    description:
      'We build websites, engineer intelligence, and grow businesses. Explore custom web design, AI integration, SEO, and transparent KES packages.',
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
    title: 'Charles Websites — Web Development & AI Engineering Agency',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: siteBaseUrl,
    logo: `${siteBaseUrl}/assets/aistudio/CHARLES_WEBSITES_91d4851c.png`,
    description:
      'Web Development & AI Engineering agency building modern websites, AI chatbots, Android & iOS mobile apps, and business automation.',
    telephone: '+254112298275',
    email: SITE_CONFIG.email,
    areaServed: 'KE',
    ...(SITE_CONFIG.socials.length > 0
      ? { sameAs: SITE_CONFIG.socials.map((s) => s.href) }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254112298275',
      contactType: 'sales',
      availableLanguage: ['English', 'Swahili'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: siteBaseUrl,
    inLanguage: ['en', 'sw'],
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white text-[#151515] antialiased selection:bg-[#7137D8] selection:text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
