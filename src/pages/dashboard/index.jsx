import React from "react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/pagination";
import StatsGraph from "../../components/stats/stats-graph";
import UserCounts from "../../components/stats/user-counts";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const [sortStatus, setStortStatus] = useState({ by: "desc", type: "name" });
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

  const sort = () => {
    const sorted = Array.from(guilds || []);

    sorted.sort(function (a, b) {
      if (sortStatus.type === "name") {
        return sortStatus.by === "desc"
          ? new Date(b.createdTime) - new Date(a.createdTime)
          : new Date(a.createdTime) - new Date(b.createdTime);
      }
      return sortStatus.by === "desc"
        ? b.members - a.members
        : a.members - b.members;
    });

    return sorted;
  };

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
          onlineUserCount={commaSeperatedNumber(summary?.onlineUserCount || 0)}
          last24HourActiveUser={commaSeperatedNumber(
            summary?.last24HourActiveUser || 0
          )}
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
            <div>
              Name{" "}
              <button
                class="arrow"
                onClick={() => setStortStatus({ by: "asc", type: "name" })}
              >
                &uarr;
              </button>
              <button
                class="arrow"
                onClick={() => setStortStatus({ by: "desc", type: "name" })}
              >
                &darr;
              </button>
            </div>
            <div>Creators</div>
            <div>
              Members{" "}
              <button
                class="arrow"
                onClick={() => setStortStatus({ by: "asc", type: "members" })}
              >
                &uarr;
              </button>
              <button
                class="arrow"
                onClick={() => setStortStatus({ by: "desc", type: "members" })}
              >
                &darr;
              </button>
            </div>
            <div>
              Online{" "}
              <button
                class="arrow"
                onClick={() =>
                  setStortStatus({ by: "asc", type: "onlineMembers" })
                }
              >
                &uarr;
              </button>
              <button
                class="arrow"
                onClick={() =>
                  setStortStatus({ by: "desc", type: "onlineMembers" })
                }
              >
                &darr;
              </button>
            </div>
            <div> Type</div>
          </div>
          {guilds.length &&
            sort()?.map((guild) => (
              <div className="table-row" key={guild?.id}>
                <div>{guild?.guildName}</div>
                <div>{guild?.createUserName}</div>
                <div>{commaSeperatedNumber(guild?.members || 0)}</div>
                <div>{commaSeperatedNumber(guild?.onlineMembers || 0)}</div>
                <div>{getGuildType(guild?.type)}</div>
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
