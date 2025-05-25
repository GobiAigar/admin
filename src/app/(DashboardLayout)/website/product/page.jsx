"use client";

import {
  Box,
  Button,
  CardMedia,
  FormControl,
  Grid,
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
import { Formik, Form } from "formik";
import FileUploader from "../../components/website/FileUploader";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [isEnglish, setEnglish] = useState(false);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState(1);
  const [filteredData, setFilteredData] = useState(null);
  const [previousImageUrl, setPreviousImageUrl] = useState("");

  const handleClickOpen = () => {
    if (!filteredData) return; 
    setOpen(true);
    setPreviousImageUrl(filteredData.image_url || "");
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/product`);
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setFilteredData(datas?.find((item) => item?.id === id));
  }, [id, datas]);

  useEffect(() => {
    fetchData();
  }, [datas]);

  const handleSubmit = async (values) => {
    const updatedValues = { ...values };
    if (updatedValues.image_url === previousImageUrl) {
      delete updatedValues.image_url;
    }

    try {
      const response = await fetch(`${Backend_Endpoint}/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedValues),
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
                  {id !== 1 && (
                    <>
                      <TextField
                        required
                        margin="dense"
                        id="endescription"
                        name="endescription"
                        label="Description"
                        value={values.endescription}
                        onChange={(e) =>
                          setFieldValue("endescription", e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                      />
                      <TextField
                        required
                        margin="dense"
                        id="mndescription"
                        name="mndescription"
                        label="Дэд гарчиг"
                        value={values.mndescription}
                        onChange={(e) =>
                          setFieldValue("mndescription", e.target.value)
                        }
                        fullWidth
                        variant="outlined"
                      />
                    </>
                  )}

                  <FileUploader
                    setFieldValue={setFieldValue}
                    fieldName="image_url"
                  />

                  {filteredData?.image_url && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">Одоогийн зураг:</Typography>
                      <CardMedia
                        component="img"
                        image={filteredData.image_url}
                        alt="Uploaded Image"
                        sx={{
                          width: "100%",
                          maxHeight: 300,
                          objectFit: "contain",
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  )}
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
