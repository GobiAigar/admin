"use client";

import { Backend_Endpoint } from "@/constants/constants";
import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteUser = (id) => {
  if (id.id === "e952ac39-37fc-4019-98fe-e152d82d4990") {
    return <></>;
  }

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/user/${id.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      router.push("/accounts");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CardActions>
      <IconButton onClick={handleClickOpen} color="primary">
        <DeleteTwoToneIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Та энэ админийг устгахдаа итгэлтэй байна уу?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Үгүй</Button>
          <Button onClick={submit} autoFocus>
            Тийм
          </Button>
        </DialogActions>
      </Dialog>
    </CardActions>
  );
};

export default DeleteUser;
