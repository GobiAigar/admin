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

const SeeDetailsProduct = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [eng, setEng] = useState(false);

  const handleClickOpen = () => {
    if (!data) {
      return alert("Харах мэдээллээ сонгоно уу");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Grid
            container
            size={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography fontWeight="bold">
                {data?.entitle || "Мэдээлэл харагдахгүй байна"}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => setEng(!eng)}>
                {eng ? "English" : "Монгол"}
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container size={12} spacing={2}>
            {eng && (
              <Grid item size={12} flex>
                <Typography variant="subtitle2" color="textSecondary">
                  Гарчиг /Англи/ :
                </Typography>
                <Typography variant="h6">{data?.entitle}</Typography>
              </Grid>
            )}
            {!eng && (
              <Grid item size={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Гарчиг /Монгол/
                </Typography>
                <Typography variant="h6">{data?.mntitle}</Typography>
              </Grid>
            )}
            <Grid container size={12} spacing={2} mb={2}>
              <Grid item size={6}>
                <Box
                  component="img"
                  src={data?.image_url}
                  loading="lazy"
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </Grid>
              <Grid container size={6} spacing={2}>
                {eng && (
                  <Grid item size={12} sm={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Дэд гарчиг (Англи)
                    </Typography>
                    <Typography style={{ textAlign: "justify" }}>
                      {data?.endescription}
                    </Typography>
                  </Grid>
                )}
                {!eng && (
                  <Grid item size={12} sm={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Дэд гарчиг (Монгол)
                    </Typography>
                    <Typography style={{ textAlign: "justify" }}>
                      {data?.mndescription}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
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

export default SeeDetailsProduct;
