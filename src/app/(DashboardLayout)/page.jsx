"use client";
import { Grid } from "@mui/material";
import InformationCount from "@/app/(DashboardLayout)/components/dashboard/InformationCount";
import PageContainer from "./components/container/PageContainer";
import AnalyticsChart from "./components/dashboard/AnalyticsChart";
import UserTimeChart from "./components/dashboard/UserTimeChart";

const Dashboard = () => {
  return (
    <PageContainer title={"Хяналтын самбар"}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <InformationCount />
          <AnalyticsChart />
          <UserTimeChart />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
