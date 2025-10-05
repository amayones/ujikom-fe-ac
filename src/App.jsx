import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import RoleBasedNavbar from "./components/RoleBasedNavbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  
  // Hide navbar/footer for auth pages and profile
  const hideLayout = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";
  
  // Hide footer for role-specific dashboards
  const hideFooter = hideLayout || 
    location.pathname.startsWith('/admin/') || 
    location.pathname.startsWith('/owner/') || 
    location.pathname.startsWith('/cashier/') ||
    location.pathname === "/profile";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <RoleBasedNavbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideFooter && <Footer />}
    </div>
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
