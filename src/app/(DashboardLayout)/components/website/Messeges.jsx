import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

const columns = [
  {
    field: "purpose",
    headerName: "Зорилго",
    type: "number",
    width: 100,
  },
  {
    field: "firstname",
    headerName: "Нэр",
    width: 150,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "email",
    headerName: "Майл",
    type: "text",
    width: 200,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "phonenumber",
    headerName: "Утасны дугаар",
    type: "text",
    flex: 1,
  },

  {
    field: "bussiness",
    headerName: "Бизнес",
    type: "text",
    flex: 1,
  },
  {
    field: "plan",
    headerName: "Төлөвлөгөө",
    type: "text",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Илгээсэн огноо",
    width: 200,
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

      return `${year}/${month}/${day} ${hour}:${minute}`;
    },
  },
  {
    field: "slug",
    headerName: "Дэлгэрэнгүй",
    flex: 1,
    renderCell: (params) => {
      const slug = `/messages/${params.row.id}`;
      return (
        <Link href={slug} underline="hover">
          Харах
        </Link>
      );
    },
  },
];

const Messeges = ({ datas }) => {
  return (
    <>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={datas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            border: "2px solid #ddd",
            borderRadius: 2,
            "& .MuiDataGrid-cell": {
              borderRight: "2px solid #ddd",
              textAlign: "center",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "2px solid #ddd",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #ddd",
              borderRight: "2px solid #ddd",
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "2px solid #ddd",
              "& .MuiDataGrid-columnHeaderTitle": {
                textAlign: "center",
                width: "100%",
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
      {/*  */}
    </>
  );
};

export default Messeges;
