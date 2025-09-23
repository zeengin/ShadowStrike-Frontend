import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "../assets/css/Checkout.css";
import cardsIcons from "../assets/icon/cards.png";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    phone: "",
    card: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phone: value,
      country: country.countryCode, // updates selected country
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Payment Submitted! ");
  };

  return (
    <div className="checkout-dark-wrapper d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="checkout-dark-box rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-5">
                  {/* Left Section */}
                  <div className="col-md-7">
                    <h4 className="fw-bold text-white mb-3">Billing Details</h4>
                    <p className="small text-secondary">
                      Billed-as{" "}
                      <a href="/" className="text-info fw-semibold">
                        shadowstrike.fun
                      </a>
                    </p>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-light">Name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          autoComplete="off"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          autoComplete="off"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">Address:</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Enter your address"
                          autoComplete="off"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">City:</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Enter your city"
                          autoComplete="off"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">State:</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="Enter your state"
                          autoComplete="off"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-light">ZIP Code:</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="Enter your zip code"
                          autoComplete="off"
                          required
                          value={formData.zip}
                          onChange={handleChange}
                          className="py-1"
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="text-light">
                          Country & Phone:
                        </label>
                        <PhoneInput
                          country={formData.country}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          inputClass="w-100 bg-transparent text-light border-secondary py-1"
                          buttonClass="bg-transparent border-secondary"
                          dropdownClass="bg-dark text-light"
                        />
                      </div>
                    </div>

                    {/* Payment Section */}
                    <h5 className="fw-bold text-white mt-4">Payment Details</h5>
                    <div className="position-relative">
                      <input
                        type="text"
                        id="card"
                        name="card"
                        placeholder="XXXX XXXX XXXX XXXX"
                        autoComplete="off"
                        required
                        value={formData.card}
                        onChange={handleChange}
                        className=" py-1"
                      />
                    </div>

                    <div className="mt-3 d-flex align-items-center">
                      <img
                        src={cardsIcons}
                        alt="cards"
                        height="30"
                        className="me-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning w-100 mt-4 py-2 fw-semibold fs-6"
                    >
                      Pay Now
                    </button>
                  </div>

                  {/* Right Section */}
                  <div className="col-md-5">
                    <h4 className="fw-bold text-white mb-3">Checkout</h4>
                    <div className="p-3 border rounded-3 bg-secondary bg-opacity-10 border-secondary">
                      <h6 className="mb-3 fw-semibold text-light">
                        Order Summary
                      </h6>
                      <div className="d-flex justify-content-between text-light">
                        <span>Subtotal:</span>
                        <span className="fw-bold">$50.00</span>
                      </div>
                      <hr className="border-secondary" />
                      <div className="d-flex justify-content-between">
                        <span className="text-light">Total :</span>
                        <span className="fw-bold text-success">$50.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
