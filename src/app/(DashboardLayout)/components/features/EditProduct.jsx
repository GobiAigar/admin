"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import { Grid, InputLabel, DialogActions } from "@mui/material";
import FileUploader from "../website/FileUploader";
import { Backend_Endpoint } from "@/constants/constants";

export default function EditProduct({ data, onClose, onSubmitSuccess }) {
  const formik = useFormik({
    initialValues: {
      entitle: data?.entitle,
      mntitle: data?.mntitle,
      endescription: data?.endescription,
      mndescription: data?.mndescription,
      image_url: data?.image_url,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
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
        const updated = await response.json();
        if (onSubmitSuccess) onSubmitSuccess();
        if (onClose) onClose();
      } catch (error) {
        throw new Error(error);
        console.log(error);
      }
    },
  });

  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ margin: 2 }}>
          <Grid size={{ xs: 6 }}>
            <InputLabel htmlFor="entitle">Гарчиг /Англи/</InputLabel>
            <TextField
              fullWidth
              id="entitle"
              name="entitle"
              onChange={formik.handleChange}
              value={formik.values.entitle}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <InputLabel htmlFor="mntitle">Гарчиг /Монгол/</InputLabel>
            <TextField
              fullWidth
              id="mntitle"
              name="mntitle"
              onChange={formik.handleChange}
              value={formik.values.mntitle}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <InputLabel htmlFor="endescription">Тайлбар /Англи/</InputLabel>
            <TextField
              fullWidth
              id="endescription"
              name="endescription"
              multiline
              minRows={4}
              onChange={formik.handleChange}
              value={formik.values.endescription}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <InputLabel htmlFor="mndescription">Тайлбар /Монгол/</InputLabel>
            <TextField
              fullWidth
              id="mndescription"
              name="mndescription"
              multiline
              minRows={4}
              onChange={formik.handleChange}
              value={formik.values.mndescription}
            />
          </Grid>

          <Grid container>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor="image_url">Зургийн хаяг</InputLabel>
              <FileUploader
                setFieldValue={formik.setFieldValue}
                fieldName="image_url"
                initialPreview={formik.values.image_url}
              />
            </Grid>
          </Grid>
        </Grid>

        <DialogActions sx={{ m: 1 }}>
          <Button onClick={onClose} color="primary" variant="outlined">
            Буцах
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Шинэчлэх
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
