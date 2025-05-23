"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Messages from "@/app/(DashboardLayout)/components/website/Messeges";
import { useEffect, useState } from "react";
import { Backend_Endpoint } from "@/constants/constants";

const Page = () => {
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/messages`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      throw new Error("error");
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    fetchData();
  }, []);
  return (
    <PageContainer title="Messages" description="this is Messages">
      <DashboardCard title="Messages">
        <Box>
          <Messages datas={messages} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
