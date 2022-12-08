import React from "react";
import Button from "../button/button";
import LineGraph from "../graph/line-graph";

const StatsGraph = ({ title, amount, state, setState, data = [] }) => {
  let labels = [];
  let counts = [];

  data?.forEach(({ count, date }) => {
    labels.push(date);
    counts.push(count);
  });
  return (
    <div className="stats-graph">
      <p className="title">{title}</p>
      <h3 className="amount">{amount}</h3>
      <LineGraph labels={labels} data={counts} />
      <div className="button-wrapper">
        <Button activated={state === "daily"} onClick={() => setState("daily")}>
          Daily
        </Button>
        <Button activated={state === "weekly"} onClick={() => setState("weekly")}>
          Weekly
        </Button>
        <Button
          activated={state === "monthly"}
          onClick={() => setState("monthly")}
        >
          Monthly
        </Button>
      </div>
    </div>
  );
};

export default StatsGraph;
