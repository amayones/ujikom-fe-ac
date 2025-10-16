import { Routes, Route } from "react-router-dom";
import React from 'react'
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Test
import ApiTest from "./pages/Test/ApiTest";

// User
import Home from './pages/User/Home'
import Profile from "./pages/User/Profile";
import History from "./pages/User/History";
import NowPlaying from "./pages/User/NowPlaying";
import ComingSoon from "./pages/User/ComingSoon";
import MovieDetail from "./pages/User/MovieDetail";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import Ticket from "./pages/User/Ticket";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageMovie from "./pages/Admin/ManageMovie";
import ManageSchedule from "./pages/Admin/ManageSchedule";
import ManageUser from "./pages/Admin/ManageUser";

// Owner
import OwnerDashboard from "./pages/Owner/Dashboard";
import Finance from "./pages/Owner/Finance";
import Report from "./pages/Owner/Report";

// Cashier
import CashierDashboard from "./pages/Cashier/Dashboard";
import Transaction from "./pages/Cashier/Transaction";
import ScanTicket from "./pages/Cashier/ScanTicket";

// 404 Page
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Test */}
                <Route path="/test" element={<ApiTest />} />

                {/* User */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/play-now" element={<NowPlaying />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="/booking/:id" element={
                    <ProtectedRoute>
                        <Booking />
                    </ProtectedRoute>
                } />
                <Route path="/payment" element={
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                } />
                <Route path="/ticket/:id" element={
                    <ProtectedRoute>
                        <Ticket />
                    </ProtectedRoute>
                } />
                <Route path="/history" element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/movies" element={
                    <ProtectedRoute requiredRole="admin">
                        <ManageMovie />
                    </ProtectedRoute>
                } />
                <Route path="/admin/schedules" element={
                    <ProtectedRoute requiredRole="admin">
                        <ManageSchedule />
                    </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="admin">
                        <ManageUser />
                    </ProtectedRoute>
                } />

                {/* Owner Routes */}
                <Route path="/owner/dashboard" element={
                    <ProtectedRoute requiredRole="owner">
                        <OwnerDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/owner/finance" element={
                    <ProtectedRoute requiredRole="owner">
                        <Finance />
                    </ProtectedRoute>
                } />
                <Route path="/owner/report" element={
                    <ProtectedRoute requiredRole="owner">
                        <Report />
                    </ProtectedRoute>
                } />

                {/* Cashier Routes */}
                <Route path="/cashier/dashboard" element={
                    <ProtectedRoute requiredRole="cashier">
                        <CashierDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/cashier/transactions" element={
                    <ProtectedRoute requiredRole="cashier">
                        <Transaction />
                    </ProtectedRoute>
                } />
                <Route path="/cashier/scan-ticket" element={
                    <ProtectedRoute requiredRole="cashier">
                        <ScanTicket />
                    </ProtectedRoute>
                } />

                {/* 404 Catch-all route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}
