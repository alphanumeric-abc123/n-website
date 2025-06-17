import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';

export const metadata: Metadata = {
  title: 'Home Loan - Low Interest Rate Home Loans | Navi',
  description: 'Get home loans at competitive interest rates starting from 8.50% p.a. Quick approval, minimal documentation, and flexible repayment options.',
  keywords: 'home loan, housing loan, property loan, mortgage, Navi home loan, low interest rate',
};

export default function HomeLoanPage() {
  const heroData = {
    headline: "Home Loans Made Easy",
    title: "Your Dream Home Awaits",
    subtitle: "Home loans with competitive rates and quick approval",
    description: "Get home loans up to ₹5 crores at attractive interest rates starting from 8.50% p.a. with minimal documentation and flexible tenure options.",
    primaryCTA: {
      text: "Apply Now",
      href: "/apply/home-loan"
    },
    secondaryCTA: {
      text: "EMI Calculator",
      href: "/calculator/home-loan"
    },
    backgroundImage: "/images/hero-home-loan.jpg"
  };

  const features = [
    {
      title: "Attractive Interest Rates",
      description: "Starting from 8.50% p.a. with competitive rates for all customer segments",
      icon: "💰",
      href: "/rates/home-loan"
    },
    {
      title: "High Loan Amount",
      description: "Get home loans up to ₹5 crores for your dream property",
      icon: "🏠",
      href: "/features/loan-amount"
    },
    {
      title: "Quick Processing",
      description: "Fast approval and disbursal with minimal documentation",
      icon: "⚡",
      href: "/features/quick-processing"
    },
    {
      title: "Flexible Tenure",
      description: "Repayment tenure up to 30 years with prepayment options",
      icon: "📅",
      href: "/features/flexible-tenure"
    }
  ];

  const ctaData = {
    headline: "Ready to Buy Your Dream Home?",
    description: "Join thousands of homeowners who trusted Navi for their home loan journey.",
    primaryCta: {
      text: "Apply for Home Loan",
      href: "/apply/home-loan"
    },
    secondaryCta: {
      text: "Check Eligibility",
      href: "/eligibility/home-loan"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Navi Home Loans?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience hassle-free home loan processing with transparent terms, competitive rates, and dedicated support throughout your journey.
          </p>
        </div>
        
        <FeatureCards features={features} />
      </Container>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Home Loan Features & Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Loan Amount</span>
                  <span className="text-gray-900">₹5 lakhs - ₹5 crores</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Interest Rate</span>
                  <span className="text-gray-900">8.50% - 12% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Loan Tenure</span>
                  <span className="text-gray-900">Up to 30 years</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Processing Fee</span>
                  <span className="text-gray-900">0.50% of loan amount</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Loan-to-Value</span>
                  <span className="text-gray-900">Up to 90%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Prepayment</span>
                  <span className="text-gray-900">No charges after 2 years</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Age: 21-65 years (at loan maturity)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Minimum income: ₹40,000/month
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Work experience: 3+ years
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Credit score: 700+
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Property should be approved
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Special Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tax benefits under Section 80C & 24(b)</li>
                  <li>• Balance transfer facility available</li>
                  <li>• Top-up loan options</li>
                  <li>• Insurance coverage available</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Home Loans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of home loan products designed for different needs and property types.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Purchase Loan</h3>
              <p className="text-gray-600 mb-4">For buying ready-to-move or under-construction properties</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Up to 90% financing</li>
                <li>• Competitive interest rates</li>
                <li>• Quick approval process</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Construction Loan</h3>
              <p className="text-gray-600 mb-4">For constructing your home on owned land</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Stage-wise disbursement</li>
                <li>• Flexible repayment options</li>
                <li>• Technical evaluation support</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Balance Transfer</h3>
              <p className="text-gray-600 mb-4">Transfer your existing home loan for better rates</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lower interest rates</li>
                <li>• Top-up loan facility</li>
                <li>• Minimal documentation</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CTASection {...ctaData} />
    </main>
  );
}
