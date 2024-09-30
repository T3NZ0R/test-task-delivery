import * as Yup from "yup";
import { t } from "i18next";

export const validationSchemaSignUp = Yup.object().shape({
  username: Yup.string()
    .required(t("usernameRequired")) // Username is required
    .min(3, t("usernameMin")), // Username must be at least 3 characters
  email: Yup.string()
    .email(t("emailInvalid")) // Invalid email address
    .required(t("emailRequired")), // Email is required
  password: Yup.string()
    .required(t("passwordRequired")) // Password is required
    .min(8, t("passwordMin")) // Password must be at least 8 characters
    .matches(/[a-z]/, t("passwordLowercase")) // Password must contain at least one lowercase letter
    .matches(/[A-Z]/, t("passwordUppercase")) // Password must contain at least one uppercase letter
    .matches(/\d/, t("passwordNumber")) // Password must contain at least one number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      t("passwordSpecialCharacter") // Password must contain at least one special character
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], t("passwordsMustMatch")) // Passwords must match
    .required(t("passwordConfirmRequired")), // Please confirm your password
});

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email(t("emailInvalid")) // Invalid email address
    .required(t("emailRequired")), // Email is required
  password: Yup.string()
    .required(t("passwordRequired")) // Password is required
    .min(8, t("passwordMin")) // Password must be at least 8 characters
    .matches(/[a-z]/, t("passwordLowercase")) // Password must contain at least one lowercase letter
    .matches(/[A-Z]/, t("passwordUppercase")) // Password must contain at least one uppercase letter
    .matches(/\d/, t("passwordNumber")) // Password must contain at least one number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      t("passwordSpecialCharacter") // Password must contain at least one special character
    ),
});

export const validationSchemaOrderRequest = Yup.object().shape({
  id: Yup.string().required(t("idRequired")), // ID is required

  cityOrigin: Yup.string()
    .required(t("originCityRequired")) // Origin city is required
    .min(2, t("originCityMin")), // Origin city must be at least 2 characters
  cityDestination: Yup.string()
    .required(t("destinationCityRequired")) // Destination city is required
    .min(2, t("destinationCityMin")), // Destination city must be at least 2 characters
  type: Yup.string().required(t("typeRequired")), // Type is required
  date: Yup.date().required(t("dateRequired")), // Date is required
  createdAt: Yup.string().required(t("createdAtRequired")), // Creation date is required
  description: Yup.string()
    .required(t("descriptionRequired")) // Description is required
    .min(10, t("descriptionMin")), // Description must be at least 10 characters
});

export const validationSchemaDeliverRequest = Yup.object().shape({
  id: Yup.string().required(t("idRequired")), // ID is required

  cityOrigin: Yup.string()
    .required(t("originCityRequired")) // Origin city is required
    .min(2, t("originCityMin")), // Origin city must be at least 2 characters
  cityDestination: Yup.string()
    .required(t("destinationCityRequired")) // Destination city is required
    .min(2, t("destinationCityMin")), // Destination city must be at least 2 characters
  date: Yup.date().required(t("dateRequired")), // Date is required
  createdAt: Yup.string().required(t("createdAtRequired")), // Creation date is required
});
