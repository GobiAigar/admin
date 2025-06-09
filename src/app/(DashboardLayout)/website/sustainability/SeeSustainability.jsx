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

const SeeSustainability = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle missing data
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
          {data?.id === 1 ? (
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
                  {data?.endescription}
                </DialogContentText>
              </DialogContent>
            </Box>
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid size={12}>
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src={data?.image_url}
                  alt={data?.entitle || "Image"}
                  title={data?.entitle || "Image"}
                />
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box id="alert-dialog-title" sx={{ fontWeight: "bold", mb: 1 }}>
                  {data?.entitle}
                </Box>
                <DialogContentText>{data?.endescription}</DialogContentText>
              </Box>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </Box>
  );
};

export default SeeSustainability;
