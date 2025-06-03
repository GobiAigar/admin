"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  Grid,
  Card,
  Divider,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { Logo } from "@/app/(DashboardLayout)/layout/shared/Logo";

const Login2 = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbar2, setOpenSnackbar2] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required("Хэрэглэгчийн нэр шаардлагатай"),
    password: Yup.string().required("Нууц үг шаардлагатай"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          setOpenSnackbar(true);
          resetForm();
          sessionStorage.setItem("user", data.id);
          router.push("/");
        } else {
          setOpenSnackbar2(true);
          formik.setStatus({ loginError: data.message });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)",
        }}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={0}
            minWidth={400}
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: 6,
                  background: "#fff",
                  minWidth: 350,
                }}
              >
                <Box textAlign="center" mb={2}>
                  <Logo />
                  <Typography variant="h5" fontWeight={700} color="primary">
                    Системд нэвтрэх
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Хэрэглэгчийн нэр"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Нууц үг"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 2 }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: 2,
                  }}
                >
                  Нэвтрэх
                </Button>
                <Box mt={2} textAlign="center">
                  <Typography variant="body2">
                    Нууц үгээ мартсан уу?
                    <Link
                      sx={{ paddingLeft: 5 }}
                      href="/authentication/forgot-password"
                      style={{ color: "#1976d2" }}
                    >
                      Сэргээх
                    </Link>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            Амжилттай нэвтэрлээ
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSnackbar2}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" onClose={handleCloseSnackbar}>
            {formik.status &&
              formik.status.loginError &&
              formik.status.loginError}
          </Alert>
        </Snackbar>
      </Box>
    </PageContainer>
  );
};

export default Login2;
