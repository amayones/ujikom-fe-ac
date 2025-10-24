import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// Component to redirect users to appropriate dashboard based on their role
const RoleRedirect = () => {
  const { user, getRoleBasedRoute } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
      const redirectRoute = getRoleBasedRoute(user.role);
      navigate(redirectRoute, { replace: true });
    }
  }, [user, navigate, getRoleBasedRoute]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default RoleRedirect;