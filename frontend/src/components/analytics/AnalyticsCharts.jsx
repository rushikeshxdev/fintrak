import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, BarChart, Bar, AreaChart, Area 
} from 'recharts';
import { 
  BarChart3, PieChart as PieChartIcon, TrendingUp, Activity, 
  Calendar, DollarSign, Target, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { COLORS } from '../../utils/constants';

// ============= ANALYTICS CHARTS =============
const AnalyticsCharts = ({ analytics }) => {
  const [activeChart, setActiveChart] = useState('overview');

  if (!analytics) return null;

  // Prepare data for different chart types
  const combinedFlowData = analytics.monthlyTrend.map((item, idx) => ({
    month: item.month,
    income: item.income,
    expense: item.expense,
    net: item.net,
    predicted: analytics.cashFlowPrediction?.[idx]?.net_prediction || null
  }));

  // Calculate insights
  const totalIncome = analytics.monthlyTrend.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = analytics.monthlyTrend.reduce((sum, item) => sum + item.expense, 0);
  const avgMonthlyNet = analytics.monthlyTrend.reduce((sum, item) => sum + item.net, 0) / analytics.monthlyTrend.length;
  const topCategory = analytics.categoryBreakdown.reduce((max, item) => 
    item.amount > (max?.amount || 0) ? item : max, null
  );

  const chartTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'categories', label: 'Categories', icon: PieChartIcon },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: Activity }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-violet-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold text-white">${totalIncome.toFixed(0)}</p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-white">${totalExpense.toFixed(0)}</p>
            </div>
            <ArrowDownRight className="w-8 h-8 text-red-400" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-400 text-sm font-medium">Avg Monthly</p>
              <p className="text-2xl font-bold text-white">${avgMonthlyNet.toFixed(0)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-violet-400" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Top Category</p>
              <p className="text-lg font-bold text-white">{topCategory?.category || 'N/A'}</p>
            </div>
            <Target className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>
      </div>

      {/* Chart Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-xl border border-gray-700">
        {chartTabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeChart === tab.id
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Chart Content */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeChart === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses Bar Chart */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-400" />
                Income vs Expenses
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={combinedFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Net Flow Area Chart */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-violet-400" />
                Net Cash Flow
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={combinedFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="net" 
                    stroke="#8b5cf6" 
                    fill="url(#netGradient)" 
                    strokeWidth={2}
                    name="Net Flow"
                  />
                  <defs>
                    <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChart === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Pie Chart */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-violet-400" />
                Expense Categories
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analytics.categoryBreakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                  >
                    {analytics.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {analytics.categoryBreakdown
                  .sort((a, b) => b.amount - a.amount)
                  .map((category, index) => {
                    const percentage = (category.amount / totalExpense) * 100;
                    return (
                      <motion.div
                        key={category.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-white font-medium">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${category.amount.toFixed(2)}</div>
                          <div className="text-gray-400 text-sm">{percentage.toFixed(1)}%</div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {activeChart === 'trends' && (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              Financial Trends & Predictions
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={combinedFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  name="Actual Net" 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  strokeDasharray="8 8" 
                  name="Predicted" 
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'insights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financial Health Score */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Financial Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Savings Rate</span>
                  <span className="text-green-400 font-semibold">
                    {((avgMonthlyNet / (totalIncome / analytics.monthlyTrend.length)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Expense Ratio</span>
                  <span className="text-orange-400 font-semibold">
                    {((totalExpense / totalIncome) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Top Expense</span>
                  <span className="text-red-400 font-semibold">{topCategory?.category}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium">💡 Tip</p>
                  <p className="text-gray-300 text-sm mt-1">
                    Consider reducing {topCategory?.category} expenses by 10% to boost savings.
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">🎯 Goal</p>
                  <p className="text-gray-300 text-sm mt-1">
                    You're on track to save ${(avgMonthlyNet * 12).toFixed(0)} this year!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyticsCharts;