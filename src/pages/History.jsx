import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, CircularProgress } from "@mui/material";
import Table from "../components/common/Table";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const ProfileTabs = [{ label: "deposit", api: apis.DEPOSITS }, { label: "withdrawal", api: apis.WITHDRAWALS }];


export default function History() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(apis.DEPOSITS);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [buttonLoadingId, setButtonLoadingId] = useState(null);

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
  ];

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      console.log("fetching transactions for tab:", tab, "and brand:", selectedBrand);
      const brandId = brandOptions.find(item => item?.value == selectedBrand?.value)
      const { data } = await axiosWithHeaders.get(`${tab}?brand_id=${brandId?.id}`);
      console.log("data", data);

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
            View
          </Button>
        ),
      }));

      const mappedWithdrawals = data?.data?.map((txn) => ({
        id: txn?.id,
        date: moment(txn?.created_at).format("YYYY-MM-DD"),
        provider: txn?.provider || "shadowstrike",
        amount: `$${txn?.amount}`,
        status: txn?.status,
        brand: txn?.Brand?.slug,
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
  }, [tab, selectedBrand]);

  const fetchBrands = async () => {
    try {
      const response = await axiosWithHeaders.get(apis.GET_PLAYER_BRANDS);
      const data = response?.data?.brands || [];
      const opts = data?.map((item) => ({
        value: item?.Brand?.slug,
        label: item?.Brand?.slug,
        id: item?.Brand?.id,
      }));
      if (opts.length > 0) {
        localStorage.setItem("brand", opts[0]?.value);
        setSelectedBrand(opts[0]);
      }
      setBrandOptions(opts);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <h2 className="fw-bold text-white mb-0">Transaction History</h2>
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          {/* Normal Select Dropdown for Brands */}
          <select
            className="bg-dark text-white border border-white rounded-2 px-2 py-1"
            style={{
              minWidth: "200px",
              outline: "none",
              backgroundColor: "#1e1e1e", // deep dark background
              color: "white",
              borderColor: "#555",
            }}
            value={selectedBrand?.value || ""}
            onChange={(e) => {
              const selected = brandOptions.find((b) => b.value === e.target.value);
              setSelectedBrand(selected);
              if (selected?.value) {
                localStorage.setItem("brand", selected.value);
                fetchTransactions();
              }
            }}
          >
            <option value="" className="bg-dark text-white">
              Select Brand
            </option>
            {brandOptions.map((brand) => (
              <option
                key={brand.id}
                value={brand.value}
                className="bg-dark text-white"
                style={{ backgroundColor: "#1e1e1e", color: "white" }}
              >
                {brand.label}
              </option>
            ))}
          </select>


          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="inherit"
            indicatorColor="primary"
            className="mt-3 mb-4 flex-shrink-0"
            sx={{
              "& .MuiTab-root": { color: "white" },
              "& .Mui-selected": { color: "#90caf9" },
            }}
          >
            {ProfileTabs.map((tab) => (
              <Tab key={tab.label} label={tab.label} value={tab.api} />
            ))}
          </Tabs>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={tab === apis.DEPOSITS ? depositColumns : withdrawColumns}
        rows={tab === apis.DEPOSITS ? deposits : withdrawals}
        loading={loading}
      />
    </>
  );
}
