import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDollarSign, FaArrowRightArrowLeft } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaCube } from "react-icons/fa";
import logo from "../../assets/logo-text.png";
import favicon from "/favicon.ico";


const AppSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <FaCube />, path: "/" },
    { name: "Deposits", icon: <FaDollarSign />, path: "/brand/deposit" },
    { name: "Withdrawals", icon: <FaArrowRightArrowLeft />, path: "/brand/withdrawal" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-main text-light border-end border-secondary border-main vh-100 position-fixed top-0 start-0 d-flex flex-column shadow-sm`}
      style={{
        width: isOpen ? "240px" : "80px",
        transition: "width 0.3s ease",
        zIndex: 1050,
      }}
    >
      {/* Logo Section */}
      <div className="d-flex align-items-center justify-content-between py-3 px-2 ">
        <Link to="/" className="text-decoration-none text-light">
          {isOpen ? (
            <img
              src={logo}
              className="logo-text"
              width="100"
              alt="logo-text"
              style={{
                transition: "all 0.3s ease",
              }}
            />
          ) : <img
            src={favicon}
            className="logo-text"
            width="20"
            alt="logo-text"
            style={{
              transition: "all 0.3s ease",
              width:'20px'
            }}
          />}
        </Link>
        <button className="text-light" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 mt-3">
        <ul className="nav nav-pills flex-column mb-auto">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center text-light ${isActive(item.path) ? "nav-active bg-brand" : "text-light"
                  }`}
                style={{
                  borderRadius: "6px",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center small text-secondary border-top border-secondary py-2">
        {isOpen && <span>© 2025 ShadowStrike</span>}
      </div>
    </div>
  );
};

export default AppSidebar;
