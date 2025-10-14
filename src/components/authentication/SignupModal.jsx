import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SignupModal = ({ isOpen, onClose, onBack, onSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signupForm, setSignupForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSignup(signupForm);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="position-absolute top-50 start-50 translate-middle text-white rounded-4 shadow p-4 p-lg-5"
        style={{
          maxWidth: "600px",
          width: "90%",
          outline: "none",
          background:"#161824",
          border:"1px solid #fff"
        }}
      >
        <div className="d-flex flex-column">
          {/* Header */}
          <div className="mb-3">
            <Typography variant="h5" className="fw-semibold text-light mb-2">
              Register
            </Typography>
            <Typography variant="body2" className="text-secondary">
              Please fill out the form below to create your account.
            </Typography>
          </div>

          {/* Form Fields */}
          <div className="mt-3">
            {/* Name fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  name="first_name"
                  value={signupForm.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className=""
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  name="last_name"
                  value={signupForm.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className=""
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter your email"
                className=""
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={signupForm.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className=""
                autoComplete="off"
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupForm.password}
                onChange={handleChange}
                placeholder="Enter password"
                className=" pe-5"
                autoComplete="off"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 bottom-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <FaEye className="text-secondary" size={20} />
                ) : (
                  <FaEyeSlash className="text-secondary" size={20} />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 position-relative">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className=" pe-5"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="position-absolute top-50 bottom-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-secondary" size={20} />
                ) : (
                  <FaEyeSlash className="text-secondary" size={20} />
                )}
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-end align-items-center gap-2 mt-4">
            <button
              onClick={onBack}
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="btn-box box-style px-4 py-2 rounded text-dark"
            >
              Sign Up
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SignupModal;
