/**
 * TypeScript declarations for custom window properties used in tests
 */

// Define the ContentfulUtils interface based on the mock implementation
interface ContentfulUtils {
  // Generic functions
  getEntries(contentType: string, limit?: number): Promise<any[]>;
  getEntry(entryId: string): Promise<any | null>;
  
  // Specific content fetchers
  getHomePage(): Promise<any | null>;
  getProductPages(): Promise<any[]>;
  getProductPageBySlug(slug: string): Promise<any | null>;
  getCorporatePages(): Promise<any[]>;
  getCorporatePageBySlug(slug: string): Promise<any | null>;
  getSiteNavigation(): Promise<any | null>;
  
  // Asset utilities
  getAssetUrl(asset: any): string;
  getOptimizedImageUrl(asset: any, width?: number, height?: number, format?: string): string;
  extractTextFromRichText(richTextContent: any): string;
  extractPlainText(richTextContent: any): string;
  
  // Static generation helpers
  getAllProductSlugs(): Promise<string[]>;
  getAllCorporateSlugs(): Promise<string[]>;
  
  // Transform functions
  transformHomePage(entry: any): any;
  transformProductPage(entry: any): any;
  transformCorporatePage(entry: any): any;
  transformSiteNavigation(entry: any): any;
  
  // Mock asset for testing
  mockAsset: any;
}

declare global {
  interface Window {
    clickCount: number;
    disabledClickCount: number;
    enterPressed: boolean;
    rapidClickCount: number;
    cardClickCount: number;
    keyboardActivated: boolean;
    buttonClicked: boolean;
    contentfulUtils: ContentfulUtils;
  }
}

export {};
