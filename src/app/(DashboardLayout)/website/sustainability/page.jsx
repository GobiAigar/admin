"use client";

import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "entitle",
    headerName: "Title",
    sortable: false,
    width: 150,
  },
  {
    field: "mntitle",
    headerName: "Гарчиг",
    sortable: false,

    width: 150,
  },
  {
    field: "endescription",
    headerName: "Discription",
    sortable: false,
    width: 110,
  },
  {
    field: "mndescription",
    headerName: "Тайлбар",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
  },
  {
    field: "image_url",
    headerName: "Зураг",
    sortable: false,
    width: 200,
  },
];

const Page = () => {
  const [fixOpen, setFixOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState();
  const [render, setRender] = useState(false);

  const handleClickOpenAdd = () => {
    setAddOpen(true);
  };

  const handleClickOpenFix = () => {
    setFixOpen(true);
  };
  const handleClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setFixOpen(false);
    setAddOpen(false);
    setDeleteOpen(false);
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/sustainability`);
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error();
    }
  };

  const deleteCerficate = async () => {
    if (!id[0]) {
      return alert("Та устгах гэрчилгээгээ сонгоно уу");
    }
    if (id[0] == 1) {
      return alert("Та устгах боломжгүй зүйл устгах гэж байна");
    }
    try {
      const response = await fetch(
        `${Backend_Endpoint}/api/sustainability/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchdata();
        handleClose();
        setRender(!render);
      }
      alert("Amjilttai ustgalaa");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [id, render]);

  return (
    <PageContainer title="Product" description="Product">
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            justifyContent: "flex-end",
          }}
        >
          {id && (
            <>
              <Button variant="outlined" onClick={handleClickOpenFix}>
                Засах
              </Button>

              <Dialog
                open={fixOpen}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    component: "form",
                    onSubmit: async (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      try {
                        const response = await fetch(
                          `${Backend_Endpoint}/api/sustainability/${id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formJson),
                          }
                        );
                        setRender(!render);
                        handleClose();
                      } catch (error) {
                        console.log(error);
                      }
                    },
                  },
                }}
              >
                <DialogTitle>Гэрчилгээ засах</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="entitle"
                    name="entitle"
                    defaultValue={
                      datas.find((data) => data.id === id[0])?.entitle
                    }
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    required
                    margin="dense"
                    id="mntitle"
                    name="mntitle"
                    defaultValue={
                      datas.find((data) => data.id === id[0])?.mntitle || ""
                    }
                    label="Гарчиг"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    required
                    margin="dense"
                    id="endescription"
                    name="endescription"
                    defaultValue={
                      datas.find((data) => data.id === id[0])?.endescription ||
                      ""
                    }
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    required
                    margin="dense"
                    id="mndescription"
                    name="mndescription"
                    defaultValue={
                      datas.find((data) => data.id === id[0])?.mndescription ||
                      ""
                    }
                    label="Дэд гарчиг"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    required
                    margin="dense"
                    id="image_url"
                    name="image_url"
                    defaultValue={
                      datas.find((data) => data.id === id[0])?.image_url || ""
                    }
                    label="Зураг"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Засах</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          {id && (
            <>
              <Button variant="outlined" onClick={() => handleClickOpen()}>
                Устгах
              </Button>
              <Dialog
                open={deleteOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="alert-dialog-title">
                  Та энэ нийтлэлийг устгахдаа итгэлтэй байна уу?
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleClose}>Үгүй</Button>
                  <Button onClick={deleteCerficate} autoFocus>
                    Тийм
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          <>
            <Button variant="outlined" onClick={handleClickOpenAdd}>
              Нэмэх
            </Button>
            <Dialog
              open={addOpen}
              onClose={handleClose}
              slotProps={{
                paper: {
                  component: "form",
                  onSubmit: async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    try {
                      const response = await fetch(
                        `${Backend_Endpoint}/api/sustainability`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(formJson),
                        }
                      );
                      setRender(!render);
                      handleClose();
                    } catch (error) {
                      console.log(error);
                    }
                  },
                },
              }}
            >
              <DialogTitle>Гэрчилгээ нэмэх</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="entitle"
                  name="entitle"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="mntitle"
                  name="mntitle"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="endescription"
                  name="endescription"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="mndescription"
                  name="mndescription"
                  label="Дэд гарчиг"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="image_url"
                  name="image_url"
                  label="Зураг"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Нэмэх</Button>
              </DialogActions>
            </Dialog>
          </>
        </Box>

        <DataGrid
          rows={datas || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableMultipleRowSelection
          onRowSelectionModelChange={(newSelection) => {
            setId(Array.from(newSelection.ids));
          }}
        />
      </Box>
    </PageContainer>
  );
};

export default Page;
