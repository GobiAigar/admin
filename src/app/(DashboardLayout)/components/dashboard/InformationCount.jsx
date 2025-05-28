"use client";
import React, { useEffect, useState } from "react";
import { Grid, Box, Stack, Typography } from "@mui/material";
import {
  IconNews,
  IconUsers,
  IconUserPlus,
  IconMapPin,
  IconMessage,
} from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const InformationCount = () => {
  const [counts, setCounts] = useState({
    news: 0,
    messages: 0,
    totalUsers: 0,
    week: [],
    month: [],
    weekCity: [],
    monthCity: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [newsRes, msgRes, weekRes, monthRes, allUsersRes] =
          await Promise.all([
            fetch("https://website-z9b7.onrender.com/api/news"),
            fetch("http://localhost:8000/api/messages"),
            fetch("http://localhost:8000/api/analytics/views?timeframe=week"),
            fetch("http://localhost:8000/api/analytics/views?timeframe=month"),
            fetch("http://localhost:8000/api/analytics/views?timeframe=all"),
          ]);
        const [newsData, msgData, weekData, monthData, allUsersData] =
          await Promise.all([
            newsRes.json(),
            msgRes.json(),
            weekRes.json(),
            monthRes.json(),
            allUsersRes.json(),
          ]);

        const mapCityData = (data) => {
          const map = new Map();
          data.forEach((d) => {
            const city = d.dimensionValues[3]?.value || "Unknown";
            const country = d.dimensionValues[2]?.value || "Unknown";
            const key = `${city}, ${country}`;
            map.set(key, (map.get(key) || 0) + 1);
          });
          return Array.from(map.entries()).map(([location, count]) => ({
            location,
            count,
          }));
        };

        const totalUsers = allUsersData.reduce(
          (sum, item) => sum + Number(item.metricValues[2].value),
          0
        );

        setCounts({
          news: newsData.length,
          messages: msgData.length,
          totalUsers,
          week: weekData,
          month: monthData,
          weekCity: mapCityData(weekData),
          monthCity: mapCityData(monthData),
        });
      } catch (err) {
        console.error("Алдаа:", err);
      }
    };
    fetchAll();
  }, []);

  const getTopPathUniqueUsers = (data) => {
    const pathUserMap = new Map();
    data.forEach((item) => {
      const path = item.dimensionValues[1]?.value || "unknown";
      const userId = item.dimensionValues[0]?.value || "unknown";
      if (!pathUserMap.has(path)) {
        pathUserMap.set(path, new Set());
      }
      pathUserMap.get(path).add(userId);
    });

    let maxUnique = 0;
    for (const userSet of pathUserMap.values()) {
      if (userSet.size > maxUnique) {
        maxUnique = userSet.size;
      }
    }
    return maxUnique;
  };

  const getTotalNewUsers = (data) =>
    data.reduce((s, i) => s + Number(i.metricValues[2].value), 0);

  const renderCard = (title, items, cityData = null) => (
    <DashboardCard
      title={title}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "350px",
      }}
    >
      {items.map(({ icon: I, label, value, color }, idx) => (
        <Stack key={idx} direction="row" spacing={1} mt={1} alignItems="center">
          <I size={20} color={color || "#1976d2"} />
          <Typography ml={1}>{label}</Typography>
          <Typography variant="h6" fontWeight="700" ml={1}>
            {value}
          </Typography>
        </Stack>
      ))}
      {cityData && (
        <Box mt={1} sx={{ flexGrow: 1, overflowY: "auto" }}>
          {cityData.map((e, i) => (
            <Box key={i} display="flex" alignItems="center" mb={0.5}>
              <IconMapPin size={20} color="#FA896B" />
              <Typography ml={1} variant="caption" color="text.secondary">
                {e.location} - {e.count} удаа
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </DashboardCard>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          {renderCard("Ерөнхий мэдээлэл", [
            {
              icon: IconNews,
              label: "Мэдээ",
              value: counts.news,
              color: "#FFA500",
            },
            {
              icon: IconMessage,
              label: "Зурвас",
              value: counts.messages,
              color: "#66bb6a",
            },
            {
              icon: IconUsers,
              label: "Нийт хэрэглэгч",
              value: counts.totalUsers,
            },
          ])}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {renderCard(
            "7 хоногийн үзүүлэлт",
            [
              {
                icon: IconUsers,
                label: "Идэвхтэй хэрэглэгч",
                value: getTopPathUniqueUsers(counts.week),
              },
              {
                icon: IconUserPlus,
                label: "Шинэ хэрэглэгч",
                value: getTotalNewUsers(counts.week),
                color: "#66bb6a",
              },
            ],
            counts.weekCity
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {renderCard(
            "Сарын үзүүлэлт",
            [
              {
                icon: IconUsers,
                label: "Идэвхтэй хэрэглэгч",
                value: getTopPathUniqueUsers(counts.month),
              },
              {
                icon: IconUserPlus,
                label: "Шинэ хэрэглэгч",
                value: getTotalNewUsers(counts.month),
                color: "#66bb6a",
              },
            ],
            counts.monthCity
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationCount;
