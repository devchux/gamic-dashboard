import React from "react";
import StatsGraph from "../../components/stats/stats-graph";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="graph-wrapper">
        <StatsGraph title="Total number of server" amount="1,926" />
        <StatsGraph title="total users" amount="3,142" />
      </div>
    </div>
  );
};

export default Dashboard;
