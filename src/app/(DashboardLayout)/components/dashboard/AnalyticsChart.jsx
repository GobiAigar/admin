"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/analytics/views");
        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.error("Fetch GA Data Error:", err);
      }
    };

    fetchAnalytics();
  }, []);

  const categories = chartData.map((item) => item.dimensionValues[0].value);
  console.log("chartData", chartData);
  const pageViews = chartData.map((item) => Number(item.metricValues[0].value));
  const activeUsers = chartData.map((item) =>
    Number(item.metricValues[1].value)
  );

  const options = {
    chart: {
      id: "analytics-bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories,
    },
  };

  const series = [
    {
      name: "Хуудсыг үзсэн",
      data: pageViews,
    },
    {
      name: "Идэвхтэй хэрэглэгч",
      data: activeUsers,
    },
  ];

  return (
    <DashboardCard title="Веб сайтын үзүүлэлтүүд">
      <Box>
        {chartData.length === 0 ? (
          <Typography>Loading...</Typography>
        ) : (
          <Chart options={options} series={series} type="bar" height={400} />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AnalyticsChart;
