import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar, DollarSign, TrendingUp, Star, Gift } from 'lucide-react';

const GoalsTracker = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Emergency Fund',
      target: 10000,
      current: 6500,
      deadline: '2024-12-31',
      category: 'savings',
      icon: '🛡️',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Vacation to Japan',
      target: 5000,
      current: 2800,
      deadline: '2024-08-15',
      category: 'travel',
      icon: '✈️',
      color: 'purple'
    },
    {
      id: 3,
      title: 'New Laptop',
      target: 2500,
      current: 1200,
      deadline: '2024-06-01',
      category: 'tech',
      icon: '💻',
      color: 'green'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: '',
    category: 'savings',
    icon: '🎯'
  });

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMonthlyRequired = (current, target, deadline) => {
    const remaining = target - current;
    const daysLeft = getDaysRemaining(deadline);
    const monthsLeft = Math.max(daysLeft / 30, 1);
    return remaining / monthsLeft;
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      setGoals([...goals, {
        ...newGoal,
        id: Date.now(),
        current: 0,
        target: parseFloat(newGoal.target),
        color: 'violet'
      }]);
      setNewGoal({ title: '', target: '', deadline: '', category: 'savings', icon: '🎯' });
      setShowAddGoal(false);
    }
  };

  const addToGoal = (goalId, amount) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
        : goal
    ));
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
          Financial Goals
        </h3>
        <motion.button
          onClick={() => setShowAddGoal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal, index) => {
          const progress = getProgressPercentage(goal.current, goal.target);
          const daysLeft = getDaysRemaining(goal.deadline);
          const monthlyRequired = getMonthlyRequired(goal.current, goal.target, goal.deadline);
          const isCompleted = progress >= 100;
          const isUrgent = daysLeft < 30 && !isCompleted;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${
                isCompleted 
                  ? 'from-green-500/20 to-emerald-500/20 border-green-500/30' 
                  : isUrgent 
                    ? 'from-red-500/20 to-rose-500/20 border-red-500/30'
                    : 'from-gray-700/50 to-gray-600/50 border-gray-600/30'
              } border rounded-xl p-5 relative overflow-hidden group hover:scale-105 transition-all`}
            >
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{goal.title}</h4>
                    <p className="text-gray-400 text-sm capitalize">{goal.category}</p>
                  </div>
                </div>
                {isCompleted && <Star className="w-5 h-5 text-yellow-400" />}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Progress</span>
                  <span className="text-white font-semibold">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-3 rounded-full ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-violet-500 to-purple-500'
                    }`}
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Current</p>
                  <p className="text-white font-bold text-lg">${goal.current.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Target</p>
                  <p className="text-white font-bold text-lg">${goal.target.toLocaleString()}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                </div>
                {!isCompleted && (
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Monthly needed</p>
                    <p className="text-violet-400 font-semibold">${monthlyRequired.toFixed(0)}</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {!isCompleted && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[50, 100, 250].map(amount => (
                    <motion.button
                      key={amount}
                      onClick={() => addToGoal(goal.id, amount)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 py-1 rounded text-xs font-medium transition-all"
                    >
                      +${amount}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Completion Badge */}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                >
                  <Gift className="w-3 h-3" />
                  Complete!
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowAddGoal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-purple-500/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Create New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                  placeholder="e.g., New Car"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Amount</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-violet-500"
                >
                  <option value="savings">Savings</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Technology</option>
                  <option value="home">Home</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addGoal}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-medium transition-all"
                >
                  Create Goal
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
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

export default GoalsTracker;