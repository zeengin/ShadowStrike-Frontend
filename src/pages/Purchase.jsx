import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  Modal,
  Box,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { RiCopperCoinFill } from "react-icons/ri";
import { apis } from "../apis";
import axiosWithHeaders from "../helper/axiosWithHeaders";

const maximum = 10000000;

export default function PointsPurchase() {
  const [points, setPoints] = useState(20);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePricing, setAgreePricing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coinOptions, setCoinOptions] = useState([]);
  const [customOpen, setCustomOpen] = useState(false);
  const [customDollars, setCustomDollars] = useState("");
  const [customCoins, setCustomCoins] = useState("");
  const [error, setError] = useState(null);
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

  const fetchCoinOptions = async () => {
    try {
      setLoading(true);
      const response = await axiosWithHeaders.get(apis?.GET_PURCHASE_OPTIONS);
      const data = response?.data?.options || [];
      setCoinOptions([...data, { coins: "Custom" }]);
      setSelectedOption(data[0]?.coins);
    } catch (error) {
      console.log("Error while fetching options", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinOptions();
  }, []);

  return (
    <>
      <div className="container pt-120 pb-120 bg-transparent text-white">
        <h2 className="mb-4 fw-bold">Purchase Coins</h2>
        <div className="row g-5">
          {/* Left Section */}
          <div className="col-md-6 p-sm-4">
            <p className="text-white-50">
              Purchase coins to use across games. <br />
              <span className="fw-semibold text-white">1 Dollar = 1 Coin</span>
            </p>

            <div className="row g-2 my-2">
              {loading
                ?  Array.from({ length: 6 }).map((_, idx) => (
                    <div className="col-12 col-md-6 col-lg-4" key={idx}>
                      <Card
                        sx={{
                          backgroundColor: "#1e1e1e",
                          borderRadius: "12px",
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          width="100%"
                          height={20}
                          sx={{ bgcolor: "#333", mt: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          width="100%"
                          height={20}
                          sx={{ bgcolor: "#333", mt: 1 }}
                        />
                      </Card>
                    </div>
                  ))
                :
                  coinOptions?.map((option, idx) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={idx}>
                      <Card
                        className="text-center border-0 shadow"
                        sx={{
                          backgroundColor: "#1e1e1e",
                          color: "white",
                          borderRadius: "12px",
                          border:
                            selectedOption === option.coins
                              ? "1px solid #cfa122"
                              : "1px solid transparent",
                        }}
                      >
                        <CardActionArea onClick={() => handleSelect(option)}>
                          <Box p={1}>
                            <span
                              style={{ color: "#cfa122" }}
                              className="d-flex py-2 fs-5 align-items-center gap-1 justify-content-center"
                            >
                              <RiCopperCoinFill /> {option.coins}
                            </span>
                            {option.coins !== "Custom" && (
                              <span className="text-white-50">
                                $ {option.coins}
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
          <div className="col-md-6 bg-secondary bg-opacity-10 p-4 rounded mt-0">
            <h4 className="fw-semibold mb-3">Recharge Totals</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Total Coins</span>
              <span className="fw-semibold d-flex align-items-center">
                <RiCopperCoinFill /> {points || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
              <span>Total Dollars</span>
              <span>$ {dollars || 0}</span>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#ffc107",
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
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#ffc107",
                    },
                  }}
                />
              }
              label="I accept the pricing"
            />

            <p className="text-white-50 small mb-3">
              <strong>Billing Terms:</strong> This purchase is a{" "}
              <b>one-time sale</b>. Please review the details before proceeding
              to checkout.
            </p>

            <button
              className={`btn w-100 fw-semibold ${
                isCheckoutDisabled || loading ? "btn-secondary" : "btn-warning"
              }`}
              disabled={isCheckoutDisabled || loading}
              onClick={() => navigate("/checkout", { state: { dollars } })}
            >
              {loading ? "Recharging..." : "Recharge"}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Amount Modal */}
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
            <label htmlFor="dollars">Dollar ($)</label>
            <input
              type="number"
              id="dollars"
              name="dollars"
              placeholder="Enter your amount"
              value={customDollars}
              onChange={(e) => {
                const val = e.target.value;
                if (val < 0 || val > maximum) {
                  setError(true);
                  setTimeout(() => setError(false), 4000);
                  return;
                }
                setError(false);
                setCustomDollars(val);
                setCustomCoins(val);
              }}
              autoComplete="off"
              required
              style={{ border: error ? "1px solid #7d2b2b" : "" }}
            />
            {error && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#7d2b2b",
                  paddingInlineStart: "5px",
                }}
              >
                Amount should be between 1 to {maximum}
              </span>
            )}
          </div>

          <Typography variant="body2" gutterBottom>
            You will receive:&nbsp;
            <span className="text-warning fw-bold">
              {`${customCoins ? customCoins + " Coins" : ""}`}
            </span>
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
