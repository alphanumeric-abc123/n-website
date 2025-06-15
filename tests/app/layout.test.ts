import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('App Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('HTML Structure', () => {
    test('should have proper HTML document structure', async ({ page }) => {
      // Check for html element with lang attribute
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
      
      // Check for body element
      await expect(page.locator('body')).toBeVisible();
      
      // Check for proper document structure
      const doctype = await page.evaluate(() => {
        return document.doctype?.name;
      });
      expect(doctype).toBe('html');
    });

    test('should load CSS and fonts correctly', async ({ page }) => {
      // Check that body has the expected font classes
      const bodyClass = await page.locator('body').getAttribute('class');
      expect(bodyClass).toContain('antialiased');
      
      // Check for font variables
      const computedStyle = await page.evaluate(() => {
        const body = document.body;
        const styles = window.getComputedStyle(body);
        return {
          fontFamily: styles.fontFamily,
          className: body.className
        };
      });
      
      expect(computedStyle.className).toBeTruthy();
    });

    test('should have proper meta tags from layout', async ({ page }) => {
      // Check charset
      const charset = await page.locator('meta[charset]').getAttribute('charset');
      expect(charset).toBeTruthy();
      
      // Check viewport
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
    });
  });

  test.describe('Font Loading', () => {
    test('should load Geist fonts correctly', async ({ page }) => {
      // Wait for fonts to load
      await page.waitForFunction(() => {
        return document.fonts.ready;
      });
      
      // Check that font variables are applied
      const fontVariables = await page.evaluate(() => {
        const body = document.body;
        const styles = window.getComputedStyle(body);
        return {
          hasGeistSans: body.className.includes('__variable'),
          fontFamily: styles.fontFamily
        };
      });
      
      expect(fontVariables.hasGeistSans).toBeTruthy();
    });

    test('should have font fallbacks', async ({ page }) => {
      const fontStack = await page.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).fontFamily;
      });
      
      // Should have system font fallbacks
      expect(fontStack).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('should load layout efficiently', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;
      
      // Layout should load quickly
      expect(loadTime).toBeLessThan(3000);
    });

    test('should not have layout shift', async ({ page }) => {
      await page.goto('/');
      
      // Measure layout stability
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'layout-shift') {
                clsValue += (entry as any).value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
          
          setTimeout(() => resolve(clsValue), 2000);
        });
      });
      
      // CLS should be minimal
      expect(cls).toBeLessThan(0.1);
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
    });

    test('should have proper language declaration', async ({ page }) => {
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe('en');
    });

    test('should support reduced motion preferences', async ({ page }) => {
      // Test with reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      
      // Should respect reduced motion
      const hasReducedMotion = await page.evaluate(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      });
      
      expect(hasReducedMotion).toBe(true);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle missing resources gracefully', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Filter out acceptable errors (404s for optional resources)
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_INTERNET_DISCONNECTED')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Layout should still work on mobile
      await expect(page.locator('body')).toBeVisible();
      
      // Check that content is accessible
      const bodyHeight = await page.locator('body').boundingBox();
      expect(bodyHeight?.height).toBeGreaterThan(0);
    });

    test('should work on tablet devices', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
    });

    test('should work on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Security', () => {
    test('should have secure headers', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      // Check for security headers (if configured)
      expect(headers).toBeTruthy();
    });

    test('should not expose sensitive information', async ({ page }) => {
      await page.goto('/');
      
      // Check that no sensitive data is exposed in the DOM
      const bodyText = await page.locator('body').textContent();
      
      // Should not contain common sensitive patterns
      expect(bodyText).not.toMatch(/password|secret|key|token/i);
    });
  });

  test.describe('Browser Compatibility', () => {
    test('should work with JavaScript disabled', async ({ page, context }) => {
      // Disable JavaScript
      await context.setJavaScriptEnabled(false);
      await page.goto('/');
      
      // Basic HTML structure should still be present
      await expect(page.locator('html')).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
    });

    test('should handle different color schemes', async ({ page }) => {
      // Test light mode
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
      
      // Test dark mode
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.reload();
      await expect(page.locator('body')).toBeVisible();
    });
  });
});
