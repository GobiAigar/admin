"use client";
import { useState } from "react";
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
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
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "lastname",
    headerName: "Овог",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "firstname",
    headerName: "Нэр",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "И-мэйл",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "phonenumber",
    headerName: "Утасны дугаар",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Огноо",
    width: 180,
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
    width: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => <ViewIconCell row={params.row} />,
  },
];

const ViewIconCell = ({ row }) => {
  const [open, setOpen] = useState(false);

  const fieldNames = {
    purpose: "Зорилго",
    firstname: "Нэр",
    lastname: "Овог",
    email: "Цахим хаяг",
    phonenumber: "Утасны дугаар",
    date: "Илгээсэн огноо",
    bussiness: "Бизнес",
    plan: "Төлөвлөгөө",
    city: "Хот",
    state: "Муж",
    country: "Улс",
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
      <IconButton onClick={() => setOpen(true)} color="secondary">
        <VisibilityIcon />
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
                <Grid size={{ xs: 12, sm: 6 }} key={key}>
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
    </>
  );
};

const Messeges = ({ datas }) => {
  const processedRows = datas.map((item, idx) => ({
    ...item,
    index: idx + 1,
  }));

  return (
    <Box sx={{ height: 500 }}>
      <DataGrid
        rows={processedRows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
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
