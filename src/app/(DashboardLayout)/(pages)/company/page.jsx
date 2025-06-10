"use client";

import { Box, Snackbar, Alert, IconButton } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/features/DeleteButton";
import Loading from "../../loading";
import EditStatistic from "./EditCompany";
import SeeStatistics from "./SeeCompany";
import SeeCompany from "./SeeCompany";
import EditCompany from "./EditCompany";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchdata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/company`);
      const data = await response.json();

      setDatas(data || []);
    } catch (error) {
      console.error("Failed to fetch sustainability data:", error);
      setError("Failed to load data. Please try again.");
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
    { field: "title", headerName: "гарчиг", flex: 1, headerAlign: "center" },
    { field: "mongolia", headerName: "Монгол", flex: 1, headerAlign: "center" },
    { field: "english", headerName: "Англи", flex: 1, headerAlign: "center" },

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
            <SeeCompany data={rowData} onSuccess={handleRefresh} />
            <EditCompany data={rowData} onSuccess={handleRefresh} />
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer title="Статистик" description="Статистик">
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        ></Box>

        <DataGrid
          rows={(datas || []).map((row, idx) => ({
            ...row,
            ui_id: idx + 1,
          }))}
          columns={columns}
          loading={loading}
          disableMultipleRowSelection
          disableAutosize
          disableColumnResize
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

      {/* Error Alert */}
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
