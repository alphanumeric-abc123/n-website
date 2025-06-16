import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, priority, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-priority={priority}
        data-testid="next-image"
        {...props}
      />
    );
  };
});

describe('Home Page', () => {
  it('should render the main content', () => {
    render(<Home />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render the Next.js logo', () => {
    render(<Home />);
    
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/next.svg');
    expect(logo).toHaveAttribute('width', '180');
    expect(logo).toHaveAttribute('height', '38');
  });

  it('should render getting started instructions', () => {
    render(<Home />);
    
    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument();
    expect(screen.getByText('src/app/page.tsx')).toBeInTheDocument();
    expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(<Home />);
    
    const deployButton = screen.getByRole('link', { name: /Deploy now/ });
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveAttribute('href', expect.stringContaining('vercel.com'));
    expect(deployButton).toHaveAttribute('target', '_blank');
    
    const docsButton = screen.getByRole('link', { name: /Read our docs/ });
    expect(docsButton).toBeInTheDocument();
    expect(docsButton).toHaveAttribute('href', expect.stringContaining('nextjs.org/docs'));
    expect(docsButton).toHaveAttribute('target', '_blank');
  });

  it('should render footer links', () => {
    render(<Home />);
    
    const learnLink = screen.getByRole('link', { name: /Learn/ });
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute('href', expect.stringContaining('nextjs.org/learn'));
    
    const examplesLink = screen.getByRole('link', { name: /Examples/ });
    expect(examplesLink).toBeInTheDocument();
    expect(examplesLink).toHaveAttribute('href', expect.stringContaining('vercel.com/templates'));
    
    const nextjsLink = screen.getByRole('link', { name: /Go to nextjs.org/ });
    expect(nextjsLink).toBeInTheDocument();
    expect(nextjsLink).toHaveAttribute('href', expect.stringContaining('nextjs.org'));
  });

  it('should render Vercel logo in deploy button', () => {
    render(<Home />);
    
    const vercelLogo = screen.getByAltText('Vercel logomark');
    expect(vercelLogo).toBeInTheDocument();
    expect(vercelLogo).toHaveAttribute('src', '/vercel.svg');
    expect(vercelLogo).toHaveAttribute('width', '20');
    expect(vercelLogo).toHaveAttribute('height', '20');
  });

  it('should render footer icons', () => {
    render(<Home />);
    
    const fileIcon = screen.getByAltText('File icon');
    expect(fileIcon).toBeInTheDocument();
    expect(fileIcon).toHaveAttribute('src', '/file.svg');
    
    const windowIcon = screen.getByAltText('Window icon');
    expect(windowIcon).toBeInTheDocument();
    expect(windowIcon).toHaveAttribute('src', '/window.svg');
    
    const globeIcon = screen.getByAltText('Globe icon');
    expect(globeIcon).toBeInTheDocument();
    expect(globeIcon).toHaveAttribute('src', '/globe.svg');
  });

  it('should have proper semantic structure', () => {
    render(<Home />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have proper responsive layout classes', () => {
    const { container } = render(<Home />);
    
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('grid', 'grid-rows-[20px_1fr_20px]', 'min-h-screen');
  });

  it('should have proper link attributes for security', () => {
    render(<Home />);
    
    const externalLinks = screen.getAllByRole('link');
    const externalLinksWithTarget = externalLinks.filter(link => 
      link.getAttribute('target') === '_blank'
    );
    
    externalLinksWithTarget.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('should render code element with proper styling', () => {
    render(<Home />);
    
    const codeElement = screen.getByText('src/app/page.tsx');
    expect(codeElement.tagName).toBe('CODE');
    expect(codeElement).toHaveClass('bg-black/[.05]', 'dark:bg-white/[.06]');
  });

  it('should render ordered list with instructions', () => {
    render(<Home />);
    
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(list).toHaveClass('list-inside', 'list-decimal');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});
