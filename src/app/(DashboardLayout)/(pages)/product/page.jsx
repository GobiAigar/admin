"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Backend_Endpoint } from "@/constants/constants";
import Loading from "../../loading";
import {
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditProduct from "../../components/features/EditProduct";
import SeeDetailsProduct from "../../components/features/SeeDetailsProduct";
import { IconEdit, IconEye } from "@tabler/icons-react";

const Page = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelecedData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Backend_Endpoint}/api/product`);
      const data = await response.json();
      const newData = data?.data?.response?.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setDatas(newData || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) return <Loading />;

  const columns = [
    {
      field: "index",
      headerName: "№",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Нэр",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "entitle",
      headerName: "Гарчиг /Англи/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "mntitle",
      headerName: "Гарчиг /Монгол/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "mndescription",
      headerName: "Тайлбар /Монгол/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "endescription",
      headerName: "Тайлбар /Англи/",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Үйлдэл",
      width: 120,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelecedData(params.row);
              setViewOpen(true);
            }}
          >
            <IconEye color="blue" />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelecedData(params.row);
              setEditOpen(true);
            }}
            color="primary"
          >
            <IconEdit />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <PageContainer title="Бүтээгдэхүүн">
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 3,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>
        <Box sx={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={datas}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 11 } },
            }}
            pageSizeOptions={[11]}
            sx={{
              border: "2px solid rgba(224, 224, 224, 1)",
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid rgba(224, 224, 224, 1)",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "2px solid rgba(224, 224, 224, 1)",
              },
              "& .MuiDataGrid-columnHeader": {
                borderRight: "1px solid rgba(224, 224, 224, 1)",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
              },
            }}
          />
        </Box>

        <Dialog
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Дэлгэрэнгүй</DialogTitle>
          <DialogContent>
            <SeeDetailsProduct
              data={selectedData}
              onClose={() => setViewOpen(false)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setViewOpen(false)}
              color="primary"
              variant="outlined"
            >
              Буцах
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Засах</DialogTitle>
          <DialogContent>
            {selectedData && (
              <EditProduct
                data={selectedData}
                onClose={() => setEditOpen(false)}
                onSubmitSuccess={() => {
                  setEditOpen(false);
                  fetchdata();
                  setSuccessOpen(true);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Grid>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Амжилттай шинэчлэгдлээ
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Page;
