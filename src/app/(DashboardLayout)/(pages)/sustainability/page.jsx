"use client";

import { Box, Snackbar, Alert, IconButton } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/features/DeleteButton";
import EditSustainability from "./EditSustainability";
import AddSustainability from "./AddSustainability";
import SeeSustainability from "./SeeSustainability";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchdata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/sustainability`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      setDatas(data?.response || []);
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
    { field: "entitle", headerName: "Гарчиг /Англи/", flex: 1 },
    { field: "mntitle", headerName: "Гарчиг /Монгол/", flex: 1 },
    { field: "endescription", headerName: "Тайлбар /Англи/", flex: 1 },
    { field: "mndescription", headerName: "Тайлбар /Монгол/", flex: 1 },
    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Үйлдэл",
      width: "130",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Box sx={{ display: "flex" }}>
            <SeeSustainability data={rowData} onSuccess={handleRefresh} />
            <EditSustainability data={rowData} onSuccess={handleRefresh} />
            <DeleteButton
              type={"sustainability"}
              id={rowData}
              onSuccess={handleRefresh}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <PageContainer title="Баталгаажуулалт">
      <Box sx={{ height: 450, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        >
          <AddSustainability onSuccess={handleRefresh} />
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

      {/* Warning Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setAlertOpen(false)}>
          Та жагсаалтаас Гэрчилгээгээ сонгоно уу!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Page;
