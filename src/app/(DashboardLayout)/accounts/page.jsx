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
} from "@mui/material";
import { Backend_Endpoint } from "@/constants/constants";
import { DataGrid } from "@mui/x-data-grid";
import { formatDate } from "@/utils/formatDate";
import DeleteButton from "../components/features/DeleteButton";
import AddUser from "./AddUser";

const Page = () => {
  const [datas, setDatas] = useState([]);

  const handleRefresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/user`);
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "username",
      headerName: "Хэрэглэгчийн нэр",
      type: "string",
      flex: 1,
    },
    {
      field: "email",
      headerName: "И-мэйл",
      type: "string",
      flex: 1,
    },
    {
      field: "regiter_date",
      headerName: "Үүсгэсэн огноо",
      type: "text",
      flex: 1,
      renderCell: (params) => {
        const rowData = params.row;
        return formatDate(rowData?.date);
      },
    },
    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Үйлдэл",
      width: "167",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {rowData.id !== "e952ac39-37fc-4019-98fe-e152d82d4990" && (
              <DeleteButton
                type={"user"}
                id={rowData}
                onSuccess={handleRefresh}
              />
            )}
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Админууд">
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            marginY: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <AddUser />
        </Box>
        <DataGrid
          rows={datas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableMultipleRowSelection
          pageSizeOptions={[5]}
        />
      </Box>
    </PageContainer>
  );
};

export default Page;
