import { Footer } from "@/components/Footer";
import { WeatherMap } from "@/components/WeatherMap";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UnitToggle } from "@/components/weather/UnitToggle";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Map = () => {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  return (
    <div className="min-h-screen bg-gradient-main relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-weather rounded-2xl flex items-center justify-center shadow-glow animate-float">
              <MapPin className="h-6 w-6 text-primary animate-weather-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Weather Map
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore global weather patterns on our interactive map. Navigate, zoom, and discover weather conditions worldwide.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UnitToggle units={units} onToggle={(newUnits) => setUnits(newUnits)} />
          </div>
          
          <Button 
            variant="outline"
            className="gap-2 bg-glass/50 backdrop-blur-sm border-glass-border hover:bg-glass/70 hover:shadow-soft transition-all duration-300"
          >
            <Navigation className="h-4 w-4" />
            My Location
          </Button>
        </div>

        {/* Map Container */}
        <Card className="p-0 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl overflow-hidden animate-scale-bounce" style={{ animationDelay: '0.4s' }}>
          <div className="h-[70vh] relative">
            <WeatherMap lat={51.5074} lon={-0.1278} city="London" />
            
            {/* Map overlay controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Card className="p-3 bg-background/80 backdrop-blur-sm border-glass-border shadow-soft">
                <p className="text-sm font-medium">Weather Layers</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Precipitation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Temperature</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Map Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="p-6 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Global Coverage</h3>
              <p className="text-muted-foreground text-sm">
                Access weather data from anywhere in the world with our comprehensive global coverage.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                <Navigation className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Interactive Navigation</h3>
              <p className="text-muted-foreground text-sm">
                Navigate smoothly with zoom, pan, and location search capabilities.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl hover:shadow-glow transition-all duration-300">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-gradient-weather rounded-lg"></div>
              </div>
              <h3 className="font-semibold">Real-time Data</h3>
              <p className="text-muted-foreground text-sm">
                Get up-to-date weather information with live data visualization layers.
              </p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Map;