import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import type { CTASection as CTASectionType } from '@/types/contentful';

// CTA Section variants
const ctaSectionVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50',
        primary: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        secondary: 'bg-gradient-to-br from-secondary-500 to-secondary-700 text-white',
        dark: 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white',
        image: 'bg-cover bg-center bg-no-repeat',
        transparent: 'bg-transparent',
      },
      size: {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-20',
        lg: 'py-20 md:py-24',
        xl: 'py-24 md:py-32',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      alignment: 'center',
    },
  }
);

export interface CTASectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof ctaSectionVariants> {
  headline: string;
  description?: string;
  primaryCta: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: boolean;
  pattern?: boolean;
}

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  ({ 
    className,
    variant,
    size,
    alignment,
    headline,
    description,
    primaryCta,
    secondaryCta,
    backgroundImage,
    backgroundColor,
    overlay = false,
    pattern = false,
    style,
    ...props 
  }, ref) => {
    const sectionStyle = {
      ...style,
      ...(backgroundImage && { backgroundImage: `url(${backgroundImage})` }),
      ...(backgroundColor && { backgroundColor }),
    };

    const isDarkVariant = variant === 'primary' || variant === 'secondary' || variant === 'dark' || (backgroundImage && overlay);

    return (
      <section
        ref={ref}
        className={cn(
          ctaSectionVariants({ 
            variant: backgroundImage ? 'image' : variant, 
            size, 
            alignment 
          }), 
          className
        )}
        style={sectionStyle}
        {...props}
      >
        {/* Background Pattern */}
        {pattern && (
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="cta-pattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>
        )}

        {/* Overlay for background images */}
        {backgroundImage && overlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}

        <Container size="xl" padding="md" className="relative z-10">
          <div className={cn(
            'max-w-4xl',
            alignment === 'center' && 'mx-auto',
            alignment === 'right' && 'ml-auto'
          )}>
            {/* Headline */}
            <h2 className={cn(
              'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
              isDarkVariant ? 'text-white' : 'text-neutral-900'
            )}>
              {headline}
            </h2>

            {/* Description */}
            {description && (
              <p className={cn(
                'mt-6 text-lg leading-8 sm:text-xl',
                isDarkVariant ? 'text-white/90' : 'text-neutral-600'
              )}>
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className={cn(
              'mt-10 flex gap-4',
              alignment === 'center' && 'justify-center',
              alignment === 'right' && 'justify-end',
              'flex-col sm:flex-row'
            )}>
              <Button
                size="lg"
                variant={primaryCta.variant || (isDarkVariant ? 'secondary' : 'primary')}
                onClick={primaryCta.onClick}
                className="min-w-[200px]"
              >
                {primaryCta.text}
              </Button>
              
              {secondaryCta && (
                <Button
                  size="lg"
                  variant={secondaryCta.variant || 'outline'}
                  onClick={secondaryCta.onClick}
                  className={cn(
                    'min-w-[200px]',
                    isDarkVariant && secondaryCta.variant === 'outline' && 'border-white text-white hover:bg-white hover:text-neutral-900'
                  )}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }
);

CTASection.displayName = 'CTASection';

// CTA Section component specifically for Contentful data
export interface ContentfulCTASectionProps {
  data: CTASectionType;
  className?: string;
  overlay?: boolean;
  pattern?: boolean;
}

const ContentfulCTASection: React.FC<ContentfulCTASectionProps> = ({ 
  data, 
  className,
  overlay = true,
  pattern = false
}) => {
  return (
    <CTASection
      headline={data.headline}
      description={data.description}
      primaryCta={{
        text: data.primaryCtaText,
        href: data.primaryCtaLink,
      }}
      secondaryCta={data.secondaryCtaText ? {
        text: data.secondaryCtaText,
        href: data.secondaryCtaLink,
      } : undefined}
      backgroundImage={data.backgroundImage?.fields?.file?.url}
      backgroundColor={data.backgroundColor}
      overlay={overlay}
      pattern={pattern}
      className={className}
    />
  );
};

export { CTASection, ContentfulCTASection, ctaSectionVariants };
