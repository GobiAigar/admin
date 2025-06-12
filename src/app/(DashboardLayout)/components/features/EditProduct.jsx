"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import {
  Grid,
  InputLabel,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import FileUploader from "../website/FileUploader";
import { Backend_Endpoint } from "@/constants/constants";

const validationSchema = Yup.object({
  entitle: Yup.string().required("English title is required"),
  mntitle: Yup.string().required("Mongolian title is required"),
  endescription: Yup.string().required("English description is required"),
  mndescription: Yup.string().required("Mongolian description is required"),
  image_url1: Yup.string().url("Please enter a valid URL"),
});
const multiImageIds = [1, 2, 5];

export default function EditProduct({ data, onClose, onSubmitSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      entitle: data?.entitle || "",
      mntitle: data?.mntitle || "",
      endescription: data?.endescription || "",
      mndescription: data?.mndescription || "",
      image_url1: data?.image_url1 || "",
      image_url2: data?.image_url2 || "",
      image_url3: data?.image_url3 || "",
      image_url4: data?.image_url4 || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${Backend_Endpoint}/api/product/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updated = await response.json();
        if (onSubmitSuccess) onSubmitSuccess(updated);
        if (onClose) onClose();
      } catch (error) {
        console.error("Error updating product:", error);
        setError(error.message || "Failed to update product");
      } finally {
        setLoading(false);
      }
    },
  });
  const imageIndexes = multiImageIds.includes(data.id) ? [1, 2, 3, 4] : [1];
  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle>Бүтээгдэхүүн засах / Edit Product</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 1, p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel htmlFor="entitle">Гарчиг /Англи/ *</InputLabel>
            <TextField
              fullWidth
              id="entitle"
              name="entitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.entitle}
              error={formik.touched.entitle && Boolean(formik.errors.entitle)}
              helperText={formik.touched.entitle && formik.errors.entitle}
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel htmlFor="mntitle">Гарчиг /Монгол/ *</InputLabel>
            <TextField
              fullWidth
              id="mntitle"
              name="mntitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mntitle}
              error={formik.touched.mntitle && Boolean(formik.errors.mntitle)}
              helperText={formik.touched.mntitle && formik.errors.mntitle}
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel htmlFor="endescription">Тайлбар /Англи/ *</InputLabel>
            <TextField
              fullWidth
              id="endescription"
              name="endescription"
              multiline
              minRows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endescription}
              error={
                formik.touched.endescription &&
                Boolean(formik.errors.endescription)
              }
              helperText={
                formik.touched.endescription && formik.errors.endescription
              }
              disabled={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel htmlFor="mndescription">Тайлбар /Монгол/ *</InputLabel>
            <TextField
              fullWidth
              id="mndescription"
              name="mndescription"
              multiline
              minRows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mndescription}
              error={
                formik.touched.mndescription &&
                Boolean(formik.errors.mndescription)
              }
              helperText={
                formik.touched.mndescription && formik.errors.mndescription
              }
              disabled={loading}
            />
          </Grid>

          {imageIndexes.map((i) => {
            const key = `image_url${i}`;
            return (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <InputLabel htmlFor={key}>Зураг {i}</InputLabel>
                <FileUploader
                  setFieldValue={formik.setFieldValue}
                  fieldName={key}
                  initialPreview={formik.values[key]}
                  disabled={loading}
                />
                {formik.touched[key] && formik.errors[key] && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {formik.errors[key]}
                  </Alert>
                )}
              </Grid>
            );
          })}
        </Grid>
      </form>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          disabled={loading}
        >
          Буцах
        </Button>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !formik.isValid}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Шинэчилж байна..." : "Шинэчлэх"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
