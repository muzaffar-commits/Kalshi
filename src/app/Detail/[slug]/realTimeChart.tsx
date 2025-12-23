"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { prepareSeries } from "@/utils/Content"; // Your prepareSeries function

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StackedAreaChart = ({ data }: { data: any }) => {
  const series = prepareSeries(data);

  const options: ApexOptions = {
    chart: {
      type: "area",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    colors: ["#008FFB", "#00E396"],

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.8,
        stops: [0, 90, 100],
      },
    },

    legend: {
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -10,
      offsetX: 0,
      labels: {
        colors: "#000",
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#6b7280",
        },
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
        },
      },
      tickPlacement: "on",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      min: 0,
      max: 1.5, // Adjust based on your data (Yes + No should sum ≈ 1)
      labels: {
        style: {
          colors: "#6b7280",
        },
        formatter: (val: number) => val.toFixed(2),
      },
      title: {
        text: undefined, // Remove y-axis title if any
      },
    },

    grid: {
      borderColor: "#7A85F5",
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },

    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
      y: {
        formatter: (val: number) => `${val.toFixed(3)}`,
      },
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
