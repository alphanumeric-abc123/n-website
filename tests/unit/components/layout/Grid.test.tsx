import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid, GridItem, gridVariants, gridItemVariants } from '@/components/layout/Grid';

describe('Grid Components', () => {
  describe('Grid', () => {
    describe('Basic Rendering', () => {
      it('should render with default props', () => {
        render(<Grid data-testid="grid">Grid content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass('grid');
        expect(grid.tagName).toBe('DIV');
      });

      it('should render children correctly', () => {
        render(<Grid>Test Content</Grid>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
      });

      it('should apply custom className', () => {
        render(<Grid className="custom-grid" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('custom-grid');
      });
    });

    describe('Column Variants', () => {
      it('should apply 1 column layout (default)', () => {
        render(<Grid cols={1} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-1');
      });

      it('should apply 2 column responsive layout', () => {
        render(<Grid cols={2} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
      });

      it('should apply 3 column responsive layout', () => {
        render(<Grid cols={3} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
      });

      it('should apply 4 column responsive layout', () => {
        render(<Grid cols={4} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
      });

      it('should apply 6 column responsive layout', () => {
        render(<Grid cols={6} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-6');
      });

      it('should apply 12 column layout', () => {
        render(<Grid cols={12} data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('grid-cols-12');
      });
    });

    describe('Gap Variants', () => {
      it('should apply no gap', () => {
        render(<Grid gap="none" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('gap-0');
      });

      it('should apply small gap', () => {
        render(<Grid gap="sm" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('gap-2');
      });

      it('should apply medium gap (default)', () => {
        render(<Grid gap="md" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('gap-4');
      });

      it('should apply large gap', () => {
        render(<Grid gap="lg" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('gap-6');
      });

      it('should apply extra large gap', () => {
        render(<Grid gap="xl" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('gap-8');
      });
    });

    describe('Alignment Variants', () => {
      it('should apply start alignment', () => {
        render(<Grid align="start" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('items-start');
      });

      it('should apply center alignment', () => {
        render(<Grid align="center" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('items-center');
      });

      it('should apply end alignment', () => {
        render(<Grid align="end" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('items-end');
      });

      it('should apply stretch alignment (default)', () => {
        render(<Grid align="stretch" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('items-stretch');
      });
    });

    describe('Justify Variants', () => {
      it('should apply start justify', () => {
        render(<Grid justify="start" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('justify-items-start');
      });

      it('should apply center justify', () => {
        render(<Grid justify="center" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('justify-items-center');
      });

      it('should apply end justify', () => {
        render(<Grid justify="end" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('justify-items-end');
      });

      it('should apply stretch justify (default)', () => {
        render(<Grid justify="stretch" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass('justify-items-stretch');
      });
    });

    describe('Custom Element Type', () => {
      it('should render as custom element when as prop is provided', () => {
        render(<Grid as="section" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid.tagName).toBe('SECTION');
      });

      it('should render as main element', () => {
        render(<Grid as="main" data-testid="grid">Content</Grid>);
        const grid = screen.getByTestId('grid');
        expect(grid.tagName).toBe('MAIN');
      });
    });

    describe('Combined Variants', () => {
      it('should apply multiple variants correctly', () => {
        render(
          <Grid 
            cols={3} 
            gap="lg" 
            align="center" 
            justify="center"
            className="custom-grid" 
            data-testid="grid"
          >
            Content
          </Grid>
        );
        const grid = screen.getByTestId('grid');
        expect(grid).toHaveClass(
          'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3',
          'gap-6', 'items-center', 'justify-items-center', 'custom-grid'
        );
      });
    });

    describe('Forward Ref', () => {
      it('should forward ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Grid ref={ref}>Grid with ref</Grid>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('GridItem', () => {
    describe('Basic Rendering', () => {
      it('should render with default props', () => {
        render(<GridItem data-testid="grid-item">Grid item content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toBeInTheDocument();
        expect(gridItem.tagName).toBe('DIV');
      });

      it('should render children correctly', () => {
        render(<GridItem>Test Item</GridItem>);
        expect(screen.getByText('Test Item')).toBeInTheDocument();
      });

      it('should apply custom className', () => {
        render(<GridItem className="custom-item" data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('custom-item');
      });
    });

    describe('Column Span Variants', () => {
      it('should apply col-span-1 (default)', () => {
        render(<GridItem colSpan={1} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-1');
      });

      it('should apply col-span-2', () => {
        render(<GridItem colSpan={2} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-2');
      });

      it('should apply col-span-6', () => {
        render(<GridItem colSpan={6} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-6');
      });

      it('should apply col-span-12', () => {
        render(<GridItem colSpan={12} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-12');
      });

      it('should apply col-span-full', () => {
        render(<GridItem colSpan="full" data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-full');
      });
    });

    describe('Row Span Variants', () => {
      it('should apply row-span-1 (default)', () => {
        render(<GridItem rowSpan={1} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('row-span-1');
      });

      it('should apply row-span-2', () => {
        render(<GridItem rowSpan={2} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('row-span-2');
      });

      it('should apply row-span-6', () => {
        render(<GridItem rowSpan={6} data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('row-span-6');
      });

      it('should apply row-span-full', () => {
        render(<GridItem rowSpan="full" data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('row-span-full');
      });
    });

    describe('Combined Spans', () => {
      it('should apply both column and row spans', () => {
        render(
          <GridItem 
            colSpan={3} 
            rowSpan={2} 
            className="custom-item" 
            data-testid="grid-item"
          >
            Content
          </GridItem>
        );
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem).toHaveClass('col-span-3', 'row-span-2', 'custom-item');
      });
    });

    describe('Custom Element Type', () => {
      it('should render as custom element when as prop is provided', () => {
        render(<GridItem as="article" data-testid="grid-item">Content</GridItem>);
        const gridItem = screen.getByTestId('grid-item');
        expect(gridItem.tagName).toBe('ARTICLE');
      });
    });

    describe('Forward Ref', () => {
      it('should forward ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<GridItem ref={ref}>Grid item with ref</GridItem>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('Complete Grid Layout', () => {
    it('should render complete grid with items', () => {
      render(
        <Grid cols={3} gap="md" data-testid="complete-grid">
          <GridItem colSpan={1} data-testid="item-1">Item 1</GridItem>
          <GridItem colSpan={2} data-testid="item-2">Item 2</GridItem>
          <GridItem colSpan="full" data-testid="item-3">Item 3</GridItem>
        </Grid>
      );

      expect(screen.getByTestId('complete-grid')).toBeInTheDocument();
      expect(screen.getByTestId('item-1')).toHaveClass('col-span-1');
      expect(screen.getByTestId('item-2')).toHaveClass('col-span-2');
      expect(screen.getByTestId('item-3')).toHaveClass('col-span-full');
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('Variant Functions', () => {
    describe('gridVariants', () => {
      it('should generate correct classes for default variants', () => {
        const classes = gridVariants();
        expect(classes).toContain('grid-cols-1');
        expect(classes).toContain('gap-4');
        expect(classes).toContain('items-stretch');
        expect(classes).toContain('justify-items-stretch');
      });

      it('should generate correct classes for custom variants', () => {
        const classes = gridVariants({ cols: 4, gap: 'lg', align: 'center', justify: 'center' });
        expect(classes).toContain('grid-cols-1');
        expect(classes).toContain('md:grid-cols-2');
        expect(classes).toContain('lg:grid-cols-4');
        expect(classes).toContain('gap-6');
        expect(classes).toContain('items-center');
        expect(classes).toContain('justify-items-center');
      });
    });

    describe('gridItemVariants', () => {
      it('should generate correct classes for default variants', () => {
        const classes = gridItemVariants();
        expect(classes).toContain('col-span-1');
        expect(classes).toContain('row-span-1');
      });

      it('should generate correct classes for custom variants', () => {
        const classes = gridItemVariants({ colSpan: 6, rowSpan: 3 });
        expect(classes).toContain('col-span-6');
        expect(classes).toContain('row-span-3');
      });

      it('should generate correct classes for full spans', () => {
        const classes = gridItemVariants({ colSpan: 'full', rowSpan: 'full' });
        expect(classes).toContain('col-span-full');
        expect(classes).toContain('row-span-full');
      });
    });
  });
});
