import { SignInForm } from "../../components/forms/SignInForm/SignInForm";
import { Container } from "@mui/material";

export const SignIn = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignInForm />
    </Container>
  );
};
