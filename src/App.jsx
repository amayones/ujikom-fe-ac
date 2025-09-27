import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password" || location.pathname === "/profile";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Layout />
    </BrowserRouter>
  );
}
