import React from 'react';
import { ArrowRight, CheckCircle, Wallet } from 'lucide-react';

// ============= CTA SECTION =============
const CTASection = ({ onAuthClick }) => {
  const features = [
    'Free 30-day trial',
    'No credit card required',
    'Cancel anytime',
    'Full feature access'
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main CTA */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}Financial Life?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already taken control of their finances. 
            Start your free trial today and see the difference.
          </p>
        </div>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-violet-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onAuthClick('signup')}
            className="group px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-xl transition-all shadow-2xl hover:shadow-violet-500/25 hover:scale-105"
          >
            Start Your Free Trial
            <ArrowRight className="w-6 h-6 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onAuthClick('login')}
            className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-xl font-semibold text-xl transition-all"
          >
            Sign In
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-gray-400 text-sm">
          <p className="mb-4">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold">Google</div>
            <div className="text-lg font-semibold">Microsoft</div>
            <div className="text-lg font-semibold">Apple</div>
            <div className="text-lg font-semibold">Amazon</div>
            <div className="text-lg font-semibold">Meta</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-violet-400 mr-3" />
              <span className="text-2xl font-bold text-white">FinTrack Pro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 FinTrack Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CTASection;