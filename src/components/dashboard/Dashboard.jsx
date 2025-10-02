import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import SummaryCards from './SummaryCards';
import AnalyticsCharts from '../analytics/AnalyticsCharts';
import TransactionList from './TransactionList';
import TransactionForm from '../transactions/TransactionForm';

// ============= DASHBOARD =============
const Dashboard = () => {
  const { user, logout } = useAuth();
  const { apiCall } = useApi();
  
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch all necessary data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Concurrent fetching for efficiency
      // NOTE: We await the response objects now
      const [txResponse, analyticsData] = await Promise.all([
        apiCall('/transactions'),
        apiCall('/analytics/summary')
      ]);
      
      // FIX: Extract the transaction array from the 'data' field 
      const txData = Array.isArray(txResponse.data) ? txResponse.data : [];
      
      // Ensure analytics data is handled safely
      setAnalytics(analyticsData);
      setTransactions(txData);
      
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      // Ensure state is reset to non-crashing values on API failure
      setTransactions([]); 
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate the overall summary from the monthly trend data
  const summary = analytics?.monthlyTrend.reduce(
    (acc, item) => ({
      income: acc.income + item.income,
      expense: acc.expense + item.expense,
      net: acc.net + item.net
    }),
    { income: 0, expense: 0, net: 0 }
  ) || { income: 0, expense: 0, net: 0 };

  // This function is now passed to TransactionList to handle deletion
  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await apiCall(`/transactions/${id}`, 'DELETE');
      fetchData(); // Refresh data after successful deletion
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Wallet className="w-8 h-8 text-violet-400 mr-3" />
            <h1 className="text-2xl font-bold text-white">FinTrack Pro</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, <span className="text-violet-400 font-semibold">{user?.firstName}</span></span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Add Transaction Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        </div>

        {/* Analytics Charts */}
        {!loading && analytics && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Analytics Overview</h2>
            <AnalyticsCharts analytics={analytics} />
          </div>
        )}

        {/* Transactions List */}
        <TransactionList 
          transactions={transactions} 
          loading={loading} 
          handleDelete={handleDelete} 
        />
      </main>

      {/* Transaction Form Modal */}
      {showModal && (
        <TransactionForm 
          onClose={() => setShowModal(false)} 
          onSuccess={fetchData} 
        />
      )}
    </div>
  );
};

export default Dashboard;