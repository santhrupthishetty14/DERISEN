import {
  NavItem,
  QuickPillar,
  StatItem,
  OperatingModelService,
  TrustBadgeItem,
  VisionMissionItem,
  LeaderProfile,
  ProcessStep,
  ServiceCategory,
  DigitalProductionService,
  PortfolioItem
} from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services & Packages', href: '#services-packages' },
  { label: 'Work Process', href: '#work-process' },
  { label: 'Work Gallery & Testimonial', href: '#work-gallery' },
  { label: 'Contact Us', href: '#contact' },
];

export const QUICK_PILLARS: QuickPillar[] = [
  {
    title: 'Creative Design',
    description: 'Unique and engaging designs that bring your ideas to life.',
    iconName: 'PenTool',
  },
  {
    title: 'Branding',
    description: 'Build a strong brand identity that connects and inspires trust.',
    iconName: 'Tag',
    isPolygon: true,
  },
  {
    title: 'Digital Marketing',
    description: 'Result-driven marketing strategies that grow your brand online.',
    iconName: 'Megaphone',
  },
  {
    title: 'IT Solutions',
    description: 'Reliable and scalable IT solutions to power your business.',
    iconName: 'Code',
    isPolygon: true,
  },
];

export const STATS_DATA: StatItem[] = [
  { value: 96, suffix: '+', label: 'PROJECT COMPLETED', iconName: 'Rocket' },
  { value: 51, suffix: '+', label: 'HAPPY CLIENT', iconName: 'Users' },
  { value: 2, suffix: '+', label: 'YEARS OF EXPERIENCE', iconName: 'Briefcase' },
  { value: 100, suffix: '%', label: 'CLIENT SATISFACTION', iconName: 'ThumbsUp' },
];

export const OPERATING_MODEL_SERVICES: OperatingModelService[] = [
  {
    id: 'creative-design',
    title: 'CREATIVE DESIGN',
    tagline: 'Design That Captures Attention.',
    description: 'We bring your vision to life through high-impact visual assets. Whether it is premium logo design, corporate brochures, posters, or custom packaging, we deliver aesthetic precision that ensures your brand shines.',
    iconName: 'PenTool',
    theme: 'indigo'
  },
  {
    id: 'branding',
    title: 'BRANDING',
    tagline: 'Build a Brand People Remember.',
    description: 'We are your dedicated brand storytellers. We build identity, trust, and long-term growth by crafting a cohesive brand voice and strategy that transforms concepts into compelling, unforgettable realities.',
    iconName: 'Tag',
    theme: 'violet'
  },
  {
    id: 'digital-marketing',
    title: 'DIGITAL MARKETING',
    tagline: 'Turn Visibility Into Growth.',
    description: 'Drive visibility and acquire leads with our data-driven approach. We specialize in SEO, targeted ad campaigns, and social media strategy, helping you convert followers into loyal customers with measurable impact.',
    iconName: 'Megaphone',
    theme: 'dark'
  },
  {
    id: 'it-solutions',
    title: 'IT SOLUTIONS',
    tagline: 'Smart Technology. Seamless Experiences.',
    description: 'We build professional, responsive, and SEO-friendly websites that keep your business accessible 24/7. Our development focus is on speed, high-performance UI/UX, and providing a seamless digital presence.',
    iconName: 'Code',
    theme: 'purple'
  },
];

export const TRUST_BADGES: TrustBadgeItem[] = [
  { title: 'STRATEGY DRIVEN', subtitle: 'Purposeful. Focused. Results.', iconName: 'Target' },
  { title: 'CLIENT CENTRIC', subtitle: 'Your Growth. Our Priority.', iconName: 'Users' },
  { title: 'DATA BACKED', subtitle: 'Insights That Drive Impact.', iconName: 'BarChart' },
  { title: 'QUALITY ASSURED', subtitle: 'Excellence In Everything We Do.', iconName: 'ShieldCheck' },
];

