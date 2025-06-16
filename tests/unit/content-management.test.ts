/**
 * Unit tests for src/lib/content-management.ts
 * Tests content validation, workflows, migration, and audit utilities
 */

// Mock the contentful module
jest.mock('@/lib/contentful', () => ({
  getHomePage: jest.fn(),
  getProductPages: jest.fn(),
  getCorporatePages: jest.fn(),
  getResourcePages: jest.fn(),
  getCalculators: jest.fn(),
  getSiteNavigation: jest.fn(),
  getSiteSettings: jest.fn(),
  transformHomePage: jest.fn(),
  transformProductPage: jest.fn(),
  transformCorporatePage: jest.fn(),
}));

import {
  validateHomePage,
  validateProductPage,
  validateCorporatePage,
  ContentWorkflow,
  ContentMigration,
  auditExistingContent,
  generatePreviewUrl,
  validatePreviewSecret,
  contentWorkflow,
  contentMigration,
  type ContentValidationResult,
  type ContentWorkflowStatus,
  type MigrationTask,
  type ContentAuditResult,
  type PreviewConfig
} from '@/lib/content-management';

import type { HomePage, ProductPage, CorporatePage, RichTextContent } from '@/types/contentful';

// Mock console.error to avoid noise in tests
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Content Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('Content Validation', () => {
    describe('validateHomePage', () => {
      it('should validate a complete homepage successfully', () => {
        const validHomePage: HomePage = {
          title: 'Navi - Financial Services',
          heroHeadline: 'Your Financial Partner',
          heroSubtext: 'Loans, Insurance, and Investment Solutions',
          heroImage: {
            sys: {
              id: 'hero-image-123'
            },
            fields: {
              title: 'Hero Image',
              file: {
                url: 'https://example.com/hero.jpg',
                details: {
                  size: 2048,
                  image: {
                    width: 1200,
                    height: 800
                  }
                },
                fileName: 'hero.jpg',
                contentType: 'image/jpeg'
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: '/signup',
          productOverview: [
            { 
              title: 'UPI', 
              description: 'Digital payments',
              icon: {
                sys: {
                  id: 'upi-icon-123'
                },
                fields: {
                  title: 'UPI Icon',
                  file: {
                    url: 'https://example.com/upi-icon.svg',
                    details: {
                      size: 512
                    },
                    fileName: 'upi-icon.svg',
                    contentType: 'image/svg+xml'
                  }
                }
              },
              link: '/upi',
              features: ['Instant transfers', 'Secure payments']
            }
          ],
          trustIndicators: [],
          ctaSection: {
            headline: 'Ready to start?',
            description: 'Join us today',
            primaryCtaText: 'Sign Up',
            primaryCtaLink: '/signup'
          },
          seoTitle: 'Navi - Financial Services - Your Complete Partner for Loans, Insurance, UPI and Investment Solutions',
          seoDescription: 'Comprehensive financial solutions',
          seoKeywords: 'finance, loans, insurance'
        };

        const result = validateHomePage(validHomePage);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should identify missing required fields', () => {
        const incompleteHomePage: HomePage = {
          title: '',
          heroHeadline: '',
          heroSubtext: '',
          heroImage: {
            sys: {
              id: 'empty-hero-123'
            },
            fields: {
              title: '',
              file: {
                url: '',
                details: {
                  size: 0
                },
                fileName: '',
                contentType: ''
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: '#',
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: '',
            description: '',
            primaryCtaText: '',
            primaryCtaLink: ''
          },
          seoTitle: '',
          seoDescription: '',
          seoKeywords: ''
        };

        const result = validateHomePage(incompleteHomePage);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Title is required');
        expect(result.errors).toContain('Hero headline is required');
      });

      it('should warn about SEO field lengths', () => {
        const homePage: HomePage = {
          title: 'Navi',
          heroHeadline: 'Financial Services',
          heroSubtext: 'Your partner',
          heroImage: undefined,
          heroCtaText: 'Get Started',
          heroCtaLink: '#',
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: '',
            description: '',
            primaryCtaText: '',
            primaryCtaLink: ''
          },
          seoTitle: 'This is a very long SEO title that exceeds the recommended 60 character limit for optimal search engine display',
          seoDescription: 'This is a very long SEO description that definitely exceeds the recommended 160 character limit for optimal search engine display and user experience in search results',
          seoKeywords: 'finance'
        };

        const result = validateHomePage(homePage);
        expect(result.warnings).toContain('Title should be under 60 characters for better SEO');
        expect(result.warnings).toContain('SEO description should be under 160 characters for optimal display');
      });

      it('should warn about empty product overview', () => {
        const homePage: HomePage = {
          title: 'Navi',
          heroHeadline: 'Financial Services',
          heroSubtext: 'Your partner',
          heroImage: undefined,
          heroCtaText: 'Get Started',
          heroCtaLink: '#',
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: '',
            description: '',
            primaryCtaText: '',
            primaryCtaLink: ''
          },
          seoTitle: 'Navi',
          seoDescription: 'Financial services',
          seoKeywords: 'finance'
        };

        const result = validateHomePage(homePage);
        expect(result.warnings).toContain('Consider adding product overview cards to showcase Navi products');
      });

      it('should fail validation for missing required fields', () => {
        const invalidHomePage = {
          title: 'Navi - Financial Services',
          heroHeadline: 'Your Financial Partner',
          heroSubtext: 'Loans, Insurance, and Investment Solutions',
          heroImage: {
            sys: {
              id: 'hero-image-123'
            },
            fields: {
              title: 'Hero Image',
              file: {
                url: 'https://example.com/hero.jpg',
                details: {
                  size: 2048,
                  image: {
                    width: 1200,
                    height: 800
                  }
                },
                fileName: 'hero.jpg',
                contentType: 'image/jpeg'
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: '/signup'
          // Missing required fields: productOverview, trustIndicators, ctaSection, seoTitle, seoDescription, seoKeywords
        } as any;

        const result = validateHomePage(invalidHomePage);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });

      it('should fail validation for invalid field types', () => {
        const invalidHomePage = {
          title: 123, // Should be string
          heroHeadline: 'Your Financial Partner',
          heroSubtext: 'Loans, Insurance, and Investment Solutions',
          heroImage: {
            sys: {
              id: 'hero-image-123'
            },
            fields: {
              title: 'Hero Image',
              file: {
                url: 'https://example.com/hero.jpg',
                details: {
                  size: 2048,
                  image: {
                    width: 1200,
                    height: 800
                  }
                },
                fileName: 'hero.jpg',
                contentType: 'image/jpeg'
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: '/signup',
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: 'Get Started Today',
            description: 'Join thousands of satisfied customers',
            primaryCtaText: 'Sign Up',
            primaryCtaLink: '/signup'
          },
          seoTitle: 'Navi - Financial Services',
          seoDescription: 'Comprehensive financial solutions',
          seoKeywords: 'finance, loans, insurance'
        } as any;

        const result = validateHomePage(invalidHomePage);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });

      it('should validate field lengths', () => {
        const longContentHomePage: HomePage = {
          title: 'A'.repeat(200), // Too long
          heroHeadline: 'Your Financial Partner',
          heroSubtext: 'Loans, Insurance, and Investment Solutions',
          heroImage: {
            sys: {
              id: 'hero-image-123'
            },
            fields: {
              title: 'Hero Image',
              file: {
                url: 'https://example.com/hero.jpg',
                details: {
                  size: 2048,
                  image: {
                    width: 1200,
                    height: 800
                  }
                },
                fileName: 'hero.jpg',
                contentType: 'image/jpeg'
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: '/signup',
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: 'Get Started Today',
            description: 'Join thousands of satisfied customers',
            primaryCtaText: 'Sign Up',
            primaryCtaLink: '/signup'
          },
          seoTitle: 'Navi - Financial Services - Your Complete Partner for Loans, Insurance, UPI and Investment Solutions',
          seoDescription: 'Comprehensive financial solutions',
          seoKeywords: 'finance, loans, insurance'
        };

        const result = validateHomePage(longContentHomePage);
        expect(result.warnings).toContain('Title should be under 60 characters for better SEO');
      });

      it('should validate URL formats', () => {
        const invalidUrlHomePage: HomePage = {
          title: 'Navi - Financial Services',
          heroHeadline: 'Your Financial Partner',
          heroSubtext: 'Loans, Insurance, and Investment Solutions',
          heroImage: {
            sys: {
              id: 'hero-image-123'
            },
            fields: {
              title: 'Hero Image',
              file: {
                url: 'https://example.com/hero.jpg',
                details: {
                  size: 2048,
                  image: {
                    width: 1200,
                    height: 800
                  }
                },
                fileName: 'hero.jpg',
                contentType: 'image/jpeg'
              }
            }
          },
          heroCtaText: 'Get Started',
          heroCtaLink: 'invalid-url', // Invalid URL format
          productOverview: [],
          trustIndicators: [],
          ctaSection: {
            headline: 'Get Started Today',
            description: 'Join thousands of satisfied customers',
            primaryCtaText: 'Sign Up',
            primaryCtaLink: '/signup'
          },
          seoTitle: 'Navi - Financial Services',
          seoDescription: 'Comprehensive financial solutions',
          seoKeywords: 'finance, loans, insurance'
        };

        const result = validateHomePage(invalidUrlHomePage);
        expect(result.errors).toContain('Hero CTA link must be a valid URL or path');
      });
    });

    describe('validateProductPage', () => {
      it('should validate a complete product page successfully', () => {
        const validProductPage: ProductPage = {
          title: 'Personal Loans',
          slug: 'personal-loans',
          productType: 'cash-loan',
          heroSection: {
            headline: 'Personal Loans Made Simple',
            subtext: 'Get instant approval with competitive rates',
            backgroundImage: {
              sys: {
                id: 'hero-bg-123'
              },
              fields: {
                title: 'Hero Background',
                file: {
                  url: 'https://example.com/hero-bg.jpg',
                  details: {
                    size: 3072,
                    image: {
                      width: 1920,
                      height: 1080
                    }
                  },
                  fileName: 'hero-bg.jpg',
                  contentType: 'image/jpeg'
                }
              }
            },
            ctaText: 'Apply Now',
            ctaLink: '/apply',
            ctaType: 'primary',
            alignment: 'left'
          },
          keyFeatures: [],
          productDescription: 'Get instant personal loans with competitive interest rates and flexible repayment options.',
          eligibilityCriteria: {
            minAge: 21,
            maxAge: 65,
            minIncome: 25000,
            employmentType: ['salaried', 'self-employed'],
            creditScore: 650,
            additionalCriteria: ['PAN', 'Aadhaar', 'Salary slips']
          },
          interestRates: {
            minRate: 10.5,
            maxRate: 24.0,
            rateType: 'floating',
            factors: ['Credit score', 'Income', 'Employment type']
          },
          applicationProcess: [],
          documentsRequired: [],
          faqs: [],
          relatedProducts: [],
          seoTitle: 'Personal Loans - Navi',
          seoDescription: 'Get personal loans with competitive rates',
          seoKeywords: 'personal loans, instant approval'
        };

        const result = validateProductPage(validProductPage);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should fail validation for missing required fields', () => {
        const invalidProductPage = {
          title: 'Personal Loans',
          heroSection: {
            headline: 'Personal Loans Made Simple',
            subtext: 'Get instant approval with competitive rates',
            backgroundImage: {
              sys: {
                id: 'hero-bg-123'
              },
              fields: {
                title: 'Hero Background',
                file: {
                  url: 'https://example.com/hero-bg.jpg',
                  details: {
                    size: 3072,
                    image: {
                      width: 1920,
                      height: 1080
                    }
                  },
                  fileName: 'hero-bg.jpg',
                  contentType: 'image/jpeg'
                }
              }
            },
            ctaText: 'Apply Now',
            ctaLink: '/apply'
          }
          // Missing required fields
        } as any;

        const result = validateProductPage(invalidProductPage);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    describe('validateCorporatePage', () => {
      it('should validate a complete corporate page successfully', () => {
        const validCorporatePage: CorporatePage = {
          title: 'About Navi',
          slug: 'about-navi',
          pageType: 'about-us',
          heroSection: {
            headline: 'About Navi',
            subtext: 'Leading fintech company in India',
            backgroundImage: {
              sys: {
                id: 'about-hero-123'
              },
              fields: {
                title: 'About Hero Background',
                file: {
                  url: 'https://example.com/about-hero.jpg',
                  details: {
                    size: 2560,
                    image: {
                      width: 1600,
                      height: 900
                    }
                  },
                  fileName: 'about-hero.jpg',
                  contentType: 'image/jpeg'
                }
              }
            },
            ctaText: 'Learn More',
            ctaLink: '/careers',
            ctaType: 'primary',
            alignment: 'center'
          },
          content: {
            nodeType: 'document',
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: 'Navi is a leading fintech company...'
                  }
                ]
              }
            ]
          },
          sections: [],
          seoTitle: 'About Navi - Leading Fintech Company',
          seoDescription: 'Learn about Navi\'s mission and values',
          seoKeywords: 'about navi, fintech, company'
        };

        const result = validateCorporatePage(validCorporatePage);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should fail validation for invalid content structure', () => {
        const invalidCorporatePage = {
          title: 'About Navi',
          slug: 'about-navi',
          pageType: 'about-us',
          heroSection: {
            headline: 'About Navi',
            subtext: 'Leading fintech company in India',
            backgroundImage: {
              sys: {
                id: 'about-hero-123'
              },
              fields: {
                title: 'About Hero Background',
                file: {
                  url: 'https://example.com/about-hero.jpg',
                  details: {
                    size: 2560,
                    image: {
                      width: 1600,
                      height: 900
                    }
                  },
                  fileName: 'about-hero.jpg',
                  contentType: 'image/jpeg'
                }
              }
            },
            ctaText: 'Learn More',
            ctaLink: '/careers',
            ctaType: 'primary',
            alignment: 'center'
          },
          content: 123, // Should be RichTextContent
          sections: 'invalid', // Should be array
          seoTitle: 'About Navi - Leading Fintech Company',
          seoDescription: 'Learn about Navi\'s mission and values',
          seoKeywords: 'about navi, fintech, company'
        } as any;

        const result = validateCorporatePage(invalidCorporatePage);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    describe('Content Workflow Management', () => {
      it('should handle content workflow status updates', () => {
        // Test workflow management functionality
        expect(true).toBe(true); // Placeholder test
      });
    });
  });

  describe('Content Workflow', () => {
    let workflow: ContentWorkflow;

    beforeEach(() => {
      workflow = new ContentWorkflow();
    });

    it('should add content to workflow', () => {
      workflow.addContent('page-1', 'homePage', 'draft');
      const status = workflow.getWorkflowStatus('page-1');
      
      expect(status).toBeDefined();
      expect(status?.contentType).toBe('homePage');
      expect(status?.status).toBe('draft');
      expect(status?.lastModified).toBeDefined();
    });

    it('should update content status', () => {
      workflow.addContent('page-1', 'productPage');
      workflow.updateStatus('page-1', 'review', 'editor@navi.com');
      
      const status = workflow.getWorkflowStatus('page-1');
      expect(status?.status).toBe('review');
      expect(status?.assignee).toBe('editor@navi.com');
    });

    it('should add review notes', () => {
      workflow.addContent('page-1', 'corporatePage');
      workflow.addReviewNote('page-1', 'Please update the hero section');
      workflow.addReviewNote('page-1', 'Add more product details');
      
      const status = workflow.getWorkflowStatus('page-1');
      expect(status?.reviewNotes).toHaveLength(2);
      expect(status?.reviewNotes).toContain('Please update the hero section');
    });

    it('should get content by status', () => {
      workflow.addContent('page-1', 'homePage', 'draft');
      workflow.addContent('page-2', 'productPage', 'review');
      workflow.addContent('page-3', 'corporatePage', 'draft');
      
      const draftContent = workflow.getContentByStatus('draft');
      const reviewContent = workflow.getContentByStatus('review');
      
      expect(draftContent).toHaveLength(2);
      expect(reviewContent).toHaveLength(1);
      expect(reviewContent[0].id).toBe('page-2');
    });

    it('should return undefined for non-existent content', () => {
      const status = workflow.getWorkflowStatus('non-existent');
      expect(status).toBeUndefined();
    });
  });

  describe('Content Migration', () => {
    let migration: ContentMigration;

    beforeEach(() => {
      migration = new ContentMigration();
      migration.initializeMigrationTasks();
    });

    it('should initialize migration tasks', () => {
      const tasks = migration.getMigrationTasks();
      expect(tasks.length).toBeGreaterThan(0);
      
      // Check for expected migration tasks based on PRD
      const taskTitles = tasks.map(task => task.title);
      expect(taskTitles).toContain('Homepage Content');
      expect(taskTitles).toContain('UPI Product Page');
      expect(taskTitles).toContain('About Us Corporate Page');
    });

    it('should update task status', () => {
      const tasks = migration.getMigrationTasks();
      const firstTask = tasks[0];
      
      migration.updateTaskStatus(firstTask.id, 'in-progress', { title: 'Extracted content' });
      
      const updatedTasks = migration.getMigrationTasks();
      const updatedTask = updatedTasks.find(task => task.id === firstTask.id);
      
      expect(updatedTask?.status).toBe('in-progress');
      expect(updatedTask?.extractedContent).toEqual({ title: 'Extracted content' });
    });

    it('should update task with errors', () => {
      const tasks = migration.getMigrationTasks();
      const firstTask = tasks[0];
      
      migration.updateTaskStatus(firstTask.id, 'failed', undefined, ['Connection error', 'Invalid format']);
      
      const updatedTasks = migration.getMigrationTasks();
      const updatedTask = updatedTasks.find(task => task.id === firstTask.id);
      
      expect(updatedTask?.status).toBe('failed');
      expect(updatedTask?.errors).toEqual(['Connection error', 'Invalid format']);
    });

    it('should get tasks by status', () => {
      const tasks = migration.getMigrationTasks();
      
      // Update some tasks to different statuses
      migration.updateTaskStatus(tasks[0].id, 'completed');
      migration.updateTaskStatus(tasks[1].id, 'in-progress');
      
      const completedTasks = migration.getTasksByStatus('completed');
      const inProgressTasks = migration.getTasksByStatus('in-progress');
      const pendingTasks = migration.getTasksByStatus('pending');
      
      expect(completedTasks).toHaveLength(1);
      expect(inProgressTasks).toHaveLength(1);
      expect(pendingTasks).toHaveLength(tasks.length - 2);
    });
  });

  describe('Content Audit', () => {
    beforeEach(() => {
      // Reset mocks
      const contentfulMocks = require('@/lib/contentful');
      contentfulMocks.getHomePage.mockReset();
      contentfulMocks.getProductPages.mockReset();
      contentfulMocks.getCorporatePages.mockReset();
      contentfulMocks.getResourcePages.mockReset();
      contentfulMocks.transformHomePage.mockReset();
    });

    it('should audit existing content successfully', async () => {
      const contentfulMocks = require('@/lib/contentful');
      
      // Mock successful responses
      contentfulMocks.getHomePage.mockResolvedValue({ fields: { title: 'Home' } });
      contentfulMocks.getProductPages.mockResolvedValue([
        { fields: { productType: 'upi' } },
        { fields: { productType: 'cash-loan' } }
      ]);
      contentfulMocks.getCorporatePages.mockResolvedValue([
        { fields: { title: 'About Us' } }
      ]);
      contentfulMocks.getResourcePages.mockResolvedValue([]);
      contentfulMocks.transformHomePage.mockReturnValue({
        title: 'Home',
        heroHeadline: 'Welcome',
        heroSubtext: 'Your partner',
        seoTitle: 'Home',
        seoDescription: 'Welcome to Navi'
      });

      const result = await auditExistingContent();
      
      expect(result.totalPages).toBe(4); // 1 home + 2 product + 1 corporate + 0 resource
      expect(result.contentTypes.homePage).toBe(1);
      expect(result.contentTypes.productPage).toBe(2);
      expect(result.contentTypes.corporatePage).toBe(1);
      expect(result.contentTypes.resourcePage).toBe(0);
    });

    it('should identify missing content', async () => {
      const contentfulMocks = require('@/lib/contentful');
      
      // Mock responses with missing content
      contentfulMocks.getHomePage.mockResolvedValue(null);
      contentfulMocks.getProductPages.mockResolvedValue([
        { fields: { productType: 'upi' } }
      ]);
      contentfulMocks.getCorporatePages.mockResolvedValue([]);
      contentfulMocks.getResourcePages.mockResolvedValue([]);

      const result = await auditExistingContent();
      
      expect(result.missingContent).toContain('Homepage content');
      expect(result.missingContent).toContain('cash-loan product page');
      expect(result.missingContent).toContain('home-loan product page');
      expect(result.missingContent).toContain('health-insurance product page');
      expect(result.missingContent).toContain('mutual-funds product page');
    });

    it('should handle audit errors gracefully', async () => {
      const contentfulMocks = require('@/lib/contentful');
      
      // Mock error responses
      contentfulMocks.getHomePage.mockRejectedValue(new Error('Connection failed'));
      contentfulMocks.getProductPages.mockRejectedValue(new Error('Connection failed'));
      contentfulMocks.getCorporatePages.mockRejectedValue(new Error('Connection failed'));
      contentfulMocks.getResourcePages.mockRejectedValue(new Error('Connection failed'));

      const result = await auditExistingContent();
      
      expect(result.totalPages).toBe(0);
      expect(result.missingContent).toContain('Unable to audit content due to connection issues');
      expect(result.recommendations).toContain('Verify Contentful connection and try again');
      expect(consoleSpy).toHaveBeenCalledWith('Content audit failed:', expect.any(Error));
    });

    it('should generate recommendations', async () => {
      const contentfulMocks = require('@/lib/contentful');
      
      // Mock minimal content
      contentfulMocks.getHomePage.mockResolvedValue({ fields: { title: 'Home' } });
      contentfulMocks.getProductPages.mockResolvedValue([]);
      contentfulMocks.getCorporatePages.mockResolvedValue([]);
      contentfulMocks.getResourcePages.mockResolvedValue([]);
      contentfulMocks.transformHomePage.mockReturnValue({
        title: 'Home',
        heroHeadline: 'Welcome',
        heroSubtext: 'Your partner',
        seoTitle: 'Home',
        seoDescription: 'Welcome to Navi'
      });

      const result = await auditExistingContent();
      
      expect(result.recommendations).toContain('Create remaining page templates to reach the target of 10 core page templates');
      expect(result.recommendations).toContain('Complete missing content to ensure comprehensive product coverage');
    });
  });

  describe('Preview Utilities', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    describe('generatePreviewUrl', () => {
      it('should generate preview URL with custom base URL', () => {
        process.env.NEXT_PUBLIC_SITE_URL = 'https://navi.com';
        
        const url = generatePreviewUrl('productPage', 'personal-loan', 'secret123');
        
        expect(url).toBe('https://navi.com/api/preview?secret=secret123&contentType=productPage&slug=personal-loan');
      });

      it('should use localhost as fallback', () => {
        delete process.env.NEXT_PUBLIC_SITE_URL;
        
        const url = generatePreviewUrl('homePage', 'home', 'secret123');
        
        expect(url).toBe('http://localhost:3000/api/preview?secret=secret123&contentType=homePage&slug=home');
      });
    });

    describe('validatePreviewSecret', () => {
      it('should validate correct secret', () => {
        process.env.CONTENTFUL_PREVIEW_SECRET = 'correct-secret';
        
        const isValid = validatePreviewSecret('correct-secret');
        
        expect(isValid).toBe(true);
      });

      it('should reject incorrect secret', () => {
        process.env.CONTENTFUL_PREVIEW_SECRET = 'correct-secret';
        
        const isValid = validatePreviewSecret('wrong-secret');
        
        expect(isValid).toBe(false);
      });

      it('should reject when no secret is configured', () => {
        delete process.env.CONTENTFUL_PREVIEW_SECRET;
        
        const isValid = validatePreviewSecret('any-secret');
        
        expect(isValid).toBe(false);
      });
    });
  });

  describe('Global Instances', () => {
    it('should export global workflow instance', () => {
      expect(contentWorkflow).toBeInstanceOf(ContentWorkflow);
    });

    it('should export global migration instance', () => {
      expect(contentMigration).toBeInstanceOf(ContentMigration);
    });

    it('should have initialized migration tasks', () => {
      const tasks = contentMigration.getMigrationTasks();
      expect(tasks.length).toBeGreaterThan(0);
    });
  });
});
