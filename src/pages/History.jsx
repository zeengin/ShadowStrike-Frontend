import React, { useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import Table from "../components/common/Table";

export default function History() {
  const [tab, setTab] = useState(0);

  const deposits = [
    {
      id: "TXN001",
      date: "2025-09-16",
      provider: "PayPal",
      amountpaid: "$100",
      amountloaded: "100 Points",
      status: "Completed",
      receipt: <Button variant="outlined" size="small" href="#" sx={{ color: "white", borderColor: "white" }}>View</Button>,
      dispute: <Button variant="outlined" size="small" color="error" href="#">Raise</Button>,
    },
    {
      id: "TXN002",
      date: "2025-09-12",
      provider: "Stripe",
      amountpaid: "$50",
      amountloaded: "50 Points",
      status: "Pending",
      receipt: <Button variant="outlined" size="small" href="#" sx={{ color: "white", borderColor: "white" }}>View</Button>,
      dispute: <Button variant="outlined" size="small" color="error" href="#">Raise</Button>,
    },
  ];

  const withdrawals = [
    {
      id: "WD001",
      date: "2025-09-10",
      provider: "Bank Transfer",
      amountpaid: "$70",
      amountloaded: "-70 Points",
      status: "Completed",
      receipt: <Button variant="outlined" size="small" href="#" sx={{ color: "white", borderColor: "white" }}>View</Button>,
      dispute: <Button variant="outlined" size="small" color="error" href="#">Raise</Button>,
    },
  ];

  const columns = [
    "Id",
    "Date",
    "Provider",
    "Amount Paid",
    "Amount Loaded",
    "Status",
    "Receipt",
    "Dispute",
  ];

  return (
    <div className="container pt-120 pb-120">
      <div className="d-flex items-center justify-content-between">
        <h2 className="fw-bold text-white mb-4">Transaction History</h2>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          className="mb-4"
          sx={{
            "& .MuiTab-root": { color: "white" },
            "& .Mui-selected": { color: "#90caf9" },
          }}
        >
          <Tab label="Deposits" />
          <Tab label="Withdrawals" />
        </Tabs>
      </div>

      <Table
        columns={columns}
        rows={tab === 0 ? deposits : withdrawals}
      />
    </div>
  );
}
