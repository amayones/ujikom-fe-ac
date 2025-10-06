// Utility functions for path normalization
export const normalizePath = (pathname) => {
  // Remove trailing slash except for root path
  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
};

export const isPathMatch = (currentPath, targetPath) => {
  const normalizedCurrent = normalizePath(currentPath);
  const normalizedTarget = normalizePath(targetPath);
  return normalizedCurrent === normalizedTarget;
};

export const startsWithPath = (pathname, prefix) => {
  const normalizedPath = normalizePath(pathname);
  const normalizedPrefix = normalizePath(prefix);
  return normalizedPath.startsWith(normalizedPrefix);
};