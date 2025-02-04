import React, { useState } from "react";
import axios from "axios";

const AddExpense = ({ addExpense, darkMode }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { description, category, amount: parseFloat(amount) };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        newExpense
      );
      addExpense(response.data);
      alert("Expense added successfully!");
      setDescription("");
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`card p-4 shadow-sm mb-4 ${
        darkMode ? "bg-secondary text-light" : "bg-light"
      }`}
    >
      <h2 className="card-title">Add Expense</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
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
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
