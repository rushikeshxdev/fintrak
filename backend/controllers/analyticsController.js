// controllers/analyticsController.js

const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

// Utility function to format date into YYYY-MM
const getYearMonth = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

// --- @desc    Get financial summary and prediction
// --- @route   GET /api/analytics/summary
// --- @access  Private (Requires JWT)
const getSummary = asyncHandler(async (req, res) => {
    // 1. Fetch all transactions for the user
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: 1 });
    
    // --- 2. Calculate Monthly Trend and Category Breakdown ---
    const monthlyData = {};
    const categoryBreakdown = {};

    transactions.forEach(transaction => {
        const yearMonth = getYearMonth(transaction.date);
        const amount = transaction.amount;
        const category = transaction.category;
        
        // Calculate monthly balance
        if (!monthlyData[yearMonth]) {
            monthlyData[yearMonth] = { income: 0, expense: 0, net: 0 };
        }
        
        if (transaction.type === 'income') {
            monthlyData[yearMonth].income += amount;
        } else {
            monthlyData[yearMonth].expense += amount;
        }
        monthlyData[yearMonth].net = monthlyData[yearMonth].income - monthlyData[yearMonth].expense;

        // Calculate category breakdown (only for expenses, typically)
        if (transaction.type === 'expense') {
            categoryBreakdown[category] = (categoryBreakdown[category] || 0) + amount;
        }
    });

    // Convert monthlyData object to an array for easy charting on the frontend
    const monthlyTrend = Object.keys(monthlyData).map(key => ({
        month: key,
        ...monthlyData[key]
    }));

    // Convert categoryBreakdown object to an array
    const categories = Object.keys(categoryBreakdown).map(key => ({
        category: key,
        amount: categoryBreakdown[key]
    }));


    // --- 3. Simple Cash Flow Prediction Logic ---
    let prediction = [];
    const historyLength = monthlyTrend.length;
    
    if (historyLength >= 3) {
        // Find the average net expense/income over the last 3 months
        const recentMonths = monthlyTrend.slice(-3);
        const totalNet = recentMonths.reduce((sum, item) => sum + item.net, 0);
        const monthlyAverage = totalNet / 3;

        // Project the next 3 months based on this average
        for (let i = 1; i <= 3; i++) {
            const nextDate = new Date();
            nextDate.setMonth(nextDate.getMonth() + i);
            const nextMonthYear = getYearMonth(nextDate);
            
            prediction.push({
                month: nextMonthYear,
                // Prediction is the average, showing estimated net flow
                net_prediction: parseFloat(monthlyAverage.toFixed(2)) 
            });
        }
    }

    // --- 4. Send the final aggregated data ---
    res.status(200).json({
        success: true,
        monthlyTrend,
        categoryBreakdown: categories,
        cashFlowPrediction: prediction
    });
});

module.exports = { getSummary };
