import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "username",
    headerName: "Хэрэглэгчийн нэр",
    type: "string",
    minWidth: 150,
  },
  {
    field: "email",
    headerName: "И-мэйл",
    type: "string",
    width: 150,
  },
  {
    field: "date",
    headerName: "Илгээсэн огноо",
    type: "text",
    width: 150,
  },
];

const UserList = ({ users }) => {
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
          disableMultipleRowSelection
          pageSizeOptions={[5]}
        />
      </Box>
      {/*  */}
    </>
  );
};

export default UserList;
