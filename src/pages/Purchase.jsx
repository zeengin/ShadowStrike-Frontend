import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function PointsPurchase() {
    const [points, setPoints] = useState(10);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePricing, setAgreePricing] = useState(false);

    const dollars = points; // 1:1 mapping
    const isCheckoutDisabled = !(agreeTerms && agreePricing && points > 0);

    const handlePointsChange = (e) => {
        setPoints(e?.target.value);
    };

    const handleDollarsChange = (e) => {
        setPoints(e?.target.value);
    };

    return (
        <div className="container pt-120 pb-120 bg-transparent text-white">
            <h2 className="mb-4 fw-bold">Purchase Coins</h2>
            <div className="row g-5">
                {/* Left Section */}
                <div className="col-md-6">
                    {/* <h4 className="fw-semibold mb-3">Buy Points</h4> */}
                    <p className="text-white-50">
                        Purchase coins to use across games. <br />
                        <span className="fw-semibold text-white">1 Dollar = 1 Coin</span>
                    </p>
                    <div className="mb-3 mt-3">
                        <div className="single-input text-start">
                            <label htmlFor="coins">Coins</label>
                            <input
                                type="number"
                                id="coins"
                                name="Coins"
                                placeholder="Enter coins"
                                value={points}
                                onChange={handlePointsChange}
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="single-input text-start">
                            <label htmlFor="coins">Dollars</label>
                            <input
                                type="number"
                                id="dollars"
                                name="Dollars"
                                placeholder="Enter Amount"
                                value={dollars}
                                onChange={handleDollarsChange}
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-md-6">
                    <h4 className="fw-semibold mb-3">Cart Totals</h4>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span className="fw-semibold">${dollars || 0}</span>
                    </div>
                    <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                        <span>Total</span>
                        <span>${dollars || 0}</span>
                    </div>

                    {/* Checkboxes from MUI */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                sx={{ color: "white" }}
                            />
                        }
                        label={
                            <span>
                                I accept the <a href="#" className="text-info">Terms & Policies</a>
                            </span>
                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreePricing}
                                onChange={(e) => setAgreePricing(e.target.checked)}
                                sx={{ color: "white" }}
                            />
                        }
                        label="I accept the pricing"
                    />

                    <p className="text-white-50 small mb-3">
                        <strong>Billing Terms:</strong> This purchase is a{" "}
                        <b>one-time sale</b>. Please review the details before
                        proceeding to checkout.
                    </p>

                    <button
                        className={`btn w-100 fw-semibold ${isCheckoutDisabled ? "btn-secondary" : "btn-warning"
                            }`}
                        disabled={isCheckoutDisabled}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
