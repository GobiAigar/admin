"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CardMedia,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Formik, Form } from "formik";
import FileUploader from "../../components/website/FileUploader";
import DeleteButton from "../../components/features/DeleteButton";

const columns = [
  { field: "id", headerName: "ID", width: 5, align: "center" },
  { field: "entitle", headerName: "Title", flex: 1 },
  { field: "mntitle", headerName: "Гарчиг", flex: 1 },
  { field: "endescription", headerName: "Description", flex: 1 },
  { field: "mndescription", headerName: "Тайлбар", flex: 1 },
  { field: "image_url", headerName: "Зураг", flex: 1 },
];

const Page = () => {
  const [fixOpen, setFixOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState([]);
  const [render, setRender] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const selectedData = datas.find((d) => d.id === id[0]);

  const handleClickOpenFix = () => {
    if (!id[0]) {
      setAlertOpen(true);
      return;
    }
    setFixOpen(true);
  };

  const handleClose = () => {
    setFixOpen(false);
    setAddOpen(false);
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/sustainability`);
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [render]);

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
          <Button variant="outlined" onClick={handleClickOpenFix}>
            Засах
          </Button>

          <Dialog open={fixOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <Formik
              initialValues={{
                entitle: selectedData?.entitle || "",
                mntitle: selectedData?.mntitle || "",
                endescription: selectedData?.endescription || "",
                mndescription: selectedData?.mndescription || "",
                image_url: selectedData?.image_url || "",
              }}
              enableReinitialize={true}
              onSubmit={async (values) => {
                try {
                  const response = await fetch(
                    `${Backend_Endpoint}/api/sustainability/${id[0]}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    }
                  );
                  if (response.ok) {
                    setRender(!render);
                    handleClose();
                  }
                } catch (error) {
                  console.error("Засах алдаа:", error);
                }
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <DialogTitle>Гэрчилгээ засах</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      label="Title"
                      fullWidth
                      value={values.entitle}
                      onChange={(e) => setFieldValue("entitle", e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label="Гарчиг"
                      fullWidth
                      value={values.mntitle}
                      onChange={(e) => setFieldValue("mntitle", e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label="Description"
                      fullWidth
                      value={values.endescription}
                      onChange={(e) =>
                        setFieldValue("endescription", e.target.value)
                      }
                    />
                    <TextField
                      margin="dense"
                      label="Дэд гарчиг"
                      fullWidth
                      value={values.mndescription}
                      onChange={(e) =>
                        setFieldValue("mndescription", e.target.value)
                      }
                    />
                    <FileUploader
                      setFieldValue={setFieldValue}
                      fieldName="image_url"
                    />
                    {selectedData?.image_url && (
                      <Box sx={{ my: 2 }}>
                        <Typography variant="body2">Одоогийн зураг:</Typography>
                        <CardMedia
                          component="img"
                          image={selectedData.image_url}
                          alt="Uploaded"
                          sx={{
                            objectFit: "contain",
                            width: "100%",
                            maxHeight: 300,
                            borderRadius: 2,
                          }}
                        />
                      </Box>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Засах</Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Dialog>

          <DeleteButton type={"sustainability"} id={selectedData} />
          <Button variant="outlined" onClick={() => setAddOpen(true)}>
            Нэмэх
          </Button>

          <Dialog open={addOpen} onClose={handleClose}>
            <Formik
              initialValues={{
                entitle: "",
                mntitle: "",
                endescription: "",
                mndescription: "",
                image_url: "",
              }}
              onSubmit={async (values) => {
                try {
                  const response = await fetch(
                    `${Backend_Endpoint}/api/sustainability`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    }
                  );
                  if (response.ok) {
                    setRender(!render);
                    handleClose();
                  }
                } catch (error) {
                  console.error("Нэмэх алдаа:", error);
                }
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <DialogTitle>Гэрчилгээ нэмэх</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      label="Title"
                      fullWidth
                      value={values.entitle}
                      onChange={(e) => setFieldValue("entitle", e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label="Гарчиг"
                      fullWidth
                      value={values.mntitle}
                      onChange={(e) => setFieldValue("mntitle", e.target.value)}
                    />
                    <TextField
                      margin="dense"
                      label="Description"
                      fullWidth
                      value={values.endescription}
                      onChange={(e) =>
                        setFieldValue("endescription", e.target.value)
                      }
                    />
                    <TextField
                      margin="dense"
                      label="Дэд гарчиг"
                      fullWidth
                      value={values.mndescription}
                      onChange={(e) =>
                        setFieldValue("mndescription", e.target.value)
                      }
                    />
                    <FileUploader
                      setFieldValue={setFieldValue}
                      fieldName="image_url"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Нэмэх</Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Dialog>
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
          onRowSelectionModelChange={(newSelection) =>
            setId(new Array.from(newSelection.ids))
          }
          getRowId={(row) => row.id}
        />
      </Box>

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
