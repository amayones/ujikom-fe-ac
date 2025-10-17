# Frontend Deployment Guide

## AWS Amplify Deployment

### Prerequisites
- AWS Account
- GitHub repository
- Custom domain (optional)

### Setup Steps

1. **Connect Repository**
   - Login to AWS Amplify Console
   - Choose "Host web app"
   - Connect GitHub repository: `amayones/ujikom-fe-ac`
   - Select main branch

2. **Build Configuration**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://be-ujikom.amayones.my.id/api
   ```

4. **Custom Domain Setup**
   - Add domain: `ujikom.amayones.my.id`
   - Configure DNS records
   - SSL certificate auto-provisioned

### Build Optimization

**Vite Configuration** (`vite.config.js`):
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios']
        }
      }
    }
  }
})
```

### Automatic Deployment

**GitHub Integration:**
- Push to main branch triggers build
- Build status visible in Amplify console
- Failed builds prevent deployment
- Rollback available for previous versions

### Performance Monitoring

**Metrics Available:**
- Build duration
- Deploy duration
- Page load times
- Error rates

### Custom Redirects

**SPA Routing** (`public/_redirects`):
```
/*    /index.html   200
```

### Troubleshooting

**Build Failures:**
```bash
# Check build logs in Amplify console
# Common issues:
# - Missing environment variables
# - Node.js version mismatch
# - Dependency conflicts
```

**Deployment Issues:**
```bash
# Verify DNS configuration
nslookup ujikom.amayones.my.id

# Test SSL certificate
curl -I https://ujikom.amayones.my.id
```

### Local Testing

**Production Build:**
```bash
npm run build
npm run preview
```

**Environment Testing:**
```bash
# Test with production API
VITE_API_BASE_URL=https://be-ujikom.amayones.my.id/api npm run dev
```

### Rollback Procedure

1. Go to Amplify Console
2. Select app deployment
3. Choose previous version
4. Click "Promote to main"

### Monitoring & Analytics

**CloudWatch Integration:**
- Real User Monitoring (RUM)
- Performance metrics
- Error tracking
- User session data