const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://first-project:AD1yviieNPycK6oj@cluster0.tfozh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// Define the expense schema and model
const expenseSchema = new mongoose.Schema({
  description: String,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);

// Define the budget schema and model
const budgetSchema = new mongoose.Schema({
  category: String,
  budget: Number,
});

const Budget = mongoose.model("Budget", budgetSchema);

// Routes for expenses
app.post("/api/expenses", async (req, res) => {
  const expense = new Expense(req.body);
  try {
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/expenses", async (req, res) => {
  const { startDate, endDate, category, minAmount, maxAmount, sortBy, order } =
    req.query;
  const filter = {};

  if (startDate && endDate) {
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (category) {
    filter.category = category;
  }
  if (minAmount && maxAmount) {
    filter.amount = {
      $gte: parseFloat(minAmount),
      $lte: parseFloat(maxAmount),
    };
  }

  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }

  try {
    const expenses = await Expense.find(filter).sort(sort);
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes for budgets
app.post("/api/budgets", async (req, res) => {
  const budget = new Budget(req.body);
  try {
    await budget.save();
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).send(budgets);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/api/budgets/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!budget) {
      return res.status(404).send();
    }
    res.send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/api/budgets/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).send();
    }
    res.send(budget);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
