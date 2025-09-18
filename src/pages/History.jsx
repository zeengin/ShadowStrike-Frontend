import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import Table from "../components/common/Table";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import moment from "moment/moment";

export default function History() {
  const [tab, setTab] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithHeaders.get(apis.TRANSANCTIONS);

      // assuming API returns { deposits: [], withdrawals: [] }
      const mappedDeposits = data?.map((txn) => ({
        id: txn?.transactionId,
        date: moment( txn?.date).format("YYYY-MM-DD"),
        provider: txn?.provider,
        amountpaid: `$${txn?.amountPaid}`,
        amountloaded: `${txn?.amountLoaded} Coins`,
        status: txn?.status,
        receipt: (
          <Button
            variant="outlined"
            size="small"
            href={txn.receiptUrl || "#"}
            sx={{ color: "white", borderColor: "white" }}
          >
            View
          </Button>
        ),
        dispute: (
          <Button
            variant="outlined"
            size="small"
            color="error"
            href="#"
          >
            Raise
          </Button>
        ),
      }));

      const mappedWithdrawals = data.withdrawals?.map((txn) => ({
        id: txn.id,
        date: txn.date,
        provider: txn.provider,
        amountpaid: `$${txn.amountPaid}`,
        amountloaded: `-${txn.points} Points`,
        status: txn.status,
        receipt: (
          <Button
            variant="outlined"
            size="small"
            href={txn.receiptUrl || "#"}
            sx={{ color: "white", borderColor: "white" }}
          >
            View
          </Button>
        ),
        dispute: (
          <Button
            variant="outlined"
            size="small"
            color="error"
            href="#"
          >
            Raise
          </Button>
        ),
      }));

      setDeposits(mappedDeposits);
      setWithdrawals(mappedWithdrawals);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container pt-120 pb-120" style={{minHeight: "50vh"}}>
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
          {/* <Tab label="Withdrawals" /> */}
        </Tabs>
      </div>

      <Table
        columns={columns}
        rows={tab === 0 ? deposits : withdrawals}
        loading={loading}
      />
    </div>
  );
}
