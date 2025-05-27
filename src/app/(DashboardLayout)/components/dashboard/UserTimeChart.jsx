"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Container } from "@mui/material";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserTimeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("day");

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

  const hoursArray = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const groupedData = {};

  if (timeframe === "day") {
    hoursArray.forEach((h) => {
      groupedData[h] = {
        sessionDuration: 0,
        bounceRate: 0,
        newUsers: 0,
        count: 0,
      };
    });
  }

  chartData.forEach((item) => {
    const dateHourStr = item.dimensionValues[0]?.value;
    if (!dateHourStr) return;

    let key;

    if (timeframe === "day") {
      if (dateHourStr.length !== 10) return;
      const hour = dateHourStr.slice(-2);
      key = `${hour}:00`;
    } else {
      const day = `${dateHourStr.slice(0, 4)}-${dateHourStr.slice(
        4,
        6
      )}-${dateHourStr.slice(6, 8)}`;
      key = day;
    }

    if (!groupedData[key]) {
      groupedData[key] = {
        sessionDuration: 0,
        bounceRate: 0,
        newUsers: 0,
        count: 0,
      };
    }

    groupedData[key].sessionDuration += Number(item.metricValues[3].value);
    groupedData[key].bounceRate += Number(item.metricValues[4].value);
    groupedData[key].newUsers += Number(item.metricValues[2].value);
    groupedData[key].count += 1;
  });

  // 🔥 1. categories-г сортлоно
  const categories =
    timeframe === "day"
      ? hoursArray
      : Object.keys(groupedData).sort((a, b) => {
          // 🔥 String-ийг Date болгож харьцуулна
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA - dateB;
        });

  const averageSessionDuration = categories.map((key) => {
    const group = groupedData[key];
    if (!group || group.count === 0) return 0;
    return +(group.sessionDuration / group.count / 60).toFixed(2);
  });

  const averageBounceRate = categories.map((key) => {
    const group = groupedData[key];
    if (!group || group.count === 0) return 0;
    return +(group.bounceRate / group.count).toFixed(2);
  });

  const totalNewUsers = categories.map((key) => {
    const group = groupedData[key];
    if (!group || group.count === 0) return 0;
    return group.newUsers;
  });

  const options = {
    chart: {
      id: "metrics-line",
      toolbar: { show: true, offsetY: -15 },
      zoom: { enabled: true },
    },
    xaxis: {
      categories,
      title: { text: timeframe === "day" ? "Цаг" : "Өдөр" },
    },
    stroke: { width: 3, curve: "smooth" },
    dataLabels: { enabled: false },
    markers: { size: 4 },
    yaxis: {
      title: { text: "Үзүүлэлтүүдийн утга" },
      labels: { formatter: (val) => +val.toFixed(2) },
    },
    tooltip: {
      y: { formatter: (val) => +val.toFixed(2) },
    },
    legend: { position: "top" },
  };

  const series = [
    { name: "Дундажаар байсан хугацаа (минут)", data: averageSessionDuration },
    {
      name: "Үйлдэл хийгээгүй гарсан хэрэглэгчийн (%)",
      data: averageBounceRate,
    },
    { name: "Шинэ хэрэглэгч", data: totalNewUsers },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Хэрэглэгчдийн дундаж үзүүлэлтүүд (Нийт нэгтгэсэн)
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
