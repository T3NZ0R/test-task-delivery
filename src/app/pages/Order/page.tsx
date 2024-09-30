import { Box } from "@mui/material";
import { OrderForm } from "../../components/forms/OrderForm/OrderForm";

export const OrderPage = () => {

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <OrderForm />
    </Box>
  );
};
