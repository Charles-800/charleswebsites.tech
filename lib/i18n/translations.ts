export type Locale = 'en' | 'sw';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    pricing: string;
    blog: string;
    contact: string;
    getQuote: string;
    downloadApp: string;
    callUs: string;
    whatsappUs: string;
    languageLabel: string;
  };
  hero: {
    kicker: string;
    headlinePre: string;
    headlineAccentRed: string;
    headlineMid: string;
    headlineAccentPurple: string;
    headlinePost: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappCta: string;
    trustStatement: string;
    tagline: string;
  };
  trust: {
    headline: string;
    description: string;
    pillars: Array<{ title: string; summary: string }>;
  };
  services: {
    headline: string;
    subheading: string;
    learnMore: string;
    cards: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
      features: string[];
    }>;
  };
  whyUs: {
    headline: string;
    subheading: string;
    items: Array<{ title: string; description: string }>;
  };
  portfolio: {
    headline: string;
    subheading: string;
    viewProject: string;
    viewAllProjects: string;
    filterAll: string;
    filterCorporate: string;
    filterEcommerce: string;
    filterHealthcare: string;
    filterLegal: string;
    deliverablesLabel: string;
    overviewLabel: string;
    liveUrlPending: string;
    visitLiveSite: string;
    startSimilarProject: string;
    closeModal: string;
  };
  pricing: {
    headline: string;
    subheading: string;
    mostPopular: string;
    comparisonTitle: string;
    comparisonFeature: string;
    packages: Array<{
      id: string;
      name: string;
      price: string;
      subtitle: string;
      features: string[];
      cta: string;
      whatsappMessage: string;
      popular?: boolean;
    }>;
    paymentSecurityNote: string;
  };
  process: {
    headline: string;
    subheading: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  testimonials: {
    headline: string;
    subheading: string;
    placeholderNotice: string;
    slots: Array<{
      slotLabel: string;
      quotePlaceholder: string;
      authorPlaceholder: string;
      companyPlaceholder: string;
    }>;
    shareFeedbackCta: string;
  };
  skills: {
    kicker: string;
    headline: string;
    subheading: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      logo: string;
      description: string;
    }>;
  };
  blog: {
    previewHeadline: string;
    previewSubheading: string;
    readMore: string;
    viewAllArticles: string;
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    minRead: string;
    publishedOn: string;
    relatedArticles: string;
    shareArticle: string;
    copyLink: string;
    linkCopied: string;
    backToBlog: string;
    noResults: string;
    manageArticles: string;
    addArticleTitle: string;
    editArticleTitle: string;
    saveArticle: string;
    cancel: string;
  };
  finalCta: {
    headline: string;
    supportingText: string;
    primaryBtn: string;
    whatsappBtn: string;
    whatsappPrefill: string;
  };
  footer: {
    description: string;
    navigationTitle: string;
    servicesTitle: string;
    pricingTitle: string;
    contactTitle: string;
    phoneLabel: string;
    whatsappLabel: string;
    followTitle: string;
    rightsReserved: string;
  };
  about: {
    headline: string;
    supportingHeadline: string;
    introParagraph: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    valuesTitle: string;
    values: Array<{ title: string; description: string }>;
    expertiseTitle: string;
    expertise: Array<{ title: string; description: string }>;
    approachTitle: string;
    approachText: string;
    whyWorkTitle: string;
    whyWorkPoints: string[];
    ctaHeadline: string;
    ctaButton: string;
  };
  servicesPage: {
    headline: string;
    subheading: string;
    faqHeadline: string;
    faqSubheading: string;
    faqs: Array<{ question: string; answer: string }>;
  };
  contact: {
    headline: string;
    subheading: string;
    directTitle: string;
    callDirect: string;
    chatWhatsapp: string;
    whatsappPrefill: string;
    hoursNote: string;
    formTitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    serviceRequired: string;
    budgetRange: string;
    projectDescription: string;
    projectDescriptionPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    serviceOptions: string[];
    budgetOptions: string[];
    successTitle: string;
    successMessage: string;
    referenceLabel: string;
    sendAnother: string;
    errorGeneric: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      serviceRequired: string;
      budgetRequired: string;
      descriptionMin: string;
    };
  };
  downloadModal: {
    kicker: string;
    title: string;
    subtitle: string;
    comingSoon: string;
    recommendedBadge: string;
    detectedLabel: string;
    switchPlatformLabel: string;
    downloadAndroidBtn: string;
    downloadWindowsBtn: string;
    getIosBtn: string;
    downloadAppStoreBtn: string;
    downloadMacBtn: string;
    iosComingSoonTitle: string;
    iosComingSoonBody: string;
    macComingSoonTitle: string;
    macComingSoonBody: string;
    installerPendingNote: string;
    androidDirectReassurance: string;
    windowsDirectReassurance: string;
    downloadStartedTitle: string;
    downloadStartedSubtitle: string;
    installGuideTitle: string;
    securitySupportNote: string;
    securitySupportNoteIosLive: string;
    livePlatformLabel: string;
    notifyCta: string;
    whatsappCta: string;
    closeModal: string;
    deviceNames: {
      android: string;
      ios: string;
      windows: string;
      mac: string;
      other: string;
    };
    platformDescriptions: {
      android: string;
      windows: string;
      ios: string;
      mac: string;
    };
  };
  certifications: {
    kicker: string;
    headline: string;
    subheading: string;
    manageBtn: string;
    doneManageBtn: string;
    addBtn: string;
    filterAll: string;
    statusEarned: string;
    statusInProgress: string;
    statusPlanned: string;
    dateEarnedLabel: string;
    credentialIdLabel: string;
    viewCertificate: string;
    verifyOnline: string;
    pendingNotice: string;
    editBtn: string;
    removeBtn: string;
    confirmRemoveBtn: string;
    cancelBtn: string;
    emptyTitle: string;
    emptyDescription: string;
    modalAddTitle: string;
    modalEditTitle: string;
    fieldStatus: string;
    fieldTitle: string;
    fieldTitlePlaceholder: string;
    fieldInstitution: string;
    fieldInstitutionPlaceholder: string;
    fieldLogo: string;
    fieldDateEarned: string;
    fieldDateEarnedPlaceholder: string;
    fieldCredentialId: string;
    fieldCredentialIdPlaceholder: string;
    fieldVerificationUrl: string;
    fieldVerificationUrlPlaceholder: string;
    fieldCertificateFile: string;
    uploadingFile: string;
    saveBtn: string;
    savingBtn: string;
    openOriginal: string;
    closeModal: string;
  };
}

