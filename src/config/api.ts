/**
 * API configuration
 * This file contains the configuration for the API endpoints
 * The baseUrl can be changed to point to a different API server
 */

// Debug: Log the environment variables
console.log('Environment variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV
});

// Use a hardcoded fallback URL if the environment variable is not available
// This ensures the application can still function even if env vars aren't loaded
const API_URL = import.meta.env.VITE_API_URL || 'https://bitsjobsearch.com';

export const API_CONFIG = {
  baseUrl: API_URL,
};

console.log('API_CONFIG.baseUrl:', API_CONFIG.baseUrl);

/**
 * Helper function to build API URLs
 * @param endpoint - The API endpoint path (e.g., '/login')
 * @returns The full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  console.log('Built API URL:', url);
  return url;
};
