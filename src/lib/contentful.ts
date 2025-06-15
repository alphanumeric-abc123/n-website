import { createClient, type Entry, type EntrySkeletonType } from 'contentful';
import type { 
  ContentfulEntry, 
  HomePage, 
  ProductPage, 
  CorporatePage,
  SiteNavigation,
  HomePageSkeleton,
  ProductPageSkeleton,
  CorporatePageSkeleton,
  SiteNavigationSkeleton,
  ResourcePageSkeleton,
  CalculatorSkeleton,
  SiteSettingsSkeleton,
  ArticleSkeleton
} from '@/types/contentful';

// Contentful client configuration
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Generic function to fetch entries by content type
export async function getEntries<T extends EntrySkeletonType>(contentType: string, limit?: number): Promise<Entry<T, undefined, string>[]> {
  try {
    const response = await client.getEntries<T>({
      content_type: contentType,
      limit: limit || 100,
    });
    return response.items;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

// Generic function to fetch a single entry by ID
export async function getEntry<T extends EntrySkeletonType>(entryId: string): Promise<Entry<T, undefined, string> | null> {
  try {
    const entry = await client.getEntry<T>(entryId);
    return entry;
  } catch (error) {
    console.error(`Error fetching entry ${entryId}:`, error);
    return null;
  }
}

// Specific content fetchers
export async function getHomePage(): Promise<Entry<HomePageSkeleton, undefined, string> | null> {
  try {
    const entries = await getEntries<HomePageSkeleton>('homePage', 1);
    return entries[0] || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

export async function getProductPages(): Promise<Entry<ProductPageSkeleton, undefined, string>[]> {
  return getEntries<ProductPageSkeleton>('productPage');
}

export async function getProductPageBySlug(slug: string): Promise<Entry<ProductPageSkeleton, undefined, string> | null> {
  try {
    const response = await client.getEntries<ProductPageSkeleton>({
      content_type: 'productPage',
      'fields.slug': slug,
      limit: 1,
    } as any);
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching product page with slug ${slug}:`, error);
    return null;
  }
}

export async function getCorporatePages(): Promise<Entry<CorporatePageSkeleton, undefined, string>[]> {
  return getEntries<CorporatePageSkeleton>('corporatePage');
}

export async function getCorporatePageBySlug(slug: string): Promise<Entry<CorporatePageSkeleton, undefined, string> | null> {
  try {
    const response = await client.getEntries<CorporatePageSkeleton>({
      content_type: 'corporatePage',
      'fields.slug': slug,
      limit: 1,
    } as any);
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching corporate page with slug ${slug}:`, error);
    return null;
  }
}

export async function getSiteNavigation(): Promise<Entry<SiteNavigationSkeleton, undefined, string> | null> {
  try {
    const entries = await getEntries<SiteNavigationSkeleton>('siteNavigation', 1);
    return entries[0] || null;
  } catch (error) {
    console.error('Error fetching site navigation:', error);
    return null;
  }
}

// Utility functions for Contentful assets
export function getAssetUrl(asset: any): string {
  if (!asset?.fields?.file?.url) return '';
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

export function getOptimizedImageUrl(
  asset: any, 
  width?: number, 
  height?: number, 
  format?: 'jpg' | 'png' | 'webp'
): string {
  const baseUrl = getAssetUrl(asset);
  if (!baseUrl) return '';
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (format) params.append('fm', format);
  params.append('fit', 'fill');
  params.append('q', '80');
  
  return `${baseUrl}?${params.toString()}`;
}

// Rich text content helpers
export function extractPlainText(richTextContent: any): string {
  if (!richTextContent?.content) return '';
  
  let text = '';
  const extractText = (node: any) => {
    if (node.nodeType === 'text') {
      text += node.value;
    } else if (node.content) {
      node.content.forEach(extractText);
    }
  };
  
  richTextContent.content.forEach(extractText);
  return text.trim();
}

// Preview mode helpers (for draft content)
export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || '',
  host: 'preview.contentful.com',
});

export async function getPreviewEntry<T extends EntrySkeletonType>(entryId: string): Promise<Entry<T, undefined, string> | null> {
  try {
    const entry = await previewClient.getEntry<T>(entryId);
    return entry;
  } catch (error) {
    console.error(`Error fetching preview entry ${entryId}:`, error);
    return null;
  }
}

// Static generation helpers
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const products = await getProductPages();
    return products.map(product => product.fields.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching product slugs:', error);
    return [];
  }
}

export async function getAllCorporateSlugs(): Promise<string[]> {
  try {
    const pages = await getCorporatePages();
    return pages.map(page => page.fields.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching corporate page slugs:', error);
    return [];
  }
}

// Transform functions to convert Contentful entries to component props
export function transformHomePage(entry: Entry<HomePageSkeleton, undefined, string>): HomePage {
  return {
    title: entry.fields.title || '',
    heroHeadline: entry.fields.heroHeadline || '',
    heroSubtext: entry.fields.heroSubtext || '',
    heroImage: entry.fields.heroImage as any,
    heroCtaText: entry.fields.heroCtaText || 'Get Started',
    heroCtaLink: entry.fields.heroCtaLink || '#',
    productOverview: (entry.fields.productOverview as any[]) || [],
    trustIndicators: (entry.fields.trustIndicators as any[]) || [],
    ctaSection: (entry.fields.ctaSection as any) || {
      headline: '',
      description: '',
      primaryCtaText: '',
      primaryCtaLink: ''
    },
    seoTitle: entry.fields.seoTitle || '',
    seoDescription: entry.fields.seoDescription || '',
    seoKeywords: entry.fields.seoKeywords || '',
  };
}

export function transformProductPage(entry: Entry<ProductPageSkeleton, undefined, string>): ProductPage {
  return {
    title: entry.fields.title || '',
    slug: entry.fields.slug || '',
    productType: entry.fields.productType || 'upi',
    heroSection: (entry.fields.heroSection as any) || {
      headline: '',
      subtext: '',
      backgroundImage: null,
      ctaText: '',
      ctaLink: '',
      ctaType: 'primary' as const,
      alignment: 'left' as const
    },
    productDescription: entry.fields.productDescription || '',
    keyFeatures: (entry.fields.keyFeatures as any[]) || [],
    eligibilityCriteria: (entry.fields.eligibilityCriteria as any) || {
      minAge: 18,
      maxAge: 65,
      minIncome: 0,
      employmentType: [],
      creditScore: 0,
      additionalCriteria: []
    },
    interestRates: (entry.fields.interestRates as any) || undefined,
    loanAmounts: (entry.fields.loanAmounts as any) || undefined,
    tenureOptions: (entry.fields.tenureOptions as any[]) || undefined,
    calculator: (entry.fields.calculator as any) || undefined,
    applicationProcess: (entry.fields.applicationProcess as any[]) || [],
    documentsRequired: (entry.fields.documentsRequired as any[]) || [],
    faqs: (entry.fields.faqs as any[]) || [],
    relatedProducts: (entry.fields.relatedProducts as any[]) || [],
    seoTitle: entry.fields.seoTitle || '',
    seoDescription: entry.fields.seoDescription || '',
    seoKeywords: entry.fields.seoKeywords || '',
  };
}

export function transformCorporatePage(entry: Entry<CorporatePageSkeleton, undefined, string>): CorporatePage {
  return {
    title: entry.fields.title || '',
    slug: entry.fields.slug || '',
    pageType: entry.fields.pageType || 'about-us',
    heroSection: (entry.fields.heroSection as any) || undefined,
    content: (entry.fields.content as any) || { nodeType: 'document', content: [] },
    sections: (entry.fields.sections as any[]) || [],
    teamMembers: (entry.fields.teamMembers as unknown as any[]) || undefined,
    companyStats: (entry.fields.companyStats as unknown as any[]) || undefined,
    timeline: (entry.fields.timeline as unknown as any[]) || undefined,
    seoTitle: entry.fields.seoTitle || '',
    seoDescription: entry.fields.seoDescription || '',
    seoKeywords: entry.fields.seoKeywords || '',
  };
}

export function transformSiteNavigation(entry: Entry<SiteNavigationSkeleton, undefined, string>): SiteNavigation {
  return {
    mainNavigation: entry.fields.mainNavigation as any,
    footerNavigation: entry.fields.footerNavigation as any,
  };
}
