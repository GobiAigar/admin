"use client";

import { Box, Snackbar, Alert } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../loading";
import DeleteButton from "../components/features/DeleteButton";
import EditNews from "./EditNews";
import AddNews from "./AddNews";
import SeeNews from "./SeeNews";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchdata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/news`);
      const data = await response.json();
      console.log(data);

      setDatas(data?.data?.response || []);
    } catch (error) {
      setError(error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchdata();
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const columns = [
    {
      field: "ui_id",
      headerName: "№",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    { field: "mntitle", headerName: "Гарчиг", flex: 1, headerAlign: "center" },
    {
      field: "mndescription",
      headerName: "Тайлбар",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "mnjournalist",
      headerName: "Нийтлэлч",
      flex: 1,
      headerAlign: "center",
    },

    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Үйлдэл",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SeeNews data={rowData} onSuccess={handleRefresh} />
            <EditNews data={rowData} onSuccess={handleRefresh} />
            <DeleteButton
              type={"news"}
              id={rowData}
              onSuccess={handleRefresh}
            />
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer title="Мэдээлэл" description="Мэдээлэл">
      <Box sx={{ height: 400, width: "flex" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        >
          <AddNews onSuccess={handleRefresh} />
        </Box>

        <DataGrid
          rows={(datas || []).map((row, idx) => ({
            ...row,
            ui_id: idx + 1,
          }))}
          columns={columns}
          loading={loading}
          disableMultipleRowSelection
          disableAutosize
          getRowId={(row) => row.id}
          sx={{
            border: "2px solid #ddd",
            borderRadius: 2,
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #ddd",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center",
              width: "100%",
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Page;
