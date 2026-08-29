export interface NavItem {
  label: string;
  href: string;
}

export interface QuickPillar {
  title: string;
  description: string;
  iconName: string;
  isPolygon?: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface OperatingModelService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  theme: string;
}

export interface TrustBadgeItem {
  title: string;
  subtitle: string;
  iconName: string;
}

export interface VisionMissionItem {
  kicker: string;
  title: string;
  description: string;
  iconName: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  quote: string;
  avatarSeed: string;
  bioParagraphs: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

export interface ServiceCategory {
  number: string;
  title: string;
  items: string[];
  isHighlighted?: boolean;
}

export interface DigitalProductionService {
  number: string;
  title: string;
  items: string[];
  isHighlighted?: boolean;
}

export interface PortfolioItem {
  title: string;
  client: string;
  category: string;
  description: string;
}
