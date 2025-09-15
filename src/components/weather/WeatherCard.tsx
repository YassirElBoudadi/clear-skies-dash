import React from 'react';
import { Sunrise, Sunset, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { type WeatherData, type Units, formatTemperature, formatWindSpeed, getWindDirection, getWeatherIconUrl } from '@/lib/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  units: Units;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, units }) => {
  const currentWeather = weather.weather[0];
  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gradient-glass backdrop-blur-md rounded-2xl p-8 shadow-elevation border border-glass-border animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Current weather */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="text-muted-foreground capitalize">
              {currentWeather.description}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="animate-float">
              <img
                src={getWeatherIconUrl(currentWeather.icon)}
                alt={currentWeather.description}
                className="h-20 w-20"
              />
            </div>
            <div>
              <div className="text-6xl font-light text-foreground">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {formatTemperature(weather.main.feels_like, units)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>H: {formatTemperature(weather.main.temp_max, units)}</span>
            <span>L: {formatTemperature(weather.main.temp_min, units)}</span>
          </div>
        </div>
        
        {/* Right side - Weather details */}
        <div className="grid grid-cols-2 gap-4">
          <WeatherDetailCard
            icon={<Droplets className="h-5 w-5 text-primary" />}
            label="Humidity"
            value={`${weather.main.humidity}%`}
          />
          <WeatherDetailCard
            icon={<Wind className="h-5 w-5 text-primary" />}
            label="Wind"
            value={`${formatWindSpeed(weather.wind.speed, units)} ${getWindDirection(weather.wind.deg)}`}
          />
          <WeatherDetailCard
            icon={<Eye className="h-5 w-5 text-primary" />}
            label="Visibility"
            value={`${Math.round(weather.visibility / 1000)} km`}
          />
          <WeatherDetailCard
            icon={<Thermometer className="h-5 w-5 text-primary" />}
            label="Pressure"
            value={`${weather.main.pressure} hPa`}
          />
          <WeatherDetailCard
            icon={<Sunrise className="h-5 w-5 text-amber-500" />}
            label="Sunrise"
            value={formatTime(sunrise)}
          />
          <WeatherDetailCard
            icon={<Sunset className="h-5 w-5 text-orange-500" />}
            label="Sunset"
            value={formatTime(sunset)}
          />
        </div>
      </div>
    </div>
  );
};

interface WeatherDetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-glass/30 backdrop-blur-sm rounded-xl p-4 hover:bg-glass/50 transition-all duration-300 hover:shadow-soft">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
};