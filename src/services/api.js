// Simple mock API for testing purposes
const api = {
  get: (url) => Promise.resolve({ data: { message: 'Mock API response', url } }),
  post: (url, data) => Promise.resolve({ data: { message: 'Mock API response', url, data } }),
  put: (url, data) => Promise.resolve({ data: { message: 'Mock API response', url, data } }),
  delete: (url) => Promise.resolve({ data: { message: 'Mock API response', url } })
};

export default api;