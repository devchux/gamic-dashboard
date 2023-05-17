import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import AreaGraph from "../../components/graph/area-graph";
import Select from "../../components/input/select";
import Pagination from "../../components/pagination";
import StatsGraph from "../../components/stats/stats-graph";
import UserCounts from "../../components/stats/user-counts";
import OverviewCard from "../../components/wallet/overview-card";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const [sortStatus, setStortStatus] = useState({ by: "desc", type: "name" });
  const navigate = useNavigate();
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

  const walletOverview = [
    {
      variant: "wallet",
      amount: "303600",
      title: "TOTAL WALLETS",
      rating: "+257 (0.16%)",
    },
    {
      variant: "deposit",
      amount: "228",
      title: "TOTAL DEPOSITS",
      rating: "-24 (9.52%)",
    },
    {
      variant: "withdrawal",
      amount: "47",
      title: "TOTAL WITHDRAWALS",
      rating: "+257 (0.16%)",
    },
    {
      variant: "swapped",
      amount: "47",
      title: "TOTAL SWAPPED",
      rating: "+257 (0.16%)",
    },
  ];

  const userCounts = [
    {
      title: "Daily Active Users",
      amount: commaSeperatedNumber(summary?.dailyActiveUser || 0),
    },
    {
      title: "Weekly Active Users",
      amount: commaSeperatedNumber(summary?.weeklyActiveUser || 0),
    },
    {
      title: "Monthly Active Users",
      amount: commaSeperatedNumber(summary?.monthlyActiveUser || 0),
    },
  ];

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
        <UserCounts data={userCounts} />
      </div>
      <div className="wallet-insights-wrapper">
        <div className="top">
          <h4>ONLINE USERS</h4>
          <div>
            <p>9 Jan</p>
            <Select
              fitContent
              options={[
                { value: 10, label: "Last 24 hours" },
                { value: 20, label: "Last 24 hours" },
                { value: 50, label: "Last 24 hours" },
              ]}
            />
          </div>
        </div>
        <AreaGraph
          showLegend={false}
          series={[
            {
              name: "Users",
              data: [31, 40, 28, 51, 42, 109, 100],
            },
          ]}
          categories={[5, 10, 15, 20, 25, 30, 35]}
        />
      </div>
      <div className="wallet-overview-wrapper">
        <h4 className="wallet-title">Wallet Overview</h4>
        <div className="wallet-overview">
          {walletOverview.map((x, i) => (
            <OverviewCard key={i} {...x} />
          ))}
        </div>
      </div>
      <div className="wallet-insights-wrapper">
        <div className="top">
          <h4>WALLET INSIGHTS</h4>
          <div>
            <p>9 Jan</p>
            <Select
              fitContent
              options={[
                { value: 10, label: "Last 24 hours" },
                { value: 20, label: "Last 24 hours" },
                { value: 50, label: "Last 24 hours" },
              ]}
            />
          </div>
        </div>
        <AreaGraph
          hasSortButtons
          series={[
            {
              name: "Transaction",
              data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
              name: "Volume",
              data: [11, 32, 45, 32, 34, 52, 41],
            },
          ]}
          categories={[5, 10, 15, 20, 25, 30, 35]}
        />
      </div>
      <div className="server-table-wrapper">
        <h4 className="table-title">Spaces</h4>
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
              <div
                className="table-row"
                key={guild?.id}
                onClick={() => navigate(`/space/${guild.id}`)}
              >
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
