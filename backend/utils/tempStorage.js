// utils/tempStorage.js
// Temporary in-memory storage for development when database is not connected

let tempUsers = [];
let tempTransactions = [];

module.exports = {
    tempUsers,
    tempTransactions
};