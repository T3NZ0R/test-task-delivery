import * as Yup from "yup";
import { t } from "i18next";

export const validationSchemaSignUp = Yup.object().shape({
  username: Yup.string()
    .required(t("usernameRequired"))
    .min(3, t("usernameMin")),
  email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
  password: Yup.string()
    .required(t("passwordRequired"))
    .min(8, t("passwordMin"))
    .matches(/[a-z]/, t("passwordLowercase"))
    .matches(/[A-Z]/, t("passwordUppercase"))
    .matches(/\d/, t("passwordNumber"))
    .matches(/[!@#$%^&*(),.?":{}|<>]/, t("passwordSpecialCharacter")),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], t("passwordsMustMatch"))
    .required(t("passwordConfirmRequired")),
});

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
  password: Yup.string()
    .required(t("passwordRequired"))
    .min(8, t("passwordMin"))
    .matches(/[a-z]/, t("passwordLowercase"))
    .matches(/[A-Z]/, t("passwordUppercase"))
    .matches(/\d/, t("passwordNumber"))
    .matches(/[!@#$%^&*(),.?":{}|<>]/, t("passwordSpecialCharacter")),
});

export const validationSchemaOrderRequest = Yup.object().shape({
  id: Yup.string().required(t("idRequired")),
  cityOrigin: Yup.string()
    .required(t("originCityRequired"))
    .min(2, t("originCityMin")),
  cityDestination: Yup.string()
    .required(t("destinationCityRequired"))
    .min(2, t("destinationCityMin")),
  type: Yup.string().required(t("typeRequired")),
  date: Yup.date().required(t("dateRequired")),
  createdAt: Yup.string().required(t("createdAtRequired")),
  description: Yup.string()
    .required(t("descriptionRequired"))
    .min(10, t("descriptionMin")),
});

export const validationSchemaDeliverRequest = Yup.object().shape({
  id: Yup.string().required(t("idRequired")),
  cityOrigin: Yup.string()
    .required(t("originCityRequired"))
    .min(2, t("originCityMin")),
  cityDestination: Yup.string()
    .required(t("destinationCityRequired"))
    .min(2, t("destinationCityMin")),
  date: Yup.date().required(t("dateRequired")),
  createdAt: Yup.string().required(t("createdAtRequired")),
});
