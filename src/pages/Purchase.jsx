import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { apis } from "../apis";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card, CardActionArea, Modal, Box, Typography, TextField, Button,
} from "@mui/material";
import { RiCopperCoinFill } from "react-icons/ri";


const coinOptions = [
  { coins: 20, dollars: 20 },
  { coins: 50, dollars: 50 },
  { coins: 100, dollars: 100 },
  { coins: 500, dollars: 500 },
  { coins: 1000, dollars: 1000 },
  { coins: "Custom", dollars: null },
];

export default function PointsPurchase() {
  const [points, setPoints] = useState(20);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePricing, setAgreePricing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedOption, setSelectedOption] = useState(coinOptions[0]);
  const [customOpen, setCustomOpen] = useState(false);
  const [customDollars, setCustomDollars] = useState("");
  const [customCoins, setCustomCoins] = useState("");
  const navigate = useNavigate();
  const dollars = points; // 1:1 mapping
  const isCheckoutDisabled = !(agreeTerms && agreePricing && points > 0);

  const handleSelect = (option) => {
    if (option.coins === "Custom") {
      setCustomOpen(true);
    } else {
      setSelectedOption(option.coins);
      setPoints(option.coins);
    }
  };

  const handleCustomSubmit = () => {
    const coins = customDollars ? Number(customDollars) : 0;
    setPoints(coins);
    setCustomDollars(customDollars);
    setSelectedOption("Custom");
    setCustomOpen(false);
  };


  const handlePointsChange = (e) => {
    let value = Number(e?.target.value)
    if (value == 0) {
      value = ""
    }
    setPoints(value);
  };

  const handleDollarsChange = (e) => {
    let value = Number(e?.target.value)
    if (value == 0) {
      value = ""
    }
    setPoints(value);
  };

  const handleCheckout = async () => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const response = await axiosWithHeaders.post(apis.PURCHASE_COINS, {
        coins: points,
        acceptTerms: agreeTerms,
        acceptPricing: agreePricing,
      });

      const data = response?.data;
      if (response?.status === 200) {
        setAlert({
          type: "success",
          message: `Purchase successful! You bought ${points} coins.`,
        });
        setTimeout(() => {
          navigate('/history');
        }, 1500);
      } else {
        setAlert({
          type: "error",
          message: data?.message || "Purchase failed",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Network error, please try again later.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert({ type: "", message: "" })
      }, 4000);
    }
  };


  return (
    <>
      <div className="container pt-120 pb-120 bg-transparent text-white">
        <h2 className="mb-4 fw-bold">Purchase Coins</h2>
        <div className="row g-5">
          {/* Left Section */}
          <div className="col-md-6 p-4">
            <p className="text-white-50">
              Purchase coins to use across games. <br />
              <span className="fw-semibold text-white">1 Dollar = 1 Coin</span>
            </p>

            <div className="row g-2 my-2">
              {coinOptions.map((option, idx) => (
                <div className="col-12 col-md-6 col-lg-4" key={idx}>
                  <Card
                    className={`text-center border-0 shadow `}
                    sx={{
                      backgroundColor: "#1e1e1e",
                      color: "white",
                      borderRadius: "12px",
                      border: selectedOption === option.coins ? "1px solid #cfa122 !important" : "1px solid transparent",
                    }}
                  >
                    <CardActionArea onClick={() => handleSelect(option)}>
                      <Box p={1}>
                        <span style={{ color: "#cfa122" }} className="d-flex py-2 fs-5 align-items-center gap-1 justify-content-center">
                          <RiCopperCoinFill /> {option.coins}
                        </span>
                        {option.dollars && (
                          <span className="text-white-50">
                            $ {option.dollars}
                          </span>
                        )}
                        {option.coins === "Custom" && (
                          <span className="text-white-50">
                            Enter amount
                          </span>
                        )}
                      </Box>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6 bg-secondary bg-opacity-10 p-4 rounded">
            <h4 className="fw-semibold mb-3">Recharge Totals</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Total Coins</span>
              <span className="fw-semibold d-flex align-items-center"><RiCopperCoinFill /> {points || 0}</span>
            </div>
            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
              <span>Total Dollars</span>
              <span>$ {dollars || 0}</span>
            </div>

            {/* Checkboxes from MUI */}   
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    color: "white",
                    '&.Mui-checked': {
                      color: '#ffc107'
                    },
                  }}
                />
              }
              label={
                <span>
                  I accept the{" "}
                  <NavLink to="/terms&conditions" className="text-info">
                    Terms & Policies
                  </NavLink>
                </span>
              }
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreePricing}
                  onChange={(e) => setAgreePricing(e.target.checked)}
                  sx={{ color: "white",
                    '&.Mui-checked': {
                      color: '#ffc107'
                    },
                   }}
                />
              }
              label="I accept the pricing"
            />

            <p className="text-white-50 small mb-3">
              <strong>Billing Terms:</strong> This purchase is a{" "}
              <b>one-time sale</b>. Please review the details before proceeding to
              checkout. 
            </p>

            <button
              className={`btn w-100 fw-semibold ${isCheckoutDisabled || loading ? "btn-secondary" : "btn-warning"}`}
              disabled={isCheckoutDisabled || loading}
              onClick={() => navigate('/checkout', { state: { dollars } })}
            >
              {loading ? "Recharging..." : "Recharge"}
            </button> 

            {alert.message && (
              <Stack className="mt-3">
                <Alert
                  severity={alert.type}
                  variant="filled"
                  sx={{
                    bgcolor:
                      alert.type === "success" ? "success.dark" : "error.dark",
                    color: "white",
                  }}
                >
                  {alert.message}
                </Alert>
              </Stack>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        aria-labelledby="custom-modal-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Box
          sx={{
            bgcolor: "#1e1e1e",
            color: "white",
            p: 4,
            borderRadius: 2,
            width: 500,
          }}
        >
          <Typography id="custom-modal-title" variant="h6" gutterBottom>
            Enter Custom Amount
          </Typography>

          <div className="single-input text-start">
            <label htmlFor="dollars">Dollars</label>
            <input
              type="number"
              id="dollars"
              name="dollars"
              placeholder="Enter your amount"
              value={customDollars}
              onChange={(e) => {
                setCustomDollars(e.target.value);
                setCustomCoins(e.target.value);
              }}
              autoComplete="off"
              required
            />
          </div>

          <Typography variant="body2" gutterBottom>
            You will receive: &nbsp;
            <span className="text-warning fw-bold">{`${customCoins ? customCoins + " Coins" : ""}`}</span>
          </Typography>

          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={handleCustomSubmit}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </>
  );
}
