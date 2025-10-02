import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { CATEGORIES } from '../../utils/constants'; // Get categories from constants

// ============= TRANSACTION FORM MODAL =============
const TransactionForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { apiCall } = useApi();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to create a new transaction
      await apiCall('/transactions', 'POST', { 
        ...formData, 
        amount: parseFloat(formData.amount) 
      });
      onSuccess(); // Signal success to parent (Dashboard) to refresh data
      onClose();   // Close the modal
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-purple-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                formData.type === 'income' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                formData.type === 'expense' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Expense
            </button>
          </div>

          {/* Form Fields */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;