import React from 'react';
import { CheckCircle, DollarSign, Clock, Users } from 'lucide-react';

// ============= BENEFITS SECTION =============
const BenefitsSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Save More Money',
      description: 'Users save an average of $2,400 per year by identifying spending patterns and optimizing their budgets.',
      stat: '$2,400',
      statLabel: 'Average Annual Savings'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automated categorization and smart insights reduce financial management time by 75%.',
      stat: '75%',
      statLabel: 'Time Saved'
    },
    {
      icon: Users,
      title: 'Join Thousands',
      description: 'Over 50,000 professionals trust FinTrack Pro to manage their financial future.',
      stat: '50K+',
      statLabel: 'Happy Users'
    }
  ];

  const features = [
    'Automatic transaction categorization',
    'Real-time budget tracking',
    'Intelligent spending alerts',
    'Goal-based savings plans',
    'Investment portfolio tracking',
    'Tax preparation assistance',
    'Multi-account synchronization',
    'Advanced security protection'
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-violet-900/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}FinTrack Pro?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their financial lives 
            with our intelligent platform.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-2">{benefit.stat}</div>
                  <div className="text-sm text-violet-300 font-medium">{benefit.statLabel}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Features List */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Everything You Need in One Platform
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                FinTrack Pro combines all the essential financial management tools 
                you need in one beautiful, easy-to-use platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Placeholder for dashboard preview image */}
              <div className="aspect-video bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-violet-400" />
                  </div>
                  <p className="text-gray-300 font-medium">Dashboard Preview</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-violet-500/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500/30 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;