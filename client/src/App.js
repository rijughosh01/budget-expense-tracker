import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import AddBudget from './components/AddBudget';
import Dashboard from './components/Dashboard';
import ExpenseStatistics from './components/ExpenseStatistics';
import axios from 'axios';


const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false); 
  const [showStatistics, setShowStatistics] = useState(false); 

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
  const highestExpense = Math.max(...expenses.map(expense => expense.amount), 0);
  const lowestExpense = Math.min(...expenses.map(expense => expense.amount), 0);
  const averageMonthlyExpense = totalSpending / (new Date().getMonth() + 1);

  const spendingByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const remainingBudget = budgets.reduce((acc, budget) => {
    const spent = expenses
      .filter(expense => expense.category === budget.category)
      .reduce((total, expense) => total + expense.amount, 0);
    acc[budget.category] = budget.budget - spent;
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Expense Tracker</h1>
      <div className="d-flex justify-content-end mb-4">
        <i
          className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} fs-2 cursor-pointer`}
          onClick={toggleDarkMode}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        ></i>
        <i
          className={`bi bi-bar-chart-fill fs-2 cursor-pointer`}
          onClick={toggleDashboard}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        ></i>
        <i
          className={`bi bi-card-list fs-2 cursor-pointer`}
          onClick={toggleStatistics}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
      {showDashboard && (
        <Dashboard
          totalSpending={totalSpending}
          spendingByCategory={spendingByCategory}
          remainingBudget={remainingBudget}
        />
      )}
      {showStatistics && (
        <ExpenseStatistics
          totalSpending={totalSpending}
          highestExpense={highestExpense}
          lowestExpense={lowestExpense}
          averageMonthlyExpense={averageMonthlyExpense}
        />
      )}
      <div className="row">
        <div className="col-md-6">
          <AddExpense addExpense={addExpense} darkMode={darkMode} />
        </div>
        <div className="col-md-6">
          <AddBudget addBudget={addBudget} darkMode={darkMode} />
        </div>
      </div>
      <ExpenseList expenses={expenses} setExpenses={setExpenses} budgets={budgets} setBudgets={setBudgets} darkMode={darkMode} />
    </div>
  );
};

export default App;
