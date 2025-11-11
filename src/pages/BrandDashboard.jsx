import React, { useState } from "react";
import { FaRegCircleCheck, FaCopy } from "react-icons/fa6";
import LimitCard from "../components/brand/LimitCard";
import { useUser } from "../context/UserContext";

const BrandDashboard = () => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const copyItems = [
    `/${user?.brand?.slug}/deposits`,
    `/${user?.brand?.slug}/withdrawals`,
  ];

  return (
    <>
      <div className="container-fluid py-4">
        <div className="row g-4">
          {copyItems?.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card bg-main text-light border-secondary shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <span className="fs-5 fst-italic">{item}</span>
                  <span
                    role="button"
                    onClick={() => handleCopy(item)}
                    className="ms-3"
                  >
                    {copied === item ? (
                      <FaRegCircleCheck size={22} color="limegreen" />
                    ) : (
                      <FaCopy size={22} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 col-md-6">
            <LimitCard title="Deposit Limits" />
          </div>

          <div className="col-12 col-md-6">
            <LimitCard title="Withdrawal Limits" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDashboard;
