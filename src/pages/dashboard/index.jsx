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
import Button from "../../components/button/button";
import Modal from "../../components/modals/modal";
import { getDate } from "../../utils/helper";

const Dashboard = () => {
  const [sortStatus, setStortStatus] = useState({ by: "desc", type: "name" });
  const navigate = useNavigate();
  const {
    summary,
    guilds,
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
    walletOverview,
    modalPrompt,
    setModalPrompt,
    spaceParams,
    setSpaceParams,
    onlineActivityParams,
    setOnlineActivityParams,
    onlineActivity,
    walletInsightsParams,
    setWalletInsightsParams,
    countTrend,
    volumeTrend,
  } = useDashboard();

  console.log("lol", countTrend, volumeTrend);

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

  const walletOverviewList = [
    {
      variant: "wallet",
      amount: commaSeperatedNumber(walletOverview?.totalWallets),
      title: "TOTAL WALLETS",
      // rating: "+257 (0.16%)",
    },
    {
      variant: "transfer",
      amount: "47",
      title: "TOTAL TRANSFERS",
      // rating: "+257 (0.16%)",
    },
    {
      variant: "swapped",
      amount: "47",
      title: "TOTAL SWAPPED",
      // rating: "+257 (0.16%)",
    },
    {
      variant: "airdrop",
      amount: commaSeperatedNumber(walletOverview?.totalAirdrop),
      title: "TOTAL AIRDROP",
      // rating: "+257 (0.16%)",
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
      <div className="publish-announcement">
        <Button colored className="button" onClick={() => setModalPrompt(true)}>
          Post Announcement
        </Button>
      </div>
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
            <p>{getDate()}</p>
            <Select
              fitContent
              value={onlineActivityParams.size}
              onChange={({ target: { value } }) =>
                setOnlineActivityParams({
                  ...onlineActivityParams,
                  size: value,
                })
              }
              options={[
                { value: 12, label: "Last 12 hours" },
                { value: 24, label: "Last 24 hours" },
                { value: 48, label: "Last 48 hours" },
              ]}
            />
          </div>
        </div>
        <AreaGraph
          showLegend={false}
          series={[
            {
              name: "Users",
              data: onlineActivity?.data?.map(({ count }) => count) || [],
            },
          ]}
          categories={onlineActivity?.data?.map(({ _id }) =>
            new Date(_id).toLocaleString()
          )}
        />
      </div>
      <div className="wallet-overview-wrapper">
        <h4 className="wallet-title">Wallet Overview</h4>
        <div className="wallet-overview">
          {walletOverviewList.map((x, i) => (
            <OverviewCard key={i} {...x} />
          ))}
        </div>
      </div>
      <div className="wallet-insights-wrapper">
        <div className="top">
          <h4>WALLET INSIGHTS</h4>
          <div>
            <p>{getDate()}</p>
            <Select
              fitContent
              value={walletInsightsParams.size}
              onChange={({ target: { value } }) =>
                setWalletInsightsParams({
                  ...walletInsightsParams,
                  size: value,
                })
              }
              options={[
                { value: 12, label: "Last 12 hours" },
                { value: 24, label: "Last 24 hours" },
                { value: 48, label: "Last 48 hours" },
              ]}
            />
          </div>
        </div>
        <AreaGraph
          hasSortButtons
          status={walletInsightsParams.type}
          setStatus={(type) =>
            setWalletInsightsParams({ ...walletInsightsParams, type })
          }
          series={[
            {
              name: "Transaction",
              data: countTrend?.map(({ count }) => count) || [],
            },
            {
              name: "Volume",
              data: volumeTrend?.map(({ sum }) => sum) || [],
            },
          ]}
          categories={[...volumeTrend, ...countTrend]?.map(({ hr }) =>
            new Date(hr).toLocaleString()
          )}
        />
      </div>
      <div className="server-table-wrapper">
        <h4 className="table-title">Spaces</h4>
        <div className="server-table">
          <div className="table-header">
            <div>
              Name{" "}
              <button
                className="arrow"
                onClick={() => setStortStatus({ by: "asc", type: "name" })}
              >
                &uarr;
              </button>
              <button
                className="arrow"
                onClick={() => setStortStatus({ by: "desc", type: "name" })}
              >
                &darr;
              </button>
            </div>
            <div>Creators</div>
            <div>
              Members{" "}
              <button
                className="arrow"
                onClick={() => setStortStatus({ by: "asc", type: "members" })}
              >
                &uarr;
              </button>
              <button
                className="arrow"
                onClick={() => setStortStatus({ by: "desc", type: "members" })}
              >
                &darr;
              </button>
            </div>
            <div>Type</div>
            <div>Online</div>
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
                <div>{getGuildType(guild?.type)}</div>
                <div>{commaSeperatedNumber(guild?.onlineMembers || 0)}</div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Pagination
          size={spaceParams.size}
          setSize={(size) => setSpaceParams({ ...spaceParams, size })}
          currentPage={spaceParams.currentPage}
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
      <Modal
        isOpen={modalPrompt}
        toggle={() => setModalPrompt(!modalPrompt)}
        title="Post Announcement"
        className="dashboard-modal"
      >
        <p className="modal-label">Message Body</p>
        <textarea className="modal-text-input" placeholder="Enter text here" />
        <div className="button-wrapper">
          <Button onClick={() => setModalPrompt(false)}>Cancel</Button>
          <Button onClick={() => setModalPrompt(false)} colored>
            Post
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
