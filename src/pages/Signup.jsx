import React, { useState } from "react";
import logo from "../assets/logo-text.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { apis } from "../apis";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            let phoneValue = value;

            // Always start with +1
            if (!phoneValue.startsWith("+1")) {
                phoneValue = "+1" + phoneValue.replace(/^\+?1?/, "");
            }

            // Remove non-digit characters after +1
            phoneValue = "+1" + phoneValue.substring(2).replace(/\D/g, "");

            // Limit to +1 + 10 digits
            if (phoneValue.length > 12) {
                phoneValue = phoneValue.substring(0, 12);
            }

            setFormData({ ...formData, [name]: phoneValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {

            if (formData?.password !== formData?.confirmPassword) {
                toast.dismiss();
                toast.error("Passwords do not match");
                return;
            }


            const res = await fetch(apis.SIGNUP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData?.firstName,
                    last_name: formData?.lastName,
                    username: formData?.username,
                    email: formData?.email,
                    phone_number: formData?.phone,
                    password: formData?.password,
                    role_id: 3,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="login-section banner-section index-one overflow-hidden pt-120 pb-120"
            id="login"
        >
            <Helmet>
                <title>Shadowstrike - Sign up</title>
            </Helmet>
            <div className="overlay overflow-hidden">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        {/* Left Section */}
                        <div className="col-lg-5">
                            <div className="section-text">
                                <h4 className="sub-title">
                                    <NavLink
                                        to="/"
                                        className="navbar-brand d-flex align-items-center gap-2 ps-8"
                                    >
                                        <img
                                            src={logo}
                                            className="logo-text d-xxl-block rounded d-none"
                                            width="200"
                                            alt="logo-text"
                                        />
                                    </NavLink>
                                </h4>
                                <span className="fs-two heading mb-6">
                                    Welcome! <span>Sign up to Continue</span>
                                </span>
                                <p>
                                    Please enter your credentials to create your account. If you
                                    already have one, you can easily log in below.
                                </p>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <div
                            className="col-lg-5 me-20 mt-7 mt-lg-0"
                            style={{ background: "linear-gradient(50deg, black, #00000057)" }}
                        >
                            <form onSubmit={handleSubmit} className="p-4 loginForm">
                                <div className="form-inside p-4">
                                    <div className="row">
                                        {/* First Name */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="firstname">First Name</label>
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    name="firstName"
                                                    placeholder="Enter your first name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Last Name */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter your last name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Email */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="loginEmail">Email</label>
                                                <input
                                                    type="email"
                                                    id="loginEmail"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Phone */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="loginPhone">Phone</label>
                                                <input
                                                    type="tel"
                                                    id="loginPhone"
                                                    name="phone"
                                                    placeholder="Enter your Phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                                <small style={{ fontSize: "0.8rem", color: "#aaa" }}>
                                                    Format: +1 followed by 10 digits
                                                </small>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="loginPassword">Password</label>
                                                <input
                                                    type="password"
                                                    id="loginPassword"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-sm-12">
                                            <div className="single-input text-start">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Error / Success */}
                                        {error && (
                                            <div className="col-sm-12 mt-3 text-danger text-center">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="col-sm-12 mt-3 text-success text-center">
                                                {success}
                                            </div>
                                        )}

                                        {/* ✅ Terms & Conditions Checkbox */}
                                        <div className="col-sm-12 mt-3">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={acceptedTerms}
                                                        onChange={(e) =>
                                                            setAcceptedTerms(e.target.checked)
                                                        }
                                                        // color="secondary"
                                                        sx={{
                                                            color: "white", // unchecked color
                                                            "&.Mui-checked": {
                                                                color: "#cfa122", // checked color
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <span>
                                                        I accept &nbsp;
                                                        <NavLink
                                                            to="/terms&conditions"
                                                            className="fw-bold text-decoration-underline"
                                                        >
                                                            terms & conditions
                                                        </NavLink>
                                                    </span>
                                                }
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-sm-12 mt-4">
                                            <div className="btn-area text-center">
                                                <button
                                                    type="submit"
                                                    className={`box-style btn-box`}
                                                    style={{
                                                        cursor: (loading || !acceptedTerms) ? "no-drop" : "pointer"
                                                    }}
                                                    disabled={loading || !acceptedTerms}
                                                >
                                                    {loading ? "Signing up..." : "Sign up"}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Login Text */}
                                        <div className="col-sm-12 mt-3 text-center">
                                            <p>
                                                Already have an account?{" "}
                                                <NavLink to="/login" className="fw-bold">
                                                    Login
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        zIndex: 1000000000000,
                        background: "#1e1e1e",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        marginTop: "80px"
                    },
                    success: {
                        style: { background: "#1f3d2b", color: "#b6f2c8" }, // greenish
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        style: { background: "#3d1f1f", color: "#f2b6b6" }, // reddish
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />
        </section>
    );
};

export default Signup;
