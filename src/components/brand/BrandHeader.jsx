import { Avatar, Box, Menu, MenuItem, Divider, ListItemIcon, } from "@mui/material";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useUser } from "../../context/UserContext";
import {
  Logout,
  AccountBalance,
} from "@mui/icons-material";


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, token } = useUser();

  // Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("ss_user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <nav className="navbar navbar-dark bg-main px-3 shadow-sm sticky-top border-bottom border-secondary border-main">
      <button className="btn btn-dark" onClick={() => { }}>
        <FaBars size={20} />
      </button>
      {/* User Avatar and Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap:1.5,
          cursor: "pointer",
        }}
        onClick={handleMenuClick}
      >
        <Avatar sx={{ bgcolor: "#cfa122" }}>
          {user?.first_name?.[0] || "U"}
        </Avatar>
        <span className="font-bold">
          {user?.first_name || "User"}
        </span>
        {open ? (
          <ArrowDropUpIcon fontSize="medium" sx={{ color: "white" }} />
        ) : (
          <ArrowDropDownIcon fontSize="medium" sx={{ color: "white" }} />
        )}
      </Box>
      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
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
            <strong>
              {user?.first_name} {user?.last_name}
            </strong>
            <div style={{ fontSize: "0.8rem", color: "#aaa" }}>
              {user?.email}
            </div>
          </div>
        </MenuItem>

        <Divider sx={{ bgcolor: "#444" }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          <span style={{ color: "red" }}>Logout</span>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Header;
