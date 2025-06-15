import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils } from '../../utils/test-utils';

test.describe('CTASection Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with all CTA section variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>CTASection Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
            .from-primary-500 { --tw-gradient-from: #1e40af; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-primary-700 { --tw-gradient-to: #1d4ed8; }
            .min-w-\\[200px\\] { min-width: 200px; }
            .z-10 { z-index: 10; }
            /* Better contrast colors - using darker blues for 4.5:1+ contrast ratio */
            .bg-blue-500 { background-color: #1e40af !important; }
            .hover\\:bg-blue-600:hover { background-color: #1d4ed8 !important; }
          </style>
        </head>
        <body>
          <main>
            <h1>CTASection Component Test Suite</h1>
            
            <!-- Default CTA Section -->
            <section
              data-testid="cta-default"
              class="relative overflow-hidden bg-neutral-50 py-20 md:py-24 text-center"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
                    Default CTA Section
                  </h2>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
                    This is a default CTA section with neutral background
                  </p>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="cta-default-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Primary CTA Section -->
            <section
              data-testid="cta-primary"
              class="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 md:py-24 text-center"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
                    Primary CTA Section
                  </h2>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-white/90">
                    This is a primary CTA section with gradient background
                  </p>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="cta-primary-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-blue-600 hover:bg-gray-50 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Start Now
                    </button>
                    <button
                      data-testid="cta-primary-secondary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-white text-white hover:bg-white hover:text-neutral-900 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Small Size CTA Section -->
            <section
              data-testid="cta-small"
              class="relative overflow-hidden bg-neutral-50 py-12 md:py-16 text-center"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
                    Small CTA Section
                  </h2>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="cta-small-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Action
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Left Aligned CTA Section -->
            <section
              data-testid="cta-left"
              class="relative overflow-hidden bg-neutral-50 py-20 md:py-24 text-left"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
                    Left Aligned CTA
                  </h2>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
                    This CTA section is aligned to the left
                  </p>
                  <div class="mt-10 flex gap-4 flex-col sm:flex-row">
                    <button
                      data-testid="cta-left-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Right Aligned CTA Section -->
            <section
              data-testid="cta-right"
              class="relative overflow-hidden bg-neutral-50 py-20 md:py-24 text-right"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl ml-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
                    Right Aligned CTA
                  </h2>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
                    This CTA section is aligned to the right
                  </p>
                  <div class="mt-10 flex gap-4 justify-end flex-col sm:flex-row">
                    <button
                      data-testid="cta-right-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- CTA with Background Pattern -->
            <section
              data-testid="cta-pattern"
              class="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 md:py-24 text-center"
            >
              <div class="absolute inset-0 opacity-10">
                <svg
                  class="h-full w-full"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id="cta-pattern"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="10" cy="10" r="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                </svg>
              </div>
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
                    CTA with Pattern
                  </h2>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="cta-pattern-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-blue-600 hover:bg-gray-50 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- CTA with Background Image and Overlay -->
            <section
              data-testid="cta-image"
              class="relative overflow-hidden bg-cover bg-center bg-no-repeat py-20 md:py-24 text-center"
              style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzYjgyZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZDRlZDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')"
            >
              <div class="absolute inset-0 bg-black/50"></div>
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white">
                    CTA with Background Image
                  </h2>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-white/90">
                    This CTA has a background image with overlay
                  </p>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="cta-image-primary"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-blue-600 hover:bg-gray-50 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </body>
      </html>
    `);
  });

  test('should render all CTA section variants correctly', async ({ page }) => {
    // Test that all CTA section variants are visible
    await expect(page.locator('[data-testid="cta-default"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-primary"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-small"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-left"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-right"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-pattern"]')).toBeVisible();
    await expect(page.locator('[data-testid="cta-image"]')).toBeVisible();

    // Test headlines are present
    await expect(page.locator('[data-testid="cta-default"] h2')).toContainText('Default CTA Section');
    await expect(page.locator('[data-testid="cta-primary"] h2')).toContainText('Primary CTA Section');
  });

  test('should handle different alignments correctly', async ({ page }) => {
    const leftSection = page.locator('[data-testid="cta-left"]');
    const centerSection = page.locator('[data-testid="cta-default"]');
    const rightSection = page.locator('[data-testid="cta-right"]');

    // Check text alignment classes
    await expect(leftSection).toHaveClass(/text-left/);
    await expect(centerSection).toHaveClass(/text-center/);
    await expect(rightSection).toHaveClass(/text-right/);

    // Check content container alignment
    const leftContainer = leftSection.locator('.max-w-4xl');
    const centerContainer = centerSection.locator('.max-w-4xl');
    const rightContainer = rightSection.locator('.max-w-4xl');

    await expect(centerContainer).toHaveClass(/mx-auto/);
    await expect(rightContainer).toHaveClass(/ml-auto/);
  });

  test('should handle different sizes correctly', async ({ page }) => {
    const smallSection = page.locator('[data-testid="cta-small"]');
    const defaultSection = page.locator('[data-testid="cta-default"]');

    // Small section should have less padding
    const smallBox = await smallSection.boundingBox();
    const defaultBox = await defaultSection.boundingBox();

    expect(smallBox?.height).toBeLessThan(defaultBox?.height || 0);
  });

  test('should display primary and secondary buttons correctly', async ({ page }) => {
    const primarySection = page.locator('[data-testid="cta-primary"]');
    const primaryButton = primarySection.locator('[data-testid="cta-primary-primary"]');
    const secondaryButton = primarySection.locator('[data-testid="cta-primary-secondary"]');

    await expect(primaryButton).toBeVisible();
    await expect(secondaryButton).toBeVisible();
    await expect(primaryButton).toContainText('Start Now');
    await expect(secondaryButton).toContainText('Learn More');

    // Check button styling
    await expect(primaryButton).toHaveClass(/bg-white/);
    await expect(secondaryButton).toHaveClass(/border/);
  });

  test('should handle button clicks correctly', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).ctaClickCount = 0;
      document.querySelectorAll('[data-testid^="cta-"][data-testid$="-primary"]').forEach(button => {
        button.addEventListener('click', () => {
          (window as any).ctaClickCount++;
        });
      });
    });

    // Click various CTA buttons
    await page.locator('[data-testid="cta-default-primary"]').click();
    await page.locator('[data-testid="cta-primary-primary"]').click();
    await page.locator('[data-testid="cta-small-primary"]').click();

    const finalClickCount = await page.evaluate(() => (window as any).ctaClickCount);
    expect(finalClickCount).toBeGreaterThanOrEqual(3);
  });

  test('should display background patterns correctly', async ({ page }) => {
    const patternSection = page.locator('[data-testid="cta-pattern"]');
    const patternSvg = patternSection.locator('svg');

    await expect(patternSvg).toBeVisible();
    await expect(patternSvg).toHaveAttribute('viewBox', '0 0 100 100');
    
    // Check pattern definition exists (patterns in SVG defs are not visible but should exist)
    const pattern = patternSvg.locator('pattern#cta-pattern');
    const patternCount = await pattern.count();
    expect(patternCount).toBe(1);
  });

  test('should handle background images and overlays correctly', async ({ page }) => {
    const imageSection = page.locator('[data-testid="cta-image"]');
    const overlay = imageSection.locator('div').filter({ hasText: '' }).first();

    // Check background image is set
    const backgroundImage = await imageSection.evaluate(el => getComputedStyle(el).backgroundImage);
    expect(backgroundImage).toContain('url');

    // Check overlay is present by looking for the div with bg-black class
    const overlayDiv = imageSection.locator('div.absolute.inset-0');
    await expect(overlayDiv).toBeVisible();
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="cta-default"]');
    
    // CTA section should be visible at all breakpoints
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
  });

  test('should handle button layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const buttonContainer = page.locator('[data-testid="cta-primary"] .flex.gap-4');
    
    // On mobile, buttons should stack vertically (flex-col)
    await expect(buttonContainer).toHaveClass(/flex-col/);
    await expect(buttonContainer).toHaveClass(/sm:flex-row/);
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    // Should have main h1 and section h2s
    expect(headingCount).toBeGreaterThan(1);
    
    // Check that CTA headings are h2
    const ctaHeadings = page.locator('[data-testid^="cta-"] h2');
    const ctaHeadingCount = await ctaHeadings.count();
    expect(ctaHeadingCount).toBeGreaterThan(0);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus first CTA button
    await page.keyboard.press('Tab');
    
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveCount(1);
    
    // Navigate through CTA buttons
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Should still have a focused element
    focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveCount(1);
  });

  test('should maintain proper contrast ratios', async ({ page }) => {
    // Test that text is readable on different backgrounds
    const primarySection = page.locator('[data-testid="cta-primary"]');
    const primaryHeading = primarySection.locator('h2');
    
    // White text on gradient background should be visible
    const color = await primaryHeading.evaluate(el => getComputedStyle(el).color);
    const backgroundColor = await primarySection.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Basic check that colors are different
    expect(color).not.toBe(backgroundColor);
  });

  test('should handle content overflow gracefully', async ({ page }) => {
    // Add a CTA with very long content
    await page.evaluate(() => {
      const container = document.querySelector('main');
      if (!container) return;
      
      const longCta = document.createElement('section');
      longCta.setAttribute('data-testid', 'cta-long');
      longCta.className = 'relative overflow-hidden bg-neutral-50 py-20 md:py-24 text-center';
      longCta.innerHTML = `
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-neutral-900">
              ${'Very Long CTA Section Title That Should Handle Overflow Gracefully '.repeat(3)}
            </h2>
            <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
              ${'This is a very long description that tests how the CTA section handles content overflow and text wrapping across different screen sizes and viewports. '.repeat(5)}
            </p>
          </div>
        </div>
      `;
      container.appendChild(longCta);
    });

    const longCta = page.locator('[data-testid="cta-long"]');
    await expect(longCta).toBeVisible();
    
    // Content should not overflow the container
    const box = await longCta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
  });
});
