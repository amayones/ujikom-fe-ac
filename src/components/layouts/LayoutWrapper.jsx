import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { ROLES } from '../../utils/roles';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import OwnerLayout from './OwnerLayout';
import CashierLayout from './CashierLayout';

// Layout wrapper that determines which layout to use based on route and user role
const LayoutWrapper = ({ children }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  // Don't apply layout for auth pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return children;
  }

  // Don't apply layout if user is not authenticated
  if (!user) {
    return children;
  }

  // Determine layout based on route path
  if (location.pathname.startsWith('/admin/')) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  
  if (location.pathname.startsWith('/owner/')) {
    return <OwnerLayout>{children}</OwnerLayout>;
  }
  
  if (location.pathname.startsWith('/cashier/')) {
    return <CashierLayout>{children}</CashierLayout>;
  }

  // Default to user layout for all other routes
  return <UserLayout>{children}</UserLayout>;
};

export default LayoutWrapper;