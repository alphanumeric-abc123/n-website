import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Layout } from '@/components/layout/Layout';

// Mock the Header and Footer components since they're complex
jest.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header Component</header>
}));

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer Component</footer>
}));

describe('Layout Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(
        <Layout>
          <div data-testid="content">Main content</div>
        </Layout>
      );
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('should render children in main element', () => {
      render(
        <Layout>
          <div>Test content</div>
        </Layout>
      );
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('flex-1');
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should apply default layout classes', () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>
      );
      
      const layoutDiv = container.firstChild as HTMLElement;
      expect(layoutDiv).toHaveClass('min-h-screen', 'flex', 'flex-col');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Layout className="custom-layout">
          <div>Content</div>
        </Layout>
      );
      
      const layoutDiv = container.firstChild as HTMLElement;
      expect(layoutDiv).toHaveClass('custom-layout');
    });
  });

  describe('Header Control', () => {
    it('should show header by default', () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should show header when showHeader is true', () => {
      render(
        <Layout showHeader={true}>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should hide header when showHeader is false', () => {
      render(
        <Layout showHeader={false}>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    });
  });

  describe('Footer Control', () => {
    it('should show footer by default', () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should show footer when showFooter is true', () => {
      render(
        <Layout showFooter={true}>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should hide footer when showFooter is false', () => {
      render(
        <Layout showFooter={false}>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should hide both header and footer when both are false', () => {
      render(
        <Layout showHeader={false} showFooter={false}>
          <div data-testid="content">Content only</div>
        </Layout>
      );
      
      expect(screen.queryByTestId('header')).not.toBeInTheDocument();
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('should apply custom className with header/footer controls', () => {
      const { container } = render(
        <Layout 
          className="custom-layout" 
          showHeader={false} 
          showFooter={true}
        >
          <div>Content</div>
        </Layout>
      );
      
      const layoutDiv = container.firstChild as HTMLElement;
      expect(layoutDiv).toHaveClass('custom-layout');
      expect(screen.queryByTestId('header')).not.toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should maintain proper layout structure', () => {
      const { container } = render(
        <Layout>
          <div data-testid="page-content">Page content</div>
        </Layout>
      );
      
      const layoutDiv = container.firstChild as HTMLElement;
      const main = screen.getByRole('main');
      
      // Check layout structure
      expect(layoutDiv).toHaveClass('min-h-screen', 'flex', 'flex-col');
      expect(main).toHaveClass('flex-1');
      expect(main).toContainElement(screen.getByTestId('page-content'));
    });

    it('should work with complex children', () => {
      render(
        <Layout>
          <section data-testid="hero">Hero Section</section>
          <section data-testid="features">Features Section</section>
          <section data-testid="cta">CTA Section</section>
        </Layout>
      );
      
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('features')).toBeInTheDocument();
      expect(screen.getByTestId('cta')).toBeInTheDocument();
      
      const main = screen.getByRole('main');
      expect(main).toContainElement(screen.getByTestId('hero'));
      expect(main).toContainElement(screen.getByTestId('features'));
      expect(main).toContainElement(screen.getByTestId('cta'));
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should maintain semantic structure without header/footer', () => {
      render(
        <Layout showHeader={false} showFooter={false}>
          <div>Content</div>
        </Layout>
      );
      
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
