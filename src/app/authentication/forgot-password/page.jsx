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

const Page = () => {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbar2, setOpenSnackbar2] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("Хэрэглэгчийн э-майл шаардлагатай"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${Backend_Endpoint}/api/user/otp`, {
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
          router.push("/authentication/recover-password");
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
                  Үргэлжлүүлэх
                </Button>
                <Box mt={2} textAlign="center">
                  <Link
                    href="/authentication/login"
                    style={{ color: "#1976d2" }}
                  >
                    Нэвтрэх
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
            Амжилттай илгээдлээ. Та имэйл хаяг руугаа OTP кодыг хүлээн авна уу.
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
