const RECENT_SEARCHES_KEY = 'weather-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export interface RecentSearch {
  city: string;
  timestamp: number;
}

export const getRecentSearches = (): RecentSearch[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentSearch = (city: string) => {
  try {
    const searches = getRecentSearches();
    const existing = searches.findIndex(s => s.city.toLowerCase() === city.toLowerCase());
    
    if (existing !== -1) {
      searches.splice(existing, 1);
    }
    
    searches.unshift({ city, timestamp: Date.now() });
    
    if (searches.length > MAX_RECENT_SEARCHES) {
      searches.splice(MAX_RECENT_SEARCHES);
    }
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Silently fail if localStorage is not available
  }
};