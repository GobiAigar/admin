"use client";
import { useState, useEffect } from "react";

import PageHeader from "./PageHeader";

import { Grid } from "@mui/material";

import Results from "./Results";
import PageTitleWrapper from "./PageTitleWrapper";
import { Backend_Endpoint } from "@/constants/constants";

function Page() {
  const [datas, setDatas] = useState([]);

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

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <>
      <title>Users - Management</title>
      <PageTitleWrapper>
        <PageHeader />
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
          <Results datas={datas} />
        </Grid>
      </Grid>
    </>
  );
}

export default Page;
