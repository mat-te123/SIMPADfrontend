/**
 * API Configuration
 * Use this to switch between mock and real backend APIs
 */

// Set this to 'mock' for testing or 'real' for production
const API_MODE = import.meta.env.VITE_API_MODE || 'mock';

export const config = {
  // Current API mode: 'mock' or 'real'
  apiMode: API_MODE,
  
  // Real backend URL (when apiMode is 'real')
  backendURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api',
  
  // Enable mock delay simulation (ms)
  mockDelay: parseInt(import.meta.env.VITE_MOCK_DELAY || '300'),
  
  // Log API calls to console
  logAPIcalls: import.meta.env.VITE_LOG_API_CALLS === 'true' || true,
};

// Helper functions
export const isMockMode = () => config.apiMode === 'mock';

export const logAPI = (endpoint, method, data = null) => {
  if (config.logAPIcalls) {
    console.log(`[${config.apiMode.toUpperCase()}] ${method} ${endpoint}`, data || '');
  }
};

export default config;
