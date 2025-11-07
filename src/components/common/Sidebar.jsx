import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar-wrapper ${isOpen ? "sidebar-active active-mobile" : ""}`}>
      <div className="position-relative">
        <div className="sidebar-content d-center flex-columnn">
          <div className="header-section d-block">
            <div className="navbar bg-transparent">
              <ul className="navbar-nav d-xl-flex gap-2 gap-md-5 py-4 py-lg-0 px-4 px-lg-0 align-self-center h-100">
                <li><NavLink to="/" onClick={toggleSidebar}>Home</NavLink></li>
                <li><NavLink to="/about-us" onClick={toggleSidebar}>About Us</NavLink></li>
                <li><NavLink to="/services" onClick={toggleSidebar}>Our Services</NavLink></li>
                <li><NavLink to="/technology" onClick={toggleSidebar}>Technologies</NavLink></li>
                <li><NavLink to="/entertainment" onClick={toggleSidebar}>Entertainment</NavLink></li>
                <li><a href="#contact" onClick={toggleSidebar}>Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
