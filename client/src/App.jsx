import { useLocation } from "react-router-dom";
import PrivateRouter from "./router/privateRouter";
import PublicRouter, { isAuthenticated } from "./router/publicRouter";

function App()  {
  const { pathname } = useLocation();
  const privatePaths = ["/dashboard", "/onboarding", "/workspace"];
  const isPrivatePath = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isPrivatePath) {
    return <PrivateRouter />;
  }

  if (isAuthenticated() && (pathname === "/login" || pathname === "/register")) {
    return (
      <PublicRouter />
    );
  }

  return <PublicRouter />;
}

export default App;