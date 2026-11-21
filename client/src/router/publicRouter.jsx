import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/loginPage";
import InvitationPage from "../pages/onboarding/InvitationPage";
import NotFoundPage from "../pages/NotFoundPage";

export function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

export function getDashboardUrl() {
  const userId = localStorage.getItem("userId");
  return userId ? `/dashboard/${userId}` : "/dashboard";
}

export default function PublicRouter() {
  if (isAuthenticated()) {
    return <Navigate to={getDashboardUrl()} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/invitation" element={<InvitationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}