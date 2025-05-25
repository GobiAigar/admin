"use client";

import { Backend_Endpoint } from "@/constants/constants";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Dialog,
  DialogActions,
  Alert,
  Snackbar,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditFaq = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const validationSchema = Yup.object({
    mnquestion: Yup.string().required("Асуулт шаардлагатай"),
    mnanswer: Yup.string().required("Хариулт шаардлагатай"),
    enquestion: Yup.string().required("Question is required"),
    enanswer: Yup.string().required("Answer is required"),
  });

  const formik = useFormik({
    initialValues: {
      mnquestion: data?.mnquestion,
      mnanswer: data?.mnanswer,
      enquestion: data?.enquestion,
      enanswer: data?.enanswer,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/faq/${data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setOpenSnackbar(true);
          resetForm();
          window.location.reload();
        } else {
          alert("Алдаа гарлаа. Дахин оролдоно уу.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <CardActions>
      <IconButton onClick={handleClickOpen} color="primary">
        <IconEdit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={3} minWidth={500} size={12}>
            <Card sx={{ padding: 2 }}>
              <CardHeader title="Мэдээ засах хэсэг" />
              <Divider />
              <Grid container spacing={2} size={12}>
                {/* MONGOL section */}
                <Grid container item xs={12} sm={6} size={6}>
                  <TextField
                    fullWidth
                    id="mnquestion"
                    name="mnquestion"
                    label="Монгол асуулт"
                    value={formik.values.mnquestion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mnquestion &&
                      Boolean(formik.errors.mnquestion)
                    }
                    helperText={
                      formik.touched.mnquestion && formik.errors.mnquestion
                    }
                  />
                  <TextField
                    fullWidth
                    id="mnanswer"
                    name="mnanswer"
                    label="Монгол хариулт"
                    multiline
                    rows={4}
                    value={formik.values.mnanswer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mnanswer && Boolean(formik.errors.mnanswer)
                    }
                    helperText={
                      formik.touched.mnanswer && formik.errors.mnanswer
                    }
                  />
                </Grid>

                {/* ENGLISH section */}
                <Grid container item xs={12} sm={6} size={6}>
                  <TextField
                    fullWidth
                    id="enquestion"
                    name="enquestion"
                    label="Question in English"
                    value={formik.values.enquestion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.enquestion &&
                      Boolean(formik.errors.enquestion)
                    }
                    helperText={
                      formik.touched.enquestion && formik.errors.enquestion
                    }
                  />
                  <TextField
                    fullWidth
                    id="enanswer"
                    name="enanswer"
                    label="Answer in English"
                    multiline
                    rows={4}
                    value={formik.values.enanswer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.enanswer && Boolean(formik.errors.enanswer)
                    }
                    helperText={
                      formik.touched.enanswer && formik.errors.enanswer
                    }
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Үгүй</Button>
            <Button color="primary" variant="contained" type="submit">
              Тийм
            </Button>
          </DialogActions>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            Амжилттай Засагдлаа!
          </Alert>
        </Snackbar>
      </Dialog>
    </CardActions>
  );
};

export default EditFaq;
