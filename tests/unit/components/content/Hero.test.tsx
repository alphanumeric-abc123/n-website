import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero, ContentfulHero, heroVariants } from '@/components/content/Hero';
import type { HeroSection } from '@/types/contentful';

// Mock the Button and Container components
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, className, variant, size, ...props }: any) => (
    <button 
      onClick={onClick} 
      className={`btn ${variant} ${size} ${className}`}
      data-testid="hero-button"
      {...props}
    >
      {children}
    </button>
  )
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children, className, ...props }: any) => (
    <div className={`container ${className}`} data-testid="hero-container" {...props}>
      {children}
    </div>
  )
}));

describe('Hero Components', () => {
  describe('Hero', () => {
    describe('Basic Rendering', () => {
      it('should render with required props', () => {
        render(<Hero headline="Test Headline" />);
        
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByText('Test Headline')).toBeInTheDocument();
      });

      it('should render as section element', () => {
        render(<Hero headline="Test" data-testid="hero-section" />);
        
        const hero = screen.getByTestId('hero-section');
        expect(hero.tagName).toBe('SECTION');
      });

      it('should apply custom className', () => {
        render(<Hero headline="Test" className="custom-hero" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('custom-hero');
      });
    });

    describe('Content Rendering', () => {
      it('should render headline with proper styling', () => {
        render(<Hero headline="Amazing Financial Services" />);
        
        const headline = screen.getByRole('heading', { level: 1 });
        expect(headline).toHaveTextContent('Amazing Financial Services');
        expect(headline).toHaveClass('text-4xl', 'font-bold', 'tracking-tight');
      });

      it('should render subtext when provided', () => {
        render(
          <Hero 
            headline="Test Headline" 
            subtext="This is the subtext description"
          />
        );
        
        expect(screen.getByText('This is the subtext description')).toBeInTheDocument();
      });

      it('should not render subtext when not provided', () => {
        render(<Hero headline="Test Headline" />);
        
        expect(screen.queryByText(/subtext/i)).not.toBeInTheDocument();
      });

      it('should render custom children', () => {
        render(
          <Hero headline="Test">
            <div data-testid="custom-content">Custom content</div>
          </Hero>
        );
        
        expect(screen.getByTestId('custom-content')).toBeInTheDocument();
        expect(screen.getByText('Custom content')).toBeInTheDocument();
      });
    });

    describe('Variants', () => {
      it('should apply default variant styles', () => {
        render(<Hero headline="Test" variant="default" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('bg-gradient-to-br', 'from-primary-50', 'to-primary-100');
      });

      it('should apply primary variant styles', () => {
        render(<Hero headline="Test" variant="primary" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('bg-gradient-to-br', 'from-primary-500', 'to-primary-700', 'text-white');
      });

      it('should apply secondary variant styles', () => {
        render(<Hero headline="Test" variant="secondary" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('bg-gradient-to-br', 'from-secondary-50', 'to-secondary-100');
      });

      it('should apply dark variant styles', () => {
        render(<Hero headline="Test" variant="dark" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('bg-gradient-to-br', 'from-neutral-800', 'to-neutral-900', 'text-white');
      });

      it('should apply image variant when backgroundImage is provided', () => {
        render(
          <Hero 
            headline="Test" 
            backgroundImage="https://example.com/hero.jpg"
            data-testid="hero"
          />
        );
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
        expect(hero).toHaveStyle('background-image: url(https://example.com/hero.jpg)');
      });
    });

    describe('Sizes', () => {
      it('should apply small size styles', () => {
        render(<Hero headline="Test" size="sm" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('py-12', 'md:py-16');
      });

      it('should apply medium size styles', () => {
        render(<Hero headline="Test" size="md" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('py-16', 'md:py-24');
      });

      it('should apply large size styles (default)', () => {
        render(<Hero headline="Test" size="lg" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('py-24', 'md:py-32');
      });

      it('should apply extra large size styles', () => {
        render(<Hero headline="Test" size="xl" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('py-32', 'md:py-40');
      });
    });

    describe('Alignment', () => {
      it('should apply left alignment (default)', () => {
        render(<Hero headline="Test" alignment="left" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('text-left');
      });

      it('should apply center alignment', () => {
        render(<Hero headline="Test" alignment="center" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('text-center');
      });

      it('should apply right alignment', () => {
        render(<Hero headline="Test" alignment="right" data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        expect(hero).toHaveClass('text-right');
      });
    });

    describe('Background Image and Overlay', () => {
      it('should render background image without overlay when overlay is false', () => {
        render(
          <Hero 
            headline="Test" 
            backgroundImage="https://example.com/hero.jpg"
            overlay={false}
            data-testid="hero"
          />
        );
        
        const hero = screen.getByTestId('hero');
        const overlay = hero.querySelector('.absolute.inset-0.bg-black\\/40');
        expect(overlay).not.toBeInTheDocument();
      });

      it('should not render overlay when no background image', () => {
        render(<Hero headline="Test" overlay={true} data-testid="hero" />);
        
        const hero = screen.getByTestId('hero');
        const overlay = hero.querySelector('.absolute.inset-0.bg-black\\/40');
        expect(overlay).not.toBeInTheDocument();
      });
    });

    describe('CTA Buttons', () => {
      it('should render primary CTA button', () => {
        const handleClick = jest.fn();
        render(
          <Hero 
            headline="Test" 
            primaryCta={{
              text: "Get Started",
              href: "/signup",
              onClick: handleClick
            }}
          />
        );
        
        const button = screen.getByText('Get Started');
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('should render secondary CTA button', () => {
        const handleClick = jest.fn();
        render(
          <Hero 
            headline="Test" 
            secondaryCta={{
              text: "Learn More",
              href: "/about",
              onClick: handleClick
            }}
          />
        );
        
        const button = screen.getByText('Learn More');
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('should render both primary and secondary CTA buttons', () => {
        render(
          <Hero 
            headline="Test" 
            primaryCta={{ text: "Get Started", href: "/signup" }}
            secondaryCta={{ text: "Learn More", href: "/about" }}
          />
        );
        
        expect(screen.getByText('Get Started')).toBeInTheDocument();
        expect(screen.getByText('Learn More')).toBeInTheDocument();
      });

      it('should not render CTA section when no CTAs provided', () => {
        render(<Hero headline="Test" />);
        
        expect(screen.queryByTestId('hero-button')).not.toBeInTheDocument();
      });
    });

    describe('Text Color Based on Variant', () => {
      it('should use dark text for default variant', () => {
        render(<Hero headline="Test" variant="default" />);
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-neutral-900');
      });

      it('should use white text for primary variant', () => {
        render(<Hero headline="Test" variant="primary" />);
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-white');
      });

      it('should use white text for dark variant', () => {
        render(<Hero headline="Test" variant="dark" />);
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-white');
      });

      it('should use white text for background image with overlay', () => {
        render(
          <Hero 
            headline="Test" 
            backgroundImage="https://example.com/hero.jpg"
            overlay={true}
          />
        );
        
        const headline = screen.getByRole('heading');
        expect(headline).toHaveClass('text-white');
      });
    });

    describe('Forward Ref', () => {
      it('should forward ref correctly', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Hero ref={ref} headline="Test" />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('SECTION');
      });
    });
  });

  describe('ContentfulHero', () => {
    const mockHeroData: HeroSection = {
      headline: 'Contentful Hero Headline',
      subtext: 'Contentful hero subtext',
      ctaText: 'Get Started Now',
      ctaLink: '/signup',
      ctaType: 'primary',
      alignment: 'center',
      backgroundImage: {
        sys: { id: 'bg-1' },
        fields: {
          title: 'Hero Background',
          file: {
            url: 'https://example.com/contentful-hero.jpg',
            details: { size: 2048, image: { width: 1200, height: 800 } },
            fileName: 'hero.jpg',
            contentType: 'image/jpeg'
          }
        }
      }
    };

    it('should render with Contentful data', () => {
      render(<ContentfulHero data={mockHeroData} />);
      
      expect(screen.getByText('Contentful Hero Headline')).toBeInTheDocument();
      expect(screen.getByText('Contentful hero subtext')).toBeInTheDocument();
      expect(screen.getByText('Get Started Now')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<ContentfulHero data={mockHeroData} className="contentful-hero" />);
      
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('contentful-hero');
    });

    it('should handle overlay prop', () => {
      const { container } = render(<ContentfulHero data={mockHeroData} overlay={false} />);
      
      const hero = container.querySelector('section');
      const overlay = hero?.querySelector('.absolute.inset-0.bg-black\\/40');
      expect(overlay).not.toBeInTheDocument();
    });

    it('should use primary variant when ctaType is primary', () => {
      // Remove background image to test variant properly
      const dataWithoutBg: HeroSection = {
        ...mockHeroData,
        backgroundImage: undefined as any
      };
      
      const { container } = render(<ContentfulHero data={dataWithoutBg} />);
      
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('from-primary-500', 'to-primary-700');
    });

    it('should use default variant when ctaType is not primary', () => {
      const dataWithSecondary: HeroSection = {
        ...mockHeroData,
        ctaType: 'secondary',
        backgroundImage: undefined as any
      };
      
      const { container } = render(<ContentfulHero data={dataWithSecondary} />);
      
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('from-primary-50', 'to-primary-100');
    });
  });

  describe('Hero Variants Function', () => {
    it('should generate correct classes for default variants', () => {
      const classes = heroVariants();
      expect(classes).toContain('bg-gradient-to-br');
      expect(classes).toContain('from-primary-50');
      expect(classes).toContain('to-primary-100');
      expect(classes).toContain('py-24');
      expect(classes).toContain('md:py-32');
      expect(classes).toContain('text-left');
    });

    it('should generate correct classes for custom variants', () => {
      const classes = heroVariants({ 
        variant: 'primary', 
        size: 'xl', 
        alignment: 'center' 
      });
      expect(classes).toContain('from-primary-500');
      expect(classes).toContain('to-primary-700');
      expect(classes).toContain('text-white');
      expect(classes).toContain('py-32');
      expect(classes).toContain('md:py-40');
      expect(classes).toContain('text-center');
    });

    it('should generate correct classes for image variant', () => {
      const classes = heroVariants({ variant: 'image' });
      expect(classes).toContain('bg-cover');
      expect(classes).toContain('bg-center');
      expect(classes).toContain('bg-no-repeat');
    });
  });
});
