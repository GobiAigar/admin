"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import FileUploader from "../../components/website/FileUploader";
import { Backend_Endpoint } from "@/constants/constants";

const AddSustainability = () => {
  const [open, setOpen] = useState(false);
  const [setFieldValue, fieldName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant="outlined" onClick={() => handleClickOpen(true)}>
        Нэмэх
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={{
            entitle: "",
            mntitle: "",
            endescription: "",
            mndescription: "",
            image_url: "",
          }}
          onSubmit={async (values) => {
            try {
              const response = await fetch(
                `${Backend_Endpoint}/api/sustainability`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );
              if (response.ok) {
                handleClose();
              }
            } catch (error) {
              console.error("Нэмэх алдаа:", error);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <DialogTitle>Гэрчилгээ нэмэх</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Гарчиг /Англи/"
                  fullWidth
                  value={values.entitle}
                  onChange={(e) => setFieldValue("entitle", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Гарчиг /Монгол/"
                  fullWidth
                  value={values.mntitle}
                  onChange={(e) => setFieldValue("mntitle", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Тайлбар /Англи/"
                  fullWidth
                  value={values.endescription}
                  onChange={(e) =>
                    setFieldValue("endescription", e.target.value)
                  }
                />
                <TextField
                  margin="dense"
                  label="Тайлбар /Монгол/"
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

export default AddSustainability;
