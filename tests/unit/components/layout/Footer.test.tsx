import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/layout/Footer';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className, ...props }: any) => (
    <a href={href} className={className} data-testid="footer-link" {...props}>
      {children}
    </a>
  );
});

// Mock the Container component
jest.mock('@/components/layout/Container', () => ({
  Container: ({ children, className, ...props }: any) => (
    <div className={`container ${className}`} data-testid="footer-container" {...props}>
      {children}
    </div>
  )
}));

describe('Footer Component', () => {
  const mockNavigation = [
    {
      title: 'Products',
      links: [
        { label: 'UPI', href: '/products/upi' },
        { label: 'Loans', href: '/products/loans' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Careers', href: '/careers' }
      ]
    }
  ];

  const mockSocialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/navi',
      icon: <svg data-testid="twitter-icon">Twitter</svg>
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/navi',
      icon: <svg data-testid="linkedin-icon">LinkedIn</svg>
    }
  ];

  const mockCompanyInfo = {
    name: 'Test Navi',
    description: 'Test description for Navi',
    address: 'Test Address, Test City',
    email: 'test@navi.com'
  };

  const mockComplianceInfo = {
    licenses: ['License 1', 'License 2'],
    regulatoryBodies: ['RBI', 'SEBI'],
    disclaimer: 'Test disclaimer text'
  };

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<Footer />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Navi')).toBeInTheDocument();
    });

    it('should render as footer element', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should apply custom className', () => {
      render(<Footer className="custom-footer" />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('custom-footer');
    });

    it('should have proper footer styling', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-neutral-900', 'text-white');
    });
  });

  describe('Company Information', () => {
    it('should render default company information', () => {
      render(<Footer />);
      
      expect(screen.getByText('Navi')).toBeInTheDocument();
      expect(screen.getByText(/Making financial services simple/)).toBeInTheDocument();
    });

    it('should render custom company information', () => {
      render(<Footer companyInfo={mockCompanyInfo} />);
      
      expect(screen.getByText('Test Navi')).toBeInTheDocument();
      expect(screen.getByText('Test description for Navi')).toBeInTheDocument();
    });

    it('should render company address when provided', () => {
      render(<Footer companyInfo={mockCompanyInfo} />);
      
      expect(screen.getByText('Test Address, Test City')).toBeInTheDocument();
    });

    it('should render company email when provided', () => {
      render(<Footer companyInfo={mockCompanyInfo} />);
      
      expect(screen.getByText('test@navi.com')).toBeInTheDocument();
      const emailLink = screen.getByRole('link', { name: 'test@navi.com' });
      expect(emailLink).toHaveAttribute('href', 'mailto:test@navi.com');
    });

    it('should render copyright with current year', () => {
      render(<Footer companyInfo={mockCompanyInfo} />);
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} Test Navi. All rights reserved.`)).toBeInTheDocument();
    });
  });

  describe('Social Links', () => {
    it('should render default social links', () => {
      render(<Footer />);
      
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    });

    it('should render custom social links', () => {
      render(<Footer socialLinks={mockSocialLinks} />);
      
      expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
      
      const twitterLink = screen.getByLabelText('Twitter');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/navi');
      
      const linkedinLink = screen.getByLabelText('LinkedIn');
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/navi');
    });

    it('should apply proper styling to social links', () => {
      render(<Footer socialLinks={mockSocialLinks} />);
      
      const twitterLink = screen.getByLabelText('Twitter');
      expect(twitterLink).toHaveClass('text-neutral-400', 'hover:text-white');
    });
  });

  describe('Navigation Sections', () => {
    it('should render default navigation sections', () => {
      render(<Footer />);
      
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
    });

    it('should render custom navigation sections', () => {
      render(<Footer navigation={mockNavigation} />);
      
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.queryByText('Resources')).not.toBeInTheDocument();
    });

    it('should render navigation links with correct hrefs', () => {
      render(<Footer navigation={mockNavigation} />);
      
      const upiLink = screen.getByRole('link', { name: 'UPI' });
      expect(upiLink).toHaveAttribute('href', '/products/upi');
      
      const aboutLink = screen.getByRole('link', { name: 'About Us' });
      expect(aboutLink).toHaveAttribute('href', '/about-us');
    });

    it('should apply proper styling to section titles', () => {
      render(<Footer navigation={mockNavigation} />);
      
      const productTitle = screen.getByText('Products');
      expect(productTitle).toHaveClass('text-sm', 'font-semibold', 'text-white', 'uppercase');
    });

    it('should apply proper styling to navigation links', () => {
      render(<Footer navigation={mockNavigation} />);
      
      const links = screen.getAllByTestId('footer-link');
      const navLinks = links.filter(link => 
        link.textContent === 'UPI' || 
        link.textContent === 'About Us'
      );
      
      navLinks.forEach(link => {
        expect(link).toHaveClass('text-neutral-300', 'hover:text-white');
      });
    });
  });

  describe('Compliance Section', () => {
    it('should render compliance section when provided', () => {
      render(<Footer complianceInfo={mockComplianceInfo} />);
      
      expect(screen.getByText('Licenses & Registrations')).toBeInTheDocument();
      expect(screen.getByText('Regulated By')).toBeInTheDocument();
    });

    it('should render licenses when provided', () => {
      render(<Footer complianceInfo={mockComplianceInfo} />);
      
      expect(screen.getByText('License 1')).toBeInTheDocument();
      expect(screen.getByText('License 2')).toBeInTheDocument();
    });

    it('should render regulatory bodies when provided', () => {
      render(<Footer complianceInfo={mockComplianceInfo} />);
      
      expect(screen.getByText('RBI')).toBeInTheDocument();
      expect(screen.getByText('SEBI')).toBeInTheDocument();
    });

    it('should render disclaimer when provided', () => {
      render(<Footer complianceInfo={mockComplianceInfo} />);
      
      expect(screen.getByText('Test disclaimer text')).toBeInTheDocument();
    });

    it('should not render compliance section when not provided', () => {
      render(<Footer complianceInfo={{}} />);
      
      expect(screen.queryByText('Licenses & Registrations')).not.toBeInTheDocument();
      expect(screen.queryByText('Regulated By')).not.toBeInTheDocument();
    });

    it('should handle partial compliance info', () => {
      const partialCompliance = {
        licenses: ['License 1'],
        disclaimer: 'Partial disclaimer'
      };
      
      render(<Footer complianceInfo={partialCompliance} />);
      
      expect(screen.getByText('License 1')).toBeInTheDocument();
      expect(screen.getByText('Partial disclaimer')).toBeInTheDocument();
      expect(screen.queryByText('Regulated By')).not.toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have proper grid layout for navigation sections', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const gridContainer = footer.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
    });

    it('should have proper responsive layout classes', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const gridContainer = footer.querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-6');
    });

    it('should render container component', () => {
      render(<Footer />);
      
      expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for social links', () => {
      render(<Footer socialLinks={mockSocialLinks} />);
      
      const twitterLink = screen.getByLabelText('Twitter');
      expect(twitterLink).toHaveAttribute('aria-label', 'Twitter');
      
      const linkedinLink = screen.getByLabelText('LinkedIn');
      expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
    });

    it('should have proper heading structure', () => {
      render(<Footer />);
      
      const productHeading = screen.getByRole('heading', { name: 'Products' });
      expect(productHeading).toBeInTheDocument();
      expect(productHeading.tagName).toBe('H3');
    });

    it('should have proper semantic structure', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty navigation array', () => {
      render(<Footer navigation={[]} />);
      
      expect(screen.getByText('Navi')).toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();
    });

    it('should handle empty social links array', () => {
      render(<Footer socialLinks={[]} />);
      
      expect(screen.getByText('Navi')).toBeInTheDocument();
      expect(screen.queryByLabelText('Twitter')).not.toBeInTheDocument();
    });

    it('should handle navigation sections with empty links', () => {
      const emptyLinksNav = [
        { title: 'Empty Section', links: [] }
      ];
      
      render(<Footer navigation={emptyLinksNav} />);
      
      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });

    it('should handle company info without optional fields', () => {
      const minimalCompanyInfo = {
        name: 'Minimal Navi',
        description: 'Minimal description'
      };
      
      render(<Footer companyInfo={minimalCompanyInfo} />);
      
      expect(screen.getByText('Minimal Navi')).toBeInTheDocument();
      expect(screen.getByText('Minimal description')).toBeInTheDocument();
      expect(screen.queryByText(/Support:/)).not.toBeInTheDocument();
    });
  });

  describe('Default Data', () => {
    it('should render all default navigation sections', () => {
      render(<Footer />);
      
      // Check for default navigation sections
      expect(screen.getByText('UPI')).toBeInTheDocument();
      expect(screen.getByText('Cash Loan')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Calculators')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('should render default compliance information', () => {
      render(<Footer />);
      
      expect(screen.getByText('Licenses & Registrations')).toBeInTheDocument();
      expect(screen.getByText('Regulated By')).toBeInTheDocument();
      expect(screen.getByText(/Navi is a registered trademark/)).toBeInTheDocument();
    });

    it('should render default social media links', () => {
      render(<Footer />);
      
      const socialLinks = screen.getAllByTestId('footer-link');
      const socialMediaLinks = socialLinks.filter(link => 
        link.getAttribute('href')?.includes('twitter.com') ||
        link.getAttribute('href')?.includes('linkedin.com') ||
        link.getAttribute('href')?.includes('facebook.com') ||
        link.getAttribute('href')?.includes('instagram.com')
      );
      
      expect(socialMediaLinks.length).toBeGreaterThan(0);
    });
  });
});
