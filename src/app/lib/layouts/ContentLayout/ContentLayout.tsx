import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 96px)",
        width: "90%",
      }}
    >
      {children}
    </Box>
  );
};
