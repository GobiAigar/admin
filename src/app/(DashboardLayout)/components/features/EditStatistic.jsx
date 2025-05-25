"use client";

import { Backend_Endpoint } from "@/constants/constants";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Dialog,
  DialogActions,
  Alert,
  Snackbar,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploader from "../website/FileUploader";

const EditStatistic = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const validationSchema = Yup.object({
    english: Yup.string().required("Title is required"),
    mongolia: Yup.string().required("Гарчиг шаардлагатай"),
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
          `${Backend_Endpoint}/api/statistics/${data.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

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
    <CardActions>
      <IconButton onClick={handleClickOpen} color="primary">
        <IconEdit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={3} minWidth={500} size={12}>
            <Card sx={{ padding: 2 }}>
              <CardHeader title="Мэдээ засах хэсэг" />
              <Divider />
              <Grid container spacing={2} size={12}>
                {/* MONGOL section */}

                <TextField
                  fullWidth
                  id="english"
                  name="english"
                  label="Англи"
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
                  value={formik.values.mongolia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mongolia && Boolean(formik.errors.mongolia)
                  }
                  helperText={formik.touched.mongolia && formik.errors.mongolia}
                />
              </Grid>
            </Card>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Үгүй</Button>
            <Button color="primary" variant="contained" type="submit">
              Тийм
            </Button>
          </DialogActions>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            Амжилттай нэмэгдлээ
          </Alert>
        </Snackbar>
      </Dialog>
    </CardActions>
  );
};

export default EditStatistic;
