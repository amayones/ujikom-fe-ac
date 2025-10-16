# Deployment Guide - Absolute Cinema

## Production Deployment

### Backend Deployment ✅
- **Status**: DEPLOYED
- **URL**: https://be-ujikom.amayones.my.id/
- **Database**: SQLite (migrated and seeded)
- **Environment**: Production ready

### Frontend Deployment 🔄
- **Status**: READY FOR DEPLOYMENT
- **Build**: Successful
- **Environment**: Production configured

## Deployment Commands

### Backend
```bash
# Already deployed to hosting
# Database migrated and seeded
# CORS and Sanctum configured
```

### Frontend
```bash
# Build for production
npm run build:prod

# Deploy files from dist/ folder to hosting
# Configure domain to point to dist/index.html
```

## Environment Variables

### Backend (.env)
```
APP_URL=https://be-ujikom.amayones.my.id
DB_CONNECTION=sqlite
```

### Frontend (.env.production)
```
VITE_API_URL=https://be-ujikom.amayones.my.id/api
```

## Testing After Deployment
1. Visit frontend domain
2. Navigate to /test page
3. Run connection tests
4. Test authentication flow
5. Verify API responses

## Monitoring
- Backend health: https://be-ujikom.amayones.my.id/api/
- Frontend test page: [domain]/test
- Error logs: Check hosting provider logs