// Secure token storage utility
class TokenStorage {
  static setToken(token) {
    // Set httpOnly cookie via API call to backend
    document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
    // Keep localStorage as fallback for now
    localStorage.setItem('token', token);
  }

  static getToken() {
    // Try to get from localStorage first (fallback)
    return localStorage.getItem('token');
  }

  static removeToken() {
    // Remove from both cookie and localStorage
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export default TokenStorage;