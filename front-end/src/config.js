// API URL configuration
// In production, use the production API URL from environment variable
// In development, use empty string (will use Vite proxy)
export const API_URL = import.meta.env.PROD ? 'https://api.aleaportfolio.com' : '';
