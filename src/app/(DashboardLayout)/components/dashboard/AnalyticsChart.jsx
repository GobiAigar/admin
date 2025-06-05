"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
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
    { path: "/home", label: "Нүүр" },
    { path: "/product", label: "Бүтээгдэхүүн" },
    { path: "/sustainability", label: "Тогтвортой байдал" },
    { path: "/news", label: "Мэдээ" },
    { path: "/contact", label: "Холбоо барих" },
  ];

  const aggregatedData = allowedPaths.map(({ path, label }) => {
    const matchingRows = chartData.filter((item) => {
      const p = item.path || "";
      return p === `/en${path}` || p === `/mn${path}`;
    });

    const totalPageViews = matchingRows.reduce(
      (sum, item) => sum + (item.screenPageViews || 0),
      0
    );

    const totalEngagedSessions = matchingRows.reduce(
      (sum, item) => sum + (item.engagedSessions || 0),
      0
    );

    return {
      label,
      pageViews: totalPageViews,
      engagedSessions: totalEngagedSessions,
    };
  });

  const categories = aggregatedData.map((item) => item.label);
  const pageViews = aggregatedData.map((item) => item.pageViews);
  const engagedSessions = aggregatedData.map((item) => item.engagedSessions);

  const options = {
    chart: { id: "analytics-bar", toolbar: { show: false } },
    xaxis: {
      categories,
      labels: { rotate: -45, style: { fontSize: "0.75rem" } },
      title: { text: "Хуудас" },
    },
    tooltip: { shared: true, intersect: false },
  };

  const series = [
    { name: "Хуудас үзэлт", data: pageViews },
    { name: "Үйлдэл хийсэн", data: engagedSessions },
  ];

  return (
    <DashboardCard title="Веб хуудасны үзэлтүүд">
      <Box sx={{ mb: 2 }}>
        <Select
          size="small"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <MenuItem value="day">Өнөөдөр</MenuItem>
          <MenuItem value="week">7 хоног</MenuItem>
          <MenuItem value="month">Сар</MenuItem>
          <MenuItem value="last_3_months">Сүүлийн 3 сар</MenuItem>
          <MenuItem value="last_6_months">Сүүлийн 6 сар</MenuItem>
          <MenuItem value="year">Жил</MenuItem>
        </Select>
      </Box>

      <Box>
        {aggregatedData.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress size={30} />
            <Typography ml={2}>Уншиж байна...</Typography>
          </Box>
        ) : (
          <Chart options={options} series={series} type="bar" height={400} />
        )}
      </Box>
    </DashboardCard>
  );
};

export default AnalyticsChart;
