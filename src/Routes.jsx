import { Routes, Route } from "react-router-dom";
import React from 'react'

// user pages
import Home from './pages/User/Home'
import NowPlaying from "./pages/User/NowPlaying";
import ComingSoon from "./pages/User/ComingSoon";
import MovieDetail from "./pages/User/MovieDetail";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import Invoice from "./pages/User/Invoice";
import Ticket from "./pages/User/Ticket";
import History from "./pages/User/History";
import Profile from "./pages/User/Profile";

// auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// admin pages
import ManageMovies from "./pages/Admin/ManageMovies";
import ManageCustomers from "./pages/Admin/ManageCustomers";
import ManageSchedules from "./pages/Admin/ManageSchedules";
import ManageCashiers from "./pages/Admin/ManageCashiers";
import SimpleDashboard from "./pages/Admin/SimpleDashboard";
import UpdatePrices from "./pages/Admin/UpdatePrices";
import ManageSeats from "./pages/Admin/ManageSeats";

// owner pages
import OwnerDashboard from "./pages/Owner/Dashboard";
import OwnerIncome from "./pages/Owner/Income";
import OwnerExpense from "./pages/Owner/Expense";

// cashier pages
import CashierDashboard from "./pages/Cashier/Dashboard";
import OfflineBooking from "./pages/Cashier/OfflineBooking";
import PrintTicket from "./pages/Cashier/PrintTicket";
import ProcessOnline from "./pages/Cashier/ProcessOnline";

// components
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function AppRoutes() {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ticket/:id" element={<Ticket />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            
            {/* auth routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* admin routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><SimpleDashboard /></ProtectedRoute>} />
            <Route path="/admin/movies" element={<ProtectedRoute allowedRoles={['admin']}><ManageMovies /></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute allowedRoles={['admin']}><ManageCustomers /></ProtectedRoute>} />
            <Route path="/admin/schedules" element={<ProtectedRoute allowedRoles={['admin']}><ManageSchedules /></ProtectedRoute>} />
            <Route path="/admin/prices" element={<ProtectedRoute allowedRoles={['admin']}><UpdatePrices /></ProtectedRoute>} />
            <Route path="/admin/cashiers" element={<ProtectedRoute allowedRoles={['admin']}><ManageCashiers /></ProtectedRoute>} />
            <Route path="/admin/seats" element={<ProtectedRoute allowedRoles={['admin']}><ManageSeats /></ProtectedRoute>} />
            
            {/* owner routes */}
            <Route path="/owner" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/owner/income" element={<ProtectedRoute allowedRoles={['owner']}><OwnerIncome /></ProtectedRoute>} />
            <Route path="/owner/expense" element={<ProtectedRoute allowedRoles={['owner']}><OwnerExpense /></ProtectedRoute>} />
            
            {/* cashier routes */}
            <Route path="/cashier" element={<ProtectedRoute allowedRoles={['cashier']}><CashierDashboard /></ProtectedRoute>} />
            <Route path="/cashier/offline-booking" element={<ProtectedRoute allowedRoles={['cashier']}><OfflineBooking /></ProtectedRoute>} />
            <Route path="/cashier/print-ticket" element={<ProtectedRoute allowedRoles={['cashier']}><PrintTicket /></ProtectedRoute>} />
            <Route path="/cashier/process-online" element={<ProtectedRoute allowedRoles={['cashier']}><ProcessOnline /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
