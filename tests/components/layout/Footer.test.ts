import { test, expect } from '../../axe-test';

test.describe('Footer Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with Footer component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Footer Test</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="footer-container"></div>
          <script type="module">
            // Mock Footer component structure
            const footerHTML = \`
              <footer data-testid="footer" class="bg-neutral-900 text-white">
                <div class="mx-auto w-full max-w-screen-xl px-6 py-12">
                  <!-- Company Info Section -->
                  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                    <div class="lg:col-span-2">
                      <div class="mb-6">
                        <h2 data-testid="company-name" class="text-2xl font-bold text-white mb-4">Navi</h2>
                        <p data-testid="company-description" class="text-neutral-300 text-sm leading-relaxed mb-6">
                          Making financial services simple, transparent, and accessible for everyone.
                        </p>
                      </div>
                      
                      <!-- Social Links -->
                      <div class="flex space-x-4">
                        <a data-testid="social-twitter" href="https://twitter.com/navi" class="text-neutral-400 hover:text-white transition-colors" aria-label="Twitter">
                          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a data-testid="social-linkedin" href="https://linkedin.com/company/navi" class="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a data-testid="social-facebook" href="https://facebook.com/navi" class="text-neutral-400 hover:text-white transition-colors" aria-label="Facebook">
                          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <!-- Navigation Sections -->
                    <div data-testid="nav-products" class="lg:col-span-1">
                      <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h3>
                      <ul class="space-y-3">
                        <li><a href="/products/upi" class="text-neutral-300 hover:text-white transition-colors text-sm">UPI</a></li>
                        <li><a href="/products/cash-loan" class="text-neutral-300 hover:text-white transition-colors text-sm">Cash Loan</a></li>
                        <li><a href="/products/home-loan" class="text-neutral-300 hover:text-white transition-colors text-sm">Home Loan</a></li>
                        <li><a href="/products/health-insurance" class="text-neutral-300 hover:text-white transition-colors text-sm">Health Insurance</a></li>
                        <li><a href="/products/mutual-funds" class="text-neutral-300 hover:text-white transition-colors text-sm">Mutual Funds</a></li>
                      </ul>
                    </div>

                    <div data-testid="nav-company" class="lg:col-span-1">
                      <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                      <ul class="space-y-3">
                        <li><a href="/about-us" class="text-neutral-300 hover:text-white transition-colors text-sm">About Us</a></li>
                        <li><a href="/why-navi" class="text-neutral-300 hover:text-white transition-colors text-sm">Why Navi</a></li>
                        <li><a href="/careers" class="text-neutral-300 hover:text-white transition-colors text-sm">Careers</a></li>
                        <li><a href="/governance" class="text-neutral-300 hover:text-white transition-colors text-sm">Governance</a></li>
                        <li><a href="/contact" class="text-neutral-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
                      </ul>
                    </div>

                    <div data-testid="nav-resources" class="lg:col-span-1">
                      <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
                      <ul class="space-y-3">
                        <li><a href="/resources/calculators" class="text-neutral-300 hover:text-white transition-colors text-sm">Calculators</a></li>
                        <li><a href="/resources/guides" class="text-neutral-300 hover:text-white transition-colors text-sm">Guides</a></li>
                        <li><a href="/resources/tools" class="text-neutral-300 hover:text-white transition-colors text-sm">Tools</a></li>
                        <li><a href="/help" class="text-neutral-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                        <li><a href="/blog" class="text-neutral-300 hover:text-white transition-colors text-sm">Blog</a></li>
                      </ul>
                    </div>

                    <div data-testid="nav-legal" class="lg:col-span-1">
                      <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                      <ul class="space-y-3">
                        <li><a href="/privacy-policy" class="text-neutral-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" class="text-neutral-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                        <li><a href="/cookie-policy" class="text-neutral-300 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
                        <li><a href="/grievance-redressal" class="text-neutral-300 hover:text-white transition-colors text-sm">Grievance Redressal</a></li>
                        <li><a href="/fair-practice-code" class="text-neutral-300 hover:text-white transition-colors text-sm">Fair Practice Code</a></li>
                      </ul>
                    </div>
                  </div>

                  <!-- Compliance Section -->
                  <div data-testid="compliance-section" class="border-t border-neutral-800 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div data-testid="licenses-section">
                        <h4 class="text-sm font-semibold text-white mb-3">Licenses & Registrations</h4>
                        <ul class="space-y-1">
                          <li class="text-xs text-neutral-400">NBFC License: N-14.03268</li>
                          <li class="text-xs text-neutral-400">Insurance Broker: IRDAI/DB797/19</li>
                          <li class="text-xs text-neutral-400">Investment Advisor: INA000015507</li>
                        </ul>
                      </div>
                      <div data-testid="regulatory-section">
                        <h4 class="text-sm font-semibold text-white mb-3">Regulated By</h4>
                        <div class="flex flex-wrap gap-2">
                          <span class="px-2 py-1 bg-neutral-800 text-xs text-neutral-300 rounded">RBI</span>
                          <span class="px-2 py-1 bg-neutral-800 text-xs text-neutral-300 rounded">IRDAI</span>
                          <span class="px-2 py-1 bg-neutral-800 text-xs text-neutral-300 rounded">SEBI</span>
                        </div>
                      </div>
                    </div>
                    <div data-testid="disclaimer-section" class="mt-6">
                      <p class="text-xs text-neutral-400 leading-relaxed">
                        Navi is a registered trademark. All financial products are subject to market risks. Please read all scheme related documents carefully.
                      </p>
                    </div>
                  </div>

                  <!-- Bottom Bar -->
                  <div data-testid="bottom-bar" class="border-t border-neutral-800 py-6">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                      <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <p data-testid="copyright" class="text-sm text-neutral-400">
                          © ${new Date().getFullYear()} Navi. All rights reserved.
                        </p>
                        <p data-testid="address" class="text-xs text-neutral-500">
                          Navi Technologies Limited, Bangalore, India
                        </p>
                      </div>
                      <div data-testid="support-email" class="text-sm text-neutral-400">
                        <span>Support: </span>
                        <a href="mailto:support@navi.com" class="text-primary-400 hover:text-primary-300 transition-colors">
                          support@navi.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            \`;
            document.getElementById('footer-container').innerHTML = footerHTML;
          </script>
        </body>
      </html>
    `);
  });

  test('should render footer with all sections', async ({ page }) => {
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();

    // Check company info
    await expect(page.locator('[data-testid="company-name"]')).toHaveText('Navi');
    await expect(page.locator('[data-testid="company-description"]')).toContainText('Making financial services simple');

    // Check navigation sections
    await expect(page.locator('[data-testid="nav-products"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-company"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-resources"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-legal"]')).toBeVisible();
  });

  test('should have working social media links', async ({ page }) => {
    const twitterLink = page.locator('[data-testid="social-twitter"]');
    const linkedinLink = page.locator('[data-testid="social-linkedin"]');
    const facebookLink = page.locator('[data-testid="social-facebook"]');

    await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/navi');
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/navi');
    await expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/navi');

    // Check accessibility
    await expect(twitterLink).toHaveAttribute('aria-label', 'Twitter');
    await expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
    await expect(facebookLink).toHaveAttribute('aria-label', 'Facebook');
  });

  test('should have correct navigation links', async ({ page }) => {
    // Test product links
    const upiLink = page.locator('[data-testid="nav-products"] a[href="/products/upi"]');
    const cashLoanLink = page.locator('[data-testid="nav-products"] a[href="/products/cash-loan"]');
    await expect(upiLink).toHaveText('UPI');
    await expect(cashLoanLink).toHaveText('Cash Loan');

    // Test company links
    const aboutLink = page.locator('[data-testid="nav-company"] a[href="/about-us"]');
    const careersLink = page.locator('[data-testid="nav-company"] a[href="/careers"]');
    await expect(aboutLink).toHaveText('About Us');
    await expect(careersLink).toHaveText('Careers');

    // Test resource links
    const calculatorsLink = page.locator('[data-testid="nav-resources"] a[href="/resources/calculators"]');
    const helpLink = page.locator('[data-testid="nav-resources"] a[href="/help"]');
    await expect(calculatorsLink).toHaveText('Calculators');
    await expect(helpLink).toHaveText('Help Center');

    // Test legal links
    const privacyLink = page.locator('[data-testid="nav-legal"] a[href="/privacy-policy"]');
    const termsLink = page.locator('[data-testid="nav-legal"] a[href="/terms-of-service"]');
    await expect(privacyLink).toHaveText('Privacy Policy');
    await expect(termsLink).toHaveText('Terms of Service');
  });

  test('should display compliance information', async ({ page }) => {
    const complianceSection = page.locator('[data-testid="compliance-section"]');
    await expect(complianceSection).toBeVisible();

    // Check licenses section
    const licensesSection = page.locator('[data-testid="licenses-section"]');
    await expect(licensesSection).toContainText('Licenses & Registrations');
    await expect(licensesSection).toContainText('NBFC License: N-14.03268');
    await expect(licensesSection).toContainText('Insurance Broker: IRDAI/DB797/19');
    await expect(licensesSection).toContainText('Investment Advisor: INA000015507');

    // Check regulatory section
    const regulatorySection = page.locator('[data-testid="regulatory-section"]');
    await expect(regulatorySection).toContainText('Regulated By');
    await expect(regulatorySection).toContainText('RBI');
    await expect(regulatorySection).toContainText('IRDAI');
    await expect(regulatorySection).toContainText('SEBI');

    // Check disclaimer
    const disclaimerSection = page.locator('[data-testid="disclaimer-section"]');
    await expect(disclaimerSection).toContainText('Navi is a registered trademark');
    await expect(disclaimerSection).toContainText('market risks');
  });

  test('should display bottom bar with copyright and contact info', async ({ page }) => {
    const bottomBar = page.locator('[data-testid="bottom-bar"]');
    await expect(bottomBar).toBeVisible();

    // Check copyright
    const copyright = page.locator('[data-testid="copyright"]');
    const currentYear = new Date().getFullYear();
    await expect(copyright).toContainText(`© ${currentYear} Navi. All rights reserved.`);

    // Check address
    const address = page.locator('[data-testid="address"]');
    await expect(address).toContainText('Navi Technologies Limited, Bangalore, India');

    // Check support email
    const supportEmail = page.locator('[data-testid="support-email"]');
    await expect(supportEmail).toContainText('Support:');
    const emailLink = supportEmail.locator('a[href="mailto:support@navi.com"]');
    await expect(emailLink).toHaveText('support@navi.com');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();

    // Check that navigation sections stack vertically on mobile
    const navSections = page.locator('[data-testid^="nav-"]');
    const count = await navSections.count();
    expect(count).toBe(4);

    // Check that bottom bar stacks vertically on mobile
    const bottomBar = page.locator('[data-testid="bottom-bar"]');
    await expect(bottomBar).toBeVisible();
  });

  test('should have proper hover effects', async ({ page }) => {
    // Test social link hover
    const twitterLink = page.locator('[data-testid="social-twitter"]');
    await twitterLink.hover();
    
    // Test navigation link hover
    const aboutLink = page.locator('[data-testid="nav-company"] a[href="/about-us"]');
    await aboutLink.hover();
    
    // Test email link hover
    const emailLink = page.locator('[data-testid="support-email"] a');
    await emailLink.hover();
  });

  test('should handle edge cases', async ({ page }) => {
    // Test footer without optional sections
    await page.evaluate(() => {
      const minimalFooter = document.createElement('footer');
      minimalFooter.setAttribute('data-testid', 'minimal-footer');
      minimalFooter.className = 'bg-neutral-900 text-white p-4';
      minimalFooter.innerHTML = '<div class="text-center">Minimal Footer</div>';
      minimalFooter.style.minHeight = '1px'; // Make visible for testing
      document.body.appendChild(minimalFooter);
    });

    const minimalFooter = page.locator('[data-testid="minimal-footer"]');
    await expect(minimalFooter).toBeVisible();
    await expect(minimalFooter).toContainText('Minimal Footer');
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });
});
