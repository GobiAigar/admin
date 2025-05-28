import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useFormik } from "formik";
import FileUploader from "../website/FileUploader";
import { Grid, InputLabel } from "@mui/material";
import { Backend_Endpoint } from "@/constants/constants";

export default function EditHome({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!data) {
      return alert("Шинэчлэх мэдээллээ сонгоно уу");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        console.log(updated);

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
            {data?.entitle && (
              <Grid item size={12}>
                <InputLabel htmlFor="entitle">Англи гарчиг</InputLabel>
                <TextField
                  fullWidth
                  id="entitle"
                  name="entitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.entitle}
                />
              </Grid>
            )}
            {data?.mntitle && (
              <Grid item size={12}>
                <InputLabel htmlFor="mntitle">Монгол гарчиг</InputLabel>
                <TextField
                  fullWidth
                  id="mntitle"
                  name="mntitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.mntitle}
                />
              </Grid>
            )}
            {data?.ensubtitle && (
              <Grid item size={12}>
                <InputLabel htmlFor="ensubtitle">Англи дэд гарчиг</InputLabel>
                <TextField
                  fullWidth
                  id="ensubtitle"
                  name="ensubtitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.ensubtitle}
                />
              </Grid>
            )}
            {data?.mnsubtitle && (
              <Grid item size={12}>
                <InputLabel htmlFor="mnsubtitle">Монгол дэд гарчиг</InputLabel>
                <TextField
                  fullWidth
                  id="mnsubtitle"
                  name="mnsubtitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.mnsubtitle}
                />
              </Grid>
            )}
            <Grid container size={12}>
              {data?.image_url1 && (
                <Grid item size={6}>
                  <InputLabel htmlFor="image_url1">Зургийн хаяг</InputLabel>
                  <img
                    width={100}
                    src={formik.values.image_url1}
                    alt={formik.values.mntitle}
                  />
                  <FileUploader
                    setFieldValue={formik.setFieldValue}
                    fieldName="image_url1"
                  />
                </Grid>
              )}
              {data?.image_url2 && (
                <Grid item size={6}>
                  <InputLabel htmlFor="image_url2">Зургийн хаяг 2</InputLabel>
                  <img
                    width={100}
                    src={formik.values.image_url2}
                    alt={formik.values.mntitle}
                  />
                  <FileUploader
                    setFieldValue={formik.setFieldValue}
                    fieldName="image_url2"
                  />
                </Grid>
              )}
              {data?.image_url3 && (
                <Grid item size={6}>
                  <InputLabel htmlFor="image_url3">Зургийн хаяг 3</InputLabel>
                  <img
                    width={100}
                    src={formik.values.image_url3}
                    alt={formik.values.mntitle}
                  />
                  <FileUploader
                    setFieldValue={formik.setFieldValue}
                    fieldName="image_url3"
                  />
                </Grid>
              )}
              {data?.image_url4 && (
                <Grid item size={6}>
                  <InputLabel htmlFor="image_url4">Зургийн хаяг 4</InputLabel>
                  <img
                    width={100}
                    src={formik.values.image_url4}
                    alt={formik.values.mntitle}
                  />
                  <FileUploader
                    setFieldValue={formik.setFieldValue}
                    fieldName="image_url4"
                  />
                </Grid>
              )}
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
