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
import ManageMovie from "./pages/Admin/ManageMovie";
import ManageSchedule from "./pages/Admin/ManageSchedule";
import ManageUser from "./pages/Admin/ManageUser";

// Owner Pages
import OwnerDashboard from "./pages/Owner/Dashboard";
import Finance from "./pages/Owner/Finance";
import Report from "./pages/Owner/Report";

// Cashier Pages
import CashierDashboard from "./pages/Cashier/Dashboard";
import Transaction from "./pages/Cashier/Transaction";
import ScanTicket from "./pages/Cashier/ScanTicket";

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
            <Route path="/admin/movies" element={<ManageMovie />} />
            <Route path="/admin/schedules" element={<ManageSchedule />} />
            <Route path="/admin/users" element={<ManageUser />} />
            
            {/* Owner Routes */}
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/finance" element={<Finance />} />
            <Route path="/owner/report" element={<Report />} />
            
            {/* Cashier Routes */}
            <Route path="/cashier/dashboard" element={<CashierDashboard />} />
            <Route path="/cashier/transactions" element={<Transaction />} />
            <Route path="/cashier/scan-ticket" element={<ScanTicket />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
