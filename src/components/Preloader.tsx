import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Show preloader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center animate-fade-out" 
         style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
      <div className="flex flex-col items-center gap-6">
        {/* Logo with glow effect */}
        <div className="w-20 h-20 bg-gradient-weather rounded-3xl flex items-center justify-center shadow-glow animate-glow">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <div className="w-6 h-6 bg-primary rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        {/* App name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
          WeatherLab
        </h1>
        
        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};