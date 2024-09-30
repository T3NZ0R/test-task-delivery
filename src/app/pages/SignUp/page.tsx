import { Container } from "@mui/material";
import { SignUpForm } from "../../components/forms/SignUpForm/SignUpForm";

export const SignUp = () => {
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
      <SignUpForm />
    </Container>
  );
};
