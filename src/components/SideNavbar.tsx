import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Star, Info, Menu, X } from 'lucide-react';
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
      id: 'favorites',
      label: 'Favorites',
      icon: Star,
      path: '/' // For now, redirect to home since favorites is part of the main page
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      action: () => setIsAboutOpen(true)
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
        className="fixed top-4 left-4 z-50 w-10 h-10 p-0 rounded-2xl bg-glass/80 backdrop-blur-sm border-glass-border hover:bg-glass/90 hover:shadow-soft transition-all duration-300 hover:scale-105"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Navbar */}
      <nav
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-card backdrop-blur-xl border-r border-glass-border shadow-glass z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-weather rounded-xl flex items-center justify-center shadow-glow">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WeatherLab
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 p-0 rounded-xl hover:bg-glass/50 transition-all duration-200"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = isActiveRoute(item.path);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item)}
                className={`w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-200 hover:bg-glass/50 hover:shadow-soft hover:scale-[1.02] ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-soft' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-4 right-4 p-4 bg-glass/30 rounded-xl border border-glass-border">
          <p className="text-xs text-muted-foreground text-center">
            Modern Weather Experience
          </p>
        </div>
      </nav>
    </>
  );
};