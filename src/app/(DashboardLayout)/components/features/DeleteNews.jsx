"use  client";

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
import React, { useState } from "react";

const DeleteNews = (id) => {
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
      const response = await fetch(`${Backend_Endpoint}/api/news/${id.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      handleClose();
      router.push("/news");
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
          Та энэ нийтлэлийг устгахдаа итгэлтэй байна уу?
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

export default DeleteNews;
