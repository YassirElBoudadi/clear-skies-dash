import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getRecentSearches, addRecentSearch, type RecentSearch } from '@/lib/storage';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onGetLocation,
  isLoading,
  placeholder = "Search for a city..."
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      setRecentSearches(getRecentSearches());
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    onSearch(city);
    setShowSuggestions(false);
  };

  const filteredSuggestions = recentSearches.filter(search =>
    search.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-lg animate-fade-in">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-all duration-300 ${isLoading ? 'animate-weather-pulse' : 'group-focus-within:text-primary'}`} />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-12 pr-14 py-4 bg-gradient-glass backdrop-blur-lg border-glass-border 
                     shadow-glass focus:shadow-elevation transition-all duration-500
                     focus:bg-glass/90 text-base font-medium rounded-2xl
                     hover:shadow-soft focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onGetLocation}
            disabled={isLoading}
            className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 p-0 rounded-xl
                     hover:bg-primary/10 hover:text-primary transition-all duration-300
                     hover:scale-110 group-focus-within:scale-105"
            title="Use current location"
          >
            <MapPin className={`h-5 w-5 ${isLoading ? 'animate-weather-pulse' : ''}`} />
          </Button>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-gradient-glass backdrop-blur-lg
                   border border-glass-border rounded-2xl shadow-elevation z-20 overflow-hidden
                   animate-scale-bounce"
        >
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Recent Searches
            </div>
            {filteredSuggestions.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search.city)}
                className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-all duration-300
                         rounded-xl flex items-center gap-3 group hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">{search.city}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};