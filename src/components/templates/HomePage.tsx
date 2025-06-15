import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';
import { Container } from '@/components/layout/Container';
import { Grid, GridItem } from '@/components/layout/Grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { HomePage as HomePageType } from '@/types/contentful';

// Trust indicators component
interface TrustIndicatorProps {
  metric: string;
  value: string;
  description: string;
}

const TrustIndicator: React.FC<TrustIndicatorProps> = ({ metric, value, description }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-primary-600 mb-2">{value}</div>
    <div className="text-sm font-semibold text-neutral-900 mb-1">{metric}</div>
    <div className="text-xs text-neutral-600">{description}</div>
  </div>
);

// Product overview card component
interface ProductOverviewCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
  features?: string[];
}

const ProductOverviewCard: React.FC<ProductOverviewCardProps> = ({
  title,
  description,
  icon,
  href,
  features = []
}) => (
  <Card variant="interactive" className="h-full">
    <CardHeader className="text-center">
      {icon && (
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
          {icon}
        </div>
      )}
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <CardDescription className="text-neutral-600">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-neutral-600">
              <svg className="mr-2 h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <Button variant="outline" size="sm" className="w-full">
        Learn More
      </Button>
    </CardContent>
  </Card>
);

// Homepage template props
export interface HomePageTemplateProps {
  data?: HomePageType;
  className?: string;
}

const HomePageTemplate: React.FC<HomePageTemplateProps> = ({ data, className }) => {
  // Default data for development/preview
  const defaultData = {
    title: 'Navi - Simple, Transparent Financial Services',
    heroHeadline: 'Financial Services Made Simple',
    heroSubtext: 'Get instant loans, comprehensive insurance, and smart investments - all in one app. Experience banking that works for you.',
    heroCtaText: 'Download App',
    heroCtaLink: '#download',
    productOverview: [],
    trustIndicators: [],
    ctaSection: null,
    seoTitle: 'Navi - Loans, Insurance & Investments | Download App',
    seoDescription: 'Get instant personal loans, comprehensive health insurance, and smart mutual fund investments with Navi. Simple, transparent, and digital-first financial services.',
    seoKeywords: 'personal loans, health insurance, mutual funds, UPI payments, financial services',
    publishedAt: new Date().toISOString(),
  };

  const pageData = data || defaultData;

  // Sample product data
  const productData = [
    {
      title: 'UPI Payments',
      description: 'Send money instantly with zero charges',
      href: '/products/upi',
      features: ['Zero transaction fees', 'Instant transfers', '24/7 availability'],
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
    {
      title: 'Personal Loans',
      description: 'Get instant loans up to ₹20 lakhs',
      href: '/products/cash-loan',
      features: ['Instant approval', 'Competitive rates', 'Flexible tenure'],
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for your family',
      href: '/products/health-insurance',
      features: ['Cashless treatment', 'No waiting period', 'Family coverage'],
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Mutual Funds',
      description: 'Smart investments with expert guidance',
      href: '/products/mutual-funds',
      features: ['Zero commission', 'Expert advice', 'SIP starting ₹100'],
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  // Sample trust indicators
  const trustData = [
    { metric: 'Happy Customers', value: '10M+', description: 'Trust Navi for their financial needs' },
    { metric: 'Loans Disbursed', value: '₹50,000Cr+', description: 'In total loan amount' },
    { metric: 'App Rating', value: '4.6★', description: 'Average rating on app stores' },
    { metric: 'Processing Time', value: '3 mins', description: 'Average loan approval time' },
  ];

  return (
    <div className={className}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero
        headline={pageData.heroHeadline}
        subtext={pageData.heroSubtext}
        primaryCta={{
          text: pageData.heroCtaText,
          href: pageData.heroCtaLink,
        }}
        secondaryCta={{
          text: 'Learn More',
          href: '/why-navi',
        }}
        variant="primary"
        size="xl"
        alignment="center"
      />

      {/* Trust Indicators */}
      <section className="py-16 bg-neutral-50">
        <Container size="xl" padding="md">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Trusted by Millions
            </h2>
            <p className="text-lg text-neutral-600">
              Join millions of Indians who trust Navi for their financial needs
            </p>
          </div>
          <Grid cols={4} gap="lg">
            {trustData.map((indicator, index) => (
              <GridItem key={index}>
                <TrustIndicator {...indicator} />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Product Overview */}
      <section className="py-24 bg-white">
        <Container size="xl" padding="md">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
              Our Products
            </p>
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl mb-4">
              Everything You Need in One App
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From instant payments to long-term investments, Navi offers a complete suite of financial services designed for the modern Indian consumer.
            </p>
          </div>
          
          <Grid cols={4} gap="lg" className="mb-12">
            {productData.map((product, index) => (
              <GridItem key={index}>
                <ProductOverviewCard {...product} />
              </GridItem>
            ))}
          </Grid>

          <div className="text-center">
            <Button size="lg" className="min-w-[200px]">
              Explore All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <FeatureCards
        variant="gray"
        title="Why Choose Navi?"
        subtitle="Our Promise"
        description="We're committed to making financial services simple, transparent, and accessible for everyone."
        features={[
          {
            title: 'Instant Approvals',
            description: 'Get loan approvals in minutes, not days. Our AI-powered system ensures quick decisions.',
            icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
          },
          {
            title: 'Zero Hidden Charges',
            description: 'Complete transparency in pricing. What you see is what you pay, with no surprises.',
            icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            title: 'Digital First',
            description: 'Everything from application to disbursement happens digitally. No paperwork, no branch visits.',
            icon: (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ),
          },
        ]}
        columns={3}
      />

      {/* CTA Section */}
      <CTASection
        headline="Ready to Experience Better Banking?"
        description="Join millions of satisfied customers who have made the switch to Navi. Download our app today and discover the future of financial services."
        primaryCta={{
          text: 'Download App',
          href: '#download',
        }}
        secondaryCta={{
          text: 'Learn More',
          href: '/why-navi',
        }}
        variant="primary"
        size="lg"
        pattern={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export { HomePageTemplate };
