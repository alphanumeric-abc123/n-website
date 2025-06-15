/**
 * Unit tests for src/types/contentful.ts
 * Tests TypeScript type definitions and interfaces for Contentful content models
 */

import type {
  ContentfulAsset,
  ContentfulEntry,
  HomePageSkeleton,
  ProductPageSkeleton,
  CorporatePageSkeleton,
  ResourcePageSkeleton,
  CalculatorSkeleton,
  SiteNavigationSkeleton,
  SiteSettingsSkeleton,
  ArticleSkeleton,
  HomePage,
  ProductPage,
  CorporatePage,
  ProductCard,
  TrustIndicator,
  CTASection,
  HeroSection,
  Feature,
  EligibilityCriteria,
  InterestRateInfo,
  LoanAmountInfo,
  TenureOption,
  Calculator,
  CalculatorField,
  ProcessStep,
  Document,
  FAQ,
  RelatedProduct,
  RichTextContent,
  ContentSection,
  TeamMember,
  CompanyStat,
  TimelineEvent,
  NavigationItem,
  SiteNavigation,
  SEOData,
  AnalyticsEvent
} from '@/types/contentful';

describe('Contentful Types', () => {
  describe('Base Types', () => {
    it('should define ContentfulAsset interface correctly', () => {
      const mockAsset: ContentfulAsset = {
        sys: {
          id: 'asset-123'
        },
        fields: {
          title: 'Test Image',
          file: {
            url: 'https://example.com/image.jpg',
            details: {
              size: 1024,
              image: {
                width: 800,
                height: 600
              }
            },
            fileName: 'image.jpg',
            contentType: 'image/jpeg'
          }
        }
      };

      expect(mockAsset.sys.id).toBe('asset-123');
      expect(mockAsset.fields.title).toBe('Test Image');
      expect(mockAsset.fields.file.url).toBe('https://example.com/image.jpg');
    });

    it('should define ContentfulEntry interface correctly', () => {
      const mockEntry: ContentfulEntry<{ title: string }> = {
        sys: {
          id: 'entry-123',
          contentType: {
            sys: {
              id: 'testContentType'
            }
          },
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        fields: {
          title: 'Test Entry'
        }
      };

      expect(mockEntry.sys.id).toBe('entry-123');
      expect(mockEntry.fields.title).toBe('Test Entry');
    });
  });

  describe('Content Model Skeletons', () => {
    it('should define HomePageSkeleton with correct structure', () => {
      // Type checking - this will fail at compile time if structure is wrong
      const homePageFields: HomePageSkeleton['fields'] = {
        title: 'Home Page',
        heroHeadline: 'Welcome to Navi',
        heroSubtext: 'Your financial partner',
        heroImage: {} as any,
        heroCtaText: 'Get Started',
        heroCtaLink: '/signup',
        productOverview: [],
        trustIndicators: [],
        ctaSection: {},
        seoTitle: 'Navi - Home',
        seoDescription: 'Welcome to Navi',
        seoKeywords: 'finance, loans',
        publishedAt: '2024-01-01T00:00:00Z'
      };

      expect(homePageFields.title).toBe('Home Page');
      expect(homePageFields.heroHeadline).toBe('Welcome to Navi');
    });

    it('should define ProductPageSkeleton with correct product types', () => {
      const productTypes: ProductPageSkeleton['fields']['productType'][] = [
        'upi',
        'cash-loan',
        'home-loan',
        'health-insurance',
        'mutual-funds'
      ];

      productTypes.forEach(type => {
        const productFields: ProductPageSkeleton['fields'] = {
          title: 'Product Page',
          slug: 'product-slug',
          productType: type,
          heroSection: {},
          productDescription: 'Product description',
          keyFeatures: [],
          eligibilityCriteria: {},
          applicationProcess: [],
          documentsRequired: [],
          faqs: [],
          relatedProducts: [],
          seoTitle: 'Product',
          seoDescription: 'Product description',
          seoKeywords: 'product',
          publishedAt: '2024-01-01T00:00:00Z'
        };

        expect(productFields.productType).toBe(type);
      });
    });

    it('should define CorporatePageSkeleton with correct page types', () => {
      const pageTypes: CorporatePageSkeleton['fields']['pageType'][] = [
        'about-us',
        'why-navi',
        'careers',
        'governance'
      ];

      pageTypes.forEach(type => {
        const corporateFields: CorporatePageSkeleton['fields'] = {
          title: 'Corporate Page',
          slug: 'corporate-slug',
          pageType: type,
          content: {},
          sections: [],
          seoTitle: 'Corporate',
          seoDescription: 'Corporate description',
          seoKeywords: 'corporate',
          publishedAt: '2024-01-01T00:00:00Z'
        };

        expect(corporateFields.pageType).toBe(type);
      });
    });

    it('should define ResourcePageSkeleton with correct resource types', () => {
      const resourceTypes: ResourcePageSkeleton['fields']['resourceType'][] = [
        'calculators',
        'guides',
        'tools'
      ];

      resourceTypes.forEach(type => {
        const resourceFields: ResourcePageSkeleton['fields'] = {
          title: 'Resource Page',
          slug: 'resource-slug',
          resourceType: type,
          description: 'Resource description',
          resources: [],
          categories: [],
          seoTitle: 'Resource',
          seoDescription: 'Resource description',
          seoKeywords: 'resource',
          publishedAt: '2024-01-01T00:00:00Z'
        };

        expect(resourceFields.resourceType).toBe(type);
      });
    });

    it('should define CalculatorSkeleton with correct calculator types', () => {
      const calculatorTypes: CalculatorSkeleton['fields']['calculatorType'][] = [
        'loan-emi',
        'insurance-premium',
        'investment-returns',
        'tax-savings'
      ];

      calculatorTypes.forEach(type => {
        const calculatorFields: CalculatorSkeleton['fields'] = {
          title: 'Calculator',
          slug: 'calculator-slug',
          calculatorType: type,
          description: 'Calculator description',
          inputFields: [],
          formula: 'formula',
          disclaimer: 'disclaimer',
          relatedProducts: [],
          seoTitle: 'Calculator',
          seoDescription: 'Calculator description',
          publishedAt: '2024-01-01T00:00:00Z'
        };

        expect(calculatorFields.calculatorType).toBe(type);
      });
    });

    it('should define SiteNavigationSkeleton correctly', () => {
      const navigationFields: SiteNavigationSkeleton['fields'] = {
        mainNavigation: [],
        footerNavigation: {},
        utilityNavigation: [],
        socialLinks: [],
        legalLinks: []
      };

      expect(Array.isArray(navigationFields.mainNavigation)).toBe(true);
      expect(Array.isArray(navigationFields.socialLinks)).toBe(true);
    });

    it('should define SiteSettingsSkeleton correctly', () => {
      const settingsFields: SiteSettingsSkeleton['fields'] = {
        siteName: 'Navi',
        siteDescription: 'Financial services',
        defaultSeoTitle: 'Navi',
        defaultSeoDescription: 'Financial services',
        contactInfo: {},
        socialMediaLinks: [],
        analyticsConfig: {},
        complianceInfo: {}
      };

      expect(settingsFields.siteName).toBe('Navi');
      expect(Array.isArray(settingsFields.socialMediaLinks)).toBe(true);
    });
  });

  describe('Transformed Content Types', () => {
    it('should define HomePage interface correctly', () => {
      const homePage: HomePage = {
        title: 'Home Page',
        heroHeadline: 'Welcome to Navi',
        heroSubtext: 'Your financial partner',
        heroImage: {} as any,
        heroCtaText: 'Get Started',
        heroCtaLink: '/signup',
        productOverview: [],
        trustIndicators: [],
        ctaSection: {
          headline: 'Ready to start?',
          description: 'Join us today',
          primaryCtaText: 'Sign Up',
          primaryCtaLink: '/signup'
        },
        seoTitle: 'Navi - Home',
        seoDescription: 'Welcome to Navi',
        seoKeywords: 'finance, loans'
      };

      expect(homePage.title).toBe('Home Page');
      expect(homePage.ctaSection.headline).toBe('Ready to start?');
    });

    it('should define ProductPage interface correctly', () => {
      const productPage: ProductPage = {
        title: 'Personal Loan',
        slug: 'personal-loan',
        productType: 'cash-loan',
        heroSection: {
          headline: 'Personal Loans',
          subtext: 'Quick and easy',
          backgroundImage: {} as any,
          ctaText: 'Apply Now',
          ctaLink: '/apply',
          ctaType: 'primary',
          alignment: 'left'
        },
        productDescription: 'Quick personal loans',
        keyFeatures: [],
        eligibilityCriteria: {
          minAge: 21,
          maxAge: 60,
          minIncome: 25000,
          employmentType: ['salaried'],
          creditScore: 650,
          additionalCriteria: []
        },
        applicationProcess: [],
        documentsRequired: [],
        faqs: [],
        relatedProducts: [],
        seoTitle: 'Personal Loan',
        seoDescription: 'Quick personal loans',
        seoKeywords: 'personal loan'
      };

      expect(productPage.productType).toBe('cash-loan');
      expect(productPage.heroSection.ctaType).toBe('primary');
    });

    it('should define CorporatePage interface correctly', () => {
      const corporatePage: CorporatePage = {
        title: 'About Us',
        slug: 'about-us',
        pageType: 'about-us',
        content: {
          nodeType: 'document',
          content: []
        },
        sections: [],
        seoTitle: 'About Us',
        seoDescription: 'Learn about Navi',
        seoKeywords: 'about, company'
      };

      expect(corporatePage.pageType).toBe('about-us');
      expect(corporatePage.content.nodeType).toBe('document');
    });
  });

  describe('Supporting Interfaces', () => {
    it('should define ProductCard interface correctly', () => {
      const productCard: ProductCard = {
        title: 'UPI Payments',
        description: 'Instant digital payments',
        icon: {} as any,
        link: '/upi',
        features: ['Instant transfers', 'Secure payments']
      };

      expect(productCard.title).toBe('UPI Payments');
      expect(Array.isArray(productCard.features)).toBe(true);
    });

    it('should define TrustIndicator interface correctly', () => {
      const trustIndicator: TrustIndicator = {
        metric: 'Users',
        value: '1M+',
        description: 'Happy customers'
      };

      expect(trustIndicator.metric).toBe('Users');
      expect(trustIndicator.value).toBe('1M+');
    });

    it('should define CTASection interface correctly', () => {
      const ctaSection: CTASection = {
        headline: 'Ready to start?',
        description: 'Join us today',
        primaryCtaText: 'Sign Up',
        primaryCtaLink: '/signup',
        secondaryCtaText: 'Learn More',
        secondaryCtaLink: '/about'
      };

      expect(ctaSection.headline).toBe('Ready to start?');
      expect(ctaSection.secondaryCtaText).toBe('Learn More');
    });

    it('should define HeroSection interface correctly', () => {
      const heroSection: HeroSection = {
        headline: 'Welcome to Navi',
        subtext: 'Your financial partner',
        backgroundImage: {} as any,
        ctaText: 'Get Started',
        ctaLink: '/signup',
        ctaType: 'primary',
        alignment: 'center'
      };

      expect(heroSection.ctaType).toBe('primary');
      expect(heroSection.alignment).toBe('center');
    });

    it('should define EligibilityCriteria interface correctly', () => {
      const criteria: EligibilityCriteria = {
        minAge: 21,
        maxAge: 60,
        minIncome: 25000,
        employmentType: ['salaried', 'self-employed'],
        creditScore: 650,
        additionalCriteria: ['Valid ID', 'Address proof']
      };

      expect(criteria.minAge).toBe(21);
      expect(Array.isArray(criteria.employmentType)).toBe(true);
    });

    it('should define InterestRateInfo interface correctly', () => {
      const rateInfo: InterestRateInfo = {
        minRate: 10.99,
        maxRate: 24.99,
        rateType: 'floating',
        factors: ['Credit score', 'Income', 'Employment type']
      };

      expect(rateInfo.rateType).toBe('floating');
      expect(Array.isArray(rateInfo.factors)).toBe(true);
    });

    it('should define Calculator interface correctly', () => {
      const calculator: Calculator = {
        type: 'loan-emi',
        title: 'EMI Calculator',
        description: 'Calculate your loan EMI',
        inputFields: [],
        formula: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1]',
        disclaimer: 'Results are indicative'
      };

      expect(calculator.type).toBe('loan-emi');
      expect(calculator.formula).toContain('EMI');
    });

    it('should define CalculatorField interface correctly', () => {
      const field: CalculatorField = {
        name: 'loanAmount',
        label: 'Loan Amount',
        type: 'number',
        min: 10000,
        max: 5000000,
        step: 1000,
        defaultValue: 100000,
        required: true
      };

      expect(field.type).toBe('number');
      expect(field.required).toBe(true);
    });

    it('should define FAQ interface correctly', () => {
      const faq: FAQ = {
        question: 'What is the minimum loan amount?',
        answer: {
          nodeType: 'document',
          content: []
        },
        category: 'loans',
        order: 1
      };

      expect(faq.question).toContain('minimum loan amount');
      expect(faq.order).toBe(1);
    });
  });

  describe('Navigation Types', () => {
    it('should define NavigationItem interface correctly', () => {
      const navItem: NavigationItem = {
        label: 'Products',
        url: '/products',
        children: [
          {
            label: 'Loans',
            url: '/loans'
          }
        ],
        external: false
      };

      expect(navItem.label).toBe('Products');
      expect(Array.isArray(navItem.children)).toBe(true);
      expect(navItem.external).toBe(false);
    });

    it('should define SiteNavigation interface correctly', () => {
      const siteNav: SiteNavigation = {
        mainNavigation: [
          { label: 'Home', url: '/' },
          { label: 'Products', url: '/products' }
        ],
        footerNavigation: {
          products: [{ label: 'UPI', url: '/upi' }],
          company: [{ label: 'About', url: '/about' }],
          resources: [{ label: 'Calculators', url: '/calculators' }],
          legal: [{ label: 'Privacy', url: '/privacy' }]
        }
      };

      expect(Array.isArray(siteNav.mainNavigation)).toBe(true);
      expect(siteNav.footerNavigation.products).toBeDefined();
    });
  });

  describe('SEO and Analytics Types', () => {
    it('should define SEOData interface correctly', () => {
      const seoData: SEOData = {
        title: 'Navi - Financial Services',
        description: 'Comprehensive financial solutions',
        keywords: ['finance', 'loans', 'insurance'],
        canonicalUrl: 'https://navi.com',
        noIndex: false
      };

      expect(seoData.title).toBe('Navi - Financial Services');
      expect(Array.isArray(seoData.keywords)).toBe(true);
      expect(seoData.noIndex).toBe(false);
    });

    it('should define AnalyticsEvent interface correctly', () => {
      const event: AnalyticsEvent = {
        event: 'button_click',
        category: 'engagement',
        action: 'click',
        label: 'cta_button',
        value: 1
      };

      expect(event.event).toBe('button_click');
      expect(event.category).toBe('engagement');
      expect(event.value).toBe(1);
    });
  });

  describe('Content Structure Types', () => {
    it('should define RichTextContent interface correctly', () => {
      const richText: RichTextContent = {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Hello world'
              }
            ]
          }
        ]
      };

      expect(richText.nodeType).toBe('document');
      expect(Array.isArray(richText.content)).toBe(true);
    });

    it('should define ContentSection interface correctly', () => {
      const section: ContentSection = {
        title: 'About Our Services',
        content: {
          nodeType: 'document',
          content: []
        },
        layout: 'two-column',
        backgroundColor: '#f8f9fa'
      };

      expect(section.layout).toBe('two-column');
      expect(section.backgroundColor).toBe('#f8f9fa');
    });

    it('should define TeamMember interface correctly', () => {
      const member: TeamMember = {
        name: 'John Doe',
        position: 'CEO',
        bio: 'Experienced leader in fintech',
        image: {} as any,
        linkedIn: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe'
      };

      expect(member.name).toBe('John Doe');
      expect(member.position).toBe('CEO');
    });

    it('should define CompanyStat interface correctly', () => {
      const stat: CompanyStat = {
        metric: 'Users',
        value: '1M+',
        description: 'Happy customers worldwide'
      };

      expect(stat.metric).toBe('Users');
      expect(stat.value).toBe('1M+');
    });

    it('should define TimelineEvent interface correctly', () => {
      const event: TimelineEvent = {
        year: '2020',
        title: 'Company Founded',
        description: 'Navi was established to revolutionize financial services'
      };

      expect(event.year).toBe('2020');
      expect(event.title).toBe('Company Founded');
    });
  });

  describe('Type Consistency', () => {
    it('should have consistent SEO fields across content types', () => {
      // All main content types should have consistent SEO fields
      const homePageSeoFields: (keyof HomePageSkeleton['fields'])[] = ['seoTitle', 'seoDescription', 'seoKeywords'];
      const productPageSeoFields: (keyof ProductPageSkeleton['fields'])[] = ['seoTitle', 'seoDescription', 'seoKeywords'];
      const corporatePageSeoFields: (keyof CorporatePageSkeleton['fields'])[] = ['seoTitle', 'seoDescription', 'seoKeywords'];

      expect(homePageSeoFields).toEqual(productPageSeoFields);
      expect(productPageSeoFields).toEqual(corporatePageSeoFields);
    });

    it('should have consistent publishedAt fields across content types', () => {
      // All main content types should have publishedAt field
      const contentTypes = [
        'publishedAt' as keyof HomePageSkeleton['fields'],
        'publishedAt' as keyof ProductPageSkeleton['fields'],
        'publishedAt' as keyof CorporatePageSkeleton['fields'],
        'publishedAt' as keyof ResourcePageSkeleton['fields'],
        'publishedAt' as keyof CalculatorSkeleton['fields']
      ];

      contentTypes.forEach(field => {
        expect(field).toBe('publishedAt');
      });
    });

    it('should have consistent slug fields for routable content', () => {
      // Content types that need routing should have slug fields
      const routableTypes = [
        'slug' as keyof ProductPageSkeleton['fields'],
        'slug' as keyof CorporatePageSkeleton['fields'],
        'slug' as keyof ResourcePageSkeleton['fields'],
        'slug' as keyof CalculatorSkeleton['fields']
      ];

      routableTypes.forEach(field => {
        expect(field).toBe('slug');
      });
    });
  });

  describe('Financial Product Types', () => {
    it('should support all required financial products', () => {
      const requiredProducts: ProductPageSkeleton['fields']['productType'][] = [
        'upi',
        'cash-loan',
        'home-loan',
        'health-insurance',
        'mutual-funds'
      ];

      // Verify all required products are supported
      requiredProducts.forEach(product => {
        expect(['upi', 'cash-loan', 'home-loan', 'health-insurance', 'mutual-funds']).toContain(product);
      });
    });

    it('should support all required calculator types', () => {
      const requiredCalculators: CalculatorSkeleton['fields']['calculatorType'][] = [
        'loan-emi',
        'insurance-premium',
        'investment-returns',
        'tax-savings'
      ];

      requiredCalculators.forEach(calculator => {
        expect(['loan-emi', 'insurance-premium', 'investment-returns', 'tax-savings']).toContain(calculator);
      });
    });
  });

  describe('Global Window Types', () => {
    it('should extend Window interface for analytics', () => {
      // This test verifies that the global Window interface is properly extended
      // The actual type checking happens at compile time
      if (typeof window !== 'undefined') {
        // These properties should be available due to the global declaration
        expect(typeof window.gtag).toBe('undefined'); // Initially undefined
        expect(typeof window.plausible).toBe('undefined'); // Initially undefined
      }
    });
  });
});
