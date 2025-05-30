"use  client";

import { Backend_Endpoint } from "@/constants/constants";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

const DeleteButton = ({ type, id }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/${type}/${id.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <IconTrash color="red" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Та устгахдаа итгэлтэй байна уу?
        </DialogTitle>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} variant="text">
            Үгүй
          </Button>
          <Button
            onClick={submit}
            autoFocus
            variant="outlined"
            sx={{ color: "red", borderColor: "red" }}
          >
            Тийм
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteButton;
