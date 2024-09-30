import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { OrderForm } from "../../components/forms/OrderForm/OrderForm";

export const OrderPage = () => {
  const { userId } = useParams();

  console.log(userId);
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
