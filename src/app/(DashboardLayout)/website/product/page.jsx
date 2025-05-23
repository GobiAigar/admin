"use client";

import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";
import FileUploader from "../../components/website/FileUploader";
import { Formik, Form } from "formik";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [isEnglish, setEnglish] = useState(false);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/product`);
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    setFilteredData(datas?.find((item) => item?.id == id));
  }, [id, datas]);

  useEffect(() => {
    fetchdata();
  }, []);

  const handleSubmit = async (values) => {
    console.log("zurag", values);

    try {
      const response = await fetch(`${Backend_Endpoint}/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Амжилттай шинэчиллээ");
      } else {
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    handleClose();
  };

  return (
    <Formik
      initialValues={{
        entitle: filteredData?.entitle || "",
        mntitle: filteredData?.mntitle || "",
        endescription: filteredData?.endescription || "",
        mndescription: filteredData?.mndescription || "",
        image_url: filteredData?.image_url || "",
      }}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <PageContainer title="Product" description="Product">
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <Button onClick={() => setEnglish(!isEnglish)} variant="outlined">
              {isEnglish ? "Монгол" : "Англи"}
            </Button>
            <Button variant="outlined" onClick={handleClickOpen}>
              Засах
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <Form>
                <DialogTitle>Засах</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="entitle"
                    name="entitle"
                    label="Title"
                    type="text"
                    value={values.entitle}
                    onChange={(e) => setFieldValue("entitle", e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    required
                    margin="dense"
                    id="mntitle"
                    name="mntitle"
                    label="Гарчиг"
                    value={values.mntitle}
                    onChange={(e) => setFieldValue("mntitle", e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <FileUploader
                    setFieldValue={setFieldValue}
                    fieldName="image_url"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Засах</Button>
                </DialogActions>
              </Form>
            </Dialog>
          </Box>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={12}>
              <FormControl sx={{ marginBottom: 2 }} fullWidth>
                <Select
                  id="sectionSelect"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                >
                  {datas.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.entitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <CardMedia
                component="img"
                height="600"
                image={values.image_url || ""}
                alt="Product"
                sx={{
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              {isEnglish ? (
                <>
                  <Typography variant="h4">{values.entitle}</Typography>
                  <Typography variant="body1" align="justify">
                    {values.endescription}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4">{values.mntitle}</Typography>
                  <Typography variant="body1" align="justify">
                    {values.mndescription}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </PageContainer>
      )}
    </Formik>
  );
};

export default Page;
