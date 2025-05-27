"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
<<<<<<< HEAD
import InformationCount from "@/app/(DashboardLayout)/components/dashboard/InformationCount";
=======
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
>>>>>>> 863375fd9df8d53a81c084c78336a69d299cde2e

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <SalesOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={12}>
                <InformationCount />
              </Grid>
              <Grid size={12}></Grid>
            </Grid>
          </Grid>
<<<<<<< HEAD
=======
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <RecentTransactions />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <ProductPerformance />
          </Grid>
          <Grid size={12}>
            <Blog />
          </Grid>
>>>>>>> 863375fd9df8d53a81c084c78336a69d299cde2e
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