export const TRANSLATIONS: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      blog: 'Blog',
      contact: 'Contact',
      getQuote: 'GET A QUOTE',
      downloadApp: 'DOWNLOAD APP',
      callUs: 'Call 0112298275',
      whatsappUs: 'WhatsApp',
      languageLabel: 'Language',
    },
    hero: {
      kicker: 'WEB DEVELOPMENT | AI ENGINEERING',
      headlinePre: 'WE BUILD ',
      headlineAccentRed: 'DIGITAL EXPERIENCES',
      headlineMid: ' THAT MOVE ',
      headlineAccentPurple: 'BUSINESSES',
      headlinePost: ' FORWARD.',
      supportingText:
        'From stunning business websites to intelligent AI-powered solutions, Charles Websites helps businesses establish their online presence, attract customers and automate growth.',
      primaryCta: 'START YOUR PROJECT',
      secondaryCta: 'VIEW OUR WORK',
      whatsappCta: 'CHAT ON WHATSAPP',
      trustStatement: 'Creative thinking. Powerful technology. Measurable business impact.',
      tagline: 'WE BUILD WEBSITES. WE ENGINEER INTELLIGENCE. WE GROW BUSINESSES.',
    },
    trust: {
      headline: 'YOUR IDEAS. OUR TECHNOLOGY. BETTER BUSINESS RESULTS.',
      description:
        'Your digital growth partner. We create powerful websites and intelligent AI solutions that help businesses attract customers, automate operations and grow online.',
      pillars: [
        {
          title: 'Web Development',
          summary: 'Custom, fast-loading websites engineered for conversion, credibility, and mobile usability.',
        },
        {
          title: 'AI Engineering',
          summary: 'Practical AI assistants and intelligent systems tailored to real customer and operational needs.',
        },
        {
          title: 'Digital Solutions',
          summary: 'End-to-end online booking, e-commerce, and M-Pesa / Paystack payment integrations.',
        },
        {
          title: 'Business Automation',
          summary: 'Streamlined workflows that capture leads, answer inquiries, and save team hours daily.',
        },
      ],
    },
    services: {
      headline: 'WHAT WE DO',
      subheading:
        'Focused web engineering, mobile app development, AI automation, branding, and search growth built for modern businesses.',
      learnMore: 'Learn More',
      cards: [
        {
          id: 'web-development',
          number: '01',
          title: 'WEBSITE DESIGN & DEVELOPMENT',
          description:
            'We design and develop modern, responsive websites that turn visitors into customers.',
          features: [
            'Business websites',
            'Corporate websites',
            'E-commerce websites',
            'Portfolio websites',
            'Booking websites',
          ],
        },
        {
          id: 'ai-engineering',
          number: '02',
          title: 'AI ENGINEERING & AUTOMATION',
          description:
            'Bring intelligence into your business with practical AI-powered solutions.',
          features: [
            'AI chatbot integration',
            'AI customer support',
            'Business automation',
            'AI assistants',
            'Intelligent workflows',
          ],
        },
        {
          id: 'graphic-design',
          number: '03',
          title: 'GRAPHIC DESIGN & BRANDING',
          description:
            'Build a consistent and professional brand identity that stands out.',
          features: [
            'Marketing posters',
            'Social media graphics',
            'Business branding',
            'Promotional materials',
          ],
        },
        {
          id: 'digital-growth',
          number: '04',
          title: 'DIGITAL GROWTH & SEO',
          description:
            'Improve your visibility, website performance and online customer experience.',
          features: [
            'SEO setup',
            'Website optimization',
            'Speed optimization',
            'Digital strategy',
            'Website maintenance',
          ],
        },
        {
          id: 'mobile-app-development',
          number: '05',
          title: 'ANDROID & iOS APP DEVELOPMENT',
          description:
            'We engineer fast, reliable Android and iOS mobile applications built for everyday customers and business operations.',
          features: [
            'Android app development',
            'iOS app development',
            'Cross-platform mobile apps',
            'API & cloud backend integration',
            'M-Pesa & push notifications',
            'Play Store & App Store deployment',
          ],
        },
      ],
    },
    whyUs: {
      headline: 'WHY BUSINESSES CHOOSE CHARLES WEBSITES',
      subheading:
        'Every project combines architectural design standards with dependable full-stack engineering.',
      items: [
        {
          title: 'Modern and professional designs',
          description:
            'Clean, conversion-oriented layouts built from scratch around your industry and audience.',
        },
        {
          title: 'Mobile-first development',
          description:
            'Responsive interfaces engineered to perform smoothly on smartphones, tablets, and desktops.',
        },
        {
          title: 'AI-powered innovation',
          description:
            'Practical chatbot and workflow automation integrations that respond to customers around the clock.',
        },
        {
          title: 'SEO-conscious development',
          description:
            'Semantic heading structure, metadata, sitemaps, and clean URLs built in from day one.',
        },
        {
          title: 'Performance-focused websites',
          description:
            'Optimized assets and lightweight code that load quickly even on mobile data connections.',
        },
        {
          title: 'Direct communication and support',
          description:
            'Work directly with your web developer and AI engineer from discovery through launch and maintenance.',
        },
      ],
    },
    portfolio: {
      headline: 'OUR WORK SPEAKS FOR ITSELF.',
      subheading:
        'Selected website projects crafted for businesses across corporate services, automotive retail, healthcare, auctioneering, and legal practice.',
      viewProject: 'View Project',
      viewAllProjects: 'VIEW ALL PROJECTS',
      filterAll: 'All Projects',
      filterCorporate: 'Corporate',
      filterEcommerce: 'E-Commerce',
      filterHealthcare: 'Healthcare',
      filterLegal: 'Legal & Auction',
      deliverablesLabel: 'Project Scope & Deliverables',
      overviewLabel: 'Architecture Overview',
      liveUrlPending: 'Verified live URL can be linked here once supplied by the client.',
      visitLiveSite: 'Visit Live Website',
      startSimilarProject: 'Request a Similar Website',
      closeModal: 'Close preview',
    },
    pricing: {
      headline: 'INVEST IN YOUR BUSINESS GROWTH.',
      subheading:
        'Choose a website package that matches your business goals. Professional websites built to attract customers and grow your brand.',
      mostPopular: 'MOST POPULAR',
      comparisonTitle: 'Package Comparison at a Glance',
      comparisonFeature: 'Included Capability',
      paymentSecurityNote:
        'All M-Pesa and Paystack payment integrations are engineered with secure server-side transaction verification before confirming any order.',
      packages: [
        {
          id: 'starter',
          name: 'STARTER PACKAGE',
          price: 'KES 39,890',
          subtitle: 'Perfect for startups and small businesses establishing their online presence.',
          features: [
            '4-page website',
            'Home page',
            'About page',
            'Contact page',
            'Services page',
            'Mobile-responsive design',
            'Basic SEO setup',
            'Blog section',
            'Multilingual support',
            'WhatsApp integration',
          ],
          cta: 'GET STARTED',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Starter Package priced at KES 39,890. I would like to discuss my website project.',
        },
        {
          id: 'business',
          name: 'BUSINESS PACKAGE',
          price: 'KES 52,660',
          popular: true,
          subtitle:
            'Perfect for growing businesses looking for a stronger online presence and advanced functionality.',
          features: [
            '4–7 pages website',
            'Custom modern design',
            'Mobile and tablet optimization',
            'WhatsApp integration',
            'Social media integration',
            'Speed optimization',
            '2–3 design revisions',
            'AI chatbot integration',
          ],
          cta: 'CHOOSE BUSINESS PACKAGE',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Business Package priced at KES 52,660. I would like to discuss my project.',
        },
        {
          id: 'premium',
          name: 'PREMIUM PACKAGE',
          price: 'CONTACT FOR QUOTE',
          subtitle: 'Advanced digital experiences for established businesses and ambitious brands.',
          features: [
            'Up to 10 pages website',
            'Fully custom design',
            'Advanced SEO setup',
            'Conversion-focused layout',
            'Booking and appointment integration',
            'Paystack / M-Pesa integration',
            'AI chatbot integration',
            'E-commerce setup',
          ],
          cta: 'REQUEST PREMIUM QUOTE',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Premium Website Package. I would like to request a quotation.',
        },
      ],
    },
    process: {
      headline: 'FROM IDEA TO LAUNCH.',
      subheading: 'A clear four-stage engineering workflow designed for predictable delivery.',
      steps: [
        {
          number: '01.',
          title: 'DISCOVERY',
          description: 'We understand your business, goals and requirements.',
        },
        {
          number: '02.',
          title: 'DESIGN',
          description: 'We create a modern design tailored to your brand.',
        },
        {
          number: '03.',
          title: 'DEVELOPMENT',
          description: 'We build, integrate and optimize your website.',
        },
        {
          number: '04.',
          title: 'LAUNCH',
          description: 'We test, deploy and help you get online.',
        },
      ],
    },
    testimonials: {
      headline: 'WHAT OUR CLIENTS SAY',
      subheading:
        'Feedback from organizations we have partnered with across corporate services, automotive retail, healthcare, auctioneering, and legal practice.',
      placeholderNotice: 'Client Review',
      slots: [
        {
          slotLabel: 'Corporate & Business Solutions',
          quotePlaceholder:
            'Before working with Charles Websites, most prospective partners struggled to get a clear picture of our services online. They restructured everything into a clean, fast site that works just as well on phones as on laptops, and clients now reach us directly through WhatsApp without back-and-forth.',
          authorPlaceholder: 'Management Team',
          companyPlaceholder: 'Ruevan Limited',
        },
        {
          slotLabel: 'Automotive E-Commerce',
          quotePlaceholder:
            'Customers used to call our counter just to ask whether we stock specific spare parts. Having an organized online catalog with quick category browsing and direct WhatsApp part inquiries has saved our sales team hours every week.',
          authorPlaceholder: 'Operations & Parts Desk',
          companyPlaceholder: 'Nyati AutoSpares',
        },
        {
          slotLabel: 'Healthcare & Medical Services',
          quotePlaceholder:
            'Patients needed a calm, straightforward website where they could check clinic services and request appointments from their phones. Charles listened carefully to our feedback, handled every revision promptly, and delivered a site our patients find easy to use.',
          authorPlaceholder: 'Clinic Administration',
          companyPlaceholder: 'Lenanns Healthcare',
        },
        {
          slotLabel: 'Auctioneering & Asset Valuation',
          quotePlaceholder:
            'In auctioneering, clarity and trust come first. The platform Charles Websites built makes it simple for clients and bidders to browse upcoming notices and asset categories cleanly without page clutter or slow loading.',
          authorPlaceholder: "Director's Office",
          companyPlaceholder: 'Makuri Auctioneers',
        },
        {
          slotLabel: 'Legal Practice & Advocacy',
          quotePlaceholder:
            'We wanted a restrained, authoritative website that reflects how our firm operates—nothing flashy, just clear practice areas and a straightforward way for clients to book a confidential consultation. The final result matched our expectations.',
          authorPlaceholder: 'Practice Administration',
          companyPlaceholder: 'MMS Advocates',
        },
      ],
      shareFeedbackCta: 'Start Your Project With Us',
    },
    skills: {
      kicker: 'CORE TECHNOLOGIES',
      headline: 'SKILLS & ENGINEERING STACK.',
      subheading:
        'We build fast, reliable, and scalable websites using battle-tested frontend and backend web technologies.',
      items: [
        {
          id: 'html5',
          name: 'HTML5',
          role: 'Semantic Structure & SEO',
          logo: '/assets/aistudio/html5_dfd65fdd.svg',
          description:
            'The semantic structural backbone of every modern website. We write clean, accessible HTML5 markup engineered for search engine visibility, assistive accessibility, and instant browser rendering.',
        },
        {
          id: 'css',
          name: 'CSS',
          role: 'Responsive Layout & Visual Systems',
          logo: '/assets/aistudio/css_9a97b95e.svg',
          description:
            'Precision interface styling using modern CSS Grid, Flexbox, and utility-first design systems so your website looks sharp and adapts seamlessly on phones, tablets, and desktops.',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          role: 'Interactivity & Client Logic',
          logo: '/assets/aistudio/javascript_c9be35a7.svg',
          description:
            'Dynamic browser interactivity powering responsive navigation, smart form validation, live filtering, and smooth user workflows across modern React and Next.js applications.',
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          role: 'Backend APIs & AI Workflows',
          logo: '/assets/aistudio/nodedotjs_021851b7.svg',
          description:
            'High-performance server-side JavaScript runtime used to build scalable REST APIs, webhook automation pipelines, secure M-Pesa/Paystack handlers, and intelligent AI chatbot backends.',
        },
        {
          id: 'php',
          name: 'PHP',
          role: 'CMS, E-Commerce & Server Systems',
          logo: '/assets/aistudio/php_cd1beaa0.svg',
          description:
            'Reliable server-side web engineering powering custom WordPress business platforms, WooCommerce online stores, Laravel portals, and database-driven company systems.',
        },
      ],
    },
    blog: {
      previewHeadline: 'INSIGHTS FOR THE DIGITAL WORLD.',
      previewSubheading:
        'Practical articles on business websites, AI automation, SEO performance, and modern web engineering.',
      readMore: 'READ MORE',
      viewAllArticles: 'VIEW ALL ARTICLES',
      pageTitle: 'Insights & Engineering Journal',
      pageSubtitle:
        'Actionable guides on building high-converting websites, integrating AI chatbots, and growing your online visibility.',
      searchPlaceholder: 'Search articles by topic or keyword...',
      allCategories: 'All Topics',
      minRead: 'min read',
      publishedOn: 'Published',
      relatedArticles: 'Related Articles',
      shareArticle: 'Share this article',
      copyLink: 'Copy link',
      linkCopied: 'Link copied',
      backToBlog: 'Back to all articles',
      noResults: 'No articles matched your search. Try another keyword or category.',
      manageArticles: 'Manage Articles',
      addArticleTitle: 'Publish New Article',
      editArticleTitle: 'Edit Article',
      saveArticle: 'Save Article',
      cancel: 'Cancel',
    },
    finalCta: {
      headline: 'READY TO TAKE YOUR BUSINESS TO THE NEXT LEVEL?',
      supportingText:
        "Let's create a website or AI solution that helps your business stand out and grow.",
      primaryBtn: 'START YOUR PROJECT',
      whatsappBtn: 'CHAT WITH US ON WHATSAPP',
      whatsappPrefill:
        'Hello Charles Websites, I would like to discuss building a website or AI solution for my business.',
    },
    footer: {
      description:
        'Web Development & AI Engineering Agency helping businesses establish their online presence, automate operations, and grow through practical technology.',
      navigationTitle: 'Navigation',
      servicesTitle: 'Services',
      pricingTitle: 'Packages',
      contactTitle: 'Direct Contact',
      phoneLabel: 'Phone',
      whatsappLabel: 'WhatsApp',
      followTitle: 'Connect',
      rightsReserved: 'All rights reserved.',
    },
    about: {
      headline: 'WE ARE CHARLES WEBSITES.',
      supportingHeadline: 'Building the Future of Digital Business.',
      introParagraph:
        'Charles Websites is a dedicated Web Development & AI Engineering agency focused on building high-impact websites, intelligent automation, and modern digital systems that help businesses attract customers and operate efficiently.',
      missionTitle: 'Our Mission',
      missionText:
        'To equip ambitious businesses with modern websites, practical artificial intelligence, and dependable digital infrastructure that turn online visitors into long-term clients.',
      visionTitle: 'Our Vision',
      visionText:
        'To be the trusted digital engineering partner for businesses seeking clarity, speed, automation, and measurable online growth.',
      valuesTitle: 'Our Core Values',
      values: [
        {
          title: 'Clarity Over Complexity',
          description:
            'We design interfaces that communicate your value within seconds and guide visitors straight to action.',
        },
        {
          title: 'Engineering Reliability',
          description:
            'Every website is built with clean architecture, mobile responsiveness, technical SEO, and secure server-side logic.',
        },
        {
          title: 'Practical AI Adoption',
          description:
            'We implement artificial intelligence where it solves real operational bottlenecks—lead capture, customer support, and workflow automation.',
        },
        {
          title: 'Direct Accountability',
          description:
            'Clients communicate directly with the developer and AI engineer building their system, with transparent pricing in KES.',
        },
      ],
      expertiseTitle: 'Core Expertise',
      expertise: [
        {
          title: 'Website Design & Full-Stack Development',
          description:
            'Corporate websites, e-commerce catalogs, booking platforms, and conversion-focused landing architectures.',
        },
        {
          title: 'Artificial Intelligence & Automation',
          description:
            'Custom AI chatbots, automated customer inquiry routing, and intelligent business assistants.',
        },
        {
          title: 'Digital Solutions & Payment Systems',
          description:
            'WhatsApp business workflows, multilingual websites, and securely verified M-Pesa and Paystack integrations.',
        },
        {
          title: 'Android & iOS Mobile Apps',
          description:
            'Native and cross-platform Android and iOS applications connected to your website, M-Pesa payments, and cloud APIs.',
        },
        {
          title: 'Brand Identity & Technical SEO',
          description:
            'Consistent visual branding, performance optimization, structured Schema.org data, and search visibility setup.',
        },
      ],
      approachTitle: 'Our Approach to Projects',
      approachText:
        'Every engagement follows a structured four-step cycle—Discovery, Design, Development, and Launch—so you know what is being built at every stage, with clear milestones and testing across desktop and mobile devices before going live.',
      whyWorkTitle: 'Why Clients Work With Charles Websites',
      whyWorkPoints: [
        'Tailored web engineering built around your business model rather than generic templates.',
        'Clear KES pricing packages alongside custom quotations for complex integrations.',
        'Built-in mobile responsiveness, speed optimization, and search engine foundations.',
        'Direct support via phone (0112298275) and WhatsApp (+254112298275).',
      ],
      ctaHeadline: 'Ready to build a website or AI workflow for your business?',
      ctaButton: 'Book a Consultation',
    },
    servicesPage: {
      headline: 'SERVICES & TRANSPARENT PRICING',
      subheading:
        'Explore our core web, mobile app, and AI engineering capabilities and choose the package aligned with your business goals.',
      faqHeadline: 'FREQUENTLY ASKED QUESTIONS',
      faqSubheading: 'Clear answers about timelines, custom engineering, M-Pesa integration, and AI chatbots.',
      faqs: [
        {
          question: 'How long does website development take?',
          answer:
            'Timelines depend on project scope and how quickly content is ready. A Starter 4-page website typically takes 1 to 2 weeks from discovery to launch, Business websites take 2 to 3 weeks, and custom Premium platforms with e-commerce or payment integrations take 3 to 5 weeks.',
        },
        {
          question: 'Can I request a custom website?',
          answer:
            'Yes. Every website we build can be tailored to your specific industry, branding, page structure, and functional requirements. Use our Contact page or request the Premium Package for a custom quotation.',
        },
        {
          question: 'Do you integrate M-Pesa?',
          answer:
            'Yes. We integrate M-Pesa (STK Push / Daraja API) and Paystack into e-commerce stores and booking platforms using secure server-side payment verification so orders are only confirmed after verified settlement.',
        },
        {
          question: 'Can you integrate an AI chatbot?',
          answer:
            'Yes. AI chatbot integration is included in our Business and Premium packages, or can be added to an existing site. We configure assistants grounded in your verified services, FAQs, and WhatsApp lead handoff.',
        },
        {
          question: 'Is my website mobile responsive?',
          answer:
            'Absolutely. Every website is built mobile-first and tested across Android phones, iPhones, tablets, laptops, and desktop monitors to guarantee clean spacing, readable text, and tap-friendly buttons.',
        },
        {
          question: 'Do you offer website maintenance?',
          answer:
            'Yes. We provide ongoing website maintenance covering security updates, content updates, speed monitoring, backup checks, and technical support.',
        },
        {
          question: 'Can you redesign an existing website?',
          answer:
            'Yes. If your current website looks outdated, loads slowly, or does not convert mobile visitors, we can redesign and re-engineer it while preserving your domain and improving your SEO structure.',
        },
        {
          question: 'Do you develop Android and iOS mobile apps?',
          answer:
            'Yes. We design and build Android and iOS mobile applications—including customer apps, booking platforms, e-commerce apps with M-Pesa, and business workflow apps—and assist with Google Play Store and Apple App Store deployment.',
        },
      ],
    },
    contact: {
      headline: "LET'S DISCUSS YOUR NEXT PROJECT.",
      subheading:
        'Share your website, AI automation, or digital growth requirements below—or reach Charles Websites directly by phone or WhatsApp.',
      directTitle: 'Direct Channels',
      callDirect: 'Call 0112298275',
      chatWhatsapp: 'Chat on WhatsApp (+254112298275)',
      whatsappPrefill:
        'Hello Charles Websites, I would like to discuss a new website or AI project for my business.',
      hoursNote: 'Direct consultation available Monday to Saturday. Calls and WhatsApp messages receive prompt responses.',
      formTitle: 'Project Inquiry Form',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g., Grace Wanjiku',
      email: 'Email Address',
      emailPlaceholder: 'you@company.co.ke',
      phone: 'Phone Number',
      phonePlaceholder: '07XX XXX XXX or +254...',
      company: 'Company Name (Optional)',
      companyPlaceholder: 'Your business or organization',
      serviceRequired: 'Service Required',
      budgetRange: 'Budget Range (KES)',
      projectDescription: 'Project Description',
      projectDescriptionPlaceholder:
        'Tell us about your business, pages or features needed, timeline, and whether you require AI chatbot or M-Pesa integration...',
      submitBtn: 'SEND INQUIRY',
      submittingBtn: 'SENDING INQUIRY...',
      serviceOptions: [
        'Website Design & Development (Starter - KES 39,890)',
        'Business Website + AI Chatbot (KES 52,660)',
        'Premium Custom Website / E-Commerce / M-Pesa',
        'Android & iOS Mobile App Development',
        'AI Engineering & Business Automation',
        'Graphic Design & Branding',
        'Digital Growth, SEO & Maintenance',
      ],
      budgetOptions: [
        'KES 39,890 (Starter Package)',
        'KES 52,660 (Business Package)',
        'KES 60,000 – KES 120,000',
        'KES 120,000+',
        'Request Custom Quote',
      ],
      successTitle: 'Inquiry Received',
      successMessage:
        'Thank you for contacting Charles Websites. Your project inquiry has been recorded and we will reach out shortly via phone, email, or WhatsApp.',
      referenceLabel: 'Reference ID',
      sendAnother: 'Submit Another Inquiry',
      errorGeneric: 'We could not submit your inquiry right now. Please check your details or reach us directly on WhatsApp (+254112298275).',
      validation: {
        nameRequired: 'Please enter your full name.',
        emailInvalid: 'Please enter a valid email address.',
        phoneInvalid: 'Please enter a valid phone number (at least 9 digits).',
        serviceRequired: 'Please select the service you require.',
        budgetRequired: 'Please select a budget range.',
        descriptionMin: 'Please provide at least 20 characters describing your project.',
      },
    },
    downloadModal: {
      kicker: 'MULTI-PLATFORM ACCESS',
      title: 'Download the App',
      subtitle:
        'Connect directly with Charles Websites from your phone or computer — synchronized live with charleswebsites.tech.',
      comingSoon: 'Coming Soon',
      recommendedBadge: 'Recommended for your device',
      detectedLabel: 'Detected device',
      switchPlatformLabel: 'Choose platform',
      downloadAndroidBtn: 'Download for Android',
      downloadWindowsBtn: 'Download for Windows',
      getIosBtn: 'Get iOS version',
      downloadAppStoreBtn: 'Download on the App Store',
      downloadMacBtn: 'Download for Mac',
      iosComingSoonTitle: 'iPhone / iPad — Coming Soon',
      iosComingSoonBody:
        'iPhone / iPad version coming soon. iOS installation requires an App Store listing or an approved Apple distribution method.',
      macComingSoonTitle: 'Mac version coming soon',
      macComingSoonBody:
        'Mac version coming soon. Meanwhile, use charleswebsites.tech directly in your Mac browser.',
      installerPendingNote: 'Official installer download will appear here once published.',
      androidDirectReassurance:
        'This app is downloaded directly from Charles Websites. Android may ask for permission to install apps from this source.',
      windowsDirectReassurance:
        'This installer is downloaded directly from Charles Websites. Windows may show a security warning for apps installed outside the Microsoft Store.',
      downloadStartedTitle: 'Download started',
      downloadStartedSubtitle:
        'Your file is downloading directly from Charles Websites. Follow the steps below to complete installation.',
      installGuideTitle: 'Installation Guide',
      securitySupportNote:
        'Choose the version for your device. Android and Windows files download directly from Charles Websites. iOS support is coming soon.',
      securitySupportNoteIosLive:
        'Android and Windows files are downloaded directly from Charles Websites. iOS builds are delivered through Apple App Store / TestFlight.',
      livePlatformLabel: 'Official Domain',
      notifyCta: 'Request Release Notification',
      whatsappCta: 'Ask on WhatsApp',
      closeModal: 'Close download modal',
      deviceNames: {
        android: 'Android',
        ios: 'iPhone / iPad',
        windows: 'Windows PC',
        mac: 'Mac',
        other: 'Your Device',
      },
      platformDescriptions: {
        android: 'Direct Android APK package for instant quotes, WhatsApp support, and project updates.',
        windows: 'Dedicated Windows 10 & 11 desktop setup installer synced with Charles Websites.',
        ios: 'iPhone and iPad companion experience connected to our live platform.',
        mac: 'Native macOS desktop access for Apple Silicon and Intel Macs.',
      },
    },
    certifications: {
      kicker: 'VERIFIED CREDENTIALS',
      headline: 'CERTIFICATIONS & PROFESSIONAL CREDENTIALS.',
      subheading:
        'Only genuine earned credentials, active coursework, and planned industry certifications are listed here with verifiable documentation.',
      manageBtn: 'Manage Credentials',
      doneManageBtn: 'Done Managing',
      addBtn: 'Add Certification',
      filterAll: 'All',
      statusEarned: 'Earned',
      statusInProgress: 'In Progress',
      statusPlanned: 'Planned',
      dateEarnedLabel: 'Date Earned',
      credentialIdLabel: 'Credential ID',
      viewCertificate: 'View Certificate',
      verifyOnline: 'Verify Credential',
      pendingNotice: 'Document / verification pending completion',
      editBtn: 'Edit',
      removeBtn: 'Remove',
      confirmRemoveBtn: 'Confirm Remove',
      cancelBtn: 'Cancel',
      emptyTitle: 'No Credentials Published Yet',
      emptyDescription:
        'Add your genuinely earned certificates, active certifications in progress, or planned credentials along with real credential IDs, institution logos, and PDF/image proof.',
      modalAddTitle: 'Add Certification or Credential',
      modalEditTitle: 'Edit Certification',
      fieldStatus: 'Credential Status',
      fieldTitle: 'Certification Title',
      fieldTitlePlaceholder: 'Enter official certification name',
      fieldInstitution: 'Issuing Institution',
      fieldInstitutionPlaceholder: 'Enter official issuing body',
      fieldLogo: 'Institution Logo (PNG, JPG, WebP, SVG)',
      fieldDateEarned: 'Date Earned / Target Date (Optional)',
      fieldDateEarnedPlaceholder: 'e.g. October 2026',
      fieldCredentialId: 'Credential ID (Optional)',
      fieldCredentialIdPlaceholder: 'Enter exact issued credential ID if available',
      fieldVerificationUrl: 'Official Verification URL (Optional)',
      fieldVerificationUrlPlaceholder: 'https://...',
      fieldCertificateFile: 'Certificate Image or PDF (PNG, JPG, WebP, PDF)',
      uploadingFile: 'Uploading file...',
      saveBtn: 'Save Certification',
      savingBtn: 'Saving...',
      openOriginal: 'Open File / Verify',
      closeModal: 'Close modal',
    },
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      about: 'Kuhusu',
      services: 'Huduma',
      portfolio: 'Kazi Zetu',
      pricing: 'Bei',
      blog: 'Makala',
      contact: 'Wasiliana',
      getQuote: 'OMBA NUKUU',
      downloadApp: 'PAKUA APP',
      callUs: 'Piga 0112298275',
      whatsappUs: 'WhatsApp',
      languageLabel: 'Lugha',
    },
    hero: {
      kicker: 'UJENZI WA TOVUTI | UHANDISI WA AI',
      headlinePre: 'TUNAJENGA ',
      headlineAccentRed: 'MIFUMO YA KIDIJITALI',
      headlineMid: ' INAYOKUZA ',
      headlineAccentPurple: 'BIASHARA',
      headlinePost: ' YAKO.',
      supportingText:
        'Kuanzia tovuti za kisasa za biashara hadi mifumo mahiri ya AI, Charles Websites husaidia biashara kujenga uwepo imara mtandaoni, kuvutia wateja, na kuendesha ukuaji kiotomatiki.',
      primaryCta: 'ANZA MRADI WAKO',
      secondaryCta: 'TAZAMA KAZI ZETU',
      whatsappCta: 'ZUNGUMZA KWA WHATSAPP',
      trustStatement: 'Fikra za ubunifu. Teknolojia imara. Matokeo halisi ya kibiashara.',
      tagline: 'TUNAJENGA TOVUTI. TUNAUNDA AKILI BANDIA. TUNAKUZA BIASHARA.',
    },
    trust: {
      headline: 'MAWAZO YAKO. TEKNOLOJIA YETU. MATOKEO BORA YA BIASHARA.',
      description:
        'Mshirika wako wa ukuaji wa kidijitali. Tunatengeneza tovuti zenye nguvu na suluhu za akili bandia (AI) zinazosaidia biashara kuvutia wateja, kurahisisha kazi, na kukua mtandaoni.',
      pillars: [
        {
          title: 'Ujenzi wa Tovuti',
          summary: 'Tovuti maalum zenye kasi kubwa zilizoundwa kuongeza uaminifu, mauzo, na urahisi kwenye simu.',
        },
        {
          title: 'Uhandisi wa AI',
          summary: 'Wasaidizi wa AI na mifumo mahiri iliyoundwa mahususi kwa mahitaji ya wateja na uendeshaji.',
        },
        {
          title: 'Suluhu za Kidijitali',
          summary: 'Mifumo kamili ya kuweka miadi mtandaoni, maduka ya mtandaoni, na malipo ya M-Pesa / Paystack.',
        },
        {
          title: 'Uotomatishaji wa Biashara',
          summary: 'Mitiririko bora inayokusanya maombi ya wateja, kujibu maswali, na kuokoa muda wa timu kila siku.',
        },
      ],
    },
    services: {
      headline: 'TUNACHOKIFANYA',
      subheading:
        'Uhandisi makini wa tovuti, apps za Android na iOS, uotomatishaji wa AI, ubunifu wa chapa, na ukuaji wa SEO kwa biashara za kisasa.',
      learnMore: 'Jifunze Zaidi',
      cards: [
        {
          id: 'web-development',
          number: '01',
          title: 'UBUNIFU NA UJENZI WA TOVUTI',
          description:
            'Tunabuni na kujenga tovuti za kisasa zinazobadilisha wageni kuwa wateja wanaolipa.',
          features: [
            'Tovuti za biashara',
            'Tovuti za makampuni',
            'Tovuti za biashara mtandaoni (E-commerce)',
            'Tovuti za kuonyesha kazi (Portfolio)',
            'Tovuti za kuweka miadi',
          ],
        },
        {
          id: 'ai-engineering',
          number: '02',
          title: 'UHANDISI WA AI NA UOTOMATISHAJI',
          description:
            'Leta akili bandia katika biashara yako kwa suluhu halisi zinazofanya kazi.',
          features: [
            'Uunganishaji wa AI chatbot',
            'Huduma kwa wateja kwa AI',
            'Uotomatishaji wa shughuli za biashara',
            'Wasaidizi wa AI',
            'Mitiririko mahiri ya kazi',
          ],
        },
        {
          id: 'graphic-design',
          number: '03',
          title: 'UBUNIFU WA PICHA NA CHAPA',
          description:
            'Jenga utambulisho thabiti na wa kitaalamu wa chapa unaojitofautisha sokoni.',
          features: [
            'Mabango ya masoko (Posters)',
            'Michoro ya mitandao ya kijamii',
            'Utambulisho wa biashara (Branding)',
            'Vifaa vya matangazo',
          ],
        },
        {
          id: 'digital-growth',
          number: '04',
          title: 'UKUAJI WA KIDIJITALI NA SEO',
          description:
            'Boresha mwonekano wako Google, kasi ya tovuti, na uzoefu wa wateja mtandaoni.',
          features: [
            'Mpangilio wa SEO',
            'Uboreshaji wa tovuti',
            'Uongezaji wa kasi ya tovuti',
            'Mkakati wa kidijitali',
            'Matengenezo ya tovuti',
          ],
        },
        {
          id: 'mobile-app-development',
          number: '05',
          title: 'UTENGENEZAJI WA APPS ZA ANDROID NA iOS',
          description:
            'Tunabuni na kutengeneza programu za simu (Android na iOS) zenye kasi, usalama, na urahisi kwa wateja na shughuli za biashara.',
          features: [
            'Utengenezaji wa Android apps',
            'Utengenezaji wa iOS apps',
            'Apps zinazofanya kazi Android na iOS',
            'Muunganisho wa API na seva',
            'Malipo ya M-Pesa na arifa (Notifications)',
            'Uwekaji kwenye Play Store na App Store',
          ],
        },
      ],
    },
    whyUs: {
      headline: 'KWA NINI BIASHARA HUCHAGUA CHARLES WEBSITES',
      subheading:
        'Kila mradi unachanganya viwango vya juu vya ubunifu na uhandisi imara wa programu.',
      items: [
        {
          title: 'Miundo ya kisasa na ya kitaalamu',
          description:
            'Tovuti safi zinazolenga kubadilisha wageni kuwa wateja, zilizojengwa kulingana na sekta yako.',
        },
        {
          title: 'Ujenzi unaoanza na simu',
          description:
            'Mifumo inayofanya kazi kwa ulaini kwenye simu janja, tableti, na kompyuta za mezani.',
        },
        {
          title: 'Ubunifu unaotumia AI',
          description:
            'Chatbots na mifumo ya kiotomatiki inayowahudumia wateja wako saa 24 kila siku.',
        },
        {
          title: 'Ujenzi unaozingatia SEO',
          description:
            'Mpangilio sahihi wa vichwa, meta tags, sitemaps, na viungo safi tangu siku ya kwanza.',
        },
        {
          title: 'Tovuti zenye kasi ya juu',
          description:
            'Picha na misimbo iliyoboreshwa ili kurasa zifunguke haraka hata kwenye intaneti ya simu.',
        },
        {
          title: 'Mawasiliano na msaada wa moja kwa moja',
          description:
            'Fanya kazi moja kwa moja na mhandisi wako kuanzia hatua ya wazo hadi uzinduzi na matunzo.',
        },
      ],
    },
    portfolio: {
      headline: 'KAZI ZETU ZINAJIELEZA ZENYEWE.',
      subheading:
        'Miradi teule ya tovuti tuliyounda kwa biashara katika sekta za makampuni, vipuri vya magari, afya, minada, na huduma za kisheria.',
      viewProject: 'Tazama Mradi',
      viewAllProjects: 'TAZAMA MIRADI YOTE',
      filterAll: 'Miradi Yote',
      filterCorporate: 'Makampuni',
      filterEcommerce: 'Biashara Mtandaoni',
      filterHealthcare: 'Afya',
      filterLegal: 'Sheria na Minada',
      deliverablesLabel: 'Wigo na Kazi Zilizofanywa',
      overviewLabel: 'Muhtasari wa Muundo',
      liveUrlPending: 'Kiungo halisi cha tovuti kitawekwa hapa mara tu kitakapotolewa na mteja.',
      visitLiveSite: 'Tembelea Tovuti Halisi',
      startSimilarProject: 'Omba Tovuti Kama Hii',
      closeModal: 'Funga dirisha',
    },
    pricing: {
      headline: 'WEKEZA KATIKA UKUAJI WA BIASHARA YAKO.',
      subheading:
        'Chagua kifurushi cha tovuti kinachoendana na malengo yako. Tovuti za kitaalamu zilizojengwa kuvutia wateja na kukuza chapa yako.',
      mostPopular: 'MAARUFU ZAIDI',
      comparisonTitle: 'Ulinganisho wa Haraka wa Vifurushi',
      comparisonFeature: 'Huduma Iliyojumuishwa',
      paymentSecurityNote:
        'Mifumo yote ya malipo ya M-Pesa na Paystack hujengwa kwa uthibitishaji salama wa seva kabla ya kuthibitisha agizo lolote.',
      packages: [
        {
          id: 'starter',
          name: 'KIFURUSHI CHA MWANZO (STARTER)',
          price: 'KES 39,890',
          subtitle: 'Bora kwa biashara changa na ndogo zinazoanza uwepo wao mtandaoni.',
          features: [
            'Tovuti ya kurasa 4',
            'Ukurasa wa Nyumbani',
            'Ukurasa wa Kuhusu Sisi',
            'Ukurasa wa Mawasiliano',
            'Ukurasa wa Huduma',
            'Muundo unaofanya kazi kwenye simu',
            'Mpangilio wa msingi wa SEO',
            'Sehemu ya Blogu',
            'Msaada wa lugha nyingi',
            'Muunganisho wa WhatsApp',
          ],
          cta: 'ANZA SASA',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Starter Package priced at KES 39,890. I would like to discuss my website project.',
        },
        {
          id: 'business',
          name: 'KIFURUSHI CHA BIASHARA (BUSINESS)',
          price: 'KES 52,660',
          popular: true,
          subtitle:
            'Bora kwa biashara zinazokua zinazohitaji uwepo imara mtandaoni na vipengele vya kisasa.',
          features: [
            'Tovuti ya kurasa 4–7',
            'Muundo maalum wa kisasa',
            'Uboreshaji wa simu na tableti',
            'Muunganisho wa WhatsApp',
            'Muunganisho wa mitandao ya kijamii',
            'Uboreshaji wa kasi ya tovuti',
            'Marekebisho 2–3 ya muundo',
            'Muunganisho wa AI chatbot',
          ],
          cta: 'CHAGUA KIFURUSHI CHA BIASHARA',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Business Package priced at KES 52,660. I would like to discuss my project.',
        },
        {
          id: 'premium',
          name: 'KIFURUSHI CHA JUU (PREMIUM)',
          price: 'WASILIANA KWA NUKUU',
          subtitle: 'Uzoefu wa hali ya juu wa kidijitali kwa makampuni makubwa na chapa zenye malengo makuu.',
          features: [
            'Tovuti hadi kurasa 10',
            'Muundo maalum kikamilifu',
            'Mpangilio wa kina wa SEO',
            'Mpangilio unaolenga mauzo',
            'Mfumo wa kuweka miadi',
            'Malipo ya Paystack / M-Pesa',
            'Muunganisho wa AI chatbot',
            'Mfumo wa duka mtandaoni (E-commerce)',
          ],
          cta: 'OMBA NUKUU YA PREMIUM',
          whatsappMessage:
            'Hello Charles Websites, I am interested in the Premium Website Package. I would like to request a quotation.',
        },
      ],
    },
    process: {
      headline: 'KUTOKA WAZO HADI UZINDUZI.',
      subheading: 'Hatua nne zilizo wazi za uhandisi kwa utoaji wa mradi kwa wakati.',
      steps: [
        {
          number: '01.',
          title: 'UCHUNGUZI',
          description: 'Tunaelewa biashara yako, malengo na mahitaji yako.',
        },
        {
          number: '02.',
          title: 'UBUNIFU',
          description: 'Tunaunda muundo wa kisasa unaoendana na chapa yako.',
        },
        {
          number: '03.',
          title: 'UTENGENEZAJI',
          description: 'Tunajenga, tunaunganisha mifumo na kuboresha tovuti yako.',
        },
        {
          number: '04.',
          title: 'UZINDUZI',
          description: 'Tunajaribu, tunazindua na kukusaidia kuingia mtandaoni.',
        },
      ],
    },
    testimonials: {
      headline: 'WATEJA WETU WANASEMA NINI',
      subheading:
        'Maoni kutoka kwa mashirika tuliyofanya nayo kazi katika sekta za makampuni, vipuri vya magari, afya, minada, na huduma za kisheria.',
      placeholderNotice: 'Maoni ya Mteja',
      slots: [
        {
          slotLabel: 'Biashara na Suluhu za Makampuni',
          quotePlaceholder:
            'Kabla ya kufanya kazi na Charles Websites, wateja wengi walipata ugumu kuelewa huduma zetu mtandaoni. Walipanga kila kitu kwenye tovuti safi na ya haraka inayofanya kazi vizuri kwenye simu na kompyuta, na wateja sasa wanatufikia moja kwa moja kupitia WhatsApp.',
          authorPlaceholder: 'Timu ya Usimamizi',
          companyPlaceholder: 'Ruevan Limited',
        },
        {
          slotLabel: 'Biashara Mtandaoni ya Vipuri',
          quotePlaceholder:
            'Zamani wateja walipiga simu kuuliza tu kama tuna vipuri fulani. Kuwa na katalogi iliyopangwa mtandaoni yenye uchujaji wa haraka na maombi ya moja kwa moja kwa WhatsApp kumeokoa muda mwingi wa timu yetu ya mauzo kila wiki.',
          authorPlaceholder: 'Dawati la Uendeshaji na Vipuri',
          companyPlaceholder: 'Nyati AutoSpares',
        },
        {
          slotLabel: 'Afya na Huduma za Matibabu',
          quotePlaceholder:
            'Wagonjwa walihitaji tovuti tulivu na rahisi ambapo wanaweza kuangalia huduma za kliniki na kuomba miadi kupitia simu zao. Charles alisikiliza maoni yetu kwa makini, akafanya marekebisho kwa haraka, na kutoa tovuti inayoeleweka kirahisi.',
          authorPlaceholder: 'Utawala wa Kliniki',
          companyPlaceholder: 'Lenanns Healthcare',
        },
        {
          slotLabel: 'Mnada na Uthamini wa Mali',
          quotePlaceholder:
            'Kwenye shughuli za minada, uwazi na uaminifu ni jambo la kwanza. Jukwaa alilojenga Charles Websites linawawezesha wateja na wazabuni kuona matangazo ya minada na orodha ya mali kwa mpangilio mzuri bila tovuti kuwa nzito.',
          authorPlaceholder: 'Ofisi ya Mkurugenzi',
          companyPlaceholder: 'Makuri Auctioneers',
        },
        {
          slotLabel: 'Uwajili na Huduma za Kisheria',
          quotePlaceholder:
            'Tulitaka tovuti yenye heshima na mpangilio tulivu unaoakisi jinsi kampuni yetu inavyofanya kazi—nyanja za sheria zilizo wazi na njia rahisi kwa mteja kuweka miadi ya ushauri wa siri. Matokeo yalikidhi matarajio yetu.',
          authorPlaceholder: 'Utawala wa Kampuni',
          companyPlaceholder: 'MMS Advocates',
        },
      ],
      shareFeedbackCta: 'Anza Mradi Wako Nasi',
    },
    skills: {
      kicker: 'TEKNOLOJIA KUU',
      headline: 'UJUZI NA TEKNOLOJIA ZETU.',
      subheading:
        'Tunajenga tovuti za haraka, thabiti, na zinazokua kwa kutumia teknolojia zilizothibitishwa za muundo na seva.',
      items: [
        {
          id: 'html5',
          name: 'HTML5',
          role: 'Muundo wa Semantiki na SEO',
          logo: '/assets/aistudio/html5_dfd65fdd.svg',
          description:
            'Msingi wa kimuundo wa kila tovuti ya kisasa. Tunaandika msimbo safi wa HTML5 unaoboresha uorodheshaji kwenye Google, ufikivu kwa watumiaji wote, na kasi ya upakiaji.',
        },
        {
          id: 'css',
          name: 'CSS',
          role: 'Muundo wa Simu na Kompyuta',
          logo: '/assets/aistudio/css_9a97b95e.svg',
          description:
            'Ubunifu sahihi wa mwonekano kwa kutumia CSS Grid, Flexbox, na mifumo ya kisasa ya muundo ili tovuti yako ionekane vizuri kwenye simu, kompyuta kibao, na kompyuta.',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          role: 'Mwingiliano na Mantiki ya Programu',
          logo: '/assets/aistudio/javascript_c9be35a7.svg',
          description:
            'Injini inayoendesha mwingiliano wa moja kwa moja, uthibitishaji wa fomu, uchujaji wa haraka wa maudhui, na uzoefu laini katika programu za kisasa za React na Next.js.',
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          role: 'API za Seva na Mifumo ya AI',
          logo: '/assets/aistudio/nodedotjs_021851b7.svg',
          description:
            'Mazingira yenye kasi ya juu ya seva tunayotumia kujenga API imara, mifumo ya webhook, uthibitishaji salama wa malipo ya M-Pesa/Paystack, na uunganishaji wa AI chatbot.',
        },
        {
          id: 'php',
          name: 'PHP',
          role: 'CMS, Maduka Mtandaoni na Seva',
          logo: '/assets/aistudio/php_cd1beaa0.svg',
          description:
            'Lugha thabiti ya seva inayoendesha tovuti maalum za WordPress, maduka ya mtandaoni ya WooCommerce, mifumo ya Laravel, na hifadhidata za kibiashara.',
        },
      ],
    },
    blog: {
      previewHeadline: 'MAARIFA KWA ULIMWENGU WA KIDIJITALI.',
      previewSubheading:
        'Makala za vitendo kuhusu tovuti za biashara, uotomatishaji wa AI, uboreshaji wa SEO, na uhandisi wa kisasa.',
      readMore: 'SOMA ZAIDI',
      viewAllArticles: 'TAZAMA MAKALA ZOTE',
      pageTitle: 'Maarifa na Jarida la Uhandisi',
      pageSubtitle:
        'Miongozo inayotumika juu ya kujenga tovuti zinazouza, kuunganisha AI chatbots, na kukuza mwonekano wako mtandaoni.',
      searchPlaceholder: 'Tafuta makala kwa mada au neno kuu...',
      allCategories: 'Mada Zote',
      minRead: 'dakika za kusoma',
      publishedOn: 'Imechapishwa',
      relatedArticles: 'Makala Zinazohusiana',
      shareArticle: 'Shiriki makala hii',
      copyLink: 'Nakili kiungo',
      linkCopied: 'Kiungo kimenakiliwa',
      backToBlog: 'Rudi kwenye makala zote',
      noResults: 'Hakuna makala zilizolingana na utafutaji wako. Jaribu neno lingine.',
      manageArticles: 'Simamia Makala',
      addArticleTitle: 'Chapisha Makala Mpya',
      editArticleTitle: 'Hariri Makala',
      saveArticle: 'Hifadhi Makala',
      cancel: 'Ghairi',
    },
    finalCta: {
      headline: 'UKO TAYARI KUINUA BIASHARA YAKO HADI KIWANGO KIFUATACHO?',
      supportingText:
        'Hebu tutengeneze tovuti au suluhu ya AI itakayosaidia biashara yako kung’ara na kukua.',
      primaryBtn: 'ANZA MRADI WAKO',
      whatsappBtn: 'ZUNGUMZA NASI KWA WHATSAPP',
      whatsappPrefill:
        'Hello Charles Websites, I would like to discuss building a website or AI solution for my business.',
    },
    footer: {
      description:
        'Wakala wa Ujenzi wa Tovuti na Uhandisi wa AI unaosaidia biashara kujenga uwepo mtandaoni, kuendesha kazi kiotomatiki, na kukua kwa teknolojia.',
      navigationTitle: 'Urambazaji',
      servicesTitle: 'Huduma',
      pricingTitle: 'Vifurushi',
      contactTitle: 'Mawasiliano ya Moja kwa Moja',
      phoneLabel: 'Simu',
      whatsappLabel: 'WhatsApp',
      followTitle: 'Ungana Nasi',
      rightsReserved: 'Haki zote zimehifadhiwa.',
    },
    about: {
      headline: 'SISI NI CHARLES WEBSITES.',
      supportingHeadline: 'Tunajenga Mustakabali wa Biashara za Kidijitali.',
      introParagraph:
        'Charles Websites ni wakala wa Ujenzi wa Tovuti na Uhandisi wa AI unaolenga kuunda tovuti zenye tija, mifumo ya kiotomatiki, na suluhu za kisasa zinazosaidia biashara kuvutia wateja na kufanya kazi kwa ufanisi.',
      missionTitle: 'Dhamira Yetu',
      missionText:
        'Kuziwezesha biashara zenye malengo makubwa kwa tovuti za kisasa, akili bandia inayotumika, na miundombinu imara inayobadilisha wageni wa mtandaoni kuwa wateja wa kudumu.',
      visionTitle: 'Maono Yetu',
      visionText:
        'Kuwa mshirika anayeaminika wa uhandisi wa kidijitali kwa biashara zinazotafuta uwazi, kasi, uotomatishaji, na ukuaji halisi mtandaoni.',
      valuesTitle: 'Maadili Yetu Makuu',
      values: [
        {
          title: 'Uwazi Kuliko Utata',
          description:
            'Tunabuni kurasa zinazowasilisha thamani yako ndani ya sekunde chache na kumwongoza mgeni moja kwa moja kuchukua hatua.',
        },
        {
          title: 'Uhandisi wa Kuaminika',
          description:
            'Kila tovuti hujengwa kwa muundo safi, uwezo kamili kwenye simu, SEO ya kiufundi, na usalama wa seva.',
        },
        {
          title: 'Matumizi Halisi ya AI',
          description:
            'Tunaunganisha akili bandia pale inapotatua changamoto halisi za kazi—ukusanyaji wa wateja, huduma kwa wateja, na mitiririko ya kazi.',
        },
        {
          title: 'Uwajibikaji wa Moja kwa Moja',
          description:
            'Wateja huwasiliana moja kwa moja na mhandisi anayejenga mfumo wao, kwa bei zilizo wazi katika KES.',
        },
      ],
      expertiseTitle: 'Utaalamu Wetu Mkuu',
      expertise: [
        {
          title: 'Ubunifu na Ujenzi wa Tovuti',
          description:
            'Tovuti za makampuni, katalogi za biashara mtandaoni, mifumo ya miadi, na kurasa za mauzo.',
        },
        {
          title: 'Akili Bandia (AI) na Uotomatishaji',
          description:
            'Chatbots maalum za AI, uelekezaji wa maombi ya wateja, na wasaidizi mahiri wa biashara.',
        },
        {
          title: 'Suluhu za Kidijitali na Malipo',
          description:
            'Mitiririko ya WhatsApp, tovuti za lugha nyingi, na mifumo ya malipo ya M-Pesa na Paystack yenye uthibitishaji wa seva.',
        },
        {
          title: 'Apps za Simu za Android na iOS',
          description:
            'Programu za Android na iOS zilizounganishwa na tovuti yako, malipo ya M-Pesa, na mifumo ya wingu.',
        },
        {
          title: 'Utambulisho wa Chapa na SEO',
          description:
            'Ubunifu wa picha za biashara, uboreshaji wa kasi, data ya Schema.org, na mwonekano wa Google.',
        },
      ],
      approachTitle: 'Mbinu Yetu Kwenye Miradi',
      approachText:
        'Kila mradi hufuata hatua nne zilizopangwa—Uchunguzi, Ubunifu, Utengenezaji, na Uzinduzi—ili ujue kinachoendelea katika kila hatua na kuhakikisha majaribio kamili kwenye kompyuta na simu kabla ya kuzindua.',
      whyWorkTitle: 'Kwa Nini Ufanye Kazi na Charles Websites',
      whyWorkPoints: [
        'Uhandisi uliobinafsishwa kulingana na biashara yako badala ya violezo vya kawaida.',
        'Bei zilizo wazi katika KES pamoja na nukuu maalum kwa miradi mikubwa.',
        'Ujenzi wenye kasi, muundo bora wa simu, na msingi wa SEO.',
        'Mawasiliano ya moja kwa moja kwa simu (0112298275) na WhatsApp (+254112298275).',
      ],
      ctaHeadline: 'Uko tayari kujenga tovuti au mfumo wa AI kwa biashara yako?',
      ctaButton: 'Weka Miadi ya Ushauri',
    },
    servicesPage: {
      headline: 'HUDUMA NA BEI ZILIZO WAZI',
      subheading:
        'Chunguza uwezo wetu mkuu wa kiuhandisi na uchague kifurushi kinachoendana na malengo ya biashara yako.',
      faqHeadline: 'MASWALI YANAYOULIZWA MARA KWA MARA',
      faqSubheading: 'Majibu ya wazi kuhusu muda wa kazi, tovuti maalum, malipo ya M-Pesa, na AI chatbots.',
      faqs: [
        {
          question: 'Ujenzi wa tovuti huchukua muda gani?',
          answer:
            'Muda hutegemea ukubwa wa mradi na upatikanaji wa maudhui. Kifurushi cha Starter (kurasa 4) huchukua wiki 1 hadi 2, kifurushi cha Business wiki 2 hadi 3, na miradi mikubwa ya Premium yenye malipo au maduka mtandaoni huchukua wiki 3 hadi 5.',
        },
        {
          question: 'Je, naweza kuomba tovuti maalum (custom website)?',
          answer:
            'Ndiyo. Kila tovuti inaweza kubinafsishwa kulingana na sekta yako, chapa, kurasa, na mahitaji maalum. Tumia ukurasa wa Mawasiliano au omba Kifurushi cha Premium.',
        },
        {
          question: 'Je, mnaunganisha malipo ya M-Pesa?',
          answer:
            'Ndiyo. Tunaunganisha M-Pesa (STK Push / Daraja API) na Paystack kwenye maduka ya mtandaoni na mifumo ya miadi kwa kutumia uthibitishaji salama wa seva kabla ya kuthibitisha malipo.',
        },
        {
          question: 'Je, mnaweza kuunganisha AI chatbot?',
          answer:
            'Ndiyo. Muunganisho wa AI chatbot umo katika vifurushi vya Business na Premium, au unaweza kuongezwa kwenye tovuti iliyopo ili kujibu wateja na kuwapeleka WhatsApp.',
        },
        {
          question: 'Je, tovuti yangu itafanya kazi vizuri kwenye simu?',
          answer:
            'Kabisa. Kila tovuti hujengwa ikianza na simu na hupimwa kwenye Android, iPhone, tableti, na kompyuta ili kuhakikisha mwonekano safi na vitufe rahisi.',
        },
        {
          question: 'Je, mnatoa huduma ya matengenezo ya tovuti?',
          answer:
            'Ndiyo. Tunatoa huduma endelevu ya matunzo inayojumuisha masasisho ya usalama, mabadiliko ya maudhui, ufuatiliaji wa kasi, na msaada wa kiufundi.',
        },
        {
          question: 'Je, mnaweza kuboresha na kubuni upya tovuti iliyopo?',
          answer:
            'Ndiyo. Iwapo tovuti yako ya sasa inaonekana ya zamani, inachelewa kufunguka, au haileti wateja kwenye simu, tunaweza kuijenga upya huku tukihifadhi kikoa chako na kuboresha SEO.',
        },
        {
          question: 'Je, mnatengeneza apps za Android na iOS?',
          answer:
            'Ndiyo. Tunabuni na kutengeneza apps za Android na iOS—zikiwemo apps za wateja, kuweka miadi, maduka mtandaoni yenye M-Pesa, na apps za ndani za biashara—pamoja na kusaidia kuziweka Google Play Store na Apple App Store.',
        },
      ],
    },
    contact: {
      headline: 'HEBU TUJADILI MRADI WAKO UJAO.',
      subheading:
        'Shiriki mahitaji yako ya tovuti, AI, au ukuaji wa kidijitali hapa chini—au wasiliana na Charles Websites moja kwa moja kwa simu au WhatsApp.',
      directTitle: 'Njia za Moja kwa Moja',
      callDirect: 'Piga 0112298275',
      chatWhatsapp: 'Zungumza kwa WhatsApp (+254112298275)',
      whatsappPrefill:
        'Hello Charles Websites, I would like to discuss a new website or AI project for my business.',
      hoursNote: 'Ushauri wa moja kwa moja unapatikana Jumatatu hadi Jumamosi. Simu na ujumbe wa WhatsApp hujibiwa haraka.',
      formTitle: 'Fomu ya Maombi ya Mradi',
      fullName: 'Jina Kamili',
      fullNamePlaceholder: 'mfano, Grace Wanjiku',
      email: 'Barua Pepe',
      emailPlaceholder: 'wewe@kampuni.co.ke',
      phone: 'Namba ya Simu',
      phonePlaceholder: '07XX XXX XXX au +254...',
      company: 'Jina la Kampuni (Hiari)',
      companyPlaceholder: 'Biashara au shirika lako',
      serviceRequired: 'Huduma Inayohitajika',
      budgetRange: 'Kiwango cha Bajeti (KES)',
      projectDescription: 'Maelezo ya Mradi',
      projectDescriptionPlaceholder:
        'Tuambie kuhusu biashara yako, kurasa au vipengele unavyohitaji, muda unaolenga, na iwapo unahitaji AI chatbot au M-Pesa...',
      submitBtn: 'TUMA MAOMBI',
      submittingBtn: 'INATUMA MAOMBI...',
      serviceOptions: [
        'Ubunifu na Ujenzi wa Tovuti (Starter - KES 39,890)',
        'Tovuti ya Biashara + AI Chatbot (KES 52,660)',
        'Tovuti Maalum ya Premium / E-Commerce / M-Pesa',
        'Utengenezaji wa Apps za Simu (Android & iOS)',
        'Uhandisi wa AI na Uotomatishaji wa Biashara',
        'Ubunifu wa Picha na Chapa',
        'Ukuaji wa Kidijitali, SEO na Matengenezo',
      ],
      budgetOptions: [
        'KES 39,890 (Kifurushi cha Starter)',
        'KES 52,660 (Kifurushi cha Business)',
        'KES 60,000 – KES 120,000',
        'KES 120,000+',
        'Omba Nukuu Maalum',
      ],
      successTitle: 'Maombi Yamepokewa',
      successMessage:
        'Asante kwa kuwasiliana na Charles Websites. Maombi ya mradi wako yamehifadhiwa na tutawasiliana nawe hivi karibuni kwa simu, barua pepe, au WhatsApp.',
      referenceLabel: 'Namba ya Kumbukumbu',
      sendAnother: 'Tuma Maombi Mengine',
      errorGeneric: 'Hatukuweza kutuma maombi yako sasa hivi. Tafadhali hakiki taarifa zako au wasiliana nasi moja kwa moja kwa WhatsApp (+254112298275).',
      validation: {
        nameRequired: 'Tafadhali weka jina lako kamili.',
        emailInvalid: 'Tafadhali weka anwani sahihi ya barua pepe.',
        phoneInvalid: 'Tafadhali weka namba sahihi ya simu (angalau tarakimu 9).',
        serviceRequired: 'Tafadhali chagua huduma unayohitaji.',
        budgetRequired: 'Tafadhali chagua kiwango cha bajeti.',
        descriptionMin: 'Tafadhali andika angalau herufi 20 ukielezea mradi wako.',
      },
    },
    downloadModal: {
      kicker: 'UPATIKANAJI KWENYE VIFAA VYOTE',
      title: 'Pakua Programu Yetu',
      subtitle:
        'Fikia Charles Websites moja kwa moja kwenye simu au kompyuta yako — imeunganishwa na charleswebsites.tech.',
      comingSoon: 'Inakuja Hivi Karibuni',
      recommendedBadge: 'Imependekezwa kwa kifaa chako',
      detectedLabel: 'Kifaa kilichotambuliwa',
      switchPlatformLabel: 'Chagua kifaa kingine',
      downloadAndroidBtn: 'Pakua kwa Android',
      downloadWindowsBtn: 'Pakua kwa Windows',
      getIosBtn: 'Pata toleo la iOS',
      downloadAppStoreBtn: 'Pakua kwenye App Store',
      downloadMacBtn: 'Pakua kwa Mac',
      iosComingSoonTitle: 'iPhone / iPad — Inakuja Hivi Karibuni',
      iosComingSoonBody:
        'Toleo la iPhone / iPad linakuja hivi karibuni. Usakinishaji wa iOS unahitaji App Store au njia rasmi iliyoidhinishwa na Apple.',
      macComingSoonTitle: 'Toleo la Mac linakuja hivi karibuni',
      macComingSoonBody:
        'Toleo la Mac linakuja hivi karibuni. Kwa sasa tumia charleswebsites.tech moja kwa moja kwenye kivinjari chako.',
      installerPendingNote: 'Faili rasmi ya kupakua itaonekana hapa ikishachapishwa.',
      androidDirectReassurance:
        'Programu hii inapakuliwa moja kwa moja kutoka Charles Websites. Android inaweza kuomba ruhusa ya kusakinisha kutoka chanzo hiki.',
      windowsDirectReassurance:
        'Kisakinishi hiki kinapakuliwa moja kwa moja kutoka Charles Websites. Windows inaweza kuonyesha onyo la usalama kwa programu zilizo nje ya Microsoft Store.',
      downloadStartedTitle: 'Upakuaji umeanza',
      downloadStartedSubtitle:
        'Faili yako inapakuliwa moja kwa moja kutoka Charles Websites. Fuata hatua hizi kukamilisha usakinishaji.',
      installGuideTitle: 'Mwongozo wa Kusakinisha',
      securitySupportNote:
        'Chagua toleo la kifaa chako. Faili za Android na Windows zinapakuliwa moja kwa moja kutoka Charles Websites. Toleo la iOS linakuja hivi karibuni.',
      securitySupportNoteIosLive:
        'Faili za Android na Windows zinapakuliwa moja kwa moja kutoka Charles Websites. Toleo la iOS linapatikana kupitia App Store / TestFlight.',
      livePlatformLabel: 'Kikoa Rasmi',
      notifyCta: 'Omba Taarifa Ikizinduliwa',
      whatsappCta: 'Uliza kwa WhatsApp',
      closeModal: 'Funga dirisha la kupakua',
      deviceNames: {
        android: 'Android',
        ios: 'iPhone / iPad',
        windows: 'Kompyuta ya Windows',
        mac: 'Mac',
        other: 'Kifaa Chako',
      },
      platformDescriptions: {
        android: 'Faili ya APK ya moja kwa moja kwa maombi ya haraka, msaada wa WhatsApp, na taarifa za miradi.',
        windows: 'Programu rasmi ya kompyuta kwa Windows 10 na 11 iliyounganishwa na Charles Websites.',
        ios: 'Programu ya iPhone na iPad iliyounganishwa na mfumo wetu rasmi.',
        mac: 'Programu ya macOS kwa kompyuta za Apple Silicon na Intel.',
      },
    },
    certifications: {
      kicker: 'VYETI VILIVYOTHIBITISHWA',
      headline: 'VYETI NA SIFA ZA KITAALAMU.',
      subheading:
        'Vyeti halisi pekee vilivyopatikana, mafunzo yanayoendelea, na vyeti vilivyopangwa huonyeshwa hapa pamoja na uthibitisho rasmi.',
      manageBtn: 'Simamia Vyeti',
      doneManageBtn: 'Maliza Usimamizi',
      addBtn: 'Ongeza Cheti',
      filterAll: 'Vyote',
      statusEarned: 'Kimepatikana',
      statusInProgress: 'Inaendelea',
      statusPlanned: 'Imepangwa',
      dateEarnedLabel: 'Tarehe Iliyopatikana',
      credentialIdLabel: 'Namba ya Cheti',
      viewCertificate: 'Tazama Cheti',
      verifyOnline: 'Thibitisha Cheti',
      pendingNotice: 'Nyaraka au uthibitisho unasubiri kukamilika',
      editBtn: 'Hariri',
      removeBtn: 'Futa',
      confirmRemoveBtn: 'Thibitisha Kufuta',
      cancelBtn: 'Ghairi',
      emptyTitle: 'Bado Hakuna Vyeti Vilivyochapishwa',
      emptyDescription:
        'Ongeza vyeti vyako halisi ulivyopata, unavyoendelea kusoma, au ulivyopanga pamoja na nembo ya taasisi, namba halisi ya cheti, na faili ya PDF au picha.',
      modalAddTitle: 'Ongeza Cheti au Sifa ya Kitaalamu',
      modalEditTitle: 'Hariri Cheti',
      fieldStatus: 'Hali ya Cheti',
      fieldTitle: 'Jina la Cheti',
      fieldTitlePlaceholder: 'Weka jina rasmi la cheti',
      fieldInstitution: 'Taasisi Iliyotoa',
      fieldInstitutionPlaceholder: 'Weka jina rasmi la taasisi',
      fieldLogo: 'Nembo ya Taasisi (PNG, JPG, WebP, SVG)',
      fieldDateEarned: 'Tarehe Iliyopatikana / Lengwa (Hiari)',
      fieldDateEarnedPlaceholder: 'mfano, Oktoba 2026',
      fieldCredentialId: 'Namba ya Cheti (Hiari)',
      fieldCredentialIdPlaceholder: 'Weka namba halisi ya cheti kama ipo',
      fieldVerificationUrl: 'Kiungo Rasmi cha Uthibitisho (Hiari)',
      fieldVerificationUrlPlaceholder: 'https://...',
      fieldCertificateFile: 'Picha au PDF ya Cheti (PNG, JPG, WebP, PDF)',
      uploadingFile: 'Inapakia faili...',
      saveBtn: 'Hifadhi Cheti',
      savingBtn: 'Inahifadhi...',
      openOriginal: 'Fungua Faili / Thibitisha',
      closeModal: 'Funga dirisha',
    },
  },
};
