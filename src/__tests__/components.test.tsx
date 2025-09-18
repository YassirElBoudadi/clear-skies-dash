import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { AirQualityIndex } from '@/components/weather/AirQualityIndex';
import { UVIndex } from '@/components/weather/UVIndex';
import { WeatherCharts } from '@/components/weather/WeatherCharts';

// Mock chart library
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Weather Components', () => {
  describe('AirQualityIndex', () => {
    it('should render loading state', () => {
      render(
        <TestWrapper>
          <AirQualityIndex loading={true} />
        </TestWrapper>
      );

      expect(screen.getByText('Air Quality Index')).toBeInTheDocument();
      expect(screen.getByText('Air Quality Index')).toBeInTheDocument();
    });

    it('should render no data state', () => {
      render(
        <TestWrapper>
          <AirQualityIndex />
        </TestWrapper>
      );

      expect(screen.getByText('Air quality data not available')).toBeInTheDocument();
    });

    it('should render air quality data', () => {
      const mockAirQuality = {
        aqi: 2,
        co: 233.4,
        no: 0.01,
        no2: 13.89,
        o3: 87.81,
        so2: 0.64,
        pm2_5: 5.82,
        pm10: 7.18,
        nh3: 0.72
      };

      render(
        <TestWrapper>
          <AirQualityIndex airQuality={mockAirQuality} />
        </TestWrapper>
      );

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Fair')).toBeInTheDocument();
      expect(screen.getByText('5.8')).toBeInTheDocument(); // PM2.5 value
    });
  });

  describe('UVIndex', () => {
    it('should render loading state', () => {
      render(
        <TestWrapper>
          <UVIndex loading={true} />
        </TestWrapper>
      );

      expect(screen.getByText('UV Index')).toBeInTheDocument();
    });

    it('should render no data state', () => {
      render(
        <TestWrapper>
          <UVIndex />
        </TestWrapper>
      );

      expect(screen.getByText('UV index data not available')).toBeInTheDocument();
    });

    it('should render UV index data', () => {
      render(
        <TestWrapper>
          <UVIndex uvIndex={5} />
        </TestWrapper>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Moderate')).toBeInTheDocument();
    });

    it('should show correct protection advice for high UV', () => {
      render(
        <TestWrapper>
          <UVIndex uvIndex={8} />
        </TestWrapper>
      );

      expect(screen.getByText('Very High')).toBeInTheDocument();
      expect(screen.getByText(/Take extra precautions/)).toBeInTheDocument();
    });
  });

  describe('WeatherCharts', () => {
    const mockForecastData = {
      list: [
        {
          dt: 1638360000,
          main: { temp: 15, humidity: 70, pressure: 1013, temp_min: 12, temp_max: 18, feels_like: 14 },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 5, deg: 180 },
          dt_txt: '2021-12-01 12:00:00'
        },
        {
          dt: 1638370800,
          main: { temp: 18, humidity: 65, pressure: 1015, temp_min: 15, temp_max: 20, feels_like: 17 },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 7, deg: 200 },
          dt_txt: '2021-12-01 15:00:00'
        }
      ],
      city: { name: 'London', country: 'GB' }
    };

    it('should render charts without crashing', () => {
      render(
        <TestWrapper>
          <WeatherCharts forecastData={mockForecastData} units="metric" />
        </TestWrapper>
      );

      expect(screen.getByText('24-Hour Forecast')).toBeInTheDocument();
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });

    it('should show loading state', () => {
      render(
        <TestWrapper>
          <WeatherCharts loading={true} units="metric" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading charts...')).toBeInTheDocument();
    });

    it('should handle no data state', () => {
      render(
        <TestWrapper>
          <WeatherCharts units="metric" />
        </TestWrapper>
      );

      expect(screen.getByText('No forecast data available')).toBeInTheDocument();
    });
  });
});