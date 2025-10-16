export const getRedirectUrl = (role) => {
  const routes = {
    admin: '/admin/dashboard',
    cashier: '/cashier/dashboard',
    owner: '/owner/dashboard',
    customer: '/user/home'
  };
  return routes[role] || '/user/home';
};