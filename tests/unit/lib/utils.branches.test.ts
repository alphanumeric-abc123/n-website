import {
  getRelativeTime,
  generateMetaDescription,
  validateField,
  trackEvent,
  getBaseUrl,
  formatCurrency,
} from '@/lib/utils';

import '@testing-library/jest-dom';

describe('utils branch coverage', () => {
  describe('getRelativeTime', () => {
    const now = new Date();

    it('returns "just now" for <60s', () => {
      expect(getRelativeTime(new Date(now.getTime() - 5 * 1000))).toBe('just now');
    });

    it('returns minutes ago', () => {
      expect(getRelativeTime(new Date(now.getTime() - 3 * 60 * 1000))).toBe('3 minutes ago');
    });

    it('returns hours ago', () => {
      expect(getRelativeTime(new Date(now.getTime() - 2 * 3600 * 1000))).toBe('2 hours ago');
    });

    it('returns days ago', () => {
      expect(getRelativeTime(new Date(now.getTime() - 5 * 86400 * 1000))).toBe('5 days ago');
    });

    it('returns months ago', () => {
      expect(getRelativeTime(new Date(now.getTime() - 2 * 2592000 * 1000))).toBe('2 months ago');
    });

    it('returns years ago', () => {
      expect(getRelativeTime(new Date(now.getTime() - 3 * 31536000 * 1000))).toBe('3 years ago');
    });
  });

  describe('generateMetaDescription', () => {
    it('truncates text to 160 with ellipsis', () => {
      const long = 'a'.repeat(200);
      const desc = generateMetaDescription(long, 160);
      expect(desc.length).toBe(163); // 160 + '...'
      expect(desc.endsWith('...')).toBe(true);
    });

    it('returns original text if under limit', () => {
      const short = 'Short description';
      expect(generateMetaDescription(short, 160)).toBe(short);
    });
  });

  describe('validateField', () => {
    const rules = { required: true, minLength: 3, maxLength: 5, pattern: /^[A-Z]+$/ };

    it('required rule', () => {
      expect(validateField('', { required: true })).toBe('This field is required');
    });

    it('minLength rule', () => {
      expect(validateField('ab', { minLength: 3 })).toBe('Minimum 3 characters required');
    });

    it('maxLength rule', () => {
      expect(validateField('abcdef', { maxLength: 5 })).toBe('Maximum 5 characters allowed');
    });

    it('pattern rule', () => {
      expect(validateField('abc', { pattern: /^[0-9]+$/ })).toBe('Invalid format');
    });

    it('custom rule', () => {
      const customRule = { custom: (v: string) => v === 'ok' };
      expect(validateField('bad', customRule)).toBe('Invalid value');
    });

    it('passes all rules', () => {
      expect(validateField('TEST', rules)).toBeNull();
    });

    it('returns null for valid input with no rules', () => {
      expect(validateField('anything', {})).toBeNull();
    });
  });

  describe('trackEvent', () => {
    it('invokes gtag and plausible when available', () => {
      const gtag = jest.fn();
      const plausible = jest.fn();
      // Ensure window object exists
      (global as any).window = (global as any).window || {};
      (window as any).gtag = gtag;
      (window as any).plausible = plausible;
      trackEvent('click', { id: 1 });
      expect(gtag).toHaveBeenCalled();
      expect(plausible).toHaveBeenCalled();
    });

    it('handles missing window gracefully', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      expect(() => trackEvent('test')).not.toThrow();
      // @ts-ignore
      global.window = originalWindow;
    });
  });

  describe('getBaseUrl', () => {
    it('returns a valid URL string', () => {
      const result = getBaseUrl();
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^https?:\/\//);
    });
  });

  describe('formatCurrency', () => {
    it('formats with default INR currency', () => {
      expect(formatCurrency(1000)).toContain('₹');
      expect(formatCurrency(1000)).toContain('1,000');
    });

    it('formats with custom currency', () => {
      expect(formatCurrency(1000, 'USD')).toContain('$');
    });
  });
});
