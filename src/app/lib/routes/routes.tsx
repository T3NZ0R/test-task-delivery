import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import {
  AllRequests,
  CreatePage,
  DeliverPage,
  OrderPage,
  SignIn,
  SignUp,
  UserRequests,
} from "../../pages";
import { RedirectPage } from "../../pages/Redirect/page";

export const AppRoutes = () => {
  const { getLocaleStorage } = useLocaleStorage({ key: "token" });

  const token = Boolean(getLocaleStorage());

  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<ProtectedRoute isLoggedIn={token} />}>
          <Route path="/" element={<RedirectPage />} />

          <Route path="/:userId">
            <Route index element={<RedirectPage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="create/order" element={<OrderPage />} />
            <Route path="create/deliver" element={<DeliverPage />} />
            <Route path="requests" element={<UserRequests />} />
          </Route>

          <Route path="/requests" element={<AllRequests />} />
        </Route>

        <Route path="/error" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};
