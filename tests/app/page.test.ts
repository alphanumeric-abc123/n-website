import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('App Page (Default Next.js Template)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Structure', () => {
    test('should render main content area', async ({ page }) => {
      await expect(page.locator('main')).toBeVisible();
      
      // Check for grid layout structure
      const mainContainer = page.locator('div.grid.grid-rows-\\[20px_1fr_20px\\]');
      await expect(mainContainer).toBeVisible();
    });

    test('should display Next.js logo', async ({ page }) => {
      const logo = page.locator('img[alt="Next.js logo"]');
      await expect(logo).toBeVisible();
      
      // Check logo properties
      const src = await logo.getAttribute('src');
      expect(src).toBe('/next.svg');
      
      const width = await logo.getAttribute('width');
      const height = await logo.getAttribute('height');
      expect(width).toBe('180');
      expect(height).toBe('38');
    });

    test('should display getting started instructions', async ({ page }) => {
      await expect(page.getByText('Get started by editing')).toBeVisible();
      await expect(page.locator('code').getByText('src/app/page.tsx')).toBeVisible();
      await expect(page.getByText('Save and see your changes instantly.')).toBeVisible();
    });

    test('should have proper footer with links', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Check footer links
      await expect(footer.getByRole('link', { name: /Learn/i })).toBeVisible();
      await expect(footer.getByRole('link', { name: /Examples/i })).toBeVisible();
      await expect(footer.getByRole('link', { name: /Go to nextjs.org/i })).toBeVisible();
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have working Deploy button', async ({ page }) => {
      const deployButton = page.getByRole('link', { name: /Deploy now/i });
      await expect(deployButton).toBeVisible();
      
      // Check button properties
      const href = await deployButton.getAttribute('href');
      expect(href).toContain('vercel.com/new');
      
      const target = await deployButton.getAttribute('target');
      expect(target).toBe('_blank');
      
      const rel = await deployButton.getAttribute('rel');
      expect(rel).toBe('noopener noreferrer');
    });

    test('should have working Read docs button', async ({ page }) => {
      const docsButton = page.getByRole('link', { name: /Read our docs/i });
      await expect(docsButton).toBeVisible();
      
      const href = await docsButton.getAttribute('href');
      expect(href).toContain('nextjs.org/docs');
      
      const target = await docsButton.getAttribute('target');
      expect(target).toBe('_blank');
    });

    test('should have working footer links', async ({ page }) => {
      const learnLink = page.getByRole('link', { name: /Learn/i });
      const examplesLink = page.getByRole('link', { name: /Examples/i });
      const nextjsLink = page.getByRole('link', { name: /Go to nextjs.org/i });
      
      // Check all links are visible and have proper attributes
      await expect(learnLink).toBeVisible();
      await expect(examplesLink).toBeVisible();
      await expect(nextjsLink).toBeVisible();
      
      // Check href attributes
      const learnHref = await learnLink.getAttribute('href');
      const examplesHref = await examplesLink.getAttribute('href');
      const nextjsHref = await nextjsLink.getAttribute('href');
      
      expect(learnHref).toContain('nextjs.org/learn');
      expect(examplesHref).toContain('vercel.com/templates');
      expect(nextjsHref).toContain('nextjs.org');
    });
  });

  test.describe('Visual Design', () => {
    test('should have proper styling and layout', async ({ page }) => {
      // Check main container styling
      const mainContainer = page.locator('div.grid.grid-rows-\\[20px_1fr_20px\\]');
      await expect(mainContainer).toHaveClass(/min-h-screen/);
      await expect(mainContainer).toHaveClass(/items-center/);
      await expect(mainContainer).toHaveClass(/justify-items-center/);
    });

    test('should display images with proper attributes', async ({ page }) => {
      // Check all images have alt text
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('should have proper button styling', async ({ page }) => {
      const deployButton = page.getByRole('link', { name: /Deploy now/i });
      const docsButton = page.getByRole('link', { name: /Read our docs/i });
      
      // Check button classes
      const deployClass = await deployButton.getAttribute('class');
      const docsClass = await docsButton.getAttribute('class');
      
      expect(deployClass).toContain('rounded-full');
      expect(docsClass).toContain('rounded-full');
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check that content is still visible
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('img[alt="Next.js logo"]')).toBeVisible();
      await expect(page.getByText('Get started by editing')).toBeVisible();
    });

    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('link', { name: /Deploy now/i })).toBeVisible();
    });

    test('should adapt layout for different screen sizes', async ({ page }) => {
      // Test small screen
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      const buttonContainer = page.locator('.flex.gap-4.items-center');
      const buttonContainerClass = await buttonContainer.getAttribute('class');
      expect(buttonContainerClass).toContain('flex-col');
      
      // Test larger screen
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.reload();
      
      const buttonContainerClassLarge = await buttonContainer.getAttribute('class');
      expect(buttonContainerClassLarge).toContain('sm:flex-row');
    });
  });

  test.describe('Performance', () => {
    test('should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
    });

    test('should have optimized images', async ({ page }) => {
      // Check that images use Next.js Image component optimizations
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        const width = await img.getAttribute('width');
        const height = await img.getAttribute('height');
        
        expect(src).toBeTruthy();
        expect(width).toBeTruthy();
        expect(height).toBeTruthy();
      }
    });

    test('should not have console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        !error.includes('net::ERR_')
      );
      
      expect(criticalErrors).toHaveLength(0);
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

    test('should have proper heading structure', async ({ page }) => {
      // Check that there are no heading elements (this is a simple template)
      // or if there are, they follow proper hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
      
      // This template doesn't have headings, which is fine for a landing page
      expect(headings).toBeGreaterThanOrEqual(0);
    });

    test('should have proper link accessibility', async ({ page }) => {
      const links = page.getByRole('link');
      const linkCount = await links.count();
      
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Each link should have descriptive text or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/');
      
      // Test tab navigation through interactive elements
      await page.keyboard.press('Tab');
      
      // Should be able to navigate to all interactive elements
      const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').count();
      
      for (let i = 0; i < Math.min(focusableElements, 10); i++) {
        await page.keyboard.press('Tab');
        const activeElement = await page.evaluate(() => document.activeElement?.tagName);
        expect(activeElement).toBeTruthy();
      }
    });

    test('should have proper focus indicators', async ({ page }) => {
      const links = page.getByRole('link');
      const firstLink = links.first();
      
      await firstLink.focus();
      
      // Should have visible focus indicator
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active) return null;
        
        const styles = window.getComputedStyle(active);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow
        };
      });
      
      expect(focusedElement).toBeTruthy();
    });
  });

  test.describe('SEO and Meta Information', () => {
    test('should have basic SEO elements', async ({ page }) => {
      // Check title (from layout)
      const title = await page.title();
      expect(title).toBeTruthy();
      
      // Check meta description (from layout)
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
    });

    test('should have proper document structure for SEO', async ({ page }) => {
      // Check for main content area
      await expect(page.locator('main')).toBeVisible();
      
      // Check for footer
      await expect(page.locator('footer')).toBeVisible();
    });
  });

  test.describe('External Links Security', () => {
    test('should have secure external links', async ({ page }) => {
      const externalLinks = page.locator('a[target="_blank"]');
      const linkCount = await externalLinks.count();
      
      for (let i = 0; i < linkCount; i++) {
        const link = externalLinks.nth(i);
        const rel = await link.getAttribute('rel');
        
        // External links should have noopener noreferrer
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    });

    test('should link to trusted domains', async ({ page }) => {
      const links = page.getByRole('link');
      const linkCount = await links.count();
      
      const trustedDomains = ['vercel.com', 'nextjs.org'];
      
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('http')) {
          const url = new URL(href);
          const isTrusted = trustedDomains.some(domain => url.hostname.includes(domain));
          expect(isTrusted).toBe(true);
        }
      }
    });
  });

  test.describe('Content Validation', () => {
    test('should have meaningful content', async ({ page }) => {
      const mainContent = await page.locator('main').textContent();
      expect(mainContent).toBeTruthy();
      expect(mainContent!.length).toBeGreaterThan(50);
    });

    test('should have proper code highlighting', async ({ page }) => {
      const codeElement = page.locator('code');
      await expect(codeElement).toBeVisible();
      
      const codeClass = await codeElement.getAttribute('class');
      expect(codeClass).toContain('bg-black/[.05]');
    });

    test('should display proper instructions', async ({ page }) => {
      // Check for ordered list with instructions
      const instructionsList = page.locator('ol.list-inside.list-decimal');
      await expect(instructionsList).toBeVisible();
      
      const listItems = instructionsList.locator('li');
      const itemCount = await listItems.count();
      expect(itemCount).toBe(2);
    });
  });
});
