import { AUTH_ROUTERS } from "../../lib/enums/enums";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogOut/useLogOut";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

export const AuthButtons = () => {
  const { getLocaleStorage } = useLocaleStorage({ key: "token" });
  const { logout } = useLogout();

  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigate();

  const handleAuthButtons = () => {
    switch (location.pathname) {
      case AUTH_ROUTERS.SIGN_UP:
        return (
          <Button
            variant="contained"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigation(AUTH_ROUTERS.SIGN_IN)}
          >
            {t("signIn")}
          </Button>
        );
      case AUTH_ROUTERS.SIGN_IN:
        return (
          <Button
            variant="contained"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigation(AUTH_ROUTERS.SIGN_UP)}
          >
            {t("signUp")}
          </Button>
        );
      default:
        return (
          <Button
            variant="contained"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => navigation(AUTH_ROUTERS.SIGN_IN)}
          >
            {t("signIn")}
          </Button>
        );
    }
  };

  if (getLocaleStorage()) {
    return (
      <Box>
        <Button
          variant="contained"
          style={{ whiteSpace: "nowrap" }}
          onClick={logout}
        >
          {t("signOut")}
        </Button>
      </Box>
    );
  }

  return <Box>{handleAuthButtons()}</Box>;
};
