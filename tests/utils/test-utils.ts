import { test as base, expect, Page, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Extend the base test with custom fixtures
export const test = base.extend<{
  makeAxeBuilder: () => AxeBuilder;
}>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .exclude('#commonly-reused-element-with-known-issue');
    await use(makeAxeBuilder);
  },
});

export { expect } from '@playwright/test';

// Custom matchers and utilities
export class ComponentTestUtils {
  constructor(private page: Page) {}

  // Test responsive behavior across breakpoints
  async testResponsiveBreakpoints(selector: string, breakpoints = [375, 768, 1024, 1280, 1440]) {
    const results = [];
    
    for (const width of breakpoints) {
      await this.page.setViewportSize({ width, height: 800 });
      await this.page.waitForTimeout(100); // Allow for responsive changes
      
      const element = this.page.locator(selector);
      await expect(element).toBeVisible();
      
      const boundingBox = await element.boundingBox();
      results.push({
        breakpoint: width,
        visible: await element.isVisible(),
        boundingBox,
      });
    }
    
    return results;
  }

  // Test component variants
  async testComponentVariants(baseSelector: string, variants: Record<string, string>) {
    const results = [];
    
    for (const [variantName, variantSelector] of Object.entries(variants)) {
      const element = this.page.locator(`${baseSelector}${variantSelector}`);
      const isVisible = await element.isVisible();
      const classes = await element.getAttribute('class');
      
      results.push({
        variant: variantName,
        selector: variantSelector,
        visible: isVisible,
        classes,
      });
    }
    
    return results;
  }

  // Test accessibility features
  async testAccessibility(selector?: string) {
    const axeBuilder = new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']);
    
    if (selector) {
      axeBuilder.include(selector);
    }
    
    const accessibilityScanResults = await axeBuilder.analyze();
    return accessibilityScanResults;
  }

  // Test keyboard navigation
  async testKeyboardNavigation(focusableElements: string[]) {
    const results = [];
    
    for (let i = 0; i < focusableElements.length; i++) {
      await this.page.keyboard.press('Tab');
      const focusedElement = await this.page.locator(':focus');
      const matches = await focusedElement.locator(focusableElements[i]).count() > 0;
      
      results.push({
        index: i,
        selector: focusableElements[i],
        focused: matches,
      });
    }
    
    return results;
  }

  // Test component loading states
  async testLoadingStates(selector: string, loadingClass = 'loading') {
    const element = this.page.locator(selector);
    
    // Check if loading state is present initially
    const hasLoadingState = await element.locator(`.${loadingClass}`).count() > 0;
    
    // Wait for loading to complete
    if (hasLoadingState) {
      await expect(element.locator(`.${loadingClass}`)).toBeHidden({ timeout: 10000 });
    }
    
    return {
      hadLoadingState: hasLoadingState,
      finallyLoaded: await element.isVisible(),
    };
  }

  // Test form interactions
  async testFormField(selector: string, value: string, expectedValidation?: string) {
    const field = this.page.locator(selector);
    
    await field.fill(value);
    await field.blur();
    
    const fieldValue = await field.inputValue();
    const hasError = expectedValidation 
      ? await this.page.locator(`text=${expectedValidation}`).isVisible()
      : false;
    
    return {
      value: fieldValue,
      hasValidationError: hasError,
    };
  }

  // Test component animations
  async testAnimations(selector: string, triggerAction: () => Promise<void>) {
    const element = this.page.locator(selector);
    
    // Get initial state
    const initialBox = await element.boundingBox();
    const initialOpacity = await element.evaluate(el => getComputedStyle(el).opacity);
    
    // Trigger animation
    await triggerAction();
    
    // Wait for animation to complete
    await this.page.waitForTimeout(500);
    
    // Get final state
    const finalBox = await element.boundingBox();
    const finalOpacity = await element.evaluate(el => getComputedStyle(el).opacity);
    
    return {
      positionChanged: JSON.stringify(initialBox) !== JSON.stringify(finalBox),
      opacityChanged: initialOpacity !== finalOpacity,
      initialState: { box: initialBox, opacity: initialOpacity },
      finalState: { box: finalBox, opacity: finalOpacity },
    };
  }
}

// Page Object Models
export class HeaderPageObject {
  constructor(private page: Page) {}

  get logo() { return this.page.locator('[data-testid="header-logo"]'); }
  get mobileMenuButton() { return this.page.locator('[data-testid="mobile-menu-button"]'); }
  get mobileMenu() { return this.page.locator('[data-testid="mobile-menu"]'); }
  get navigationLinks() { return this.page.locator('[data-testid="nav-link"]'); }
  get ctaButtons() { return this.page.locator('[data-testid="header-cta"]'); }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
    await expect(this.mobileMenu).toBeVisible();
  }

  async closeMobileMenu() {
    await this.mobileMenuButton.click();
    await expect(this.mobileMenu).toBeHidden();
  }

  async navigateTo(linkText: string) {
    await this.page.locator(`text=${linkText}`).click();
  }
}

export class FooterPageObject {
  constructor(private page: Page) {}

  get footerSections() { return this.page.locator('[data-testid="footer-section"]'); }
  get socialLinks() { return this.page.locator('[data-testid="social-link"]'); }
  get complianceInfo() { return this.page.locator('[data-testid="compliance-info"]'); }
  get contactInfo() { return this.page.locator('[data-testid="contact-info"]'); }

  async clickSocialLink(platform: string) {
    await this.page.locator(`[data-testid="social-link-${platform}"]`).click();
  }
}

export class ButtonPageObject {
  constructor(private page: Page, private selector: string) {}

  get element() { return this.page.locator(this.selector); }

  async click() {
    await this.element.click();
  }

  async hover() {
    await this.element.hover();
  }

  async focus() {
    await this.element.focus();
  }

  async getVariant() {
    const classes = await this.element.getAttribute('class');
    return classes;
  }

  async isDisabled() {
    return await this.element.isDisabled();
  }

  async isLoading() {
    return await this.element.locator('.animate-spin').isVisible();
  }
}
