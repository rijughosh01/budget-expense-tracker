const express = require("express");
const router = express.Router();
const { Expense, Budget } = require("../models/Expense");

// Expense routes
router.post("/expenses", async (req, res) => {
  const expense = new Expense(req.body);
  try {
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/expenses/:id", async (req, res) => {
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

router.delete("/expenses/:id", async (req, res) => {
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

// Budget routes
router.post("/budgets", async (req, res) => {
  const budget = new Budget(req.body);
  try {
    await budget.save();
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).send(budgets);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/budgets/:id", async (req, res) => {
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

router.delete("/budgets/:id", async (req, res) => {
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

module.exports = router;
