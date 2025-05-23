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

const NewsRow = ({ data }) => {
  return (
    <>
      <TableRow hover key={data.id}>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>
          <Typography variant="body1">{data?.mntitle}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{data?.mnjournalist}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{data?.date}</Typography>
        </TableCell>
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => console.log(data.id)} color="primary">
            <LaunchTwoToneIcon fontSize="small" />
          </IconButton>
          <DeleteNews id={data.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default NewsRow;
