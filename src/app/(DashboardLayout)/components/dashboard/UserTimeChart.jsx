"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Container } from "@mui/material";
import dynamic from "next/dynamic";
import { Backend_Endpoint } from "@/constants/constants";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserTimeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("week");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          `${Backend_Endpoint}/api/analytics/views?timeframe=${timeframe}`
        );
        const data = await res.json();
        setChartData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch GA Data Error:", err);
        setChartData([]);
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
    const dateHourStr = item?.dateOrHour;
    if (!dateHourStr || typeof dateHourStr !== "string") return;

    let key;

    if (timeframe === "day") {
      if (dateHourStr.length !== 10) return;
      const hour = dateHourStr.slice(-2);
      key = `${hour}:00`;
    } else {
      const year = dateHourStr.slice(0, 4);
      const month = dateHourStr.slice(4, 6);
      const day = dateHourStr.slice(6, 8);
      if (!year || !month || !day) return;
      key = `${year}-${month}-${day}`;
    }

    if (!groupedData[key]) {
      groupedData[key] = {
        sessionDuration: 0,
        bounceRate: 0,
        newUsers: 0,
        count: 0,
      };
    }

    groupedData[key].sessionDuration += Number(item?.avgSession || 0);
    groupedData[key].bounceRate += Number(item?.bounceRate || 0);
    groupedData[key].newUsers += Number(item?.newUsers || 0);
    groupedData[key].count += 1;
  });

  const categories =
    timeframe === "day"
      ? hoursArray
      : Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

  const averageSessionDuration = categories.map((key) => {
    const group = groupedData[key];
    return group?.count
      ? +(group.sessionDuration / group.count / 60).toFixed(2)
      : 0;
  });

  const averageBounceRate = categories.map((key) => {
    const group = groupedData[key];
    return group?.count ? +(group.bounceRate / group.count).toFixed(2) : 0;
  });

  const totalNewUsers = categories.map((key) => {
    return groupedData[key]?.newUsers || 0;
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
      labels: {
        formatter: (val) =>
          typeof val === "number" && !isNaN(val) ? +val.toFixed(2) : 0,
      },
    },
    tooltip: {
      y: {
        formatter: (val) =>
          typeof val === "number" && !isNaN(val) ? +val.toFixed(2) : 0,
      },
    },
    legend: { position: "top" },
  };

  const series = [
    { name: "Дундаж хугацаа (мин)", data: averageSessionDuration },
    {
      name: "Үйлдэл хийгээгүй гарсан хэрэглэгчийн (%)",
      data: averageBounceRate,
    },
    { name: "Шинэ хэрэглэгч", data: totalNewUsers },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" mb={2}>
        Хэрэглэгчдийн дундаж үзүүлэлтүүд
      </Typography>

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
        {chartData.length === 0 ? (
          <Typography textAlign="center" mt={4} color="text.secondary">
            Дата байхгүй байна.
          </Typography>
        ) : (
          <Chart options={options} series={series} type="line" height={400} />
        )}
      </Box>
    </Container>
  );
};

export default UserTimeChart;
