"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useState } from "react";

const SeeDetailsHome = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!data) {
      return alert("Харах мэдээллээ сонгоно уу");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageUrls = [1, 2, 3, 4]
    .map((i) => data?.[`image_url${i}`])
    .filter((url) => !!url); // Only valid URLs

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Харах
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="dialog-title">
          <Typography fontWeight="bold">
            {data?.entitle || "Мэдээлэл харагдахгүй байна"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} mb={2}>
            <Grid item size={6} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Гарчиг (Англи)
              </Typography>
              <Typography>{data?.entitle}</Typography>
            </Grid>
            <Grid item size={6} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Гарчиг (Монгол)
              </Typography>
              <Typography>{data?.mntitle}</Typography>
            </Grid>
            <Grid item size={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Дэд гарчиг (Англи)
              </Typography>
              <Typography>{data?.ensubtitle}</Typography>
            </Grid>
            <Grid item size={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Дэд гарчиг (Монгол)
              </Typography>
              <Typography>{data?.mnsubtitle}</Typography>
            </Grid>
          </Grid>

          {imageUrls.length == 4 && (
            <>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {imageUrls.map((url, index) => (
                  <Grid
                    item
                    size={3}
                    sm={imageUrls.length === 1 ? 12 : 6}
                    md={imageUrls.length === 1 ? 12 : 3}
                    key={index}
                  >
                    <Box
                      component="img"
                      src={url}
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        boxShadow: 2,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          {imageUrls.length == 1 && (
            <>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {imageUrls.map((url, index) => (
                  <Grid
                    item
                    size={12}
                    sm={imageUrls.length === 1 ? 12 : 6}
                    md={imageUrls.length === 1 ? 12 : 3}
                    key={index}
                  >
                    <Box
                      component="img"
                      src={url}
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        boxShadow: 2,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Буцах
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SeeDetailsHome;
