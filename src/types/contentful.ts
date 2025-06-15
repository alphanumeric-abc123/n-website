// Contentful Content Types for Navi Website
// Based on PRD requirements for 10 core page templates

import type { EntrySkeletonType, Asset } from 'contentful';

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulEntry<T = any> {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
    createdAt: string;
    updatedAt: string;
  };
  fields: T;
}

// =============================================================================
// CONTENT MODEL SKELETONS - Based on PRD Information Architecture
// =============================================================================

// 1. Homepage Content Model
export interface HomePageSkeleton extends EntrySkeletonType {
  contentTypeId: 'homePage';
  fields: {
    title: string;
    heroHeadline: string;
    heroSubtext: string;
    heroImage: Asset;
    heroCtaText: string;
    heroCtaLink: string;
    productOverview: any[];
    trustIndicators: any[];
    ctaSection: any;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    publishedAt: string;
  };
}

// 2. Product Page Content Models
export interface ProductPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'productPage';
  fields: {
    title: string;
    slug: string;
    productType: 'upi' | 'cash-loan' | 'home-loan' | 'health-insurance' | 'mutual-funds';
    heroSection: any;
    productDescription: string;
    keyFeatures: any[];
    eligibilityCriteria: any;
    interestRates?: any;
    loanAmounts?: any;
    tenureOptions?: any;
    calculator?: any;
    applicationProcess: any[];
    documentsRequired: any[];
    faqs: any[];
    relatedProducts: any[];
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    publishedAt: string;
  };
}

// 3. Corporate Page Content Models
export interface CorporatePageSkeleton extends EntrySkeletonType {
  contentTypeId: 'corporatePage';
  fields: {
    title: string;
    slug: string;
    pageType: 'about-us' | 'why-navi' | 'careers' | 'governance';
    heroSection?: any;
    content: any;
    sections: any[];
    teamMembers?: any[];
    companyStats?: any[];
    timeline?: any[];
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    publishedAt: string;
  };
}

// 4. Resources Page Content Models
export interface ResourcePageSkeleton extends EntrySkeletonType {
  contentTypeId: 'resourcePage';
  fields: {
    title: string;
    slug: string;
    resourceType: 'calculators' | 'guides' | 'tools';
    description: string;
    resources: any[];
    categories: any[];
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    publishedAt: string;
  };
}

// 5. Calculator Content Model
export interface CalculatorSkeleton extends EntrySkeletonType {
  contentTypeId: 'calculator';
  fields: {
    title: string;
    slug: string;
    calculatorType: 'loan-emi' | 'insurance-premium' | 'investment-returns' | 'tax-savings';
    description: string;
    inputFields: any[];
    formula: string;
    disclaimer: string;
    relatedProducts: any[];
    seoTitle: string;
    seoDescription: string;
    publishedAt: string;
  };
}

// 6. Site Navigation Content Model
export interface SiteNavigationSkeleton extends EntrySkeletonType {
  contentTypeId: 'siteNavigation';
  fields: {
    mainNavigation: any[];
    footerNavigation: any;
    utilityNavigation: any[];
    socialLinks: any[];
    legalLinks: any[];
  };
}

// 7. Global Site Settings
export interface SiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: 'siteSettings';
  fields: {
    siteName: string;
    siteDescription: string;
    defaultSeoTitle: string;
    defaultSeoDescription: string;
    contactInfo: any;
    socialMediaLinks: any[];
    analyticsConfig: any;
    complianceInfo: any;
  };
}

// 8. Blog/Article Content Model (for future blog integration)
export interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: 'article';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: any;
    featuredImage: Asset;
    author: any;
    category: string;
    tags: string[];
    publishedAt: string;
    seoTitle: string;
    seoDescription: string;
  };
}

// =============================================================================
// COMPONENT CONTENT MODELS - Reusable Content Blocks
// =============================================================================

// Hero Section Component
export interface HeroSectionSkeleton extends EntrySkeletonType {
  contentTypeId: 'heroSection';
  fields: {
    headline: string;
    subtext: string;
    backgroundImage: Asset;
    ctaText: string;
    ctaLink: string;
    ctaType: 'primary' | 'secondary';
    alignment: 'left' | 'center' | 'right';
  };
}

// Feature Card Component
export interface FeatureCardSkeleton extends EntrySkeletonType {
  contentTypeId: 'featureCard';
  fields: {
    title: string;
    description: string;
    icon: Asset;
    link?: string;
    linkText?: string;
  };
}

