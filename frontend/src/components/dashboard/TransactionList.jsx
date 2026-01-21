import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Calendar, Tag, DollarSign, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { format } from 'date-fns';

// ============= TRANSACTION LIST =============
const TransactionList = ({ transactions, loading, handleDelete, searchTerm }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const transactionData = Array.isArray(transactions) ? transactions : [];

  // Get unique categories
  const categories = ['all', ...new Set(transactionData.map(tx => tx.category))];

  // Sort and filter transactions
  const sortedTransactions = [...transactionData]
    .filter(tx => selectedCategory === 'all' || tx.category === selectedCategory)
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Salary': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Freelance': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Food': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Transport': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Shopping': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Bills': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Entertainment': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Healthcare': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'Education': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none border border-gray-600 focus:border-violet-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('date')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'date' 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'amount' 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading transactions...</p>
        </div>
      ) : sortedTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400 mb-2">No transactions found</p>
          <p className="text-gray-500 text-sm">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first transaction to get started!'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {sortedTransactions.map((tx, index) => (
              <motion.div
                key={tx._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="bg-gray-700/30 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-600/30 hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  {/* Left Side - Transaction Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${
                      tx.type === 'income' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.type === 'income' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-medium truncate">{tx.description}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tx.category)}`}>
                          {tx.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(tx.date), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Amount and Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{tx.type}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(tx._id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Summary Footer */}
      {sortedTransactions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center text-sm text-gray-400"
        >
          <span>Showing {sortedTransactions.length} transactions</span>
          <span>
            Total: {sortedTransactions.filter(tx => tx.type === 'income').length} income, {' '}
            {sortedTransactions.filter(tx => tx.type === 'expense').length} expenses
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionList;