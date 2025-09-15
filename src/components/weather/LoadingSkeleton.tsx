import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-blur-in">
      {/* Current Weather Skeleton */}
      <div className="bg-gradient-glass backdrop-blur-lg rounded-3xl p-8 shadow-elevation border border-glass-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Main weather */}
          <div className="space-y-6">
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Skeleton className="h-10 w-64 bg-glass/60 rounded-2xl" />
              <Skeleton className="h-5 w-40 bg-glass/60 rounded-xl" />
            </div>
            
            <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Skeleton className="h-24 w-24 rounded-full bg-glass/60 animate-float" />
              <div className="space-y-3">
                <Skeleton className="h-20 w-40 bg-glass/60 rounded-2xl" />
                <Skeleton className="h-4 w-32 bg-glass/60 rounded-xl" />
              </div>
            </div>
            
            <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Skeleton className="h-6 w-20 bg-glass/60 rounded-xl" />
              <Skeleton className="h-6 w-20 bg-glass/60 rounded-xl" />
            </div>
          </div>
          
          {/* Right side - Details */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-gradient-card backdrop-blur-sm rounded-2xl p-5 animate-fade-in"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-5 w-5 bg-glass/60 rounded-full" />
                  <Skeleton className="h-4 w-16 bg-glass/60 rounded-lg" />
                </div>
                <Skeleton className="h-8 w-20 bg-glass/60 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Forecast Skeleton */}
      <div className="bg-gradient-glass backdrop-blur-lg rounded-3xl p-8 shadow-elevation border border-glass-border animate-slide-in">
        <Skeleton className="h-8 w-48 mb-8 bg-glass/60 rounded-2xl animate-fade-in" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-gradient-card backdrop-blur-sm rounded-2xl p-6 animate-fade-in"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <Skeleton className="h-4 w-16 bg-glass/60 rounded-lg mb-4 mx-auto" />
              <Skeleton className="h-14 w-14 rounded-full bg-glass/60 mx-auto mb-4 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }} />
              <div className="space-y-2">
                <Skeleton className="h-6 w-12 bg-glass/60 rounded-lg mx-auto" />
                <Skeleton className="h-4 w-16 bg-glass/60 rounded-lg mx-auto" />
                <Skeleton className="h-3 w-20 bg-glass/60 rounded-lg mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SearchSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-weather-pulse py-16">
      <div className="animate-float">
        <div className="relative">
          <div className="h-20 w-20 bg-gradient-sky rounded-full opacity-60 animate-glow"></div>
          <div className="absolute inset-2 h-16 w-16 bg-gradient-weather rounded-full opacity-40"></div>
        </div>
      </div>
      <div className="space-y-3 text-center">
        <Skeleton className="h-5 w-56 bg-glass/60 rounded-xl mx-auto" />
        <Skeleton className="h-4 w-40 bg-glass/60 rounded-lg mx-auto" />
      </div>
    </div>
  );
};