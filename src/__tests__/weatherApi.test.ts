import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { weatherAPI, formatTemperature, formatWindSpeed, getWindDirection } from '@/lib/weatherApi';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('WeatherAPI', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Clear cache
    (weatherAPI as any).cache.clear();
  });

  describe('getCurrentWeather', () => {
    it('should fetch and return weather data', async () => {
      const mockWeatherData = {
        id: 1,
        name: 'London',
        sys: { country: 'GB', sunrise: 1638360000, sunset: 1638394800 },
        main: { temp: 15, feels_like: 14, temp_min: 12, temp_max: 18, humidity: 70, pressure: 1013 },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 5, deg: 180 },
        visibility: 10000,
        dt: 1638360000,
        coord: { lat: 51.5074, lon: -0.1278 }
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const result = await weatherAPI.getCurrentWeather('London', 'metric');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: 'London',
            appid: 'demo_key',
            units: 'metric',
          },
        }
      );

      expect(result).toEqual(mockWeatherData);
    });

    it('should handle city not found error', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 404 }
      });

      await expect(weatherAPI.getCurrentWeather('InvalidCity', 'metric'))
        .rejects
        .toThrow('City not found. Please check the spelling and try again.');
    });

    it('should handle unauthorized error', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 401 }
      });

      await expect(weatherAPI.getCurrentWeather('London', 'metric'))
        .rejects
        .toThrow('Weather service unavailable. Please try again later.');
    });

    it('should handle rate limit error', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 429 }
      });

      await expect(weatherAPI.getCurrentWeather('London', 'metric'))
        .rejects
        .toThrow('Too many requests. Please wait a moment and try again.');
    });
  });

  describe('Cache functionality', () => {
    it('should return cached data when available', async () => {
      const mockWeatherData = {
        id: 1,
        name: 'London',
        main: { temp: 15 }
      };

      // First call
      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });
      await weatherAPI.getCurrentWeather('London', 'metric');

      // Second call should use cache
      const result = await weatherAPI.getCurrentWeather('London', 'metric');

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockWeatherData);
    });
  });
});

describe('Utility functions', () => {
  describe('formatTemperature', () => {
    it('should format metric temperature correctly', () => {
      expect(formatTemperature(15.7, 'metric')).toBe('16°C');
      expect(formatTemperature(0, 'metric')).toBe('0°C');
      expect(formatTemperature(-5.3, 'metric')).toBe('-5°C');
    });

    it('should format imperial temperature correctly', () => {
      expect(formatTemperature(68.5, 'imperial')).toBe('69°F');
      expect(formatTemperature(32, 'imperial')).toBe('32°F');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format metric wind speed correctly', () => {
      expect(formatWindSpeed(5.2, 'metric')).toBe('5 m/s');
      expect(formatWindSpeed(0.8, 'metric')).toBe('1 m/s');
    });

    it('should format imperial wind speed correctly', () => {
      expect(formatWindSpeed(10.5, 'imperial')).toBe('11 mph');
      expect(formatWindSpeed(2.1, 'imperial')).toBe('2 mph');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct wind directions', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(315)).toBe('NW');
    });

    it('should handle edge cases', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(361)).toBe('N');
    });
  });
});