import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';

export const metadata: Metadata = {
  title: 'Products - Financial Solutions | Navi',
  description: 'Explore Navi\'s comprehensive range of financial products including personal loans, UPI payments, insurance, and mutual funds.',
  keywords: 'Navi products, personal loans, UPI, insurance, mutual funds, financial services',
};

export default function ProductsPage() {
  const heroData = {
    headline: "Financial Solutions for Every Need",
    title: "Explore Our Products",
    subtitle: "Comprehensive financial solutions designed for modern India",
    description: "From instant loans to seamless payments, insurance to investments - discover products that simplify your financial journey.",
    primaryCta: {
      text: "Explore Products",
      href: "/products"
    },
    secondaryCta: {
      text: "Get Started",
      href: "/apply"
    }
  };

  const products = [
    {
      title: "Cash Loans",
      description: "Instant personal loans up to ₹20 lakhs with competitive rates and quick approval",
      icon: "💰",
      href: "/products/cash-loan"
    },
    {
      title: "UPI Payments",
      description: "Fast, secure, and seamless digital payments for all your transactions",
      icon: "📱",
      href: "/products/upi"
    },
    {
      title: "Insurance",
      description: "Comprehensive insurance solutions to protect what matters most",
      icon: "🛡️",
      href: "/products/insurance"
    },
    {
      title: "Mutual Funds",
      description: "Smart investment options to grow your wealth with expert guidance",
      icon: "📈",
      href: "/products/mutual-funds"
    }
  ];

  const ctaData = {
    headline: "Ready to Get Started?",
    description: "Choose the financial product that best suits your needs and start your journey with Navi.",
    primaryCta: {
      text: "Explore Products",
      href: "/products"
    },
    secondaryCta: {
      text: "Contact Us",
      href: "/contact"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <section id="products" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Product Suite
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of financial products designed to meet your diverse needs and help you achieve your goals.
            </p>
          </div>
          
          <FeatureCards features={products} />
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Navi?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the difference with our customer-first approach and innovative financial solutions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Quick approvals and instant processing for all your financial needs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Safe</h3>
                <p className="text-gray-600">Bank-grade security and compliance with all regulatory standards</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
                <p className="text-gray-600">Transparent pricing with no hidden charges and 24/7 support</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
