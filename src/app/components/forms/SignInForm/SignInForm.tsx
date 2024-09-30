import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { validationSchemaSignIn } from "../../../lib/schemes/schemes";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../lib/interfaces/interfaces";

export const SignInForm = () => {
  const navigate = useNavigate();

  const userLocalStorage = useLocaleStorage({ key: "users" });
  const tokenLocalStorage = useLocaleStorage({ key: "token" });
  const activeUserLocalStorage = useLocaleStorage({ key: "activeUser" });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => {
      const users = userLocalStorage.getLocaleStorage();
      JSON.parse(users || "[]").map((user: IUser) => {
        if (user.email === values.email && user.password === values.password) {
          tokenLocalStorage.setLocaleStorage(crypto.randomUUID());
          activeUserLocalStorage.setLocaleStorage(JSON.stringify(user));
          navigate(`/${user.id}`);
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={2} width={"100%"} height={"fit-content"}>
        <Typography variant="h2" width={"100%"} textAlign={"center"} pb={3}>
          Welcome back!
        </Typography>

        <TextField
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
        />
        <TextField
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
        />
        <Button variant="contained" size="large" type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
