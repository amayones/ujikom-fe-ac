import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./Routes";
import RoleBasedNavbar from "./components/RoleBasedNavbar";
import Footer from "./components/Footer";
import GlobalToast, { toast } from "./components/GlobalToast";
import { setToastFunction } from "./api/config";
import { shouldHideLayout } from "./utils/routeUtils";
import { normalizePath, startsWithPath } from "./utils/pathUtils";
import RouteValidator from "./components/RouteValidator";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import { AuthProvider } from "./context/AuthContext";
import { useAuthStore } from "./stores/index.js";

function Layout() {
  const location = useLocation();
  const { initializeAuth } = useAuthStore();

  // Setup toast function untuk axios dan initialize auth
  useEffect(() => {
    setToastFunction(toast);
    initializeAuth();
  }, [initializeAuth]);

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
      <GlobalToast />
    </RouteValidator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
