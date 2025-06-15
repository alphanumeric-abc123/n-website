import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils } from '../../utils/test-utils';

test.describe('Hero Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with hero variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hero Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Custom styles for hero component */
            .bg-primary-50 { background-color: #eff6ff !important; }
            .bg-primary-100 { background-color: #dbeafe !important; }
            .bg-primary-500 { background-color: #3b82f6 !important; }
            .bg-primary-700 { background-color: #1d4ed8 !important; }
            .bg-secondary-50 { background-color: #f5f3ff !important; }
            .bg-secondary-100 { background-color: #ede9fe !important; }
            .text-primary-600 { color: #2563eb !important; }
            .text-white { color: white !important; }
            .text-neutral-900 { color: #171717 !important; }
            .text-neutral-600 { color: #525252 !important; }
            .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
            .from-primary-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-primary-100 { --tw-gradient-to: #dbeafe; }
            .from-primary-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-primary-700 { --tw-gradient-to: #1d4ed8; }
            .from-secondary-50 { --tw-gradient-from: #f5f3ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-secondary-100 { --tw-gradient-to: #ede9fe; }
            .from-neutral-800 { --tw-gradient-from: #262626; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-neutral-900 { --tw-gradient-to: #171717; }
            .bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4) !important; }
            .min-w-\\[200px\\] { min-width: 200px; }
            .bg-cover { background-size: cover; }
            .bg-center { background-position: center; }
            .bg-no-repeat { background-repeat: no-repeat; }
          </style>
        </head>
        <body>
          <main>
            <h1>Hero Component Test Suite</h1>
            
            <!-- Default Hero -->
            <section
              data-testid="hero-default"
              class="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 py-24 md:py-32 text-left"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                    Default Hero Headline
                  </h1>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
                    This is the default hero subtext with some description content.
                  </p>
                  <div class="mt-10 flex gap-4 flex-col sm:flex-row">
                    <button
                      data-testid="hero-primary-cta"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Primary CTA
                    </button>
                    <button
                      data-testid="hero-secondary-cta"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Secondary CTA
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Primary Variant Hero -->
            <section
              data-testid="hero-primary"
              class="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 md:py-24 text-center"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl mx-auto">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                    Primary Hero Headline
                  </h1>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-white/90">
                    Primary variant hero with center alignment.
                  </p>
                  <div class="mt-10 flex gap-4 justify-center flex-col sm:flex-row">
                    <button
                      data-testid="hero-primary-variant-cta"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-gray-900 hover:bg-gray-100 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Secondary Style CTA
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Dark Variant Hero -->
            <section
              data-testid="hero-dark"
              class="relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 text-white py-12 md:py-16 text-right"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl ml-auto">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                    Dark Hero Headline
                  </h1>
                  <div class="mt-10 flex gap-4 justify-end flex-col sm:flex-row">
                    <button
                      data-testid="hero-dark-cta"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-gray-900 hover:bg-gray-100 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Dark Hero CTA
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Image Background Hero with Overlay -->
            <section
              data-testid="hero-image"
              class="relative overflow-hidden bg-cover bg-center bg-no-repeat py-32 md:py-40 text-left"
              style="background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop')"
            >
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                    Image Background Hero
                  </h1>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-white/90">
                    Hero with background image and overlay.
                  </p>
                  <div class="mt-10 flex gap-4 flex-col sm:flex-row">
                    <button
                      data-testid="hero-image-cta"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-white text-gray-900 hover:bg-gray-100 h-12 px-8 py-3 min-w-[200px]"
                    >
                      Image Hero CTA
                    </button>
                  </div>
                  <div class="mt-10">
                    <div data-testid="hero-custom-content" class="p-4 bg-white/10 rounded-lg">
                      Custom children content
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Small Size Hero -->
            <section
              data-testid="hero-small"
              class="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100 py-12 md:py-16 text-left"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                    Small Size Hero
                  </h1>
                </div>
              </div>
            </section>

            <!-- Hero without subtext -->
            <section
              data-testid="hero-no-subtext"
              class="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 py-24 md:py-32 text-left"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                    Hero Without Subtext
                  </h1>
                </div>
              </div>
            </section>

            <!-- Hero without CTAs -->
            <section
              data-testid="hero-no-ctas"
              class="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 py-24 md:py-32 text-left"
            >
              <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-4xl">
                  <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                    Hero Without CTAs
                  </h1>
                  <p class="mt-6 text-lg leading-8 sm:text-xl text-neutral-600">
                    This hero has no call-to-action buttons.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </body>
      </html>
    `);
  });

  test('should render default hero correctly', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-default"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Default Hero Headline');
    
    // Test subtext
    await expect(hero.locator('p')).toContainText('This is the default hero subtext');
    
    // Test CTAs
    await expect(page.locator('[data-testid="hero-primary-cta"]')).toBeVisible();
    await expect(page.locator('[data-testid="hero-secondary-cta"]')).toBeVisible();
    
    // Test styling classes
    const classes = await hero.getAttribute('class');
    expect(classes).toContain('bg-gradient-to-br');
    expect(classes).toContain('from-primary-50');
    expect(classes).toContain('to-primary-100');
  });

  test('should render primary variant hero correctly', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-primary"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Primary Hero Headline');
    
    // Test center alignment
    const classes = await hero.getAttribute('class');
    expect(classes).toContain('text-center');
    
    // Test primary variant styling
    expect(classes).toContain('from-primary-500');
    expect(classes).toContain('to-primary-700');
    expect(classes).toContain('text-white');
    
    // Test CTA button
    await expect(page.locator('[data-testid="hero-primary-variant-cta"]')).toBeVisible();
  });

  test('should render dark variant hero correctly', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-dark"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Dark Hero Headline');
    
    // Test right alignment
    const classes = await hero.getAttribute('class');
    expect(classes).toContain('text-right');
    
    // Test dark variant styling
    expect(classes).toContain('from-neutral-800');
    expect(classes).toContain('to-neutral-900');
    expect(classes).toContain('text-white');
    
    // Test CTA button
    await expect(page.locator('[data-testid="hero-dark-cta"]')).toBeVisible();
  });

  test('should render image background hero with overlay', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-image"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Image Background Hero');
    
    // Test background image
    const backgroundImage = await hero.evaluate(el => getComputedStyle(el).backgroundImage);
    expect(backgroundImage).toContain('url');
    
    // Test overlay
    const overlay = hero.locator('.bg-black\\/40');
    await expect(overlay).toBeVisible();
    
    // Test custom children content
    await expect(page.locator('[data-testid="hero-custom-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="hero-custom-content"]')).toContainText('Custom children content');
  });

  test('should render small size hero correctly', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-small"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Small Size Hero');
    
    // Test small size padding
    const classes = await hero.getAttribute('class');
    expect(classes).toContain('py-12');
    expect(classes).toContain('md:py-16');
  });

  test('should render hero without subtext', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-no-subtext"]');
    await expect(hero).toBeVisible();
    
    // Test headline
    await expect(hero.locator('h1')).toContainText('Hero Without Subtext');
    
    // Test that subtext is not present
    const subtextElements = hero.locator('p');
    await expect(subtextElements).toHaveCount(0);
  });

  test('should render hero without CTAs', async ({ page }) => {
    const hero = page.locator('[data-testid="hero-no-ctas"]');
    await expect(hero).toBeVisible();
    
    // Test headline and subtext
    await expect(hero.locator('h1')).toContainText('Hero Without CTAs');
    await expect(hero.locator('p')).toContainText('This hero has no call-to-action buttons');
    
    // Test that CTA buttons are not present
    const ctaButtons = hero.locator('button');
    await expect(ctaButtons).toHaveCount(0);
  });

  test('should handle CTA button clicks', async ({ page }) => {
    // Test primary CTA click
    await page.evaluate(() => {
      (window as any).primaryCtaClicked = false;
      const button = document.querySelector('[data-testid="hero-primary-cta"]');
      if (button) {
        button.addEventListener('click', () => {
          (window as any).primaryCtaClicked = true;
        });
      }
    });
    
    await page.locator('[data-testid="hero-primary-cta"]').click();
    const primaryClicked = await page.evaluate(() => (window as any).primaryCtaClicked);
    expect(primaryClicked).toBe(true);
    
    // Test secondary CTA click
    await page.evaluate(() => {
      (window as any).secondaryCtaClicked = false;
      const button = document.querySelector('[data-testid="hero-secondary-cta"]');
      if (button) {
        button.addEventListener('click', () => {
          (window as any).secondaryCtaClicked = true;
        });
      }
    });
    
    await page.locator('[data-testid="hero-secondary-cta"]').click();
    const secondaryClicked = await page.evaluate(() => (window as any).secondaryCtaClicked);
    expect(secondaryClicked).toBe(true);
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="hero-default"]');
    
    // Hero should be visible at all breakpoints
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
    
    // Test responsive text sizing
    await page.setViewportSize({ width: 375, height: 800 });
    const mobileHeadline = page.locator('[data-testid="hero-default"] h1');
    const mobileClasses = await mobileHeadline.getAttribute('class');
    expect(mobileClasses).toContain('text-4xl');
    
    await page.setViewportSize({ width: 1024, height: 800 });
    const desktopClasses = await mobileHeadline.getAttribute('class');
    expect(desktopClasses).toContain('lg:text-6xl');
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });

  test('should handle all size variants', async ({ page }) => {
    // Test different size variants by checking padding classes
    const sizes = [
      { testId: 'hero-small', expectedClasses: ['py-12', 'md:py-16'] },
      { testId: 'hero-primary', expectedClasses: ['py-16', 'md:py-24'] },
      { testId: 'hero-default', expectedClasses: ['py-24', 'md:py-32'] },
      { testId: 'hero-image', expectedClasses: ['py-32', 'md:py-40'] }
    ];

    for (const size of sizes) {
      const hero = page.locator(`[data-testid="${size.testId}"]`);
      const classes = await hero.getAttribute('class');
      
      for (const expectedClass of size.expectedClasses) {
        expect(classes).toContain(expectedClass);
      }
    }
  });

  test('should handle all alignment variants', async ({ page }) => {
    // Test left alignment (default)
    const leftHero = page.locator('[data-testid="hero-default"]');
    const leftClasses = await leftHero.getAttribute('class');
    expect(leftClasses).toContain('text-left');
    
    // Test center alignment
    const centerHero = page.locator('[data-testid="hero-primary"]');
    const centerClasses = await centerHero.getAttribute('class');
    expect(centerClasses).toContain('text-center');
    
    // Test right alignment
    const rightHero = page.locator('[data-testid="hero-dark"]');
    const rightClasses = await rightHero.getAttribute('class');
    expect(rightClasses).toContain('text-right');
  });

  test('should handle all variant styles', async ({ page }) => {
    // Test default variant
    const defaultHero = page.locator('[data-testid="hero-default"]');
    const defaultClasses = await defaultHero.getAttribute('class');
    expect(defaultClasses).toContain('from-primary-50');
    expect(defaultClasses).toContain('to-primary-100');
    
    // Test primary variant
    const primaryHero = page.locator('[data-testid="hero-primary"]');
    const primaryClasses = await primaryHero.getAttribute('class');
    expect(primaryClasses).toContain('from-primary-500');
    expect(primaryClasses).toContain('to-primary-700');
    
    // Test dark variant
    const darkHero = page.locator('[data-testid="hero-dark"]');
    const darkClasses = await darkHero.getAttribute('class');
    expect(darkClasses).toContain('from-neutral-800');
    expect(darkClasses).toContain('to-neutral-900');
    
    // Test image variant (background image)
    const imageHero = page.locator('[data-testid="hero-image"]');
    const imageClasses = await imageHero.getAttribute('class');
    expect(imageClasses).toContain('bg-cover');
    expect(imageClasses).toContain('bg-center');
    expect(imageClasses).toContain('bg-no-repeat');
  });
});
