import React, { useEffect, useState, useRef } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "../assets/css/checkout.css";
import cardsIcons from "../assets/icon/cards.png";
import { useLocation, useNavigate } from "react-router-dom";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import toast from "react-hot-toast";
import braintree from "braintree-web";
import { PayPalScriptProvider, BraintreePayPalButtons } from "@paypal/react-paypal-js";


const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(location?.state?.dollars || 0);
  const [clientToken, setClientToken] = useState(null);
  const [braintreeInstance, setBraintreeInstance] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    phone: "",
  });

  const cardRef = useRef();
  const cvvRef = useRef();
  const expiryRef = useRef();

  // 1️⃣ Get Braintree client token
  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await axiosWithHeaders.get(apis.GENERATE_PAYMENT_TOKEN);
        setClientToken(res.data);
      } catch (err) {
        toast.error("Unable to initiate checkout. Try again.");
      }
    }
    fetchToken();
  }, []);

  // 2️⃣ Initialize Hosted Fields
  useEffect(() => {
    if (!clientToken) return;

    async function setupBraintree() {
      try {
        const client = await braintree.client.create({
          authorization: clientToken,
        });

        const hostedFieldsInstance = await braintree.hostedFields.create({
          client,
          styles: {
            input: {
              color: "#fff",
              "font-size": "14px",
              "background-color": "transparent",
              "border-color": "#555",
              "border-radius": "6px",
              "padding": "8px 10px",
              "height": "40px"
            },
            ":focus": { color: "" },
            ".invalid": { color: "#ff6b6b" },
            ".valid": { color: "#51cf66" },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiry",
              placeholder: "MM/YY",
            },
          },
        });

        setBraintreeInstance(hostedFieldsInstance);
      } catch (err) {
        console.error(err);
        toast.error("Failed to initialize payment fields.");
      }
    }

    setupBraintree();
  }, [clientToken]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phone: value,
      country: country.countryCode,
    });
  };

  // 3️⃣ Submit handler
  const handleSubmit = async (nonce) => {
    setLoading(true);
    try {

      // Send payment data to backend
      const response = await axiosWithHeaders.post(apis.PROCESS_PAYMENT, {
        load_amount: amount?.toString(),
        brand_slug: location?.state?.slug ||  "SHDO2025",
        acceptTerms: true,
        acceptPricing: true,
        payment_method_nonce: nonce,
        address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
        phone: formData.phone,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      });

      if (response?.status === 200 || response?.status === 201) {
        toast.success(`Purchase successful! You bought ${amount} coins.`);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(response?.data?.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Payment failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state || !location.state.dollars) navigate("/purchase");
  }, []);

  return (
    <div className="checkout-dark-wrapper d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="checkout-dark-box rounded-4 p-4">
              <form onSubmit={(e)=>e.preventDefault()}>
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

                    {/* Billing Inputs */}
                    <div className="row g-3">
                      {[
                        ["firstname", "First Name"],
                        ["lastname", "Last Name"],
                        ["email", "Email"],
                        ["address", "Address"],
                        ["city", "City"],
                        ["state", "State"],
                        ["zip", "ZIP Code"],
                      ].map(([name, label]) => (
                        <div className="col-md-6" key={name}>
                          <label className="form-label text-light">{label}</label>
                          <input
                            type={name === "email" ? "email" : "text"}
                            name={name}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            value={formData[name]}
                            onChange={handleChange}
                            className="py-1"
                            required
                          />
                        </div>
                      ))}

                      <div className="col-md-6">
                        <label className="form-label text-light">Country & Phone</label>
                        <PhoneInput
                          country={formData.country}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          inputClass="w-100 bg-transparent text-light border-secondary py-1 min-h-25"
                          buttonClass="bg-transparent border-secondary"
                          dropdownClass="bg-dark text-light"
                        />
                      </div>
                    </div>

                    {/*  Card Fields (hosted) */}
                    {/* <div className="mt-4">
                      <label className="form-label text-light">Card Details</label>

                      <div className="row g-3">
                        <div className="col-12">
                          <div
                            id="card-number"
                            ref={cardRef}
                            className="form-control bg-transparent text-light border-secondary "
                            style={{ height: "42px" }}
                          ></div>
                        </div>
                        <div className="col-6">
                          <div
                            id="cvv"
                            ref={cvvRef}
                            className="form-control bg-transparent text-light border-secondary "
                            style={{ height: "42px" }}
                          ></div>
                        </div>
                        <div className="col-6">
                          <div
                            id="expiry"
                            ref={expiryRef}
                            className="form-control bg-transparent text-light border-secondary "
                            style={{ height: "42px" }}
                          ></div>
                        </div>
                      </div>
                    </div> */}

                    <div className="my-3 d-flex align-items-center">
                      <img src={cardsIcons} alt="cards" height="20" className="me-2" />
                    </div>

                    {/* <button
                      type="submit"
                      className="btn btn-warning w-100 mt-4 py-2 fw-semibold fs-6"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button> */}
                    {clientToken &&
                    <PayPalScriptProvider options={{
                      clientId: "test",
                      dataClientToken: clientToken
                    }}>
                      
                        <BraintreePayPalButtons
                          createOrder={(data, actions) => {
                            return actions.braintree.createPayment({
                              flow: "checkout",
                              amount: amount,
                              currency: "USD",
                              intent: "capture"
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const payload = await actions.braintree.tokenizePayment(data);
                            handleSubmit(payload.nonce)
                          }}
                          className="paypal-button-style"
                        />
                    </PayPalScriptProvider>}
                  </div>

                  {/* Right Section */}
                  <div className="col-md-5">
                    <h4 className="fw-bold text-white mb-3">Checkout</h4>
                    <div className="p-3 border rounded-3 bg-secondary bg-opacity-10 border-secondary">
                      <h6 className="mb-3 fw-semibold text-light">Order Summary</h6>
                      <div className="d-flex justify-content-between text-light">
                        <span>Subtotal:</span>
                        <span className="fw-bold">${amount}</span>
                      </div>
                      <hr className="border-secondary" />
                      <div className="d-flex justify-content-between">
                        <span className="text-light">Total:</span>
                        <span className="fw-bold text-success">${amount}</span>
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
