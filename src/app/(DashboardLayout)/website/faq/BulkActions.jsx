"use client";
import { useState, useRef } from "react";

import {
  Box,
  Menu,
  Tooltip,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  styled,
} from "@mui/material";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function BulkActions() {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color="text.secondary">
          Олноор устгах
        </Typography>
        <Tooltip arrow placement="top" title={"Баталгаажуулах"}></Tooltip>
        <Button
          sx={{
            ml: 1,
          }}
          startIcon={<DeleteTwoToneIcon />}
          variant="contained"
        >
          Устгах
        </Button>
      </Box>
    </>
  );
}

export default BulkActions;
