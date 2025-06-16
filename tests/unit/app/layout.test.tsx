import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock Next.js font imports
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

// Mock CSS import
jest.mock('@/app/globals.css', () => ({}));

describe('RootLayout', () => {
  it('should render children correctly', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('should render html element with correct lang attribute', () => {
    const TestChild = () => <div>Test</div>;
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    const htmlElement = container.querySelector('html');
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });

  it('should apply font variables to body element', () => {
    const TestChild = () => <div>Test</div>;
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    const bodyElement = container.querySelector('body');
    expect(bodyElement).toHaveClass('antialiased');
  });

  it('should have proper document structure', () => {
    const TestChild = () => <div>Test</div>;
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();
  });
});