export const VISION_MISSION_DATA: VisionMissionItem[] = [
  {
    kicker: 'OUR VISION',
    title: 'Creating Brands That Shape the Future',
    description: 'At DE.RISEN, our vision is to become a trusted global creative and digital transformation partner, empowering businesses through innovation, strategy, and technology. We aspire to build iconic brands, deliver exceptional digital experiences, and inspire sustainable growth by transforming bold ideas into lasting success stories.',
    iconName: 'Compass',
  },
  {
    kicker: 'OUR MISSION',
    title: 'Transforming Ideas into Meaningful Success',
    description: 'Our mission is to help businesses unlock their full potential through world-class creative design, strategic branding, performance-driven digital marketing, and innovative IT solutions. By combining creativity with technology, we create impactful experiences, build strong brand identities, and deliver measurable results that drive long-term business growth.',
    iconName: 'Flag',
  },
  {
    kicker: 'OUR GOAL',
    title: 'Empowering Businesses to Grow Without Limits',
    description: 'Our goal is to become a one-stop destination for businesses seeking creative excellence and digital innovation. We are committed to delivering customized solutions, fostering lasting partnerships, and helping brands achieve greater visibility, stronger customer engagement, and sustainable success in an ever-evolving digital world.',
    iconName: 'Target',
  },
];

