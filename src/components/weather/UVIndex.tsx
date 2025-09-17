import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sun, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UVIndexProps {
  uvIndex?: number;
  loading?: boolean;
}

export const UVIndex: React.FC<UVIndexProps> = ({ uvIndex, loading = false }) => {
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { 
      level: 'Low', 
      color: 'bg-green-500', 
      textColor: 'text-green-600',
      description: 'Minimal protection needed',
      advice: 'You can safely enjoy being outside!'
    };
    if (uv <= 5) return { 
      level: 'Moderate', 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-600',
      description: 'Some protection required',
      advice: 'Seek shade during midday hours, wear sun protection.'
    };
    if (uv <= 7) return { 
      level: 'High', 
      color: 'bg-orange-500', 
      textColor: 'text-orange-600',
      description: 'Protection essential',
      advice: 'Reduce time in sun 10am-4pm, use sunscreen SPF 15+.'
    };
    if (uv <= 10) return { 
      level: 'Very High', 
      color: 'bg-red-500', 
      textColor: 'text-red-600',
      description: 'Extra protection needed',
      advice: 'Minimize sun exposure 10am-4pm, use SPF 30+ sunscreen.'
    };
    return { 
      level: 'Extreme', 
      color: 'bg-purple-500', 
      textColor: 'text-purple-600',
      description: 'Avoid sun exposure',
      advice: 'Stay in shade, wear protective clothing and sunscreen SPF 50+.'
    };
  };

  const getProtectionTime = (uv: number) => {
    if (uv <= 2) return '60+ minutes';
    if (uv <= 5) return '30-60 minutes';
    if (uv <= 7) return '15-25 minutes';
    if (uv <= 10) return '10-15 minutes';
    return '<10 minutes';
  };

  if (loading) {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="h-5 w-5 text-primary animate-spin" />
          <h3 className="text-lg font-semibold text-foreground">UV Index</h3>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-muted/30 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted/30 rounded"></div>
            <div className="h-4 bg-muted/30 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (typeof uvIndex !== 'number') {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">UV Index</h3>
        </div>
        <div className="text-center text-muted-foreground py-6">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>UV index data not available</p>
        </div>
      </Card>
    );
  }

  const uvInfo = getUVLevel(uvIndex);
  const protectionTime = getProtectionTime(uvIndex);

  return (
    <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">UV Index</h3>
      </div>

      {/* Main UV Display */}
      <div className="mb-6 p-4 rounded-lg bg-background/50 border border-glass-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-foreground">{uvIndex.toFixed(1)}</div>
            <Badge 
              variant="secondary" 
              className={`${uvInfo.color} text-white border-none mt-1`}
            >
              {uvInfo.level}
            </Badge>
          </div>
          <div className="text-right">
            <div className={`text-sm font-medium ${uvInfo.textColor}`}>
              {uvInfo.description}
            </div>
            <Progress 
              value={Math.min((uvIndex / 11) * 100, 100)} 
              className="w-24 mt-2" 
            />
          </div>
        </div>
      </div>

      {/* Protection Information */}
      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-background/30 border border-glass-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Safe Exposure Time
            </span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {protectionTime}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Without protection for fair skin
          </p>
        </div>

        <div className="p-3 rounded-lg bg-background/30 border border-glass-border/50">
          <h4 className="text-sm font-medium text-foreground mb-2">Protection Tips</h4>
          <p className="text-xs text-muted-foreground">
            {uvInfo.advice}
          </p>
        </div>

        {/* UV Scale Reference */}
        <div className="p-3 rounded-lg bg-background/30 border border-glass-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">UV Scale</h4>
          <div className="flex justify-between items-center text-xs">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
              <span className="text-muted-foreground">0-2</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1"></div>
              <span className="text-muted-foreground">3-5</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mb-1"></div>
              <span className="text-muted-foreground">6-7</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
              <span className="text-muted-foreground">8-10</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mb-1"></div>
              <span className="text-muted-foreground">11+</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};