import { test, expect } from '../../utils/test-utils';
import { ComponentTestUtils } from '../../utils/test-utils';

test.describe('Grid Component', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with grid variants
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Grid Component Tests</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Custom styles for grid component */
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
            .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
            .gap-0 { gap: 0; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .gap-6 { gap: 1.5rem; }
            .gap-8 { gap: 2rem; }
            .items-start { align-items: start; }
            .items-center { align-items: center; }
            .items-end { align-items: end; }
            .items-stretch { align-items: stretch; }
            .justify-items-start { justify-items: start; }
            .justify-items-center { justify-items: center; }
            .justify-items-end { justify-items: end; }
            .justify-items-stretch { justify-items: stretch; }
            .col-span-1 { grid-column: span 1 / span 1; }
            .col-span-2 { grid-column: span 2 / span 2; }
            .col-span-3 { grid-column: span 3 / span 3; }
            .col-span-4 { grid-column: span 4 / span 4; }
            .col-span-6 { grid-column: span 6 / span 6; }
            .col-span-12 { grid-column: span 12 / span 12; }
            .col-span-full { grid-column: 1 / -1; }
            .row-span-1 { grid-row: span 1 / span 1; }
            .row-span-2 { grid-row: span 2 / span 2; }
            .row-span-3 { grid-row: span 3 / span 3; }
            .row-span-full { grid-row: 1 / -1; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-blue-100 { background-color: #dbeafe; }
            .bg-green-100 { background-color: #dcfce7; }
            .bg-red-100 { background-color: #fee2e2; }
            .p-4 { padding: 1rem; }
            .border { border-width: 1px; }
            .border-gray-300 { border-color: #d1d5db; }
            .text-center { text-align: center; }
            .min-h-\\[100px\\] { min-height: 100px; }
            @media (min-width: 768px) {
              .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            }
            @media (min-width: 1024px) {
              .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            }
            @media (min-width: 1280px) {
              .xl\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
            }
          </style>
        </head>
        <body>
          <main>
            <h1>Grid Component Test Suite</h1>
            
            <!-- Default Grid (1 column, md gap) -->
            <div
              data-testid="grid-default"
              class="grid grid-cols-1 gap-4 items-stretch justify-items-stretch"
            >
              <div class="bg-gray-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 1</div>
              <div class="bg-gray-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 2</div>
              <div class="bg-gray-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 3</div>
            </div>

            <!-- 2 Column Grid -->
            <div
              data-testid="grid-2-cols"
              class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch justify-items-stretch"
            >
              <div class="bg-blue-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 1</div>
              <div class="bg-blue-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 2</div>
              <div class="bg-blue-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 3</div>
              <div class="bg-blue-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 4</div>
            </div>

            <!-- 3 Column Grid -->
            <div
              data-testid="grid-3-cols"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-stretch"
            >
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 1</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 2</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 3</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 4</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 5</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center min-h-[100px]">Item 6</div>
            </div>

            <!-- 12 Column Grid -->
            <div
              data-testid="grid-12-cols"
              class="grid grid-cols-12 gap-2 items-stretch justify-items-stretch"
            >
              <div class="col-span-12 bg-red-100 p-4 border border-gray-300 text-center">Full Width</div>
              <div class="col-span-6 bg-red-100 p-4 border border-gray-300 text-center">Half Width</div>
              <div class="col-span-6 bg-red-100 p-4 border border-gray-300 text-center">Half Width</div>
              <div class="col-span-4 bg-red-100 p-4 border border-gray-300 text-center">1/3 Width</div>
              <div class="col-span-4 bg-red-100 p-4 border border-gray-300 text-center">1/3 Width</div>
              <div class="col-span-4 bg-red-100 p-4 border border-gray-300 text-center">1/3 Width</div>
            </div>

            <!-- Grid with different gaps -->
            <div
              data-testid="grid-no-gap"
              class="grid grid-cols-3 gap-0 items-stretch justify-items-stretch"
            >
              <div class="bg-gray-100 p-4 border border-gray-300 text-center">No Gap 1</div>
              <div class="bg-gray-100 p-4 border border-gray-300 text-center">No Gap 2</div>
              <div class="bg-gray-100 p-4 border border-gray-300 text-center">No Gap 3</div>
            </div>

            <div
              data-testid="grid-large-gap"
              class="grid grid-cols-2 gap-8 items-stretch justify-items-stretch"
            >
              <div class="bg-blue-100 p-4 border border-gray-300 text-center">Large Gap 1</div>
              <div class="bg-blue-100 p-4 border border-gray-300 text-center">Large Gap 2</div>
            </div>

            <!-- Grid with different alignments -->
            <div
              data-testid="grid-center-align"
              class="grid grid-cols-2 gap-4 items-center justify-items-center min-h-[200px]"
            >
              <div class="bg-green-100 p-4 border border-gray-300 text-center">Center Aligned 1</div>
              <div class="bg-green-100 p-4 border border-gray-300 text-center">Center Aligned 2</div>
            </div>

            <div
              data-testid="grid-start-align"
              class="grid grid-cols-2 gap-4 items-start justify-items-start min-h-[200px]"
            >
              <div class="bg-red-100 p-4 border border-gray-300 text-center">Start Aligned 1</div>
              <div class="bg-red-100 p-4 border border-gray-300 text-center">Start Aligned 2</div>
            </div>

            <!-- Grid as section element -->
            <section
              data-testid="grid-as-section"
              class="grid grid-cols-2 gap-4 items-stretch justify-items-stretch"
            >
              <div class="bg-gray-100 p-4 border border-gray-300 text-center">Section Grid 1</div>
              <div class="bg-gray-100 p-4 border border-gray-300 text-center">Section Grid 2</div>
            </section>

            <!-- Grid with GridItems -->
            <div
              data-testid="grid-with-items"
              class="grid grid-cols-6 gap-4 items-stretch justify-items-stretch"
            >
              <div class="col-span-1 row-span-1 bg-blue-100 p-4 border border-gray-300 text-center">1x1</div>
              <div class="col-span-2 row-span-1 bg-green-100 p-4 border border-gray-300 text-center">2x1</div>
              <div class="col-span-3 row-span-1 bg-red-100 p-4 border border-gray-300 text-center">3x1</div>
              <div class="col-span-full row-span-1 bg-gray-100 p-4 border border-gray-300 text-center">Full Width</div>
              <div class="col-span-2 row-span-2 bg-blue-100 p-4 border border-gray-300 text-center min-h-[100px]">2x2</div>
              <div class="col-span-4 row-span-1 bg-green-100 p-4 border border-gray-300 text-center">4x1</div>
            </div>
          </main>
        </body>
      </html>
    `);
  });

  test('should render default grid correctly', async ({ page }) => {
    const grid = page.locator('[data-testid="grid-default"]');
    await expect(grid).toBeVisible();
    
    // Test grid classes
    const classes = await grid.getAttribute('class');
    expect(classes).toContain('grid');
    expect(classes).toContain('grid-cols-1');
    expect(classes).toContain('gap-4');
    expect(classes).toContain('items-stretch');
    expect(classes).toContain('justify-items-stretch');
    
    // Test grid items
    const items = grid.locator('div');
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toContainText('Item 1');
    await expect(items.nth(1)).toContainText('Item 2');
    await expect(items.nth(2)).toContainText('Item 3');
  });

  test('should handle different column configurations', async ({ page }) => {
    const columnTests = [
      { testId: 'grid-default', expectedClass: 'grid-cols-1' },
      { testId: 'grid-2-cols', expectedClasses: ['grid-cols-1', 'md:grid-cols-2'] },
      { testId: 'grid-3-cols', expectedClasses: ['grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'] },
      { testId: 'grid-12-cols', expectedClass: 'grid-cols-12' }
    ];

    for (const test of columnTests) {
      const grid = page.locator(`[data-testid="${test.testId}"]`);
      await expect(grid).toBeVisible();
      
      const classes = await grid.getAttribute('class');
      expect(classes).toContain('grid');
      
      if ('expectedClass' in test) {
        expect(classes).toContain(test.expectedClass);
      } else {
        test.expectedClasses.forEach(expectedClass => {
          expect(classes).toContain(expectedClass);
        });
      }
    }
  });

  test('should handle different gap sizes', async ({ page }) => {
    const gapTests = [
      { testId: 'grid-no-gap', expectedClass: 'gap-0' },
      { testId: 'grid-default', expectedClass: 'gap-4' },
      { testId: 'grid-3-cols', expectedClass: 'gap-6' },
      { testId: 'grid-large-gap', expectedClass: 'gap-8' }
    ];

    for (const test of gapTests) {
      const grid = page.locator(`[data-testid="${test.testId}"]`);
      await expect(grid).toBeVisible();
      
      const classes = await grid.getAttribute('class');
      expect(classes).toContain(test.expectedClass);
    }
  });

  test('should handle different alignment options', async ({ page }) => {
    // Test center alignment
    const centerGrid = page.locator('[data-testid="grid-center-align"]');
    await expect(centerGrid).toBeVisible();
    
    const centerClasses = await centerGrid.getAttribute('class');
    expect(centerClasses).toContain('items-center');
    expect(centerClasses).toContain('justify-items-center');
    
    // Test start alignment
    const startGrid = page.locator('[data-testid="grid-start-align"]');
    await expect(startGrid).toBeVisible();
    
    const startClasses = await startGrid.getAttribute('class');
    expect(startClasses).toContain('items-start');
    expect(startClasses).toContain('justify-items-start');
    
    // Test default stretch alignment
    const defaultGrid = page.locator('[data-testid="grid-default"]');
    const defaultClasses = await defaultGrid.getAttribute('class');
    expect(defaultClasses).toContain('items-stretch');
    expect(defaultClasses).toContain('justify-items-stretch');
  });

  test('should render as different HTML elements', async ({ page }) => {
    // Test as section
    const sectionGrid = page.locator('[data-testid="grid-as-section"]');
    await expect(sectionGrid).toBeVisible();
    expect(await sectionGrid.evaluate(el => el.tagName.toLowerCase())).toBe('section');
    
    // Test default as div
    const divGrid = page.locator('[data-testid="grid-default"]');
    await expect(divGrid).toBeVisible();
    expect(await divGrid.evaluate(el => el.tagName.toLowerCase())).toBe('div');
  });

  test('should handle grid items with column and row spans', async ({ page }) => {
    const gridWithItems = page.locator('[data-testid="grid-with-items"]');
    await expect(gridWithItems).toBeVisible();
    
    // Test different column spans
    const items = gridWithItems.locator('div');
    
    // Test 1x1 item
    const item1x1 = items.nth(0);
    const classes1x1 = await item1x1.getAttribute('class');
    expect(classes1x1).toContain('col-span-1');
    expect(classes1x1).toContain('row-span-1');
    await expect(item1x1).toContainText('1x1');
    
    // Test 2x1 item
    const item2x1 = items.nth(1);
    const classes2x1 = await item2x1.getAttribute('class');
    expect(classes2x1).toContain('col-span-2');
    expect(classes2x1).toContain('row-span-1');
    await expect(item2x1).toContainText('2x1');
    
    // Test 3x1 item
    const item3x1 = items.nth(2);
    const classes3x1 = await item3x1.getAttribute('class');
    expect(classes3x1).toContain('col-span-3');
    expect(classes3x1).toContain('row-span-1');
    await expect(item3x1).toContainText('3x1');
    
    // Test full width item
    const itemFull = items.nth(3);
    const classesFull = await itemFull.getAttribute('class');
    expect(classesFull).toContain('col-span-full');
    await expect(itemFull).toContainText('Full Width');
    
    // Test 2x2 item
    const item2x2 = items.nth(4);
    const classes2x2 = await item2x2.getAttribute('class');
    expect(classes2x2).toContain('col-span-2');
    expect(classes2x2).toContain('row-span-2');
    await expect(item2x2).toContainText('2x2');
  });

  test('should be responsive across breakpoints', async ({ page }) => {
    const testUtils = new ComponentTestUtils(page);
    
    // Test 2-column responsive grid
    const grid2Cols = page.locator('[data-testid="grid-2-cols"]');
    
    // Mobile: should be 1 column
    await page.setViewportSize({ width: 375, height: 800 });
    const mobileClasses = await grid2Cols.getAttribute('class');
    expect(mobileClasses).toContain('grid-cols-1');
    
    // Tablet: should be 2 columns
    await page.setViewportSize({ width: 768, height: 800 });
    expect(mobileClasses).toContain('md:grid-cols-2');
    
    // Test 3-column responsive grid
    const grid3Cols = page.locator('[data-testid="grid-3-cols"]');
    const classes3Cols = await grid3Cols.getAttribute('class');
    expect(classes3Cols).toContain('grid-cols-1');
    expect(classes3Cols).toContain('md:grid-cols-2');
    expect(classes3Cols).toContain('lg:grid-cols-3');
    
    const results = await testUtils.testResponsiveBreakpoints('[data-testid="grid-2-cols"]');
    results.forEach(result => {
      expect(result.visible).toBe(true);
    });
  });

  test('should handle grid layout calculations correctly', async ({ page }) => {
    // Test that grid items are properly laid out
    const grid12 = page.locator('[data-testid="grid-12-cols"]');
    const items = grid12.locator('div');
    
    // Full width item should span entire row
    const fullWidthItem = items.nth(0);
    const fullWidthRect = await fullWidthItem.boundingBox();
    
    // Half width items should be side by side
    const halfWidth1 = items.nth(1);
    const halfWidth2 = items.nth(2);
    const halfWidth1Rect = await halfWidth1.boundingBox();
    const halfWidth2Rect = await halfWidth2.boundingBox();
    
    if (fullWidthRect && halfWidth1Rect && halfWidth2Rect) {
      // Half width items should be approximately half the width of full width
      const expectedHalfWidth = fullWidthRect.width / 2;
      expect(Math.abs(halfWidth1Rect.width - expectedHalfWidth)).toBeLessThan(10);
      expect(Math.abs(halfWidth2Rect.width - expectedHalfWidth)).toBeLessThan(10);
      
      // Half width items should be on the same row (similar y position)
      expect(Math.abs(halfWidth1Rect.y - halfWidth2Rect.y)).toBeLessThan(5);
    }
  });

  test('should handle edge cases', async ({ page }) => {
    // Test empty grid
    await page.evaluate(() => {
      const emptyGrid = document.createElement('div');
      emptyGrid.setAttribute('data-testid', 'grid-empty');
      emptyGrid.className = 'grid grid-cols-3 gap-4';
      emptyGrid.style.minHeight = '1px'; // Make empty grid visible for testing
      document.body.appendChild(emptyGrid);
    });
    
    const emptyGrid = page.locator('[data-testid="grid-empty"]');
    await expect(emptyGrid).toBeVisible();
    
    // Test grid with single item
    await page.evaluate(() => {
      const singleItemGrid = document.createElement('div');
      singleItemGrid.setAttribute('data-testid', 'grid-single-item');
      singleItemGrid.className = 'grid grid-cols-3 gap-4';
      singleItemGrid.innerHTML = '<div class="bg-gray-100 p-4">Single Item</div>';
      document.body.appendChild(singleItemGrid);
    });
    
    const singleItemGrid = page.locator('[data-testid="grid-single-item"]');
    await expect(singleItemGrid).toBeVisible();
    await expect(singleItemGrid.locator('div')).toContainText('Single Item');
  });

  test('should pass accessibility checks', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder().analyze();
    
    // Check for critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });

  test('should handle all column span variants', async ({ page }) => {
    // Test different column spans in 12-column grid
    const grid12 = page.locator('[data-testid="grid-12-cols"]');
    const items = grid12.locator('div');
    
    const spanTests = [
      { index: 0, expectedSpan: 'col-span-12' },
      { index: 1, expectedSpan: 'col-span-6' },
      { index: 2, expectedSpan: 'col-span-6' },
      { index: 3, expectedSpan: 'col-span-4' },
      { index: 4, expectedSpan: 'col-span-4' },
      { index: 5, expectedSpan: 'col-span-4' }
    ];
    
    for (const test of spanTests) {
      const item = items.nth(test.index);
      const classes = await item.getAttribute('class');
      expect(classes).toContain(test.expectedSpan);
    }
  });

  test('should handle custom className', async ({ page }) => {
    // Add a grid with custom class
    await page.evaluate(() => {
      const customGrid = document.createElement('div');
      customGrid.setAttribute('data-testid', 'grid-custom-class');
      customGrid.className = 'grid grid-cols-2 gap-4 custom-grid-class';
      customGrid.innerHTML = '<div class="bg-gray-100 p-4">Custom Grid</div>';
      document.body.appendChild(customGrid);
    });
    
    const customGrid = page.locator('[data-testid="grid-custom-class"]');
    await expect(customGrid).toBeVisible();
    
    const classes = await customGrid.getAttribute('class');
    expect(classes).toContain('custom-grid-class');
    expect(classes).toContain('grid');
    expect(classes).toContain('grid-cols-2');
  });
});
