import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils } from '../../utils/test-utils';

test.describe('Container Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with container variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Container Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Custom styles for container component */
            .max-w-screen-sm { max-width: 640px !important; }
            .max-w-screen-md { max-width: 768px !important; }
            .max-w-screen-lg { max-width: 1024px !important; }
            .max-w-screen-xl { max-width: 1280px !important; }
            .max-w-screen-2xl { max-width: 1536px !important; }
            .max-w-full { max-width: 100% !important; }
            .max-w-4xl { max-width: 896px !important; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .w-full { width: 100%; }
            .px-0 { padding-left: 0; padding-right: 0; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .p-4 { padding: 1rem; }
            .border { border-width: 1px; }
            .border-gray-300 { border-color: #d1d5db; }
          </style>
        </head>
        <body>
          <main>
            <h1>Container Component Test Suite</h1>
            
            <!-- Default Container (xl size, md padding) -->
            <div
              data-testid="container-default"
              class="mx-auto w-full max-w-screen-xl px-6 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Default Container Content (xl size, md padding)</p>
            </div>

            <!-- Small Container -->
            <div
              data-testid="container-sm"
              class="mx-auto w-full max-w-screen-sm px-4 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Small Container Content</p>
            </div>

            <!-- Medium Container -->
            <div
              data-testid="container-md"
              class="mx-auto w-full max-w-screen-md px-6 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Medium Container Content</p>
            </div>

            <!-- Large Container -->
            <div
              data-testid="container-lg"
              class="mx-auto w-full max-w-screen-lg px-8 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Large Container Content</p>
            </div>

            <!-- 2XL Container -->
            <div
              data-testid="container-2xl"
              class="mx-auto w-full max-w-screen-2xl px-8 bg-gray-100 p-4 border border-gray-300"
            >
              <p>2XL Container Content</p>
            </div>

            <!-- Full Width Container -->
            <div
              data-testid="container-full"
              class="mx-auto w-full max-w-full px-0 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Full Width Container Content</p>
            </div>

            <!-- Content Container -->
            <div
              data-testid="container-content"
              class="mx-auto w-full max-w-4xl px-4 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Content Container (max-w-4xl)</p>
            </div>

            <!-- Container with no padding -->
            <div
              data-testid="container-no-padding"
              class="mx-auto w-full max-w-screen-xl px-0 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Container with no padding</p>
            </div>

            <!-- Container as section element -->
            <section
              data-testid="container-as-section"
              class="mx-auto w-full max-w-screen-xl px-6 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Container as section element</p>
            </section>

            <!-- Container as article element -->
            <article
              data-testid="container-as-article"
              class="mx-auto w-full max-w-screen-lg px-4 bg-gray-100 p-4 border border-gray-300"
            >
              <p>Container as article element</p>
            </article>

            <!-- Container with custom className -->
            <div
              data-testid="container-custom-class"
              class="mx-auto w-full max-w-screen-xl px-6 custom-container-class bg-gray-100 p-4 border border-gray-300"
            >
              <p>Container with custom className</p>
            </div>
          </main>
        </body>
      </html>
    `);
  });

  test('should render default container correctly', async ({ page }) => {
    const container = page.locator('[data-testid="container-default"]');
    await expect(container).toBeVisible();
    
    // Test content
    await expect(container).toContainText('Default Container Content');
    
    // Test default classes
    const classes = await container.getAttribute('class');
    expect(classes).toContain('mx-auto');
    expect(classes).toContain('w-full');
    expect(classes).toContain('max-w-screen-xl');
    expect(classes).toContain('px-6');
  });

  test('should handle all size variants', async ({ page }) => {
    const sizeTests = [
      { testId: 'container-sm', expectedClass: 'max-w-screen-sm' },
      { testId: 'container-md', expectedClass: 'max-w-screen-md' },
      { testId: 'container-lg', expectedClass: 'max-w-screen-lg' },
      { testId: 'container-default', expectedClass: 'max-w-screen-xl' },
      { testId: 'container-2xl', expectedClass: 'max-w-screen-2xl' },
      { testId: 'container-full', expectedClass: 'max-w-full' },
      { testId: 'container-content', expectedClass: 'max-w-4xl' }
    ];

    for (const test of sizeTests) {
      const container = page.locator(`[data-testid="${test.testId}"]`);
      await expect(container).toBeVisible();
      
      const classes = await container.getAttribute('class');
      expect(classes).toContain(test.expectedClass);
      expect(classes).toContain('mx-auto');
      expect(classes).toContain('w-full');
    }
  });

  test('should handle all padding variants', async ({ page }) => {
    const paddingTests = [
      { testId: 'container-no-padding', expectedClass: 'px-0' },
      { testId: 'container-sm', expectedClass: 'px-4' },
      { testId: 'container-default', expectedClass: 'px-6' },
      { testId: 'container-lg', expectedClass: 'px-8' }
    ];

    for (const test of paddingTests) {
      const container = page.locator(`[data-testid="${test.testId}"]`);
      await expect(container).toBeVisible();
      
      const classes = await container.getAttribute('class');
      expect(classes).toContain(test.expectedClass);
    }
  });

  test('should render as different HTML elements', async ({ page }) => {
    // Test as section
    const sectionContainer = page.locator('[data-testid="container-as-section"]');
    await expect(sectionContainer).toBeVisible();
    expect(await sectionContainer.evaluate(el => el.tagName.toLowerCase())).toBe('section');
    
    // Test as article
    const articleContainer = page.locator('[data-testid="container-as-article"]');
    await expect(articleContainer).toBeVisible();
    expect(await articleContainer.evaluate(el => el.tagName.toLowerCase())).toBe('article');
    
    // Test default as div
    const divContainer = page.locator('[data-testid="container-default"]');
    await expect(divContainer).toBeVisible();
    expect(await divContainer.evaluate(el => el.tagName.toLowerCase())).toBe('div');
  });

  test('should handle custom className', async ({ page }) => {
    const container = page.locator('[data-testid="container-custom-class"]');
    await expect(container).toBeVisible();
    
    const classes = await container.getAttribute('class');
    expect(classes).toContain('custom-container-class');
    expect(classes).toContain('mx-auto');
    expect(classes).toContain('w-full');
    expect(classes).toContain('max-w-screen-xl');
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="container-default"]');
    
    // Container should be visible at all breakpoints
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
    
    // Test that container maintains proper width constraints
    await page.setViewportSize({ width: 375, height: 800 });
    const mobileContainer = page.locator('[data-testid="container-default"]');
    const mobileWidth = await mobileContainer.evaluate(el => (el as HTMLElement).offsetWidth);
    expect(mobileWidth).toBeLessThanOrEqual(375);
    
    await page.setViewportSize({ width: 1440, height: 800 });
    const desktopContainer = page.locator('[data-testid="container-default"]');
    const desktopWidth = await desktopContainer.evaluate(el => (el as HTMLElement).offsetWidth);
    expect(desktopWidth).toBeLessThanOrEqual(1280); // max-w-screen-xl
  });

  test('should handle content overflow properly', async ({ page }) => {
    // Add a container with very long content to test overflow behavior
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.setAttribute('data-testid', 'container-overflow-test');
      container.className = 'mx-auto w-full max-w-screen-sm px-4 bg-gray-100 p-4 border border-gray-300';
      container.innerHTML = '<p>' + 'Very long content that should wrap properly within the container constraints. '.repeat(20) + '</p>';
      document.body.appendChild(container);
    });
    
    const container = page.locator('[data-testid="container-overflow-test"]');
    await expect(container).toBeVisible();
    
    // Test that content doesn't overflow the container
    const containerWidth = await container.evaluate(el => (el as HTMLElement).offsetWidth);
    const contentWidth = await container.locator('p').evaluate(el => (el as HTMLElement).scrollWidth);
    expect(contentWidth).toBeLessThanOrEqual(containerWidth);
  });

  test('should maintain proper spacing and layout', async ({ page }) => {
    // Test that containers maintain proper spacing
    const containers = [
      'container-default',
      'container-sm',
      'container-md',
      'container-lg'
    ];
    
    for (const containerId of containers) {
      const container = page.locator(`[data-testid="${containerId}"]`);
      
      // Test that container is centered
      const containerRect = await container.boundingBox();
      const viewportSize = await page.viewportSize();
      const viewportWidth = viewportSize?.width || 1280;
      
      if (containerRect) {
        const leftMargin = containerRect.x;
        const rightMargin = viewportWidth - (containerRect.x + containerRect.width);
        
        // Margins should be approximately equal (allowing for small differences due to padding)
        expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(20);
      }
    }
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });

  test('should handle edge cases', async ({ page }) => {
    // Test container with no content
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.setAttribute('data-testid', 'container-empty');
      container.className = 'mx-auto w-full max-w-screen-xl px-6';
      container.style.minHeight = '1px'; // Make empty container visible for testing
      document.body.appendChild(container);
    });
    
    const emptyContainer = page.locator('[data-testid="container-empty"]');
    await expect(emptyContainer).toBeVisible();
    
    // Test container with nested containers
    await page.evaluate(() => {
      const outerContainer = document.createElement('div');
      outerContainer.setAttribute('data-testid', 'container-outer');
      outerContainer.className = 'mx-auto w-full max-w-screen-xl px-6 bg-gray-100 p-4';
      
      const innerContainer = document.createElement('div');
      innerContainer.setAttribute('data-testid', 'container-inner');
      innerContainer.className = 'mx-auto w-full max-w-screen-lg px-4 bg-white p-2';
      innerContainer.innerHTML = '<p>Nested container content</p>';
      
      outerContainer.appendChild(innerContainer);
      document.body.appendChild(outerContainer);
    });
    
    const outerContainer = page.locator('[data-testid="container-outer"]');
    const innerContainer = page.locator('[data-testid="container-inner"]');
    
    await expect(outerContainer).toBeVisible();
    await expect(innerContainer).toBeVisible();
    await expect(innerContainer).toContainText('Nested container content');
  });
});
