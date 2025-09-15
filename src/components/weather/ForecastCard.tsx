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

  return (
    <div className="bg-gradient-glass backdrop-blur-lg rounded-3xl p-8 shadow-elevation border border-glass-border animate-slide-in hover:shadow-glow transition-all duration-500">
      <h2 className="text-2xl font-light text-foreground mb-8 animate-fade-in">
        5-Day Forecast
      </h2>
      
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
            delay={`${0.1 + index * 0.1}s`}
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
  delay: string;
}

const ForecastDayCard: React.FC<ForecastDayCardProps> = ({
  date,
  weather,
  tempMin,
  tempMax,
  units,
  isToday,
  delay,
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
    <div 
      className={`
        bg-gradient-card backdrop-blur-sm rounded-2xl p-6 text-center 
        hover:bg-glass/60 transition-all duration-500 hover:shadow-soft
        hover:scale-105 cursor-pointer group animate-fade-in
        ${isToday ? 'ring-2 ring-primary/40 bg-glass/70 shadow-glow' : ''}
      `}
      style={{ animationDelay: delay }}
    >
      <div className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        {formatDay(date)}
      </div>
      
      <div className="mb-4 animate-float group-hover:animate-glow" style={{ animationDelay: `${Math.random() * 2}s` }}>
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="h-14 w-14 mx-auto filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {Math.round(tempMax)}°
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {Math.round(tempMin)}°
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-3 capitalize opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        {weather.description}
      </div>
    </div>
  );
};