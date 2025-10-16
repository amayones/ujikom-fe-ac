export const handleAuthError = (error) => {
  if (error.message.includes('Unauthenticated') || error.message.includes('401')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return true;
  }
  return false;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};