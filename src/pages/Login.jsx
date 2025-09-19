import React, { useState } from "react";
import logo from "../assets/logo-text.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { apis } from "../apis";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
      const { user, fetchUser } = useUser();
  

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(apis.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": formData?.emailOrPhone,
          "password": formData?.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Login failed");
      }

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("ss_user", JSON.stringify({role:data?.role,user_id:data?.user_id}))
      fetchUser();
      setTimeout(() => window.location.href = "/", 1500);
    } catch (err) {
      setError(err.message);
      setTimeout(()=>{
        setError("");
      },3000);
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
        <title>Shadowstrike - Login</title>
      </Helmet>
      <div className="overlay">
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
                  Welcome! <span>Login to Continue</span>
                </span>
                <p>
                  Please enter your credentials to access your account. If you
                  don’t have one, you can easily sign up below.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <div
              className="col-lg-5 me-20 mt-7 mt-lg-0"
              style={{ background: "linear-gradient(45deg, black, transparent)" }}
            >
              <form onSubmit={handleSubmit} className="p-4 loginForm">
                <div className="form-inside p-4">
                  <div className="row">
                    {/* Email / Phone */}
                    <div className="col-sm-12">
                      <div className="single-input text-start">
                        <label htmlFor="loginEmail">Email</label>
                        <input
                          type="text"
                          id="loginEmail"
                          name="emailOrPhone"
                          placeholder="Enter your email or phone"
                          value={formData.emailOrPhone}
                          onChange={handleChange}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-sm-12 mt-3">
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

                    {/* Error / Success Messages */}
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

                    {/* Submit Button */}
                    <div className="col-sm-12 mt-4">
                      <div className="btn-area text-center">
                        <button
                          type="submit"
                          className="box-style btn-box"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>
                    </div>

                    {/* Signup Text */}
                    <div className="col-sm-12 mt-3 text-center">
                      <p>
                        Don’t have an account?{" "}
                        <NavLink to="/signup" className="fw-bold">
                          Sign up
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

export default Login;
