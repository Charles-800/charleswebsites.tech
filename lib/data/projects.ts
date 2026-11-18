export type ProjectCategory = 'corporate' | 'ecommerce' | 'healthcare' | 'legal';

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  image: string;
  imageFit?: 'cover' | 'contain' | 'cover-top';
  liveUrl: string; // Populate with real client URL when supplied
  en: {
    industry: string;
    shortDescription: string;
    overview: string;
    deliverables: string[];
  };
  sw: {
    industry: string;
    shortDescription: string;
    overview: string;
    deliverables: string[];
  };
}

/**
 * Editable portfolio entries for Charles Websites.
 * Update `liveUrl` and `image` as verified client URLs and screenshots are supplied.
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
    en: {
      industry: 'Corporate & Business Solutions',
      shortDescription:
        'A structured corporate web platform designed to communicate enterprise credibility, showcase core service divisions, and streamline direct client inquiries.',
      overview:
        'Built with clean architectural typography, responsive desktop-to-mobile layouts, and clear conversion pathways connecting prospective partners directly with the Ruevan Limited team.',
      deliverables: [
        'Responsive Corporate Web Architecture',
        'Service Showcase & Inquiry Funnel',
        'Technical SEO Foundation',
        'WhatsApp Direct Lead Integration',
      ],
    },
    sw: {
      industry: 'Biashara na Suluhu za Makampuni',
      shortDescription:
        'Jukwaa la kitaalamu la wavuti lililoundwa kuonyesha uaminifu wa kampuni, huduma kuu, na kurahisisha mawasiliano ya moja kwa moja na wateja.',
      overview:
        'Limejengwa kwa muundo safi wa kisasa, linalofanya kazi kwa urahisi kwenye kompyuta na simu, na njia wazi za kuunganisha wateja na timu ya Ruevan Limited.',
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
    en: {
      industry: 'Automotive E-Commerce',
      shortDescription:
        'An organized digital spare parts catalog and storefront engineered for fast part discovery, vehicle category browsing, and direct order inquiries.',
      overview:
        'Structured around high-clarity product indexing, mobile-friendly part filtering, and streamlined WhatsApp and checkout inquiry workflows for automotive buyers.',
      deliverables: [
        'Digital Spare Parts Catalog',
        'Category & Component Filtering',
        'Mobile-First Storefront UI',
        'WhatsApp Part Inquiry Flow',
      ],
    },
    sw: {
      industry: 'Biashara Mtandaoni ya Vipuri vya Magari',
      shortDescription:
        'Katalogi ya kidijitali ya vipuri vya magari iliyoundwa kurahisisha utafutaji wa haraka wa vipuri, uchujaji kwa aina ya gari, na maagizo ya moja kwa moja.',
      overview:
        'Imeundwa kwa mpangilio wa bidhaa ulio wazi, uchujaji rahisi kwenye simu, na njia ya haraka ya kuagiza au kuuliza kupitia WhatsApp.',
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
    en: {
      industry: 'Healthcare & Medical Services',
      shortDescription:
        'A calm, patient-centered healthcare website featuring clear service directories, clinic accessibility information, and online appointment inquiry workflows.',
      overview:
        'Designed to establish immediate patient trust through accessible typography, intuitive mobile navigation, and friction-free consultation scheduling.',
      deliverables: [
        'Patient-Focused Web Experience',
        'Medical Services Directory',
        'Appointment Request Integration',
        'Accessible Mobile Interface',
      ],
    },
    sw: {
      industry: 'Afya na Huduma za Matibabu',
      shortDescription:
        'Tovuti tulivu inayomlenga mgonjwa ikiwa na orodha wazi ya huduma za kiafya, maelezo ya kliniki, na mfumo rahisi wa kuweka miadi mtandaoni.',
      overview:
        'Imeundwa kujenga uaminifu wa haraka kwa wagonjwa kupitia maandishi yanayosomeka kwa urahisi, urambazaji mwepesi wa simu, na uhifadhi wa miadi bila usumbufu.',
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
    en: {
      industry: 'Auctioneering & Asset Valuation',
      shortDescription:
        'An authoritative digital platform built to present upcoming auction notices, asset listings, statutory services, and direct bidder/client inquiries.',
      overview:
        'Engineered for high-clarity presentation of auction schedules, asset categories, and corporate services with fast loading across desktop and mobile devices.',
      deliverables: [
        'Auction Notice & Asset Showcase',
        'Corporate Services Architecture',
        'Responsive Document & Listing Views',
        'Direct Consultation Pathways',
      ],
    },
    sw: {
      industry: 'Mnada na Uthamini wa Mali',
      shortDescription:
        'Jukwaa imara la kidijitali lililojengwa kuonyesha matangazo ya minada ijayo, orodha ya mali, huduma za kisheria, na mawasiliano ya wateja.',
      overview:
        'Limeundwa kwa uwazi wa hali ya juu katika kuonyesha ratiba za minada, aina za mali, na huduma za kampuni kwa kasi ya juu kwenye vifaa vyote.',
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
    en: {
      industry: 'Legal Practice & Advocacy',
      shortDescription:
        'A refined law firm website crafted to present practice areas, advocate profiles, legal insights, and confidential client consultation requests.',
      overview:
        'Combines authoritative editorial layout with clear practice-area navigation, mobile responsiveness, and structured consultation capture for legal clients.',
      deliverables: [
        'Editorial Law Firm Web Design',
        'Practice Areas & Counsel Profiles',
        'Confidential Consultation Form',
        'Search-Ready Page Structure',
      ],
    },
    sw: {
      industry: 'Uwajili na Huduma za Kisheria',
      shortDescription:
        'Tovuti ya kifahari ya kampuni ya mawakili iliyoundwa kuonyesha nyanja za kisheria, wasifu wa mawakili, na maombi ya ushauri wa siri.',
      overview:
        'Inachanganya muundo wa heshima wa kisheria na urambazaji rahisi wa huduma za sheria, ufanisi kwenye simu, na fomu salama za ushauri.',
      deliverables: [
        'Muundo wa Tovuti ya Kampuni ya Sheria',
        'Nyanja za Kisheria na Wasifu wa Mawakili',
        'Fomu ya Maombi ya Ushauri wa Siri',
        'Mpangilio Bora kwa Injini za Utafutaji',
      ],
    },
  },
];
