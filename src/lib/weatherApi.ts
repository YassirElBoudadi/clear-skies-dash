import axios from 'axios';
import { WEATHER_API_KEY, OPENWEATHER_BASE_URL, isValidApiKey } from './weatherApiKey';

const API_KEY = WEATHER_API_KEY;
const BASE_URL = OPENWEATHER_BASE_URL;

export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
      feels_like: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    rain?: {
      '3h': number;
    };
    snow?: {
      '3h': number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export type Units = 'metric' | 'imperial';

class WeatherAPI {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  private getCachedData(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getAirQuality(lat: number, lon: number): Promise<any> {
    const cacheKey = `air-quality-${lat}-${lon}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    if (!isValidApiKey(API_KEY)) {
      throw new Error('Please add your OpenWeatherMap API key to use air quality features. Get one free at https://openweathermap.org/api');
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        if (error.response?.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
      }
      throw new Error('Unable to fetch air quality data. Please check your connection.');
    }
  }

  async getUVIndex(lat: number, lon: number): Promise<any> {
    const cacheKey = `uv-index-${lat}-${lon}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    if (!isValidApiKey(API_KEY)) {
      throw new Error('Please add your OpenWeatherMap API key to use UV index features. Get one free at https://openweathermap.org/api');
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/uvi`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        if (error.response?.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
      }
      throw new Error('Unable to fetch UV index data. Please check your connection.');
    }
  }

  async getCurrentWeather(city: string, units: Units = 'metric'): Promise<WeatherData> {
    const cacheKey = `current-${city}-${units}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        if (error.response?.status === 401) {
          throw new Error('Weather service unavailable. Please try again later.');
        }
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      throw new Error('Unable to fetch weather data. Please check your connection.');
    }
  }

  async getCurrentWeatherByCoords(lat: number, lon: number, units: Units = 'metric'): Promise<WeatherData> {
    const cacheKey = `coords-${lat}-${lon}-${units}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch weather data for your location.');
    }
  }

  async getForecast(city: string, units: Units = 'metric'): Promise<ForecastData> {
    const cacheKey = `forecast-${city}-${units}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch forecast data.');
    }
  }

  async getForecastByCoords(lat: number, lon: number, units: Units = 'metric'): Promise<ForecastData> {
    const cacheKey = `forecast-coords-${lat}-${lon}-${units}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units,
        },
      });

      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch forecast data for your location.');
    }
  }
}

export const weatherAPI = new WeatherAPI();

export const getWeatherIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const formatTemperature = (temp: number, units: Units) => {
  const symbol = units === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

export const formatWindSpeed = (speed: number, units: Units) => {
  const unit = units === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed)} ${unit}`;
};

export const getWindDirection = (deg: number) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(deg / 22.5) % 16];
};