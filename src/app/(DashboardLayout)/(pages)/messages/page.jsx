"use client";

import { Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
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
    <PageContainer title="Шуудан">
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>
      <Box>
        <Messages datas={messages} />
      </Box>
    </PageContainer>
  );
};

export default Page;
