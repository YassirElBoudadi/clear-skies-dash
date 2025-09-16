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
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WeatherEffects } from '@/components/WeatherEffects';
import { WeatherMap } from '@/components/WeatherMap';

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
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      <Header />
      
      {/* Weather Effects */}
      {weather && (
        <WeatherEffects weatherCondition={weather.weather[0].main} />
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-accent/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-10 relative z-10">
        {/* Controls */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 animate-fade-in">
          <div className="flex items-center gap-6 w-full sm:w-auto">
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
        <main className="space-y-10">
          {loadingState === 'loading' && (
            <WeatherSkeleton />
          )}

          {loadingState === 'error' && (
            <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
              <div className="relative">
                <Alert className="max-w-md bg-destructive/10 border-destructive/20 backdrop-blur-lg rounded-2xl shadow-elevation">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-destructive-foreground font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              </div>
              
              <Button 
                onClick={handleRetry} 
                variant="outline" 
                className="gap-3 px-6 py-3 rounded-2xl bg-glass/50 backdrop-blur-sm border-glass-border hover:bg-glass/70 hover:shadow-soft transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>
            </div>
          )}

          {loadingState === 'idle' && !weather && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <SearchSkeleton />
              <div className="text-center mt-8 space-y-2">
                <p className="text-lg text-muted-foreground font-medium">
                  Search for a city or use your current location
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Get started with beautiful weather insights
                </p>
              </div>
            </div>
          )}

          {loadingState === 'idle' && weather && forecast && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <WeatherCard weather={weather} units={units} />
                  <ForecastCard forecast={forecast} units={units} />
                </div>
                <div className="space-y-6">
                  <WeatherMap 
                    lat={weather.coord.lat} 
                    lon={weather.coord.lon} 
                    city={weather.name} 
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};