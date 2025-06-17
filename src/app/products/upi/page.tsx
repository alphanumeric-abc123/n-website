import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Hero } from '@/components/content/Hero';
import { FeatureCards } from '@/components/content/FeatureCards';
import { CTASection } from '@/components/content/CTASection';

export const metadata: Metadata = {
  title: 'UPI Payments - Fast & Secure Digital Payments | Navi',
  description: 'Experience seamless UPI payments with Navi. Send money, pay bills, and make transactions instantly with bank-grade security.',
  keywords: 'UPI, digital payments, money transfer, bill payments, Navi UPI',
};

export default function UPIPage() {
  const heroData = {
    headline: "UPI Payments Made Easy",
    title: "Fast & Secure UPI Payments",
    subtitle: "Fast, secure, and seamless digital payments",
    description: "Send money, pay bills, and make transactions instantly with our UPI platform. Experience the future of digital payments.",
    primaryCta: {
      text: "Download App",
      href: "/download"
    },
    secondaryCta: {
      text: "Learn More",
      href: "#features"
    }
  };

  const features = [
    {
      title: "Instant Transfers",
      description: "Send money to anyone, anywhere in India within seconds",
      icon: "⚡",
      href: "/features/instant-transfer"
    },
    {
      title: "Bill Payments",
      description: "Pay all your bills - electricity, mobile, DTH, and more",
      icon: "📄",
      href: "/features/bill-payments"
    },
    {
      title: "QR Code Payments",
      description: "Scan and pay at millions of merchants across India",
      icon: "📱",
      href: "/features/qr-payments"
    },
    {
      title: "Bank-Grade Security",
      description: "Multi-layer security with biometric authentication",
      icon: "🔒",
      href: "/security"
    }
  ];

  const ctaData = {
    headline: "Start Using Navi UPI Today",
    description: "Join millions who trust Navi for secure and instant UPI payments.",
    primaryCta: {
      text: "Get Started",
      href: "/download"
    },
    secondaryCta: {
      text: "View Demo",
      href: "/demo/upi"
    }
  };

  return (
    <main>
      <Hero {...heroData} />
      
      <section id="features" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Navi UPI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the most convenient and secure way to handle all your digital payment needs.
            </p>
          </div>
          
          <FeatureCards features={features} />
        </Container>
      </section>

      <CTASection {...ctaData} />
    </main>
  );
}
