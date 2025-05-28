"use client";
import { Grid, Box, Container } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import InformationCount from "@/app/(DashboardLayout)/components/dashboard/InformationCount";

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <InformationCount />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SalesOverview />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
