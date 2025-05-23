"use client ";

import { useFormik } from "formik";
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  Button,
  Box,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Backend_Endpoint } from "@/constants/constants";

function AddNews() {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/news`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        alert("amjilttai nemegdlee");
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
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
            <Grid size={6} container spacing={2}>
              <TextField
                fullWidth
                id="mntitle"
                name="mntitle"
                label="Гарчиг"
                placeholder="Монгол"
                value={formik.values.mntitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mntitle && Boolean(formik.errors.mntitle)}
                helperText={formik.touched.mntitle && formik.errors.mntitle}
              />

              <TextField
                fullWidth
                id="mnjournalist"
                name="mnjournalist"
                label="Нийтлэлч"
                placeholder="Монгол"
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
                label="Description"
                placeholder="Монгол"
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
            <Grid size={6} container columnSpacing={2}>
              <TextField
                fullWidth
                id="entitle"
                name="entitle"
                label="Title"
                placeholder="English"
                value={formik.values.entitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.entitle && Boolean(formik.errors.entitle)}
                helperText={formik.touched.entitle && formik.errors.entitle}
              />
              <TextField
                fullWidth
                id="enjournalist"
                name="enjournalist"
                label="Journalist"
                placeholder="English"
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
                placeholder="English"
                value={formik.values.endescription}
                onChange={formik.handleChange}
                multiline
                rows={4}
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
            <Grid size={12} container>
              <TextField
                id="image_url"
                name="image_url"
                label="Зураг"
                required
                fullWidth
                value={formik.values.image_url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.image_url && Boolean(formik.errors.image_url)
                }
                helperText={formik.touched.image_url && formik.errors.image_url}
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </form>
  );
}

export default AddNews;
