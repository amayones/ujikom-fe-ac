# Authentication Feature Branch

This branch contains authentication-related components:

## Components
- `src/pages/Auth/Login.jsx` - User login form
- `src/pages/Auth/Register.jsx` - User registration form

## Features
- JWT token authentication
- Role-based login (Customer, Admin, Owner, Cashier)
- Form validation
- Error handling
- Automatic redirect after login

## API Integration
- Login endpoint: POST /api/auth/login
- Register endpoint: POST /api/auth/register
- Token storage in localStorage