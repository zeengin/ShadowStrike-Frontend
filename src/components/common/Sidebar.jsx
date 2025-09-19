import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <div className="position-relative">
        <div className="sidebar-content d-center flex-columnn">
          <div className="header-section d-block">
            <div className="navbar bg-transparent">
              <ul className="navbar-nav d-xl-flex gap-2 gap-md-5 py-4 py-lg-0 px-4 px-lg-0 align-self-center">
                <li>
                  <NavLink to="/about-us" className="dropdown-item heading">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className="dropdown-item heading">
                    Our Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/technology" className="dropdown-item heading">
                    Technologies
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/entertainment">Entertainment</NavLink>
                </li>
                <li>
                  <a className="dropdown-item heading" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
