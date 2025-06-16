import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input, inputVariants } from '@/components/ui/Input';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-neutral-300');
      expect(input).toHaveClass('h-10');
    });

    it('should render with custom className', () => {
      render(<Input className="custom-input" placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveClass('custom-input');
    });

    it('should have default type as text', () => {
      render(<Input placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should accept custom type', () => {
      render(<Input type="email" placeholder="Email" />);
      const input = screen.getByPlaceholderText('Email');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Variants', () => {
    it('should apply default variant styles', () => {
      render(<Input variant="default" placeholder="Default" />);
      const input = screen.getByPlaceholderText('Default');
      expect(input).toHaveClass('border-neutral-300', 'focus-visible:border-primary-500');
    });

    it('should apply error variant styles', () => {
      render(<Input variant="error" placeholder="Error" />);
      const input = screen.getByPlaceholderText('Error');
      expect(input).toHaveClass('border-semantic-error-DEFAULT');
    });

    it('should apply success variant styles', () => {
      render(<Input variant="success" placeholder="Success" />);
      const input = screen.getByPlaceholderText('Success');
      expect(input).toHaveClass('border-semantic-success-DEFAULT');
    });

    it('should override variant to error when error prop is provided', () => {
      render(<Input variant="success" error="This is an error" placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveClass('border-semantic-error-DEFAULT');
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      render(<Input size="sm" placeholder="Small" />);
      const input = screen.getByPlaceholderText('Small');
      expect(input).toHaveClass('h-8', 'px-2', 'text-xs');
    });

    it('should apply medium size styles (default)', () => {
      render(<Input size="md" placeholder="Medium" />);
      const input = screen.getByPlaceholderText('Medium');
      expect(input).toHaveClass('h-10', 'px-3', 'text-sm');
    });

    it('should apply large size styles', () => {
      render(<Input size="lg" placeholder="Large" />);
      const input = screen.getByPlaceholderText('Large');
      expect(input).toHaveClass('h-12', 'px-4', 'text-base');
    });
  });

  describe('Label', () => {
    it('should render label when provided', () => {
      render(<Input label="Username" placeholder="Enter username" />);
      const label = screen.getByText('Username');
      const input = screen.getByPlaceholderText('Enter username');
      
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveClass('mb-2', 'block', 'text-sm', 'font-medium', 'text-neutral-700');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('should not render label when not provided', () => {
      render(<Input placeholder="No label" />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when error prop is provided', () => {
      render(<Input error="This field is required" placeholder="Test" />);
      const errorMessage = screen.getByText('This field is required');
      const input = screen.getByPlaceholderText('Test');
      
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('mt-1', 'text-sm', 'text-semantic-error-DEFAULT');
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', `${input.id}-error`);
    });

    it('should not display error message when error prop is not provided', () => {
      render(<Input placeholder="No error" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided', () => {
      render(<Input helperText="Enter your full name" placeholder="Name" />);
      const helperText = screen.getByText('Enter your full name');
      const input = screen.getByPlaceholderText('Name');
      
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('mt-1', 'text-sm', 'text-neutral-600');
      expect(input).toHaveAttribute('aria-describedby', `${input.id}-helper`);
    });

    it('should not display helper text when error is present', () => {
      render(<Input helperText="Helper text" error="Error message" placeholder="Test" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should not display helper text when not provided', () => {
      render(<Input placeholder="No helper" />);
      expect(screen.queryByText(/helper/i)).not.toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render left icon when provided', () => {
      render(<Input leftIcon={<span data-testid="left-icon">L</span>} placeholder="With left icon" />);
      const leftIcon = screen.getByTestId('left-icon');
      const input = screen.getByPlaceholderText('With left icon');
      
      expect(leftIcon).toBeInTheDocument();
      expect(input).toHaveClass('pl-10');
    });

    it('should render right icon when provided', () => {
      render(<Input rightIcon={<span data-testid="right-icon">R</span>} placeholder="With right icon" />);
      const rightIcon = screen.getByTestId('right-icon');
      const input = screen.getByPlaceholderText('With right icon');
      
      expect(rightIcon).toBeInTheDocument();
      expect(input).toHaveClass('pr-10');
    });

    it('should render both left and right icons', () => {
      render(
        <Input 
          leftIcon={<span data-testid="left-icon">L</span>}
          rightIcon={<span data-testid="right-icon">R</span>}
          placeholder="With both icons" 
        />
      );
      const leftIcon = screen.getByTestId('left-icon');
      const rightIcon = screen.getByTestId('right-icon');
      const input = screen.getByPlaceholderText('With both icons');
      
      expect(leftIcon).toBeInTheDocument();
      expect(rightIcon).toBeInTheDocument();
      expect(input).toHaveClass('pl-10', 'pr-10');
    });

    it('should not apply padding classes when icons are not provided', () => {
      render(<Input placeholder="No icons" />);
      const input = screen.getByPlaceholderText('No icons');
      expect(input).not.toHaveClass('pl-10', 'pr-10');
    });
  });

  describe('ID Generation', () => {
    it('should use provided id', () => {
      render(<Input id="custom-id" placeholder="Custom ID" />);
      const input = screen.getByPlaceholderText('Custom ID');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('should generate unique id when not provided', () => {
      render(<Input placeholder="Auto ID" />);
      const input = screen.getByPlaceholderText('Auto ID');
      expect(input.id).toMatch(/^input-[a-z0-9]+$/);
    });

    it('should generate different ids for multiple inputs', () => {
      render(
        <>
          <Input placeholder="Input 1" />
          <Input placeholder="Input 2" />
        </>
      );
      const input1 = screen.getByPlaceholderText('Input 1');
      const input2 = screen.getByPlaceholderText('Input 2');
      expect(input1.id).not.toBe(input2.id);
    });
  });

  describe('Event Handling', () => {
    it('should handle onChange events', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      
      fireEvent.change(input, { target: { value: 'test value' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should handle onFocus events', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should handle onBlur events', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes when error is present', () => {
      render(<Input error="Error message" placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', `${input.id}-error`);
    });

    it('should have proper ARIA attributes when helper text is present', () => {
      render(<Input helperText="Helper text" placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveAttribute('aria-describedby', `${input.id}-helper`);
    });

    it('should not have aria-describedby when no error or helper text', () => {
      render(<Input placeholder="Test" />);
      const input = screen.getByPlaceholderText('Test');
      expect(input).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('Complete Input with All Features', () => {
    it('should render complete input with all features', () => {
      render(
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          helperText="We'll never share your email"
          leftIcon={<span data-testid="email-icon">@</span>}
          rightIcon={<span data-testid="check-icon">✓</span>}
        />
      );

      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toHaveAttribute('type', 'email');
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
      expect(screen.getByTestId('email-icon')).toBeInTheDocument();
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Input with ref" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Input Variants Function', () => {
    it('should generate correct classes for default variants', () => {
      const classes = inputVariants();
      expect(classes).toContain('border-neutral-300');
      expect(classes).toContain('h-10');
    });

    it('should generate correct classes for custom variants', () => {
      const classes = inputVariants({ variant: 'error', size: 'lg' });
      expect(classes).toContain('border-semantic-error-DEFAULT');
      expect(classes).toContain('h-12');
    });
  });
});
