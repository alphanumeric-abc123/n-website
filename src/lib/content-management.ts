/**
 * Content Management Utilities for Navi.com
 * Phase 2: Content Architecture & CMS Setup
 * 
 * Utilities for managing content workflows, validation, and transformations
 */

import { 
  getHomePage, 
  getProductPages, 
  getCorporatePages, 
  getResourcePages,
  getCalculators,
  getSiteNavigation,
  getSiteSettings,
  transformHomePage,
  transformProductPage,
  transformCorporatePage
} from './contentful';

import type { 
  HomePage, 
  ProductPage, 
  CorporatePage,
  HomePageSkeleton,
  ProductPageSkeleton,
  CorporatePageSkeleton
} from '@/types/contentful';

// =============================================================================
// CONTENT VALIDATION
// =============================================================================

export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHomePage(homePage: HomePage): ContentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!homePage.title) errors.push('Title is required');
  if (!homePage.heroHeadline) errors.push('Hero headline is required');
  if (!homePage.heroSubtext) errors.push('Hero subtext is required');
  if (!homePage.seoTitle) errors.push('SEO title is required');
  if (!homePage.seoDescription) errors.push('SEO description is required');

  // SEO validation
  if (homePage.seoTitle && homePage.seoTitle.length > 60) {
    warnings.push('SEO title should be under 60 characters for optimal display');
  }
  if (homePage.seoDescription && homePage.seoDescription.length > 160) {
    warnings.push('SEO description should be under 160 characters for optimal display');
  }

  // Content validation
  if (homePage.productOverview && homePage.productOverview.length === 0) {
    warnings.push('Consider adding product overview cards to showcase Navi products');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateProductPage(productPage: ProductPage): ContentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  if (!productPage.title) errors.push('Title is required');
  if (!productPage.slug) errors.push('Slug is required');
  if (!productPage.productType) errors.push('Product type is required');
  if (!productPage.productDescription) errors.push('Product description is required');

  // Slug validation
  if (productPage.slug && !/^[a-z0-9-]+$/.test(productPage.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  // Product-specific validation
  if (['cash-loan', 'home-loan'].includes(productPage.productType)) {
    if (!productPage.interestRates) {
      warnings.push('Interest rates information is recommended for loan products');
    }
    if (!productPage.eligibilityCriteria) {
      warnings.push('Eligibility criteria is recommended for loan products');
    }
  }

  if (productPage.productType === 'health-insurance') {
    if (!productPage.eligibilityCriteria) {
      warnings.push('Eligibility criteria is recommended for insurance products');
    }
  }

  // SEO validation
  if (productPage.seoTitle && productPage.seoTitle.length > 60) {
    warnings.push('SEO title should be under 60 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// =============================================================================
// CONTENT WORKFLOWS
// =============================================================================

export interface ContentWorkflowStatus {
  contentType: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  lastModified: string;
  assignee?: string;
  reviewNotes?: string[];
}

export class ContentWorkflow {
  private workflows: Map<string, ContentWorkflowStatus> = new Map();

  addContent(id: string, contentType: string, status: ContentWorkflowStatus['status'] = 'draft') {
    this.workflows.set(id, {
      contentType,
      status,
      lastModified: new Date().toISOString(),
    });
  }

  updateStatus(id: string, status: ContentWorkflowStatus['status'], assignee?: string) {
    const workflow = this.workflows.get(id);
    if (workflow) {
      workflow.status = status;
      workflow.lastModified = new Date().toISOString();
      if (assignee) workflow.assignee = assignee;
    }
  }

  addReviewNote(id: string, note: string) {
    const workflow = this.workflows.get(id);
    if (workflow) {
      if (!workflow.reviewNotes) workflow.reviewNotes = [];
      workflow.reviewNotes.push(note);
    }
  }

  getWorkflowStatus(id: string): ContentWorkflowStatus | undefined {
    return this.workflows.get(id);
  }

  getContentByStatus(status: ContentWorkflowStatus['status']): Array<{ id: string; workflow: ContentWorkflowStatus }> {
    const result: Array<{ id: string; workflow: ContentWorkflowStatus }> = [];
    this.workflows.forEach((workflow, id) => {
      if (workflow.status === status) {
        result.push({ id, workflow });
      }
    });
    return result;
  }
}

// =============================================================================
// CONTENT MIGRATION UTILITIES
// =============================================================================

export interface MigrationTask {
  id: string;
  title: string;
  sourceUrl: string;
  targetContentType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  extractedContent?: any;
  errors?: string[];
}

export class ContentMigration {
  private tasks: Map<string, MigrationTask> = new Map();

  // Define migration tasks based on PRD requirements
  initializeMigrationTasks() {
    const migrationTasks: Omit<MigrationTask, 'id'>[] = [
      {
        title: 'Homepage Content',
        sourceUrl: 'https://navi.com/',
        targetContentType: 'homePage',
        status: 'pending'
      },
      {
        title: 'UPI Product Page',
        sourceUrl: 'https://navi.com/', // UPI info is on homepage
        targetContentType: 'productPage',
        status: 'pending'
      },
      {
        title: 'Health Insurance Product Page',
        sourceUrl: 'https://navi.com/health-insurance',
        targetContentType: 'productPage',
        status: 'pending'
      },
      {
        title: 'Mutual Fund Product Page',
        sourceUrl: 'https://navi.com/mutual-fund',
        targetContentType: 'productPage',
        status: 'pending'
      },
      {
        title: 'Cash & Home Loans Product Page',
        sourceUrl: 'https://navi.com/finserv',
        targetContentType: 'productPage',
        status: 'pending'
      },
      {
        title: 'About Us Corporate Page',
        sourceUrl: 'https://navi.com/about-us',
        targetContentType: 'corporatePage',
        status: 'pending'
      },
      {
        title: 'Careers Corporate Page',
        sourceUrl: 'https://navi.com/careers',
        targetContentType: 'corporatePage',
        status: 'pending'
      }
    ];

    migrationTasks.forEach((task, index) => {
      const id = `migration-${index + 1}`;
      this.tasks.set(id, { ...task, id });
    });
  }

  getMigrationTasks(): MigrationTask[] {
    return Array.from(this.tasks.values());
  }

  updateTaskStatus(id: string, status: MigrationTask['status'], extractedContent?: any, errors?: string[]) {
    const task = this.tasks.get(id);
    if (task) {
      task.status = status;
      if (extractedContent) task.extractedContent = extractedContent;
      if (errors) task.errors = errors;
    }
  }

  getTasksByStatus(status: MigrationTask['status']): MigrationTask[] {
    return Array.from(this.tasks.values()).filter(task => task.status === status);
  }
}

// =============================================================================
// CONTENT AUDIT UTILITIES
// =============================================================================

export interface ContentAuditResult {
  totalPages: number;
  contentTypes: Record<string, number>;
  seoIssues: Array<{
    page: string;
    issues: string[];
  }>;
  missingContent: string[];
  recommendations: string[];
}

export async function auditExistingContent(): Promise<ContentAuditResult> {
  try {
    const [homePage, productPages, corporatePages, resourcePages] = await Promise.all([
      getHomePage(),
      getProductPages(),
      getCorporatePages(),
      getResourcePages()
    ]);

    const contentTypes: Record<string, number> = {
      homePage: homePage ? 1 : 0,
      productPage: productPages.length,
      corporatePage: corporatePages.length,
      resourcePage: resourcePages.length
    };

    const totalPages = Object.values(contentTypes).reduce((sum, count) => sum + count, 0);

    const seoIssues: Array<{ page: string; issues: string[] }> = [];
    const missingContent: string[] = [];
    const recommendations: string[] = [];

    // Audit homepage
    if (homePage) {
      const homePageData = transformHomePage(homePage);
      const validation = validateHomePage(homePageData);
      if (validation.errors.length > 0 || validation.warnings.length > 0) {
        seoIssues.push({
          page: 'Homepage',
          issues: [...validation.errors, ...validation.warnings]
        });
      }
    } else {
      missingContent.push('Homepage content');
    }

    // Audit product pages
    const requiredProducts = ['upi', 'cash-loan', 'home-loan', 'health-insurance', 'mutual-funds'];
    const existingProducts = productPages.map(p => p.fields.productType);
    const missingProducts = requiredProducts.filter(product => !existingProducts.includes(product));
    
    missingProducts.forEach(product => {
      missingContent.push(`${product} product page`);
    });

    // Generate recommendations
    if (totalPages < 10) {
      recommendations.push('Create remaining page templates to reach the target of 10 core page templates');
    }

    if (seoIssues.length > 0) {
      recommendations.push('Address SEO issues to improve organic search performance');
    }

    if (missingContent.length > 0) {
      recommendations.push('Complete missing content to ensure comprehensive product coverage');
    }

    return {
      totalPages,
      contentTypes,
      seoIssues,
      missingContent,
      recommendations
    };

  } catch (error) {
    console.error('Content audit failed:', error);
    return {
      totalPages: 0,
      contentTypes: {},
      seoIssues: [],
      missingContent: ['Unable to audit content due to connection issues'],
      recommendations: ['Verify Contentful connection and try again']
    };
  }
}

// =============================================================================
// CONTENT PREVIEW UTILITIES
// =============================================================================

export interface PreviewConfig {
  secret: string;
  enabled: boolean;
}

export function generatePreviewUrl(contentType: string, slug: string, secret: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/api/preview?secret=${secret}&contentType=${contentType}&slug=${slug}`;
}

export function validatePreviewSecret(secret: string): boolean {
  const expectedSecret = process.env.CONTENTFUL_PREVIEW_SECRET;
  return Boolean(expectedSecret && secret === expectedSecret);
}

// =============================================================================
// EXPORT UTILITIES
// =============================================================================

// Initialize global instances
export const contentWorkflow = new ContentWorkflow();
export const contentMigration = new ContentMigration();

// Initialize migration tasks
contentMigration.initializeMigrationTasks();
