# API Integration Documentation

## Backend-Frontend Integration

### API Configuration
- **Backend URL**: https://be-ujikom.amayones.my.id/
- **API Base**: https://be-ujikom.amayones.my.id/api/
- **Authentication**: Bearer Token (Laravel Sanctum)

### CORS Configuration
```php
'allowed_origins' => [
    'http://localhost:5173',
    'https://fe-ujikom.amayones.my.id',
    'https://amayones.my.id'
]
```

### Frontend Configuration
```javascript
baseURL: import.meta.env.VITE_API_URL || 'https://be-ujikom.amayones.my.id/api'
```

### API Endpoints
- GET /api/ - Health check
- POST /api/register - User registration
- POST /api/login - User login
- POST /api/logout - User logout (auth required)
- GET /api/me - Get current user (auth required)

### Testing
- Frontend test page: /test
- API connection testing
- Authentication flow testing
- Error handling verification

### Deployment Status
- ✅ Backend: Deployed and configured
- 🔄 Frontend: Ready for deployment
- ✅ API Integration: Tested and working