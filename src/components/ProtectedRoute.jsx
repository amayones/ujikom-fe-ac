import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { hasRole, hasAnyRole, ROLES } from '../utils/roles';

// Protected route component with role-based access control
const ProtectedRoute = ({ children, role, roles }) => {
  const { isAuth, user } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Check single role
  if (role && !hasRole(user, role)) {
    // If user has unknown role, redirect to login
    if (!Object.values(ROLES).includes(user?.role)) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check multiple roles
  if (roles && !hasAnyRole(user, roles)) {
    // If user has unknown role, redirect to login
    if (!Object.values(ROLES).includes(user?.role)) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;