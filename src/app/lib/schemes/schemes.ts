import * as Yup from "yup";

export const validationSchemaSignUp = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const validationSchemaOrderRequest = Yup.object().shape({
  id: Yup.string().required('ID is required'),

  cityOrigin: Yup.string()
    .required('Origin city is required')
    .min(2, 'Origin city must be at least 2 characters'),

  cityDestination: Yup.string()
    .required('Destination city is required')
    .min(2, 'Destination city must be at least 2 characters'),

  type: Yup.string()
    .required('Type is required'),

  date: Yup.date()
    .required('Date is required'),

  createdAt: Yup.string()
    .required('Creation date is required'),

  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

export const validationSchemaDeliverRequest = Yup.object().shape({
  id: Yup.string().required('ID is required'),

  cityOrigin: Yup.string()
    .required('Origin city is required')
    .min(2, 'Origin city must be at least 2 characters'),

  cityDestination: Yup.string()
    .required('Destination city is required')
    .min(2, 'Destination city must be at least 2 characters'),

  date: Yup.date()
    .required('Date is required'),

  createdAt: Yup.string()
    .required('Creation date is required'),

});