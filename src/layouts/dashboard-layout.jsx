import React from "react";
import { Outlet } from "react-router-dom";
import { LogoIcon } from "../assets/svgs";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="logo-wrapper">
        <LogoIcon />
      </div>
      <div className="dashboard-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
