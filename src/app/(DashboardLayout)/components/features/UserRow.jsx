import { TableCell, TableRow, Typography } from "@mui/material";
import DeleteUser from "./DeleteUser";

const UserRow = ({ data }) => {
  return (
    <>
      <TableRow hover key={data.id}>
        <TableCell>
          <Typography variant="body1">{data?.username}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{data?.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {data?.regiter_date &&
              new Date(data.regiter_date).toLocaleString("mn-MN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeleteUser id={data.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
