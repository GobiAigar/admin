import {
  Button,
  TextField,
  Grid,
  InputLabel,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import FileUploader from "../website/FileUploader";
import { Backend_Endpoint } from "@/constants/constants";

export default function EditHome({ data, onClose, onSubmitSuccess }) {
  console.log("data", data);
  const formik = useFormik({
    initialValues: {
      entitle: data?.entitle || "",
      mntitle: data?.mntitle || "",
      ensubtitle: data?.ensubtitle || "",
      mnsubtitle: data?.mnsubtitle || "",
      image_url1: data?.image_url1 || "",
      image_url2: data?.image_url2 || "",
      image_url3: data?.image_url3 || "",
      image_url4: data?.image_url4 || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${Backend_Endpoint}/api/website/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const updated = await response.json();
        console.log("Updated:", updated);

        if (onSubmitSuccess) onSubmitSuccess();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ margin: 2 }}>
        <Grid size={{ xs: 6 }}>
          <InputLabel htmlFor="entitle">Англи гарчиг</InputLabel>
          <TextField
            fullWidth
            id="entitle"
            name="entitle"
            onChange={formik.handleChange}
            value={formik.values.entitle}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel htmlFor="mntitle">Монгол гарчиг</InputLabel>
          <TextField
            fullWidth
            id="mntitle"
            name="mntitle"
            onChange={formik.handleChange}
            value={formik.values.mntitle}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel htmlFor="ensubtitle">Англи дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            id="ensubtitle"
            name="ensubtitle"
            onChange={formik.handleChange}
            value={formik.values.ensubtitle}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel htmlFor="mnsubtitle">Монгол дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            id="mnsubtitle"
            name="mnsubtitle"
            onChange={formik.handleChange}
            value={formik.values.mnsubtitle}
          />
        </Grid>

        {(data.id === 14 || data.id === 16 ? [1, 2, 3, 4] : [1]).map((i) => {
          const url = formik.values[`image_url${i}`];
          return (
            <Grid size={{ xs: 6 }} key={i}>
              <InputLabel htmlFor={`image_url${i}`}>{`Зураг ${i}`}</InputLabel>
              <FileUploader
                setFieldValue={formik.setFieldValue}
                fieldName={`image_url${i}`}
                initialPreview={url}
              />
            </Grid>
          );
        })}
      </Grid>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Буцах
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Засах
        </Button>
      </DialogActions>
    </form>
  );
}
