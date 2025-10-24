// Role constants and utilities
export const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  OWNER: 'owner',
  CASHIER: 'cashier'
};

export const hasRole = (user, role) => {
  return user?.role === role;
};

export const hasAnyRole = (user, roles) => {
  return roles.includes(user?.role);
};