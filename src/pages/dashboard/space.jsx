import React from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/test.png";
import { BackArrowIcon, GreenBatchIcon } from "../../assets/svgs";
import AreaGraph from "../../components/graph/area-graph";
import Select from "../../components/input/select";
import UserCounts from "../../components/stats/user-counts";

const Space = () => {
  const navigate = useNavigate();
  
  const userCounts = [
    {
      title: "Members",
      amount: "1025",
    },
    {
      title: "Messages Sent",
      amount: "10",
    },
    {
      title: "Daily Active Users",
      amount: "300",
    },
    {
      title: "Weekly Active Users",
      amount: "1000",
    },
    {
      title: "Monthly Active Users",
      amount: "1000",
    },
  ];

  return (
    <div className="space-detail-page">
      <div className="header">
        <div className="background" />
        <div className="content">
          <button onClick={() => navigate(-1)}>
            <BackArrowIcon />
            Back
          </button>
          <div className="space-info">
            <div className="profile-image-wrapper">
              <img src={profileImage} alt="" />
            </div>
            <div className="space-info-name">
              <h4>Gamehouse</h4>
              <GreenBatchIcon />
            </div>
            <p className="space-info-description">
              Gamehouse is a community space where you can join, socialize and
              communicate with other people and have fun plus events.
            </p>
          </div>
        </div>
      </div>
      <section className="space-detail-main">
        <div className="user-counts-wrapper">
          <UserCounts lg data={userCounts} />
        </div>
        <div className="space-detail-graph-wrapper">
          <div className="wallet-insights-wrapper">
            <div className="top">
              <h4>MESSAGES SENT</h4>
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
        </div>
      </section>
    </div>
  );
};

export default Space;
