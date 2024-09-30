import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useLocation } from "react-router-dom";
import { NavigationItem } from "./NavigationItem";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AsideNavigation = () => {
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });

  const userId = JSON.parse(getLocaleStorage() || "{}").id;
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className={styles.asideNavigation}>
      <Stack direction="column" gap={3} pl={3} pt={3}>
        <NavigationItem
          title={t("create")}
          path={`/${userId}/create`}
          icon={
            <AddRoundedIcon
              color={
                location.pathname.includes(`/${userId}/create`)
                  ? "primary"
                  : "secondary"
              }
            />
          }
        />
        <NavigationItem
          title={t("userRequests")}
          path={`/${userId}/requests`}
          icon={
            <PersonRoundedIcon
              color={
                location.pathname === `/${userId}/requests`
                  ? "primary"
                  : "secondary"
              }
            />
          }
        />
        <NavigationItem
          title={t("allRequests")}
          path="/requests"
          icon={
            <PeopleRoundedIcon
              color={
                location.pathname === "/requests" ? "primary" : "secondary"
              }
            />
          }
        />
      </Stack>
    </div>
  );
};
