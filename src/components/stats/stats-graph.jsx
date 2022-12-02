import React from "react";
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
        data={[65, 59, 80, 81, 26, 55, 40]}
      />
    </div>
  );
};

export default StatsGraph;
