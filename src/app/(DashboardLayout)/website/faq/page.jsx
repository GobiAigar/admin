"use client";
import { useState, useEffect } from "react";

import PageHeader from "./PageHeader";

import { Grid } from "@mui/material";

import Results from "./Results";
import PageTitleWrapper from "./PageTitleWrapper";
import { Backend_Endpoint } from "@/constants/constants";

function Page() {
  const [datas, setDatas] = useState([]);
  const [statistic, setStatistic] = useState([]);
  const [render, setRender] = useState(false);

  const fetchFaq = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/faq`);
      const data = await response.json();
      setDatas(data);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatistic = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/statistics`);
      const data = await response.json();
      setStatistic(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaq();
    fetchStatistic();
  }, [render]);

  return (
    <>
      <title>Users - Management</title>
      <PageTitleWrapper>
        <PageHeader render={render} setRender={setRender} />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results
            datas={datas}
            statistic={statistic}
            render={render}
            setRender={setRender}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Page;
