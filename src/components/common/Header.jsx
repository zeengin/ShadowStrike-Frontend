import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import logo from "../../assets/logo-text.png";
import { NavLink } from "react-router-dom";
import { Avatar, Menu, MenuItem, Divider, ListItemIcon, Box, Typography } from "@mui/material";
import { Settings, Logout, AccountBalance, Dashboard } from "@mui/icons-material";
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from "../../context/UserContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import $ from "jquery";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showUserAvatar, setShowUserAvatar] = useState(false);
  const open = Boolean(anchorEl);
  const { user, token, loading } = useUser();


  useEffect(() => {
    var sidebarBtn = $(".sidebar-wrapper .sidebar-close");
    var changeBtn = $(".sidebar-wrapper .sidebar-close i");
    var sidebarWrapper = $(".sidebar-wrapper");

    sidebarBtn.on("click", function () {
      sidebarWrapper.toggleClass("sidebar-active");
      changeBtn.html(
        sidebarWrapper.hasClass("sidebar-active") ? "close" : "menu_open"
      );
    });

    $(".mobile-menu").on("click", function () {
      $(".sidebar-wrapper").toggleClass("active-mobile sidebar-active");
      $(".mobile-menu i").toggleClass("menu-active");
      $(".mobile-menu i").html(
        $(".mobile-menu i").hasClass("menu-active") ? "close" : "menu_open"
      );
    });
  }, []);


  useEffect(() => {
    console.log(user);
    if (user) {
      setShowUserAvatar(true)
    }
  }, [token, user])

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
          <div class="sidebar-close mobile-menu">
            <button class="d-center d-grid d-xl-none">
              <i class="material-symbols-outlined mat-icon fs-four"> menu_open </i>
              <span class="fs-six">MENU</span>
            </button>
          </div>
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
              {(!showUserAvatar) ? (
                <>
                  <NavLink
                    to="/login"
                    className="box-style btn-sm py-1 rounded-pill btn-box d-center"
                  >
                    Login / Register
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="box-style btn-sm py-1 rounded-pill btn-box d-center"
                  >
                    Contact Us
                  </NavLink>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5, // space between avatar and name
                      cursor: "pointer",
                    }}
                    onClick={handleClick} // clicking anywhere opens the menu
                  >
                    <Avatar sx={{ bgcolor: "#cfa122" }}>
                      {user?.first_name?.[0] || "U"}
                    </Avatar>
                    <span className="font-bold">
                      {user?.first_name || "User"}
                    </span>
                    <span>
                      {open ?
                        <ArrowDropUpIcon fontSize="medium" sx={{ color: "white" }} />
                        : <ArrowDropDownIcon fontSize="medium" sx={{ color: "white" }} />}
                    </span>
                  </Box>
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
                        <strong>{user?.first_name} {user?.last_name}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
                          {user?.email}
                        </div>
                      </div>
                    </MenuItem>
                    <Divider sx={{ bgcolor: "#444" }} />
                    <MenuItem component={NavLink} to="/profile" onClick={handleClose}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" sx={{ color: "white" }} />
                      </ListItemIcon>
                      My Profile
                    </MenuItem>
                    <MenuItem component={NavLink} to="/purchase" onClick={handleClose}>
                      <ListItemIcon>
                        <AccountBalance fontSize="small" sx={{ color: "white" }} />
                      </ListItemIcon>
                      Buy Coins
                    </MenuItem>
                    <MenuItem component={NavLink} to="/dashboard" onClick={handleClose}>
                      <ListItemIcon>
                        <HistoryIcon fontSize="small" sx={{ color: "white" }} />
                      </ListItemIcon>
                      History
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
            </div>
          </div>
        </nav>
      </header>
      <Sidebar />
    </>
  );
}
