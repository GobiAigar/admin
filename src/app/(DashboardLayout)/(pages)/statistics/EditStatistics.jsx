"use client";

import { Backend_Endpoint } from "@/constants/constants";
import {
  Button,
  Dialog,
  CardHeader,
  DialogActions,
  Alert,
  Snackbar,
  TextField,
  Grid,
  IconButton,
  Box,
  Card,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditStatistic = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const validationSchema = Yup.object({
    english: Yup.string().required("Шаардлагатай"),
    mongolia: Yup.string().required("Шаардлагатай"),
  });

  const formik = useFormik({
    initialValues: {
      english: data?.english,
      mongolia: data?.mongolia,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          `${Backend_Endpoint}/api/statistics/${values.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setOpenSnackbar(true);
          resetForm();
          window.location.reload();
        } else {
          alert("Алдаа гарлаа. Дахин оролдоно уу.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Box>
      <IconButton onClick={handleClickOpen} color="primary">
        <IconEdit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Grid container spacing={3} minWidth={500} size={12}>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Card
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: "2",
              }}
            >
              <CardHeader title="Мэдээ засах хэсэг" />
              <Grid container sm={6} size={12} spacing={2}>
                <TextField
                  fullWidth
                  id="english"
                  name="english"
                  label="Англи"
                  multiline
                  value={formik.values.english}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.english && Boolean(formik.errors.english)
                  }
                  helperText={formik.touched.english && formik.errors.english}
                />
                <TextField
                  fullWidth
                  id="mongolia"
                  name="mongolia"
                  label="Монгол"
                  multiline
                  value={formik.values.mongolia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mongolia && Boolean(formik.errors.mongolia)
                  }
                  helperText={formik.touched.mongolia && formik.errors.mongolia}
                />
                <Divider />
              </Grid>
              <DialogActions>
                <Button onClick={handleClose}>Буцах</Button>
                <Button color="primary" variant="contained" type="submit">
                  Шинэчлэх
                </Button>
              </DialogActions>
            </Card>
          </form>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            Амжилттай шинэчлэгдлээ!
          </Alert>
        </Snackbar>
      </Dialog>
    </Box>
  );
};

export default EditStatistic;
