import React from 'react';
import { Star, Quote } from 'lucide-react';

// ============= TESTIMONIALS SECTION =============
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'TechCorp',
      content: 'FinTrack Pro completely transformed how I manage my finances. The insights are incredible and I\'ve saved over $3,000 this year alone.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthLab',
      content: 'The analytics features are game-changing. I can finally see where my money goes and make informed decisions about my spending.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Emily Johnson',
      role: 'Freelance Designer',
      company: 'Independent',
      content: 'As a freelancer, tracking expenses was a nightmare. FinTrack Pro made it effortless and even helps me plan for taxes.',
      rating: 5,
      avatar: 'EJ'
    },
    {
      name: 'David Park',
      role: 'Investment Banker',
      company: 'FinanceFirst',
      content: 'Even as someone in finance, I was impressed by the depth of analysis. It\'s like having a personal financial advisor.',
      rating: 5,
      avatar: 'DP'
    },
    {
      name: 'Lisa Thompson',
      role: 'Small Business Owner',
      company: 'Thompson Consulting',
      content: 'Managing both personal and business finances has never been easier. The categorization is spot-on and saves me hours.',
      rating: 5,
      avatar: 'LT'
    },
    {
      name: 'James Wilson',
      role: 'Product Manager',
      company: 'InnovateCo',
      content: 'The goal tracking feature helped me save for my house down payment 6 months ahead of schedule. Absolutely love it!',
      rating: 5,
      avatar: 'JW'
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {' '}Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our users are saying about their experience with FinTrack Pro
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-violet-400 opacity-60" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
            <div className="text-gray-400">App Store Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.4K</div>
            <div className="text-gray-400">Avg. Annual Savings</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;