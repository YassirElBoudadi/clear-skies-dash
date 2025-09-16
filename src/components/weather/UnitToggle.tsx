import React from 'react';
import { Button } from '@/components/ui/button';
import { type Units } from '@/lib/weatherApi';
import { ThemeToggle } from '@/components/ThemeToggle';

interface UnitToggleProps {
  units: Units;
  onToggle: (units: Units) => void;
  disabled?: boolean;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle, disabled }) => {
  return (
    <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2 p-1 bg-glass/30 backdrop-blur-sm rounded-2xl border border-glass-border shadow-soft">
        <Button
          variant={units === 'metric' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToggle('metric')}
          disabled={disabled}
          className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          °C
        </Button>
        <Button
          variant={units === 'imperial' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToggle('imperial')}
          disabled={disabled}
          className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          °F
        </Button>
      </div>
      <ThemeToggle />
    </div>
  );
};