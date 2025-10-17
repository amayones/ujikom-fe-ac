import { Routes, Route } from "react-router-dom";
import React from 'react'

// User Pages
import Home from './pages/User/Home'
import NowPlaying from "./pages/User/NowPlaying";
import ComingSoon from "./pages/User/ComingSoon";
import MovieDetail from "./pages/User/MovieDetail";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import Ticket from "./pages/User/Ticket";
import History from "./pages/User/History";
import Profile from "./pages/User/Profile";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageMovies from "./pages/Admin/ManageMovies";
import ManageCustomers from "./pages/Admin/ManageCustomers";
import ManageSchedules from "./pages/Admin/ManageSchedules";
import ManagePrices from "./pages/Admin/ManagePrices";
import ManageCashiers from "./pages/Admin/ManageCashiers";
import ManageSeats from "./pages/Admin/ManageSeats";

// Owner Pages
import OwnerDashboard from "./pages/Owner/Dashboard";

// Cashier Pages
import CashierDashboard from "./pages/Cashier/Dashboard";
import OfflineBooking from "./pages/Cashier/OfflineBooking";

// Other
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ticket/:id" element={<Ticket />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<ManageMovies />} />
            <Route path="/admin/customers" element={<ManageCustomers />} />
            <Route path="/admin/schedules" element={<ManageSchedules />} />
            <Route path="/admin/prices" element={<ManagePrices />} />
            <Route path="/admin/cashiers" element={<ManageCashiers />} />
            <Route path="/admin/seats" element={<ManageSeats />} />
            
            {/* Owner Routes */}
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            
            {/* Cashier Routes */}
            <Route path="/cashier/dashboard" element={<CashierDashboard />} />
            <Route path="/cashier/offline-booking" element={<OfflineBooking />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
