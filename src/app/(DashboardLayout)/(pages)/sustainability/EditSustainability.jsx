"use client";

import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import FileUploader from "../../components/website/FileUploader";
import { IconEdit } from "@tabler/icons-react";
import { Backend_Endpoint } from "@/constants/constants";

const EditSustainability = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <IconButton onClick={handleClickOpen} color="primary">
        <IconEdit />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Formik
          initialValues={{
            entitle: data?.entitle || "",
            mntitle: data?.mntitle || "",
            endescription: data?.endescription || "",
            mndescription: data?.mndescription || "",
            image_url: data?.image_url || "",
          }}
          enableReinitialize={true}
          onSubmit={async (values) => {
            try {
              const response = await fetch(
                `${Backend_Endpoint}/api/sustainability/${data.id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );
              if (response.ok) {
                handleClose();
                window.location.reload();
              }
            } catch (error) {
              console.error("Засах алдаа:", error);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <DialogTitle>Гэрчилгээ засах</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Title"
                  fullWidth
                  value={values.entitle}
                  onChange={(e) => setFieldValue("entitle", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Гарчиг"
                  fullWidth
                  value={values.mntitle}
                  onChange={(e) => setFieldValue("mntitle", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  value={values.endescription}
                  onChange={(e) =>
                    setFieldValue("endescription", e.target.value)
                  }
                />
                <TextField
                  margin="dense"
                  label="Дэд гарчиг"
                  fullWidth
                  value={values.mndescription}
                  onChange={(e) =>
                    setFieldValue("mndescription", e.target.value)
                  }
                />
                <FileUploader
                  setFieldValue={setFieldValue}
                  fieldName="image_url"
                />
                {data?.image_url && (
                  <Box sx={{ my: 2 }}>
                    <Typography variant="body2">Одоогийн зураг:</Typography>
                    <CardMedia
                      component="img"
                      image={data.image_url}
                      alt="Uploaded"
                      sx={{
                        objectFit: "contain",
                        width: "100%",
                        maxHeight: 300,
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Буцах</Button>
                <Button type="submit">Шинэчлэх</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default EditSustainability;
