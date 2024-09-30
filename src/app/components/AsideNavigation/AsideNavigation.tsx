import React from "react";
import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { NavigationItem } from "./NavigationItem";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useLocation } from "react-router-dom";

export const AsideNavigation = () => {
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });

  const userId = JSON.parse(getLocaleStorage() || "{}").id;
  const location = useLocation();

  return (
    <div className={styles.asideNavigation}>
      <Stack direction="column" gap={3} pl={3} pt={3}>
        <NavigationItem
          title="Create"
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
          title="User Requests"
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
          title="All Requests"
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
