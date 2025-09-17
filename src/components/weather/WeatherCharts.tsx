import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Thermometer, Droplets, Wind, CloudRain } from 'lucide-react';
import type { ForecastData } from '@/lib/weatherApi';

interface WeatherChartsProps {
  forecastData?: ForecastData;
}

export const WeatherCharts: React.FC<WeatherChartsProps> = ({ forecastData }) => {
  if (!forecastData?.list) {
    return (
      <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
        <div className="text-center text-muted-foreground">
          <div className="animate-pulse">Loading chart data...</div>
        </div>
      </Card>
    );
  }

  // Prepare data for charts
  const chartData = forecastData.list.slice(0, 8).map((item, index) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    }),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    windSpeed: item.wind?.speed || 0,
    precipitation: ((item.rain?.['3h'] || 0) + (item.snow?.['3h'] || 0)) * 100,
    pressure: item.main.pressure || 0,
    feelsLike: Math.round(item.main.feels_like || item.main.temp),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-glass-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Thermometer className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Weather Charts</h3>
      </div>

      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="temperature" className="text-sm">Temperature</TabsTrigger>
          <TabsTrigger value="humidity" className="text-sm">Humidity</TabsTrigger>
          <TabsTrigger value="wind" className="text-sm">Wind</TabsTrigger>
          <TabsTrigger value="precipitation" className="text-sm">Rain</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#temperatureGradient)"
                  name="Temperature"
                  unit="°"
                />
                <Line
                  type="monotone"
                  dataKey="feelsLike"
                  stroke="hsl(var(--accent))"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  name="Feels Like"
                  unit="°"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="humidity" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Humidity"
                  unit="%"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="wind" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="windSpeed"
                  fill="hsl(var(--muted))"
                  name="Wind Speed"
                  unit=" m/s"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="precipitation" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="precipitation"
                  fill="hsl(var(--primary))"
                  name="Precipitation"
                  unit="%"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};