export interface SeoLandingSection {
  title: string;
  description: string;
  bullets: string[];
}

export interface SeoLandingFaq {
  question: string;
  answer: string;
}

export interface SeoLandingRelatedLink {
  label: string;
  href: string;
  description: string;
}

export interface SeoLandingPageData {
  slug: string;
  path: string;
  category: 'service' | 'industry';
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  h1: string;
  intro: string;
  serviceType: string;
  startingPriceNote: string;
  sections: SeoLandingSection[];
  deliverablesTitle: string;
  deliverables: string[];
  faqs: SeoLandingFaq[];
  relatedProjectSlugs: string[];
  relatedLinks: SeoLandingRelatedLink[];
}

export const SERVICE_LANDING_PAGES: Record<string, SeoLandingPageData> = {
  'web-design-kenya': {
    slug: 'web-design-kenya',
    path: '/web-design-kenya',
    category: 'service',
    seoTitle: 'Custom Business Website Design Kenya',
    seoDescription:
      'Custom website design and web development in Kenya. Fast, mobile-responsive business websites, redesigns, hosting setup, and maintenance starting at KES 39,890.',
    kicker: 'WEBSITE DESIGN & WEB DEVELOPMENT IN KENYA',
    h1: 'Custom Website Design & Web Development in Kenya',
    intro:
      'Charles Websites engineers fast, mobile-responsive business websites, corporate portals, landing pages, and custom web applications for companies across Nairobi, Mombasa, Nanyuki, Kisumu, Nakuru, and worldwide.',
    serviceType: 'Website Design & Web Development',
    startingPriceNote: 'Starter websites from KES 39,890 · Business sites from KES 52,660',
    sections: [
      {
        title: 'Custom Website Design & Business Websites',
        description:
          'Every business has a distinct buyer journey. Instead of forcing your brand into a bloated generic template, we design clean, conversion-focused layouts tailored to Kenyan and international customers.',
        bullets: [
          'Corporate & company profile websites built for credibility and direct lead capture',
          'High-converting landing pages for service campaigns, product launches, and promotions',
          'Professional portfolio websites for consultants, clinics, advocates, and agencies',
          'Responsive mobile-first design tested across Android phones, iPhones, tablets, and desktops',
        ],
      },
      {
        title: 'Website Redesign, Maintenance & Hosting Assistance',
        description:
          'If your existing website looks outdated, loads slowly on mobile networks, or fails to convert visitors into WhatsApp and phone inquiries, we rebuild and maintain it cleanly.',
        bullets: [
          'Full website redesign while preserving your existing domain and search equity via proper 301 redirects',
          'Ongoing website maintenance: security patches, content updates, backups, and uptime checks',
          'Domain, SSL (HTTPS), and hosting assistance for reliable Kenya and global performance',
          'WordPress website development alongside modern Next.js and Node.js architectures',
        ],
      },
      {
        title: 'Performance, Security & SEO Foundations Included',
        description:
          'Speed and search visibility are engineered into the codebase from day one—never bolted on as an afterthought.',
        bullets: [
          'Semantic HTML5 heading hierarchy, clean URLs, and self-referencing canonical tags',
          'Compressed WebP/AVIF imagery and Core Web Vitals optimization for fast mobile loading',
          'WhatsApp direct inquiry buttons, validated contact forms, and spam protection',
          'Structured Schema.org markup so search engines clearly verify your services and contact details',
        ],
      },
    ],
    deliverablesTitle: 'What Every Web Development Project Includes',
    deliverables: [
      'Custom responsive design tailored to your brand identity',
      'Clean H1–H3 structure, XML sitemap, robots.txt, and meta tags',
      'Direct WhatsApp, click-to-call (0112298275-style mobile actions), and working contact forms',
      'SSL HTTPS configuration and security headers',
      'Cross-browser testing before launch and post-launch handover',
      'Transparent pricing starting at KES 39,890 (Starter) and KES 52,660 (Business)',
    ],
    faqs: [
      {
        question: 'How much does website design cost in Kenya?',
        answer:
          'At Charles Websites, our Starter 4-page business website package is KES 39,890, our Business package (4–7 pages with AI chatbot and SEO setup) is KES 52,660, and custom Premium e-commerce or web applications are quoted based on exact scope.',
      },
      {
        question: 'Which cities in Kenya do you serve for website development?',
        answer:
          'We work directly with clients in Nairobi, Mombasa, Nanyuki, Kisumu, Nakuru, and across Kenya—as well as remote international businesses—via structured online discovery, phone (0112298275), and WhatsApp (+254112298275).',
      },
      {
        question: 'Can you redesign my existing WordPress or company website?',
        answer:
          'Yes. We audit your current site, preserve important URLs with clean redirects so you do not lose existing search rankings, and rebuild the interface for faster mobile speed and clearer conversions.',
      },
      {
        question: 'Do you assist with website hosting and maintenance after launch?',
        answer:
          'Yes. We assist with domain connection, HTTPS/SSL setup, Hostinger or VPS deployment, regular content updates, backups, and technical maintenance.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'lenanns-healthcare', 'makuri-auctioneers'],
    relatedLinks: [
      {
        label: 'E-Commerce & M-Pesa Websites',
        href: '/ecommerce-website-development',
        description: 'Build an online store with product catalogs and M-Pesa / Paystack checkout.',
      },
      {
        label: 'Website Packages & KES Pricing',
        href: '/pricing',
        description: 'Compare Starter (KES 39,890), Business (KES 52,660), and Premium features.',
      },
      {
        label: 'SEO Services Kenya',
        href: '/seo-services',
        description: 'Strengthen technical SEO, Google visibility, and local search discoverability.',
      },
      {
        label: 'AI Solutions & Chatbots',
        href: '/ai-solutions',
        description: 'Add 24/7 customer inquiry automation and AI assistants to your website.',
      },
    ],
  },

  'ecommerce-website-development': {
    slug: 'ecommerce-website-development',
    path: '/ecommerce-website-development',
    category: 'service',
    seoTitle: 'Ecommerce Website Development & M-Pesa Kenya',
    seoDescription:
      'Custom e-commerce website development in Kenya with product catalogs, mobile shopping carts, M-Pesa & Paystack payments, order tracking, and product SEO.',
    kicker: 'ONLINE STORES & PAYMENT INTEGRATIONS',
    h1: 'Ecommerce Website Development & M-Pesa Integration in Kenya',
    intro:
      'Launch a reliable online store built for Kenyan shoppers—featuring fast mobile product browsing, structured catalogs, inventory management, and verified M-Pesa or Paystack payment integration where supported.',
    serviceType: 'Ecommerce Website Development',
    startingPriceNote: 'Included in Custom Premium Quote · Tailored to SKU count & payment flows',
    sections: [
      {
        title: 'Product Catalogues, Search & Mobile Shopping UX',
        description:
          'Most Kenyan shoppers browse and buy on smartphones. We build storefronts where customers find the exact product, variation, or spare part in seconds without endless scrolling.',
        bullets: [
          'Structured product categories, attributes, SKU filtering, and clean product URLs',
          'Fast, tap-friendly shopping cart and streamlined single-page checkout',
          'Direct WhatsApp product inquiry fallback for high-consideration or custom orders',
          'WooCommerce website development and custom React/Next.js e-commerce builds',
        ],
      },
      {
        title: 'M-Pesa, Paystack & Secure Order Management',
        description:
          'Online payments require strict server-side verification. Every checkout flow is engineered so orders are only marked paid after verified payment confirmation.',
        bullets: [
          'M-Pesa (Daraja STK Push) integration where your Till or Paybill API credentials are supported',
          'Paystack card and mobile money checkout integration for local and international buyers',
          'Inventory tracking, order status dashboards, and automated order notification emails',
          'HTTPS encryption, input validation, and protected admin endpoints',
        ],
      },
      {
        title: 'Product SEO & Store Security',
        description:
          'An online store only sells when shoppers find your products on Google and trust your checkout page.',
        bullets: [
          'SEO-friendly product titles, descriptive alt text, clean canonical URLs, and category pages',
          'Compressed product photography so catalog pages load quickly on cellular connections',
          'Clear shipping, return, and contact policies to build shopper confidence',
        ],
      },
    ],
    deliverablesTitle: 'E-Commerce Capabilities Delivered',
    deliverables: [
      'Custom online store or WooCommerce catalog architecture',
      'Mobile-first product filtering, cart, and checkout experience',
      'Server-verified M-Pesa (STK Push) / Paystack integration where supported',
      'Inventory and order management workflow',
      'Product-level SEO metadata and fast WebP imagery',
      'Direct WhatsApp order and customer support integration',
    ],
    faqs: [
      {
        question: 'Can my Kenyan online store accept M-Pesa payments automatically?',
        answer:
          'Yes. Where your business has an active Safaricom Daraja Paybill/Till API or a verified Paystack merchant account, we integrate M-Pesa STK Push and card payments with server-side callback verification.',
      },
      {
        question: 'Do you build both WooCommerce and custom e-commerce websites?',
        answer:
          'Yes. We build WooCommerce (WordPress) online stores for teams familiar with WordPress management, as well as high-speed custom Next.js or Node.js storefronts for specialized catalogs.',
      },
      {
        question: 'Can customers also order via WhatsApp if they prefer?',
        answer:
          'Yes. Many Kenyan buyers prefer confirming delivery details on WhatsApp. We can pair standard checkout with direct "Order / Inquire via WhatsApp" buttons containing the product reference.',
      },
    ],
    relatedProjectSlugs: ['nyati-autospares', 'ruevan-limited'],
    relatedLinks: [
      {
        label: 'Website Design Kenya',
        href: '/web-design-kenya',
        description: 'Explore our full-stack web design and maintenance services.',
      },
      {
        label: 'How to Accept M-Pesa on a Website',
        href: '/blog/how-to-accept-mpesa-payments-on-a-website',
        description: 'Read our technical guide on M-Pesa STK Push & checkout security.',
      },
      {
        label: 'Request E-Commerce Quote',
        href: '/contact?service=Premium%20Custom%20Website%20%2F%20E-Commerce%20%2F%20M-Pesa',
        description: 'Share your product catalog size and payment needs for a quote.',
      },
    ],
  },

  'ai-solutions': {
    slug: 'ai-solutions',
    path: '/ai-solutions',
    category: 'service',
    seoTitle: 'AI Website Integration & Chatbot Development Kenya',
    seoDescription:
      'Practical AI website development, custom AI chatbot integration, and business automation in Kenya. Grounded assistants that qualify leads and automate support.',
    kicker: 'AI ENGINEERING & BUSINESS AUTOMATION',
    h1: 'AI Integration, Chatbot Development & Business Automation in Kenya',
    intro:
      'We build practical AI-powered features for business websites—custom chatbots grounded in your real service data, automated inquiry routing, and workflow integrations that save staff hours.',
    serviceType: 'AI Website Development & Chatbot Integration',
    startingPriceNote: 'Included in Business Package (KES 52,660) & Custom AI Automation Builds',
    sections: [
      {
        title: 'Grounded AI Chatbots for Websites',
        description:
          'Visitors leave when questions go unanswered after hours. We engineer AI assistants connected to your verified services, pricing, and policies—never generic bots that hallucinate answers.',
        bullets: [
          'Instant answers to customer questions about pricing, services, hours, and booking requirements',
          'Natural bilingual English and Kiswahili support where needed by your audience',
          'Smart lead capture that collects name, contact, and project scope before handing off to WhatsApp or email',
          'Strict grounding guardrails so responses stay aligned with your approved business information',
        ],
      },
      {
        title: 'AI Business Automation & Custom Dashboards',
        description:
          'Beyond chat widgets, we connect web forms, email relays, webhooks, and AI summarization into dependable operational workflows.',
        bullets: [
          'Automated lead classification and structured email/CRM summaries for sales teams',
          'Customer support triage and FAQ routing for clinics, agencies, and online stores',
          'Custom web applications and internal dashboards engineered with Node.js and TypeScript',
          'Honest architecture: we only promise automation features backed by verified APIs and clear fallbacks',
        ],
      },
    ],
    deliverablesTitle: 'What You Get With AI Integration',
    deliverables: [
      'Custom website AI assistant configured with your verified business knowledge',
      'Server-side API key protection (credentials never exposed in the browser)',
      'Seamless handoff from AI chat to WhatsApp (+254...) or human inquiry forms',
      'Lead capture validation, rate limiting, and structured summary delivery',
      'Clear documentation on updating your assistant knowledge base',
    ],
    faqs: [
      {
        question: 'Can you add an AI chatbot to an existing business website?',
        answer:
          'Yes. We can integrate a custom AI chatbot into an existing website or include it as part of our Business Package (KES 52,660) or Premium Package.',
      },
      {
        question: 'How do you stop an AI chatbot from giving wrong prices or promises?',
        answer:
          'We ground the assistant strictly on your verified services, KES pricing, and FAQ policies using controlled system instructions and server-side validation, with clear fallback links to speak directly with your team.',
      },
      {
        question: 'What business tasks can AI actually automate on a website?',
        answer:
          'Realistic, reliable wins include 24/7 FAQ answering, initial lead qualification, categorizing contact inquiries, summarizing long project briefs for your team, and routing customers to the right booking or WhatsApp channel.',
      },
    ],
    relatedProjectSlugs: ['lenanns-healthcare', 'ruevan-limited'],
    relatedLinks: [
      {
        label: 'How AI Chatbots Help Generate Leads',
        href: '/blog/how-ai-chatbots-help-businesses-generate-leads',
        description: 'Explore practical lead capture workflows with AI assistants.',
      },
      {
        label: 'Business Package (KES 52,660)',
        href: '/pricing',
        description: 'Includes a 4–7 page website, AI chatbot integration, and SEO setup.',
      },
      {
        label: 'Book an AI Consultation',
        href: '/contact?service=AI%20Engineering%20%26%20Business%20Automation',
        description: 'Discuss practical AI automation tailored to your operations.',
      },
    ],
  },

  'seo-services': {
    slug: 'seo-services',
    path: '/seo-services',
    category: 'service',
    seoTitle: 'SEO Services Kenya — Technical & Local SEO',
    seoDescription:
      'Transparent SEO services in Kenya: technical SEO audits, Core Web Vitals speed optimization, local SEO, Schema.org markup, and AI search readiness.',
    kicker: 'GOOGLE SEARCH & AI DISCOVERABILITY',
    h1: 'Technical SEO, Local SEO & AI Search Optimization in Kenya',
    intro:
      'A well-designed website needs strong technical architecture and clear content to compete on Google and AI answer engines. We fix crawlability issues, speed bottlenecks, structured data, and local relevance transparently.',
    serviceType: 'Search Engine Optimization (SEO)',
    startingPriceNote: 'SEO Foundations Included in Website Builds · Standalone Audits & Retainers Available',
    sections: [
      {
        title: 'Technical SEO & Crawlability Engineering',
        description:
          'Search engines must be able to crawl, render, and understand every key page on your domain without hitting duplicate URLs, slow scripts, or missing metadata.',
        bullets: [
          'Unique title tags, compelling meta descriptions, and self-referencing canonical URLs',
          'Clean XML sitemaps, valid robots.txt rules, and proper 301 redirect mapping',
          'Server-side rendering (SSR) / static HTML accessibility so bots read full content immediately',
          'Core Web Vitals optimization (LCP, INP, CLS), WebP/AVIF images, and proper caching headers',
        ],
      },
      {
        title: 'Local SEO for Kenya & AI Search Optimization (AEO / GEO)',
        description:
          'Modern buyers search on Google Maps/Search as well as AI platforms like ChatGPT Search, Google AI Overviews, and Perplexity.',
        bullets: [
          'Consistent business entity details (name, phone, email, service coverage) across pages and Schema.org JSON-LD',
          'Clear question-and-answer structures that help search and answer engines extract accurate service facts',
          'Service-specific and industry-specific landing pages matching real commercial buyer intent',
          'Ethical white-hat practices: zero doorway pages, zero keyword stuffing, and zero fabricated ranking guarantees',
        ],
      },
    ],
    deliverablesTitle: 'SEO Deliverables & Realistic Expectations',
    deliverables: [
      'Complete technical audit covering indexing, canonicals, speed, and mobile usability',
      'Schema.org JSON-LD markup (Organization, Service, BreadcrumbList, Article, FAQPage)',
      'On-page optimization of H1–H3 headings, internal links, and image alt attributes',
      'Google Search Console and Bing Webmaster Tools sitemap readiness',
      'Honest reporting: SEO compounds over weeks and months—we never promise instant #1 rankings',
    ],
    faqs: [
      {
        question: 'How long does SEO take to show results in Kenya?',
        answer:
          'Technical fixes and clean indexing can be picked up by Google within days to a few weeks, while competitive organic ranking growth typically builds over 3 to 6 months depending on competition, content quality, and domain history. No ethical SEO provider can guarantee a #1 ranking.',
      },
      {
        question: 'What is included in your technical SEO setup?',
        answer:
          'We configure unique page titles and meta descriptions, canonical URLs, XML sitemap, robots.txt, clean semantic headings, Core Web Vitals speed optimization, image alt text, and valid Schema.org structured data.',
      },
      {
        question: 'How do you optimize websites for AI search engines like Google AI Overviews and ChatGPT?',
        answer:
          'We structure pages with clear factual answers, explicit entity details, comparison tables, clean HTML rendering, valid structured data, and transparent pricing/service information so retrieval systems can verify and cite your business accurately.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'makuri-auctioneers', 'mms-advocates'],
    relatedLinks: [
      {
        label: 'Website SEO Checklist for Kenya',
        href: '/blog/website-seo-checklist-for-kenyan-businesses',
        description: 'Step-by-step technical and local SEO checklist for growing brands.',
      },
      {
        label: 'Website Design Kenya',
        href: '/web-design-kenya',
        description: 'Explore websites built from the ground up with technical SEO.',
      },
      {
        label: 'Request an SEO Audit',
        href: '/contact?service=Digital%20Growth%2C%20SEO%20%26%20Maintenance',
        description: 'Share your current domain URL for an honest technical SEO review.',
      },
    ],
  },

  'graphic-design': {
    slug: 'graphic-design',
    path: '/graphic-design',
    category: 'service',
    seoTitle: 'Graphic Design & Business Branding Kenya',
    seoDescription:
      'Professional graphic design in Kenya: business logo design, marketing posters, social media graphics, and cohesive brand identity aligned with your website.',
    kicker: 'VISUAL IDENTITY & MARKETING DESIGN',
    h1: 'Graphic Design, Logo Design & Business Branding in Kenya',
    intro:
      'Strong digital businesses look consistent everywhere customers meet them—from their website header and business logo to WhatsApp promotional posters and social media campaigns.',
    serviceType: 'Graphic Design & Business Branding',
    startingPriceNote: 'Standalone Branding & Poster Design or Bundled With Website Packages',
    sections: [
      {
        title: 'Logo Design & Visual Brand Identity',
        description:
          'Establish an immediately recognizable look that works cleanly on websites, mobile icons, invoices, and print materials.',
        bullets: [
          'Custom business logo design with scalable vector and high-resolution PNG/SVG exports',
          'Cohesive color palette and typography pairing aligned with your industry',
          'Favicon and social Open Graph share graphics for clean link previews on WhatsApp and LinkedIn',
        ],
      },
      {
        title: 'Marketing Posters & Social Media Graphics',
        description:
          'Clear, readable visual assets crafted to promote offers, events, and services across WhatsApp Status, Instagram, Facebook, and LinkedIn.',
        bullets: [
          'High-impact promotional posters and event flyers sized for mobile sharing',
          'Consistent social media post templates and service highlight cards',
          'Company profile layouts and digital brochure visuals',
        ],
      },
    ],
    deliverablesTitle: 'Brand & Graphic Deliverables',
    deliverables: [
      'Print-ready and web-optimized logo and brand files (SVG, PNG, PDF)',
      'Social media graphic packs sized cleanly for Instagram, Facebook, X, and WhatsApp',
      'Marketing posters and promotional banners matching your website typography',
      'Consistent visual alignment across web and brand collateral',
    ],
    faqs: [
      {
        question: 'Can I order graphic design or posters alongside my website?',
        answer:
          'Yes. Bundling brand identity and website design ensures your colors, fonts, logos, and promotional posters match seamlessly across your website and WhatsApp/social channels.',
      },
      {
        question: 'What file formats do you deliver for logos and posters?',
        answer:
          'We deliver web-optimized PNG/WebP files alongside print-ready PDF and scalable vector/SVG files where applicable.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'mms-advocates'],
    relatedLinks: [
      {
        label: 'Website Design Kenya',
        href: '/web-design-kenya',
        description: 'Pair your brand identity with a custom, high-speed business website.',
      },
      {
        label: 'Request Branding or Poster Design',
        href: '/contact?service=Graphic%20Design%20%26%20Branding',
        description: 'Tell us what brand assets or campaign graphics you need.',
      },
    ],
  },
  'software-development': {
    slug: 'software-development',
    path: '/software-development',
    category: 'service',
    seoTitle: 'Custom Software Development Kenya',
    seoDescription:
      'Custom software development, SaaS web applications, business automation tools, ERP/CRM dashboards, and API engineering in Kenya by Charles Websites.',
    kicker: 'CUSTOM SOFTWARE DEVELOPMENT & WEB APPLICATIONS',
    h1: 'Custom Software Development & Web Applications in Kenya',
    intro:
      'Off-the-shelf tools rarely match real operational workflows. Charles Websites designs and builds custom software systems, internal operations portals, SaaS products, and API integrations for growing businesses in Kenya and worldwide.',
    serviceType: 'Software Development & Application Engineering',
    startingPriceNote: 'Custom scoped software projects · Transparent milestone quotes in KES',
    sections: [
      {
        title: 'Bespoke Business Software, Portals & SaaS Applications',
        description:
          'We engineer reliable web-based and cloud software tailored to your exact workflows, eliminating fragile spreadsheets and manual bottlenecks.',
        bullets: [
          'Custom CRM, inventory tracking, invoicing, and operations management systems',
          'Multi-user SaaS web applications with secure role-based access control',
          'Client and patient booking portals synced with real-time notifications',
          'Clean TypeScript, React, Next.js, and Node.js full-stack engineering',
        ],
      },
      {
        title: 'API Integrations, M-Pesa Billing & Database Architecture',
        description:
          'Connect your software cleanly to payment gateways, mobile apps, and external business services with resilient server-side architecture.',
        bullets: [
          'REST & webhook API development connecting web dashboards and mobile apps',
          'Server-verified M-Pesa (Safaricom Daraja) and Paystack payment workflows',
          'Structured PostgreSQL / relational and cloud document database schemas',
          'AI-assisted document parsing, automated reporting, and workflow triggers',
        ],
      },
    ],
    deliverablesTitle: 'What Our Software Development Projects Include',
    deliverables: [
      'Requirements discovery, system architecture, and clear milestone roadmap',
      'Clean, maintainable TypeScript & Node.js codebase with full ownership handover',
      'Role-based dashboards, input validation, and security hardening',
      'Automated database backups, cloud deployment, and post-launch support',
    ],
    faqs: [
      {
        question: 'What types of software do you build for businesses in Kenya?',
        answer:
          'We build custom business management systems, SaaS web applications, client and booking portals, inventory and billing tools, M-Pesa-integrated platforms, and REST APIs connecting web and mobile applications.',
      },
      {
        question: 'How is custom software development priced?',
        answer:
          'Because software scope varies by workflows, user roles, and integrations, we scope every project during discovery and provide a clear, milestone-based quote in KES or USD before development begins.',
      },
      {
        question: 'Can you integrate custom software with M-Pesa or our existing website?',
        answer:
          'Yes. We connect custom portals and software backends directly to your website, mobile apps, M-Pesa / Paystack payment verification, email/WhatsApp alerts, and AI assistants.',
      },
    ],
    relatedProjectSlugs: ['nyati-autospares', 'kirk-hospital-mombasa', 'ruevan-limited'],
    relatedLinks: [
      {
        label: 'Website Design & Development Kenya',
        href: '/web-design-kenya',
        description: 'Pair your software platform with a fast, conversion-focused public website.',
      },
      {
        label: 'AI Chatbots & Automation',
        href: '/ai-solutions',
        description: 'Add intelligent customer support and workflow automation to your software.',
      },
      {
        label: 'Request a Software Quote',
        href: '/contact?service=Custom%20Software%20Development%20%26%20Web%20Applications',
        description: 'Share your workflow requirements for a scoped technical proposal.',
      },
    ],
  },
};

export const INDUSTRY_SOLUTION_PAGES: Record<string, SeoLandingPageData> = {
  'healthcare-websites': {
    slug: 'healthcare-websites',
    path: '/solutions/healthcare-websites',
    category: 'industry',
    seoTitle: 'Hospital & Clinic Website Design Kenya',
    seoDescription:
      'Patient-centered website design for hospitals, clinics, dentists, and medical practices in Kenya with clear service directories and appointment requests.',
    kicker: 'HEALTHCARE WEB SOLUTIONS',
    h1: 'Website Design for Hospitals, Clinics & Medical Practices in Kenya',
    intro:
      'Patients searching for medical care need clarity, accessible reading on smartphones, and an effortless way to view clinic services or request an appointment. We build calm, trustworthy healthcare websites.',
    serviceType: 'Healthcare Website Development',
    startingPriceNote: 'Starter Clinics from KES 39,890 · Full Booking & AI Assistant from KES 52,660',
    sections: [
      {
        title: 'Patient-First Design & Service Clarity',
        description:
          'Medical websites should reduce anxiety, not confuse visitors with dense jargon or broken mobile menus.',
        bullets: [
          'Clear department and treatment directories (Outpatient, Dental, Diagnostics, Pharmacy, Maternity)',
          'Doctor/specialist profiles, clinic locations, and accessible phone/WhatsApp triage buttons',
          'High-contrast, easy-to-read typography tested across entry-level and flagship mobile devices',
        ],
      },
      {
        title: 'Online Appointment Requests & AI Patient FAQ Support',
        description:
          'Save front-desk staff time by letting patients check accepted insurance panels, consultation hours, and request appointments online.',
        bullets: [
          'Structured appointment inquiry forms routed directly to clinic reception email or WhatsApp',
          'Optional grounded AI assistant answering general clinic FAQ questions (non-diagnostic, policy-only)',
          'Local SEO structure so nearby patients searching for clinics find your verified services quickly',
        ],
      },
    ],
    deliverablesTitle: 'Healthcare Website Essentials',
    deliverables: [
      'Mobile-first patient interface with one-tap Call & WhatsApp clinic booking',
      'Structured medical services and practitioner directory pages',
      'SSL encryption and privacy-respecting appointment inquiry forms',
      'Technical & local SEO setup for medical specialty searches',
    ],
    faqs: [
      {
        question: 'Can patients book appointments or inquire via WhatsApp on a clinic website?',
        answer:
          'Yes. We build clean appointment request forms alongside direct WhatsApp and click-to-call triggers so patients can book in seconds.',
      },
      {
        question: 'Have you built healthcare websites in Kenya before?',
        answer:
          'Yes—explore our verified project for Lenanns Healthcare in our portfolio to see our calm, patient-centered healthcare web approach.',
      },
    ],
    relatedProjectSlugs: ['lenanns-healthcare'],
    relatedLinks: [
      {
        label: 'Lenanns Healthcare Case Study',
        href: '/portfolio/lenanns-healthcare',
        description: 'Inspect our patient-centered healthcare website project.',
      },
      {
        label: 'Healthcare Website Design Guide',
        href: '/blog/website-design-for-hospitals-and-clinics',
        description: 'Best practices for clinic UX, trust signals, and patient booking.',
      },
    ],
  },

  'law-firm-websites': {
    slug: 'law-firm-websites',
    path: '/solutions/law-firm-websites',
    category: 'industry',
    seoTitle: 'Law Firm & Advocates Website Design Kenya',
    seoDescription:
      'Authoritative websites for law firms, advocates, and statutory firms in Kenya featuring practice areas, counsel profiles, and confidential consultation forms.',
    kicker: 'LEGAL & STATUTORY WEB SOLUTIONS',
    h1: 'Website Design for Law Firms, Advocates & Legal Practices in Kenya',
    intro:
      'Corporate and private legal clients evaluate credibility before making a call. We design restrained, authoritative law firm websites showcasing practice areas, counsel expertise, and confidential consultation booking.',
    serviceType: 'Law Firm Website Development',
    startingPriceNote: 'Packages from KES 39,890 (Starter) & KES 52,660 (Business)',
    sections: [
      {
        title: 'Editorial Restraint & Practice Area Structure',
        description:
          'Legal websites win trust through calm authority, clear practice-area navigation, and zero gimmicks.',
        bullets: [
          'Dedicated practice area sections (Corporate, Conveyancing, Litigation, Family, Commercial Law)',
          'Partner and advocate profile pages presenting qualifications clearly',
          'Legal insights / articles publishing capability to demonstrate domain authority',
        ],
      },
      {
        title: 'Confidential Consultation Capture',
        description:
          'Make it simple for prospective clients to initiate an inquiry securely from desktop or mobile.',
        bullets: [
          'HTTPS-secured consultation request forms with clear privacy notice links',
          'Direct office phone and WhatsApp intake pathways',
          'Clean Schema.org organization markup supporting branded search visibility',
        ],
      },
    ],
    deliverablesTitle: 'Law Firm & Statutory Website Deliverables',
    deliverables: [
      'Authoritative editorial layout tailored to legal practice standards',
      'Practice area and advocate profile architecture',
      'Confidential consultation request form with server-side validation',
      'SEO-ready URL and heading structure',
    ],
    faqs: [
      {
        question: 'Can we publish legal articles and firm updates ourselves?',
        answer:
          'Yes. We include a clean article publishing setup so your advocates can share legal commentary and updates that also build search visibility.',
      },
      {
        question: 'Have you built legal or statutory websites?',
        answer:
          'Yes—view our work for MMS Advocates and Makuri Auctioneers in our portfolio.',
      },
    ],
    relatedProjectSlugs: ['mms-advocates', 'makuri-auctioneers'],
    relatedLinks: [
      {
        label: 'MMS Advocates Case Study',
        href: '/portfolio/mms-advocates',
        description: 'See how we structured an authoritative editorial website for legal practice.',
      },
      {
        label: 'Website Design for Law Firms Guide',
        href: '/blog/website-design-for-law-firms',
        description: 'Key elements that turn legal searches into qualified consultations.',
      },
    ],
  },

  'hotel-hospitality-websites': {
    slug: 'hotel-hospitality-websites',
    path: '/solutions/hotel-hospitality-websites',
    category: 'industry',
    seoTitle: 'Hotel & Hospitality Website Design Kenya',
    seoDescription:
      'Direct-booking websites for hotels, lodges, resorts, and BnBs in Kenya. Showcase rooms, dining, conference facilities, and accept direct booking inquiries.',
    kicker: 'HOSPITALITY & TOURISM WEB SOLUTIONS',
    h1: 'Website Design & Booking Systems for Hotels, Lodges & Resorts in Kenya',
    intro:
      'Reduce over-reliance on third-party booking commissions. We build fast, visually inviting hotel and lodge websites that showcase your rooms, conference spaces, and experiences while capturing direct reservations.',
    serviceType: 'Hotel & Hospitality Website Development',
    startingPriceNote: 'Custom Hospitality & Booking Builds · Request Tailored Scope',
    sections: [
      {
        title: 'Direct Room & Conference Inquiry Flows',
        description:
          'Tourists, business travelers, and conference organizers inspect photos and rates on their phones before booking.',
        bullets: [
          'Clean room & suite galleries with amenities, occupancy details, and clear rate displays',
          'Direct reservation inquiry forms, WhatsApp concierge desk, and online payment integration where needed',
          'Conference, wedding, and group retreat packages highlighted clearly for corporate buyers',
        ],
      },
      {
        title: 'Fast Mobile Performance & Local Search Visibility',
        description:
          'Travelers often browse on patchy mobile connections while planning trips to Nanyuki, Mombasa, Naivasha, or Nairobi.',
        bullets: [
          'Highly compressed WebP/AVIF property photography that stays sharp while loading fast',
          'Location, directions, and nearby attraction guides tailored to genuine guest questions',
          'Multilingual English/Kiswahili or international language readiness',
        ],
      },
    ],
    deliverablesTitle: 'Hospitality Website Deliverables',
    deliverables: [
      'Mobile-optimized room, dining, and conference showcase pages',
      'Direct booking request system + WhatsApp reservation handoff',
      'Optional M-Pesa / Paystack deposit integration where supported',
      'Local SEO and clean property metadata',
    ],
    faqs: [
      {
        question: 'Can a hotel website accept direct booking deposits via M-Pesa or cards?',
        answer:
          'Yes. Using M-Pesa Daraja or Paystack (in our Custom Premium scope), guests can submit room inquiries or pay verified booking deposits online.',
      },
      {
        question: 'Do you optimize large hotel photo galleries so the website stays fast?',
        answer:
          'Yes. All images are converted to modern WebP/AVIF formats with responsive sizing and lazy loading below the fold so the site remains fast on mobile data.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'lenanns-healthcare'],
    relatedLinks: [
      {
        label: 'Website Design for Hotels Guide',
        href: '/blog/website-design-for-hotels',
        description: 'How Kenyan hotels and lodges increase direct bookings online.',
      },
      {
        label: 'E-Commerce & Payment Systems',
        href: '/ecommerce-website-development',
        description: 'Explore M-Pesa and card checkout integration options.',
      },
    ],
  },

  'real-estate-websites': {
    slug: 'real-estate-websites',
    path: '/solutions/real-estate-websites',
    category: 'industry',
    seoTitle: 'Real Estate Website Design & Property Portals Kenya',
    seoDescription:
      'Custom real estate websites in Kenya for property agencies, developers, and land sellers. Property listings, location filters, viewing requests, and WhatsApp leads.',
    kicker: 'REAL ESTATE & PROPERTY WEB SOLUTIONS',
    h1: 'Website Design for Real Estate Agencies & Property Developers in Kenya',
    intro:
      'Present residential, commercial, and land listings clearly with fast search filters, structured property pages, and instant viewing request forms synced to your sales team.',
    serviceType: 'Real Estate Website Development',
    startingPriceNote: 'Business Real Estate Sites from KES 52,660 · Custom Portals by Quote',
    sections: [
      {
        title: 'Searchable Property Listings & Location Filters',
        description:
          'Buyers and tenants want to filter by location, price range, bedrooms, or property type without struggling through slow PDF brochures.',
        bullets: [
          'Filterable property catalog (For Sale, To Let, Land, Commercial)',
          'Individual property detail pages with image galleries, specifications, and payment plan summaries',
          'Schedule-a-viewing inquiry forms + instant WhatsApp property inquiry with property name prefilled',
        ],
      },
      {
        title: 'Trust & Buyer Qualification',
        description:
          'Build buyer confidence—especially for diaspora investors—through clear documentation checklists and fast AI/WhatsApp support.',
        bullets: [
          'Transparent agency credentials, FAQs, and step-by-step purchase process sections',
          'Optional AI property assistant that qualifies buyer budget and location preferences 24/7',
          'SEO-indexed listing pages targeting property buyers organically',
        ],
      },
    ],
    deliverablesTitle: 'Real Estate Platform Deliverables',
    deliverables: [
      'Filterable property listing and detail page architecture',
      'Mobile-first viewing request & WhatsApp lead capture',
      'Fast image optimization for property galleries',
      'Clean SEO metadata for property developments and agency pages',
    ],
    faqs: [
      {
        question: 'Can we easily add and mark properties as Sold or Let?',
        answer:
          'Yes. We can structure an admin-friendly listing flow so your team can add new properties, update pricing, and mark listings as sold or let.',
      },
      {
        question: 'Do real estate websites work well for diaspora property buyers?',
        answer:
          'Yes. Fast global page loading, clear payment plan explanations, and instant WhatsApp/email contact make it easy for diaspora buyers to inquire securely.',
      },
    ],
    relatedProjectSlugs: ['makuri-auctioneers', 'ruevan-limited'],
    relatedLinks: [
      {
        label: 'Makuri Auctioneers Case Study',
        href: '/portfolio/makuri-auctioneers',
        description: 'Structured asset and property notice presentation built for clarity.',
      },
      {
        label: 'AI Chatbots for Lead Qualification',
        href: '/ai-solutions',
        description: 'Capture buyer location and budget preferences automatically.',
      },
    ],
  },

  'corporate-websites': {
    slug: 'corporate-websites',
    path: '/solutions/corporate-websites',
    category: 'industry',
    seoTitle: 'Corporate & Professional Services Website Design Kenya',
    seoDescription:
      'Enterprise, consultancy, and B2B corporate website development in Kenya. Clear service divisions, tenders/company profile readiness, and technical SEO.',
    kicker: 'CORPORATE & B2B WEB SOLUTIONS',
    h1: 'Corporate & Professional Services Website Design in Kenya',
    intro:
      'Procurement teams, corporate partners, and enterprise buyers inspect your website before inviting you to tender or sign a contract. We build crisp, credible corporate websites that articulate your capabilities clearly.',
    serviceType: 'Corporate Website Development',
    startingPriceNote: 'Starter Corporate from KES 39,890 · Business from KES 52,660',
    sections: [
      {
        title: 'Clear Capabilities, Governance & Partner Trust',
        description:
          'Communicate what your company delivers, which sectors you serve, and how teams can contact you within seconds.',
        bullets: [
          'Structured service divisions, leadership/company overview, and verified credential displays',
          'Downloadable or readable company capabilities without breaking mobile navigation',
          'Bilingual English / Kiswahili capabilities where needed for regional reach',
        ],
      },
      {
        title: 'Professional Email, Performance & Security',
        description:
          'Corporate domains demand reliable SSL security, fast page loads, and dependable inquiry routing.',
        bullets: [
          'Strict security headers, HTTPS configuration, and spam-protected inquiry forms',
          'Semantic HTML5 structure and Organization JSON-LD for branded Google results',
          'Clean integration with corporate email and WhatsApp Business desks',
        ],
      },
    ],
    deliverablesTitle: 'Corporate & B2B Website Deliverables',
    deliverables: [
      'Structured corporate home, about, services, and contact architecture',
      'Case study or project showcase pages',
      'Validated corporate inquiry routing and security hardening',
      'Full technical SEO and Organization Schema.org integration',
    ],
    faqs: [
      {
        question: 'How many pages does a typical corporate website need?',
        answer:
          'Most growing B2B companies start with 4 to 7 core pages (Home, About, Services, Projects/Case Studies, Insights/Blog, and Contact)—fitting cleanly into our Starter or Business packages.',
      },
      {
        question: 'Can you showcase our past projects and verified company certifications?',
        answer:
          'Yes. We build clean project case-study pages and verifiable credential sections tailored to corporate due diligence.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'makuri-auctioneers', 'mms-advocates'],
    relatedLinks: [
      {
        label: 'Ruevan Limited Case Study',
        href: '/portfolio/ruevan-limited',
        description: 'Inspect our structured corporate web platform for Ruevan Limited.',
      },
      {
        label: 'Website Packages & Pricing',
        href: '/pricing',
        description: 'View transparent KES pricing options for corporate websites.',
      },
    ],
  },

  'education-school-websites': {
    slug: 'education-school-websites',
    path: '/solutions/education-school-websites',
    category: 'industry',
    seoTitle: 'School, College & Education Website Design Kenya',
    seoDescription:
      'Accessible, fast websites for schools, colleges, and training institutes in Kenya featuring admissions info, term calendars, curriculum details, and parent inquiry forms.',
    kicker: 'EDUCATION & INSTITUTIONAL WEB SOLUTIONS',
    h1: 'Website Design for Schools, Colleges & Training Institutions in Kenya',
    intro:
      'Parents and prospective students look online for admissions dates, curriculum overviews, fee inquiry contacts, and school updates. We build clear, accessible institutional websites designed for easy navigation on mobile phones.',
    serviceType: 'Education & School Website Development',
    startingPriceNote: 'Starter School Sites from KES 39,890 · Full Portals by Custom Quote',
    sections: [
      {
        title: 'Admissions, Academics & Parent Communication',
        description:
          'Put key admissions steps, academic departments, and contact channels front and center so parents do not have to call for basic information.',
        bullets: [
          'Clear Admissions page outlining intake windows, requirements, and inquiry submission',
          'Academic programs, co-curricular overview, and campus announcement sections',
          'Mobile-friendly contact buttons for admissions offices via phone, email, or WhatsApp',
        ],
      },
      {
        title: 'AI Admissions FAQ Support & Fast Mobile Access',
        description:
          'Answer repetitive admissions questions automatically while keeping page load times light for families browsing on mobile data.',
        bullets: [
          'Grounded FAQ assistant answering common questions about curriculum, intake, and campus contacts',
          'Lightweight, accessible HTML5 pages compliant with modern readability standards',
          'Clean search engine indexing so parents searching for schools in your area find accurate official details',
        ],
      },
    ],
    deliverablesTitle: 'School & College Website Deliverables',
    deliverables: [
      'Admissions, Academics, About, News/Events, and Contact pages',
      'Online student admission inquiry form with validation',
      'Accessible mobile layout and fast page speeds',
      'Local SEO and structured institutional metadata',
    ],
    faqs: [
      {
        question: 'Can a school website include an online admission inquiry form?',
        answer:
          'Yes. Prospective parents can submit student grade/program inquiries online and receive immediate confirmation while the admissions office receives a structured email summary.',
      },
      {
        question: 'Can we update term dates, circulars, or news articles?',
        answer:
          'Yes. We can configure a straightforward content management flow so authorized school staff can publish announcements and articles.',
      },
    ],
    relatedProjectSlugs: ['ruevan-limited', 'lenanns-healthcare'],
    relatedLinks: [
      {
        label: 'Website Design Kenya',
        href: '/web-design-kenya',
        description: 'Explore our custom institutional website engineering process.',
      },
      {
        label: 'Request a School Website Quote',
        href: '/contact',
        description: 'Discuss your school or training institute requirements.',
      },
    ],
  },
};

export const ALL_SEO_LANDING_PAGES: SeoLandingPageData[] = [
  ...Object.values(SERVICE_LANDING_PAGES),
  ...Object.values(INDUSTRY_SOLUTION_PAGES),
];

export function getIndustrySolutionBySlug(slug: string): SeoLandingPageData | undefined {
  return INDUSTRY_SOLUTION_PAGES[slug];
}
