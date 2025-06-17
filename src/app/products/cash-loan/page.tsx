import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';

export const metadata: Metadata = {
  title: 'Cash Loan - Quick Personal Loans | Navi',
  description: 'Get instant cash loans with competitive interest rates. Apply online for personal loans up to ₹20 lakhs with minimal documentation.',
  keywords: 'cash loan, personal loan, instant loan, quick loan, Navi loan',
};

export default function CashLoanPage() {
  const heroData = {
    headline: "Quick Cash When You Need It",
    title: "Instant Cash Loans",
    subtitle: "Quick personal loans with competitive rates and minimal paperwork",
    description: "Apply for personal loans up to ₹20 lakhs with instant approval and flexible repayment options.",
    primaryCta: {
      text: "Apply Now",
      href: "/apply/cash-loan"
    },
    secondaryCta: {
      text: "Calculate EMI",
      href: "/calculator/loan"
    },
    backgroundImage: "/images/hero-cash-loan.jpg"
  };

  const features = [
    {
      title: "Instant Approval",
      description: "Get loan approval in minutes with our AI-powered assessment",
      icon: "⚡",
      href: "/features/instant-approval"
    },
    {
      title: "Competitive Rates",
      description: "Interest rates starting from 10.99% per annum",
      icon: "💰",
      href: "/rates/personal-loan"
    },
    {
      title: "Flexible Tenure",
      description: "Choose repayment tenure from 12 to 60 months",
      icon: "📅",
      href: "/features/flexible-tenure"
    },
    {
      title: "Minimal Documentation",
      description: "Just Aadhaar, PAN, and salary slips required",
      icon: "📄",
      href: "/documents/personal-loan"
    }
  ];

  const ctaData = {
    headline: "Get Your Cash Loan Today",
    description: "Join thousands who got instant cash loans with Navi's quick approval process.",
    primaryCta: {
      text: "Apply for Loan",
      href: "/apply/cash-loan"
    },
    secondaryCta: {
      text: "Check Eligibility",
      href: "/eligibility/cash-loan"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Navi Cash Loans?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the fastest and most convenient way to get personal loans with transparent terms and no hidden charges.
          </p>
        </div>
        
        <FeatureCards features={features} />
      </Container>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Loan Details & Features
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Loan Amount</span>
                  <span className="text-gray-900">₹50,000 - ₹20,00,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Interest Rate</span>
                  <span className="text-gray-900">10.99% - 35% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Tenure</span>
                  <span className="text-gray-900">12 - 60 months</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Processing Fee</span>
                  <span className="text-gray-900">Up to 3% + GST</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Prepayment</span>
                  <span className="text-gray-900">No charges after 12 EMIs</span>
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
                  Age: 21-65 years
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Minimum salary: ₹25,000/month
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Work experience: 2+ years
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Credit score: 650+
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Valid Indian citizenship
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CTASection {...ctaData} />
    </main>
  );
}
