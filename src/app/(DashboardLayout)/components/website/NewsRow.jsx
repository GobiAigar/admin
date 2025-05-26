import {
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import DeleteNews from "../features/DeleteNews";
import { Edit } from "@mui/icons-material";
import EditNews from "../features/EditNews";

const NewsRow = ({ data }) => {
  return (
    <>
      <TableRow hover key={data.id}>
        <TableCell>
          <Typography variant="body1">{data?.mntitle}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{data?.mnjournalist}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {data?.date &&
              new Date(data.date).toLocaleString("mn-MN", {
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
          <EditNews data={data} />
          <DeleteNews id={data.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default NewsRow;
