import React, { useMemo } from 'react';

interface EnhancedWeatherEffectsProps {
  weatherCondition: string;
}

export const EnhancedWeatherEffects: React.FC<EnhancedWeatherEffectsProps> = ({
  weatherCondition,
}) => {
  const effects = useMemo(() => {
    const condition = weatherCondition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        type: 'rain',
        particles: Array.from({ length: 150 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 2,
          animationDuration: 0.5 + Math.random() * 0.5,
          opacity: 0.4 + Math.random() * 0.6,
        })),
      };
    }
    
    if (condition.includes('snow')) {
      return {
        type: 'snow',
        particles: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          animationDuration: 3 + Math.random() * 2,
          size: 4 + Math.random() * 6,
          opacity: 0.6 + Math.random() * 0.4,
        })),
      };
    }
    
    if (condition.includes('thunder') || condition.includes('storm')) {
      return {
        type: 'lightning',
        particles: [],
      };
    }
    
    if (condition.includes('cloud')) {
      return {
        type: 'clouds',
        particles: Array.from({ length: 6 }, (_, i) => ({
          id: i,
          left: -20 + Math.random() * 140,
          top: 10 + Math.random() * 60,
          size: 60 + Math.random() * 120,
          animationDelay: Math.random() * 20,
          opacity: 0.1 + Math.random() * 0.2,
        })),
      };
    }
    
    if (condition.includes('clear') || condition.includes('sun')) {
      return {
        type: 'sunny',
        particles: Array.from({ length: 50 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 4,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.4,
        })),
      };
    }
    
    return { type: 'none', particles: [] };
  }, [weatherCondition]);

  if (effects.type === 'none') return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {effects.type === 'rain' && (
        <div className="absolute inset-0">
          {effects.particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-blue-600/80 rounded-full animate-fall"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
          {/* Rain splash effects */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-blue-500/10 to-transparent animate-pulse" />
        </div>
      )}

      {effects.type === 'snow' && (
        <div className="absolute inset-0">
          {effects.particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-white rounded-full animate-snow shadow-sm"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
          {/* Ground snow accumulation */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
      )}

      {effects.type === 'lightning' && (
        <div className="absolute inset-0">
          {/* Lightning flash overlay */}
          <div className="absolute inset-0 bg-white/20 animate-lightning" />
          {/* Dark storm clouds */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-800/20 to-transparent" />
          {/* Lightning bolts */}
          <div className="absolute top-0 left-1/4 w-1 h-64 bg-gradient-to-b from-yellow-200 via-blue-200 to-transparent animate-lightning opacity-80" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-0 right-1/3 w-0.5 h-48 bg-gradient-to-b from-white via-blue-100 to-transparent animate-lightning opacity-60" style={{ animationDelay: '1.2s' }} />
        </div>
      )}

      {effects.type === 'clouds' && (
        <div className="absolute inset-0">
          {effects.particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-br from-white/20 to-gray-200/10 backdrop-blur-sm animate-drift"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 0.6}px`,
                animationDelay: `${particle.animationDelay}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}

      {effects.type === 'sunny' && (
        <div className="absolute inset-0">
          {/* Sun rays */}
          <div className="absolute top-10 right-10 w-32 h-32">
            <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-yellow-100/20 to-transparent rounded-full animate-glow" />
            <div className="absolute inset-2 bg-gradient-radial from-yellow-300/40 via-yellow-200/20 to-transparent rounded-full animate-pulse" />
          </div>
          {/* Floating light particles */}
          {effects.particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-gradient-radial from-yellow-200/60 to-yellow-100/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.animationDelay}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/5 via-transparent to-orange-100/5" />
        </div>
      )}
    </div>
  );
};