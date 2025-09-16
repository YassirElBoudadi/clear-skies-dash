import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-20 py-8 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm border-t border-glass-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
          {/* Animated elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-1/4 w-8 h-8 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-2 right-1/3 w-6 h-6 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground z-10">
            <span>Created with</span>
            <Heart className="h-4 w-4 text-destructive animate-weather-pulse" />
            <span>by</span>
            <a
              href="#"
              className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300 hover:scale-105 relative"
            >
              YEBX Lab
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 transition-transform duration-300 hover:scale-x-100"></span>
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground/70">
            © 2024 WeatherLab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};