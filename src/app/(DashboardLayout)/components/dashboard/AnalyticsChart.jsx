"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import dynamic from "next/dynamic";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("week");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/analytics/views?timeframe=${timeframe}`
        );
        const data = await res.json();
        setChartData(data);
      } catch (err) {
        console.error("Fetch GA Data Error:", err);
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  const categories = chartData.map((item) => {
    const path = item.dimensionValues.find((d) =>
      d.value.startsWith("/")
    )?.value;
    return path || "Unknown";
  });

  const pageViews = chartData.map((item) => Number(item.metricValues[0].value));
  const activeUsers = chartData.map((item) =>
    Number(item.metricValues[1].value)
  );

  const options = {
    chart: { id: "analytics-bar", toolbar: { show: false } },
    xaxis: {
      categories,
      labels: { rotate: -45, style: { fontSize: "10px" } },
      title: { text: "Хуудас" },
    },
    tooltip: { shared: true, intersect: false },
  };

  const series = [
    { name: "Хуудас үзэлт", data: pageViews },
    { name: "Идэвхтэй хэрэглэгч", data: activeUsers },
  ];

  return (
    <DashboardCard title="Веб хуудасны үзэлтүүд">
      <Box sx={{ mb: 2 }}>
        <Select
          size="small"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <MenuItem value="day">Өдөр</MenuItem>
          <MenuItem value="week">7 хоног</MenuItem>
          <MenuItem value="month">Сар</MenuItem>
          <MenuItem value="last_3_months">Сүүлийн 3 сар</MenuItem>
          <MenuItem value="last_6_months">Сүүлийн 6 сар</MenuItem>
          <MenuItem value="year">Жил</MenuItem>
        </Select>
      </Box>

      <Box>
        {chartData.length === 0 ? (
          <Typography>Уншиж байна...</Typography>
        ) : (
          <Chart options={options} series={series} type="bar" height={400} />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AnalyticsChart;