export const LEADERS: LeaderProfile[] = [
  {
    name: 'Shweta Deharkar',
    role: 'Founder & Chief Executive Officer (CEO)',
    quote: '“Creativity is not just what we do—it is the foundation of everything we build.”',
    avatarSeed: 'shweta',
    bioParagraphs: [
      'Shweta Deharkar is the visionary Founder and CEO of DE.RISEN, leading the company with a passion for creativity, innovation, and business excellence. She established DE.RISEN with a clear mission—to help businesses transform bold ideas into powerful brands and meaningful digital experiences.',
      'She holds a Bachelor of Visual Arts (BVA) in Animation & Multimedia Design, has completed her MBA in Marketing, and is certified in Artificial Intelligence, bringing together creative expertise, strategic business knowledge, and emerging technologies to deliver impactful solutions.',
      'With 4+ years of professional experience, Shweta has worked across healthcare, retail, education, real estate, corporate, manufacturing, hospitality, and other diverse industries, successfully delivering innovative branding, creative design, digital marketing, and technology-driven solutions.',
      'Recognized with the Best Graphic Designer Trainer Award, she has successfully delivered 96+ creative projects, helping startups, SMEs, and established enterprises strengthen their market presence through strategic creativity and innovation.'
    ]
  },
  {
    name: 'Lejai Jayakumar',
    role: 'Managing Director & Co-Founder',
    quote: '“Building businesses is about creating value, empowering people, and driving sustainable growth.”',
    avatarSeed: 'lejai',
    bioParagraphs: [
      'Lejai Jayakumar is the Managing Director and Co-Founder of DE.RISEN, leading the company\'s business strategy, operations, and growth initiatives. With extensive experience in consulting, operations management, and business development, he plays a key role in delivering innovative solutions and building long-term client relationships.',
      'As Director of Finizon Consulting Pvt. Ltd., Lejay has contributed to consulting projects across export businesses, real estate, and property development. He also brings nearly five years of operational leadership experience from Sanama Solution, where he managed budgeting, business operations, and organizational efficiency.',
      'Beyond his corporate responsibilities, Lejai serves as the State IT & Social Media Head of Akhil Bharat Hindu Mahasabha, leading digital initiatives and communication strategies.',
      'At DE.RISEN, he is committed to driving innovation, operational excellence, and sustainable business growth while helping clients transform ideas into impactful brands.'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'Understand business, goals, industry and audience.' },
  { number: '02', title: 'Strategize', description: 'Create a roadmap aligned with objectives and opportunities.' },
  { number: '03', title: 'Design & Create', description: 'Transform ideas into identities, visuals, content and experiences.', isHighlighted: true },
  { number: '04', title: 'Develop & Execute', description: 'Bring concepts to life with quality, precision and performance.' },
  { number: '05', title: 'Launch & Amplify', description: 'Maximize visibility, engagement and market reach.' },
  { number: '06', title: 'Analyze & Optimize', description: 'Measure, learn and continuously improve for sustainable growth.' },
];

export const WORKFLOW_PIPELINE = [
  { step: '1', name: 'Discover' },
  { step: '2', name: 'Strategize' },
  { step: '3', name: 'Create' },
  { step: '4', name: 'Develop' },
  { step: '5', name: 'Launch' },
  { step: '6', name: 'Grow' },
];

export const INDIVIDUAL_SERVICES_CATALOG: ServiceCategory[] = [
  {
    number: '01',
    title: 'Brand Identity',
    items: [
      'Logo Design',
      'Brand Identity Design',
      'Brand Guidelines',
      'Logo Redesign',
      'Brand Strategy'
    ]
  },
  {
    number: '02',
    title: 'Graphic Design',
    isHighlighted: true,
    items: [
      'Social Media Creatives',
      'Instagram Carousel Posts',
      'Poster Design',
      'Flyer Design',
      'Brochure Design',
      'Company Profile',
      'Catalogue Design',
      'Menu Design',
      'Certificate Design',
      'Invitation Design',
      'PPT Design',
      'Infographics'
    ]
  },
  {
    number: '03',
    title: 'Print & Marketing',
    items: [
      'Business Cards',
      'Letterheads',
      'Envelopes',
      'ID Cards',
      'Packaging Design',
      'Label Design',
      'Roll-up Banners',
      'Hoardings & Billboards',
      'Vehicle Branding',
      'Exhibition Stall Graphics',
      'All type of print media'
    ]
  },
  {
    number: '04',
    title: 'Digital Design',
    items: [
      'Website UI Design',
      'Landing Page Design',
      'Mobile App UI/UX',
      'Website Banners',
      'Email Templates',
      'Web Graphics'
    ]
  }
];

export const DIGITAL_PRODUCTION_SERVICES: DigitalProductionService[] = [
  {
    number: '05',
    title: 'Motion & Video',
    items: [
      'Motion Graphics',
      'Video Editing',
      'Reels & Shorts Editing',
      'Promotional Videos',
      'Corporate Videos',
      'YouTube Thumbnails',
      'YouTube Channel Branding'
    ]
  },
  {
    number: '06',
    title: 'Photography & Production',
    items: [
      'Product Photography',
      'Corporate Photography',
      'Event Photography',
      'Promotional Video Shoots',
      'Commercial Video Production'
    ]
  },
  {
    number: '07',
    title: 'Digital Marketing',
    items: [
      'Social Media Management',
      'Content Strategy',
      'SEO Optimization',
      'Google Ads',
      'Meta Ads (Facebook & Instagram)',
      'Performance Marketing',
      'Email Marketing'
    ]
  },
  {
    number: '08',
    title: 'Website & IT Solutions',
    isHighlighted: true,
    items: [
      'Business Websites',
      'Corporate Websites',
      'E-commerce Websites',
      'Portfolio Websites',
      'Custom Web Applications',
      'Website Maintenance',
      'Domain & Hosting Support',
      'Technical Consultation'
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: 'Corporate Brand Identity & Guidelines',
    client: 'Finizon Consulting Pvt. Ltd.',
    category: 'Branding & Identity',
    description: 'Complete visual identity system, corporate stationery, guidelines and typography.'
  },
  {
    title: 'Full-Stack Scalable Web Platform',
    client: 'Sanama Solution',
    category: 'IT & Web Development',
    description: 'High-performance responsive portal with speed optimization and custom workflows.'
  },
  {
    title: 'Omnichannel Lead Generation Campaign',
    client: 'Fintech & Real Estate Enterprise',
    category: 'Digital Marketing',
    description: 'Targeted Google Ads & Meta Funnels generating 3.8x ROAS and continuous client leads.'
  },
  {
    title: '3D Product Animation & Social Motion',
    client: 'Global Lifestyle & Retail Brand',
    category: 'Motion & Video',
    description: 'High-definition 3D motion graphics, commercial reels, and promotional video shoots.'
  }
];
