import React from "react";
import Pagination from "../../components/pagination";
import StatsGraph from "../../components/stats/stats-graph";
import UserCounts from "../../components/stats/user-counts";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const {
    summary,
    guilds,
    currentPage,
    setSize,
    size,
    getUserKey,
    getGuildKey,
    userState,
    setUserState,
    guildState,
    setGuildState,
    getGuildType,
    pages,
    onNextPageClick,
    onPrevPageClick,
    onPageClick,
    minPage,
    maxPage,
  } = useDashboard();

  return (
    <div className="dashboard-page">
      <div className="graph-wrapper">
        <StatsGraph
          title="Total number of server"
          amount={summary["guildCount"] || 0}
          data={summary[getGuildKey().key]}
          state={guildState}
          setState={setGuildState}
        />
        <StatsGraph
          title="total users"
          amount={summary["userCount"] || 0}
          data={summary[getUserKey().key]}
          state={userState}
          setState={setUserState}
        />
      </div>
      <div className="user-counts-wrapper">
        <UserCounts
          dailyActiveUser={summary?.dailyActiveUser}
          weeklyActiveUser={summary?.weeklyActiveUser}
          monthlyActiveUser={summary?.monthlyActiveUser}
        />
      </div>
      <div className="server-table-wrapper">
        <h4 className="table-title">Servers</h4>
        <div className="server-table">
          <div className="table-header">
            <div>Name</div>
            <div>member</div>
            <div>type</div>
            <div>online</div>
          </div>
          {guilds.length &&
            guilds?.map((guild) => (
              <div className="table-row" key={guild?.id}>
                <div>{guild?.guildName}</div>
                <div>{guild?.members}</div>
                <div>{getGuildType(guild?.type)}</div>
                <div>{guild?.onlineMembers}</div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Pagination
          size={size}
          setSize={setSize}
          currentPage={currentPage}
          maxPageLimit={maxPage}
          minPageLimit={minPage}
          totalPages={pages}
          onPrevClick={onPrevPageClick}
          onNextClick={onNextPageClick}
          onPageChange={onPageClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
