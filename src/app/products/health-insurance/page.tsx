import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';

export const metadata: Metadata = {
  title: 'Health Insurance - Comprehensive Health Coverage | Navi',
  description: 'Get comprehensive health insurance with cashless treatment, wide hospital network, and affordable premiums. Protect your family\'s health and finances.',
  keywords: 'health insurance, medical insurance, family health insurance, cashless treatment, Navi insurance',
};

export default function HealthInsurancePage() {
  const heroData = {
    headline: "Protect Your Health & Wealth",
    title: "Comprehensive Health Insurance",
    subtitle: "Comprehensive health insurance for you and your family",
    description: "Secure your family's health with our comprehensive health insurance plans. Cashless treatment at 10,000+ hospitals nationwide.",
    primaryCTA: {
      text: "Get Quote",
      href: "/quote/health-insurance"
    },
    secondaryCTA: {
      text: "Compare Plans",
      href: "/compare/health-insurance"
    },
    backgroundImage: "/images/hero-health-insurance.jpg"
  };

  const features = [
    {
      title: "Cashless Treatment",
      description: "Get treatment at 10,000+ network hospitals without paying upfront",
      icon: "🏥",
      href: "/features/cashless-treatment"
    },
    {
      title: "Wide Coverage",
      description: "Covers hospitalization, day-care procedures, and pre/post hospitalization",
      icon: "🛡️",
      href: "/features/coverage"
    },
    {
      title: "No Waiting Period",
      description: "Immediate coverage for accidents and selected treatments",
      icon: "⚡",
      href: "/features/no-waiting"
    },
    {
      title: "Family Plans",
      description: "Single policy to cover your entire family with shared benefits",
      icon: "👨‍👩‍👧‍👦",
      href: "/features/family-plans"
    }
  ];

  const ctaData = {
    headline: "Secure Your Health Today",
    description: "Join thousands who trust Navi for comprehensive health insurance coverage.",
    primaryCta: {
      text: "Get Quote",
      href: "/quote/health-insurance"
    },
    secondaryCta: {
      text: "Compare Plans",
      href: "/compare/health-insurance"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Navi Health Insurance?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the best health insurance coverage with comprehensive benefits, wide hospital network, and hassle-free claim settlement.
          </p>
        </div>
        
        <FeatureCards features={features} />
      </Container>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Coverage Details & Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Sum Insured</span>
                  <span className="text-gray-900">₹3 lakhs - ₹1 crore</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Network Hospitals</span>
                  <span className="text-gray-900">10,000+ hospitals</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Room Rent</span>
                  <span className="text-gray-900">No capping</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Pre-hospitalization</span>
                  <span className="text-gray-900">30 days coverage</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Post-hospitalization</span>
                  <span className="text-gray-900">60 days coverage</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Claim Settlement</span>
                  <span className="text-gray-900">98.5% settlement ratio</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What's Covered
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Hospitalization expenses
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Day-care procedures
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Pre & post hospitalization
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Ambulance charges
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Health check-ups
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Alternative treatments (AYUSH)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Mental health coverage
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Additional Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• No claim bonus up to 100%</li>
                  <li>• Maternity coverage available</li>
                  <li>• Critical illness add-on</li>
                  <li>• Personal accident cover</li>
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
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our range of health insurance plans designed for different needs and budgets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🥉</div>
                <h3 className="text-xl font-semibold text-gray-900">Essential</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹3-5 Lakhs</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Basic hospitalization coverage</li>
                <li>• 5,000+ network hospitals</li>
                <li>• Pre/post hospitalization</li>
                <li>• Ambulance coverage</li>
                <li>• Health check-up</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Plan
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🥈</div>
                <h3 className="text-xl font-semibold text-gray-900">Comprehensive</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹10-25 Lakhs</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Enhanced coverage benefits</li>
                <li>• 10,000+ network hospitals</li>
                <li>• No room rent capping</li>
                <li>• Maternity coverage</li>
                <li>• AYUSH treatments</li>
                <li>• Critical illness add-on</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Plan
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🥇</div>
                <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹50L-1 Cr</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Maximum coverage benefits</li>
                <li>• Global coverage available</li>
                <li>• Unlimited room rent</li>
                <li>• Organ transplant coverage</li>
                <li>• Mental health coverage</li>
                <li>• Personal accident cover</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Choose Plan
              </button>
            </div>
          </div>
        </Container>
      </section>

      <CTASection {...ctaData} />
    </main>
  );
}
