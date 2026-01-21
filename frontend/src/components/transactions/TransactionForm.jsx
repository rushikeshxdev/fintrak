import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Tag, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

// ============= TRANSACTION FORM MODAL =============
const TransactionForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { apiCall } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    try {
      await apiCall('/transactions', 'POST', { 
        ...formData, 
        amount: parseFloat(formData.amount) 
      });
      
      toast.success(`${formData.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-purple-500/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
              <motion.button 
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            <p className="text-violet-100 mt-2">Track your income and expenses</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Type Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Transaction Type</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    formData.type === 'income' 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Income
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    formData.type === 'expense' 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <TrendingDown className="w-5 h-5" />
                  Expense
                </motion.button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    errors.amount ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {errors.amount}
                </motion.p>
              )}
              
              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickAmounts.map(amount => (
                  <motion.button
                    key={amount}
                    type="button"
                    onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gray-700 hover:bg-violet-600 text-gray-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    errors.category ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {errors.category}
                </motion.p>
              )}
            </div>
            
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all ${
                    errors.date ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
              </div>
              {errors.date && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {errors.date}
                </motion.p>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Enter transaction details..."
                />
              </div>
              {errors.description && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {errors.description}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Adding...
                </div>
              ) : (
                `Add ${formData.type === 'income' ? 'Income' : 'Expense'}`
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionForm;