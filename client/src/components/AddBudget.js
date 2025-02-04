import React, { useState } from 'react';
import axios from 'axios';

const AddBudget = ({ addBudget, darkMode }) => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBudget = { category, budget: parseFloat(budget) };

    try {
      const response = await axios.post('http://localhost:5000/api/budgets', newBudget);
      addBudget(response.data);
      alert('Budget added successfully!');
      setCategory('');
      setBudget('');
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`card p-4 shadow-sm mb-4 ${darkMode ? 'bg-secondary text-light' : 'bg-light'}`}>
      <h2 className="card-title">Add Budget</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Budget Amount"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Budget
      </button>
    </form>
  );
};

export default AddBudget;
