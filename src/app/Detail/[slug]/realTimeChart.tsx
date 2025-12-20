"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StackedAreaChart = ({ data }: { data: any }) => {
  const series =
    data?.length > 0 &&
    data?.map((item: any) => ({
      name: item.optionName,
      data: item.data.map((d: any) => ({
        x: d.timestamp,
        y: d.price?.toFixed(2),
      })),
    }));

  const options: ApexOptions = {
    chart: {
      type: "area",
      //   height: 200,
      stacked: true,
      toolbar: { show: true },
    },

    colors: ["#008FFB", "#00E396", "#CED4DC"],

    dataLabels: { enabled: false },

    stroke: {
      curve: "monotoneCubic",
      width: 3,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },

    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: { colors: "#000" },
    },

    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#6b7280" } }, // gray text
    },

    yaxis: {
      labels: { style: { colors: "#6b7280" } },
    },

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
  };

  return (
    <div className="w-full">
      <ApexChart
        type="area"
        height={230}
        width={750}
        series={series}
        options={options}
      />
    </div>
  );
};

export default StackedAreaChart;
