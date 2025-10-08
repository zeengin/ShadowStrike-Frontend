import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, CircularProgress } from "@mui/material";
import Table from "../components/common/Table";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(apis.DEPOSITS);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoadingId, setButtonLoadingId] = useState(null); // <-- track clicked row

  const depositColumns = [
    "Id",
    "Date",
    "Provider",
    "Amount Paid",
    "Amount Loaded",
    "Status",
    "Brand",
    "Receipt",
  ];
  const withdrawColumns = [
    "Id",
    "Date",
    "Provider",
    "Amount",
    "Status",
    "Brand",
    "Receipt",
  ];


  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithHeaders.get(tab);
      console.log("data",data);
      
      const mappedDeposits = data?.data?.map((txn) => ({
        id: txn?.id,
        date: moment(txn?.created_at).format("YYYY-MM-DD"),
        provider: txn?.provider || "Shadowstrike",
        amountpaid: `$${txn?.load_amount}`,
        amountloaded: `${txn?.load_amount} Coins`,
        status: txn?.status,
        brand: txn?.Brand?.slug,
        receipt: (
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/receipt/${txn?.id}`)}
            sx={{ color: "white", borderColor: "white", minWidth: 80 }}
          >
            {/* {buttonLoadingId == txn?._id ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              "View"
            )} */}
             View
          </Button>
        ),
      }));

      const mappedWithdrawals = data.data?.map((txn) => ({
        id: txn.id,
        date:  moment(txn?.created_at).format("YYYY-MM-DD"),
        provider: txn.provider || "shadowstrike",
        amount: `$${txn.amount}`,
        status: txn.status,
        brand: txn?.Brand?.slug,
        amount: `$${txn?.amount}`,
        receipt: (
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(txn?._id)}
            sx={{ color: "white", borderColor: "white", minWidth: 80 }}
          >
            {buttonLoadingId === txn?._id ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              "View"
            )}
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

const handleViewReceipt = async (transactionId) => {
  try {
    setButtonLoadingId(transactionId);

    const response = await axiosWithHeaders.get(
      `${apis.DEPOSITS}/${transactionId}/receipt`,
      { responseType: "blob" } // important for files
    );

    // Create a blob from the response
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);

    // Try to get filename from response headers
    const contentDisposition = response.headers["content-disposition"];
    const date = moment().format("YYYYMMDD_HHmmss");
    let fileName = `receipt${date}.pdf`; // fallback
    if (contentDisposition && contentDisposition.includes("filename=")) {
      fileName = contentDisposition.split("filename=")[1].replace(/["']/g, "");
    }

    // Create link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release memory
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error fetching receipt:", err);
  } finally {
    setButtonLoadingId(null);
  }
};


  useEffect(() => {
    fetchTransactions();
  }, [tab]);

  return (
    <div className="container pt-120 pb-120" style={{ minHeight: "50vh" }}>
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
          <Tab label="Deposits" value={apis.DEPOSITS} />
          <Tab label="Withdrawals" value={apis.WITHDRAWALS} />
        </Tabs>
      </div>

      <Table
        columns={tab === apis.DEPOSITS ? depositColumns : withdrawColumns}
        rows={tab === apis.DEPOSITS ? deposits : withdrawals}
        loading={loading}
      />
    </div>
  );
}
