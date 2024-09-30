import { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { AUTH_ROUTERS } from "../enums/enums";
import { NotAuthedLayout } from "./NotAuthedLayout/NotAuthedLayout";
import { GeneralLayout } from "./GeneralLayout/GeneralLayout";
import { Header } from "../../components/Header/Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const handleLayout = () => {
    switch (location.pathname) {
      case AUTH_ROUTERS.SIGN_IN:
      case AUTH_ROUTERS.SIGN_UP:
        return <NotAuthedLayout children={children} />;
      default:
        return <GeneralLayout children={children} />;
    }
  };

  return (
    <Box>
      <Header />
      {handleLayout()}
    </Box>
  );
};
