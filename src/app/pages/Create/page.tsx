import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import createImg from "../../../assets/Create.png";
import { Title } from "../../lib/theme/styledComponent";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid width={"100%"} px={3} container>
        <Grid size={6}>
          <Box maxWidth={"490px"}>
            <Typography variant="h2" fontWeight={300} display={"inline"}>
              We can move you everywhere.
              <Title> Fast and Easily</Title>
            </Typography>
            <Typography variant="body1">
              Please choose your request. If you want to send a parcel, you need
              to create an Order type request. If you want to deliver a parcel
              that has already been ordered, you should create a Delivery type
              request.
            </Typography>
            <Stack direction="row" spacing={2} maxWidth={"80%"} mt={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("order")}
              >
                Order
              </Button>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate("deliver")}
              >
                Deliver
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              src={createImg}
              alt="Not Authed Layout"
              style={{ maxWidth: "560px", width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
