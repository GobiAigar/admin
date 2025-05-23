"use client";

import React, { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from "@mui/material";

import { Backend_Endpoint } from "@/constants/constants";
import NewsRow from "./NewsRow";
import NewsGrid from "./NewsGrid";

const NewsTable = () => {
  const [datas, setDatas] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
  const [query, setQuery] = useState("");
  const [toggleView, setToggleView] = useState("table_view");

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/news`);
      const data = await response.json();
      console.log(data);

      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewChange = (event, newValue) => {
    if (newValue !== null) {
      setToggleView(newValue);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Typography variant="h5">Мэдээ</Typography>
        <ToggleButtonGroup
          value={toggleView}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value="table_view">
            <TableRowsIcon />
          </ToggleButton>
          <ToggleButton value="grid_view">
            <GridViewIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {toggleView === "table_view" && (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Гарчиг</TableCell>
                  <TableCell>Нийтлэлч</TableCell>
                  <TableCell align="center">Он сар өдөр</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data) => {
                  return <NewsRow key={data.id} data={data} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}></Box>
        </Card>
      )}
      {toggleView === "grid_view" && (
        <>
          <Grid container spacing={3}>
            {datas.map((data) => {
              return <NewsGrid key={data.id} data={data} />;
            })}
          </Grid>
        </>
      )}
    </>
  );
};

export default NewsTable;
