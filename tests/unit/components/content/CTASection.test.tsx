import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CTASection, ContentfulCTASection, ctaSectionVariants } from '@/components/content/CTASection';
import type { CTASection as CTASectionType } from '@/types/contentful';

// Mock the Button and Container components
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, className, variant, size, ...props }: any) => (
    <button 
      onClick={onClick} 
      className={`btn ${variant} ${size} ${className}`}
      data-testid="cta-button"
      {...props}
    >
      {children}
    </button>
  )
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children, className, ...props }: any) => (
    <div className={`container ${className}`} data-testid="cta-container" {...props}>
      {children}
    </div>
  )
}));

describe('CTASection Components', () => {
  describe('CTASection', () => {
    const mockPrimaryCta = {
      text: 'Get Started',
      href: '/signup',
      onClick: jest.fn()
    };

    const mockSecondaryCta = {
      text: 'Learn More',
      href: '/about',
      onClick: jest.fn()
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Basic Rendering', () => {
      it('should render with required props', () => {
        render(
          <CTASection 
            headline="Test CTA Headline" 
            primaryCta={mockPrimaryCta}
            data-testid="cta-section"
          />
        );
        
        expect(screen.getByTestId('cta-section')).toBeInTheDocument();
        expect(screen.getByText('Test CTA Headline')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
      });

      it('should render as section element', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section.tagName).toBe('SECTION');
      });

      it('should apply custom className', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            className="custom-cta"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('custom-cta');
      });
    });

    describe('Content Rendering', () => {
      it('should render headline with proper styling', () => {
        render(
          <CTASection 
            headline="Amazing CTA Headline" 
            primaryCta={mockPrimaryCta}
          />
        );
        
        const headline = screen.getByRole('heading', { level: 2 });
        expect(headline).toHaveTextContent('Amazing CTA Headline');
        expect(headline).toHaveClass('text-3xl', 'font-bold', 'tracking-tight');
      });

      it('should render description when provided', () => {
        render(
          <CTASection 
            headline="Test Headline" 
            description="This is the CTA description"
            primaryCta={mockPrimaryCta}
          />
        );
        
        expect(screen.getByText('This is the CTA description')).toBeInTheDocument();
      });

      it('should not render description when not provided', () => {
        render(
          <CTASection 
            headline="Test Headline" 
            primaryCta={mockPrimaryCta}
          />
        );
        
        expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
      });
    });

    describe('Variants', () => {
      it('should apply default variant styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="default"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-neutral-50');
      });

      it('should apply primary variant styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="primary"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-gradient-to-br', 'from-primary-500', 'to-primary-700', 'text-white');
      });

      it('should apply secondary variant styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="secondary"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-gradient-to-br', 'from-secondary-500', 'to-secondary-700', 'text-white');
      });

      it('should apply dark variant styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="dark"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-gradient-to-br', 'from-neutral-800', 'to-neutral-900', 'text-white');
      });

      it('should apply transparent variant styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="transparent"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-transparent');
      });

      it('should apply image variant when backgroundImage is provided', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            backgroundImage="https://example.com/bg.jpg"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
        expect(section).toHaveStyle('background-image: url(https://example.com/bg.jpg)');
      });
    });

    describe('Sizes', () => {
      it('should apply small size styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            size="sm"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('py-12', 'md:py-16');
      });

      it('should apply medium size styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            size="md"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('py-16', 'md:py-20');
      });

      it('should apply large size styles (default)', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            size="lg"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('py-20', 'md:py-24');
      });

      it('should apply extra large size styles', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            size="xl"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('py-24', 'md:py-32');
      });
    });

    describe('Alignment', () => {
      it('should apply left alignment', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            alignment="left"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('text-left');
      });

      it('should apply center alignment (default)', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            alignment="center"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('text-center');
      });

      it('should apply right alignment', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            alignment="right"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveClass('text-right');
      });
    });

    describe('Background and Styling', () => {
      it('should apply background color when provided', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            backgroundColor="#ff0000"
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        expect(section).toHaveStyle('background-color: #ff0000');
      });

      it('should render background pattern when pattern is true', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            pattern={true}
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        const pattern = section.querySelector('svg');
        expect(pattern).toBeInTheDocument();
      });

      it('should render overlay when backgroundImage and overlay are provided', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            backgroundImage="https://example.com/bg.jpg"
            overlay={true}
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        const overlay = section.querySelector('.absolute.inset-0.bg-black\\/50');
        expect(overlay).toBeInTheDocument();
      });

      it('should not render overlay when overlay is false', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            backgroundImage="https://example.com/bg.jpg"
            overlay={false}
            data-testid="cta-section"
          />
        );
        
        const section = screen.getByTestId('cta-section');
        const overlay = section.querySelector('.absolute.inset-0.bg-black\\/50');
        expect(overlay).not.toBeInTheDocument();
      });
    });

    describe('CTA Buttons', () => {
      it('should render primary CTA button', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
          />
        );
        
        const button = screen.getByText('Get Started');
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(mockPrimaryCta.onClick).toHaveBeenCalledTimes(1);
      });

      it('should render secondary CTA button when provided', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            secondaryCta={mockSecondaryCta}
          />
        );
        
        const primaryButton = screen.getByText('Get Started');
        const secondaryButton = screen.getByText('Learn More');
        
        expect(primaryButton).toBeInTheDocument();
        expect(secondaryButton).toBeInTheDocument();
        
        fireEvent.click(secondaryButton);
        expect(mockSecondaryCta.onClick).toHaveBeenCalledTimes(1);
      });

      it('should not render secondary CTA when not provided', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
          />
        );
        
        expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
      });

      it('should apply custom button variants', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={{ ...mockPrimaryCta, variant: 'outline' }}
            secondaryCta={{ ...mockSecondaryCta, variant: 'ghost' }}
          />
        );
        
        const buttons = screen.getAllByTestId('cta-button');
        expect(buttons[0]).toHaveClass('outline');
        expect(buttons[1]).toHaveClass('ghost');
      });
    });

    describe('Text Color Based on Variant', () => {
      it('should use dark text for default variant', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="default"
          />
        );
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-neutral-900');
      });

      it('should use white text for primary variant', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="primary"
          />
        );
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-white');
      });

      it('should use white text for dark variant', () => {
        render(
          <CTASection 
            headline="Test" 
            primaryCta={mockPrimaryCta}
            variant="dark"
          />
        );
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-white');
      });
    });

    describe('Forward Ref', () => {
      it('should forward ref correctly', () => {
        const ref = React.createRef<HTMLElement>();
        render(
          <CTASection 
            ref={ref}
            headline="Test" 
            primaryCta={mockPrimaryCta}
          />
        );
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('SECTION');
      });
    });
  });

  describe('ContentfulCTASection', () => {
    const mockCTAData: CTASectionType = {
      headline: 'Contentful CTA Headline',
      description: 'Contentful CTA description',
      primaryCtaText: 'Download Now',
      primaryCtaLink: '/download',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '/learn',
      backgroundColor: '#0066cc',
      backgroundImage: {
        sys: { id: 'bg-1' },
        fields: {
          title: 'CTA Background',
          file: {
            url: 'https://example.com/contentful-cta.jpg',
            details: { size: 2048, image: { width: 1200, height: 800 } },
            fileName: 'cta.jpg',
            contentType: 'image/jpeg'
          }
        }
      }
    };

    it('should render with Contentful data', () => {
      render(<ContentfulCTASection data={mockCTAData} />);
      
      expect(screen.getByText('Contentful CTA Headline')).toBeInTheDocument();
      expect(screen.getByText('Contentful CTA description')).toBeInTheDocument();
      expect(screen.getByText('Download Now')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <ContentfulCTASection data={mockCTAData} className="contentful-cta" />
      );
      
      const section = container.querySelector('section');
      expect(section).toHaveClass('contentful-cta');
    });

    it('should handle overlay and pattern props', () => {
      const { container } = render(
        <ContentfulCTASection 
          data={mockCTAData} 
          overlay={false} 
          pattern={true}
        />
      );
      
      const section = container.querySelector('section');
      const overlay = section?.querySelector('.absolute.inset-0.bg-black\\/50');
      const pattern = section?.querySelector('svg');
      
      expect(overlay).not.toBeInTheDocument();
      expect(pattern).toBeInTheDocument();
    });

    it('should handle data without secondary CTA', () => {
      const dataWithoutSecondary: CTASectionType = {
        ...mockCTAData,
        secondaryCtaText: undefined,
        secondaryCtaLink: undefined
      };
      
      render(<ContentfulCTASection data={dataWithoutSecondary} />);
      
      expect(screen.getByText('Download Now')).toBeInTheDocument();
      expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
    });
  });

  describe('CTA Section Variants Function', () => {
    it('should generate correct classes for default variants', () => {
      const classes = ctaSectionVariants();
      expect(classes).toContain('bg-gradient-to-br');
      expect(classes).toContain('from-primary-500');
      expect(classes).toContain('to-primary-700');
      expect(classes).toContain('py-20');
      expect(classes).toContain('md:py-24');
      expect(classes).toContain('text-center');
    });

    it('should generate correct classes for custom variants', () => {
      const classes = ctaSectionVariants({ 
        variant: 'dark', 
        size: 'xl', 
        alignment: 'left' 
      });
      expect(classes).toContain('from-neutral-800');
      expect(classes).toContain('to-neutral-900');
      expect(classes).toContain('py-24');
      expect(classes).toContain('md:py-32');
      expect(classes).toContain('text-left');
    });

    it('should generate correct classes for image variant', () => {
      const classes = ctaSectionVariants({ variant: 'image' });
      expect(classes).toContain('bg-cover');
      expect(classes).toContain('bg-center');
      expect(classes).toContain('bg-no-repeat');
    });
  });
});
