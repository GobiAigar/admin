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
import Loading from "@/app/loading";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbar2, setOpenSnackbar2] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("И-мэйл хаяг буруу байна"),
    otp: Yup.string().required("Нэг удаагийн нууц үг (OTP) шаардлагатай"),
    password: Yup.string().required("Нууц үг шаардлагатай"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Нууц үг таарахгүй байна")
      .required("Нууц үг дахин оруулах шаардлагатай"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      repassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/user`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        setLoading(true);
        if (response.ok) {
          setOpenSnackbar(true);
          resetForm();
          router.push("/");
          setLoading(false);
        } else {
          setOpenSnackbar2(true);
          formik.setStatus({ loginError: data.message });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loading />;
  }

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
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    style={{ width: 60, marginBottom: 8 }}
                  />
                  <Typography variant="h5" fontWeight={700} color="primary">
                    Нууц үг сэргээх
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Хэрэглэгчийн имэйл"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Нууц үг"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  id="repassword"
                  name="repassword"
                  label="Нууц үг дахин оруулах"
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.repassword &&
                    Boolean(formik.errors.repassword)
                  }
                  helperText={
                    formik.touched.repassword && formik.errors.repassword
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  id="otp"
                  name="otp"
                  label="Нэг удаагийн нууц үг (OTP)"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
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
                  <Link
                    href="/authentication/forgot-password"
                    style={{ color: "#1976d2" }}
                  >
                    Сэргээх
                  </Link>
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
            Нууц үг амжилттай солиглоо.
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

export default Page;
