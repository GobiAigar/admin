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

  const allowedPaths = [
    "/mn/home",
    "/en/home",
    "/mn/product",
    "/en/product",
    "/mn/contact",
    "/en/contact",
    "/mn/sustainability",
    "/en/sustainability",
    "/mn/news",
    "/en/news",
  ];

  const aggregatedData = allowedPaths.map((path) => {
    const matchingRows = chartData.filter((item) => {
      const p = item.dimensionValues.find((d) =>
        d.value.startsWith("/")
      )?.value;
      return p === path;
    });

    const totalPageViews = matchingRows.reduce((sum, item) => {
      return sum + Number(item.metricValues[0].value);
    }, 0);

    const totalActiveUsers = matchingRows.reduce((sum, item) => {
      return sum + Number(item.metricValues[1].value);
    }, 0);

    return {
      path,
      pageViews: totalPageViews,
      activeUsers: totalActiveUsers,
    };
  });

  const categories = aggregatedData.map((item) => item.path);
  const pageViews = aggregatedData.map((item) => item.pageViews);
  const activeUsers = aggregatedData.map((item) => item.activeUsers);

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
        {aggregatedData.length === 0 ? (
          <Typography>Уншиж байна...</Typography>
        ) : (
          <Chart options={options} series={series} type="bar" height={400} />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AnalyticsChart;
