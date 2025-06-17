import {
  formatNumber,
  slugify,
  truncateText,
  isValidEmail,
  isValidMobile,
  formatMobile,
  generateId,
  debounce,
  throttle,
  calculateReadingTime,
  getRelativeTime,
  generateMetaTitle,
  generateMetaDescription,
  isExternalUrl,
} from '@/lib/utils';

import '@testing-library/jest-dom';

describe('utils smoke tests', () => {
  it('formatNumber converts to human-readable units', () => {
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(250000)).toBe('2.5L');
    expect(formatNumber(21000000)).toBe('2.1Cr');
    expect(formatNumber(999)).toBe('999');
  });

  it('slugify converts strings', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });

  it('truncateText respects max length', () => {
    const short = 'short';
    expect(truncateText(short, 10)).toBe(short);
    expect(truncateText('This is a long sentence', 10)).toBe('This is a...');
  });

  it('email and mobile validation', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('bad')).toBe(false);
    expect(isValidMobile('9876543210')).toBe(true);
    expect(isValidMobile('123')).toBe(false);
  });

  it('formatMobile formats indian numbers', () => {
    expect(formatMobile('9876543210')).toBe('98765 43210');
  });

  it('generateId returns requested length', () => {
    const id = generateId(12);
    expect(id).toHaveLength(12);
  });

  it('debounce wraps function', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced();
    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('throttle wraps function', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    jest.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  it('calculateReadingTime & getRelativeTime produce expected ranges', () => {
    expect(calculateReadingTime('word '.repeat(400))).toBe(2);
    const now = new Date();
    expect(getRelativeTime(now)).toBe('just now');
  });

  it('meta helpers', () => {
    expect(generateMetaTitle('Page')).toBe('Page | Navi');
    expect(generateMetaDescription('a'.repeat(200))).toHaveLength(163); // 160 + ellipsis
  });

  it('isExternalUrl detects protocols', () => {
    expect(isExternalUrl('https://example.com')).toBe(true);
    expect(isExternalUrl('/internal')).toBe(false);
  });
});
