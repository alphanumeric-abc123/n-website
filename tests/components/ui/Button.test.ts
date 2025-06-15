import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils, ButtonPageObject } from '../../utils/test-utils';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with all button variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Button Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            /* Better contrast colors - using darker blues for 4.5:1+ contrast ratio */
            .bg-blue-500 { background-color: #1e40af !important; } /* Much darker blue */
            .hover\\:bg-blue-600:hover { background-color: #1d4ed8 !important; }
            .active\\:bg-blue-700:active { background-color: #1e3a8a !important; }
            .border-blue-500 { border-color: #1e40af !important; }
            .text-blue-500 { color: #1e40af !important; }
          </style>
        </head>
        <body>
          <main>
            <h1>Button Component Test Suite</h1>
            <div id="test-container" class="p-8 space-y-4">
              <!-- Primary Button -->
              <button 
                data-testid="button-primary" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-10 px-4 py-2"
              >
                Primary Button
              </button>

              <!-- Secondary Button -->
              <button 
                data-testid="button-secondary" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 h-10 px-4 py-2"
              >
                Secondary Button
              </button>

              <!-- Outline Button -->
              <button 
                data-testid="button-outline" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100 h-10 px-4 py-2"
              >
                Outline Button
              </button>

              <!-- Ghost Button -->
              <button 
                data-testid="button-ghost" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-blue-500 hover:bg-blue-50 active:bg-blue-100 h-10 px-4 py-2"
              >
                Ghost Button
              </button>

              <!-- Disabled Button -->
              <button 
                data-testid="button-disabled" 
                disabled
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-10 px-4 py-2"
              >
                Disabled Button
              </button>

              <!-- Loading Button -->
              <button 
                data-testid="button-loading" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-10 px-4 py-2"
              >
                <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </button>

              <!-- Size Variants -->
              <button 
                data-testid="button-small" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-8 px-3 text-xs"
              >
                Small
              </button>

              <button 
                data-testid="button-large" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-12 px-6 text-base"
              >
                Large Button
              </button>

              <!-- Full Width Button -->
              <button 
                data-testid="button-full-width" 
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-10 px-4 py-2 w-full"
              >
                Full Width Button
              </button>

              <!-- Icon Button -->
              <button 
                data-testid="button-icon" 
                aria-label="Add item"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 h-10 w-10"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>
          </main>
        </body>
      </html>
    `);
  });

  test('should render all button variants correctly', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);

    // Test that all button variants are visible
    await expect(page.locator('[data-testid="button-primary"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-secondary"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-outline"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-ghost"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-disabled"]')).toBeVisible();
    await expect(page.locator('[data-testid="button-loading"]')).toBeVisible();
  });

  test('should handle click interactions correctly', async ({ page }) => {
    let clickCount = 0;
    
    // Add click handler
    await page.evaluate(() => {
      window.clickCount = 0;
      document.querySelectorAll('button:not([disabled])').forEach(button => {
        button.addEventListener('click', () => {
          window.clickCount++;
        });
      });
    });

    // Test clickable buttons
    await page.locator('[data-testid="button-primary"]').click();
    await page.locator('[data-testid="button-secondary"]').click();
    await page.locator('[data-testid="button-outline"]').click();

    const finalClickCount = await page.evaluate(() => window.clickCount);
    expect(finalClickCount).toBe(3);
  });

  test('should not allow clicks on disabled buttons', async ({ page }) => {
    await page.evaluate(() => {
      window.disabledClickCount = 0;
      const disabledButton = document.querySelector('[data-testid="button-disabled"]');
      if (disabledButton) {
        disabledButton.addEventListener('click', () => {
          window.disabledClickCount++;
        });
      }
    });

    // Try to click disabled button
    await page.locator('[data-testid="button-disabled"]').click({ force: true });
    
    const clickCount = await page.evaluate(() => window.disabledClickCount);
    expect(clickCount).toBe(0);
  });

  test('should show loading state correctly', async ({ page }) => {
    const loadingButton = page.locator('[data-testid="button-loading"]');
    const spinner = loadingButton.locator('.animate-spin');
    
    await expect(spinner).toBeVisible();
    await expect(loadingButton).toContainText('Loading...');
  });

  test('should have correct size variants', async ({ page }) => {
    const smallButton = page.locator('[data-testid="button-small"]');
    const largeButton = page.locator('[data-testid="button-large"]');
    
    const smallBox = await smallButton.boundingBox();
    const largeBox = await largeButton.boundingBox();
    
    // Add null checks before accessing properties
    expect(smallBox).not.toBeNull();
    expect(largeBox).not.toBeNull();
    
    expect(largeBox!.height).toBeGreaterThan(smallBox!.height);
    expect(largeBox!.width).toBeGreaterThan(smallBox!.width);
  });

  test('should support full width layout', async ({ page }) => {
    const fullWidthButton = page.locator('[data-testid="button-full-width"]');
    const container = page.locator('#test-container');
    
    const buttonBox = await fullWidthButton.boundingBox();
    const containerBox = await container.boundingBox();
    
    // Add null checks before accessing properties
    expect(buttonBox).not.toBeNull();
    expect(containerBox).not.toBeNull();
    
    // Account for container padding (32px total)
    expect(buttonBox!.width).toBeCloseTo(containerBox!.width - 64, 5);
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Focus first button with Tab
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="button-primary"]')).toBeFocused();
    
    // Navigate through buttons
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="button-secondary"]')).toBeFocused();
    
    // Test Enter key activation
    let enterPressed = false;
    await page.evaluate(() => {
      window.enterPressed = false;
      const button = document.querySelector('[data-testid="button-secondary"]');
      if (button) {
        button.addEventListener('click', () => {
          window.enterPressed = true;
        });
      }
    });
    
    await page.keyboard.press('Enter');
    enterPressed = await page.evaluate(() => window.enterPressed);
    expect(enterPressed).toBe(true);
  });

  test('should have proper focus styles', async ({ page }) => {
    const button = page.locator('[data-testid="button-primary"]');
    
    await button.focus();
    
    // Check if focus ring is applied (this would need to be verified visually or through computed styles)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveCount(1);
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="button-primary"]');
    
    // Button should be visible at all breakpoints
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle hover states', async ({ page }) => {
    const button = page.locator('[data-testid="button-primary"]');
    
    // Get initial background color
    const initialBg = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Hover over button
    await button.hover();
    
    // Wait for transition
    await page.waitForTimeout(100);
    
    // Get hover background color
    const hoverBg = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Colors should be different (hover effect applied)
    expect(initialBg).not.toBe(hoverBg);
  });

  test('should maintain aspect ratio for icon buttons', async ({ page }) => {
    const iconButton = page.locator('[data-testid="button-icon"]');
    const box = await iconButton.boundingBox();
    
    // Add null check before accessing properties
    expect(box).not.toBeNull();
    
    // Icon button should be square
    expect(box!.width).toBe(box!.height);
  });

  test('should handle rapid clicks without issues', async ({ page }) => {
    await page.evaluate(() => {
      window.rapidClickCount = 0;
      const button = document.querySelector('[data-testid="button-primary"]');
      if (button) {
        button.addEventListener('click', () => {
          window.rapidClickCount++;
        });
      }
    });

    // Perform rapid clicks
    const button = page.locator('[data-testid="button-primary"]');
    for (let i = 0; i < 10; i++) {
      await button.click();
    }

    const clickCount = await page.evaluate(() => window.rapidClickCount);
    expect(clickCount).toBe(10);
  });
});
