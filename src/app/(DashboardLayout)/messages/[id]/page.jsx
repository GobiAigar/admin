"use client";
import Loading from "@/app/loading";
import { Backend_Endpoint } from "@/constants/constants";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { set } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

const Page = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/messages/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.data);
      setLoading(false);
      console.log("Fetched data:", result.data);
    } catch (error) {
      console.error("error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  /*
  "data": {
    "id": 8,
    "bussiness": "Бараа",
    "plan": "2 жилийн хугацаатай",
  }
  */
  return (
    <PageContainer title="Мессеж дэлгэрэнгүй" description="this is Messages">
      <DashboardCard title="Мессеж дэлгэрэнгүй">
        <Grid container size={11} spacing={2}>
          <Grid container item size={12}>
            <Grid item size={6}>
              <Typography variant="h4">Зорилго: {data?.purpose}</Typography>
            </Grid>
            <Grid item size={6}>
              <Typography>
                {data?.date &&
                  new Date(data.date).toLocaleString("mn-MN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%", margin: "10px 0" }} />
          <Grid item size={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4">Төлөвлөгөө</Typography>
              <Typography variant="body1">
                Үйл ажиллагааны чиглэл: {data?.bussiness}
              </Typography>
              <Typography variant="body1">Төлөвлөгөө: {data?.plan}</Typography>
            </Box>
          </Grid>
          <Divider sx={{ width: "100%", margin: "10px 0" }} />

          <Grid container item size={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4">Хувийн мэдээлэл</Typography>
              <Typography variant="body1">Нэр: {data?.email}</Typography>
              <Typography variant="body1">Утас: {data?.phonenumber}</Typography>
              <Typography variant="body1">
                Нэр: {data?.firstname} {data?.lastname}
              </Typography>
            </Box>
          </Grid>
          <Grid item size={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4">Хаягийн мэдээлэл</Typography>
              <Typography variant="body1">Улс: {data?.country}</Typography>
              <Typography variant="body1">Хот: {data?.city}</Typography>
              <Typography variant="body1">Дүүрэг: {data?.state}</Typography>
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
