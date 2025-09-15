import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Current Weather Skeleton */}
      <div className="bg-gradient-glass backdrop-blur-md rounded-2xl p-8 shadow-elevation border border-glass-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Main weather */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-48 bg-glass/50" />
              <Skeleton className="h-4 w-32 bg-glass/50" />
            </div>
            
            <div className="flex items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-full bg-glass/50" />
              <div className="space-y-2">
                <Skeleton className="h-16 w-32 bg-glass/50" />
                <Skeleton className="h-4 w-24 bg-glass/50" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16 bg-glass/50" />
              <Skeleton className="h-6 w-16 bg-glass/50" />
            </div>
          </div>
          
          {/* Right side - Details */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-glass/30 rounded-xl p-4 space-y-2">
                <Skeleton className="h-4 w-16 bg-glass/50" />
                <Skeleton className="h-8 w-20 bg-glass/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Forecast Skeleton */}
      <div className="bg-gradient-glass backdrop-blur-md rounded-2xl p-6 shadow-elevation border border-glass-border">
        <Skeleton className="h-6 w-32 mb-6 bg-glass/50" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-glass/30 rounded-xl p-4 space-y-3">
              <Skeleton className="h-4 w-16 bg-glass/50" />
              <Skeleton className="h-12 w-12 rounded-full bg-glass/50 mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-12 bg-glass/50 mx-auto" />
                <Skeleton className="h-4 w-16 bg-glass/50 mx-auto" />
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
    <div className="flex flex-col items-center justify-center space-y-4 animate-weather-pulse">
      <div className="animate-float">
        <div className="h-16 w-16 bg-gradient-sky rounded-full opacity-50"></div>
      </div>
      <Skeleton className="h-4 w-40 bg-glass/50" />
    </div>
  );
};