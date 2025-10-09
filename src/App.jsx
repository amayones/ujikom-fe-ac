import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import RoleBasedNavbar from "./components/RoleBasedNavbar";
import Footer from "./components/Footer";
import { shouldHideLayout } from "./utils/routeUtils";
import { normalizePath, startsWithPath } from "./utils/pathUtils";
import RouteValidator from "./components/RouteValidator";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";

function Layout() {
  const location = useLocation();

  const hideLayout = shouldHideLayout(location.pathname);

  // Hide footer for role-specific dashboards and auth pages
  const hideFooter = hideLayout ||
    startsWithPath(location.pathname, '/admin') ||
    startsWithPath(location.pathname, '/owner') ||
    startsWithPath(location.pathname, '/cashier') ||
    normalizePath(location.pathname) === "/profile";

  return (
    <RouteValidator>
      <TrailingSlashRedirect />
      <div className="flex flex-col min-h-screen">
        {!hideLayout && <RoleBasedNavbar />}
        <main className="flex-1">
          <AppRoutes />
        </main>
        {!hideFooter && <Footer />}
      </div>
    </RouteValidator>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Layout />
    </BrowserRouter>
  );
}
