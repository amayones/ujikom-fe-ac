# API Services Documentation

## Struktur Services

```
services/
├── auth/
│   └── index.js          # Login, Register, Logout
├── admin/
│   ├── films.js          # CRUD Films untuk Admin
│   ├── schedules.js      # CRUD Schedules untuk Admin
│   ├── users.js          # CRUD Users untuk Admin
│   └── index.js          # Export semua admin services
├── user/
│   ├── films.js          # Films untuk User (read-only)
│   ├── schedules.js      # Schedules untuk User (read-only)
│   └── index.js          # Export semua user services
└── index.js              # Export semua services
```

## Konfigurasi Axios

File `api/config.js` berisi:
- Base URL: `http://localhost:8000/api`
- Auto token injection untuk setiap request
- Auto redirect ke login jika 401 Unauthorized
- Response interceptor untuk handle error

## Cara Penggunaan

### 1. Import Service

```javascript
// Import specific service
import { authService } from '../../services/index.js';
import { adminFilmsService } from '../../services/index.js';
import { userFilmsService } from '../../services/index.js';

// Atau import multiple services
import { 
  authService, 
  adminFilmsService, 
  userFilmsService 
} from '../../services/index.js';
```

### 2. Auth Service

```javascript
// Login
const handleLogin = async (email, password) => {
  try {
    const result = await authService.login(email, password);
    // Token dan user otomatis disimpan ke localStorage
    console.log('User:', result.user);
    console.log('Token:', result.token);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Register
const handleRegister = async (userData) => {
  try {
    const result = await authService.register(userData);
    console.log('Registration success:', result);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};

// Logout
const handleLogout = async () => {
  try {
    await authService.logout();
    // Token dan user otomatis dihapus dari localStorage
  } catch (error) {
    console.error('Logout failed:', error.message);
  }
};
```

### 3. Admin Services

```javascript
// Films Management
const loadFilms = async () => {
  try {
    const films = await adminFilmsService.getAll();
    setFilms(films);
  } catch (error) {
    console.error('Failed to load films:', error.message);
  }
};

const createFilm = async (filmData) => {
  try {
    const newFilm = await adminFilmsService.create(filmData);
    console.log('Film created:', newFilm);
  } catch (error) {
    console.error('Failed to create film:', error.message);
  }
};

const updateFilm = async (id, filmData) => {
  try {
    const updatedFilm = await adminFilmsService.update(id, filmData);
    console.log('Film updated:', updatedFilm);
  } catch (error) {
    console.error('Failed to update film:', error.message);
  }
};

const deleteFilm = async (id) => {
  try {
    await adminFilmsService.delete(id);
    console.log('Film deleted');
  } catch (error) {
    console.error('Failed to delete film:', error.message);
  }
};

// Schedules Management
const loadScheduleData = async () => {
  try {
    const [schedules, films, studios, prices] = await Promise.all([
      adminSchedulesService.getAll(),
      adminFilmsService.getAll(),
      adminSchedulesService.getStudios(),
      adminSchedulesService.getPrices()
    ]);
    
    setSchedules(schedules);
    setFilms(films);
    setStudios(studios);
    setPrices(prices);
  } catch (error) {
    console.error('Failed to load schedule data:', error.message);
  }
};

// Users Management
const loadUsers = async () => {
  try {
    const users = await adminUsersService.getAll();
    setUsers(users);
  } catch (error) {
    console.error('Failed to load users:', error.message);
  }
};
```

### 4. User Services

```javascript
// Load films for user
const loadNowPlayingFilms = async () => {
  try {
    const films = await userFilmsService.getNowPlaying();
    setNowPlayingFilms(films);
  } catch (error) {
    console.error('Failed to load now playing films:', error.message);
  }
};

const loadComingSoonFilms = async () => {
  try {
    const films = await userFilmsService.getComingSoon();
    setComingSoonFilms(films);
  } catch (error) {
    console.error('Failed to load coming soon films:', error.message);
  }
};

const loadMovieDetail = async (movieId) => {
  try {
    const movie = await userFilmsService.getById(movieId);
    setMovie(movie);
  } catch (error) {
    console.error('Failed to load movie detail:', error.message);
  }
};

const loadMovieSchedules = async (movieId) => {
  try {
    const schedules = await userSchedulesService.getByFilmId(movieId);
    setSchedules(schedules);
  } catch (error) {
    console.error('Failed to load movie schedules:', error.message);
  }
};
```

## Error Handling

Semua service menggunakan try-catch dan axios interceptor untuk handle error:

1. **401 Unauthorized**: Otomatis redirect ke login
2. **Network Error**: Throw error dengan message yang jelas
3. **Validation Error**: Throw error dengan message dari server

## Loading States

Contoh implementasi loading state:

```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    await adminFilmsService.create(data);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setLoading(false);
  }
};
```

## Best Practices

1. **Selalu gunakan try-catch** saat memanggil service
2. **Handle loading state** untuk UX yang baik
3. **Show error message** kepada user jika terjadi error
4. **Import hanya service yang dibutuhkan** untuk optimasi bundle size
5. **Gunakan async/await** untuk readability yang lebih baik