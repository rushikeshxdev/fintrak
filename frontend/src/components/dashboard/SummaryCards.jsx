import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Eye, EyeOff, Target, CreditCard } from 'lucide-react';
import CountUp from 'react-countup';

// ============= SUMMARY CARDS =============
const SummaryCards = ({ summary, showBalance, setShowBalance }) => {
  const cards = [
    {
      title: 'Total Income',
      amount: summary.income,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Expenses',
      amount: summary.expense,
      icon: TrendingDown,
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      change: '+8.2%',
      changeType: 'negative'
    },
    {
      title: 'Net Balance',
      amount: summary.net,
      icon: DollarSign,
      color: summary.net >= 0 ? 'from-violet-500 to-purple-600' : 'from-red-500 to-rose-600',
      bgColor: summary.net >= 0 ? 'bg-violet-500/10' : 'bg-red-500/10',
      borderColor: summary.net >= 0 ? 'border-violet-500/20' : 'border-red-500/20',
      change: summary.net >= 0 ? '+15.3%' : '-5.2%',
      changeType: summary.net >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Savings Goal',
      amount: 10000,
      currentAmount: Math.abs(summary.net),
      icon: Target,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      change: '67%',
      changeType: 'positive',
      isGoal: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        const progress = card.isGoal ? (card.currentAmount / card.amount) * 100 : 0;
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`${card.bgColor} ${card.borderColor} border backdrop-blur-md rounded-2xl p-6 relative overflow-hidden group`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              {card.title === 'Net Balance' && (
                <motion.button
                  onClick={() => setShowBalance(!showBalance)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </motion.button>
              )}
            </div>

            {/* Amount */}
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-2">{card.title}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-white">
                  {showBalance || card.title !== 'Net Balance' ? (
                    <>
                      $<CountUp end={Math.abs(card.amount)} duration={2} separator="," />
                    </>
                  ) : (
                    '••••••'
                  )}
                </span>
                {card.amount < 0 && showBalance && (
                  <span className="text-red-400 text-lg">-</span>
                )}
              </div>

              {/* Progress Bar for Goals */}
              {card.isGoal && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.min(progress, 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                    ></motion.div>
                  </div>
                </div>
              )}

              {/* Change Indicator */}
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  card.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {card.changeType === 'positive' ? '↗' : '↘'} {card.change}
                </span>
                <span className="text-gray-500 text-xs">vs last month</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SummaryCards;