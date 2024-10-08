import { FC } from "react";
import { INavigationItem } from "../../lib/interfaces/interfaces";
import { Link, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export const NavigationItem: FC<INavigationItem> = ({ title, path, icon }) => {
  const location = useLocation();

  return (
    <Stack direction="row" gap={4}>
      {icon}{" "}
      <Link to={path} style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
        <Typography
          variant="subtitle2"
          color={
            location.pathname === path ||
            location.pathname.split("/")[1].includes("create")
              ? "primary"
              : "secondary"
          }
        >
          {title}
        </Typography>
      </Link>{" "}
    </Stack>
  );
};
