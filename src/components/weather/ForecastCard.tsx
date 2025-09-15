import React from 'react';
import { type ForecastData, type Units, formatTemperature, getWeatherIconUrl } from '@/lib/weatherApi';

interface ForecastCardProps {
  forecast: ForecastData;
  units: Units;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, units }) => {
  // Group forecast by date and get daily summaries
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date,
        items: [],
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weather: item.weather[0],
      };
    }
    
    acc[dateKey].items.push(item);
    acc[dateKey].tempMin = Math.min(acc[dateKey].tempMin, item.main.temp_min);
    acc[dateKey].tempMax = Math.max(acc[dateKey].tempMax, item.main.temp_max);
    
    return acc;
  }, {} as Record<string, any>);

  const dailyEntries = Object.values(dailyForecast).slice(0, 5);

  const formatDay = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString([], { weekday: 'short' });
  };

  return (
    <div className="bg-gradient-glass backdrop-blur-md rounded-2xl p-6 shadow-elevation border border-glass-border animate-slide-in">
      <h2 className="text-xl font-semibold text-foreground mb-6">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyEntries.map((day: any, index: number) => (
          <ForecastDayCard
            key={index}
            date={day.date}
            weather={day.weather}
            tempMin={day.tempMin}
            tempMax={day.tempMax}
            units={units}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

interface ForecastDayCardProps {
  date: Date;
  weather: any;
  tempMin: number;
  tempMax: number;
  units: Units;
  isToday: boolean;
}

const ForecastDayCard: React.FC<ForecastDayCardProps> = ({
  date,
  weather,
  tempMin,
  tempMax,
  units,
  isToday,
}) => {
  const formatDay = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString([], { weekday: 'short' });
  };

  return (
    <div className={`
      bg-glass/30 backdrop-blur-sm rounded-xl p-4 text-center 
      hover:bg-glass/50 transition-all duration-300 hover:shadow-soft
      hover:scale-105 cursor-pointer
      ${isToday ? 'ring-2 ring-primary/30 bg-glass/50' : ''}
    `}>
      <div className="text-sm font-medium text-foreground mb-3">
        {formatDay(date)}
      </div>
      
      <div className="mb-3 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="h-12 w-12 mx-auto"
        />
      </div>
      
      <div className="space-y-1">
        <div className="text-lg font-semibold text-foreground">
          {Math.round(tempMax)}°
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.round(tempMin)}°
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-2 capitalize">
        {weather.description}
      </div>
    </div>
  );
};