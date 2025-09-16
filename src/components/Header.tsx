import { Cloud, Home, Info, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutModal } from "@/components/AboutModal";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-glass-border animate-slide-in">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-weather rounded-2xl flex items-center justify-center shadow-glow animate-float">
                <Cloud className="h-6 w-6 text-primary animate-weather-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-time-golden rounded-full animate-glow"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                WeatherLab
              </h1>
              <p className="text-xs text-muted-foreground">Modern Weather Experience</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className={`gap-2 hover:bg-glass/50 hover:shadow-soft transition-all duration-300 hover:scale-105 ${location.pathname === '/' ? 'bg-glass/30' : ''}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAboutOpen(true)}
              className="gap-2 hover:bg-glass/50 hover:shadow-soft transition-all duration-300 hover:scale-105"
            >
              <Info className="h-4 w-4" />
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/map')}
              className={`gap-2 hover:bg-glass/50 hover:shadow-soft transition-all duration-300 hover:scale-105 ${location.pathname === '/map' ? 'bg-glass/30' : ''}`}
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAboutOpen(true)}
            className="md:hidden w-10 h-10 p-0 rounded-2xl bg-glass/50 backdrop-blur-sm border-glass-border hover:bg-glass/70 hover:shadow-soft transition-all duration-300"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
    </>
  );
};