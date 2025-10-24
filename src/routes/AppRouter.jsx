import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LayoutWrapper from '../components/layouts/LayoutWrapper';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Movie pages
import Movies from '../pages/Movies/Movies';
import MovieDetail from '../pages/Movies/MovieDetail';

// Booking & Payment
import Booking from '../pages/Booking/Booking';
import PaymentDummy from '../pages/Payment/PaymentDummy';

// User pages
import History from '../pages/History/History';
import Profile from '../pages/Profile/Profile';

// Admin pages
import Dashboard from '../pages/Admin/Dashboard';
import FilmsAdmin from '../pages/Admin/FilmsAdmin';
import SchedulesAdmin from '../pages/Admin/SchedulesAdmin';

// Owner pages
import OwnerDashboard from '../pages/Owner/Dashboard';
import Reports from '../pages/Owner/Reports';
import Transactions from '../pages/Owner/Transactions';
import Analytics from '../pages/Owner/Analytics';

// Cashier pages
import CashierDashboard from '../pages/Cashier/Dashboard';

// Components
import RoleRedirect from '../components/RoleRedirect';

import { ROLES } from '../utils/roles';

// Main app router with all routes and protection
const AppRouter = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <RoleRedirect />
              </ProtectedRoute>
            } />
            
            {/* Movie routes (public) */}
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            
            {/* Protected routes for authenticated users */}
            <Route path="/booking/:scheduleId" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            
            <Route path="/payment/:bookingId" element={
              <ProtectedRoute>
                <PaymentDummy />
              </ProtectedRoute>
            } />
            
            {/* Customer routes */}
            <Route path="/history" element={
              <ProtectedRoute role={ROLES.CUSTOMER}>
                <History />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute role={ROLES.CUSTOMER}>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute role={ROLES.ADMIN}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/films" element={
              <ProtectedRoute role={ROLES.ADMIN}>
                <FilmsAdmin />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/schedules" element={
              <ProtectedRoute role={ROLES.ADMIN}>
                <SchedulesAdmin />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute role={ROLES.ADMIN}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">User Management</h1>
                  <p className="text-gray-600 mt-2">User management functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute role={ROLES.ADMIN}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">System Settings</h1>
                  <p className="text-gray-600 mt-2">Settings functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Owner routes */}
            <Route path="/owner/dashboard" element={
              <ProtectedRoute role={ROLES.OWNER}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/owner/reports" element={
              <ProtectedRoute role={ROLES.OWNER}>
                <Reports />
              </ProtectedRoute>
            } />
            
            <Route path="/owner/transactions" element={
              <ProtectedRoute role={ROLES.OWNER}>
                <Transactions />
              </ProtectedRoute>
            } />
            
            <Route path="/owner/analytics" element={
              <ProtectedRoute role={ROLES.OWNER}>
                <Analytics />
              </ProtectedRoute>
            } />
            
            <Route path="/owner/summary" element={
              <ProtectedRoute role={ROLES.OWNER}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">Business Summary</h1>
                  <p className="text-gray-600 mt-2">Business summary functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Cashier routes */}
            <Route path="/cashier/dashboard" element={
              <ProtectedRoute role={ROLES.CASHIER}>
                <CashierDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/cashier/booking" element={
              <ProtectedRoute role={ROLES.CASHIER}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">Walk-in Booking</h1>
                  <p className="text-gray-600 mt-2">Cashier booking functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/cashier/tickets" element={
              <ProtectedRoute role={ROLES.CASHIER}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">Process Tickets</h1>
                  <p className="text-gray-600 mt-2">Ticket processing functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/cashier/schedule" element={
              <ProtectedRoute role={ROLES.CASHIER}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">Today's Schedule</h1>
                  <p className="text-gray-600 mt-2">Schedule viewing functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/cashier/customers" element={
              <ProtectedRoute role={ROLES.CASHIER}>
                <div className="text-center py-8">
                  <h1 className="text-2xl font-bold">Customer Service</h1>
                  <p className="text-gray-600 mt-2">Customer service functionality coming soon</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </LayoutWrapper>
    </Router>
  );
};

export default AppRouter;