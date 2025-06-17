'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from './Container';

// Navigation item interface
interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

// Header component props
export interface HeaderProps {
  navigation?: NavigationItem[];
  className?: string;
  sticky?: boolean;
}

// Default navigation structure based on PRD IA
const defaultNavigation: NavigationItem[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'UPI', href: '/products/upi' },
      { label: 'Cash Loan', href: '/products/cash-loan' },
      { label: 'Home Loan', href: '/products/home-loan' },
      { label: 'Health Insurance', href: '/products/health-insurance' },
      { label: 'Mutual Funds', href: '/products/mutual-funds' },
    ],
  },
  { label: 'Why Navi', href: '/why-navi' },
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Calculators', href: '/resources/calculators' },
      { label: 'Guides', href: '/resources/guides' },
      { label: 'Tools', href: '/resources/tools' },
    ],
  },
  { label: 'Careers', href: '/careers' },
];

const Header: React.FC<HeaderProps & React.HTMLAttributes<HTMLElement>> = ({
  navigation = defaultNavigation,
  className,
  sticky = true,
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'bg-white border-b border-neutral-200 z-50',
        sticky && 'sticky top-0',
        className
      )}
      {...props}
    >
      <Container size="xl" padding="md">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">Navi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className="ml-1 h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm">
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 mt-4">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-3 border-t border-neutral-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Button variant="ghost" size="sm" fullWidth>
                    Login
                  </Button>
                  <Button size="sm" fullWidth>
                    Download App
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export { Header };
