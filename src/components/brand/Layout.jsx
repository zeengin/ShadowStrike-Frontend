import React, { useState } from "react";
import Header from "./BrandHeader";
import Sidebar from "./BrandSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow-1" style={{ marginLeft: "0" }}>
        <Header toggleSidebar={toggleSidebar} />
        <main
          className="p-4 bg-main text-white min-vh-100"
          style={{
            marginLeft: sidebarOpen ? "240px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
