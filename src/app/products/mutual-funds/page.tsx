import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';

export const metadata: Metadata = {
  title: 'Mutual Funds - Smart Investment Solutions | Navi',
  description: 'Invest in mutual funds with zero commission, expert guidance, and diversified portfolios. Start your wealth creation journey with as little as ₹500.',
  keywords: 'mutual funds, SIP, investment, wealth creation, equity funds, debt funds, Navi mutual funds',
};

export default function MutualFundsPage() {
  const heroData = {
    headline: "Invest Smart, Grow Wealth",
    title: "Mutual Funds Made Simple",
    subtitle: "Mutual fund investments made simple and rewarding",
    description: "Start investing in mutual funds with zero commission, expert-curated portfolios, and flexible SIP options. Begin your wealth creation journey today.",
    primaryCta: {
      text: "Start Investing",
      href: "/invest/mutual-funds"
    },
    secondaryCta: {
      text: "Explore Funds",
      href: "/funds/explore"
    },
    backgroundImage: "/images/hero-mutual-funds.jpg"
  };

  const features = [
    {
      title: "Zero Commission",
      description: "Invest in direct mutual funds with zero commission and lower expense ratios",
      icon: "💰",
      href: "/features/zero-commission"
    },
    {
      title: "Expert Guidance",
      description: "Get personalized investment advice from certified financial advisors",
      icon: "👨‍💼",
      href: "/features/expert-guidance"
    },
    {
      title: "Flexible SIP",
      description: "Start SIP with as little as ₹500 and modify anytime",
      icon: "📈",
      href: "/features/flexible-sip"
    },
    {
      title: "Diversified Portfolio",
      description: "Choose from 1000+ mutual fund schemes across categories",
      icon: "📊",
      href: "/features/diversified-portfolio"
    }
  ];

  const ctaData = {
    headline: "Start Your Investment Journey Today",
    description: "Join thousands of investors who trust Navi for their mutual fund investments.",
    primaryCta: {
      text: "Start Investing",
      href: "/invest/mutual-funds"
    },
    secondaryCta: {
      text: "View All Funds",
      href: "/funds"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Navi Mutual Funds?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience seamless investing with our technology-driven platform, expert guidance, and comprehensive mutual fund solutions.
          </p>
        </div>
        
        <FeatureCards features={features} />
      </Container>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Investment Features & Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Minimum SIP</span>
                  <span className="text-gray-900">₹500 per month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Minimum Lumpsum</span>
                  <span className="text-gray-900">₹5,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Fund Options</span>
                  <span className="text-gray-900">1000+ schemes</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Commission</span>
                  <span className="text-gray-900">Zero (Direct plans)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Exit Load</span>
                  <span className="text-gray-900">As per fund house</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Tax Benefits</span>
                  <span className="text-gray-900">ELSS funds u/s 80C</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Investment Categories
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Equity Funds (Large, Mid, Small Cap)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Debt Funds (Liquid, Ultra Short, Long Term)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Hybrid Funds (Balanced, Conservative)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  ELSS Funds (Tax Saving)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Index Funds & ETFs
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  International Funds
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Smart Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Goal-based investing</li>
                  <li>• Auto portfolio rebalancing</li>
                  <li>• Tax harvesting strategies</li>
                  <li>• Real-time portfolio tracking</li>
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
              Investment Strategies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our curated investment strategies designed for different risk profiles and financial goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Conservative</h3>
              <p className="text-gray-600 mb-4">Low risk strategy focused on capital preservation and steady returns</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• 70% Debt, 30% Equity allocation</li>
                <li>• Expected returns: 8-10% p.a.</li>
                <li>• Suitable for: Risk-averse investors</li>
                <li>• Time horizon: 3-5 years</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Start Conservative SIP
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Recommended
              </div>
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Balanced</h3>
              <p className="text-gray-600 mb-4">Moderate risk strategy balancing growth and stability</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• 50% Equity, 50% Debt allocation</li>
                <li>• Expected returns: 10-12% p.a.</li>
                <li>• Suitable for: Moderate risk takers</li>
                <li>• Time horizon: 5-7 years</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Start Balanced SIP
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aggressive</h3>
              <p className="text-gray-600 mb-4">High growth strategy for maximum wealth creation</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• 80% Equity, 20% Debt allocation</li>
                <li>• Expected returns: 12-15% p.a.</li>
                <li>• Suitable for: High risk tolerance</li>
                <li>• Time horizon: 7+ years</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Start Aggressive SIP
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SIP Calculator
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your small investments can grow into significant wealth over time with the power of compounding.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculate Your Returns</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly SIP Amount</label>
                    <input type="number" placeholder="₹5,000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Period (Years)</label>
                    <input type="number" placeholder="10" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return (%)</label>
                    <input type="number" placeholder="12" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Calculate Returns
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Projected Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold">₹6,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="font-semibold text-green-600">₹5,65,227</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Maturity Value</span>
                    <span className="text-blue-600">₹11,65,227</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Starting early and staying invested for longer periods can significantly boost your wealth through the power of compounding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection {...ctaData} />
    </main>
  );
}
