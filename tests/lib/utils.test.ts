import { test, expect } from '@playwright/test';

// Extend Window interface for testing
declare global {
  interface Window {
    testUtils: any;
    gtagCalls?: any[];
    plausibleCalls?: any[];
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, any> }
    ) => void;
  }
}

// Since these are utility functions, we'll test them in a browser context
// by injecting them into the page and running tests

test.describe('Utils Library', () => {
  test.beforeEach(async ({ page }) => {
    // Create a test page with our utils functions
    await page.goto('data:text/html,<html><head><title>Utils Test</title></head><body></body></html>');
    
    // Inject the utils functions for testing
    await page.addScriptTag({
      content: `
        // Mock clsx and twMerge for testing
        function clsx(...inputs) {
          return inputs.filter(Boolean).join(' ');
        }
        
        function twMerge(classes) {
          return classes;
        }
        
        // Utility function for merging Tailwind classes
        function cn(...inputs) {
          return twMerge(clsx(inputs));
        }

        // Format currency for Indian market
        function formatCurrency(amount, currency = 'INR') {
          return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount);
        }

        // Format large numbers with Indian numbering system
        function formatNumber(num) {
          if (num >= 10000000) {
            return \`\${(num / 10000000).toFixed(1)}Cr\`;
          } else if (num >= 100000) {
            return \`\${(num / 100000).toFixed(1)}L\`;
          } else if (num >= 1000) {
            return \`\${(num / 1000).toFixed(1)}K\`;
          }
          return num.toString();
        }

        // Slugify function for URLs
        function slugify(text) {
          return text
            .toLowerCase()
            .replace(/[^\\w\\s-]/g, '')
            .replace(/[\\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }

        // Truncate text with ellipsis
        function truncateText(text, maxLength) {
          if (text.length <= maxLength) return text;
          return text.slice(0, maxLength).replace(/\\s+\\S*$/, '') + '...';
        }

        // Validate email format
        function isValidEmail(email) {
          const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          return emailRegex.test(email);
        }

        // Validate Indian mobile number
        function isValidMobile(mobile) {
          const mobileRegex = /^[6-9]\\d{9}$/;
          return mobileRegex.test(mobile.replace(/\\s+/g, ''));
        }

        // Format mobile number for display
        function formatMobile(mobile) {
          const cleaned = mobile.replace(/\\D/g, '');
          if (cleaned.length === 10) {
            return \`\${cleaned.slice(0, 5)} \${cleaned.slice(5)}\`;
          }
          return mobile;
        }

        // Generate random ID
        function generateId(length = 8) {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = '';
          for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return result;
        }

        // Debounce function for search and form inputs
        function debounce(func, wait) {
          let timeout;
          return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
          };
        }

        // Throttle function for scroll events
        function throttle(func, limit) {
          let inThrottle;
          return function(...args) {
            if (!inThrottle) {
              func(...args);
              inThrottle = true;
              setTimeout(() => (inThrottle = false), limit);
            }
          };
        }

        // Calculate reading time
        function calculateReadingTime(text) {
          const wordsPerMinute = 200;
          const words = text.trim().split(/\\s+/).length;
          return Math.ceil(words / wordsPerMinute);
        }

        // Get relative time
        function getRelativeTime(date) {
          const now = new Date();
          const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
          
          if (diffInSeconds < 60) return 'just now';
          if (diffInSeconds < 3600) return \`\${Math.floor(diffInSeconds / 60)} minutes ago\`;
          if (diffInSeconds < 86400) return \`\${Math.floor(diffInSeconds / 3600)} hours ago\`;
          if (diffInSeconds < 2592000) return \`\${Math.floor(diffInSeconds / 86400)} days ago\`;
          if (diffInSeconds < 31536000) return \`\${Math.floor(diffInSeconds / 2592000)} months ago\`;
          return \`\${Math.floor(diffInSeconds / 31536000)} years ago\`;
        }

        // SEO helpers
        function generateMetaTitle(title, siteName = 'Navi') {
          return \`\${title} | \${siteName}\`;
        }

        function generateMetaDescription(description, maxLength = 160) {
          return truncateText(description, maxLength);
        }

        // Analytics helpers
        function trackEvent(eventName, properties) {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, properties);
          }
          
          if (typeof window !== 'undefined' && window.plausible) {
            window.plausible(eventName, { props: properties });
          }
        }

        // Local storage helpers with error handling
        function getLocalStorage(key) {
          if (typeof window === 'undefined') return null;
          try {
            return localStorage.getItem(key);
          } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
          }
        }

        function setLocalStorage(key, value) {
          if (typeof window === 'undefined') return false;
          try {
            localStorage.setItem(key, value);
            return true;
          } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
          }
        }

        // URL helpers
        function isExternalUrl(url) {
          return url.startsWith('http://') || url.startsWith('https://');
        }

        function getBaseUrl() {
          if (typeof window !== 'undefined') {
            return window.location.origin;
          }
          return 'https://navi.com';
        }

        // Form validation helpers
        function validateField(value, rules) {
          if (rules.required && !value.trim()) {
            return 'This field is required';
          }
          
          if (rules.minLength && value.length < rules.minLength) {
            return \`Minimum \${rules.minLength} characters required\`;
          }
          
          if (rules.maxLength && value.length > rules.maxLength) {
            return \`Maximum \${rules.maxLength} characters allowed\`;
          }
          
          if (rules.pattern && !rules.pattern.test(value)) {
            return 'Invalid format';
          }
          
          if (rules.custom && !rules.custom(value)) {
            return 'Invalid value';
          }
          
          return null;
        }

        // Make functions available globally for testing
        window.testUtils = {
          cn, formatCurrency, formatNumber, slugify, truncateText,
          isValidEmail, isValidMobile, formatMobile, generateId,
          debounce, throttle, calculateReadingTime, getRelativeTime,
          generateMetaTitle, generateMetaDescription, trackEvent,
          getLocalStorage, setLocalStorage, isExternalUrl, getBaseUrl,
          validateField
        };
      `
    });
  });

  test.describe('Class Name Utilities', () => {
    test('cn should merge class names correctly', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.cn('class1', 'class2', null, undefined, 'class3');
      });
      expect(result).toBe('class1 class2 class3');
    });

    test('cn should handle conditional classes', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.cn('base', true && 'conditional', false && 'hidden');
      });
      expect(result).toBe('base conditional');
    });
  });

  test.describe('Currency and Number Formatting', () => {
    test('formatCurrency should format Indian currency correctly', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.formatCurrency(100000);
      });
      expect(result).toContain('₹');
      expect(result).toContain('1,00,000');
    });

    test('formatCurrency should handle different currencies', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.formatCurrency(1000, 'USD');
      });
      expect(result).toContain('$');
    });

    test('formatNumber should format large numbers correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          crore: window.testUtils.formatNumber(50000000),
          lakh: window.testUtils.formatNumber(500000),
          thousand: window.testUtils.formatNumber(5000),
          hundred: window.testUtils.formatNumber(500)
        };
      });

      expect(tests.crore).toBe('5.0Cr');
      expect(tests.lakh).toBe('5.0L');
      expect(tests.thousand).toBe('5.0K');
      expect(tests.hundred).toBe('500');
    });
  });

  test.describe('Text Processing', () => {
    test('slugify should create proper URL slugs', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          basic: window.testUtils.slugify('Hello World'),
          special: window.testUtils.slugify('Hello, World! How are you?'),
          spaces: window.testUtils.slugify('  Multiple   Spaces  '),
          mixed: window.testUtils.slugify('CamelCase-and_underscores')
        };
      });

      expect(tests.basic).toBe('hello-world');
      expect(tests.special).toBe('hello-world-how-are-you');
      expect(tests.spaces).toBe('multiple-spaces');
      expect(tests.mixed).toBe('camelcase-and-underscores');
    });

    test('truncateText should truncate text properly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          short: window.testUtils.truncateText('Short text', 20),
          long: window.testUtils.truncateText('This is a very long text that should be truncated', 20),
          exact: window.testUtils.truncateText('Exactly twenty chars', 20)
        };
      });

      expect(tests.short).toBe('Short text');
      expect(tests.long).toContain('...');
      expect(tests.long.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(tests.exact).toBe('Exactly twenty chars');
    });
  });

  test.describe('Validation Functions', () => {
    test('isValidEmail should validate email addresses', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          valid: window.testUtils.isValidEmail('user@example.com'),
          invalid1: window.testUtils.isValidEmail('invalid-email'),
          invalid2: window.testUtils.isValidEmail('user@'),
          invalid3: window.testUtils.isValidEmail('@example.com'),
          valid2: window.testUtils.isValidEmail('test.email+tag@example.co.in')
        };
      });

      expect(tests.valid).toBe(true);
      expect(tests.invalid1).toBe(false);
      expect(tests.invalid2).toBe(false);
      expect(tests.invalid3).toBe(false);
      expect(tests.valid2).toBe(true);
    });

    test('isValidMobile should validate Indian mobile numbers', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          valid1: window.testUtils.isValidMobile('9876543210'),
          valid2: window.testUtils.isValidMobile('8765432109'),
          valid3: window.testUtils.isValidMobile('7654321098'),
          valid4: window.testUtils.isValidMobile('6543210987'),
          invalid1: window.testUtils.isValidMobile('1234567890'), // Starts with 1
          invalid2: window.testUtils.isValidMobile('98765432'), // Too short
          invalid3: window.testUtils.isValidMobile('98765432101'), // Too long
          withSpaces: window.testUtils.isValidMobile('9876 543 210')
        };
      });

      expect(tests.valid1).toBe(true);
      expect(tests.valid2).toBe(true);
      expect(tests.valid3).toBe(true);
      expect(tests.valid4).toBe(true);
      expect(tests.invalid1).toBe(false);
      expect(tests.invalid2).toBe(false);
      expect(tests.invalid3).toBe(false);
      expect(tests.withSpaces).toBe(true); // Should handle spaces
    });

    test('formatMobile should format mobile numbers for display', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          valid: window.testUtils.formatMobile('9876543210'),
          withSpaces: window.testUtils.formatMobile('98765 43210'),
          invalid: window.testUtils.formatMobile('123')
        };
      });

      expect(tests.valid).toBe('98765 43210');
      expect(tests.withSpaces).toBe('98765 43210');
      expect(tests.invalid).toBe('123'); // Should return as-is if invalid
    });
  });

  test.describe('ID Generation', () => {
    test('generateId should generate IDs of correct length', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          default: window.testUtils.generateId(),
          custom: window.testUtils.generateId(12),
          short: window.testUtils.generateId(4)
        };
      });

      expect(tests.default.length).toBe(8);
      expect(tests.custom.length).toBe(12);
      expect(tests.short.length).toBe(4);
    });

    test('generateId should generate unique IDs', async ({ page }) => {
      const ids = await page.evaluate(() => {
        const generated = [];
        for (let i = 0; i < 10; i++) {
          generated.push(window.testUtils.generateId());
        }
        return generated;
      });

      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length); // All should be unique
    });

    test('generateId should only contain valid characters', async ({ page }) => {
      const id = await page.evaluate(() => {
        return window.testUtils.generateId(100);
      });

      const validChars = /^[A-Za-z0-9]+$/;
      expect(validChars.test(id)).toBe(true);
    });
  });

  test.describe('Timing Functions', () => {
    test('debounce should delay function execution', async ({ page }) => {
      const result = await page.evaluate(() => {
        return new Promise((resolve) => {
          let callCount = 0;
          const debouncedFn = window.testUtils.debounce(() => {
            callCount++;
          }, 100);

          // Call multiple times quickly
          debouncedFn();
          debouncedFn();
          debouncedFn();

          // Should only execute once after delay
          setTimeout(() => {
            resolve(callCount);
          }, 150);
        });
      });

      expect(result).toBe(1);
    });

    test('throttle should limit function execution', async ({ page }) => {
      const result = await page.evaluate(() => {
        return new Promise((resolve) => {
          let callCount = 0;
          const throttledFn = window.testUtils.throttle(() => {
            callCount++;
          }, 100);

          // Call multiple times quickly
          throttledFn();
          throttledFn();
          throttledFn();

          // Should execute immediately once, then be throttled
          setTimeout(() => {
            resolve(callCount);
          }, 50);
        });
      });

      expect(result).toBe(1);
    });
  });

  test.describe('Time and Reading Calculations', () => {
    test('calculateReadingTime should estimate reading time correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const shortText = 'This is a short text with about ten words here.';
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50);
        
        return {
          short: window.testUtils.calculateReadingTime(shortText),
          long: window.testUtils.calculateReadingTime(longText),
          empty: window.testUtils.calculateReadingTime('')
        };
      });

      expect(tests.short).toBe(1); // Should be 1 minute minimum
      expect(tests.long).toBeGreaterThan(1);
      expect(tests.empty).toBe(0);
    });

    test('getRelativeTime should format relative time correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const now = new Date();
        const minuteAgo = new Date(now.getTime() - 2 * 60 * 1000);
        const hourAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
        const dayAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        const justNow = new Date(now.getTime() - 30 * 1000);

        return {
          justNow: window.testUtils.getRelativeTime(justNow),
          minuteAgo: window.testUtils.getRelativeTime(minuteAgo),
          hourAgo: window.testUtils.getRelativeTime(hourAgo),
          dayAgo: window.testUtils.getRelativeTime(dayAgo)
        };
      });

      expect(tests.justNow).toBe('just now');
      expect(tests.minuteAgo).toContain('minutes ago');
      expect(tests.hourAgo).toContain('hours ago');
      expect(tests.dayAgo).toContain('days ago');
    });
  });

  test.describe('SEO Helpers', () => {
    test('generateMetaTitle should format titles correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          default: window.testUtils.generateMetaTitle('Home Page'),
          custom: window.testUtils.generateMetaTitle('About Us', 'Custom Site')
        };
      });

      expect(tests.default).toBe('Home Page | Navi');
      expect(tests.custom).toBe('About Us | Custom Site');
    });

    test('generateMetaDescription should truncate descriptions', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const longDescription = 'This is a very long description that should be truncated because it exceeds the maximum length limit that we have set for meta descriptions in our SEO optimization.';
        
        return {
          short: window.testUtils.generateMetaDescription('Short description'),
          long: window.testUtils.generateMetaDescription(longDescription),
          custom: window.testUtils.generateMetaDescription(longDescription, 50)
        };
      });

      expect(tests.short).toBe('Short description');
      expect(tests.long.length).toBeLessThanOrEqual(163); // 160 + '...'
      expect(tests.custom.length).toBeLessThanOrEqual(53); // 50 + '...'
    });
  });

  test.describe('Local Storage Helpers', () => {
    test('setLocalStorage and getLocalStorage should work correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const key = 'test-key';
        const value = 'test-value';
        
        const setResult = window.testUtils.setLocalStorage(key, value);
        const getResult = window.testUtils.getLocalStorage(key);
        
        return { setResult, getResult };
      });

      expect(tests.setResult).toBe(true);
      expect(tests.getResult).toBe('test-value');
    });

    test('getLocalStorage should handle missing keys', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.getLocalStorage('non-existent-key');
      });

      expect(result).toBe(null);
    });
  });

  test.describe('URL Helpers', () => {
    test('isExternalUrl should identify external URLs correctly', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          http: window.testUtils.isExternalUrl('http://example.com'),
          https: window.testUtils.isExternalUrl('https://example.com'),
          relative: window.testUtils.isExternalUrl('/relative/path'),
          absolute: window.testUtils.isExternalUrl('/absolute/path'),
          hash: window.testUtils.isExternalUrl('#hash')
        };
      });

      expect(tests.http).toBe(true);
      expect(tests.https).toBe(true);
      expect(tests.relative).toBe(false);
      expect(tests.absolute).toBe(false);
      expect(tests.hash).toBe(false);
    });

    test('getBaseUrl should return current origin', async ({ page }) => {
      const result = await page.evaluate(() => {
        return window.testUtils.getBaseUrl();
      });

      expect(result).toBeTruthy();
      expect(result.startsWith('data:')).toBe(true); // Since we're using data URL
    });
  });

  test.describe('Form Validation', () => {
    test('validateField should validate required fields', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          valid: window.testUtils.validateField('test value', { required: true }),
          invalid: window.testUtils.validateField('', { required: true }),
          whitespace: window.testUtils.validateField('   ', { required: true })
        };
      });

      expect(tests.valid).toBe(null);
      expect(tests.invalid).toBe('This field is required');
      expect(tests.whitespace).toBe('This field is required');
    });

    test('validateField should validate length constraints', async ({ page }) => {
      const tests = await page.evaluate(() => {
        return {
          tooShort: window.testUtils.validateField('hi', { minLength: 5 }),
          tooLong: window.testUtils.validateField('this is too long', { maxLength: 10 }),
          justRight: window.testUtils.validateField('perfect', { minLength: 5, maxLength: 10 })
        };
      });

      expect(tests.tooShort).toBe('Minimum 5 characters required');
      expect(tests.tooLong).toBe('Maximum 10 characters allowed');
      expect(tests.justRight).toBe(null);
    });

    test('validateField should validate patterns', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        
        return {
          validEmail: window.testUtils.validateField('user@example.com', { pattern: emailPattern }),
          invalidEmail: window.testUtils.validateField('invalid-email', { pattern: emailPattern })
        };
      });

      expect(tests.validEmail).toBe(null);
      expect(tests.invalidEmail).toBe('Invalid format');
    });

    test('validateField should validate custom rules', async ({ page }) => {
      const tests = await page.evaluate(() => {
        const customRule = (value: string) => value.includes('test');
        
        return {
          valid: window.testUtils.validateField('test value', { custom: customRule }),
          invalid: window.testUtils.validateField('other value', { custom: customRule })
        };
      });

      expect(tests.valid).toBe(null);
      expect(tests.invalid).toBe('Invalid value');
    });
  });

  test.describe('Analytics Helpers', () => {
    test('trackEvent should handle missing analytics', async ({ page }) => {
      // This test ensures trackEvent doesn't throw errors when analytics aren't available
      const result = await page.evaluate(() => {
        try {
          window.testUtils.trackEvent('test_event', { property: 'value' });
          return 'success';
        } catch (error) {
          return 'error';
        }
      });

      expect(result).toBe('success');
    });
  });
});
