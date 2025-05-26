"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Container } from "@mui/material";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserTimeChart = () => {
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
    const date = item.dimensionValues.find((d) =>
      /^\d{4}/.test(d.value)
    )?.value;
    return date || "Unknown";
  });

  const averageSessionDuration = chartData.map((item) => {
    const seconds = Number(item.metricValues[3].value);
    const minutes = +(seconds / 60).toFixed(2);
    return minutes;
  });
  const bounceRate = chartData.map((item) =>
    Number(item.metricValues[4].value)
  );
  const newUsers = chartData.map((item) => Number(item.metricValues[2].value));

  const options = {
    chart: {
      id: "metrics-line",
      toolbar: {
        show: true,
        offsetY: -15,
        offsetX: 0,
      },
      zoom: { enabled: true },
    },
    xaxis: {
      categories,
      title: { text: "Огноо" },
    },
    stroke: { width: 3, curve: "smooth" },
    dataLabels: { enabled: false },
    markers: { size: 4 },
    yaxis: {
      title: { text: "Үзүүлэлтүүдийн утга" },
      labels: {
        formatter: (val, opts) => {
          const { seriesIndex } = opts;
          if (seriesIndex === 1) return +val.toFixed(2);
          return Math.round(val);
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val, opts) => {
          const { seriesIndex } = opts;
          if (seriesIndex === 1) return +val.toFixed(2);
          return Math.round(val);
        },
      },
    },
    legend: { position: "top" },
  };

  const series = [
    {
      name: "Дундажаар байсан хугацаа (минут)",
      data: averageSessionDuration,
    },
    {
      name: "Үйлдэл хийгээгүй гарсан хэрэглэгчийн (%)",
      data: bounceRate,
    },
    {
      name: "Шинэ хэрэглэгч",
      data: newUsers,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Хэрэглэгчийн сайтад байсан дундаж хугацаа
      </Typography>

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
          <Chart options={options} series={series} type="line" height={400} />
        )}
      </Box>
    </Container>
  );
};

export default UserTimeChart;
