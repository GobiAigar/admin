import React from "react";
import { Box } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import AnalyticsChart from "@/app/(DashboardLayout)/components/dashboard/AnalyticsChart";
import UserTimeChart from "./UserTimeChart";
const SalesOverview = () => {
  return (
    <DashboardCard title="Нүүр хуудас">
      <Box>
        <AnalyticsChart />
        <UserTimeChart />
      </Box>
    </DashboardCard>
  );
};

export default SalesOverview;
