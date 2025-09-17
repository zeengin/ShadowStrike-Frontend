import React, { useState } from "react";
import logo from "../assets/logo-text.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { apis } from "../apis";

// ✅ Import MUI Checkbox & FormControlLabel
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Signup = () => {
    const navigate = useNavigate();

    // form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ✅ checkbox state
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch(apis?.SIGNUP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: formData?.firstName,
                    lastname: formData?.lastName,
                    email: formData?.email,
                    phone: formData?.phone,
                    password: formData?.password,
                    confirmPassword: formData?.password,
                    role: "user",
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
                                                    placeholder="Enter your password"
                                                    value={formData.password}
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
                                                    className="box-style btn-box"
                                                    disabled={loading || !acceptedTerms} // ✅ disable until checked
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
        </section>
    );
};

export default Signup;
