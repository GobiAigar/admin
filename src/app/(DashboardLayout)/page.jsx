"use client";
import { Grid, Box, Container } from "@mui/material";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import InformationCount from "@/app/(DashboardLayout)/components/dashboard/InformationCount";
import PageContainer from "./components/container/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer title={"Хяналтын самбар"}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <InformationCount />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SalesOverview />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
