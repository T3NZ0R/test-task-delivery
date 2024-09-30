import React, { FC, PropsWithChildren } from "react";
import { Box, Stack } from "@mui/material";
import { AsideNavigation } from "../../../components/AsideNavigation/AsideNavigation";
import { ContentLayout } from "../ContentLayout/ContentLayout";

export const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" gap={2}>
      <AsideNavigation />
      <ContentLayout>
        <Box width={"88%"} display={"flex"} justifyContent={"center"} height={"100%"}>
          {children}
        </Box>
      </ContentLayout>
    </Stack>
  );
};
