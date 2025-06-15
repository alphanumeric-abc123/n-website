import { test as base, expect, Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import type { Result, RunOptions } from 'axe-core'; // Import types from axe-core

// Define the fixture type
export interface AxeFixture {
  makeAxeBuilder: () => AxeBuilder; // Returns an AxeBuilder instance
}

// Extend the base test with the Axe fixture
export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }: { page: Page }, use: (builderFactory: () => AxeBuilder) => Promise<void>) => {
    // The AxeBuilder constructor takes the page.
    // AxeBuilder handles injecting Axe internally when analyze() is called or other operations are performed.
    const axeBuilderFactory = () => new AxeBuilder({ page });
    await use(axeBuilderFactory);
  },
});

export { expect }; // Re-export expect
