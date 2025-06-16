import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container, containerVariants } from '@/components/layout/Container';

describe('Container Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<Container data-testid="container">Container content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('mx-auto', 'w-full');
      expect(container.tagName).toBe('DIV');
    });

    it('should render children correctly', () => {
      render(<Container>Test Content</Container>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Container className="custom-class" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Size Variants', () => {
    it('should apply small size styles', () => {
      render(<Container size="sm" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-sm');
    });

    it('should apply medium size styles', () => {
      render(<Container size="md" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-md');
    });

    it('should apply large size styles', () => {
      render(<Container size="lg" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-lg');
    });

    it('should apply extra large size styles (default)', () => {
      render(<Container size="xl" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-xl');
    });

    it('should apply 2xl size styles', () => {
      render(<Container size="2xl" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-2xl');
    });

    it('should apply full size styles', () => {
      render(<Container size="full" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-full');
    });

    it('should apply content size styles', () => {
      render(<Container size="content" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-4xl');
    });
  });

  describe('Padding Variants', () => {
    it('should apply no padding', () => {
      render(<Container padding="none" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('px-0');
    });

    it('should apply small padding', () => {
      render(<Container padding="sm" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('px-4');
    });

    it('should apply medium padding (default)', () => {
      render(<Container padding="md" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('px-6');
    });

    it('should apply large padding', () => {
      render(<Container padding="lg" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('px-8');
    });
  });

  describe('Custom Element Type', () => {
    it('should render as custom element when as prop is provided', () => {
      render(<Container as="section" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container.tagName).toBe('SECTION');
    });

    it('should render as main element', () => {
      render(<Container as="main" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container.tagName).toBe('MAIN');
    });

    it('should render as article element', () => {
      render(<Container as="article" data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container.tagName).toBe('ARTICLE');
    });
  });

  describe('Combined Variants', () => {
    it('should apply multiple variants correctly', () => {
      render(
        <Container 
          size="lg" 
          padding="lg" 
          className="custom-class" 
          data-testid="container"
        >
          Content
        </Container>
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-lg', 'px-8', 'custom-class');
    });

    it('should apply default variants when none specified', () => {
      render(<Container data-testid="container">Content</Container>);
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-screen-xl', 'px-6');
    });
  });

  describe('HTML Attributes', () => {
    it('should accept and apply HTML attributes', () => {
      render(
        <Container 
          id="test-container" 
          role="main" 
          aria-label="Main content"
          data-testid="container"
        >
          Content
        </Container>
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveAttribute('id', 'test-container');
      expect(container).toHaveAttribute('role', 'main');
      expect(container).toHaveAttribute('aria-label', 'Main content');
    });
  });

  describe('Forward Ref', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Container with ref</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward ref correctly with custom element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Container as="section" ref={ref}>Container with ref</Container>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('SECTION');
    });
  });

  describe('Container Variants Function', () => {
    it('should generate correct classes for default variants', () => {
      const classes = containerVariants();
      expect(classes).toContain('max-w-screen-xl');
      expect(classes).toContain('px-6');
    });

    it('should generate correct classes for custom variants', () => {
      const classes = containerVariants({ size: 'lg', padding: 'lg' });
      expect(classes).toContain('max-w-screen-lg');
      expect(classes).toContain('px-8');
    });

    it('should generate correct classes for content size', () => {
      const classes = containerVariants({ size: 'content', padding: 'none' });
      expect(classes).toContain('max-w-4xl');
      expect(classes).toContain('px-0');
    });
  });

  describe('Responsive Design', () => {
    it('should work well for responsive layouts', () => {
      render(
        <Container size="full" padding="sm" data-testid="responsive-container">
          <div>Responsive content</div>
        </Container>
      );
      const container = screen.getByTestId('responsive-container');
      expect(container).toHaveClass('max-w-full', 'px-4');
      expect(screen.getByText('Responsive content')).toBeInTheDocument();
    });
  });
});
