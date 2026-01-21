import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import BenefitsSection from './BenefitsSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';

// ============= LANDING PAGE =============
const LandingPage = ({ onAuthClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <HeroSection onAuthClick={onAuthClick} />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection onAuthClick={onAuthClick} />
    </div>
  );
};

export default LandingPage;