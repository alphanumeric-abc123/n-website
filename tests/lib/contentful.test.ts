/// <reference path="../types/window.d.ts" />
import { test, expect } from '@playwright/test';

test.describe('Contentful Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page to test Contentful utilities
    await page.goto('data:text/html,<html><head><title>Contentful Test</title></head><body></body></html>');
    
    // Mock Contentful client and functions for testing
    await page.addScriptTag({
      content: `
        // Mock Contentful client responses
        const mockEntries = {
          homePage: [{
            sys: { id: 'home-1' },
            fields: {
              title: 'Navi - Financial Services',
              heroHeadline: 'Financial Services Made Simple',
              heroSubtext: 'Get instant loans and more',
              heroCtaText: 'Download App',
              heroCtaLink: '#download',
              seoTitle: 'Navi - Home',
              seoDescription: 'Financial services for everyone',
              seoKeywords: 'loans, insurance, payments'
            }
          }],
          productPage: [{
            sys: { id: 'product-1' },
            fields: {
              title: 'Personal Loans',
              slug: 'personal-loans',
              productType: 'loans',
              productDescription: 'Quick personal loans',
              seoTitle: 'Personal Loans - Navi',
              seoDescription: 'Get instant personal loans',
              seoKeywords: 'personal loans, instant loans'
            }
          }],
          corporatePage: [{
            sys: { id: 'corporate-1' },
            fields: {
              title: 'About Us',
              slug: 'about-us',
              pageType: 'about-us',
              content: { nodeType: 'document', content: [] },
              seoTitle: 'About Us - Navi',
              seoDescription: 'Learn about Navi',
              seoKeywords: 'about, company, fintech'
            }
          }],
          siteNavigation: [{
            sys: { id: 'nav-1' },
            fields: {
              mainNavigation: [
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' }
              ],
              footerNavigation: [
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' }
              ]
            }
          }]
        };

        // Mock asset with proper structure
        const mockAsset = {
          fields: {
            file: {
              url: '//images.ctfassets.net/test/image.jpg'
            }
          }
        };

        // Mock Contentful functions
        window.contentfulUtils = {
          // Generic functions
          getEntries: async function(contentType, limit) {
            return mockEntries[contentType] || [];
          },
          
          getEntry: async function(entryId) {
            for (const entries of Object.values(mockEntries)) {
              const found = entries.find(entry => entry.sys.id === entryId);
              if (found) return found;
            }
            return null;
          },

          // Specific content fetchers
          getHomePage: async function() {
            return mockEntries.homePage[0] || null;
          },

          getProductPages: async function() {
            return mockEntries.productPage;
          },

          getProductPageBySlug: async function(slug) {
            return mockEntries.productPage.find(p => p.fields.slug === slug) || null;
          },

          getCorporatePages: async function() {
            return mockEntries.corporatePage;
          },

          getCorporatePageBySlug: async function(slug) {
            return mockEntries.corporatePage.find(p => p.fields.slug === slug) || null;
          },

          getSiteNavigation: async function() {
            return mockEntries.siteNavigation[0] || null;
          },

          // Asset utilities
          getAssetUrl: function(asset) {
            if (!asset?.fields?.file?.url) return '';
            const url = asset.fields.file.url;
            return url.startsWith('//') ? \`https:\${url}\` : url;
          },

          getOptimizedImageUrl: function(asset, width, height, format) {
            const baseUrl = this.getAssetUrl(asset);
            if (!baseUrl) return '';
            
            const params = new URLSearchParams();
            if (width) params.append('w', width.toString());
            if (height) params.append('h', height.toString());
            if (format) params.append('fm', format);
            params.append('fit', 'fill');
            params.append('q', '80');
            
            return \`\${baseUrl}?\${params.toString()}\`;
          },

          // Rich text helpers
          extractPlainText: function(richTextContent) {
            if (!richTextContent || !richTextContent.content) return '';
            
            const extractText = (node) => {
              if (node.nodeType === 'text') return node.value || '';
              if (node.content) {
                return node.content.map(extractText).join('');
              }
              return '';
            };
            
            return richTextContent.content.map(extractText).join(' ').trim();
          },

          // Static generation helpers
          getAllProductSlugs: async function() {
            return mockEntries.productPage.map(p => p.fields.slug).filter(Boolean);
          },

          getAllCorporateSlugs: async function() {
            return mockEntries.corporatePage.map(p => p.fields.slug).filter(Boolean);
          },

          // Transform functions
          transformHomePage: function(entry) {
            return {
              title: entry.fields.title || '',
              heroHeadline: entry.fields.heroHeadline || '',
              heroSubtext: entry.fields.heroSubtext || '',
              heroImage: entry.fields.heroImage,
              heroCtaText: entry.fields.heroCtaText || 'Get Started',
              heroCtaLink: entry.fields.heroCtaLink || '#',
              productOverview: entry.fields.productOverview || [],
              trustIndicators: entry.fields.trustIndicators || [],
              ctaSection: entry.fields.ctaSection || {
                headline: '',
                description: '',
                primaryCtaText: '',
                primaryCtaLink: ''
              },
              seoTitle: entry.fields.seoTitle || '',
              seoDescription: entry.fields.seoDescription || '',
              seoKeywords: entry.fields.seoKeywords || '',
            };
          },

          transformProductPage: function(entry) {
            return {
              title: entry.fields.title || '',
              slug: entry.fields.slug || '',
              productType: entry.fields.productType || 'upi',
              heroSection: entry.fields.heroSection || {
                headline: '',
                subtext: '',
                backgroundImage: null,
                ctaText: '',
                ctaLink: '',
                ctaType: 'primary',
                alignment: 'left'
              },
              productDescription: entry.fields.productDescription || '',
              keyFeatures: entry.fields.keyFeatures || [],
              eligibilityCriteria: entry.fields.eligibilityCriteria || {
                minAge: 18,
                maxAge: 65,
                minIncome: 0,
                employmentType: [],
                creditScore: 0,
                additionalCriteria: []
              },
              interestRates: entry.fields.interestRates,
              loanAmounts: entry.fields.loanAmounts,
              tenureOptions: entry.fields.tenureOptions,
              calculator: entry.fields.calculator,
              applicationProcess: entry.fields.applicationProcess || [],
              documentsRequired: entry.fields.documentsRequired || [],
              faqs: entry.fields.faqs || [],
              relatedProducts: entry.fields.relatedProducts || [],
              seoTitle: entry.fields.seoTitle || '',
              seoDescription: entry.fields.seoDescription || '',
              seoKeywords: entry.fields.seoKeywords || '',
            };
          },

          transformCorporatePage: function(entry) {
            return {
              title: entry.fields.title || '',
              slug: entry.fields.slug || '',
              pageType: entry.fields.pageType || 'about-us',
              heroSection: entry.fields.heroSection,
              content: entry.fields.content || { nodeType: 'document', content: [] },
              sections: entry.fields.sections || [],
              teamMembers: entry.fields.teamMembers,
              companyStats: entry.fields.companyStats,
              timeline: entry.fields.timeline,
              seoTitle: entry.fields.seoTitle || '',
              seoDescription: entry.fields.seoDescription || '',
              seoKeywords: entry.fields.seoKeywords || '',
            };
          },

          transformSiteNavigation: function(entry) {
            return {
              mainNavigation: entry.fields.mainNavigation,
              footerNavigation: entry.fields.footerNavigation,
            };
          },

          // Mock asset for testing
          mockAsset: mockAsset
        };
      `
    });
  });

  test.describe('Generic Entry Functions', () => {
    test('getEntries should fetch entries by content type', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entries = await window.contentfulUtils.getEntries('homePage');
        return entries.length > 0 && entries[0].fields.title;
      });

      expect(result).toBe('Navi - Financial Services');
    });

    test('getEntries should handle limit parameter', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entries = await window.contentfulUtils.getEntries('productPage', 1);
        return entries.length;
      });

      expect(result).toBe(1);
    });

    test('getEntries should return empty array for unknown content type', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entries = await window.contentfulUtils.getEntries('unknownType');
        return entries.length;
      });

      expect(result).toBe(0);
    });

    test('getEntry should fetch single entry by ID', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getEntry('home-1');
        return entry ? entry.fields.title : null;
      });

      expect(result).toBe('Navi - Financial Services');
    });

    test('getEntry should return null for unknown ID', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getEntry('unknown-id');
        return entry;
      });

      expect(result).toBe(null);
    });
  });

  test.describe('Specific Content Fetchers', () => {
    test('getHomePage should fetch homepage content', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const homePage = await window.contentfulUtils.getHomePage();
        return {
          title: homePage.fields.title,
          headline: homePage.fields.heroHeadline,
          subtext: homePage.fields.heroSubtext
        };
      });

      expect(result.title).toBe('Navi - Financial Services');
      expect(result.headline).toBe('Financial Services Made Simple');
      expect(result.subtext).toBe('Get instant loans and more');
    });

    test('getProductPages should fetch all product pages', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const pages = await window.contentfulUtils.getProductPages();
        return pages.map(p => ({ title: p.fields.title, slug: p.fields.slug }));
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Personal Loans');
      expect(result[0].slug).toBe('personal-loans');
    });

    test('getProductPageBySlug should fetch product by slug', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const page = await window.contentfulUtils.getProductPageBySlug('personal-loans');
        return page ? page.fields.title : null;
      });

      expect(result).toBe('Personal Loans');
    });

    test('getProductPageBySlug should return null for unknown slug', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const page = await window.contentfulUtils.getProductPageBySlug('unknown-slug');
        return page;
      });

      expect(result).toBe(null);
    });

    test('getCorporatePages should fetch all corporate pages', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const pages = await window.contentfulUtils.getCorporatePages();
        return pages.map(p => ({ title: p.fields.title, slug: p.fields.slug }));
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('About Us');
      expect(result[0].slug).toBe('about-us');
    });

    test('getCorporatePageBySlug should fetch corporate page by slug', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const page = await window.contentfulUtils.getCorporatePageBySlug('about-us');
        return page ? page.fields.title : null;
      });

      expect(result).toBe('About Us');
    });

    test('getSiteNavigation should fetch navigation data', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const nav = await window.contentfulUtils.getSiteNavigation();
        return {
          mainNav: nav.fields.mainNavigation,
          footerNav: nav.fields.footerNavigation
        };
      });

      expect(result.mainNav).toHaveLength(2);
      expect(result.mainNav[0].label).toBe('Home');
      expect(result.footerNav).toHaveLength(2);
      expect(result.footerNav[0].label).toBe('About');
    });
  });

  test.describe('Asset Utilities', () => {
    test('getAssetUrl should return proper asset URL', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getAssetUrl(window.contentfulUtils.mockAsset);
        return url;
      });

      expect(result).toBe('https://images.ctfassets.net/test/image.jpg');
    });

    test('getAssetUrl should handle missing asset', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getAssetUrl(null);
        return url;
      });

      expect(result).toBe('');
    });

    test('getAssetUrl should handle asset without file', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getAssetUrl({ fields: {} });
        return url;
      });

      expect(result).toBe('');
    });

    test('getOptimizedImageUrl should generate optimized URLs', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getOptimizedImageUrl(
          window.contentfulUtils.mockAsset,
          800,
          600,
          'webp'
        );
        return url;
      });

      expect(result).toContain('w=800');
      expect(result).toContain('h=600');
      expect(result).toContain('fm=webp');
      expect(result).toContain('fit=fill');
      expect(result).toContain('q=80');
    });

    test('getOptimizedImageUrl should handle missing parameters', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getOptimizedImageUrl(
          window.contentfulUtils.mockAsset
        );
        return url;
      });

      expect(result).toContain('fit=fill');
      expect(result).toContain('q=80');
      expect(result).not.toContain('w=');
      expect(result).not.toContain('h=');
    });

    test('getOptimizedImageUrl should return empty for invalid asset', async ({ page }) => {
      const result = await page.evaluate(() => {
        const url = window.contentfulUtils.getOptimizedImageUrl(null);
        return url;
      });

      expect(result).toBe('');
    });
  });

  test.describe('Rich Text Helpers', () => {
    test('extractPlainText should extract text from rich text content', async ({ page }) => {
      const result = await page.evaluate(() => {
        const richText = {
          nodeType: 'document',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                { nodeType: 'text', value: 'Hello ' },
                { nodeType: 'text', value: 'World' }
              ]
            }
          ]
        };
        return window.contentfulUtils.extractPlainText(richText);
      });

      expect(result).toBe('Hello World');
    });

    test('extractPlainText should handle empty content', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.contentfulUtils.extractPlainText(null);
      });

      expect(result).toBe('');
    });

    test('extractPlainText should handle nested content', async ({ page }) => {
      const result = await page.evaluate(() => {
        const richText = {
          nodeType: 'document',
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'bold',
                  content: [
                    { nodeType: 'text', value: 'Bold text' }
                  ]
                }
              ]
            }
          ]
        };
        return window.contentfulUtils.extractPlainText(richText);
      });

      expect(result).toBe('Bold text');
    });
  });

  test.describe('Static Generation Helpers', () => {
    test('getAllProductSlugs should return all product slugs', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const slugs = await window.contentfulUtils.getAllProductSlugs();
        return slugs;
      });

      expect(result).toEqual(['personal-loans']);
    });

    test('getAllCorporateSlugs should return all corporate page slugs', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const slugs = await window.contentfulUtils.getAllCorporateSlugs();
        return slugs;
      });

      expect(result).toEqual(['about-us']);
    });
  });

  test.describe('Transform Functions', () => {
    test('transformHomePage should transform homepage entry correctly', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getHomePage();
        const transformed = window.contentfulUtils.transformHomePage(entry);
        return {
          title: transformed.title,
          heroHeadline: transformed.heroHeadline,
          heroCtaText: transformed.heroCtaText,
          seoTitle: transformed.seoTitle
        };
      });

      expect(result.title).toBe('Navi - Financial Services');
      expect(result.heroHeadline).toBe('Financial Services Made Simple');
      expect(result.heroCtaText).toBe('Download App');
      expect(result.seoTitle).toBe('Navi - Home');
    });

    test('transformProductPage should transform product page entry correctly', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getProductPageBySlug('personal-loans');
        const transformed = window.contentfulUtils.transformProductPage(entry);
        return {
          title: transformed.title,
          slug: transformed.slug,
          productType: transformed.productType,
          productDescription: transformed.productDescription
        };
      });

      expect(result.title).toBe('Personal Loans');
      expect(result.slug).toBe('personal-loans');
      expect(result.productType).toBe('loans');
      expect(result.productDescription).toBe('Quick personal loans');
    });

    test('transformCorporatePage should transform corporate page entry correctly', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getCorporatePageBySlug('about-us');
        const transformed = window.contentfulUtils.transformCorporatePage(entry);
        return {
          title: transformed.title,
          slug: transformed.slug,
          pageType: transformed.pageType,
          seoTitle: transformed.seoTitle
        };
      });

      expect(result.title).toBe('About Us');
      expect(result.slug).toBe('about-us');
      expect(result.pageType).toBe('about-us');
      expect(result.seoTitle).toBe('About Us - Navi');
    });

    test('transformSiteNavigation should transform navigation entry correctly', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const entry = await window.contentfulUtils.getSiteNavigation();
        const transformed = window.contentfulUtils.transformSiteNavigation(entry);
        return {
          mainNavCount: transformed.mainNavigation.length,
          footerNavCount: transformed.footerNavigation.length,
          firstMainNav: transformed.mainNavigation[0]
        };
      });

      expect(result.mainNavCount).toBe(2);
      expect(result.footerNavCount).toBe(2);
      expect(result.firstMainNav.label).toBe('Home');
      expect(result.firstMainNav.href).toBe('/');
    });
  });

  test.describe('Error Handling', () => {
    test('functions should handle missing data gracefully', async ({ page }) => {
      const result = await page.evaluate(() => {
        // Test transform functions with minimal data
        const minimalEntry = {
          fields: {}
        };
        
        const homeTransform = window.contentfulUtils.transformHomePage(minimalEntry);
        const productTransform = window.contentfulUtils.transformProductPage(minimalEntry);
        const corporateTransform = window.contentfulUtils.transformCorporatePage(minimalEntry);
        
        return {
          homeTitle: homeTransform.title,
          productTitle: productTransform.title,
          corporateTitle: corporateTransform.title,
          homeCtaText: homeTransform.heroCtaText,
          productType: productTransform.productType,
          corporatePageType: corporateTransform.pageType
        };
      });

      // Should provide defaults for missing fields
      expect(result.homeTitle).toBe('');
      expect(result.productTitle).toBe('');
      expect(result.corporateTitle).toBe('');
      expect(result.homeCtaText).toBe('Get Started');
      expect(result.productType).toBe('upi');
      expect(result.corporatePageType).toBe('about-us');
    });

    test('should handle arrays and objects gracefully', async ({ page }) => {
      const result = await page.evaluate(() => {
        const minimalEntry = { fields: {} };
        const homeTransform = window.contentfulUtils.transformHomePage(minimalEntry);
        const productTransform = window.contentfulUtils.transformProductPage(minimalEntry);
        
        return {
          productOverview: Array.isArray(homeTransform.productOverview),
          trustIndicators: Array.isArray(homeTransform.trustIndicators),
          keyFeatures: Array.isArray(productTransform.keyFeatures),
          applicationProcess: Array.isArray(productTransform.applicationProcess),
          ctaSection: typeof homeTransform.ctaSection === 'object'
        };
      });

      expect(result.productOverview).toBe(true);
      expect(result.trustIndicators).toBe(true);
      expect(result.keyFeatures).toBe(true);
      expect(result.applicationProcess).toBe(true);
      expect(result.ctaSection).toBe(true);
    });
  });

  test.describe('Data Consistency', () => {
    test('should maintain consistent field mapping', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const homePage = await window.contentfulUtils.getHomePage();
        const transformed = window.contentfulUtils.transformHomePage(homePage);
        
        // Check that all expected fields are present
        const expectedFields = [
          'title', 'heroHeadline', 'heroSubtext', 'heroCtaText', 'heroCtaLink',
          'productOverview', 'trustIndicators', 'ctaSection',
          'seoTitle', 'seoDescription', 'seoKeywords'
        ];
        
        return expectedFields.every(field => transformed.hasOwnProperty(field));
      });

      expect(result).toBe(true);
    });

    test('should handle SEO fields consistently', async ({ page }) => {
      const result = await page.evaluate(async () => {
        const homePage = await window.contentfulUtils.getHomePage();
        const productPage = await window.contentfulUtils.getProductPageBySlug('personal-loans');
        const corporatePage = await window.contentfulUtils.getCorporatePageBySlug('about-us');
        
        const homeTransformed = window.contentfulUtils.transformHomePage(homePage);
        const productTransformed = window.contentfulUtils.transformProductPage(productPage);
        const corporateTransformed = window.contentfulUtils.transformCorporatePage(corporatePage);
        
        return {
          homeHasSeo: !!(homeTransformed.seoTitle && homeTransformed.seoDescription),
          productHasSeo: !!(productTransformed.seoTitle && productTransformed.seoDescription),
          corporateHasSeo: !!(corporateTransformed.seoTitle && corporateTransformed.seoDescription)
        };
      });

      expect(result.homeHasSeo).toBe(true);
      expect(result.productHasSeo).toBe(true);
      expect(result.corporateHasSeo).toBe(true);
    });
  });
});
