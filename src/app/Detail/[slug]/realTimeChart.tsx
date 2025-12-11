"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Helper to generate demo data (same as your example)
const generateDayWiseTimeSeries = (
  start: number,
  count: number,
  range: { min: number; max: number }
) => {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = start + i * 86400000; // 1 day
    const y =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

    series.push({ x, y });
    i++;
  }
  return series;
};

const StackedAreaChart = () => {
  const series = [
    {
      name: "South",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        { min: 10, max: 60 }
      ),
    },
    {
      name: "North",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        { min: 10, max: 20 }
      ),
    },
    // {
    //   name: "Central",
    //   data: generateDayWiseTimeSeries(
    //     new Date("11 Feb 2017 GMT").getTime(),
    //     20,
    //     { min: 10, max: 15 }
    //   ),
    // },
  ];

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
