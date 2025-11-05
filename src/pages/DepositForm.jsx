import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { FaBackward } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../context/UserContext";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import toast, { Toaster } from "react-hot-toast";
import { useModal } from "../helper/useModal";
import LoginModal from "../components/authentication/LoginModal";
import SignupModal from "../components/authentication/SignupModal";

const DepositForm = () => {
  const { user, fetchUser } = useUser();
  const { slug } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: loginModal, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();
  const { isOpen: signupModal, openModal: openSignupModal, closeModal: closeSignupModal } = useModal();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    coins: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form?.coins){
      toast.error("Please insert coins.");
      return;
    }
    navigate("/checkout", { state: { dollars:form?.coins, slug } })
    return;

    try {
      setLoading(true);
      const body = {
        brand_slug: slug,
        provider: "ShadowStrike",
        load_amount: form?.coins,
      };
      const response = await axiosWithHeaders.post(apis.DEPOSITS, body);
      if (response?.status === 201) {
        toast.success("Transaction Processed");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      toast.error("Transaction failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const close = () => {
   toast.dismiss();
   toast.error("You need to login to continue");
  };

  const back = () => {
    closeLoginModal();
    closeSignupModal();
    openModal();
  };

  useEffect(() => {
    const tk = localStorage.getItem("token");
    if (!tk) {
      openModal();
    }
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(apis.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData?.email,
          password: formData?.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Login failed");
      console.log("logindata", data);
      localStorage.setItem("token", data?.token);
      localStorage.setItem("ss_user", JSON.stringify({role:data?.role,user_id:data?.user_id}))
      setTimeout(() => {
        fetchUser();
        closeLoginModal();
        closeModal();
      }, 1000);
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setLoading(true);
    try {
      if (formData?.password !== formData?.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await fetch(apis.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          email: formData?.email,
          phone_number: formData?.phone,
          password: formData?.password,
          role_id: 3,
          slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      toast.success("Signup successful! Please login.");
      closeSignupModal();
      openLoginModal();
    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden banner-section index-one">
        <div className="overlay">
      <div className="bg-transparent text-light min-vh-100 d-flex flex-column">
        {/* Content */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
          <div className="bg-dark text-white rounded-4 shadow-lg p-5 position-relative" style={{ maxWidth: 500, width: "100%" }}>
            <h2 className="fw-bold mb-4">Deposit</h2>

            {/* Instructions */}
            <ul className="text-light-50 small mb-4">
              <li className="mb-2">✓ Please fill out the form below to deposit to a brand.</li>
              <li className="mb-2">✓ Select a server provider from the dropdown.</li>
              <li>✓ Easily pay with your preferred methods.</li>
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email from the server provider"
                  className="form-control bg-dark text-light border-secondary"
                  value={form?.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Coins</label>
                <input
                  type="number"
                  name="coins"
                  placeholder="Enter the coins you would like to load"
                  className="form-control bg-dark text-light border-secondary"
                  value={form?.coins}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn btn-warning w-100 fw-semibold ${loading ? "disabled" : ""}`}
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </form>

            {/* Back Button */}
            <div className="position-absolute top-0 end-0 mt-1 me-2">
              <button
                className="text-light d-flex align-items-center gap-2"
                onClick={() => navigate("/dashboard")}
              >
                <FaBackward /> Back to Dashboard
              </button>
            </div>
          </div>
        </div>


        {/* MUI Welcome Modal */}
        <Modal open={isOpen} onClose={close}>
          <Box
            className="text-light rounded-4 p-5 mx-auto"
            sx={{
              minWidth: 500,
              minHeight: 300,
              maxWidth: 500,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              background:"#161829",
              border:"1px solid #fff"
            }}
          >
            <h5 className="fw-bold mb-2">Welcome</h5>
            <p className="text-secondary mb-4">Please login or register</p>
            <div className="d-flex flex-column gap-3">
              <button
                className="box-style btn-box text-dark text-center justify-content-center fw-bold"
                onClick={() => {
                  closeModal();
                  openLoginModal();
                }}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light fw-bold"
                onClick={() => {
                  closeModal();
                  openSignupModal();
                }}
              >
                Register
              </button>
            </div>
          </Box>
        </Modal>

        {/* Login & Signup Modals */}
        <LoginModal isOpen={loginModal} onClose={back} onBack={back} onLogin={handleLogin} />
        <SignupModal isOpen={signupModal} onClose={back} onBack={back} onSignup={handleSignup} />
      </div>
      </div>
       <Toaster
                position="top-center"
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

export default DepositForm;
