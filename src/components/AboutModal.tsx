import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
      {/* Gradient blur backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-background/10 via-background/50 to-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative z-10 w-[45%] h-[70%] mx-4 bg-gradient-card backdrop-blur-lg border border-glass-border rounded-3xl shadow-glass animate-scale-bounce overflow-auto">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-glass/50 hover:bg-glass/70 border border-glass-border transition-all duration-300"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="relative p-8 pb-6 bg-gradient-weather">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2 animate-slide-in">About WeatherLab</h2>
            <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your Modern Weather Experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-foreground">Features</h3>
            <div className="grid gap-4">
              <div className="p-4 bg-glass/30 rounded-2xl border border-glass-border">
                <h4 className="font-medium text-foreground mb-2">🌡️ Real-time Weather Data</h4>
                <p className="text-muted-foreground text-sm">
                  Get accurate current weather conditions and 5-day forecasts powered by OpenWeatherMap API.
                </p>
              </div>
              
              <div className="p-4 bg-glass/30 rounded-2xl border border-glass-border">
                <h4 className="font-medium text-foreground mb-2">📍 Smart Location</h4>
                <p className="text-muted-foreground text-sm">
                  Search by city name or use your current location with automatic geolocation detection.
                </p>
              </div>
              
              <div className="p-4 bg-glass/30 rounded-2xl border border-glass-border">
                <h4 className="font-medium text-foreground mb-2">🎨 Dynamic Weather Effects</h4>
                <p className="text-muted-foreground text-sm">
                  Experience immersive weather animations including rain effects, floating clouds, and sun rays.
                </p>
              </div>
              
              <div className="p-4 bg-glass/30 rounded-2xl border border-glass-border">
                <h4 className="font-medium text-foreground mb-2">🗺️ Interactive Map</h4>
                <p className="text-muted-foreground text-sm">
                  Explore weather patterns on a beautiful interactive map powered by Mapbox.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold text-foreground">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Mapbox', 'OpenWeatherMap'].map((tech, index) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium animate-scale-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};