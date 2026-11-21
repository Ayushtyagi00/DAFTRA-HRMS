import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import WorkspacePage from "../pages/onboarding/WorkspacePage";
import CreateWorkspacePage from "../pages/onboarding/CreateWorkspacePage";
import JoinWorkspacePage from "../pages/onboarding/JoinWorkspacePage";
import NotFoundPage from "../pages/NotFoundPage";
import { isAuthenticated } from "./publicRouter";

function DashboardRoute() {
  const { userId } = useParams();
  const storedUserId = localStorage.getItem("userId");

  if (!storedUserId || String(userId) !== String(storedUserId)) {
    return (
      <Navigate
        to={storedUserId ? `/dashboard/${storedUserId}` : "/login"}
        replace
      />
    );
  }

  return <DashboardPage />;
}

export default function PrivateRouter() {
  const location = useLocation();
  const storedUserId = localStorage.getItem("userId");

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <Routes>
      <Route path="/dashboard/:userId" element={<DashboardRoute />} />
      <Route
        path="/dashboard"
        element={
          <Navigate
            to={storedUserId ? `/dashboard/${storedUserId}` : "/login"}
            replace
          />
        }
      />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="/workspace/create" element={<CreateWorkspacePage />} />
      <Route path="/workspace/join" element={<JoinWorkspacePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
