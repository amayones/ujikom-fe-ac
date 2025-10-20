import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./Routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuthStore from "./store/authStore";

function Layout() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
