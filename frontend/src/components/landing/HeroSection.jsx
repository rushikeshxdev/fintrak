import React from 'react';
import { Wallet, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

// ============= HERO SECTION =============
const HeroSection = ({ onAuthClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Wallet className="w-8 h-8 text-violet-400 mr-3" />
            <span className="text-2xl font-bold text-white">FinTrack Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onAuthClick('login')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick('signup')}
              className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master Your
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}Financial Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take control of your finances with intelligent tracking, powerful analytics, 
            and actionable insights. Built for modern professionals who demand excellence.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onAuthClick('signup')}
            className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-lg transition-all shadow-2xl hover:shadow-violet-500/25 hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onAuthClick('login')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all"
          >
            Watch Demo
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-gray-300">
            <TrendingUp className="w-6 h-6 text-violet-400" />
            <span className="font-medium">Smart Analytics</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-300">
            <Shield className="w-6 h-6 text-violet-400" />
            <span className="font-medium">Bank-Level Security</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-300">
            <Zap className="w-6 h-6 text-violet-400" />
            <span className="font-medium">Real-Time Insights</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;