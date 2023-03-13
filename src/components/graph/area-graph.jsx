import React, { useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Button from "../button/button";

const AreaGraph = ({
  series,
  categories,
  hasSortButtons = false,
  showLegend = true,
}) => {
  const [state, setState] = useState("deposits");
  const graphReferences = useMemo(
    () => ({
      series,
      options: {
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        colors: series.length === 1 ? ["#00BA50"] : ["#BA7B00", "#00BA50"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: {
          labels: {
            style: {
              colors: "#9A9A9A",
            },
          },
        },
        xaxis: {
          type: "numeric",
          categories,
          labels: {
            style: {
              colors: "#9A9A9A",
            },
          },
        },
        legend: {
          show: showLegend,
          position: "top",
          horizontalAlign: "left",
          itemMargin: {
            horizontal: 24,
            vertical: 0,
          },
          labels: {
            colors: "#9A9A9A",
          },
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return `
              <div class="area-graph-tooltip ${
                series.length > 1 && seriesIndex === 0 ? "bg-orange" : ""
              }">
                <h4>${series[seriesIndex][dataPointIndex]}</h4>
                <p>${w.globals.labels[dataPointIndex]}</p>
              </div>
              `;
          },
        },
      },
    }),
    [categories, series, showLegend]
  );
  return (
    <div className="area-graph-wrapper">
      <ReactApexChart
        type="area"
        height={441}
        options={graphReferences.options}
        series={graphReferences.series}
      />
      {hasSortButtons && (
        <div className="button-wrapper">
          <Button
            activated={state === "deposits"}
            onClick={() => setState("deposits")}
          >
            Deposits
          </Button>
          <Button
            activated={state === "withdrawals"}
            onClick={() => setState("withdrawals")}
          >
            Withdrawals
          </Button>
          <Button
            activated={state === "swapped"}
            onClick={() => setState("swapped")}
          >
            Swapped
          </Button>
        </div>
      )}
    </div>
  );
};

export default AreaGraph;
