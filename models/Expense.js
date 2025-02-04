// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const budgetSchema = new mongoose.Schema({
  category: String,
  budget: Number,
});

const Expense = mongoose.model('Expense', expenseSchema);
const Budget = mongoose.model('Budget', budgetSchema);

module.exports = { Expense, Budget };
