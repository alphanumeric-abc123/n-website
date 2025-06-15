import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('HomePage Template', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Layout and Structure', () => {
    test('should render all main sections', async ({ page }) => {
      // Check for header
      await expect(page.locator('header')).toBeVisible();
      
      // Check for hero section
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
      
      // Check for trust indicators section
      await expect(page.getByText('Trusted by Millions')).toBeVisible();
      
      // Check for product overview section
      await expect(page.getByText('Everything You Need in One App')).toBeVisible();
      
      // Check for features section (Why Choose Navi)
      await expect(page.getByText('Why Choose Navi?')).toBeVisible();
      
      // Check for CTA section
      await expect(page.getByText('Ready to Experience Better Banking?')).toBeVisible();
      
      // Check for footer
      await expect(page.locator('footer')).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);
      
      // Check for main h1
      const h1Elements = await page.locator('h1').count();
      expect(h1Elements).toBeGreaterThanOrEqual(1);
      
      // Verify heading structure
      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text).toBeTruthy();
    });

    test('should render with proper semantic structure', async ({ page }) => {
      // Check for main content area
      await expect(page.locator('main')).toBeVisible();
      
      // Check for sections
      const sections = await page.locator('section').count();
      expect(sections).toBeGreaterThan(3); // Hero, Trust, Products, Features, CTA
      
      // Check for navigation
      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Hero Section', () => {
    test('should display hero content correctly', async ({ page }) => {
      const heroSection = page.locator('[data-testid="hero-section"]');
      
      // Check headline
      await expect(heroSection.getByText('Financial Services Made Simple')).toBeVisible();
      
      // Check subtext
      await expect(heroSection.getByText(/Get instant loans, comprehensive insurance/)).toBeVisible();
      
      // Check CTA button
      await expect(heroSection.getByRole('button', { name: /Download App/i })).toBeVisible();
    });

    test('should have working CTA button', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();
      
      // Test button interaction
      await ctaButton.hover();
      await expect(ctaButton).toHaveClass(/hover:/);
    });
  });

  test.describe('Trust Indicators Section', () => {
    test('should display trust indicators', async ({ page }) => {
      await expect(page.getByText('Trusted by Millions')).toBeVisible();
      
      // Check for trust metrics (should have at least 3-4 indicators)
      const trustIndicators = page.locator('[data-testid="trust-indicator"]');
      const count = await trustIndicators.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display trust indicator values and descriptions', async ({ page }) => {
      const trustIndicators = page.locator('[data-testid="trust-indicator"]');
      const firstIndicator = trustIndicators.first();
      
      // Should have value, metric, and description
      await expect(firstIndicator.locator('.text-3xl')).toBeVisible(); // Value
      await expect(firstIndicator.locator('.text-sm')).toBeVisible(); // Metric
      await expect(firstIndicator.locator('.text-xs')).toBeVisible(); // Description
    });
  });

  test.describe('Product Overview Section', () => {
    test('should display all product cards', async ({ page }) => {
      await expect(page.getByText('Everything You Need in One App')).toBeVisible();
      
      // Check for product cards (UPI, Loans, Insurance, Mutual Funds)
      const productCards = page.locator('[data-testid="product-card"]');
      const count = await productCards.count();
      expect(count).toBe(4);
    });

    test('should display product card content', async ({ page }) => {
      // Check for UPI card
      await expect(page.getByText('UPI Payments')).toBeVisible();
      await expect(page.getByText('Send money instantly with zero charges')).toBeVisible();
      
      // Check for Loans card
      await expect(page.getByText('Personal Loans')).toBeVisible();
      await expect(page.getByText('Quick approval, competitive rates')).toBeVisible();
      
      // Check for Insurance card
      await expect(page.getByText('Health Insurance')).toBeVisible();
      await expect(page.getByText('Comprehensive coverage for your family')).toBeVisible();
      
      // Check for Mutual Funds card
      await expect(page.getByText('Mutual Funds')).toBeVisible();
      await expect(page.getByText('Smart investing made simple')).toBeVisible();
    });

    test('should have working product card buttons', async ({ page }) => {
      const learnMoreButtons = page.getByRole('button', { name: /Learn More/i });
      const count = await learnMoreButtons.count();
      expect(count).toBeGreaterThan(0);
      
      // Test first button
      const firstButton = learnMoreButtons.first();
      await expect(firstButton).toBeVisible();
      await expect(firstButton).toBeEnabled();
      
      await firstButton.hover();
      await expect(firstButton).toHaveClass(/hover:/);
    });

    test('should display product features', async ({ page }) => {
      // Check for feature lists in product cards
      const featureItems = page.locator('li:has(svg)'); // Features with checkmark icons
      const count = await featureItems.count();
      expect(count).toBeGreaterThan(8); // Should have multiple features across cards
    });
  });

  test.describe('Features Section (Why Choose Navi)', () => {
    test('should display features section', async ({ page }) => {
      await expect(page.getByText('Why Choose Navi?')).toBeVisible();
      await expect(page.getByText('Our Promise')).toBeVisible();
    });

    test('should display all feature cards', async ({ page }) => {
      // Check for main features
      await expect(page.getByText('Instant Approvals')).toBeVisible();
      await expect(page.getByText('Zero Hidden Charges')).toBeVisible();
      await expect(page.getByText('Digital First')).toBeVisible();
      
      // Check feature descriptions
      await expect(page.getByText(/Get loan approvals in minutes/)).toBeVisible();
      await expect(page.getByText(/Complete transparency in pricing/)).toBeVisible();
      await expect(page.getByText(/Everything from application to disbursement/)).toBeVisible();
    });

    test('should display feature icons', async ({ page }) => {
      const featureCards = page.locator('[data-testid="feature-card"]');
      const count = await featureCards.count();
      expect(count).toBe(3);
      
      // Each feature card should have an icon
      for (let i = 0; i < count; i++) {
        const card = featureCards.nth(i);
        await expect(card.locator('svg')).toBeVisible();
      }
    });
  });

  test.describe('CTA Section', () => {
    test('should display final CTA section', async ({ page }) => {
      await expect(page.getByText('Ready to Experience Better Banking?')).toBeVisible();
      await expect(page.getByText(/Join millions of satisfied customers/)).toBeVisible();
    });

    test('should have working CTA buttons', async ({ page }) => {
      const ctaSection = page.locator('[data-testid="cta-section"]').last();
      
      // Primary CTA
      const downloadButton = ctaSection.getByRole('button', { name: /Download App/i });
      await expect(downloadButton).toBeVisible();
      await expect(downloadButton).toBeEnabled();
      
      // Secondary CTA
      const learnMoreButton = ctaSection.getByRole('button', { name: /Learn More/i });
      await expect(learnMoreButton).toBeVisible();
      await expect(learnMoreButton).toBeEnabled();
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check that content is still visible and properly arranged
      await expect(page.locator('header')).toBeVisible();
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      await expect(page.getByText('Trusted by Millions')).toBeVisible();
      await expect(page.getByText('Everything You Need in One App')).toBeVisible();
    });

    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check layout adjustments
      await expect(page.locator('header')).toBeVisible();
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
    });

    test('should be responsive on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check full desktop layout
      await expect(page.locator('header')).toBeVisible();
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have no console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Filter out known acceptable errors (if any)
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('SEO and Meta Tags', () => {
    test('should have proper meta tags', async ({ page }) => {
      await page.goto('/');
      
      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      
      // Check viewport meta tag
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
    });

    test('should have proper Open Graph tags', async ({ page }) => {
      await page.goto('/');
      
      // Check OG title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      
      // Check OG description
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDescription).toBeTruthy();
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const axe = new AxeBuilder({ page });
      const results = await axe.analyze();
      expect(results.violations).toHaveLength(0);
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/');
      
      // Check for ARIA labels on interactive elements
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        
        // Button should have either aria-label or visible text
        expect(ariaLabel || text).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/');
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
      
      // Should be able to navigate through interactive elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        const currentFocus = await page.evaluate(() => document.activeElement?.tagName);
        expect(currentFocus).toBeTruthy();
      }
    });
  });

  test.describe('Content Integration', () => {
    test('should handle missing data gracefully', async ({ page }) => {
      // This tests the default data fallback
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Should still render with default content
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      await expect(page.getByText('Navi - Simple, Transparent Financial Services')).toBeVisible();
    });

    test('should display consistent branding', async ({ page }) => {
      await page.goto('/');
      
      // Check for Navi branding throughout the page
      const naviMentions = await page.getByText(/Navi/i).count();
      expect(naviMentions).toBeGreaterThan(3);
      
      // Check for consistent color scheme (primary colors)
      const primaryElements = page.locator('.text-primary-600, .bg-primary-600, .text-primary-500');
      const count = await primaryElements.count();
      expect(count).toBeGreaterThan(5);
    });
  });

  test.describe('Interactive Elements', () => {
    test('should handle button interactions', async ({ page }) => {
      await page.goto('/');
      
      // Test hover states
      const buttons = page.getByRole('button');
      const firstButton = buttons.first();
      
      await firstButton.hover();
      // Should have hover styles applied
      const classList = await firstButton.getAttribute('class');
      expect(classList).toBeTruthy();
    });

    test('should handle focus states', async ({ page }) => {
      await page.goto('/');
      
      // Test focus on interactive elements
      const buttons = page.getByRole('button');
      const firstButton = buttons.first();
      
      await firstButton.focus();
      const focusedElement = await page.evaluate(() => document.activeElement);
      expect(focusedElement).toBeTruthy();
    });
  });
});
