import React from "react";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { Navigate, useLocation, useParams } from "react-router-dom";

export const RedirectPage = () => {
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });
  const location = useLocation();

  const params = useParams();

  if (location.pathname === "/") {
    return (
      <Navigate to={`/${JSON.parse(getLocaleStorage() || "{}").id}/create`} />
    );
  }

  if (JSON.parse(getLocaleStorage() || "{}").id === params.userId) {
    return <Navigate to="/requests" />;
  } else {
    return <Navigate to="/error" />;
  }
};
