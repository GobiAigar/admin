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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Backend_Endpoint } from "@/constants/constants";
import FileUploader from "../website/FileUploader";
import * as Yup from "yup";
import { useState } from "react";

function AddNews() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object({
    entitle: Yup.string().required("Title is required"),
    mntitle: Yup.string().required("Гарчиг шаардлагатай"),
    enjournalist: Yup.string().required("Journalist is required"),
    mnjournalist: Yup.string().required("Нийтлэлч шаардлагатай"),
    endescription: Yup.string().required("Description is required"),
    mndescription: Yup.string().required("Мэдээний дэлгэрэнгүй шаардлагатай"),
    image_url: Yup.string().required("Зураг шаардлагатай"),
  });

  const formik = useFormik({
    initialValues: {
      entitle: "",
      mntitle: "",
      enjournalist: "",
      mnjournalist: "",
      endescription: "",
      mndescription: "",
      image_url: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/news`, {
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

            <Grid container spacing={2} columnSpacing={2}>
              <Grid size={{ xs: 12, sm: 6 }} container spacing={2}>
                <TextField
                  fullWidth
                  id="mntitle"
                  name="mntitle"
                  label="Гарчиг"
                  value={formik.values.mntitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mntitle && Boolean(formik.errors.mntitle)
                  }
                  helperText={formik.touched.mntitle && formik.errors.mntitle}
                />

                <TextField
                  fullWidth
                  id="mnjournalist"
                  name="mnjournalist"
                  label="Нийтлэлч"
                  value={formik.values.mnjournalist}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mnjournalist &&
                    Boolean(formik.errors.mnjournalist)
                  }
                  helperText={
                    formik.touched.mnjournalist && formik.errors.mnjournalist
                  }
                />
                <TextField
                  fullWidth
                  id="mndescription"
                  name="mndescription"
                  label="Мэдээний дэлгэрэнгүй"
                  multiline
                  rows={4}
                  value={formik.values.mndescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mndescription &&
                    Boolean(formik.errors.mndescription)
                  }
                  helperText={
                    formik.touched.mndescription && formik.errors.mndescription
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} container columnSpacing={2}>
                <TextField
                  fullWidth
                  id="entitle"
                  name="entitle"
                  label="Title"
                  value={formik.values.entitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.entitle && Boolean(formik.errors.entitle)
                  }
                  helperText={formik.touched.entitle && formik.errors.entitle}
                />
                <TextField
                  fullWidth
                  id="enjournalist"
                  name="enjournalist"
                  label="Journalist"
                  value={formik.values.enjournalist}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.enjournalist &&
                    Boolean(formik.errors.enjournalist)
                  }
                  helperText={
                    formik.touched.enjournalist && formik.errors.enjournalist
                  }
                />
                <TextField
                  fullWidth
                  id="endescription"
                  name="endescription"
                  label="Description"
                  multiline
                  rows={4}
                  value={formik.values.endescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.endescription &&
                    Boolean(formik.errors.endescription)
                  }
                  helperText={
                    formik.touched.endescription && formik.errors.endescription
                  }
                />
              </Grid>
              <Grid size={12}>
                <FileUploader
                  setFieldValue={formik.setFieldValue}
                  fieldName="image_url"
                  onClear={() => formik.setFieldValue("image_url", "")}
                />
                {formik.touched.image_url && formik.errors.image_url && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {formik.errors.image_url}
                  </Alert>
                )}
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
            </Grid>
          </Card>
        </Grid>
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
    </>
  );
}

export default AddNews;
