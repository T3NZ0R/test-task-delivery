import { useFormik } from "formik";
import { Button, Stack, Typography, TextField } from "@mui/material";

import { validationSchemaSignUp } from "../../../lib/schemes/schemes";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../lib/interfaces/interfaces";

import { useTranslation } from "react-i18next";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { setLocaleStorage, getLocaleStorage } = useLocaleStorage({
    key: "users",
  });

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      id: crypto.randomUUID(),
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: (values) => {
      const users = getLocaleStorage();
      const isExist = JSON.parse(users || "[]").find(
        (user: IUser) => user.email === values.email
      );

      if (!isExist) {
        setLocaleStorage(
          JSON.stringify([
            ...JSON.parse(users || "[]"),
            {
              id: values.id,
              username: values.username,
              email: values.email,
              password: values.password,
            },
          ])
        );
        navigate("/sign-in");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={2} width={"100%"} height={"fit-content"}>
        <Typography variant="h2" width={"100%"} textAlign={"center"} pb={3}>
          {t("createAccount")}
        </Typography>

        <TextField
          id="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={
            formik.touched.username &&
            formik.errors.username 
          }
          name="username"
          value={formik.values.username}
          label={t("username")}
        />
        <TextField
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email &&
            formik.errors.email 
          }
          label={t("email")}
        />
        <TextField
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password &&
            formik.errors.password 
          }
          label={t("password")}
        />
        <TextField
          id="repeatPassword"
          type="password"
          name="repeatPassword"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword &&
            formik.errors.repeatPassword 
          }
          label={t("repeatPassword")}
        />
        <Button variant="contained" size="large" type="submit">
          {t("signUp")}
        </Button>
      </Stack>
    </form>
  );
};
