# Cinema Booking System - Frontend

React-based web application for cinema ticket booking with role-based interfaces.

## Features

- **Multi-role Dashboards** (Customer, Admin, Owner, Cashier)
- **Film Browsing & Booking** with seat selection
- **Real-time Seat Availability**
- **Payment Integration** simulation
- **Responsive Design** with Tailwind CSS
- **Secure Authentication** with JWT tokens

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/amayones/ujikom-fe-ac.git
cd ujikom-fe-ac

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Role-based navigation
│   ├── ErrorBoundary.jsx
│   └── TrailingSlashRedirect.jsx
├── pages/              # Route components
│   ├── Auth/           # Login/Register
│   ├── User/           # Customer pages
│   ├── Admin/          # Admin management
│   ├── Owner/          # Business analytics
│   └── Cashier/        # Ticket processing
├── services/           # API integration
│   ├── api.js          # Axios configuration
│   └── index.js        # Consolidated services
├── context/            # React context
│   └── AuthContext.jsx # Authentication state
├── utils/              # Utility functions
│   └── pathUtils.js    # Path normalization
└── Routes.jsx          # Route definitions
```

## User Roles & Features

### Customer (`/`)
- Browse films (Now Playing, Coming Soon)
- View film details and schedules
- Select seats and book tickets
- View booking history
- Generate ticket QR codes

### Admin (`/admin`)
- Manage films (CRUD operations)
- Manage schedules and pricing
- View customer data
- System configuration

### Owner (`/owner`)
- Financial reports and analytics
- Revenue tracking by date range
- Business performance metrics

### Cashier (`/cashier`)
- Process offline bookings
- Scan and validate tickets
- Handle walk-in customers
- Manage pending online orders

## API Integration

### Service Architecture
All API calls are centralized in `src/services/index.js`:

```javascript
import { authService, filmService, adminService } from './services';

// Usage examples
const films = await filmService.getFilms('play_now');
const user = await authService.login(email, password);
const report = await ownerService.getFinancialReport(startDate, endDate);
```

### Authentication Flow
1. User logs in via `authService.login()`
2. JWT token stored in localStorage
3. Token automatically attached to API requests
4. Role-based redirect after login
5. Protected routes check authentication

### Error Handling
- Global error interceptor in `api.js`
- Automatic token refresh on 401 errors
- Rate limiting notifications
- User-friendly error messages

## Routing & Navigation

### Route Protection
```javascript
// Protected route example
<ProtectedRoute roles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

### Role-based Navigation
Each role has distinct navbar with relevant links:
- **Customer**: Home, History, Profile
- **Admin**: Dashboard, Films, Schedules, Customers
- **Owner**: Dashboard, Finance Reports
- **Cashier**: Dashboard, Transactions, Scan Tickets

## Styling & UI

### Tailwind CSS
- Utility-first CSS framework
- Responsive design patterns
- Dark theme optimized for cinema
- Custom color palette (red accent)

### Component Design
- Consistent button styles
- Form validation feedback
- Loading states and skeletons
- Modal dialogs for actions

## State Management

### Authentication Context
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### Local State
- React hooks for component state
- Form handling with controlled inputs
- Loading and error states

## Performance Optimizations

### Build Optimizations
- Code splitting by route
- Vendor chunk separation
- Terser minification
- Tree shaking for unused code

### Runtime Optimizations
- Lazy loading for routes
- Image optimization
- API response caching
- Error boundaries for stability

## Deployment

### AWS Amplify
Automated deployment on push to main branch:
```yaml
- Builds React application
- Deploys to CDN
- Configures custom domain
- Handles redirects for SPA
```

### Environment Configuration
```javascript
// API base URL automatically configured
const API_BASE_URL = 'https://be-ujikom.amayones.my.id/api';
```

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions
- Component-based architecture

## Testing

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Role-based access control
- API integration testing

### User Acceptance Testing
- Complete booking flow
- Payment simulation
- Ticket generation
- Admin management tasks

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details.