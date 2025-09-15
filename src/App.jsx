import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Header from "./components/header";
import Footer from "./components/footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <main className="flex-grow p-6">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
