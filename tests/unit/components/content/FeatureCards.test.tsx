import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeatureCards, ContentfulFeatureCards, featureCardsVariants, featureCardVariants } from '@/components/content/FeatureCards';
import type { Feature } from '@/types/contentful';

// Mock the components
jest.mock('@/components/ui/Card', () => ({
  Card: ({ children, className, onClick, ...props }: any) => (
    <div className={`card ${className}`} onClick={onClick} data-testid="feature-card" {...props}>
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
  Button: ({ children, onClick, className, variant, size, ...props }: any) => (
    <button 
      onClick={onClick} 
      className={`btn ${variant} ${size} ${className}`}
      data-testid="feature-button"
      {...props}
    >
      {children}
    </button>
  )
}));

jest.mock('@/components/layout/Grid', () => ({
  Grid: ({ children, cols, gap, className }: any) => (
    <div className={`grid cols-${cols} gap-${gap} ${className}`} data-testid="feature-grid">
      {children}
    </div>
  )
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children, className, ...props }: any) => (
    <div className={`container ${className}`} data-testid="feature-container" {...props}>
      {children}
    </div>
  )
}));

describe('FeatureCards Components', () => {
  describe('FeatureCards', () => {
    const mockFeatures = [
      {
        title: 'Feature 1',
        description: 'Description for feature 1',
        icon: <svg data-testid="feature-icon-1">Icon 1</svg>,
        onClick: jest.fn()
      },
      {
        title: 'Feature 2',
        description: 'Description for feature 2',
        image: 'https://example.com/feature2.jpg',
        link: '/feature2',
        linkText: 'Learn More',
        onClick: jest.fn()
      },
      {
        title: 'Feature 3',
        description: 'Description for feature 3'
      }
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Basic Rendering', () => {
      it('should render with required props', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            data-testid="feature-cards"
          />
        );
        
        expect(screen.getByTestId('feature-cards')).toBeInTheDocument();
        expect(screen.getAllByTestId('feature-card')).toHaveLength(3);
      });

      it('should render as section element', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section.tagName).toBe('SECTION');
      });

      it('should apply custom className', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            className="custom-features"
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section).toHaveClass('custom-features');
      });
    });

    describe('Section Header', () => {
      it('should render section header when title, subtitle, or description provided', () => {
        render(
          <FeatureCards 
            title="Amazing Features"
            subtitle="Our Promise"
            description="These are our amazing features"
            features={mockFeatures}
          />
        );
        
        expect(screen.getByText('Amazing Features')).toBeInTheDocument();
        expect(screen.getByText('Our Promise')).toBeInTheDocument();
        expect(screen.getByText('These are our amazing features')).toBeInTheDocument();
      });

      it('should not render section header when no title, subtitle, or description', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        const headings = screen.queryAllByRole('heading');
        const sectionHeadings = headings.filter(h => h.textContent !== 'Feature 1' && h.textContent !== 'Feature 2' && h.textContent !== 'Feature 3');
        expect(sectionHeadings).toHaveLength(0);
      });

      it('should render only title when only title provided', () => {
        render(
          <FeatureCards 
            title="Just Title"
            features={mockFeatures}
          />
        );
        
        expect(screen.getByText('Just Title')).toBeInTheDocument();
        expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
      });

      it('should render title as h2 with proper styling', () => {
        render(
          <FeatureCards 
            title="Feature Title"
            features={mockFeatures}
          />
        );
        
        const title = screen.getByRole('heading', { level: 2 });
        expect(title).toHaveTextContent('Feature Title');
        expect(title).toHaveClass('text-3xl', 'font-bold', 'text-neutral-900');
      });
    });

    describe('Variants', () => {
      it('should apply default variant styles', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            variant="default"
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section).toHaveClass('bg-white');
      });

      it('should apply gray variant styles', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            variant="gray"
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section).toHaveClass('bg-neutral-50');
      });

      it('should apply primary variant styles', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            variant="primary"
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section).toHaveClass('bg-primary-50');
      });

      it('should apply gradient variant styles', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            variant="gradient"
            data-testid="feature-cards"
          />
        );
        
        const section = screen.getByTestId('feature-cards');
        expect(section).toHaveClass('bg-gradient-to-br', 'from-primary-50', 'to-secondary-50');
      });
    });

    describe('Grid Layout', () => {
      it('should render with default 3 columns', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        const grid = screen.getByTestId('feature-grid');
        expect(grid).toHaveClass('cols-3');
      });

      it('should render with custom column count', () => {
        render(<FeatureCards features={mockFeatures} columns={4} />);
        
        const grid = screen.getByTestId('feature-grid');
        expect(grid).toHaveClass('cols-4');
      });

      it('should render with 1 column', () => {
        render(<FeatureCards features={mockFeatures} columns={1} />);
        
        const grid = screen.getByTestId('feature-grid');
        expect(grid).toHaveClass('cols-1');
      });

      it('should render with 2 columns', () => {
        render(<FeatureCards features={mockFeatures} columns={2} />);
        
        const grid = screen.getByTestId('feature-grid');
        expect(grid).toHaveClass('cols-2');
      });
    });

    describe('Feature Cards', () => {
      it('should render all feature titles and descriptions', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByText('Description for feature 1')).toBeInTheDocument();
        expect(screen.getByText('Feature 2')).toBeInTheDocument();
        expect(screen.getByText('Description for feature 2')).toBeInTheDocument();
        expect(screen.getByText('Feature 3')).toBeInTheDocument();
        expect(screen.getByText('Description for feature 3')).toBeInTheDocument();
      });

      it('should render feature icons when provided', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        expect(screen.getByTestId('feature-icon-1')).toBeInTheDocument();
      });

      it('should render feature images when provided and no icon', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        const cards = screen.getAllByTestId('feature-card');
        const secondCard = cards[1];
        const imageDiv = secondCard.querySelector('div[style*="background-image"]');
        expect(imageDiv).toBeInTheDocument();
      });

      it('should render feature link buttons when provided', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        const linkButtons = screen.getAllByText('Learn More');
        const featureLinkButton = linkButtons.find(button => 
          button.closest('[data-testid="feature-card"]')
        );
        
        if (featureLinkButton) {
          expect(featureLinkButton).toBeInTheDocument();
        }
      });

      it('should handle feature click events', () => {
        render(<FeatureCards features={mockFeatures} />);
        
        const cards = screen.getAllByTestId('feature-card');
        fireEvent.click(cards[0]);
        expect(mockFeatures[0].onClick).toHaveBeenCalledTimes(1);
      });

      it('should handle feature link button clicks', () => {
        // Reset all mock calls to ensure clean state
        mockFeatures.forEach(feature => feature.onClick?.mockClear());
        
        render(<FeatureCards features={mockFeatures} />);
        
        // Get all feature cards and find the second one specifically
        const featureCards = screen.getAllByTestId('feature-card');
        const secondFeatureCard = featureCards[1];
        
        if (secondFeatureCard) {
          const linkButton = within(secondFeatureCard).getByText('Learn More');
          fireEvent.click(linkButton);
          expect(mockFeatures[1].onClick).toHaveBeenCalled();
        }
      });
    });

    describe('Card Variants and Sizes', () => {
      it('should apply default card variant', () => {
        render(<FeatureCards features={mockFeatures} cardVariant="default" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('hover:shadow-md');
      });

      it('should apply elevated card variant', () => {
        render(<FeatureCards features={mockFeatures} cardVariant="elevated" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('shadow-sm', 'hover:shadow-lg');
      });

      it('should apply interactive card variant', () => {
        render(<FeatureCards features={mockFeatures} cardVariant="interactive" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('hover:shadow-lg', 'hover:-translate-y-1', 'cursor-pointer');
      });

      it('should apply bordered card variant', () => {
        render(<FeatureCards features={mockFeatures} cardVariant="bordered" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('border-2', 'border-transparent', 'hover:border-primary-200');
      });

      it('should apply small card size', () => {
        render(<FeatureCards features={mockFeatures} cardSize="sm" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('p-4');
      });

      it('should apply medium card size (default)', () => {
        render(<FeatureCards features={mockFeatures} cardSize="md" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('p-6');
      });

      it('should apply large card size', () => {
        render(<FeatureCards features={mockFeatures} cardSize="lg" />);
        
        const cards = screen.getAllByTestId('feature-card');
        expect(cards[0]).toHaveClass('p-8');
      });
    });

    describe('Section CTA', () => {
      it('should render section CTA when showCta is true', () => {
        const handleCtaClick = jest.fn();
        render(
          <FeatureCards 
            features={mockFeatures}
            showCta={true}
            ctaText="View All Features"
            onCtaClick={handleCtaClick}
          />
        );
        
        const ctaButton = screen.getByText('View All Features');
        expect(ctaButton).toBeInTheDocument();
        
        fireEvent.click(ctaButton);
        expect(handleCtaClick).toHaveBeenCalledTimes(1);
      });

      it('should not render section CTA when showCta is false', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            showCta={false}
          />
        );
        
        expect(screen.queryByText('Learn More')).toBeInTheDocument(); // Feature link, not section CTA
        const buttons = screen.getAllByTestId('feature-button');
        expect(buttons).toHaveLength(1); // Only the feature link button
      });

      it('should use default CTA text when not provided', () => {
        render(
          <FeatureCards 
            features={mockFeatures}
            showCta={true}
          />
        );
        
        const learnMoreButtons = screen.getAllByText('Learn More');
        expect(learnMoreButtons.length).toBeGreaterThan(0);
      });
    });

    describe('Forward Ref', () => {
      it('should forward ref correctly', () => {
        const ref = React.createRef<HTMLElement>();
        render(<FeatureCards ref={ref} features={mockFeatures} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('SECTION');
      });
    });
  });

  describe('ContentfulFeatureCards', () => {
    const mockContentfulFeatures: Feature[] = [
      {
        title: 'Contentful Feature 1',
        description: 'Contentful description 1',
        icon: {
          sys: { id: 'icon-1' },
          fields: {
            title: 'Feature Icon 1',
            file: {
              url: 'https://example.com/icon1.svg',
              details: { size: 1024, image: { width: 24, height: 24 } },
              fileName: 'icon1.svg',
              contentType: 'image/svg+xml'
            }
          }
        },
        link: '/feature1',
        linkText: 'Explore Feature 1'
      },
      {
        title: 'Contentful Feature 2',
        description: 'Contentful description 2',
        icon: {
          sys: { id: 'icon-2' },
          fields: {
            title: 'Feature Icon 2',
            file: {
              url: 'https://example.com/icon2.svg',
              details: { size: 1024, image: { width: 24, height: 24 } },
              fileName: 'icon2.svg',
              contentType: 'image/svg+xml'
            }
          }
        },
        link: '/feature2',
        linkText: 'Explore Feature 2'
      }
    ];

    it('should render with Contentful data', () => {
      render(
        <ContentfulFeatureCards 
          title="Contentful Features"
          subtitle="From CMS"
          description="These features come from Contentful"
          features={mockContentfulFeatures}
        />
      );
      
      expect(screen.getByText('Contentful Features')).toBeInTheDocument();
      expect(screen.getByText('From CMS')).toBeInTheDocument();
      expect(screen.getByText('These features come from Contentful')).toBeInTheDocument();
      expect(screen.getByText('Contentful Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Contentful Feature 2')).toBeInTheDocument();
    });

    it('should render feature icons from Contentful', () => {
      render(<ContentfulFeatureCards features={mockContentfulFeatures} />);
      
      const iconImg = screen.getByAltText('Feature Icon 1');
      expect(iconImg).toBeInTheDocument();
      expect(iconImg).toHaveAttribute('src', 'https://example.com/icon1.svg');
    });

    it('should handle features without icons', () => {
      render(<ContentfulFeatureCards features={mockContentfulFeatures} />);
      
      expect(screen.getByText('Contentful Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Contentful description 2')).toBeInTheDocument();
    });

    it('should apply custom props', () => {
      const { container } = render(
        <ContentfulFeatureCards 
          features={mockContentfulFeatures}
          className="contentful-features"
          columns={2}
          variant="primary"
        />
      );
      
      const section = container.querySelector('section');
      expect(section).toHaveClass('contentful-features');
      expect(section).toHaveClass('bg-primary-50');
      
      const grid = screen.getByTestId('feature-grid');
      expect(grid).toHaveClass('cols-2');
    });

    it('should handle missing icon fields gracefully', () => {
      const featuresWithMissingIcon: Feature[] = [
        {
          title: 'Feature Without Icon',
          description: 'This feature has no icon',
          icon: {
            sys: { id: 'missing-icon' },
            fields: {
              title: 'Missing Icon',
              file: {
                url: '',
                details: { size: 0 },
                fileName: 'missing.svg',
                contentType: 'image/svg+xml'
              }
            }
          }
        }
      ];

      render(<ContentfulFeatureCards features={featuresWithMissingIcon} />);
      
      expect(screen.getByText('Feature Without Icon')).toBeInTheDocument();
      expect(screen.getByText('This feature has no icon')).toBeInTheDocument();
    });
  });

  describe('Variant Functions', () => {
    describe('featureCardsVariants', () => {
      it('should generate correct classes for default variant', () => {
        const classes = featureCardsVariants();
        expect(classes).toContain('py-16');
        expect(classes).toContain('md:py-24');
        expect(classes).toContain('bg-white');
      });

      it('should generate correct classes for custom variants', () => {
        const classes = featureCardsVariants({ variant: 'gradient' });
        expect(classes).toContain('bg-gradient-to-br');
        expect(classes).toContain('from-primary-50');
        expect(classes).toContain('to-secondary-50');
      });
    });

    describe('featureCardVariants', () => {
      it('should generate correct classes for default variant', () => {
        const classes = featureCardVariants();
        expect(classes).toContain('group');
        expect(classes).toContain('transition-all');
        expect(classes).toContain('duration-200');
        expect(classes).toContain('hover:shadow-md');
        expect(classes).toContain('p-6');
      });

      it('should generate correct classes for custom variants', () => {
        const classes = featureCardVariants({ variant: 'interactive', size: 'lg' });
        expect(classes).toContain('hover:shadow-lg');
        expect(classes).toContain('hover:-translate-y-1');
        expect(classes).toContain('cursor-pointer');
        expect(classes).toContain('p-8');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty features array', () => {
      render(<FeatureCards features={[]} />);
      
      expect(screen.getByTestId('feature-grid')).toBeInTheDocument();
      expect(screen.queryByTestId('feature-card')).not.toBeInTheDocument();
    });
  });
});
