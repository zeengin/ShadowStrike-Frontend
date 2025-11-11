import React from "react";

export default function CountCard({ title, count, desc }) {
  return (
    <div
      className="rounded-3 shadow-sm text-light h-100"
      style={{
        backgroundColor: "#0f1724",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "20px 24px",
        minWidth: "220px",
        transition: "all 0.3s ease",
      }}
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6
            className="fw-semibold mb-0"
            style={{ color: "#b7f778", fontSize: "15px" }}
          >
            {title}
          </h6>
          <h4
            className="fw-bold mb-0"
            style={{
              color: "#f1f1f1",
              fontSize: "24px",
              lineHeight: "1",
            }}
          >
            {count}
          </h4>
        </div>

        <small
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            lineHeight: "1.4",
          }}
        >
          {desc}
        </small>
      </div>
    </div>
  );
}
