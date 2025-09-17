import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Wind, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AirQualityData {
  aqi: number;
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirQualityIndexProps {
  airQuality?: AirQualityData;
  loading?: boolean;
}

export const AirQualityIndex: React.FC<AirQualityIndexProps> = ({ 
  airQuality, 
  loading = false 
}) => {
  const getAQILevel = (aqi: number) => {
    if (aqi === 1) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-600', description: 'Air quality is excellent' };
    if (aqi === 2) return { level: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-600', description: 'Air quality is acceptable' };
    if (aqi === 3) return { level: 'Moderate', color: 'bg-orange-500', textColor: 'text-orange-600', description: 'Air quality is moderate' };
    if (aqi === 4) return { level: 'Poor', color: 'bg-red-500', textColor: 'text-red-600', description: 'Air quality is poor' };
    return { level: 'Very Poor', color: 'bg-purple-500', textColor: 'text-purple-600', description: 'Air quality is very poor' };
  };

  const pollutants = [
    { name: 'PM2.5', value: airQuality?.pm2_5, unit: 'μg/m³', max: 25 },
    { name: 'PM10', value: airQuality?.pm10, unit: 'μg/m³', max: 50 },
    { name: 'O₃', value: airQuality?.o3, unit: 'μg/m³', max: 180 },
    { name: 'NO₂', value: airQuality?.no2, unit: 'μg/m³', max: 200 },
    { name: 'SO₂', value: airQuality?.so2, unit: 'μg/m³', max: 350 },
    { name: 'CO', value: airQuality?.co, unit: 'μg/m³', max: 30000 },
  ];

  if (loading) {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="h-5 w-5 text-primary animate-spin" />
          <h3 className="text-lg font-semibold text-foreground">Air Quality Index</h3>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-muted/30 rounded-lg"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-muted/30 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!airQuality) {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Air Quality Index</h3>
        </div>
        <div className="text-center text-muted-foreground py-6">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Air quality data not available</p>
        </div>
      </Card>
    );
  }

  const aqiInfo = getAQILevel(airQuality.aqi);

  return (
    <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Air Quality Index</h3>
      </div>

      {/* Main AQI Display */}
      <div className="mb-6 p-4 rounded-lg bg-background/50 border border-glass-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-foreground">{airQuality.aqi}</div>
            <Badge 
              variant="secondary" 
              className={`${aqiInfo.color} text-white border-none mt-1`}
            >
              {aqiInfo.level}
            </Badge>
          </div>
          <div className="text-right">
            <div className={`text-sm font-medium ${aqiInfo.textColor}`}>
              {aqiInfo.description}
            </div>
            <Progress 
              value={(airQuality.aqi / 5) * 100} 
              className="w-24 mt-2" 
            />
          </div>
        </div>
      </div>

      {/* Pollutants Grid */}
      <div className="grid grid-cols-2 gap-3">
        {pollutants.map((pollutant) => (
          <div 
            key={pollutant.name}
            className="p-3 rounded-lg bg-background/30 border border-glass-border/50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {pollutant.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {pollutant.unit}
              </span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {pollutant.value?.toFixed(1) || 'N/A'}
            </div>
            {pollutant.value && (
              <Progress 
                value={Math.min((pollutant.value / pollutant.max) * 100, 100)} 
                className="h-1 mt-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Health Recommendations */}
      <div className="mt-4 p-3 rounded-lg bg-background/30 border border-glass-border/50">
        <h4 className="text-sm font-medium text-foreground mb-2">Health Advice</h4>
        <p className="text-xs text-muted-foreground">
          {airQuality.aqi <= 2 
            ? "Great day for outdoor activities! Air quality is good."
            : airQuality.aqi === 3
            ? "Sensitive individuals should consider reducing outdoor activities."
            : "Limit outdoor exposure, especially for sensitive groups."
          }
        </p>
      </div>
    </Card>
  );
};