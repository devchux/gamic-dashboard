import React from "react";
import { LogoIcon } from "../assets/svgs";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="logo-wrapper">
        <LogoIcon />
      </div>
      <div className="dashboard-content-wrapper">{children}</div>
    </div>
  );
};

export default DashboardLayout;
