import React from "react";
import Button from "../button/button";
import LineGraph from "../graph/line-graph";

const StatsGraph = ({ title, amount }) => {
  return (
    <div className="stats-graph">
      <p className="title">{title}</p>
      <h3 className="amount">{amount}</h3>
      <LineGraph
        labels={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ]}
        data={[0.31, 0.32, 0.23, 0.34, 0.15, 0.21, 0.37]}
      />
      <div className="button-wrapper">
        <Button>Daily</Button>
        <Button>Weekly</Button>
        <Button active>Monthly</Button>
      </div>
    </div>
  );
};

export default StatsGraph;
