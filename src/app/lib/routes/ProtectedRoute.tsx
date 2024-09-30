import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IProtectedRoute } from "../interfaces/interfaces";

export const ProtectedRoute: FC<IProtectedRoute> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};
