import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from './Container';

// Footer navigation structure based on PRD IA
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps {
  className?: string;
  navigation?: FooterSection[];
  socialLinks?: SocialLink[];
  legalLinks?: FooterLink[];
  companyInfo?: {
    name: string;
    description: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  complianceInfo?: {
    licenses?: string[];
    regulatoryBodies?: string[];
    disclaimer?: string;
  };
}

// Default navigation structure
const defaultNavigation: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { label: 'UPI', href: '/products/upi' },
      { label: 'Cash Loan', href: '/products/cash-loan' },
      { label: 'Home Loan', href: '/products/home-loan' },
      { label: 'Health Insurance', href: '/products/health-insurance' },
      { label: 'Mutual Funds', href: '/products/mutual-funds' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Why Navi', href: '/why-navi' },
      { label: 'Careers', href: '/careers' },
      { label: 'Governance', href: '/governance' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Calculators', href: '/resources/calculators' },
      { label: 'Guides', href: '/resources/guides' },
      { label: 'Tools', href: '/resources/tools' },
      { label: 'Help Center', href: '/help' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Grievance Redressal', href: '/grievance-redressal' },
      { label: 'Fair Practice Code', href: '/fair-practice-code' },
    ],
  },
];

// Default social links
const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/navi',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/navi',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/navi',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/navi',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.896.896 1.386 2.047 1.386 3.344s-.49 2.448-1.297 3.323c-.896.896-2.047 1.386-3.344 1.386zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.896-.896-1.386-2.047-1.386-3.344s.49-2.448 1.297-3.323c.896-.896 2.047-1.386 3.344-1.386s2.448.49 3.323 1.297c.896.896 1.386 2.047 1.386 3.344s-.49 2.448-1.297 3.323c-.896.896-2.047 1.386-3.344 1.386z" />
      </svg>
    ),
  },
];

// Default company info
const defaultCompanyInfo = {
  name: 'Navi',
  description: 'Making financial services simple, transparent, and accessible for everyone.',
  address: 'Navi Technologies Limited, Bangalore, India',
  email: 'support@navi.com',
};

// Default compliance info
const defaultComplianceInfo = {
  licenses: [
    'NBFC License: N-14.03268',
    'Insurance Broker License: IRDAI/DB797/19',
    'Investment Advisor: INA000015507',
  ],
  regulatoryBodies: ['RBI', 'IRDAI', 'SEBI'],
  disclaimer: 'Navi is a registered trademark. All financial products are subject to market risks. Please read all scheme related documents carefully.',
};

const Footer: React.FC<FooterProps> = ({
  className,
  navigation = defaultNavigation,
  socialLinks = defaultSocialLinks,
  companyInfo = defaultCompanyInfo,
  complianceInfo = defaultComplianceInfo,
}) => {
  return (
    <footer className={cn('bg-neutral-900 text-white', className)}>
      <Container size="xl" padding="md">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-bold">{companyInfo.name}</span>
              </div>
              <p className="text-neutral-300 mb-6 max-w-sm">
                {companyInfo.description}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            {navigation.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Section */}
        {complianceInfo && (
          <div className="border-t border-neutral-800 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Licenses */}
              {complianceInfo.licenses && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Licenses & Registrations
                  </h4>
                  <ul className="space-y-1">
                    {complianceInfo.licenses.map((license, index) => (
                      <li key={index} className="text-xs text-neutral-400">
                        {license}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Regulatory Bodies */}
              {complianceInfo.regulatoryBodies && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Regulated By
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {complianceInfo.regulatoryBodies.map((body, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-800 text-xs text-neutral-300 rounded"
                      >
                        {body}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            {complianceInfo.disclaimer && (
              <div className="mt-6">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {complianceInfo.disclaimer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-neutral-400">
                &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
              </p>
              {companyInfo.address && (
                <p className="text-xs text-neutral-500">
                  {companyInfo.address}
                </p>
              )}
            </div>
            
            {companyInfo.email && (
              <div className="text-sm text-neutral-400">
                <span>Support: </span>
                <Link
                  href={`mailto:${companyInfo.email}`}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {companyInfo.email}
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
