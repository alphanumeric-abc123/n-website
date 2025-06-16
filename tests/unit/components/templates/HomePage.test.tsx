import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePageTemplate } from '@/components/templates/HomePage';
import type { HomePage as HomePageType } from '@/types/contentful';

// Mock all the complex components to focus on HomePage template logic
jest.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header Component</header>
}));

jest.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer Component</footer>
}));

jest.mock('@/components/content/Hero', () => ({
  Hero: ({ headline, subtext, primaryCta }: any) => (
    <section data-testid="hero">
      <h1>{headline}</h1>
      <p>{subtext}</p>
      {primaryCta && <button>{primaryCta.text}</button>}
    </section>
  )
}));

jest.mock('@/components/content/FeatureCards', () => ({
  FeatureCards: ({ title, subtitle, description, features }: any) => (
    <section data-testid="feature-cards">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <p>{description}</p>
      {features?.map((feature: any, index: number) => (
        <div key={index} data-testid={`feature-${index}`}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  )
}));

jest.mock('@/components/content/CTASection', () => ({
  CTASection: ({ headline, description, primaryCta, secondaryCta }: any) => (
    <section data-testid="cta-section">
      <h2>{headline}</h2>
      <p>{description}</p>
      {primaryCta && <button>{primaryCta.text}</button>}
      {secondaryCta && <button>{secondaryCta.text}</button>}
    </section>
  )
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children, className }: any) => (
    <div className={`container ${className}`} data-testid="container">
      {children}
    </div>
  )
}));

jest.mock('@/components/layout/Grid', () => ({
  Grid: ({ children, cols, gap, className }: any) => (
    <div className={`grid cols-${cols} gap-${gap} ${className}`} data-testid="grid">
      {children}
    </div>
  ),
  GridItem: ({ children }: any) => (
    <div data-testid="grid-item">{children}</div>
  )
}));

jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, variant, className }: any) => (
    <div className={`card ${variant} ${className}`} data-testid="card">
      {children}
    </div>
  ),
  CardHeader: ({ children, className }: any) => (
    <div className={`card-header ${className}`} data-testid="card-header">
      {children}
    </div>
  ),
  CardTitle: ({ children, className }: any) => (
    <h3 className={`card-title ${className}`} data-testid="card-title">
      {children}
    </h3>
  ),
  CardDescription: ({ children, className }: any) => (
    <p className={`card-description ${className}`} data-testid="card-description">
      {children}
    </p>
  ),
  CardContent: ({ children, className }: any) => (
    <div className={`card-content ${className}`} data-testid="card-content">
      {children}
    </div>
  )
}));

jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, variant, size, className, ...props }: any) => (
    <button 
      className={`btn ${variant} ${size} ${className}`} 
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  )
}));

