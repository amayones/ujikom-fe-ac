import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import RoleBasedNavbar from "./components/RoleBasedNavbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { shouldHideLayout } from "./utils/routeUtils";
import RouteValidator from "./components/RouteValidator";
import LoadingScreen from "./components/LoadingScreen";

function Layout() {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  const hideLayout = shouldHideLayout(location.pathname);
  
  // Hide footer for role-specific dashboards and auth pages
  const hideFooter = hideLayout || 
    location.pathname.startsWith('/admin/') || 
    location.pathname.startsWith('/owner/') || 
    location.pathname.startsWith('/cashier/') ||
    location.pathname === "/profile";

  return (
    <RouteValidator>
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
    <AuthProvider>
      <BrowserRouter basename="/">
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
