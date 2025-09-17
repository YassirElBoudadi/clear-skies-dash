import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { CloudRain, Droplets } from 'lucide-react';
import type { ForecastData } from '@/lib/weatherApi';

interface PrecipitationChartProps {
  forecastData?: ForecastData;
}

export const PrecipitationChart: React.FC<PrecipitationChartProps> = ({ forecastData }) => {
  if (!forecastData?.list) {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="text-center text-muted-foreground">
          <div className="animate-pulse">Loading precipitation data...</div>
        </div>
      </Card>
    );
  }

  // Prepare precipitation data for the next 24 hours
  const precipitationData = forecastData.list.slice(0, 8).map((item, index) => {
    const rainVolume = item.rain?.['3h'] || 0;
    const snowVolume = item.snow?.['3h'] || 0;
    const totalPrecipitation = rainVolume + snowVolume;
    
    return {
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        hour12: true 
      }),
      precipitation: Math.round(totalPrecipitation * 100) / 100,
      probability: Math.min(totalPrecipitation * 20, 100), // Rough probability calculation
      type: snowVolume > rainVolume ? 'snow' : 'rain',
      humidity: item.main.humidity,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-glass-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-chart-4">
            Precipitation: {data.precipitation} mm
          </p>
          <p className="text-sm text-chart-2">
            Probability: {Math.round(data.probability)}%
          </p>
          <p className="text-sm text-muted-foreground">
            Type: {data.type === 'snow' ? '❄️ Snow' : '🌧️ Rain'}
          </p>
          <p className="text-sm text-muted-foreground">
            Humidity: {data.humidity}%
          </p>
        </div>
      );
    }
    return null;
  };

  const maxPrecipitation = Math.max(...precipitationData.map(d => d.precipitation), 1);

  return (
    <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <CloudRain className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Precipitation Forecast</h3>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={precipitationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'mm', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="precipitation"
              fill="hsl(var(--chart-4))"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Precipitation Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-background/30 border border-glass-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4 text-chart-4" />
            <span className="text-sm font-medium text-foreground">
              Total Expected
            </span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {precipitationData.reduce((sum, item) => sum + item.precipitation, 0).toFixed(1)} mm
          </div>
          <p className="text-xs text-muted-foreground">Next 24 hours</p>
        </div>

        <div className="p-3 rounded-lg bg-background/30 border border-glass-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="h-4 w-4 text-chart-2" />
            <span className="text-sm font-medium text-foreground">
              Peak Intensity
            </span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {maxPrecipitation.toFixed(1)} mm
          </div>
          <p className="text-xs text-muted-foreground">
            {precipitationData.find(d => d.precipitation === maxPrecipitation)?.time || 'N/A'}
          </p>
        </div>
      </div>

      {/* Weather Advice */}
      <div className="mt-4 p-3 rounded-lg bg-background/30 border border-glass-border/50">
        <h4 className="text-sm font-medium text-foreground mb-2">Weather Advice</h4>
        <p className="text-xs text-muted-foreground">
          {maxPrecipitation > 5 
            ? "Heavy precipitation expected. Consider indoor activities and carry an umbrella."
            : maxPrecipitation > 1
            ? "Light to moderate precipitation possible. Keep an umbrella handy."
            : "Minimal precipitation expected. Great weather for outdoor activities!"
          }
        </p>
      </div>
    </Card>
  );
};