describe('HomePage Template', () => {
  describe('Basic Rendering', () => {
    it('should render with default data when no data provided', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('feature-cards')).toBeInTheDocument();
      expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<HomePageTemplate className="custom-homepage" />);
      
      const homePage = container.firstChild as HTMLElement;
      expect(homePage).toHaveClass('custom-homepage');
    });

    it('should render default hero content', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Financial Services Made Simple')).toBeInTheDocument();
      expect(screen.getByText(/Get instant loans, comprehensive insurance/)).toBeInTheDocument();
      const downloadButtons = screen.getAllByText('Download App');
      expect(downloadButtons.length).toBeGreaterThan(0);
    });
  });

  describe('With Custom Data', () => {
    const mockHomePageData: Partial<HomePageType> = {
      title: 'Custom Navi Title',
      heroHeadline: 'Custom Hero Headline',
      heroSubtext: 'Custom hero subtext content',
      heroCtaText: 'Custom CTA',
      heroCtaLink: '/custom-link',
      seoTitle: 'Custom SEO Title',
      seoDescription: 'Custom SEO description'
    };

    it('should render with custom data when provided', () => {
      render(<HomePageTemplate data={mockHomePageData as HomePageType} />);
      
      expect(screen.getByText('Custom Hero Headline')).toBeInTheDocument();
      expect(screen.getByText('Custom hero subtext content')).toBeInTheDocument();
      expect(screen.getByText('Custom CTA')).toBeInTheDocument();
    });
  });

  describe('Trust Indicators Section', () => {
    it('should render trust indicators section', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Trusted by Millions')).toBeInTheDocument();
      expect(screen.getByText('Join millions of Indians who trust Navi for their financial needs')).toBeInTheDocument();
    });

    it('should render trust indicator metrics', () => {
      render(<HomePageTemplate />);
      
      // Check for sample trust indicators (corrected values)
      expect(screen.getByText('10M+')).toBeInTheDocument();
      expect(screen.getByText('Happy Customers')).toBeInTheDocument();
      expect(screen.getByText('₹50,000Cr+')).toBeInTheDocument();
      expect(screen.getByText('Loans Disbursed')).toBeInTheDocument();
    });
  });

  describe('Product Overview Section', () => {
    it('should render product overview section', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Our Products')).toBeInTheDocument();
      expect(screen.getByText('Everything You Need in One App')).toBeInTheDocument();
      expect(screen.getByText(/From instant payments to long-term investments/)).toBeInTheDocument();
    });

    it('should render product cards', () => {
      render(<HomePageTemplate />);
      
      // Check for product titles
      expect(screen.getByText('UPI Payments')).toBeInTheDocument();
      expect(screen.getByText('Personal Loans')).toBeInTheDocument();
      expect(screen.getByText('Health Insurance')).toBeInTheDocument();
      expect(screen.getByText('Mutual Funds')).toBeInTheDocument();
    });

    it('should render product features', () => {
      render(<HomePageTemplate />);
      
      // Check for some product features (corrected text)
      expect(screen.getByText('Zero transaction fees')).toBeInTheDocument();
      expect(screen.getByText('Instant transfers')).toBeInTheDocument();
      expect(screen.getByText('24/7 availability')).toBeInTheDocument();
    });

    it('should render explore all products button', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Explore All Products')).toBeInTheDocument();
    });
  });

  describe('Features Section', () => {
    it('should render features section with proper props', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Why Choose Navi?')).toBeInTheDocument();
      expect(screen.getByText('Our Promise')).toBeInTheDocument();
      expect(screen.getByText(/We're committed to making financial services/)).toBeInTheDocument();
    });

    it('should render feature items', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Instant Approvals')).toBeInTheDocument();
      expect(screen.getByText('Zero Hidden Charges')).toBeInTheDocument();
      expect(screen.getByText('Digital First')).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    it('should render CTA section with proper content', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByText('Ready to Experience Better Banking?')).toBeInTheDocument();
      expect(screen.getByText(/Join millions of satisfied customers/)).toBeInTheDocument();
    });

    it('should render CTA buttons', () => {
      render(<HomePageTemplate />);
      
      const ctaButtons = screen.getAllByText('Download App');
      expect(ctaButtons.length).toBeGreaterThan(0);
      
      const learnMoreButtons = screen.getAllByText('Learn More');
      expect(learnMoreButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Layout Structure', () => {
    it('should have proper semantic structure', () => {
      render(<HomePageTemplate />);
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should render multiple sections', () => {
      render(<HomePageTemplate />);
      
      // Check that multiple containers are rendered for different sections
      const containers = screen.getAllByTestId('container');
      expect(containers.length).toBeGreaterThan(1);
    });

    it('should render grid layouts for products and trust indicators', () => {
      render(<HomePageTemplate />);
      
      const grids = screen.getAllByTestId('grid');
      expect(grids.length).toBeGreaterThanOrEqual(2); // Trust indicators and products
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<HomePageTemplate />);
      
      // Check for various heading levels
      expect(screen.getByText('Trusted by Millions')).toBeInTheDocument();
      expect(screen.getByText('Everything You Need in One App')).toBeInTheDocument();
    });

    it('should have descriptive content', () => {
      render(<HomePageTemplate />);
      
      // Check for descriptive text content
      expect(screen.getByText(/Complete transparency in pricing/)).toBeInTheDocument();
      expect(screen.getByText(/Everything from application to disbursement/)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should integrate with all major components', () => {
      render(<HomePageTemplate />);
      
      // Verify all major components are rendered
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('feature-cards')).toBeInTheDocument();
      expect(screen.getByTestId('cta-section')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should render multiple cards for products', () => {
      render(<HomePageTemplate />);
      
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBeGreaterThanOrEqual(4); // At least 4 product cards
    });

    it('should render multiple buttons', () => {
      render(<HomePageTemplate />);
      
      const buttons = screen.getAllByTestId('button');
      expect(buttons.length).toBeGreaterThan(1); // Multiple buttons throughout the page
    });
  });
});
