"use client";

import { useFormik } from "formik";
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  Button,
  Snackbar,
  Alert,
  Dialog,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Backend_Endpoint } from "@/constants/constants";
import FileUploader from "../website/FileUploader";
import * as Yup from "yup";
import React, { useState } from "react";

function AddUser() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    email: Yup.string().required("email шаардлагатай"),
    password: Yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/user/register`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {"Админ нэмэх"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            minWidth={500}
            width="auto"
          >
            <Card sx={{ padding: 2 }}>
              <CardHeader title="Мэдээ нэмэх хэсэг" />
              <Divider />

              <Grid size={12} container spacing={2}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Хэрэглэгчийн нэр"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Э-мэйл"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Нууц үг"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Card>
          </Grid>
        </form>
      </Dialog>
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
    </>
  );
}

export default AddUser;
