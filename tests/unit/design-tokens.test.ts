/**
 * Unit tests for src/styles/design-tokens.ts
 * Tests design system tokens and theme configuration
 */

import {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  breakpoints,
  animation,
  components,
  theme,
  type Theme,
  type Colors,
  type Typography,
  type Spacing
} from '@/styles/design-tokens';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('should export primary color palette', () => {
      expect(colors.primary).toBeDefined();
      expect(colors.primary[500]).toBe('#3b82f6'); // Main Navi Blue
      expect(colors.primary[50]).toBe('#eff6ff');
      expect(colors.primary[950]).toBe('#172554');
    });

    it('should export secondary color palette', () => {
      expect(colors.secondary).toBeDefined();
      expect(colors.secondary[500]).toBe('#22c55e'); // Success Green
      expect(colors.secondary[50]).toBe('#f0fdf4');
      expect(colors.secondary[950]).toBe('#052e16');
    });

    it('should export neutral color palette', () => {
      expect(colors.neutral).toBeDefined();
      expect(colors.neutral[0]).toBe('#ffffff');
      expect(colors.neutral[500]).toBe('#6b7280');
      expect(colors.neutral[950]).toBe('#030712');
    });

    it('should export semantic colors', () => {
      expect(colors.semantic).toBeDefined();
      expect(colors.semantic.success.DEFAULT).toBe('#10b981');
      expect(colors.semantic.warning.DEFAULT).toBe('#f59e0b');
      expect(colors.semantic.error.DEFAULT).toBe('#ef4444');
      expect(colors.semantic.info.DEFAULT).toBe('#3b82f6');
    });

    it('should export product-specific colors', () => {
      expect(colors.product).toBeDefined();
      expect(colors.product.upi).toBe('#6366f1'); // Indigo
      expect(colors.product.loan).toBe('#f59e0b'); // Amber
      expect(colors.product.insurance).toBe('#10b981'); // Emerald
      expect(colors.product.mutualFunds).toBe('#8b5cf6'); // Violet
    });

    it('should have consistent color structure', () => {
      // Primary and secondary should have full scale (50-950)
      const expectedShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
      expectedShades.forEach(shade => {
        expect(colors.primary[shade]).toBeDefined();
        expect(colors.secondary[shade]).toBeDefined();
      });

      // Semantic colors should have light, DEFAULT, dark variants
      Object.values(colors.semantic).forEach(colorGroup => {
        expect(colorGroup.light).toBeDefined();
        expect(colorGroup.DEFAULT).toBeDefined();
        expect(colorGroup.dark).toBeDefined();
      });
    });
  });

  describe('Typography', () => {
    it('should export font families', () => {
      expect(typography.fontFamily).toBeDefined();
      expect(typography.fontFamily.sans).toEqual(['Inter', 'system-ui', 'sans-serif']);
      expect(typography.fontFamily.mono).toEqual(['JetBrains Mono', 'Consolas', 'monospace']);
    });

    it('should export font sizes with line heights', () => {
      expect(typography.fontSize).toBeDefined();
      expect(typography.fontSize.xs).toEqual(['0.75rem', { lineHeight: '1rem' }]);
      expect(typography.fontSize.base).toEqual(['1rem', { lineHeight: '1.5rem' }]);
      expect(typography.fontSize['9xl']).toEqual(['8rem', { lineHeight: '1' }]);
    });

    it('should export font weights', () => {
      expect(typography.fontWeight).toBeDefined();
      expect(typography.fontWeight.thin).toBe('100');
      expect(typography.fontWeight.normal).toBe('400');
      expect(typography.fontWeight.bold).toBe('700');
      expect(typography.fontWeight.black).toBe('900');
    });

    it('should export letter spacing values', () => {
      expect(typography.letterSpacing).toBeDefined();
      expect(typography.letterSpacing.tighter).toBe('-0.05em');
      expect(typography.letterSpacing.normal).toBe('0em');
      expect(typography.letterSpacing.widest).toBe('0.1em');
    });

    it('should export line height values', () => {
      expect(typography.lineHeight).toBeDefined();
      expect(typography.lineHeight.none).toBe('1');
      expect(typography.lineHeight.normal).toBe('1.5');
      expect(typography.lineHeight.loose).toBe('2');
    });
  });

  describe('Spacing', () => {
    it('should export spacing scale', () => {
      expect(spacing).toBeDefined();
      expect(spacing[0]).toBe('0px');
      expect(spacing[1]).toBe('0.25rem'); // 4px
      expect(spacing[4]).toBe('1rem'); // 16px
      expect(spacing[64]).toBe('16rem'); // 256px
    });

    it('should have consistent rem-based spacing', () => {
      // All non-zero spacing values should be in rem
      Object.entries(spacing).forEach(([key, value]) => {
        if (key !== '0') {
          expect(value).toMatch(/^\d+(\.\d+)?rem$/);
        }
      });
    });
  });

  describe('Border Radius', () => {
    it('should export border radius values', () => {
      expect(borderRadius).toBeDefined();
      expect(borderRadius.none).toBe('0px');
      expect(borderRadius.DEFAULT).toBe('0.25rem'); // 4px
      expect(borderRadius.full).toBe('9999px');
    });

    it('should have consistent rem-based values', () => {
      Object.entries(borderRadius).forEach(([key, value]) => {
        if (key !== 'none' && key !== 'full') {
          expect(value).toMatch(/^\d+(\.\d+)?rem$/);
        }
      });
    });
  });

  describe('Box Shadow', () => {
    it('should export shadow values', () => {
      expect(boxShadow).toBeDefined();
      expect(boxShadow.none).toBe('0 0 #0000');
      expect(boxShadow.sm).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)');
      expect(boxShadow.DEFAULT).toBeDefined();
      expect(boxShadow['2xl']).toBeDefined();
    });

    it('should have proper shadow syntax', () => {
      Object.entries(boxShadow).forEach(([key, value]) => {
        if (key !== 'none') {
          // Should contain rgb or rgba color values
          expect(value).toMatch(/rgb\(/);
        }
      });
    });
  });

  describe('Breakpoints', () => {
    it('should export responsive breakpoints', () => {
      expect(breakpoints).toBeDefined();
      expect(breakpoints.sm).toBe('640px');   // Mobile landscape
      expect(breakpoints.md).toBe('768px');   // Tablet
      expect(breakpoints.lg).toBe('1024px');  // Desktop
      expect(breakpoints.xl).toBe('1280px');  // Large desktop
      expect(breakpoints['2xl']).toBe('1536px'); // Extra large desktop
    });

    it('should have ascending breakpoint values', () => {
      const values = [
        parseInt(breakpoints.sm),
        parseInt(breakpoints.md),
        parseInt(breakpoints.lg),
        parseInt(breakpoints.xl),
        parseInt(breakpoints['2xl'])
      ];

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe('Animation', () => {
    it('should export animation durations', () => {
      expect(animation.duration).toBeDefined();
      expect(animation.duration[75]).toBe('75ms');
      expect(animation.duration[300]).toBe('300ms');
      expect(animation.duration[1000]).toBe('1000ms');
    });

    it('should export easing functions', () => {
      expect(animation.easing).toBeDefined();
      expect(animation.easing.linear).toBe('linear');
      expect(animation.easing.in).toBe('cubic-bezier(0.4, 0, 1, 1)');
      expect(animation.easing.out).toBe('cubic-bezier(0, 0, 0.2, 1)');
      expect(animation.easing.inOut).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
    });

    it('should have valid duration values', () => {
      Object.values(animation.duration).forEach(duration => {
        expect(duration).toMatch(/^\d+ms$/);
      });
    });
  });

  describe('Components', () => {
    it('should export button component tokens', () => {
      expect(components.button).toBeDefined();
      expect(components.button.height.sm).toBe('2rem');
      expect(components.button.height.lg).toBe('3rem');
      expect(components.button.padding.sm).toBe('0.5rem 0.75rem');
      expect(components.button.padding.xl).toBe('1rem 2rem');
    });

    it('should export input component tokens', () => {
      expect(components.input).toBeDefined();
      expect(components.input.height.md).toBe('2.5rem');
      expect(components.input.padding.md).toBe('0.75rem');
    });

    it('should export card component tokens', () => {
      expect(components.card).toBeDefined();
      expect(components.card.padding.sm).toBe('1rem');
      expect(components.card.padding.lg).toBe('2rem');
    });

    it('should have consistent component sizing', () => {
      // Button heights should be in ascending order
      const buttonHeights = Object.values(components.button.height).map(h => parseFloat(h));
      for (let i = 1; i < buttonHeights.length; i++) {
        expect(buttonHeights[i]).toBeGreaterThan(buttonHeights[i - 1]);
      }
    });
  });

  describe('Theme Configuration', () => {
    it('should export complete theme object', () => {
      expect(theme).toBeDefined();
      expect(theme.colors).toBe(colors);
      expect(theme.typography).toBe(typography);
      expect(theme.spacing).toBe(spacing);
      expect(theme.borderRadius).toBe(borderRadius);
      expect(theme.boxShadow).toBe(boxShadow);
      expect(theme.breakpoints).toBe(breakpoints);
      expect(theme.animation).toBe(animation);
      expect(theme.components).toBe(components);
    });

    it('should have all required theme properties', () => {
      const requiredProperties = [
        'colors',
        'typography',
        'spacing',
        'borderRadius',
        'boxShadow',
        'breakpoints',
        'animation',
        'components'
      ];

      requiredProperties.forEach(prop => {
        expect(theme).toHaveProperty(prop);
      });
    });
  });

  describe('TypeScript Types', () => {
    it('should export proper TypeScript types', () => {
      // These tests verify that the types are properly exported
      // The actual type checking is done at compile time
      expect(typeof theme).toBe('object');
      expect(typeof colors).toBe('object');
      expect(typeof typography).toBe('object');
      expect(typeof spacing).toBe('object');
    });
  });

  describe('Design System Consistency', () => {
    it('should use consistent color naming', () => {
      // Primary and secondary colors should follow same naming pattern
      const primaryKeys = Object.keys(colors.primary);
      const secondaryKeys = Object.keys(colors.secondary);
      expect(primaryKeys).toEqual(secondaryKeys);
    });

    it('should have semantic color consistency', () => {
      // All semantic colors should have same structure
      const semanticKeys = Object.keys(colors.semantic.success);
      Object.values(colors.semantic).forEach(colorGroup => {
        expect(Object.keys(colorGroup)).toEqual(semanticKeys);
      });
    });

    it('should have component size consistency', () => {
      // Components should have consistent size naming (sm, md, lg, xl)
      const buttonSizes = Object.keys(components.button.height);
      const inputSizes = Object.keys(components.input.height);
      
      // Input should have subset of button sizes
      inputSizes.forEach(size => {
        expect(buttonSizes).toContain(size);
      });
    });

    it('should use Navi brand colors correctly', () => {
      // Verify Navi-specific brand colors are properly defined
      expect(colors.primary[500]).toBe('#3b82f6'); // Main Navi Blue
      expect(colors.secondary[500]).toBe('#22c55e'); // Success Green
      
      // Product colors should be distinct
      const productColors = Object.values(colors.product);
      const uniqueColors = new Set(productColors);
      expect(uniqueColors.size).toBe(productColors.length);
    });

    it('should support financial product theming', () => {
      // Verify all required financial products have colors
      const requiredProducts = ['upi', 'loan', 'insurance', 'mutualFunds'];
      requiredProducts.forEach(product => {
        expect(colors.product).toHaveProperty(product);
        expect(colors.product[product as keyof typeof colors.product]).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe('Accessibility Considerations', () => {
    it('should have sufficient color contrast ratios', () => {
      // Basic check that we have light and dark variants for semantic colors
      Object.values(colors.semantic).forEach(colorGroup => {
        expect(colorGroup.light).toBeDefined();
        expect(colorGroup.dark).toBeDefined();
        expect(colorGroup.light).not.toBe(colorGroup.dark);
      });
    });

    it('should have appropriate component sizes for touch targets', () => {
      // Button heights should meet minimum touch target size (44px recommended)
      const buttonHeights = Object.values(components.button.height);
      const minTouchTarget = 2.75; // 44px in rem (44/16)
      
      // At least the large button should meet touch target requirements
      const largeButtonHeight = parseFloat(components.button.height.lg);
      expect(largeButtonHeight).toBeGreaterThanOrEqual(minTouchTarget);
    });

    it('should have readable font sizes', () => {
      // Base font size should be at least 1rem (16px)
      const baseFontSize = parseFloat(typography.fontSize.base[0]);
      expect(baseFontSize).toBeGreaterThanOrEqual(1);
      
      // Small font size should not be too small
      const smallFontSize = parseFloat(typography.fontSize.sm[0]);
      expect(smallFontSize).toBeGreaterThanOrEqual(0.875); // 14px minimum
    });
  });
});
