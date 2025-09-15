import React, { useState } from "react";
import Sidebar from "./Sidebar";
import logo from "../../assets/logo-text.png";
import { NavLink } from "react-router-dom";
import { Avatar, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { Settings, Logout, AccountBalance } from "@mui/icons-material";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const UserData = JSON.parse(localStorage.getItem("ss_user") || "{}");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("ss_user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="header-section header-menu">
        <nav className="navbar w-100 flex-nowrap px-2 py-0 ps-0 navbar-expand-xl">
          {/* Logo */}
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

          {/* Navbar Links */}
          <div className="collapse navbar-collapse d-flex gap-10 w-100 justify-content-end px-8 pe-2">
            <ul className="navbar-nav d-xl-flex d-none gap-5 py-4 py-lg-0 m-auto pe-20 align-self-center">
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services">Our Services</NavLink>
              </li>
              <li>
                <NavLink to="/technology">Technologies</NavLink>
              </li>
              <li>
                <NavLink to="/entertainment">Entertainment</NavLink>
              </li>
            </ul>

            {/* Right Area */}
            <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center pe-8">
              {!UserData ? (
                <NavLink
                  to="/login"
                  className="box-style btn-sm py-1 rounded-pill btn-box d-center"
                >
                  Login / Sign up
                </NavLink>
              ) : (
                <>
                  <Avatar
                    sx={{ bgcolor: "#1976d2", cursor: "pointer" }}
                    onClick={handleClick}
                  >
                    {UserData.name?.[0] || "U"}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        bgcolor: "#222",
                        color: "white",
                        borderRadius: 2,
                        minWidth: 180,
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <div>
                        <strong>{UserData.name}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                          {UserData?.email || "test@example.com"}
                        </div>
                      </div>
                    </MenuItem>
                    <Divider sx={{ bgcolor: "#444" }} />
                    <MenuItem component={NavLink} to="/purchase" onClick={handleClose}>
                      <ListItemIcon>
                        <AccountBalance fontSize="small" sx={{ color: "white" }} />
                      </ListItemIcon>
                      Buy Points
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "red" }} />
                      </ListItemIcon>
                      <span style={{ color: "red" }}>Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              <NavLink
                to="/contact"
                className="box-style btn-sm py-1 rounded-pill btn-box d-center"
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      <Sidebar />
    </>
  );
}
