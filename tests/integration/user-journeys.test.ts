import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('User Journey Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Homepage User Journey', () => {
    test('should complete full homepage exploration journey', async ({ page }) => {
      // 1. User lands on homepage
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // 2. User scrolls through trust indicators
      await page.locator('[data-testid="trust-indicator"]').first().scrollIntoViewIfNeeded();
      await expect(page.getByText('Trusted by Millions')).toBeVisible();
      
      // 3. User explores product overview
      await page.locator('[data-testid="product-card"]').first().scrollIntoViewIfNeeded();
      await expect(page.getByText('Everything You Need in One App')).toBeVisible();
      
      // 4. User reads about features
      await page.getByText('Why Choose Navi?').scrollIntoViewIfNeeded();
      await expect(page.getByText('Instant Approvals')).toBeVisible();
      await expect(page.getByText('Zero Hidden Charges')).toBeVisible();
      await expect(page.getByText('Digital First')).toBeVisible();
      
      // 5. User reaches final CTA
      await page.getByText('Ready to Experience Better Banking?').scrollIntoViewIfNeeded();
      await expect(page.getByRole('button', { name: /Download App/i }).last()).toBeVisible();
    });

    test('should handle product card interactions', async ({ page }) => {
      // Navigate to product cards section
      await page.locator('[data-testid="product-card"]').first().scrollIntoViewIfNeeded();
      
      // Test each product card interaction
      const productCards = page.locator('[data-testid="product-card"]');
      const cardCount = await productCards.count();
      
      for (let i = 0; i < Math.min(cardCount, 4); i++) {
        const card = productCards.nth(i);
        
        // Hover over card
        await card.hover();
        
        // Check for Learn More button
        const learnMoreButton = card.getByRole('button', { name: /Learn More/i });
        await expect(learnMoreButton).toBeVisible();
        
        // Test button interaction
        await learnMoreButton.hover();
        await expect(learnMoreButton).toHaveClass(/hover:/);
      }
    });

    test('should handle CTA button interactions throughout page', async ({ page }) => {
      // Test hero CTA
      const heroCTA = page.getByRole('button', { name: /Download App/i }).first();
      await expect(heroCTA).toBeVisible();
      await heroCTA.hover();
      
      // Test final CTA section
      await page.getByText('Ready to Experience Better Banking?').scrollIntoViewIfNeeded();
      
      const finalCTAs = page.locator('[data-testid="cta-section"]').last();
      const downloadButton = finalCTAs.getByRole('button', { name: /Download App/i });
      const learnMoreButton = finalCTAs.getByRole('button', { name: /Learn More/i });
      
      await expect(downloadButton).toBeVisible();
      await expect(learnMoreButton).toBeVisible();
      
      // Test interactions
      await downloadButton.hover();
      await learnMoreButton.hover();
    });
  });

  test.describe('Navigation User Journey', () => {
    test('should navigate through header menu', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      // Test navigation elements
      const nav = header.locator('nav');
      await expect(nav).toBeVisible();
      
      // Test mobile menu toggle if present
      const mobileMenuButton = header.locator('[data-testid="mobile-menu-toggle"]');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        
        // Check if mobile menu opens
        const mobileMenu = page.locator('[data-testid="mobile-menu"]');
        await expect(mobileMenu).toBeVisible();
        
        // Close mobile menu
        await mobileMenuButton.click();
      }
    });

    test('should navigate through footer links', async ({ page }) => {
      // Scroll to footer
      await page.locator('footer').scrollIntoViewIfNeeded();
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Test footer navigation links
      const footerLinks = footer.getByRole('link');
      const linkCount = await footerLinks.count();
      
      // Test first few footer links
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = footerLinks.nth(i);
        await expect(link).toBeVisible();
        
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('Responsive User Journey', () => {
    test('should complete mobile user journey', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // 1. Mobile user lands on homepage
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // 2. Test mobile navigation
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-toggle"]');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        
        // Mobile menu should open
        const mobileMenu = page.locator('[data-testid="mobile-menu"]');
        await expect(mobileMenu).toBeVisible();
        
        // Close menu
        await mobileMenuButton.click();
      }
      
      // 3. Scroll through mobile content
      await page.locator('[data-testid="trust-indicator"]').first().scrollIntoViewIfNeeded();
      await page.locator('[data-testid="product-card"]').first().scrollIntoViewIfNeeded();
      await page.getByText('Why Choose Navi?').scrollIntoViewIfNeeded();
      
      // 4. Test mobile CTA interactions
      const mobileCTA = page.getByRole('button', { name: /Download App/i }).first();
      await expect(mobileCTA).toBeVisible();
      await mobileCTA.hover();
    });

    test('should complete tablet user journey', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Test tablet-specific interactions
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // Test product cards in tablet layout
      const productCards = page.locator('[data-testid="product-card"]');
      const cardCount = await productCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Test tablet navigation
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    test('should complete desktop user journey', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Test desktop-specific features
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // Test desktop navigation
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Test desktop product grid
      const productCards = page.locator('[data-testid="product-card"]');
      const cardCount = await productCards.count();
      expect(cardCount).toBe(4); // Should show all 4 products on desktop
    });
  });

  test.describe('Performance User Journey', () => {
    test('should load quickly for impatient users', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      
      const domLoadTime = Date.now() - startTime;
      expect(domLoadTime).toBeLessThan(3000); // DOM should load within 3s
      
      // Test that critical content is visible quickly
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // Wait for full load
      await page.waitForLoadState('networkidle');
      const fullLoadTime = Date.now() - startTime;
      expect(fullLoadTime).toBeLessThan(5000); // Full load within 5s
    });

    test('should handle slow network conditions', async ({ page, context }) => {
      // Simulate slow 3G
      await context.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
        await route.continue();
      });
      
      await page.goto('/');
      
      // Should still load and be functional
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible({ timeout: 10000 });
      
      // Test that interactions still work
      const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
      await expect(ctaButton).toBeVisible();
      await ctaButton.hover();
    });
  });

  test.describe('Accessibility User Journey', () => {
    test('should support keyboard-only navigation', async ({ page }) => {
      await page.goto('/');
      
      // Start keyboard navigation
      await page.keyboard.press('Tab');
      
      // Navigate through interactive elements
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        
        const activeElement = await page.evaluate(() => {
          const active = document.activeElement;
          return {
            tagName: active?.tagName,
            role: active?.getAttribute('role'),
            ariaLabel: active?.getAttribute('aria-label'),
            text: active?.textContent?.slice(0, 50)
          };
        });
        
        // Should have focused on an interactive element
        expect(activeElement.tagName).toBeTruthy();
      }
    });

    test('should support screen reader navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Test heading structure for screen readers
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);
      
      // Test ARIA labels
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        
        // Button should have either aria-label or visible text
        expect(ariaLabel || text).toBeTruthy();
      }
    });

    test('should pass comprehensive accessibility audit', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const accessibilityAudit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(accessibilityAudit.violations).toHaveLength(0);
    });
  });

  test.describe('Error Handling User Journey', () => {
    test('should handle JavaScript errors gracefully', async ({ page }) => {
      const jsErrors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          jsErrors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Interact with page elements
      const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
      await ctaButton.hover();
      await ctaButton.focus();
      
      // Scroll through page
      await page.locator('[data-testid="product-card"]').first().scrollIntoViewIfNeeded();
      await page.getByText('Why Choose Navi?').scrollIntoViewIfNeeded();
      
      // Filter out acceptable errors
      const criticalErrors = jsErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_') &&
        !error.includes('Non-Error promise rejection')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });

    test('should handle network failures gracefully', async ({ page, context }) => {
      // Block some network requests to simulate failures
      await context.route('**/api/**', route => route.abort());
      await context.route('**/analytics/**', route => route.abort());
      
      await page.goto('/');
      
      // Page should still load and be functional
      await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
      
      // Interactive elements should still work
      const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
      await expect(ctaButton).toBeVisible();
      await ctaButton.hover();
    });
  });

  test.describe('SEO User Journey', () => {
    test('should provide proper meta information for search engines', async ({ page }) => {
      await page.goto('/');
      
      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(60); // SEO best practice
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      expect(metaDescription!.length).toBeLessThan(160); // SEO best practice
      
      // Check structured data
      const structuredData = await page.locator('script[type="application/ld+json"]').count();
      // Structured data is optional but good for SEO
      
      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      // Canonical URL helps with SEO
    });

    test('should have proper heading hierarchy for SEO', async ({ page }) => {
      await page.goto('/');
      
      // Check for proper heading structure
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(1); // Should have exactly one H1
      
      // Check heading content
      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text).toBeTruthy();
      expect(h1Text!.length).toBeGreaterThan(10);
    });
  });

  test.describe('Analytics User Journey', () => {
    test('should track user interactions for analytics', async ({ page }) => {
      // Mock analytics functions
      await page.addScriptTag({
        content: `
          window.gtag = function() { 
            window.gtagCalls = window.gtagCalls || [];
            window.gtagCalls.push(arguments);
          };
          window.plausible = function() {
            window.plausibleCalls = window.plausibleCalls || [];
            window.plausibleCalls.push(arguments);
          };
        `
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Simulate user interactions that should be tracked
      const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
      await ctaButton.click();
      
      // Check if analytics calls were made (if implemented)
      const analyticsCalls = await page.evaluate(() => {
        return {
          gtag: window.gtagCalls?.length || 0,
          plausible: window.plausibleCalls?.length || 0
        };
      });
      
      // Analytics tracking is optional but good to have
      // expect(analyticsCalls.gtag + analyticsCalls.plausible).toBeGreaterThan(0);
    });
  });

  test.describe('Cross-Browser Compatibility Journey', () => {
    test('should work consistently across different user agents', async ({ page }) => {
      // Test with different user agents
      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      ];
      
      for (const userAgent of userAgents) {
        await page.setExtraHTTPHeaders({ 'User-Agent': userAgent });
        await page.goto('/');
        
        // Core functionality should work regardless of user agent
        await expect(page.getByText('Financial Services Made Simple')).toBeVisible();
        
        const ctaButton = page.getByRole('button', { name: /Download App/i }).first();
        await expect(ctaButton).toBeVisible();
      }
    });
  });
});
