import React from "react";
import Pagination from "../../components/pagination";
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
      <div className="server-table">
        <div>
          <Pagination
            currentPage={1}
            maxPageLimit={5}
            minPageLimit={0}
            totalPages={16}
            onPrevClick={() => null}
            onNextClick={() => null}
            onPageChange={() => null}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
