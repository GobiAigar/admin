"use client";
import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import { IconTrash } from "@tabler/icons-react";

import { Backend_Endpoint } from "@/constants/constants";
import { IconEye } from "@tabler/icons-react";

const columns = (setSnackbar, handleRowDelete) => [
  {
    field: "index",
    headerName: "№",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "purpose",
    headerName: "Зорилго",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "firstname",
    headerName: "Нэр",
    flex: 1,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "И-мэйл",
    flex: 1,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Огноо",
    flex: 1,

    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      if (!params) return "Огноо байхгүй";
      const date = new Date(params);
      if (isNaN(date.getTime())) return "Огноо буруу";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return `${year}/${month}/${day}-${hour}:${minute}`;
    },
  },
  {
    field: "actions",
    headerName: "Үйлдэл",
    width: 130,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <ActionButtons
        row={params.row}
        setSnackbar={setSnackbar}
        handleRowDelete={handleRowDelete}
      />
    ),
  },
];

const ActionButtons = ({ row, setSnackbar, handleRowDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${Backend_Endpoint}/api/messages/${row.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Амжилттай устгагдлаа",
          severity: "success",
        });
        handleRowDelete(row.id);
      } else {
        setSnackbar({
          open: true,
          message: "Устгах үед алдаа гарлаа. Дахин оролдоно уу!",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Устгах үед алдаа гарлаа. Дахин оролдоно уу!",
        severity: "error",
      });
    } finally {
      setConfirmOpen(false);
    }
  };

  const fieldNames = {
    purpose: "Зорилго",
    firstname: "Нэр",
    email: "Цахим хаяг",
    plan: "Төлөвлөгөө",
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Огноо байхгүй";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Огноо буруу";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day}-${hour}:${minute}`;
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="blue">
        <IconEye color="blue" />
      </IconButton>
      <IconButton onClick={() => setConfirmOpen(true)} color="error">
        <IconTrash />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Дэлгэрэнгүй мэдээлэл</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {Object.entries(row).map(([key, value]) => {
              if (key === "id" || key === "index") return null;
              const displayValue =
                key === "date" ? formatDate(value) : value || "-";

              return (
                <Grid size={{ xs: 12, sm: 12 }} key={key}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 1.5,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {fieldNames[key] || key}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        wordBreak: "break-word",
                        mt: 0.5,
                        fontSize: 14,
                      }}
                    >
                      {displayValue}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
          >
            Буцах
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>Устгах</DialogTitle>
        <DialogContent>
          <Typography>
            Та "{row.lastname} овогтой {row.firstname}" хэрэглэгчийн зурвасыг
            устгахдаа итгэлтэй байна уу?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Үгүй
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Тийм
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Messeges = ({ datas }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (datas && datas.length > 0) {
      const updatedRows = datas.map((item, idx) => ({
        ...item,
        index: idx + 1,
      }));
      setRows(updatedRows);
    }
  }, [datas]);

  const handleRowDelete = (id) => {
    setRows((prevRows) => {
      const updatedRows = prevRows
        .filter((row) => row.id !== id)
        .map((row, idx) => ({
          ...row,
          index: idx + 1,
        }));
      return updatedRows;
    });
  };

  return (
    <Box sx={{ height: 450, position: "relative" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <DataGrid
        rows={rows}
        columns={columns(setSnackbar, handleRowDelete)}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          border: "2px solid #ddd",
          borderRadius: 2,
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #ddd",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          },
        }}
      />
    </Box>
  );
};

export default Messeges;
