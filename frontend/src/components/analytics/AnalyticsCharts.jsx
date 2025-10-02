import React from 'react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { COLORS } from '../../utils/constants'; // Get colors from constants

// ============= ANALYTICS CHARTS =============
const AnalyticsCharts = ({ analytics }) => {
  if (!analytics) return null;

  // Prepare data for the monthly trend chart
  const combinedFlowData = analytics.monthlyTrend.map((item, idx) => ({
    month: item.month,
    actual: item.net,
    // Add predicted cash flow if available
    predicted: analytics.cashFlowPrediction?.[idx] || null
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Breakdown Pie Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center mb-4">
          <PieChartIcon className="w-5 h-5 text-violet-400 mr-2" />
          <h3 className="text-xl font-semibold text-white">Category Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics.categoryBreakdown}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => entry.category}
              // The label prop should be replaced with a separate Legend for better UX on smaller screens
              // The original code used a function for the label, which is kept here
            >
              {analytics.categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #6366f1', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ padding: '10px 0 0 0' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Cash Flow Line Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-violet-400 mr-2" />
          <h3 className="text-xl font-semibold text-white">Monthly Cash Flow</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #6366f1', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={3} name="Actual Net" />
            <Line type="monotone" dataKey="predicted" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;