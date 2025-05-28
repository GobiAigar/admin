"useclient";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useFormik } from "formik";
import { Grid, InputLabel } from "@mui/material";
import FileUploader from "../website/FileUploader";
import { Backend_Endpoint } from "@/constants/constants";

export default function EditProduct({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      entitle: data?.entitle,
      mntitle: data?.mntitle,
      ensubtitle: data?.endescription,
      mnsubtitle: data?.mndescription,
      image_url: data?.image_url,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values);
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
        console.log("response", response);
        const updated = await response.json();
        console.log("updated", updated);

        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Шинэчлэх
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container size={12} spacing={2} sx={{ margin: 2 }}>
            <Grid item size={12}>
              <InputLabel htmlFor="entitle">Гарчиг /Англи/</InputLabel>
              <TextField
                fullWidth
                id="entitle"
                name="entitle"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.entitle}
              />
            </Grid>
            <Grid item size={12}>
              <InputLabel htmlFor="mntitle">Гарчиг /Монгол/</InputLabel>
              <TextField
                fullWidth
                id="mntitle"
                name="mntitle"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.mntitle}
              />
            </Grid>

            <Grid item size={12}>
              <InputLabel htmlFor="endescription">Тайлбар /Англи/</InputLabel>
              <TextField
                fullWidth
                id="endescription"
                name="endescription"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ensubtitle}
              />
            </Grid>

            <Grid item size={12}>
              <InputLabel htmlFor="mndescription">Тайлбар /Монгол/</InputLabel>
              <TextField
                fullWidth
                id="mndescription"
                name="endescription"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.mnsubtitle}
              />
            </Grid>

            <Grid container size={12}>
              <Grid item size={6}>
                <InputLabel htmlFor="image_url">Зургийн хаяг</InputLabel>
                <img
                  width={100}
                  src={formik.values.image_url}
                  alt={formik.values.mntitle}
                />
                <FileUploader
                  setFieldValue={formik.setFieldValue}
                  fieldName="image_url"
                  initialPreview={formik.values.image_url}
                />
              </Grid>
            </Grid>
            <Grid size={12}>
              <Button variant="outlined" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </>
  );
}
