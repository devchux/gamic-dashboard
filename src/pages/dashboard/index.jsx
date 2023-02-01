import React from "react";
import { BeatLoader } from "react-spinners";
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
    loading,
    commaSeperatedNumber,
  } = useDashboard();

  return (
    <div className="dashboard-page">
      <div className="graph-wrapper">
        <StatsGraph
          title="Total Number of Servers"
          amount={commaSeperatedNumber(summary["guildCount"] || 0)}
          data={summary[getGuildKey().key]}
          state={guildState}
          setState={setGuildState}
        />
        <StatsGraph
          title="Total Users"
          amount={commaSeperatedNumber(summary["userCount"] || 0)}
          data={summary[getUserKey().key]}
          state={userState}
          setState={setUserState}
        />
      </div>
      <div className="user-counts-wrapper">
        <UserCounts
          dailyActiveUser={commaSeperatedNumber(summary?.dailyActiveUser || 0)}
          weeklyActiveUser={commaSeperatedNumber(
            summary?.weeklyActiveUser || 0
          )}
          monthlyActiveUser={commaSeperatedNumber(
            summary?.monthlyActiveUser || 0
          )}
        />
      </div>
      <div className="server-table-wrapper">
        <h4 className="table-title">Servers</h4>
        <div className="server-table">
          <div className="table-header">
            <div>Name</div>
            <div>Type</div>
            <div>Members</div>
            {/* <div>Online</div> */}
          </div>
          {guilds.length &&
            guilds?.map((guild) => (
              <div className="table-row" key={guild?.id}>
                <div>{guild?.guildName}</div>
                <div>{getGuildType(guild?.type)}</div>
                <div>{commaSeperatedNumber(guild?.members || 0)}</div>

                {/* <div>{commaSeperatedNumber(guild?.onlineMembers || 0)}</div> */}
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
      {loading && (
        <div className="preloader">
          <BeatLoader color="#ffffff" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
