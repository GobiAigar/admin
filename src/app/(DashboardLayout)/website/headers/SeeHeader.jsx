"use client";

import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import { IconEye } from "@tabler/icons-react";

const SeeHeader = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return (
      <IconButton disabled>
        <IconEye color="gray" />
      </IconButton>
    );
  }

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <IconEye variant="primary" color="blue" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Grid container>
          <Box sx={{ position: "relative", width: "100%" }}>
            <CardMedia
              sx={{ height: 200 }}
              image={data?.image_url}
              title={data?.entitle || "Image"}
            />
            <DialogContent
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                textAlign: "center",
              }}
            >
              <DialogTitle
                id="alert-dialog-title"
                sx={{ color: "white", textAlign: "center" }}
              >
                {data?.entitle}
              </DialogTitle>
              <DialogContentText sx={{ color: "white" }}>
                {data?.ensubtitle}
              </DialogContentText>
            </DialogContent>
          </Box>
        </Grid>
      </Dialog>
    </Box>
  );
};

export default SeeHeader;
