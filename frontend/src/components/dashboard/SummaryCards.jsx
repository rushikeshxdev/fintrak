import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

// ============= SUMMARY CARDS =============
const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Income Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-1">Total Income</p>
            <p className="text-3xl font-bold text-white">${summary.income.toFixed(2)}</p>
          </div>
          <TrendingUp className="w-12 h-12 text-green-200" />
        </div>
      </div>
      
      {/* Total Expenses Card */}
      <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-white">${summary.expense.toFixed(2)}</p>
          </div>
          <TrendingDown className="w-12 h-12 text-red-200" />
        </div>
      </div>
      
      {/* Net Balance Card */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm mb-1">Net Balance</p>
            <p className="text-3xl font-bold text-white">${summary.net.toFixed(2)}</p>
          </div>
          <DollarSign className="w-12 h-12 text-purple-200" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;