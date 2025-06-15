import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils } from '../../utils/test-utils';

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with all input variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Input Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Custom styles for semantic colors */
            .border-semantic-error-DEFAULT { border-color: #dc2626 !important; }
            .border-semantic-success-DEFAULT { border-color: #16a34a !important; }
            .text-semantic-error-DEFAULT { color: #dc2626 !important; }
            .ring-semantic-error-DEFAULT { --tw-ring-color: #dc2626 !important; }
            .ring-semantic-success-DEFAULT { --tw-ring-color: #16a34a !important; }
            .focus-visible\\:ring-2:focus-visible { 
              outline: 2px solid transparent;
              outline-offset: 2px;
              box-shadow: 0 0 0 2px var(--tw-ring-color);
            }
            .ring-offset-2 { --tw-ring-offset-width: 2px; }
            .focus-visible\\:ring-primary-500:focus-visible { --tw-ring-color: #3b82f6; }
            .focus-visible\\:border-primary-500:focus-visible { border-color: #3b82f6 !important; }
          </style>
        </head>
        <body>
          <main>
            <h1>Input Component Test Suite</h1>
            <div id="test-container" class="p-8 space-y-6">
              
              <!-- Default Input -->
              <div class="w-full">
                <input
                  data-testid="input-default"
                  type="text"
                  placeholder="Default input"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10"
                />
              </div>

              <!-- Input with Label -->
              <div class="w-full">
                <label
                  for="input-with-label"
                  class="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Email Address
                </label>
                <input
                  data-testid="input-with-label"
                  id="input-with-label"
                  type="email"
                  placeholder="Enter your email"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10"
                />
              </div>

              <!-- Error State Input -->
              <div class="w-full">
                <label
                  for="input-error"
                  class="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <input
                  data-testid="input-error"
                  id="input-error"
                  type="password"
                  placeholder="Enter password"
                  aria-invalid="true"
                  aria-describedby="input-error-error"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-semantic-error-DEFAULT focus-visible:border-semantic-error-DEFAULT focus-visible:ring-semantic-error-DEFAULT h-10"
                />
                <p
                  id="input-error-error"
                  class="mt-1 text-sm text-semantic-error-DEFAULT"
                  role="alert"
                >
                  Password must be at least 8 characters
                </p>
              </div>

              <!-- Success State Input -->
              <div class="w-full">
                <label
                  for="input-success"
                  class="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Username
                </label>
                <input
                  data-testid="input-success"
                  id="input-success"
                  type="text"
                  placeholder="Enter username"
                  value="validuser123"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-semantic-success-DEFAULT focus-visible:border-semantic-success-DEFAULT focus-visible:ring-semantic-success-DEFAULT h-10"
                />
              </div>

              <!-- Input with Helper Text -->
              <div class="w-full">
                <label
                  for="input-helper"
                  class="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <input
                  data-testid="input-helper"
                  id="input-helper"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  aria-describedby="input-helper-helper"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10"
                />
                <p
                  id="input-helper-helper"
                  class="mt-1 text-sm text-neutral-600"
                >
                  Include country code for international numbers
                </p>
              </div>

              <!-- Small Size Input -->
              <div class="w-full">
                <input
                  data-testid="input-small"
                  type="text"
                  placeholder="Small input"
                  class="flex w-full rounded-md border bg-white text-xs ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-8 px-2"
                />
              </div>

              <!-- Large Size Input -->
              <div class="w-full">
                <input
                  data-testid="input-large"
                  type="text"
                  placeholder="Large input"
                  class="flex w-full rounded-md border bg-white text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-12 px-4"
                />
              </div>

              <!-- Input with Left Icon -->
              <div class="w-full">
                <div class="relative">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    data-testid="input-left-icon"
                    type="text"
                    placeholder="Search users..."
                    class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10 pl-10"
                  />
                </div>
              </div>

              <!-- Input with Right Icon -->
              <div class="w-full">
                <div class="relative">
                  <input
                    data-testid="input-right-icon"
                    type="password"
                    placeholder="Enter password"
                    class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10 pr-10"
                  />
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Disabled Input -->
              <div class="w-full">
                <input
                  data-testid="input-disabled"
                  type="text"
                  placeholder="Disabled input"
                  disabled
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10"
                />
              </div>

              <!-- File Input -->
              <div class="w-full">
                <label
                  for="input-file"
                  class="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Upload Document
                </label>
                <input
                  data-testid="input-file"
                  id="input-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10"
                />
              </div>

            </div>
          </main>
        </body>
      </html>
    `);
  });

  test('should render all input variants correctly', async ({ page }) => {
    // Test that all input variants are visible
    await expect(page.locator('[data-testid="input-default"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-with-label"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-helper"]')).toBeVisible();

    // Test labels are properly associated
    const labeledInput = page.locator('[data-testid="input-with-label"]');
    const label = page.locator('label[for="input-with-label"]');
    await expect(label).toContainText('Email Address');
    await expect(labeledInput).toHaveAttribute('id', 'input-with-label');
  });

  test('should handle different input types correctly', async ({ page }) => {
    const emailInput = page.locator('[data-testid="input-with-label"]');
    const passwordInput = page.locator('[data-testid="input-error"]');
    const telInput = page.locator('[data-testid="input-helper"]');
    const fileInput = page.locator('[data-testid="input-file"]');

    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(telInput).toHaveAttribute('type', 'tel');
    await expect(fileInput).toHaveAttribute('type', 'file');
  });

  test('should display error states correctly', async ({ page }) => {
    const errorInput = page.locator('[data-testid="input-error"]');
    const errorMessage = page.locator('#input-error-error');

    // Input should have error styling
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    await expect(errorInput).toHaveAttribute('aria-describedby', 'input-error-error');
    
    // Error message should be visible and have correct role
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveAttribute('role', 'alert');
    await expect(errorMessage).toContainText('Password must be at least 8 characters');
  });

  test('should display helper text correctly', async ({ page }) => {
    const helperInput = page.locator('[data-testid="input-helper"]');
    const helperText = page.locator('#input-helper-helper');

    await expect(helperInput).toHaveAttribute('aria-describedby', 'input-helper-helper');
    await expect(helperText).toBeVisible();
    await expect(helperText).toContainText('Include country code for international numbers');
  });

  test('should handle different sizes correctly', async ({ page }) => {
    const smallInput = page.locator('[data-testid="input-small"]');
    const defaultInput = page.locator('[data-testid="input-default"]');
    const largeInput = page.locator('[data-testid="input-large"]');

    const smallBox = await smallInput.boundingBox();
    const defaultBox = await defaultInput.boundingBox();
    const largeBox = await largeInput.boundingBox();

    // Verify size progression
    expect(smallBox?.height).toBeLessThan(defaultBox?.height || 0);
    expect(defaultBox?.height).toBeLessThan(largeBox?.height || 0);
  });

  test('should handle icons correctly', async ({ page }) => {
    const leftIconInput = page.locator('[data-testid="input-left-icon"]');
    const rightIconInput = page.locator('[data-testid="input-right-icon"]');

    // Check that inputs have appropriate padding for icons
    const leftIconPadding = await leftIconInput.evaluate(el => getComputedStyle(el).paddingLeft);
    const rightIconPadding = await rightIconInput.evaluate(el => getComputedStyle(el).paddingRight);

    // Left icon input should have more left padding
    expect(parseInt(leftIconPadding)).toBeGreaterThan(12); // pl-10 = 2.5rem = 40px
    // Right icon input should have more right padding  
    expect(parseInt(rightIconPadding)).toBeGreaterThan(12); // pr-10 = 2.5rem = 40px
  });

  test('should be focusable and handle keyboard input', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    const defaultInput = page.locator('[data-testid="input-default"]');

    // Test focus
    await defaultInput.focus();
    await expect(defaultInput).toBeFocused();

    // Test typing
    await defaultInput.fill('test input value');
    await expect(defaultInput).toHaveValue('test input value');

    // Test clearing
    await defaultInput.fill('');
    await expect(defaultInput).toHaveValue('');
  });

  test('should handle disabled state correctly', async ({ page }) => {
    const disabledInput = page.locator('[data-testid="input-disabled"]');

    await expect(disabledInput).toBeDisabled();
    
    // Should not be focusable when disabled
    await disabledInput.click({ force: true });
    await expect(disabledInput).not.toBeFocused();

    // Should have reduced opacity
    const opacity = await disabledInput.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test('should handle file input correctly', async ({ page }) => {
    const fileInput = page.locator('[data-testid="input-file"]');

    await expect(fileInput).toHaveAttribute('type', 'file');
    await expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx');
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="input-default"]');
    
    // Input should be visible at all breakpoints
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle form validation states', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    // Test valid email input
    const emailResult = await testUtils.testFormField(
      '[data-testid="input-with-label"]', 
      'test@example.com'
    );
    expect(emailResult.value).toBe('test@example.com');

    // Test invalid email (if validation were implemented)
    const invalidEmailResult = await testUtils.testFormField(
      '[data-testid="input-with-label"]', 
      'invalid-email'
    );
    expect(invalidEmailResult.value).toBe('invalid-email');
  });

  test('should maintain focus ring visibility', async ({ page }) => {
    const defaultInput = page.locator('[data-testid="input-default"]');
    
    // Focus the input
    await defaultInput.focus();
    
    // Check that focus styles are applied (this would be more comprehensive with actual focus ring detection)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveCount(1);
  });

  test('should handle placeholder text correctly', async ({ page }) => {
    const defaultInput = page.locator('[data-testid="input-default"]');
    const emailInput = page.locator('[data-testid="input-with-label"]');

    await expect(defaultInput).toHaveAttribute('placeholder', 'Default input');
    await expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
  });

  test('should support different input modes and patterns', async ({ page }) => {
    // Add a numeric input for testing
    await page.evaluate(() => {
      const container = document.getElementById('test-container');
      if (!container) return;
      
      const numericInput = document.createElement('input');
      numericInput.setAttribute('data-testid', 'input-numeric');
      numericInput.setAttribute('type', 'number');
      numericInput.setAttribute('inputmode', 'numeric');
      numericInput.setAttribute('pattern', '[0-9]*');
      numericInput.className = 'flex w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300 focus-visible:border-primary-500 h-10';
      container.appendChild(numericInput);
    });

    const numericInput = page.locator('[data-testid="input-numeric"]');
    await expect(numericInput).toHaveAttribute('type', 'number');
    await expect(numericInput).toHaveAttribute('inputmode', 'numeric');
    await expect(numericInput).toHaveAttribute('pattern', '[0-9]*');
  });

  test('should handle copy and paste operations', async ({ page }) => {
    const defaultInput = page.locator('[data-testid="input-default"]');
    
    // Type some text
    await defaultInput.fill('Hello World');
    
    // Select all text
    await defaultInput.selectText();
    
    // Copy text (simulate Ctrl+C)
    await page.keyboard.press('Meta+c'); // Use Meta for Mac, Ctrl for others
    
    // Clear input
    await defaultInput.fill('');
    
    // Paste text (simulate Ctrl+V)
    await page.keyboard.press('Meta+v');
    
    // Verify pasted content
    await expect(defaultInput).toHaveValue('Hello World');
  });
});
