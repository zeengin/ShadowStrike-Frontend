import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const LoginModal = ({ isOpen, onClose, onBack, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onLogin(loginForm);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="position-absolute top-50 start-50 translate-middle rounded-4 shadow p-4 p-lg-5"
        style={{
          maxWidth: "600px",
          width: "90%",
          outline: "none",
          background:"#161824"
        }}
      >
        <div className="d-flex flex-column text-light">
          {/* Header */}
          <div className="mb-3">
            <Typography variant="h5" className="fw-semibold text-light mb-2">
              Login
            </Typography>
            <Typography variant="body2" className="text-secondary">
              Please enter your credentials to access your account. If you don’t
              have one, you can easily sign up below.
            </Typography>
          </div>

          {/* Form Fields */}
          <div className="mt-4">
            <div className="mb-3">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                value={loginForm.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                type="email"
                className=" bg-transparent"
              />
            </div>

            <div className="mb-3 position-relative">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <input
                value={loginForm.password}
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className=" pe-5 bg-transparent"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 bottom-50 end-0 translate-middle-y me-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
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
              className="box-style btn-box py-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
