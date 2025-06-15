import { defineConfig, devices } from '@playwright/test';
import os from 'os';

/**
 * High-performance Playwright configuration optimized for speed
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Test discovery optimization */
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts'
  ],
  testIgnore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/coverage/**'
  ],
  
  /* Optimized parallelization */
  fullyParallel: true,
  workers: process.env.CI ? '50%' : Math.min(os.cpus().length * 2, 50),
  
  /* Test sharding for large suites */
  shard: process.env.SHARD ? { 
    current: parseInt(process.env.SHARD_CURRENT || '1'), 
    total: parseInt(process.env.SHARD_TOTAL || '1') 
  } : undefined,
  
  /* Fail fast on CI */
  forbidOnly: !!process.env.CI,
  
  /* No retries for speed - fix tests instead of retrying */
  retries: 0,
  
  /* Timeout optimizations */
  timeout: 30 * 1000, // 30 seconds max per test
  expect: {
    timeout: 2 * 1000, // Reduced from 5s to 2s
  },
  
  /* Test filtering */
  grep: process.env.TEST_GREP ? new RegExp(process.env.TEST_GREP) : undefined,
  grepInvert: process.env.TEST_GREP_INVERT ? new RegExp(process.env.TEST_GREP_INVERT) : undefined,
  
  /* Performance-focused reporting */
  reporter: process.env.CI 
    ? [
        ['github'], 
        ['json', { outputFile: 'test-results/results.json' }],
        ['./test-utils/performance-reporter.js'] // Custom performance reporter
      ]
    : [
        ['list'], 
        ['html', { open: 'never' }],
        ['./test-utils/performance-reporter.js']
      ],
  
  /* Optimized settings for maximum speed */
  use: {
    /* Base URL */
    baseURL: 'http://localhost:3000',
    
    /* Headless mode for speed */
    headless: true,
    
    /* Disable slow features */
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    
    /* Fast navigation */
    navigationTimeout: 10 * 1000,
    actionTimeout: 5 * 1000,
    
    /* Fast viewport */
    viewport: { width: 1280, height: 720 },
    
    /* Disable unnecessary features for speed */
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    acceptDownloads: false,
    hasTouch: false,
    javaScriptEnabled: true,
    
    /* Fast locale */
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'light',
    
    /* Shared context optimizations */
    contextOptions: {
      reducedMotion: 'reduce', // Disable animations
    }
  },

  /* Optimized projects - conditional loading */
  projects: [
    // Fast component tests - always run
    {
      name: 'chromium-components',
      testMatch: '**/tests/components/**/*.test.ts',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-features=TranslateUI,VizDisplayCompositor',
            '--disable-ipc-flooding-protection',
            '--disable-extensions',
            '--disable-default-apps',
            '--disable-component-extensions-with-background-pages',
            '--disable-background-networking',
            '--disable-web-security',
            '--disable-blink-features=AutomationControlled',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--memory-pressure-off',
            '--max_old_space_size=4096',
          ],
        },
      },
    },
    
    // Mobile responsive tests - conditional
    ...(process.env.INCLUDE_MOBILE || process.env.CI ? [{
      name: 'mobile-chrome',
      testMatch: '**/tests/**/*.test.ts',
      use: { 
        ...devices['Pixel 5'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--memory-pressure-off',
          ],
        },
      },
    }] : []),
    
    // Integration tests - desktop only
    {
      name: 'chromium-integration',
      testMatch: '**/tests/integration/**/*.test.ts',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security',
            '--memory-pressure-off',
          ],
        },
      },
    },
    
    /* Cross-browser testing - only when explicitly requested */
    ...(process.env.FULL_BROWSER_TESTING ? [
      {
        name: 'firefox',
        testMatch: '**/tests/critical/**/*.test.ts', // Only critical tests
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        testMatch: '**/tests/critical/**/*.test.ts', // Only critical tests
        use: { ...devices['Desktop Safari'] },
      },
    ] : []),
  ],

  /* Optimized dev server */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    stdout: 'ignore', // Suppress output for speed
    stderr: 'pipe',
  },
  
  /* Remove unused global setup/teardown for speed */
  globalSetup: undefined,
  globalTeardown: undefined,
  
  /* Output directory */
  outputDir: 'test-results/',
  
  /* Performance metadata */
  metadata: {
    'test-environment': 'optimized-for-speed',
    'cpu-cores': os.cpus().length,
    'max-workers': Math.min(os.cpus().length * 2, 8),
    'optimization-level': 'maximum',
  },
});
