# Absolute Cinema - Full Stack Application

## 🎬 Project Overview
Sistem manajemen bioskop dengan authentication dan role-based access control.

## 🚀 Deployment Status
- **Backend**: ✅ DEPLOYED - https://be-ujikom.amayones.my.id/
- **Frontend**: 🔄 READY FOR DEPLOYMENT
- **Database**: ✅ CONFIGURED (SQLite with test data)

## 🏗️ Architecture

### Backend (Laravel)
- **Framework**: Laravel 11 with Sanctum
- **Database**: SQLite
- **Authentication**: Token-based with roles
- **API**: RESTful endpoints with CORS

### Frontend (React)
- **Framework**: React 18 with Vite
- **State Management**: Zustand
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM

## 📋 Features

### Authentication System
- User registration and login
- Role-based access (customer, admin, owner, cashier)
- Persistent authentication state
- Protected routes and middleware

### API Integration
- Environment-based configuration
- Comprehensive error handling
- Token management and refresh
- CORS configuration for production

### Testing & Debugging
- API test page at `/test`
- Connection status monitoring
- Authentication flow testing
- Error logging and handling

## 🔧 Quick Start

### Backend
```bash
cd be-ac
php artisan migrate:fresh --seed
php artisan serve
```

### Frontend
```bash
cd fe-ac
npm install
npm run dev
```

## 📚 Documentation
- [Backend Auth](be-ac/README_AUTH.md)
- [Frontend Auth](fe-ac/README_AUTH.md)
- [API Integration](API_INTEGRATION.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Deployment Status](DEPLOYMENT_STATUS.md)

## 🧪 Test Accounts
- **Customer**: test@example.com / password123
- **Admin**: admin@example.com / password123
- **Owner**: owner@example.com / password123
- **Cashier**: cashier@example.com / password123

## 🌐 Live URLs
- **API Health**: https://be-ujikom.amayones.my.id/api/
- **Test Page**: [frontend-domain]/test (after deployment)

## 📦 Git Branches
- `main` - Production ready code
- `feature/backend-auth` - Backend authentication system
- `feature/frontend-auth` - Frontend authentication system
- `feature/api-integration` - API integration configuration
- `feature/deployment-config` - Production deployment setup

## 🚀 Deployment
Backend sudah deployed. Frontend siap untuk deployment dengan build production yang sudah dikonfigurasi.