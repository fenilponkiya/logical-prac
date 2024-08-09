import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const Form = () => {
  const mockApiCall = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success", data: formData });
      }, 2000);
    });
  };

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is Required"),
    password: Yup.string()
      .min(4, "password is too short")
      .max(15, "Password is too long")
      .required("password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: DisplayingErrorMessagesSchema,

    onSubmit: async (values) => {
      try {
        const response = await mockApiCall(values);
        if (response.status === "success") {
          toast.success("User Login successfully");
          formik.resetForm();
        }
      } catch (err) {
        toast.error("User Login failed");
      }
    },
  });

  const ErrorTypography = ({ error }) => {
    return <Typography color="red">{error}</Typography>;
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            height: "100vh",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Typography variant="h5" mb={2} textAlign={"center"}>
            Login Form
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            size="small"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name"
            helperText={
              formik.touched.name &&
              formik.errors.name && (
                <ErrorTypography error={formik.errors.name} />
              )
            }
          />
          <TextField
            sx={{ mb: 2 }}
            size="small"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="E-mail"
            helperText={
              formik.touched.email &&
              formik.errors.email && (
                <ErrorTypography error={formik.errors.email} />
              )
            }
          />
          <TextField
            size="small"
            sx={{ mb: 2 }}
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            helperText={
              formik.touched.password &&
              formik.errors.password && (
                <ErrorTypography error={formik.errors.password} />
              )
            }
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;
