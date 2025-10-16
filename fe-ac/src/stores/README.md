# Zustand State Management Documentation

## Struktur Stores

```
stores/
├── authStore.js          # Authentication state & actions
├── filmsStore.js         # Films state & actions (Admin + User)
├── schedulesStore.js     # Schedules state & actions (Admin + User)
├── usersStore.js         # Users state & actions (Admin only)
└── index.js              # Export semua stores
```

## Cara Penggunaan

### 1. Import Store

```javascript
import { useAuthStore, useFilmsStore, useSchedulesStore, useUsersStore } from '../../stores/index.js';
```

### 2. Auth Store

```javascript
const { user, token, loading, login, register, logout, isAuthenticated } = useAuthStore();

// Login
const handleLogin = async (email, password) => {
  try {
    const result = await login(email, password);
    // State otomatis terupdate
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Register
const handleRegister = async (userData) => {
  try {
    await register(userData);
  } catch (error) {
    console.error('Register failed:', error.message);
  }
};

// Logout
const handleLogout = async () => {
  await logout();
  // State otomatis direset
};

// Check authentication
const isLoggedIn = isAuthenticated();
```

### 3. Films Store

```javascript
const { 
  films, 
  nowPlaying, 
  comingSoon, 
  loading, 
  fetchFilms, 
  createFilm, 
  updateFilm, 
  deleteFilm,
  fetchNowPlaying,
  fetchComingSoon,
  fetchHomeFilms
} = useFilmsStore();

// Admin - Load all films
useEffect(() => {
  fetchFilms();
}, []);

// Admin - Create film
const handleCreate = async (filmData) => {
  try {
    await createFilm(filmData);
    // State otomatis terupdate
  } catch (error) {
    console.error('Create failed:', error.message);
  }
};

// User - Load home films (now playing + coming soon)
useEffect(() => {
  fetchHomeFilms();
}, []);
```

### 4. Schedules Store

```javascript
const { 
  schedules, 
  studios, 
  prices, 
  loading, 
  fetchScheduleData, 
  createSchedule, 
  updateSchedule, 
  deleteSchedule 
} = useSchedulesStore();

// Admin - Load schedule data (schedules + studios + prices)
useEffect(() => {
  fetchScheduleData();
}, []);

// Admin - Create schedule
const handleCreate = async (scheduleData) => {
  try {
    await createSchedule(scheduleData);
    // State otomatis terupdate
  } catch (error) {
    console.error('Create failed:', error.message);
  }
};
```

### 5. Users Store

```javascript
const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsersStore();

// Admin - Load users
useEffect(() => {
  fetchUsers();
}, []);

// Admin - Create user
const handleCreate = async (userData) => {
  try {
    await createUser(userData);
    // State otomatis terupdate
  } catch (error) {
    console.error('Create failed:', error.message);
  }
};
```

## Keuntungan Zustand

### 1. **Simple & Minimal**
- Tidak perlu provider/wrapper
- Boilerplate code minimal
- Easy to understand

### 2. **Optimized Performance**
- Component hanya re-render jika state yang digunakan berubah
- Automatic shallow comparison
- No unnecessary re-renders

### 3. **TypeScript Ready**
- Full TypeScript support
- Type inference otomatis
- Better developer experience

### 4. **Devtools Support**
- Redux DevTools integration
- Time travel debugging
- State inspection

## Best Practices

### 1. **Destructure Only What You Need**
```javascript
// ✅ Good - hanya ambil yang dibutuhkan
const { films, loading, fetchFilms } = useFilmsStore();

// ❌ Bad - ambil semua state
const filmsStore = useFilmsStore();
```

### 2. **Handle Loading States**
```javascript
const { loading, fetchFilms } = useFilmsStore();

useEffect(() => {
  fetchFilms();
}, []);

if (loading) return <div>Loading...</div>;
```

### 3. **Error Handling**
```javascript
const { createFilm } = useFilmsStore();

const handleSubmit = async (data) => {
  try {
    await createFilm(data);
    // Success handling
  } catch (error) {
    // Error handling
    setError(error.message);
  }
};
```

### 4. **Combine Multiple Stores**
```javascript
const { films, fetchFilms } = useFilmsStore();
const { schedules, fetchScheduleData } = useSchedulesStore();

useEffect(() => {
  Promise.all([
    fetchFilms(),
    fetchScheduleData()
  ]);
}, []);
```

## State Structure

### Auth Store
```javascript
{
  user: User | null,
  token: string | null,
  loading: boolean
}
```

### Films Store
```javascript
{
  films: Film[],           // All films (admin)
  nowPlaying: Film[],      // Now playing films (user)
  comingSoon: Film[],      // Coming soon films (user)
  loading: boolean
}
```

### Schedules Store
```javascript
{
  schedules: Schedule[],
  studios: Studio[],
  prices: Price[],
  loading: boolean
}
```

### Users Store
```javascript
{
  users: User[],
  loading: boolean
}
```

## Integration dengan Axios

Semua store actions menggunakan services yang sudah dibuat sebelumnya:
- Automatic error handling
- Consistent API calls
- Token management
- Response transformation

Store hanya fokus pada state management, sedangkan API calls ditangani oleh services layer.