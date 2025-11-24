import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

export default function CreateTicketModal({ open, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = ["Deposit", "Withdrawal", "Invoice", "Disputes"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  const validate = () => {
    let temp = {};
    if (!formData.subject.trim()) temp.subject = "Subject is required";
    if (!formData.category) temp.category = "Category is required";
    if (!formData.priority) temp.priority = "Priority is required";
    if (!formData.description.trim())
      temp.description = "Description is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
      if (onCreated) onCreated(formData);
    }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "80%",
          maxWidth: "900px",
          bgcolor: "#111319",
          color: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          mx: "auto",
          mt: "5vh",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create Support Ticket
        </Typography>

        {/* FORM */}
        <div className="container-fluid">

          {/* SUBJECT + CATEGORY + PRIORITY */}
          <div className="row mb-4">

            {/* Subject */}
            <div className="col-12 col-lg-4 mb-3">
              <label className="form-label fw-semibold">Subject *</label>
              <input
                type="text"
                name="subject"
                className="form-control bg-dark text-light border-secondary"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
              />
              {errors.subject && (
                <small className="text-danger">{errors.subject}</small>
              )}
            </div>

            {/* Category */}
            <div className="col-12 col-lg-4 mb-3">
              <label className="form-label fw-semibold">Category *</label>
              <select
                name="category"
                className="form-select bg-dark text-light border-secondary"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c.toLowerCase()}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <small className="text-danger">{errors.category}</small>
              )}
            </div>

            {/* Priority */}
            <div className="col-12 col-lg-4 mb-3">
              <label className="form-label fw-semibold">Priority *</label>
              <select
                name="priority"
                className="form-select bg-dark text-light border-secondary"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="">Select priority</option>
                {priorities.map((p) => (
                  <option key={p} value={p.toLowerCase()}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <small className="text-danger">{errors.priority}</small>
              )}
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Description *</label>
            <textarea
              name="description"
              rows={5}
              className="form-control bg-dark text-light border-secondary"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
            />
            {errors.description && (
              <small className="text-danger">{errors.description}</small>
            )}
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mt-4 justify-content-end">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="box-style btn-box text-dark"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
