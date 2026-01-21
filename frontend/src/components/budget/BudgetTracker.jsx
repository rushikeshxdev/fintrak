import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Edit3, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

const BudgetTracker = ({ transactions = [] }) => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food', limit: 800, spent: 650, color: 'orange' },
    { id: 2, category: 'Transport', limit: 300, spent: 280, color: 'purple' },
    { id: 3, category: 'Entertainment', limit: 200, spent: 150, color: 'yellow' },
    { id: 4, category: 'Shopping', limit: 500, spent: 420, color: 'pink' }
  ]);

  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });

  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return 'red';
    if (percentage >= 75) return 'yellow';
    return 'green';
  };

  const getProgressWidth = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const addBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([...budgets, {
        id: Date.now(),
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: 0,
        color: 'blue'
      }]);
      setNewBudget({ category: '', limit: '' });
      setShowAddBudget(false);
    }
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-violet-400" />
          Budget Tracker
        </h3>
        <motion.button
          onClick={() => setShowAddBudget(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Budget
        </motion.button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget, index) => {
          const progressWidth = getProgressWidth(budget.spent, budget.limit);
          const progressColor = getProgressColor(budget.spent, budget.limit);
          const percentage = (budget.spent / budget.limit) * 100;
          
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${budget.color}-500`}></div>
                  <h4 className="text-white font-medium">{budget.category}</h4>
                  {percentage >= 90 && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  {percentage < 75 && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteBudget(budget.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-gray-300">
                  ${budget.spent.toFixed(2)} of ${budget.limit.toFixed(2)}
                </span>
                <span className={`font-medium ${
                  progressColor === 'red' ? 'text-red-400' :
                  progressColor === 'yellow' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="w-full bg-gray-600 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${
                    progressColor === 'red' ? 'bg-red-500' :
                    progressColor === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                />
              </div>

              <div className="mt-2 text-xs text-gray-400">
                Remaining: ${(budget.limit - budget.spent).toFixed(2)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddBudget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowAddBudget(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-purple-500/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Add New Budget</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                  placeholder="e.g., Groceries"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Limit</label>
                <input
                  type="number"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({...newBudget, limit: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addBudget}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-medium transition-all"
                >
                  Add Budget
                </button>
                <button
                  onClick={() => setShowAddBudget(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BudgetTracker;