import React from "react";

const ExpenseStatistics = ({
  totalSpending,
  highestExpense,
  lowestExpense,
  averageMonthlyExpense,
}) => {
  return (
    <div className="row mt-4">
      <div className="col-md-3 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Total Spending</h5>
            <p className="card-text">${totalSpending.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Highest Expense</h5>
            <p className="card-text">${highestExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Lowest Expense</h5>
            <p className="card-text">${lowestExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Avg Monthly Expense</h5>
            <p className="card-text">${averageMonthlyExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
