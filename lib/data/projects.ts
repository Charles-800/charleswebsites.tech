export type ProjectCategory = 'corporate' | 'ecommerce' | 'healthcare' | 'legal';

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  image: string;
  imageFit?: 'cover' | 'contain' | 'cover-top';
  liveUrl: string;
  technologies: string[];
  servicePath: string;
  en: {
    industry: string;
    serviceLabel: string;
    locationContext: string;
    shortDescription: string;
    overview: string;
    challenge: string;
    solution: string;
    deliverables: string[];
  };
  sw: {
    industry: string;
    serviceLabel: string;
    locationContext: string;
    shortDescription: string;
    overview: string;
    challenge: string;
    solution: string;
    deliverables: string[];
  };
}

/**
 * Verified portfolio entries for Charles Websites.
 * Only factual project scope, architecture, and verified URLs are stated.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'ruevan-limited',
    slug: 'ruevan-limited',
    name: 'Ruevan Limited',
    category: 'corporate',
    image: '/assets/aistudio/Screenshot__3__28e6e655.png',
    imageFit: 'contain',
    liveUrl: 'https://ruevan.co.ke/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Architecture', 'Technical SEO'],
    servicePath: '/solutions/corporate-websites',
    en: {
      industry: 'Corporate & Business Solutions',
      serviceLabel: 'Corporate Website Development',
      locationContext: 'Kenya',
      shortDescription:
        'A structured corporate web platform designed to communicate enterprise credibility, showcase core service divisions, and streamline direct client inquiries.',
      overview:
        'Built with clean architectural typography, responsive desktop-to-mobile layouts, and clear conversion pathways connecting prospective partners directly with the Ruevan Limited team.',
      challenge:
        'Prospective corporate partners needed a single authoritative online hub to evaluate Ruevan Limited divisions, understand company capabilities, and contact decision-makers quickly from both desktop and mobile devices.',
      solution:
        'Designed and engineered a multi-section corporate website with clear service categorization, semantic HTML5 headings for Google search crawlability, mobile-first navigation, and direct WhatsApp and inquiry routing.',
      deliverables: [
        'Responsive Corporate Web Architecture',
        'Service Showcase & Inquiry Funnel',
        'Technical SEO Foundation',
        'WhatsApp Direct Lead Integration',
      ],
    },
    sw: {
      industry: 'Biashara na Suluhu za Makampuni',
      serviceLabel: 'Ujenzi wa Tovuti ya Kampuni',
      locationContext: 'Kenya',
      shortDescription:
        'Jukwaa la kitaalamu la wavuti lililoundwa kuonyesha uaminifu wa kampuni, huduma kuu, na kurahisisha mawasiliano ya moja kwa moja na wateja.',
      overview:
        'Limejengwa kwa muundo safi wa kisasa, linalofanya kazi kwa urahisi kwenye kompyuta na simu, na njia wazi za kuunganisha wateja na timu ya Ruevan Limited.',
      challenge:
        'Washirika wa kibiashara walihitaji jukwaa rasmi la kuangalia huduma za Ruevan Limited na kuwasiliana na timu kwa haraka kwenye kompyuta na simu.',
      solution:
        'Tulijenga tovuti ya kampuni yenye mpangilio wazi wa huduma, muundo wa HTML5 unaofaa SEO ya Google, na njia za haraka za mawasiliano kupitia WhatsApp na fomu.',
      deliverables: [
        'Muundo wa Tovuti ya Kampuni',
        'Onyesho la Huduma na Fomu ya Maswali',
        'Msingi wa SEO ya Kiufundi',
        'Muunganisho wa Moja kwa Moja wa WhatsApp',
      ],
    },
  },
  {
    id: 'nyati-autospares',
    slug: 'nyati-autospares',
    name: 'Nyati AutoSpares',
    category: 'ecommerce',
    image: '/images/portfolio_partplex_autospares_1794830654312.jpg',
    liveUrl: 'https://www.nyati.co.ke/',
    technologies: ['Responsive Storefront UI', 'PHP / Web Backend', 'JavaScript', 'Product Indexing', 'WhatsApp Integration'],
    servicePath: '/ecommerce-website-development',
    en: {
      industry: 'Automotive E-Commerce',
      serviceLabel: 'E-Commerce Website Development',
      locationContext: 'Kenya',
      shortDescription:
        'An organized digital spare parts catalog and storefront engineered for fast part discovery, vehicle category browsing, and direct order inquiries.',
      overview:
        'Structured around high-clarity product indexing, mobile-friendly part filtering, and streamlined WhatsApp and checkout inquiry workflows for automotive buyers.',
      challenge:
        'Automotive buyers searching on mobile phones often struggle with cluttered parts lists and slow quote responses when checking spare part compatibility and stock.',
      solution:
        'Engineered a categorized spare-parts storefront optimized for mobile browsing, clean category and component discovery, and one-tap WhatsApp order inquiries so buyers reach the parts desk immediately.',
      deliverables: [
        'Digital Spare Parts Catalog',
        'Category & Component Filtering',
        'Mobile-First Storefront UI',
        'WhatsApp Part Inquiry Flow',
      ],
    },
    sw: {
      industry: 'Biashara Mtandaoni ya Vipuri vya Magari',
      serviceLabel: 'Ujenzi wa Duka Mtandaoni',
      locationContext: 'Kenya',
      shortDescription:
        'Katalogi ya kidijitali ya vipuri vya magari iliyoundwa kurahisisha utafutaji wa haraka wa vipuri, uchujaji kwa aina ya gari, na maagizo ya moja kwa moja.',
      overview:
        'Imeundwa kwa mpangilio wa bidhaa ulio wazi, uchujaji rahisi kwenye simu, na njia ya haraka ya kuagiza au kuuliza kupitia WhatsApp.',
      challenge:
        'Wanunuzi wa vipuri vya magari mara nyingi hupata ugumu kwenye orodha zisizo na mpangilio mzuri na huchelewa kupata majibu kuhusu upatikanaji wa vipuri.',
      solution:
        'Tulitengeneza katalogi na duka la kidijitali linaloruhusu uchujaji wa haraka kwa kategoria za vipuri na mawasiliano ya papo hapo kwa WhatsApp.',
      deliverables: [
        'Katalogi ya Kidijitali ya Vipuri',
        'Uchujaji kwa Aina na Sehemu',
        'Muundo Unaofanya Kazi Kwenye Simu',
        'Mfumo wa Kuulizia Vipuri kwa WhatsApp',
      ],
    },
  },
  {
    id: 'lenanns-healthcare',
    slug: 'lenanns-healthcare',
    name: 'Lenanns Healthcare',
    category: 'healthcare',
    image: '/images/portfolio_lennanns_healthcare_1794830654935.jpg',
    liveUrl: 'https://lenannshealthcare.com/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Accessible Mobile UI', 'Appointment Inquiry Workflow'],
    servicePath: '/solutions/healthcare-websites',
    en: {
      industry: 'Healthcare & Medical Services',
      serviceLabel: 'Healthcare Website Design',
      locationContext: 'Kenya',
      shortDescription:
        'A calm, patient-centered healthcare website featuring clear service directories, clinic accessibility information, and online appointment inquiry workflows.',
      overview:
        'Designed to establish immediate patient trust through accessible typography, intuitive mobile navigation, and friction-free consultation scheduling.',
      challenge:
        'Patients searching for healthcare services need readable medical service descriptions, clear contact paths, and trustworthy presentation without confusing jargon or mobile layout issues.',
      solution:
        'Crafted a clean, accessible patient-first web platform presenting clinical services clearly, pairing legible typography with mobile-friendly appointment request and phone/WhatsApp links.',
      deliverables: [
        'Patient-Focused Web Experience',
        'Medical Services Directory',
        'Appointment Request Integration',
        'Accessible Mobile Interface',
      ],
    },
    sw: {
      industry: 'Afya na Huduma za Matibabu',
      serviceLabel: 'Tovuti ya Huduma za Afya',
      locationContext: 'Kenya',
      shortDescription:
        'Tovuti tulivu inayomlenga mgonjwa ikiwa na orodha wazi ya huduma za kiafya, maelezo ya kliniki, na mfumo rahisi wa kuweka miadi mtandaoni.',
      overview:
        'Imeundwa kujenga uaminifu wa haraka kwa wagonjwa kupitia maandishi yanayosomeka kwa urahisi, urambazaji mwepesi wa simu, na uhifadhi wa miadi bila usumbufu.',
      challenge:
        'Wagonjwa wanaotafuta huduma za afya wanahitaji maelezo yanayoeleweka kwa urahisi na njia ya haraka ya kuomba miadi kwenye simu zao.',
      solution:
        'Tulibuni tovuti safi na tulivu inayoorodhesha huduma za matibabu kwa uwazi na kuruhusu maombi ya miadi moja kwa moja mtandaoni.',
      deliverables: [
        'Uzoefu wa Tovuti Unaomlenga Mgonjwa',
        'Orodha ya Huduma za Matibabu',
        'Mfumo wa Kuomba Miadi',
        'Muundo Mwepesi Kwenye Simu',
      ],
    },
  },
  {
    id: 'makuri-auctioneers',
    slug: 'makuri-auctioneers',
    name: 'Makuri Auctioneers',
    category: 'legal',
    image: '/assets/aistudio/screencapture-makuriauctioneers-2026-11-17-13_23_10_69e597c8.png',
    imageFit: 'cover-top',
    liveUrl: 'https://makuriauctioneers.com/',
    technologies: ['Responsive Web Architecture', 'HTML5', 'CSS3', 'JavaScript', 'Structured Listing Layouts'],
    servicePath: '/solutions/law-firm-websites',
    en: {
      industry: 'Auctioneering & Asset Valuation',
      serviceLabel: 'Statutory & Corporate Web Platform',
      locationContext: 'Kenya',
      shortDescription:
        'An authoritative digital platform built to present upcoming auction notices, asset listings, statutory services, and direct bidder/client inquiries.',
      overview:
        'Engineered for high-clarity presentation of auction schedules, asset categories, and corporate services with fast loading across desktop and mobile devices.',
      challenge:
        'Auctioneers and statutory service firms require clear documentation, rapid notice browsing, and strong institutional credibility for both corporate clients and public bidders.',
      solution:
        'Built an authoritative layout structured around statutory services, clear auction notice categories, mobile-readable property/asset views, and direct client consultation pathways.',
      deliverables: [
        'Auction Notice & Asset Showcase',
        'Corporate Services Architecture',
        'Responsive Document & Listing Views',
        'Direct Consultation Pathways',
      ],
    },
    sw: {
      industry: 'Mnada na Uthamini wa Mali',
      serviceLabel: 'Jukwaa la Kisheria na Minada',
      locationContext: 'Kenya',
      shortDescription:
        'Jukwaa imara la kidijitali lililojengwa kuonyesha matangazo ya minada ijayo, orodha ya mali, huduma za kisheria, na mawasiliano ya wateja.',
      overview:
        'Limeundwa kwa uwazi wa hali ya juu katika kuonyesha ratiba za minada, aina za mali, na huduma za kampuni kwa kasi ya juu kwenye vifaa vyote.',
      challenge:
        'Makampuni ya minada na uthamini yanahitaji uwazi wa nyaraka, mwonekano mzuri wa matangazo, na uaminifu wa kitaasisi kwa wateja.',
      solution:
        'Tulijenga tovuti yenye mpangilio thabiti wa matangazo ya minada, huduma za kisheria, na mawasiliano ya moja kwa moja.',
      deliverables: [
        'Onyesho la Matangazo ya Minada na Mali',
        'Muundo wa Huduma za Kampuni',
        'Mwonekano Bora wa Orodha Kwenye Simu',
        'Njia za Moja kwa Moja za Ushauri',
      ],
    },
  },
  {
    id: 'mms-advocates',
    slug: 'mms-advocates',
    name: 'MMS Advocates',
    category: 'legal',
    image: '/images/portfolio_mms_advocates_1794830656231.jpg',
    liveUrl: '',
    technologies: ['Editorial Web Architecture', 'HTML5', 'CSS3', 'JavaScript', 'SEO Page Structure'],
    servicePath: '/solutions/law-firm-websites',
    en: {
      industry: 'Legal Practice & Advocacy',
      serviceLabel: 'Law Firm Website Design',
      locationContext: 'Kenya',
      shortDescription:
        'A refined law firm website crafted to present practice areas, advocate profiles, legal insights, and confidential client consultation requests.',
      overview:
        'Combines authoritative editorial layout with clear practice-area navigation, mobile responsiveness, and structured consultation capture for legal clients.',
      challenge:
        'Law firms need a restrained, authoritative online presence that communicates legal expertise and professionalism while making confidential consultation booking effortless.',
      solution:
        'Designed a structured editorial law firm architecture highlighting practice areas, advocate credentials, legal insights, and privacy-respecting consultation forms.',
      deliverables: [
        'Editorial Law Firm Web Design',
        'Practice Areas & Counsel Profiles',
        'Confidential Consultation Form',
        'Search-Ready Page Structure',
      ],
    },
    sw: {
      industry: 'Uwajili na Huduma za Kisheria',
      serviceLabel: 'Tovuti ya Kampuni ya Sheria',
      locationContext: 'Kenya',
      shortDescription:
        'Tovuti ya kifahari ya kampuni ya mawakili iliyoundwa kuonyesha nyanja za kisheria, wasifu wa mawakili, na maombi ya ushauri wa siri.',
      overview:
        'Inachanganya muundo wa heshima wa kisheria na urambazaji rahisi wa huduma za sheria, ufanisi kwenye simu, na fomu salama za ushauri.',
      challenge:
        'Makampuni ya mawakili yanahitaji tovuti yenye heshima na utulivu inayoonyesha weledi wao na kurahisisha maombi ya ushauri wa siri.',
      solution:
        'Tulibuni muundo wa kisheria wenye kurasa za huduma, wasifu wa mawakili, na fomu salama ya kuweka miadi ya ushauri.',
      deliverables: [
        'Muundo wa Tovuti ya Kampuni ya Sheria',
        'Nyanja za Kisheria na Wasifu wa Mawakili',
        'Fomu ya Maombi ya Ushauri wa Siri',
        'Mpangilio Bora kwa Injini za Utafutaji',
      ],
    },
  },
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}
