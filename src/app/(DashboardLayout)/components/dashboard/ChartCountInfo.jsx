"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { IconUsers, IconUserPlus, IconMapPin } from "@tabler/icons-react";

const useAnalyticsData = (timeframe) => {
  const [data, setData] = useState([]);
  const [cityCountryData, setCityCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/analytics/views?timeframe=${timeframe}`
        );
        const json = await res.json();
        setData(json);

        const cityCountryMap = new Map();
        json.forEach((item) => {
          const country = item.dimensionValues[2]?.value || "Unknown";
          const city = item.dimensionValues[3]?.value || "Unknown";
          const key = `${city}, ${country}`;
          cityCountryMap.set(key, (cityCountryMap.get(key) || 0) + 1);
        });
        const cityCountryList = Array.from(cityCountryMap.entries()).map(
          ([location, count]) => ({ location, count })
        );
        setCityCountryData(cityCountryList);
      } catch (err) {
        console.error("Fetch GA Data Error:", err);
      }
    };

    fetchData();
  }, [timeframe]);

  return { data, cityCountryData };
};

const ChartCountInfo = () => {
  const { data: weekData, cityCountryData: weekCityCountryData } =
    useAnalyticsData("week");

  const { data: monthData, cityCountryData: monthCityCountryData } =
    useAnalyticsData("month");

  const getTotalNewUsers = (data) =>
    data.reduce((sum, item) => sum + Number(item.metricValues[2].value), 0);

  const getMostActiveUsers = (data) => {
    const pathActiveUsersMap = {};
    data.forEach((item) => {
      const path = item.dimensionValues[1]?.value || "unknown";
      const activeUsers = Number(item.metricValues[1].value);
      pathActiveUsersMap[path] = (pathActiveUsersMap[path] || 0) + activeUsers;
    });

    let maxActiveUsers = 0;
    for (const path in pathActiveUsersMap) {
      if (pathActiveUsersMap[path] > maxActiveUsers) {
        maxActiveUsers = pathActiveUsersMap[path];
      }
    }
    return maxActiveUsers;
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <DashboardCard title="7 хоногийн үзүүлэлт">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <IconUsers size={20} color="#1976d2" />
              <Typography ml={1}>Идэвхтэй хэрэглэгч (хамгийн их)</Typography>
              <Typography variant="h6" fontWeight="700" ml={1}>
                {getMostActiveUsers(weekData)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <IconUserPlus size={20} color="#FA896B" />
              <Typography ml={1}>Шинэ хэрэглэгч (7 хоног)</Typography>
              <Typography variant="h6" fontWeight="700" ml={1}>
                {getTotalNewUsers(weekData)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Typography variant="subtitle2" color="textSecondary" mb={1}>
              Аль хот, ямар улсаас орж ирсэн:
            </Typography>
            {weekCityCountryData.length === 0 ? (
              <Typography color="text.secondary">Мэдээлэл алга</Typography>
            ) : (
              weekCityCountryData.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 0.5,
                    color: "text.secondary",
                  }}
                >
                  <IconMapPin size={16} color="#1976d2" />
                  <Typography ml={1}>
                    {entry.location} - {entry.count} удаа
                  </Typography>
                </Box>
              ))
            )}
          </Grid>
        </Grid>
      </DashboardCard>

      <DashboardCard title="Сарын үзүүлэлт">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <IconUsers size={20} color="#1976d2" />
              <Typography ml={1}>Идэвхтэй хэрэглэгч (хамгийн их)</Typography>
              <Typography variant="h6" fontWeight="700" ml={1}>
                {getMostActiveUsers(monthData)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <IconUserPlus size={20} color="#FA896B" />
              <Typography ml={1}>Шинэ хэрэглэгч (сарын)</Typography>
              <Typography variant="h6" fontWeight="700" ml={1}>
                {getTotalNewUsers(monthData)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Typography variant="subtitle2" color="textSecondary" mb={1}>
              Аль хот, ямар улсаас орж ирсэн:
            </Typography>
            {monthCityCountryData.length === 0 ? (
              <Typography color="text.secondary">Мэдээлэл алга</Typography>
            ) : (
              monthCityCountryData.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 0.5,
                    color: "text.secondary",
                  }}
                >
                  <IconMapPin size={16} color="#1976d2" />
                  <Typography ml={1}>
                    {entry.location} - {entry.count} удаа
                  </Typography>
                </Box>
              ))
            )}
          </Grid>
        </Grid>
      </DashboardCard>
    </Box>
  );
};

export default ChartCountInfo;
