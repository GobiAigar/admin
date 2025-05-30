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
import { Backend_Endpoint } from "@/constants/constants";

const AddFaq = () => {
  const [open, setOpen] = useState(false);

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
            enquestion: "",
            mnquestion: "",
            enanswer: "",
            mnanswer: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await fetch(`${Backend_Endpoint}/api/faq`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              if (response.ok) {
                handleClose();
                resetForm();
                window.location.reload();
              }
            } catch (error) {
              console.error("Нэмэх алдаа:", error);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <DialogTitle>Нийтлэг асуулт хариулт нэмэх</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Асуулт /Англи/"
                  fullWidth
                  value={values.enquestion}
                  onChange={(e) => setFieldValue("enquestion", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Хариулт /Англи/"
                  fullWidth
                  value={values.enanswer}
                  onChange={(e) => setFieldValue("enanswer", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Асуулт /Монгол/"
                  fullWidth
                  value={values.mnquestion}
                  onChange={(e) => setFieldValue("mnquestion", e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Хариулт /Монгол/"
                  fullWidth
                  value={values.mnanswer}
                  onChange={(e) => setFieldValue("mnanswer", e.target.value)}
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

export default AddFaq;
