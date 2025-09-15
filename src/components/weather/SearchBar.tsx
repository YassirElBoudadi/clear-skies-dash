import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
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
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-12 bg-glass/50 backdrop-blur-sm border-glass-border 
                     shadow-glass focus:shadow-elevation transition-all duration-300
                     focus:bg-glass/80"
            disabled={isLoading}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onGetLocation}
            disabled={isLoading}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 
                     hover:bg-primary/10 hover:text-primary transition-colors"
            title="Use current location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-glass/95 backdrop-blur-md
                   border border-glass-border rounded-lg shadow-elevation z-10 overflow-hidden
                   animate-fade-in"
        >
          {filteredSuggestions.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(search.city)}
              className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors
                       border-b border-glass-border last:border-b-0 flex items-center gap-3"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{search.city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};