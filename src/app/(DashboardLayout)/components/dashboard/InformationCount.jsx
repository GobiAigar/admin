import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar, Box } from "@mui/material";
import { IconArrowUpLeft, IconNews } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ChartCountInfo from "./ChartCountInfo";

const InformationCount = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";

  const [newsCount, setNewsCount] = useState(0);

  useEffect(() => {
    const fetchNewsCount = async () => {
      try {
        const res = await fetch("https://website-z9b7.onrender.com/api/news");
        const data = await res.json();
        setNewsCount(data.length);
      } catch (error) {
        console.error("Мэдээ авах үед алдаа гарлаа:", error);
      }
    };

    fetchNewsCount();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <DashboardCard title="Мэдээний тоо">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Typography variant="subtitle2" color="textSecondary">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IconNews width={20} color="#FA896B" />
                  <Typography ml={1}>Нийтлэл</Typography>
                  <Typography variant="h6" fontWeight="700" sx={{ ml: 1 }}>
                    {newsCount}
                  </Typography>
                </Box>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DashboardCard>
      <ChartCountInfo />
    </Box>
  );
};

export default InformationCount;
