import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Grid } from '@/components/layout/Grid';
import { Container } from '@/components/layout/Container';
import type { Feature } from '@/types/contentful';

// Feature Cards variants
const featureCardsVariants = cva(
  'py-16 md:py-24',
  {
    variants: {
      variant: {
        default: 'bg-white',
        gray: 'bg-neutral-50',
        primary: 'bg-primary-50',
        gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Individual Feature Card variants
const featureCardVariants = cva(
  'group transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'hover:shadow-md',
        elevated: 'shadow-sm hover:shadow-lg',
        interactive: 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        bordered: 'border-2 border-transparent hover:border-primary-200',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface FeatureCardData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  link?: string;
  linkText?: string;
  onClick?: () => void;
}

export interface FeatureCardsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof featureCardsVariants> {
  title?: string;
  subtitle?: string;
  description?: string;
  features: FeatureCardData[];
  columns?: 1 | 2 | 3 | 4;
  cardVariant?: VariantProps<typeof featureCardVariants>['variant'];
  cardSize?: VariantProps<typeof featureCardVariants>['size'];
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

const FeatureCards = React.forwardRef<HTMLElement, FeatureCardsProps>(
  ({ 
    className,
    variant,
    title,
    subtitle,
    description,
    features,
    columns = 3,
    cardVariant = 'default',
    cardSize = 'md',
    showCta = false,
    ctaText = 'Learn More',
    ctaHref,
    onCtaClick,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(featureCardsVariants({ variant }), className)}
        {...props}
      >
        <Container size="xl" padding="md">
          {/* Section Header */}
          {(title || subtitle || description) && (
            <div className="text-center mb-16">
              {subtitle && (
                <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Feature Cards Grid */}
          <Grid cols={columns} gap="lg" className="mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={cn(featureCardVariants({ variant: cardVariant, size: cardSize }))}
                onClick={feature.onClick}
              >
                <CardHeader className="text-center">
                  {/* Icon or Image */}
                  {feature.icon && (
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                      {feature.icon}
                    </div>
                  )}
                  {feature.image && !feature.icon && (
                    <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-neutral-100 bg-cover bg-center" 
                         style={{ backgroundImage: `url(${feature.image})` }} />
                  )}
                  
                  <CardTitle className="text-xl font-semibold text-neutral-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center">
                  <CardDescription className="text-neutral-600 mb-4">
                    {feature.description}
                  </CardDescription>
                  
                  {feature.link && feature.linkText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-600 hover:text-primary-700"
                      onClick={feature.onClick}
                    >
                      {feature.linkText}
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Section CTA */}
          {showCta && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="min-w-[200px]"
              >
                {ctaText}
              </Button>
            </div>
          )}
        </Container>
      </section>
    );
  }
);

FeatureCards.displayName = 'FeatureCards';

// Feature Cards component specifically for Contentful data
export interface ContentfulFeatureCardsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  variant?: VariantProps<typeof featureCardsVariants>['variant'];
}

const ContentfulFeatureCards: React.FC<ContentfulFeatureCardsProps> = ({ 
  title,
  subtitle,
  description,
  features,
  className,
  columns = 3,
  variant = 'default'
}) => {
  const featureData: FeatureCardData[] = features.map(feature => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon ? (
      <img 
        src={feature.icon.fields?.file?.url} 
        alt={feature.icon.fields?.title || feature.title}
        className="h-6 w-6"
      />
    ) : undefined,
    link: feature.link,
    linkText: feature.linkText,
  }));

  return (
    <FeatureCards
      title={title}
      subtitle={subtitle}
      description={description}
      features={featureData}
      columns={columns}
      variant={variant}
      className={className}
    />
  );
};

export { FeatureCards, ContentfulFeatureCards, featureCardsVariants, featureCardVariants };
