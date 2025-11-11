import React from "react";

const LimitCard = ({ title }) => {
  return (
    <div className="card bg-main text-light border-secondary shadow-sm h-100">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h5 className="fw-semibold">{title}</h5>
            <p className="fs-4 fw-bold text-success mt-2 mb-0">$0.00</p>
          </div>
          <div className="text-end">
            <small className="text-secondary">Completed</small>
            <p className="fs-5 fw-semibold text-white mb-0">0</p>
          </div>
        </div>

        {/* Details */}
        <ul className="list-unstyled mb-0 border-top border-secondary pt-3">
          <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
            <span className="text-secondary">Settlement</span>
            <span className="text-white">16 Sep 2025 – 30 Sep 2025</span>
          </li>
          <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
            <span className="text-secondary">Amount Received</span>
            <span className="text-white">0.00</span>
          </li>
          <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
            <span className="text-secondary">Total Withdrawals</span>
            <span className="text-white">0.00</span>
          </li>
          <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
            <span className="text-secondary">Withdrawal Limit</span>
            <span className="text-white">0.00</span>
          </li>
          <li className="d-flex justify-content-between py-2 border-bottom border-secondary">
            <span className="text-secondary">Used Withdrawal Limit</span>
            <span className="text-white">0.00%</span>
          </li>
          <li className="d-flex justify-content-between py-2">
            <span className="text-secondary">Remaining Withdrawal Limit</span>
            <span className="text-white">0.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LimitCard;
