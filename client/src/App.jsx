import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/loginPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import InvitationPage from "./pages/onboarding/InvitationPage";
import WorkspacePage from "./pages/onboarding/WorkspacePage";
import CreateWorkspacePage from "./pages/onboarding/CreateWorkspacePage";
import JoinWorkspacePage from "./pages/onboarding/JoinWorkspacePage";

function App()  {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/invitation" element={<InvitationPage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="/workspace/create" element={<CreateWorkspacePage />} />
      <Route path="/workspace/join" element={<JoinWorkspacePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;