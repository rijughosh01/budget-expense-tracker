import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Collapse } from "react-bootstrap";

const categoryColors = {
  food: "food",
  transport: "transport",
  entertainment: "entertainment",
  bills: "bills",
  health: "health",
};

const ExpenseList = ({
  expenses,
  setExpenses,
  budgets,
  setBudgets,
  darkMode,
}) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    minAmount: "",
    maxAmount: "",
    keyword: "", // Add keyword to state
  });
  const [sortOptions, setSortOptions] = useState({
    sortBy: "date",
    order: "asc",
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/budgets");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [setBudgets]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          params: { ...filters, ...sortOptions },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [filters, sortOptions, setExpenses]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    setSortOptions({
      ...sortOptions,
      [e.target.name]: e.target.value,
    });
  };

  const calculateSpent = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`);
      setBudgets(budgets.filter((budget) => budget._id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    return (
      (!filters.startDate || expenseDate >= startDate) &&
      (!filters.endDate || expenseDate <= endDate) &&
      (!filters.category || expense.category === filters.category) &&
      (!filters.minAmount || expense.amount >= parseFloat(filters.minAmount)) &&
      (!filters.maxAmount || expense.amount <= parseFloat(filters.maxAmount)) &&
      (!filters.keyword ||
        expense.description
          .toLowerCase()
          .includes(filters.keyword.toLowerCase()))
    );
  });

  return (
    <div className={`${darkMode ? "bg-dark text-light" : ""}`}>
      <h2 className="mt-4">Filter Expenses</h2>
      <Card>
        <Card.Header
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          style={{ cursor: "pointer" }}
        >
          Filters
        </Card.Header>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form className="row g-3 mb-4">
              <div className="col-md-6">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Categories</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="bills">Bills</option>
                  <option value="health">Health</option>
                  {/* Add more categories here */}
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  placeholder="Min Amount"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  placeholder="Max Amount"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Keyword"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  className="form-control"
                />
              </div>
            </form>
          </div>
        </Collapse>
      </Card>

      <h2 className="mt-4">Sort Expenses</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-6">
          <select
            name="sortBy"
            value={sortOptions.sortBy}
            onChange={handleSortChange}
            className="form-select"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="order"
            value={sortOptions.order}
            onChange={handleSortChange}
            className="form-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>

      <h2 className="mt-4">Budgets</h2>
      <ul className="list-group mb-4">
        {budgets.map((budget) => (
          <li
            key={budget._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              darkMode ? "bg-secondary text-light" : ""
            } ${categoryColors[budget.category]}`}
          >
            {budget.category}: ${calculateSpent(budget.category)} / $
            {budget.budget}
            <button
              onClick={() => deleteBudget(budget._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Expenses</h2>
      <ul className="list-group">
        {filteredExpenses.map((expense) => (
          <li
            key={expense._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              darkMode ? "bg-secondary text-light" : ""
            } ${categoryColors[expense.category]}`}
          >
            {expense.description} - {expense.category} - ${expense.amount} on{" "}
            {new Date(expense.date).toLocaleDateString()}
            <button
              onClick={() => deleteExpense(expense._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
