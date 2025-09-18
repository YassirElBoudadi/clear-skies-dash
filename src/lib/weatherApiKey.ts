// Weather API Key Management
// NOTE: You need to get a free API key from https://openweathermap.org/api
// Replace the demo_key below with your actual API key

export const WEATHER_API_KEY = 'demo_key'; // ⚠️ Replace with your actual OpenWeatherMap API key

// API endpoint configuration
export const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Instructions for getting your API key:
// 1. Go to https://openweathermap.org/api
// 2. Click "Sign Up" to create a free account
// 3. After signing up, go to your API keys page
// 4. Copy your API key and replace 'demo_key' above
// 5. Your API key will be active within 10-60 minutes

export const isValidApiKey = (key: string): boolean => {
  return key !== 'demo_key' && key.length > 10;
};