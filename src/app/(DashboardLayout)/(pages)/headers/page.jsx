"use client";

import { Box, Snackbar, Alert, Typography, Skeleton } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SeeHeader from "./SeeHeader";
import EditHeader from "./EditHeader";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchdata = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${Backend_Endpoint}/api/header`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setDatas(data?.response);
    } catch (error) {
      console.error("Failed to fetch sustainability data:", error);
      setError(error.message || "Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchdata();
    setSuccessMessage("Data refreshed successfully");
  }, [fetchdata]);

  const handleSuccess = useCallback(
    (message = "Operation completed successfully") => {
      fetchdata();
      setSuccessMessage(message);
    },
    [fetchdata]
  );

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  const columns = useMemo(
    () => [
      {
        field: "ui_id",
        headerName: "№",
        width: "70",
        align: "center",
        headerAlign: "center",
        sortable: false,
      },
      {
        field: "title",
        headerName: "Хуудасны нэр",
        justifyContent: "center",
        flex: 1,
      },
      {
        field: "entitle",
        headerName: "Гарчиг /Монгол/",
        flex: 1,
      },
      {
        field: "mntitle",
        headerName: "Тайлбар /Англи/",
        flex: 1,
      },

      {
        field: "action",
        align: "center",
        headerAlign: "center",
        headerName: "Үйлдэл",
        width: 140,
        sortable: false,
        filterable: false,
        disableExport: true,
        renderCell: (params) => {
          const rowData = params.row;
          return (
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SeeHeader
                data={rowData}
                onSuccess={() => handleSuccess("Data viewed successfully")}
              />
              <EditHeader
                data={rowData}
                onSuccess={() => handleSuccess("Data updated successfully")}
              />
            </Box>
          );
        },
      },
    ],
    [handleSuccess]
  );

  const processedRows = useMemo(
    () =>
      (datas || []).map((row, idx) => ({
        ...row,
        ui_id: idx + 1,
      })),
    [datas]
  );

  const handleErrorClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setError(null);
  }, []);

  const handleSuccessClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSuccessMessage("");
  }, []);

  const handleWarningClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  }, []);

  return (
    <PageContainer title="Баталгаажуулалт">
      <Box sx={{ height: "auto", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 3,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>

        {loading && datas.length === 0 ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Box>
        ) : (
          <DataGrid
            rows={processedRows}
            columns={columns}
            loading={loading}
            disableMultipleRowSelection
            disableColumnResize
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            sx={{
              border: "2px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "background.paper",
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid #e0e0e0",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "2px solid #e0e0e0",
                backgroundColor: "grey.50",
                fontWeight: 600,
              },
              "& .MuiDataGrid-columnHeader": {
                borderRight: "1px solid #e0e0e0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "2px solid #e0e0e0",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
            }}
          />
        )}
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleErrorClose} variant="filled">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleSuccessClose} variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleWarningClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={handleWarningClose} variant="filled">
          Та жагсаалтаас Гэрчилгээгээ сонгоно уу!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Page;
