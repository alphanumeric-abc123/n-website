import { test, expect } from '../../axe-test';

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with Header component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Header Test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="header-container"></div>
          <script type="module">
            // Mock Header component structure
            const headerHTML = \`
              <header data-testid="header" class="bg-white border-b border-neutral-200 z-50 sticky top-0">
                <div class="mx-auto w-full max-w-screen-xl px-6">
                  <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <div class="flex items-center">
                      <a data-testid="logo-link" href="/" class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                          <span class="text-white font-bold text-lg">N</span>
                        </div>
                        <span data-testid="logo-text" class="text-xl font-bold text-neutral-900">Navi</span>
                      </a>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav data-testid="desktop-nav" class="hidden md:flex items-center space-x-8">
                      <div class="relative group">
                        <a data-testid="nav-products" href="/products" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                          Products
                          <svg class="ml-1 h-4 w-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </a>
                        <!-- Dropdown Menu -->
                        <div data-testid="products-dropdown" class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div class="py-1">
                            <a href="/products/upi" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">UPI</a>
                            <a href="/products/cash-loan" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Cash Loan</a>
                            <a href="/products/home-loan" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Home Loan</a>
                            <a href="/products/health-insurance" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Health Insurance</a>
                            <a href="/products/mutual-funds" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Mutual Funds</a>
                          </div>
                        </div>
                      </div>
                      <a data-testid="nav-why-navi" href="/why-navi" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Why Navi</a>
                      <a data-testid="nav-about" href="/about-us" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">About Us</a>
                      <div class="relative group">
                        <a data-testid="nav-resources" href="/resources" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                          Resources
                          <svg class="ml-1 h-4 w-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </a>
                        <!-- Dropdown Menu -->
                        <div data-testid="resources-dropdown" class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div class="py-1">
                            <a href="/resources/calculators" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Calculators</a>
                            <a href="/resources/guides" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Guides</a>
                            <a href="/resources/tools" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600">Tools</a>
                          </div>
                        </div>
                      </div>
                      <a data-testid="nav-careers" href="/careers" class="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Careers</a>
                    </nav>

                    <!-- CTA Buttons -->
                    <div data-testid="cta-buttons" class="hidden md:flex items-center space-x-4">
                      <button data-testid="login-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        Login
                      </button>
                      <button data-testid="download-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
                        Download App
                      </button>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button data-testid="mobile-menu-btn" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" aria-expanded="false">
                      <span class="sr-only">Open main menu</span>
                      <svg data-testid="hamburger-icon" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>

                  <!-- Mobile Menu (initially hidden) -->
                  <div data-testid="mobile-menu" class="md:hidden hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 mt-4">
                      <a data-testid="mobile-nav-products" href="/products" class="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">Products</a>
                      <div class="pl-4">
                        <a href="/products/upi" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">UPI</a>
                        <a href="/products/cash-loan" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Cash Loan</a>
                        <a href="/products/home-loan" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Home Loan</a>
                        <a href="/products/health-insurance" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Health Insurance</a>
                        <a href="/products/mutual-funds" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Mutual Funds</a>
                      </div>
                      <a data-testid="mobile-nav-why-navi" href="/why-navi" class="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">Why Navi</a>
                      <a data-testid="mobile-nav-about" href="/about-us" class="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">About Us</a>
                      <a data-testid="mobile-nav-resources" href="/resources" class="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">Resources</a>
                      <div class="pl-4">
                        <a href="/resources/calculators" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Calculators</a>
                        <a href="/resources/guides" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Guides</a>
                        <a href="/resources/tools" class="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm">Tools</a>
                      </div>
                      <a data-testid="mobile-nav-careers" href="/careers" class="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">Careers</a>
                      <div class="pt-4 pb-3 border-t border-neutral-200">
                        <div class="flex flex-col space-y-2 px-3">
                          <button data-testid="mobile-login-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full">
                            Login
                          </button>
                          <button data-testid="mobile-download-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 w-full">
                            Download App
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            \`;
            document.getElementById('header-container').innerHTML = headerHTML;

            // Add mobile menu toggle functionality
            const mobileMenuBtn = document.querySelector('[data-testid="mobile-menu-btn"]');
            const mobileMenu = document.querySelector('[data-testid="mobile-menu"]');
            const hamburgerIcon = document.querySelector('[data-testid="hamburger-icon"]');
            
            let isMobileMenuOpen = false;
            
            mobileMenuBtn.addEventListener('click', () => {
              isMobileMenuOpen = !isMobileMenuOpen;
              if (isMobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
              } else {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
              }
            });
          </script>
        </body>
      </html>
    `);
  });

  test('should render header with logo and navigation', async ({ page }) => {
    // Ensure desktop viewport for this test
    await page.setViewportSize({ width: 1024, height: 768 });
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();

    // Check logo
    const logoLink = page.locator('[data-testid="logo-link"]');
    const logoText = page.locator('[data-testid="logo-text"]');
    await expect(logoLink).toHaveAttribute('href', '/');
    await expect(logoText).toHaveText('Navi');

    // Check desktop navigation
    const desktopNav = page.locator('[data-testid="desktop-nav"]');
    await expect(desktopNav).toBeVisible();
  });

  test('should have correct navigation links', async ({ page }) => {
    // Test main navigation links
    await expect(page.locator('[data-testid="nav-products"]')).toHaveAttribute('href', '/products');
    await expect(page.locator('[data-testid="nav-why-navi"]')).toHaveAttribute('href', '/why-navi');
    await expect(page.locator('[data-testid="nav-about"]')).toHaveAttribute('href', '/about-us');
    await expect(page.locator('[data-testid="nav-resources"]')).toHaveAttribute('href', '/resources');
    await expect(page.locator('[data-testid="nav-careers"]')).toHaveAttribute('href', '/careers');

    // Test navigation text
    await expect(page.locator('[data-testid="nav-products"]')).toContainText('Products');
    await expect(page.locator('[data-testid="nav-why-navi"]')).toContainText('Why Navi');
    await expect(page.locator('[data-testid="nav-about"]')).toContainText('About Us');
    await expect(page.locator('[data-testid="nav-resources"]')).toContainText('Resources');
    await expect(page.locator('[data-testid="nav-careers"]')).toContainText('Careers');
  });

  test('should show dropdown menus on hover', async ({ page }) => {
    // Desktop viewport is required to see dropdowns
    await page.setViewportSize({ width: 1024, height: 768 });
    // Test Products dropdown
    const productsLink = page.locator('[data-testid="nav-products"]');
    const productsDropdown = page.locator('[data-testid="products-dropdown"]');
    
    await productsLink.hover();
    await expect(productsDropdown).toBeVisible();
    
    // Check dropdown links
    await expect(productsDropdown.locator('a[href="/products/upi"]')).toHaveText('UPI');
    await expect(productsDropdown.locator('a[href="/products/cash-loan"]')).toHaveText('Cash Loan');
    await expect(productsDropdown.locator('a[href="/products/home-loan"]')).toHaveText('Home Loan');
    await expect(productsDropdown.locator('a[href="/products/health-insurance"]')).toHaveText('Health Insurance');
    await expect(productsDropdown.locator('a[href="/products/mutual-funds"]')).toHaveText('Mutual Funds');

    // Test Resources dropdown
    const resourcesLink = page.locator('[data-testid="nav-resources"]');
    const resourcesDropdown = page.locator('[data-testid="resources-dropdown"]');
    
    await resourcesLink.hover();
    await expect(resourcesDropdown).toBeVisible();
    
    // Check dropdown links
    await expect(resourcesDropdown.locator('a[href="/resources/calculators"]')).toHaveText('Calculators');
    await expect(resourcesDropdown.locator('a[href="/resources/guides"]')).toHaveText('Guides');
    await expect(resourcesDropdown.locator('a[href="/resources/tools"]')).toHaveText('Tools');
  });

  test('should have CTA buttons', async ({ page }) => {
    // Desktop viewport for CTA buttons visibility
    await page.setViewportSize({ width: 1024, height: 768 });
    const ctaButtons = page.locator('[data-testid="cta-buttons"]');
    await expect(ctaButtons).toBeVisible();

    const loginBtn = page.locator('[data-testid="login-btn"]');
    const downloadBtn = page.locator('[data-testid="download-btn"]');
    
    await expect(loginBtn).toHaveText('Login');
    await expect(downloadBtn).toHaveText('Download App');
  });

  test('should toggle mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileMenuBtn = page.locator('[data-testid="mobile-menu-btn"]');
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    
    // Initially mobile menu should be hidden
    await expect(mobileMenu).toBeHidden();
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open mobile menu
    await mobileMenuBtn.click();
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close mobile menu
    await mobileMenuBtn.click();
    await expect(mobileMenu).toBeHidden();
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('should have mobile navigation links', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    const mobileMenuBtn = page.locator('[data-testid="mobile-menu-btn"]');
    await mobileMenuBtn.click();
    
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    // Check mobile navigation links
    await expect(page.locator('[data-testid="mobile-nav-products"]')).toHaveAttribute('href', '/products');
    await expect(page.locator('[data-testid="mobile-nav-why-navi"]')).toHaveAttribute('href', '/why-navi');
    await expect(page.locator('[data-testid="mobile-nav-about"]')).toHaveAttribute('href', '/about-us');
    await expect(page.locator('[data-testid="mobile-nav-resources"]')).toHaveAttribute('href', '/resources');
    await expect(page.locator('[data-testid="mobile-nav-careers"]')).toHaveAttribute('href', '/careers');
    
    // Check mobile CTA buttons
    const mobileLoginBtn = page.locator('[data-testid="mobile-login-btn"]');
    const mobileDownloadBtn = page.locator('[data-testid="mobile-download-btn"]');
    
    await expect(mobileLoginBtn).toHaveText('Login');
    await expect(mobileDownloadBtn).toHaveText('Download App');
  });

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const desktopNav = page.locator('[data-testid="desktop-nav"]');
    const ctaButtons = page.locator('[data-testid="cta-buttons"]');
    const mobileMenuBtn = page.locator('[data-testid="mobile-menu-btn"]');
    
    await expect(desktopNav).toBeVisible();
    await expect(ctaButtons).toBeVisible();
    await expect(mobileMenuBtn).toBeHidden();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(desktopNav).toBeHidden();
    await expect(ctaButtons).toBeHidden();
    await expect(mobileMenuBtn).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const mobileMenuBtn = page.locator('[data-testid="mobile-menu-btn"]');
    
    // Check screen reader text
    await expect(mobileMenuBtn.locator('.sr-only')).toHaveText('Open main menu');
    
    // Check aria-expanded attribute
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
    
    // Check aria-hidden on icons
    const hamburgerIcon = page.locator('[data-testid="hamburger-icon"]');
    await expect(hamburgerIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('should have sticky positioning', async ({ page }) => {
    const header = page.locator('[data-testid="header"]');
    
    // Check that header has sticky positioning classes
    await expect(header).toHaveClass(/sticky/);
    await expect(header).toHaveClass(/top-0/);
  });

  test('should handle edge cases', async ({ page }) => {
    // Test header without navigation
    await page.evaluate(() => {
      const minimalHeader = document.createElement('header');
      minimalHeader.setAttribute('data-testid', 'minimal-header');
      minimalHeader.className = 'bg-white border-b border-neutral-200 p-4';
      minimalHeader.innerHTML = '<div class="text-center">Minimal Header</div>';
      minimalHeader.style.minHeight = '1px'; // Make visible for testing
      document.body.appendChild(minimalHeader);
    });

    const minimalHeader = page.locator('[data-testid="minimal-header"]');
    await expect(minimalHeader).toBeVisible();
    await expect(minimalHeader).toContainText('Minimal Header');
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });
});
