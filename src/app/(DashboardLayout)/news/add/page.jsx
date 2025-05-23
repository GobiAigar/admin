"use client";
import { Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AddNews from "@/app/(DashboardLayout)/components/features/AddNews";

const Page = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <Box sx={{ padding: 2 }}>
        <AddNews />
      </Box>
    </PageContainer>
  );
};

export default Page;
