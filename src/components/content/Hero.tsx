import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import type { HeroSection } from '@/types/contentful';

// Hero variants using class-variance-authority
const heroVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-primary-50 to-primary-100',
        primary: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
        secondary: 'bg-gradient-to-br from-secondary-50 to-secondary-100',
        dark: 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white',
        image: 'bg-cover bg-center bg-no-repeat',
      },
      size: {
        sm: 'py-12 md:py-16',
        md: 'py-16 md:py-24',
        lg: 'py-24 md:py-32',
        xl: 'py-32 md:py-40',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      alignment: 'left',
    },
  }
);

export interface HeroProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {
  headline: string;
  subtext?: string;
  primaryCta?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ 
    className,
    variant,
    size,
    alignment,
    headline,
    subtext,
    primaryCta,
    secondaryCta,
    backgroundImage,
    overlay = false,
    children,
    style,
    ...props 
  }, ref) => {
    const heroStyle = backgroundImage 
      ? { ...style, backgroundImage: `url(${backgroundImage})` }
      : style;

    return (
      <section
        ref={ref}
        className={cn(heroVariants({ variant: backgroundImage ? 'image' : variant, size, alignment }), className)}
        style={heroStyle}
        {...props}
      >
        {/* Overlay for background images */}
        {backgroundImage && overlay && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        <Container size="xl" padding="md" className="relative z-10">
          <div className={cn(
            'max-w-4xl',
            alignment === 'center' && 'mx-auto',
            alignment === 'right' && 'ml-auto'
          )}>
            {/* Headline */}
            <h1 className={cn(
              'text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl',
              variant === 'primary' || variant === 'dark' || (backgroundImage && overlay) 
                ? 'text-white' 
                : 'text-neutral-900'
            )}>
              {headline}
            </h1>

            {/* Subtext */}
            {subtext && (
              <p className={cn(
                'mt-6 text-lg leading-8 sm:text-xl',
                variant === 'primary' || variant === 'dark' || (backgroundImage && overlay)
                  ? 'text-white/90'
                  : 'text-neutral-600'
              )}>
                {subtext}
              </p>
            )}

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <div className={cn(
                'mt-10 flex gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'right' && 'justify-end',
                'flex-col sm:flex-row'
              )}>
                {primaryCta && (
                  <Button
                    size="lg"
                    variant={variant === 'primary' || variant === 'dark' || (backgroundImage && overlay) ? 'secondary' : 'primary'}
                    onClick={primaryCta.onClick}
                    className="min-w-[200px]"
                  >
                    {primaryCta.text}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={secondaryCta.onClick}
                    className="min-w-[200px]"
                  >
                    {secondaryCta.text}
                  </Button>
                )}
              </div>
            )}

            {/* Custom children content */}
            {children && (
              <div className="mt-10">
                {children}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

// Hero component specifically for Contentful data
export interface ContentfulHeroProps {
  data: HeroSection;
  className?: string;
  overlay?: boolean;
}

const ContentfulHero: React.FC<ContentfulHeroProps> = ({ 
  data, 
  className,
  overlay = true 
}) => {
  return (
    <Hero
      headline={data.headline}
      subtext={data.subtext}
      primaryCta={{
        text: data.ctaText,
        href: data.ctaLink,
      }}
      backgroundImage={data.backgroundImage?.fields?.file?.url}
      alignment={data.alignment}
      variant={data.ctaType === 'primary' ? 'primary' : 'default'}
      overlay={overlay}
      className={className}
    />
  );
};

export { Hero, ContentfulHero, heroVariants };
