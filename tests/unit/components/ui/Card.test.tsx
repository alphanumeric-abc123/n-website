import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  cardVariants 
} from '@/components/ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render with default props', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-white', 'text-neutral-900', 'shadow-sm');
    });

    it('should apply custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    describe('Variants', () => {
      it('should apply default variant styles', () => {
        render(<Card variant="default" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('border-neutral-200');
      });

      it('should apply outlined variant styles', () => {
        render(<Card variant="outlined" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('border-neutral-300');
      });

      it('should apply elevated variant styles', () => {
        render(<Card variant="elevated" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('border-neutral-200', 'shadow-md');
      });

      it('should apply interactive variant styles', () => {
        render(<Card variant="interactive" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('border-neutral-200', 'hover:border-neutral-300', 'hover:shadow-md', 'transition-all', 'cursor-pointer');
      });

      it('should apply product variant styles', () => {
        render(<Card variant="product" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('border-primary-200', 'bg-primary-50/30');
      });
    });

    describe('Padding', () => {
      it('should apply no padding', () => {
        render(<Card padding="none" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('p-0');
      });

      it('should apply small padding', () => {
        render(<Card padding="sm" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('p-4');
      });

      it('should apply medium padding (default)', () => {
        render(<Card padding="md" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('p-6');
      });

      it('should apply large padding', () => {
        render(<Card padding="lg" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('p-8');
      });
    });

    describe('Size', () => {
      it('should apply small size', () => {
        render(<Card size="sm" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('max-w-sm');
      });

      it('should apply medium size', () => {
        render(<Card size="md" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('max-w-md');
      });

      it('should apply large size', () => {
        render(<Card size="lg" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('max-w-lg');
      });

      it('should apply extra large size', () => {
        render(<Card size="xl" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('max-w-xl');
      });

      it('should apply full size (default)', () => {
        render(<Card size="full" data-testid="card">Content</Card>);
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('w-full');
      });
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card with ref</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    it('should render with default styles', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5');
    });

    it('should apply custom className', () => {
      render(<CardHeader className="custom-header" data-testid="header">Content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Header</CardHeader>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardTitle', () => {
    it('should render as h3 with default styles', () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-none', 'tracking-tight');
      expect(title).toHaveTextContent('Card Title');
    });

    it('should apply custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('custom-title');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardTitle ref={ref}>Title</CardTitle>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('CardDescription', () => {
    it('should render as paragraph with default styles', () => {
      render(<CardDescription>Card description</CardDescription>);
      const description = screen.getByText('Card description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm', 'text-neutral-600');
    });

    it('should apply custom className', () => {
      render(<CardDescription className="custom-desc">Description</CardDescription>);
      const description = screen.getByText('Description');
      expect(description).toHaveClass('custom-desc');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Description</CardDescription>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('CardContent', () => {
    it('should render with default styles', () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('pt-0');
    });

    it('should apply custom className', () => {
      render(<CardContent className="custom-content" data-testid="content">Content</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Content</CardContent>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardFooter', () => {
    it('should render with default styles', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'pt-0');
    });

    it('should apply custom className', () => {
      render(<CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('custom-footer');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Footer</CardFooter>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Complete Card Structure', () => {
    it('should render complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument();
      expect(screen.getByText('This is a test card description')).toBeInTheDocument();
      expect(screen.getByText('This is the card content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('Card Variants Function', () => {
    it('should generate correct classes for default variants', () => {
      const classes = cardVariants();
      expect(classes).toContain('border-neutral-200');
      expect(classes).toContain('p-6');
      expect(classes).toContain('w-full');
    });

    it('should generate correct classes for custom variants', () => {
      const classes = cardVariants({ variant: 'elevated', padding: 'lg', size: 'md' });
      expect(classes).toContain('shadow-md');
      expect(classes).toContain('p-8');
      expect(classes).toContain('max-w-md');
    });
  });
});
