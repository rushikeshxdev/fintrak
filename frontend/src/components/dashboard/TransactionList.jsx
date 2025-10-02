import React from 'react';
import { Trash2 } from 'lucide-react';

// ============= TRANSACTION LIST =============
const TransactionList = ({ transactions, loading, handleDelete }) => {
  // FIX: Ensure 'transactions' is an array before using it
  const transactionData = Array.isArray(transactions) ? transactions : [];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
      
      {loading ? (
        <p className="text-gray-400 text-center py-8">Loading transactions...</p>
      ) : transactionData.length === 0 ? ( // Use transactionData for the length check
        <p className="text-gray-400 text-center py-8">No transactions yet. Add your first one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Description</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Category</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Amount</th>
                <th className="text-center py-3 px-4 text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Use transactionData for .map() */}
              {transactionData.map((tx) => (
                <tr key={tx._id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                  <td className="py-3 px-4 text-gray-300">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-white">{tx.description}</td>
                  <td className="py-3 px-4 text-gray-300">{tx.category}</td>
                  <td className={`py-3 px-4 text-right font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(tx._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;