// FAQ Component
export interface FaqSkeleton extends EntrySkeletonType {
  contentTypeId: 'faq';
  fields: {
    question: string;
    answer: any;
    category: string;
    order: number;
  };
}

// CTA Section Component
export interface CtaSectionSkeleton extends EntrySkeletonType {
  contentTypeId: 'ctaSection';
  fields: {
    headline: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: Asset;
    backgroundColor?: string;
  };
}

// =============================================================================
// TYPESCRIPT INTERFACES FOR COMPONENT PROPS
// =============================================================================

export interface HomePage {
  title: string;
  heroHeadline: string;
  heroSubtext: string;
  heroImage: ContentfulAsset;
  heroCtaText: string;
  heroCtaLink: string;
  productOverview: ProductCard[];
  trustIndicators: TrustIndicator[];
  ctaSection: CTASection;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface ProductPage {
  title: string;
  slug: string;
  productType: 'upi' | 'cash-loan' | 'home-loan' | 'health-insurance' | 'mutual-funds';
  heroSection: HeroSection;
  productDescription: string;
  keyFeatures: Feature[];
  eligibilityCriteria: EligibilityCriteria;
  interestRates?: InterestRateInfo;
  loanAmounts?: LoanAmountInfo;
  tenureOptions?: TenureOption[];
  calculator?: Calculator;
  applicationProcess: ProcessStep[];
  documentsRequired: Document[];
  faqs: FAQ[];
  relatedProducts: RelatedProduct[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface CorporatePage {
  title: string;
  slug: string;
  pageType: 'about-us' | 'why-navi' | 'careers' | 'governance';
  heroSection?: HeroSection;
  content: RichTextContent;
  sections: ContentSection[];
  teamMembers?: TeamMember[];
  companyStats?: CompanyStat[];
  timeline?: TimelineEvent[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

// Supporting interfaces
export interface ProductCard {
  title: string;
  description: string;
  icon: ContentfulAsset;
  link: string;
  features: string[];
}

export interface TrustIndicator {
  metric: string;
  value: string;
  description: string;
}

export interface CTASection {
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: ContentfulAsset;
  backgroundColor?: string;
}

export interface HeroSection {
  headline: string;
  subtext: string;
  backgroundImage: ContentfulAsset;
  ctaText: string;
  ctaLink: string;
  ctaType: 'primary' | 'secondary';
  alignment: 'left' | 'center' | 'right';
}

export interface Feature {
  title: string;
  description: string;
  icon: ContentfulAsset;
  link?: string;
  linkText?: string;
}

export interface EligibilityCriteria {
  minAge: number;
  maxAge: number;
  minIncome: number;
  employmentType: string[];
  creditScore: number;
  additionalCriteria: string[];
}

export interface InterestRateInfo {
  minRate: number;
  maxRate: number;
  rateType: 'fixed' | 'floating' | 'both';
  factors: string[];
}

export interface LoanAmountInfo {
  minAmount: number;
  maxAmount: number;
  currency: string;
}

export interface TenureOption {
  minTenure: number;
  maxTenure: number;
  unit: 'months' | 'years';
}

export interface Calculator {
  type: 'loan-emi' | 'insurance-premium' | 'investment-returns';
  title: string;
  description: string;
  inputFields: CalculatorField[];
  formula: string;
  disclaimer: string;
}

export interface CalculatorField {
  name: string;
  label: string;
  type: 'number' | 'select' | 'range';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  defaultValue?: string | number;
  required: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: ContentfulAsset;
  estimatedTime?: string;
}

export interface Document {
  name: string;
  description: string;
  required: boolean;
  category: string;
}

export interface FAQ {
  question: string;
  answer: RichTextContent;
  category: string;
  order: number;
}

export interface RelatedProduct {
  title: string;
  description: string;
  link: string;
  image: ContentfulAsset;
}

export interface RichTextContent {
  nodeType: string;
  content: any[];
}

export interface ContentSection {
  title: string;
  content: RichTextContent;
  layout: 'full-width' | 'two-column' | 'three-column';
  backgroundColor?: string;
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: ContentfulAsset;
  linkedIn?: string;
  twitter?: string;
}

export interface CompanyStat {
  metric: string;
  value: string;
  description: string;
  icon?: ContentfulAsset;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: ContentfulAsset;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  url: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface SiteNavigation {
  mainNavigation: NavigationItem[];
  footerNavigation: {
    products: NavigationItem[];
    company: NavigationItem[];
    resources: NavigationItem[];
    legal: NavigationItem[];
  };
}

// SEO and Analytics Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: ContentfulAsset;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Global window type declarations
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, any> }
    ) => void;
  }
}
