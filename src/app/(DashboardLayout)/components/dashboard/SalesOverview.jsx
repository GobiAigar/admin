import React from "react";
import { Box } from "@mui/material";
import AnalyticsChart from "@/app/(DashboardLayout)/components/dashboard/AnalyticsChart";
import UserTimeChart from "./UserTimeChart";
const SalesOverview = () => {
  return (
    <Box>
      <AnalyticsChart />
      <UserTimeChart />
    </Box>
  );
};

export default SalesOverview;
