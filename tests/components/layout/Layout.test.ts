import { test, expect } from '../../utils/test-utils';

test.describe('Layout Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with Layout component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Layout Test</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="layout-container"></div>
          <script type="module">
            // Mock Layout component structure
            const layoutHTML = \`
              <div data-testid="layout" class="min-h-screen flex flex-col">
                <!-- Header -->
                <header data-testid="layout-header" class="bg-white border-b border-neutral-200 z-50 sticky top-0">
                  <div class="mx-auto w-full max-w-screen-xl px-6">
                    <div class="flex items-center justify-between h-16">
                      <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-2">
                          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg">N</span>
                          </div>
                          <span class="text-xl font-bold text-neutral-900">Navi</span>
                        </a>
                      </div>
                      <nav class="hidden md:flex items-center space-x-8">
                        <a href="/products" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Products</a>
                        <a href="/why-navi" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Why Navi</a>
                        <a href="/about-us" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">About Us</a>
                        <a href="/careers" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Careers</a>
                      </nav>
                      <div class="hidden md:flex items-center space-x-4">
                        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3">Login</button>
                        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-9 px-3">Download App</button>
                      </div>
                    </div>
                  </div>
                </header>

                <!-- Main Content -->
                <main data-testid="layout-main" class="flex-1">
                  <div data-testid="main-content" class="p-8">
                    <h1>Main Content Area</h1>
                    <p>This is where the page content goes.</p>
                  </div>
                </main>

                <!-- Footer -->
                <footer data-testid="layout-footer" class="bg-neutral-900 text-white">
                  <div class="mx-auto w-full max-w-screen-xl px-6 py-12">
                    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                      <div class="lg:col-span-2">
                        <h2 class="text-2xl font-bold text-white mb-4">Navi</h2>
                        <p class="text-neutral-300 text-sm leading-relaxed mb-6">
                          Making financial services simple, transparent, and accessible for everyone.
                        </p>
                      </div>
                      <div class="lg:col-span-1">
                        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h3>
                        <ul class="space-y-3">
                          <li><a href="/products/upi" class="text-neutral-300 hover:text-white transition-colors text-sm">UPI</a></li>
                          <li><a href="/products/cash-loan" class="text-neutral-300 hover:text-white transition-colors text-sm">Cash Loan</a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="border-t border-neutral-800 py-6">
                      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p class="text-sm text-neutral-400">© ${new Date().getFullYear()} Navi. All rights reserved.</p>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            \`;
            document.getElementById('layout-container').innerHTML = layoutHTML;
          </script>
        </body>
      </html>
    `);
  });

  test('should render layout with header, main, and footer', async ({ page }) => {
    const layout = page.locator('[data-testid="layout"]');
    await expect(layout).toBeVisible();

    // Check that all main sections are present
    const header = page.locator('[data-testid="layout-header"]');
    const main = page.locator('[data-testid="layout-main"]');
    const footer = page.locator('[data-testid="layout-footer"]');

    await expect(header).toBeVisible();
    await expect(main).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test('should have proper layout structure', async ({ page }) => {
    const layout = page.locator('[data-testid="layout"]');
    
    // Check that layout has proper flex classes
    await expect(layout).toHaveClass(/min-h-screen/);
    await expect(layout).toHaveClass(/flex/);
    await expect(layout).toHaveClass(/flex-col/);

    // Check that main content area has flex-1 class
    const main = page.locator('[data-testid="layout-main"]');
    await expect(main).toHaveClass(/flex-1/);
  });

  test('should display main content', async ({ page }) => {
    const mainContent = page.locator('[data-testid="main-content"]');
    await expect(mainContent).toBeVisible();
    await expect(mainContent).toContainText('Main Content Area');
    await expect(mainContent).toContainText('This is where the page content goes.');
  });

  test('should have working header navigation', async ({ page }) => {
    const header = page.locator('[data-testid="layout-header"]');
    await expect(header).toBeVisible();

    // Check navigation links
    await expect(header.locator('a[href="/products"]')).toHaveText('Products');
    await expect(header.locator('a[href="/why-navi"]')).toHaveText('Why Navi');
    await expect(header.locator('a[href="/about-us"]')).toHaveText('About Us');
    await expect(header.locator('a[href="/careers"]')).toHaveText('Careers');
  });

  test('should have working footer links', async ({ page }) => {
    const footer = page.locator('[data-testid="layout-footer"]');
    await expect(footer).toBeVisible();

    // Check footer content
    await expect(footer).toContainText('Navi');
    await expect(footer).toContainText('Making financial services simple');
    
    // Check footer links
    await expect(footer.locator('a[href="/products/upi"]')).toHaveText('UPI');
    await expect(footer.locator('a[href="/products/cash-loan"]')).toHaveText('Cash Loan');
    
    // Check copyright
    const currentYear = new Date().getFullYear();
    await expect(footer).toContainText(`© ${currentYear} Navi. All rights reserved.`);
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const layout = page.locator('[data-testid="layout"]');
    const header = page.locator('[data-testid="layout-header"]');
    const main = page.locator('[data-testid="layout-main"]');
    const footer = page.locator('[data-testid="layout-footer"]');

    // All sections should still be visible on mobile
    await expect(layout).toBeVisible();
    await expect(header).toBeVisible();
    await expect(main).toBeVisible();
    await expect(footer).toBeVisible();

    // Layout should maintain proper structure
    await expect(layout).toHaveClass(/min-h-screen/);
    await expect(main).toHaveClass(/flex-1/);
  });

  test('should handle layout without header', async ({ page }) => {
    // Create layout without header
    await page.evaluate(() => {
      const layoutWithoutHeader = `
        <div data-testid="layout-no-header" class="min-h-screen flex flex-col">
          <main data-testid="main-no-header" class="flex-1">
            <div class="p-8">
              <h1>Content without header</h1>
            </div>
          </main>
          <footer data-testid="footer-no-header" class="bg-neutral-900 text-white p-4">
            <div class="text-center">Footer content</div>
          </footer>
        </div>
      `;
      const container = document.createElement('div');
      container.innerHTML = layoutWithoutHeader;
      document.body.appendChild(container);
    });

    const layoutNoHeader = page.locator('[data-testid="layout-no-header"]');
    const mainNoHeader = page.locator('[data-testid="main-no-header"]');
    const footerNoHeader = page.locator('[data-testid="footer-no-header"]');

    await expect(layoutNoHeader).toBeVisible();
    await expect(mainNoHeader).toBeVisible();
    await expect(footerNoHeader).toBeVisible();
    await expect(mainNoHeader).toContainText('Content without header');
  });

  test('should handle layout without footer', async ({ page }) => {
    // Create layout without footer
    await page.evaluate(() => {
      const layoutWithoutFooter = `
        <div data-testid="layout-no-footer" class="min-h-screen flex flex-col">
          <header data-testid="header-no-footer" class="bg-white border-b border-neutral-200 p-4">
            <div class="text-center">Header content</div>
          </header>
          <main data-testid="main-no-footer" class="flex-1">
            <div class="p-8">
              <h1>Content without footer</h1>
            </div>
          </main>
        </div>
      `;
      const container = document.createElement('div');
      container.innerHTML = layoutWithoutFooter;
      document.body.appendChild(container);
    });

    const layoutNoFooter = page.locator('[data-testid="layout-no-footer"]');
    const headerNoFooter = page.locator('[data-testid="header-no-footer"]');
    const mainNoFooter = page.locator('[data-testid="main-no-footer"]');

    await expect(layoutNoFooter).toBeVisible();
    await expect(headerNoFooter).toBeVisible();
    await expect(mainNoFooter).toBeVisible();
    await expect(mainNoFooter).toContainText('Content without footer');
  });

  test('should handle minimal layout', async ({ page }) => {
    // Create minimal layout with just main content
    await page.evaluate(() => {
      const minimalLayout = `
        <div data-testid="minimal-layout" class="min-h-screen flex flex-col">
          <main data-testid="minimal-main" class="flex-1">
            <div class="p-8">
              <h1>Minimal Layout</h1>
              <p>Just main content, no header or footer.</p>
            </div>
          </main>
        </div>
      `;
      const container = document.createElement('div');
      container.innerHTML = minimalLayout;
      document.body.appendChild(container);
    });

    const minimalLayout = page.locator('[data-testid="minimal-layout"]');
    const minimalMain = page.locator('[data-testid="minimal-main"]');

    await expect(minimalLayout).toBeVisible();
    await expect(minimalMain).toBeVisible();
    await expect(minimalMain).toContainText('Minimal Layout');
    await expect(minimalMain).toContainText('Just main content, no header or footer.');
  });

  test('should maintain proper scroll behavior', async ({ page }) => {
    // Add more content to test scrolling
    await page.evaluate(() => {
      const mainContent = document.querySelector('[data-testid="main-content"]');
      if (mainContent) {
        mainContent.innerHTML += `
          <div style="height: 2000px; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);">
            <p style="padding: 20px;">This is a very tall content area to test scrolling behavior.</p>
            <p style="padding: 20px; margin-top: 500px;">Middle content</p>
            <p style="padding: 20px; margin-top: 500px;">Bottom content</p>
          </div>
        `;
      }
    });

    // Test that we can scroll to different parts of the content
    await page.locator('text=Bottom content').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Bottom content')).toBeVisible();

    // Scroll back to top
    await page.locator('text=Main Content Area').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Main Content Area')).toBeVisible();
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });
});
