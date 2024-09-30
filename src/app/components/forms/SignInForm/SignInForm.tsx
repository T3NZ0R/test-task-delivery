import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {Button, Stack, TextField, Typography} from "@mui/material";
import { validationSchemaSignIn } from "../../../lib/schemes/schemes";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { IUser } from "../../../lib/interfaces/interfaces";

export const SignInForm = () => {
  const { t } = useTranslation();
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
          navigate(`/${user.id}/create`);
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={2} width={"100%"} height={"fit-content"}>
        <Typography variant="h2" width={"100%"} textAlign={"center"} pb={3}>
          {t("welcomeBack")}
        </Typography>

        <TextField
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email }
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
          helperText={formik.touched.password && formik.errors.password }
          label={t("password")}
        />
        <Button variant="contained" size="large" type="submit">
          {t("signIn")}
        </Button>
      </Stack>
    </form>
  );
};

