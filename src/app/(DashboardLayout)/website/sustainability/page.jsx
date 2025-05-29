"use client";

import { Box, Snackbar, Alert } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/features/DeleteButton";
import EditSustainability from "../../components/features/EditSustainability";
import AddSustainability from "../../components/features/AddSustainability";

const columns = [
  { field: "id", headerName: "ID", width: 5, align: "center" },
  { field: "entitle", headerName: "Title", flex: 1 },
  { field: "mntitle", headerName: "Гарчиг", flex: 1 },
  { field: "endescription", headerName: "Description", flex: 1 },
  { field: "mndescription", headerName: "Тайлбар", flex: 1 },
  { field: "image_url", headerName: "Зураг", flex: 1 },
  { field: "action", headerName: "Үйлдэл", flex: 1 },
];

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the selected data based on the first selected ID
  const selectedData = datas.find((d) => d.id === selectedIds[0]);

  const fetchdata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/sustainability`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatas(data.data || []);
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

  return (
    <PageContainer title="Sustainability" description="Sustainability List">
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        >
          <EditSustainability
            data={selectedData}
            id={selectedIds}
            onSuccess={handleRefresh}
          />
          <DeleteButton
            type={"sustainability"}
            id={selectedData}
            onSuccess={handleRefresh}
          />
          <AddSustainability onSuccess={handleRefresh} />
        </Box>

        <DataGrid
          rows={(datas || []).map((row, idx) => ({
            ...row,
            ui_id: idx + 1,
          }))}
          columns={[
            { field: "ui_id", headerName: "№", width: 70 },
            ...columns.filter((col) => col.field !== "id"),
          ]}
          loading={loading}
          sx={{
            border: "2px solid #ddd",
            borderRadius: 2,
            "& .MuiDataGrid-cell": {
              borderRight: "2px solid #ddd",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "2px solid #ddd",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #ddd",
              borderRight: "2px solid #ddd",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "2px solid #ddd",
            },
          }}
          checkboxSelection
          disableMultipleRowSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            // Convert Set to Array for easier handling
            const selectedIdsArray = Array.from(newSelectionModel);
            setSelectedIds(selectedIdsArray);
          }}
          getRowId={(row) => row.id}
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
