/* eslint-disable jsx-a11y/label-has-for */
"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Zoom,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  Switch,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Backend_Endpoint } from "@/constants/constants";

const Input = styled("input")({
  display: "none",
});

function PageHeader({ setRender, render }) {
  const [openQuestion, setOpenQuestion] = useState(false);
  const [openStatistic, setOpenStatistic] = useState(false);

  const handleCreateQuestionOpen = () => {
    setOpenQuestion(true);
  };
  const handleCreateStatisticOpen = () => {
    setOpenStatistic(true);
  };

  const handleCloseQuestion = () => {
    setOpenQuestion(false);
  };
  const handleCloseStatistic = () => {
    setOpenStatistic(false);
  };

  return (
    <>
      <Grid
        container
        gap={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Түгээмэл асуулт хариулт, Статистик
          </Typography>
        </Grid>
        <Grid container item spacing={3} justifyContent="flex-end">
          <Grid item>
            <Button
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              onClick={handleCreateQuestionOpen}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Асуулт нэмэх
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              onClick={handleCreateStatisticOpen}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Статистик нэмэх
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openQuestion}
        onClose={handleCloseQuestion}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="body">Асуулт нэмэх</Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            enquestion: "",
            mnquestion: "",
            enanswer: "",
            mongolia: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            enquestion: Yup.string()
              .max(255)
              .required("Асуултын англи хэлбэрийг оруулна уу"),
            mnquestion: Yup.string()
              .max(255)
              .required("Асуултын монгол хэлбэрийг оруулна уу"),
            enanswer: Yup.string()
              .max(255)
              .required("Хариултын англи хэлбэрийг оруулна уу"),
            mnanswer: Yup.string()
              .max(255)
              .required("Хариултын англи хэлбэрийг оруулна уу"),
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const response = await fetch(`${Backend_Endpoint}/api/faq`, {
                method: "POST",
                body: JSON.stringify(_values),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();

              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              setRender(!render);
              handleCloseStatistic();
              handleCloseQuestion();
              alert("Амжилттай нэмэгдлээ");
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.mnquestion && errors.mnquestion)}
                      fullWidth
                      helperText={touched.mnquestion && errors.mnquestion}
                      label={"Асуултын монгол хэлбэр"}
                      name="mnquestion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mnquestion}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.mnanswer && errors.mnanswer)}
                      fullWidth
                      helperText={touched.mnanswer && errors.mnanswer}
                      label="Хариултын монгол хэлбэр"
                      name="mnanswer"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mnanswer}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.enquestion && errors.enquestion)}
                      fullWidth
                      helperText={touched.enquestion && errors.enquestion}
                      label="Асуултын англи хэлбэр"
                      name="enquestion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.enquestion}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.enanswer && errors.enanswer)}
                      fullWidth
                      helperText={touched.enanswer && errors.enanswer}
                      label="Хариултын англи хэлбэр"
                      name="enanswer"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.enanswer}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3,
                }}
              >
                <Button color="secondary" onClick={handleCloseQuestion}>
                  Гарах
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  Нэмэх
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openStatistic}
        onClose={handleCloseStatistic}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="body">Статистик нэмэх</Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            english: "",
            mongolia: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            english: Yup.string()
              .max(255)
              .required("Асуултын англи хэлбэрийг оруулна уу"),
            mongolia: Yup.string()
              .max(255)
              .required("Асуултын монгол хэлбэрийг оруулна уу"),
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              const response = await fetch(
                `${Backend_Endpoint}/api/statistics`,
                {
                  method: "POST",
                  body: JSON.stringify(_values),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              setRender(!render);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              alert("Амжилттай нэмэгдлээ");
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.english && errors.english)}
                      fullWidth
                      helperText={touched.english && errors.english}
                      label={"Англи"}
                      name="english"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.english}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item size={12}>
                    <TextField
                      error={Boolean(touched.mongolia && errors.mongolia)}
                      fullWidth
                      helperText={touched.mongolia && errors.mongolia}
                      label="Монгол"
                      name="mongolia"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mongolia}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3,
                }}
              >
                <Button color="secondary" onClick={handleCloseStatistic}>
                  Гарах
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  Нэмэх
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
