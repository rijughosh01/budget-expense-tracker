import React from "react";

const Dashboard = ({ totalSpending, spendingByCategory, remainingBudget }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Total Spending</h5>
            <p className="card-text">${totalSpending}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Spending by Category</h5>
            <ul className="list-group list-group-flush">
              {Object.entries(spendingByCategory).map(([category, amount]) => (
                <li key={category} className="list-group-item">
                  {category}: ${amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card bg-light shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Remaining Budget</h5>
            <ul className="list-group list-group-flush">
              {Object.entries(remainingBudget).map(([category, amount]) => (
                <li key={category} className="list-group-item">
                  {category}: ${amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
