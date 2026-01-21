import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Zap,
  Target,
  Bell,
  CreditCard
} from 'lucide-react';

// ============= FEATURES SECTION =============
const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive financial insights with interactive charts and detailed breakdowns of your spending patterns.'
    },
    {
      icon: PieChart,
      title: 'Visual Reports',
      description: 'Beautiful, easy-to-understand visual reports that make complex financial data simple to digest.'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Track your financial progress over time with intelligent trend analysis and forecasting.'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade encryption and security protocols.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Access your finances anywhere with our fully responsive design that works on all devices.'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Get instant updates on your financial status with real-time synchronization across all platforms.'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and track financial goals with intelligent recommendations to help you achieve them faster.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Receive intelligent notifications about spending patterns, budget limits, and opportunities to save.'
    },
    {
      icon: CreditCard,
      title: 'Transaction Management',
      description: 'Effortlessly categorize and manage all your transactions with smart auto-categorization.'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}Succeed Financially
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to give you complete control over your financial life, 
            with the insights you need to make smarter decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;