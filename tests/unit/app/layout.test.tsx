import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/app/layout';

// Mock Next.js font imports
jest.mock('next/font/google', () => ({
  __esModule: true,
  Inter: () => ({ className: '', variable: '' }),
  JetBrains_Mono: () => ({ className: '', variable: '' }),
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

  it('should render with proper structure and classes', () => {
    const TestChild = () => <div data-testid="test-content">Test</div>;
    
    const { container, getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    // Check that children are rendered
    expect(getByTestId('test-content')).toBeInTheDocument();
    
    // Check that the layout component renders without errors
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    const TestChild1 = () => <div data-testid="child-1">Child 1</div>;
    const TestChild2 = () => <div data-testid="child-2">Child 2</div>;
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild1 />
        <TestChild2 />
      </RootLayout>
    );
    
    expect(getByTestId('child-1')).toBeInTheDocument();
    expect(getByTestId('child-2')).toBeInTheDocument();
  });

  it('should render layout component successfully', () => {
    const TestChild = () => <div>Test</div>;
    
    const { container } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    // Verify the layout renders without throwing errors
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
