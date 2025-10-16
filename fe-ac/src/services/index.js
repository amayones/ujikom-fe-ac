// Auth Services
export { authService } from './auth/index.js';

// Admin Services
export { adminFilmsService, adminSchedulesService, adminUsersService } from './admin/index.js';

// User Services
export { userFilmsService, userSchedulesService } from './user/index.js';

// Owner Services
export { ownerService } from './owner/index.js';

// Cashier Services
export { cashierService } from './cashier/index.js';

// Backward compatibility
export { userFilmsService as filmService } from './user/index.js';
export { userSchedulesService as scheduleService } from './user/index.js';
export { adminFilmsService as adminService } from './admin/index.js';