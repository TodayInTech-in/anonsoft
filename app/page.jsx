import PencilBanner from './components/PencilBanner';
import HeroSection from './components/HeroSection';
import TrustedBy from './components/TrustedBy';
import TrustCertifications from './components/TrustCertifications';
import ServicesSection from './components/ServicesSection';
import ComparisonSection from './components/ComparisonSection';
import RoiCalculator from './components/RoiCalculator';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import TechStackSection from './components/TechStackSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import SocialProofToast from './components/SocialProofToast';

export const metadata = {
  title: 'TodayInTech — Custom Startup Software Development Agency',
  description:
    'We help startups launch scalable software quickly: SaaS platforms, AI tools, and mobile apps—production-ready in weeks. Book a free strategy call.',
};

export default function HomePage() {
  return (
    <main>
      <PencilBanner />
      <SocialProofToast />
      <HeroSection />
      <TrustedBy />
      <TrustCertifications />
      <ServicesSection />
      <ComparisonSection />
      <RoiCalculator />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <TechStackSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
