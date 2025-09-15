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
    <div className="flex items-center bg-glass/50 backdrop-blur-sm rounded-lg p-1 shadow-glass">
      <Button
        size="sm"
        variant={units === 'metric' ? 'default' : 'ghost'}
        onClick={() => onToggle('metric')}
        disabled={disabled}
        className={`px-3 py-1 text-xs font-medium transition-all duration-200 ${
          units === 'metric'
            ? 'bg-primary text-primary-foreground shadow-soft'
            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
        }`}
      >
        °C
      </Button>
      <Button
        size="sm"
        variant={units === 'imperial' ? 'default' : 'ghost'}
        onClick={() => onToggle('imperial')}
        disabled={disabled}
        className={`px-3 py-1 text-xs font-medium transition-all duration-200 ${
          units === 'imperial'
            ? 'bg-primary text-primary-foreground shadow-soft'
            : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
        }`}
      >
        °F
      </Button>
    </div>
  );
};