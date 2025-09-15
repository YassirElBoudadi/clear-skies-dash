import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { SearchBar } from './SearchBar';
import { UnitToggle } from './UnitToggle';
import { WeatherCard } from './WeatherCard';
import { ForecastCard } from './ForecastCard';
import { WeatherSkeleton, SearchSkeleton } from './LoadingSkeleton';
import { weatherAPI, type WeatherData, type ForecastData, type Units } from '@/lib/weatherApi';

type LoadingState = 'idle' | 'loading' | 'error';

export const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');

  const resetError = () => {
    setError('');
    setLoadingState('idle');
  };

  const handleSearch = async (city: string) => {
    setLoadingState('loading');
    setError('');
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(city, units),
        weatherAPI.getForecast(city, units),
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setCurrentCity(city);
      setLoadingState('idle');
      
      toast({
        title: "Weather updated",
        description: `Showing current weather for ${weatherData.name}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setLoadingState('error');
      
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to fetch weather data',
        variant: "destructive",
      });
    }
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      });
      return;
    }

    setLoadingState('loading');
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            weatherAPI.getCurrentWeatherByCoords(latitude, longitude, units),
            weatherAPI.getForecastByCoords(latitude, longitude, units),
          ]);
          
          setWeather(weatherData);
          setForecast(forecastData);
          setCurrentCity(weatherData.name);
          setLoadingState('idle');
          
          toast({
            title: "Location found",
            description: `Showing weather for your current location: ${weatherData.name}`,
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather for your location');
          setLoadingState('error');
        }
      },
      (err) => {
        let message = 'Location access denied';
        if (err.code === GeolocationPositionError.TIMEOUT) {
          message = 'Location request timed out';
        } else if (err.code === GeolocationPositionError.POSITION_UNAVAILABLE) {
          message = 'Location unavailable';
        }
        
        setError(message);
        setLoadingState('error');
        
        toast({
          title: "Location error",
          description: message,
          variant: "destructive",
        });
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      }
    );
  };

  const handleUnitsChange = async (newUnits: Units) => {
    if (newUnits === units) return;
    
    setUnits(newUnits);
    
    if (weather) {
      setLoadingState('loading');
      try {
        const [weatherData, forecastData] = await Promise.all([
          weatherAPI.getCurrentWeather(currentCity, newUnits),
          weatherAPI.getForecast(currentCity, newUnits),
        ]);
        
        setWeather(weatherData);
        setForecast(forecastData);
        setLoadingState('idle');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update units');
        setLoadingState('error');
      }
    }
  };

  const handleRetry = () => {
    if (currentCity) {
      handleSearch(currentCity);
    } else {
      resetError();
    }
  };

  // Load default city on mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <SearchBar
              onSearch={handleSearch}
              onGetLocation={handleGetLocation}
              isLoading={loadingState === 'loading'}
            />
          </div>
          
          <UnitToggle
            units={units}
            onToggle={handleUnitsChange}
            disabled={loadingState === 'loading'}
          />
        </header>

        {/* Content */}
        <main className="space-y-8">
          {loadingState === 'loading' && (
            <WeatherSkeleton />
          )}

          {loadingState === 'error' && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <Alert className="max-w-md bg-destructive/10 border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive-foreground">
                  {error}
                </AlertDescription>
              </Alert>
              
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {loadingState === 'idle' && !weather && (
            <div className="flex flex-col items-center justify-center py-16">
              <SearchSkeleton />
              <p className="text-muted-foreground mt-6 text-center">
                Search for a city or use your current location to get started
              </p>
            </div>
          )}

          {loadingState === 'idle' && weather && forecast && (
            <>
              <WeatherCard weather={weather} units={units} />
              <ForecastCard forecast={forecast} units={units} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};