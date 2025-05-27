"use client";
import { useEffect, useState } from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
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
  Button,
} from "@mui/material";
import { Backend_Endpoint } from "@/constants/constants";
import UserRow from "../components/features/UserRow";
import { Add } from "@mui/icons-material";
import AddUserButton from "../components/features/AddUser";

const Page = () => {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/user`);
      const data = await response.json();
      console.log("Fetched data:", data);
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Accounts" description="Accounts management page">
      <DashboardCard title="Админууд" action={<AddUserButton />}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Хэрэглэгчийн нэр</TableCell>
                  <TableCell>Э-мэйл</TableCell>
                  <TableCell align="center">Он сар өдөр</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data) => {
                  return <UserRow key={data.id} data={data} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}></Box>
        </Card>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
