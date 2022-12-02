import React from "react";
import StatsGraph from "../../components/stats/stats-graph";
import UserCounts from "../../components/stats/user-counts";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="graph-wrapper">
        <StatsGraph title="Total number of server" amount="1,926" />
        <StatsGraph title="total users" amount="3,142" />
      </div>
      <div className="user-counts-wrapper">
        <UserCounts />
      </div>
    </div>
  );
};

export default Dashboard;
