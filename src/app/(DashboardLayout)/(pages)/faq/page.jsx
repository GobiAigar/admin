"use client";

import { Box, Snackbar, Alert, IconButton } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteButton from "../../components/features/DeleteButton";
import EditFaq from "./EditFaq";
import SeeFaq from "./SeeFaq";
import AddFaq from "./AddFaq";
import Loading from "../../loading";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchdata = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/faq`);

      const data = await response.json();
      console.log(data);

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
    {
      field: "enquestion",
      headerName: "Асуулт /Англи/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "mnquestion",
      headerName: "Асуулт /Монгол/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "enanswer",
      headerName: "Хариулт /Англи/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "mnanswer",
      headerName: "Хариулт /Монгол/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "action",
      align: "center",
      headerAlign: "center",
      headerName: "Үйлдэл",
      width: "120",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowData = params.row;
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SeeFaq data={rowData} onSuccess={handleRefresh} />
            <EditFaq data={rowData} onSuccess={handleRefresh} />
            <DeleteButton type={"faq"} id={rowData} onSuccess={handleRefresh} />
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer title="Асуулт, хариулт" description="Нийтлэг асуулт">
      <Box sx={{ height: 600, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        >
          <AddFaq onSuccess={handleRefresh} />
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
              borderRight: "1px solid #ddd",
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
