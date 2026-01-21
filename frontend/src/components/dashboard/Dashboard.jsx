import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, TrendingUp, TrendingDown, Wallet, LogOut, Plus, 
  Bell, Settings, Search, Filter, Download, Calendar,
  Target, PieChart, BarChart3, Activity, CreditCard,
  ArrowUpRight, ArrowDownRight, Eye, EyeOff, Grid, List, Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import SummaryCards from './SummaryCards';
import AnalyticsCharts from '../analytics/AnalyticsCharts';
import TransactionList from './TransactionList';
import TransactionForm from '../transactions/TransactionForm';
import BudgetTracker from '../budget/BudgetTracker';
import GoalsTracker from '../goals/GoalsTracker';
import NotificationCenter from '../notifications/NotificationCenter';
import toast, { Toaster } from 'react-hot-toast';

// ============= DASHBOARD =============
const Dashboard = () => {
  const { user, logout } = useAuth();
  const { apiCall } = useApi();
  
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Budget limit reached for Shopping', type: 'warning', time: '2 hours ago' },
    { id: 2, message: 'Monthly savings goal achieved!', type: 'success', time: '1 day ago' },
    { id: 3, message: 'New transaction added successfully', type: 'info', time: '5 minutes ago' }
  ]);

  // Function to fetch all necessary data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [txResponse, analyticsData] = await Promise.all([
        apiCall('/transactions'),
        apiCall('/analytics/summary')
      ]);
      
      const txData = Array.isArray(txResponse.data) ? txResponse.data : [];
      setAnalytics(analyticsData);
      setTransactions(txData);
      
      toast.success('Data refreshed successfully!');
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setTransactions([]); 
      setAnalytics(null);
      toast.error('Failed to load data');
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
      fetchData();
      toast.success('Transaction deleted successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filter transactions based on search and filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Export data functionality
  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Type,Amount,Category,Description\n" +
      transactions.map(t => `${t.date},${t.type},${t.amount},${t.category},${t.description}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Toaster position="top-right" />
      
      {/* Enhanced Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gray-800/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Wallet className="w-8 h-8 text-violet-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">FinTrack Pro</h1>
            </motion.div>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-700/50 rounded-lg px-4 py-2 w-96">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
              >
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {notifications.length}
                    </motion.span>
                  )}
                </button>
              </motion.div>

              {/* Settings */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Settings className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </motion.div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-gray-300 text-sm">Welcome back,</span>
                  <div className="text-violet-400 font-semibold">{user?.firstName}</div>
                </div>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-xl border border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: Grid },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'budget', label: 'Budget', icon: Target },
              { id: 'goals', label: 'Goals', icon: Star },
              { id: 'transactions', label: 'Transactions', icon: List }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
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
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Enhanced Summary Cards */}
                <SummaryCards summary={summary} showBalance={showBalance} setShowBalance={setShowBalance} />

                {/* Quick Actions Bar */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => setShowModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      Add Transaction
                    </motion.button>

                    <motion.button
                      onClick={exportData}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Export
                    </motion.button>
                  </div>
                </div>

                {/* Overview Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Transactions Preview */}
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
                      <button 
                        onClick={() => setActiveTab('transactions')}
                        className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {transactions.slice(0, 5).map((tx) => (
                        <div key={tx._id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              tx.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {tx.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-white font-medium">{tx.description}</p>
                              <p className="text-gray-400 text-sm">{tx.category}</p>
                            </div>
                          </div>
                          <span className={`font-semibold ${
                            tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Analytics */}
                  {!loading && analytics && (
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Quick Analytics</h3>
                        <button 
                          onClick={() => setActiveTab('analytics')}
                          className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                      <AnalyticsCharts analytics={analytics} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && !loading && analytics && (
              <AnalyticsCharts analytics={analytics} />
            )}

            {activeTab === 'budget' && (
              <BudgetTracker transactions={transactions} />
            )}

            {activeTab === 'goals' && (
              <GoalsTracker />
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none"
                    >
                      <option value="all">All Transactions</option>
                      <option value="income">Income Only</option>
                      <option value="expense">Expenses Only</option>
                    </select>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      This Month
                    </motion.button>
                  </div>

                  <motion.button
                    onClick={() => setShowModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Transaction
                  </motion.button>
                </div>

                <TransactionList 
                  transactions={filteredTransactions} 
                  loading={loading} 
                  handleDelete={handleDelete}
                  searchTerm={searchTerm}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Transaction Form Modal */}
      <AnimatePresence>
        {showModal && (
          <TransactionForm 
            onClose={() => setShowModal(false)} 
            onSuccess={fetchData} 
          />
        )}
      </AnimatePresence>

      {/* Notification Center */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationCenter 
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;