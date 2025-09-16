import { useEffect, useMemo } from 'react';

interface WeatherEffectsProps {
  weatherCondition: string;
}

export const WeatherEffects = ({ weatherCondition }: WeatherEffectsProps) => {
  const condition = weatherCondition.toLowerCase();
  
  const effects = useMemo(() => {
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'rain';
    } else if (condition.includes('cloud')) {
      return 'clouds';
    } else if (condition.includes('clear') || condition.includes('sun')) {
      return 'sunny';
    } else if (condition.includes('snow')) {
      return 'snow';
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return 'storm';
    }
    return null;
  }, [condition]);

  if (!effects) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {effects === 'rain' && <RainEffect />}
      {effects === 'clouds' && <CloudsEffect />}
      {effects === 'sunny' && <SunRaysEffect />}
      {effects === 'snow' && <SnowEffect />}
      {effects === 'storm' && <StormEffect />}
    </div>
  );
};

const RainEffect = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 100 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 bg-gradient-to-b from-weather-rainy to-transparent opacity-60 animate-fall"
        style={{
          left: `${Math.random() * 100}%`,
          height: `${20 + Math.random() * 20}px`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`,
        }}
      />
    ))}
  </div>
);

const CloudsEffect = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-weather-cloudy/20 to-weather-cloudy/10 backdrop-blur-sm animate-drift"
        style={{
          left: `${Math.random() * 80}%`,
          top: `${10 + Math.random() * 60}%`,
          width: `${40 + Math.random() * 80}px`,
          height: `${20 + Math.random() * 40}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${8 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);

const SunRaysEffect = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="absolute top-1/4 left-1/2 origin-bottom w-1 bg-gradient-to-t from-transparent via-time-golden/30 to-transparent animate-spin-slow opacity-40"
        style={{
          height: '200px',
          transform: `translateX(-50%) rotate(${i * 30}deg)`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: '20s',
        }}
      />
    ))}
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-time-golden/20 rounded-full animate-glow blur-xl" />
  </div>
);

const SnowEffect = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-weather-snowy rounded-full opacity-70 animate-snow"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

const StormEffect = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-weather-stormy/10 animate-weather-pulse" />
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-80 animate-lightning"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${Math.random() * 50}%`,
          animationDelay: `${i * 2}s`,
          animationDuration: '0.1s',
        }}
      />
    ))}
  </div>
);