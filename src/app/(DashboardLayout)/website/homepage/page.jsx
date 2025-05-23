"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import HomeHero from "../../components/website/HomeHero";
import InputSection from "../../components/website/InputSection";
import { useEffect, useState } from "react";
import { Backend_Endpoint } from "@/constants/constants";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/website`);
      const data = await response.json();
      setFilteredData(data?.website[0].title);
      setDatas(data?.website);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    setFilteredData(datas?.find((item) => item.id == id));
  }, [id, datas]);

  if (!datas)
    return (
      <div className="h-screen w-screen flex items-center justify-center ">
        loading
      </div>
    );

  return (
    <PageContainer title="Homepage" description="this is Homepage">
      <DashboardCard title="Homepage">
        <FormControl fullWidth>
          <Select
            id="sectionSelect"
            value={id || datas?.id || ""}
            onChange={(e) => {
              setId(e.target.value);
            }}
          >
            {datas.map((item) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid size={6}>
            <HomeHero data={filteredData} />
          </Grid>
          <Grid size={6}>
            <InputSection data={filteredData} id={id} />
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
