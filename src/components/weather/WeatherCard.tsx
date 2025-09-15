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
    <div className="bg-gradient-glass backdrop-blur-lg rounded-3xl p-8 shadow-elevation border border-glass-border animate-blur-in hover:shadow-glow transition-all duration-500 group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Current weather */}
        <div className="space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-light text-foreground mb-2 bg-gradient-weather bg-clip-text">
              {weather.name}
              <span className="text-2xl text-muted-foreground ml-2">{weather.sys.country}</span>
            </h1>
            <p className="text-lg text-muted-foreground capitalize font-medium">
              {currentWeather.description}
            </p>
          </div>
          
          <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="animate-float hover:animate-glow transition-all duration-300">
              <img
                src={getWeatherIconUrl(currentWeather.icon)}
                alt={currentWeather.description}
                className="h-24 w-24 filter drop-shadow-lg"
              />
            </div>
            <div>
              <div className="text-7xl font-thin text-foreground leading-none group-hover:scale-105 transition-transform duration-300">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-base text-muted-foreground mt-2">
                Feels like {formatTemperature(weather.main.feels_like, units)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-base text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider">High</span>
              <span className="font-semibold">{formatTemperature(weather.main.temp_max, units)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider">Low</span>
              <span className="font-semibold">{formatTemperature(weather.main.temp_min, units)}</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Weather details */}
        <div className="grid grid-cols-2 gap-4">
          <WeatherDetailCard
            icon={<Droplets className="h-5 w-5 text-primary" />}
            label="Humidity"
            value={`${weather.main.humidity}%`}
            delay="0.4s"
          />
          <WeatherDetailCard
            icon={<Wind className="h-5 w-5 text-primary" />}
            label="Wind"
            value={`${formatWindSpeed(weather.wind.speed, units)} ${getWindDirection(weather.wind.deg)}`}
            delay="0.5s"
          />
          <WeatherDetailCard
            icon={<Eye className="h-5 w-5 text-primary" />}
            label="Visibility"
            value={`${Math.round(weather.visibility / 1000)} km`}
            delay="0.6s"
          />
          <WeatherDetailCard
            icon={<Thermometer className="h-5 w-5 text-primary" />}
            label="Pressure"
            value={`${weather.main.pressure} hPa`}
            delay="0.7s"
          />
          <WeatherDetailCard
            icon={<Sunrise className="h-5 w-5 text-time-sunrise" />}
            label="Sunrise"
            value={formatTime(sunrise)}
            delay="0.8s"
          />
          <WeatherDetailCard
            icon={<Sunset className="h-5 w-5 text-time-sunset" />}
            label="Sunset"
            value={formatTime(sunset)}
            delay="0.9s"
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
  delay: string;
}

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({ icon, label, value, delay }) => {
  return (
    <div 
      className="bg-gradient-card backdrop-blur-sm rounded-2xl p-5 hover:bg-glass/60 transition-all duration-500 hover:shadow-soft hover:scale-105 cursor-pointer animate-fade-in group"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="group-hover:animate-glow">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{value}</div>
    </div>
  );
};