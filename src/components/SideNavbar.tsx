import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Info, Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutModal } from '@/components/AboutModal';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  action?: () => void;
}

export const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/'
    },
    {
      id: 'map',
      label: 'Map',
      icon: Map,
      path: '/map'
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      action: () => setIsAboutOpen(true)
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => console.log('Settings clicked') // Placeholder
    }
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  const isActiveRoute = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 w-12 h-12 p-0 rounded-2xl bg-glass/80 backdrop-blur-md border border-glass-border hover:bg-glass/90 hover:shadow-glow transition-all duration-300 hover:scale-105"
        aria-label="Open navigation menu"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </div>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navbar */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-glass/20 backdrop-blur-xl border-l border-glass-border shadow-glass z-50 transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-weather rounded-xl flex items-center justify-center shadow-glow animate-glow">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WeatherLab
            </h2>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-6 space-y-3">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = isActiveRoute(item.path);
            
            return (
              <div
                key={item.id}
                className={`animate-slide-in-right ${isOpen ? '' : 'opacity-0'}`}
                style={{
                  animationDelay: isOpen ? `${index * 100}ms` : '0ms',
                  animationFillMode: 'forwards'
                }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className={`w-full justify-start gap-4 h-14 px-5 rounded-2xl transition-all duration-300 hover:bg-glass/30 hover:shadow-glow hover:scale-105 backdrop-blur-sm border border-transparent hover:border-glass-border/50 ${
                    isActive 
                      ? 'bg-primary/15 text-primary border-primary/30 shadow-glow scale-105' 
                      : 'text-foreground/90 hover:text-primary'
                  }`}
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(var(--primary) / 0.1) 0%, rgba(var(--primary) / 0.05) 100%)'
                      : undefined,
                  }}
                >
                  <IconComponent className={`h-6 w-6 ${isActive ? 'text-primary animate-glow' : 'text-foreground/70'}`} />
                  <span className="font-medium text-base">{item.label}</span>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-glass/20 rounded-2xl border border-glass-border/30 backdrop-blur-md">
          <p className="text-sm text-muted-foreground text-center font-medium">
            Modern Weather Experience
          </p>
          <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-2 opacity-60"></div>
        </div>
      </nav>
    </>
  );
};