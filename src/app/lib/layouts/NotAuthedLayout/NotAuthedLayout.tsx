import  { FC, PropsWithChildren } from "react";
import Grid from "@mui/material/Grid2";
import Image from "../../../../assets/NotAuthedLayoutImg.png";
import { Box } from "@mui/material";

export const NotAuthedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={1} height={"100%"}>
      <Grid size={6}>{children}</Grid>
      <Grid size={6}>
        <Box width={"100%"} height={"auto"} sx={{ overflow: "hidden" }}>
          <img
            src={Image}
            alt="Smiling delivery man running on pavement with parcel"
            style={{
              width: "100%",
              objectFit: "cover",
              maxHeight: "calc(100vh - 96px)",
              objectPosition: "top",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
