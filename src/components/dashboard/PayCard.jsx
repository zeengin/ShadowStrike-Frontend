import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';

const PayCard = ({ icon, title, desc, titleColor, onClick }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between overflow-hidden shadow bg-dark cursor-pointer rounded-3"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className="d-flex align-items-center">
        <div
          className="p-2 d-flex justify-content-center align-items-center rounded-2"
          style={{ height: '5rem', width: '5rem' }}
        >
          {icon}
        </div>
        <div className="details text-light d-flex flex-column gap-1 ms-3">
          <h3
            className="fs-4 fw-bold mb-0"
            style={{ color: titleColor || 'inherit' }}
          >
            {title}
          </h3>
          <span className="small text-light">{desc}</span>
        </div>
      </div>
      <div
        className="p-2 d-flex justify-content-center align-items-center rounded-end"
        style={{
          height: '5rem',
          width: '5rem',
          background: 'linear-gradient(to bottom, #eab308, #b45309)',
        }}
      >
        <FaArrowRight className="p-2 rounded-circle text-white" size={45} />
      </div>
    </div>
  );
};

export default PayCard;
