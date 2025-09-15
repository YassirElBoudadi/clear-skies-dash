import React from 'react';
import { Button } from '@/components/ui/button';
import { type Units } from '@/lib/weatherApi';

interface UnitToggleProps {
  units: Units;
  onToggle: (units: Units) => void;
  disabled?: boolean;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle, disabled }) => {
  return (
    <div className="flex items-center bg-gradient-glass backdrop-blur-lg rounded-2xl p-1.5 shadow-glass animate-fade-in hover:shadow-soft transition-all duration-500 group">
      <Button
        size="sm"
        variant={units === 'metric' ? 'default' : 'ghost'}
        onClick={() => onToggle('metric')}
        disabled={disabled}
        className={`px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl ${
          units === 'metric'
            ? 'bg-primary text-primary-foreground shadow-soft hover:shadow-elevation scale-105'
            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
        }`}
      >
        °C
      </Button>
      <Button
        size="sm"
        variant={units === 'imperial' ? 'default' : 'ghost'}
        onClick={() => onToggle('imperial')}
        disabled={disabled}
        className={`px-4 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl ${
          units === 'imperial'
            ? 'bg-primary text-primary-foreground shadow-soft hover:shadow-elevation scale-105'
            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
        }`}
      >
        °F
      </Button>
    </div>
  );
};