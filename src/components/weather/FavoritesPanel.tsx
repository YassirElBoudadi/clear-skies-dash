import React, { useState, useEffect } from 'react';
import { Heart, X, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Favorite {
  id: string;
  city_name: string;
  country?: string;
  lat?: number;
  lon?: number;
}

interface FavoritesPanelProps {
  onCitySelect: (city: string) => void;
  currentCity?: string;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ onCitySelect, currentCity }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast.error('Failed to load favorites');
    }
  };

  const addToFavorites = async () => {
    if (!newCityName.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ city_name: newCityName.trim() }])
        .select()
        .single();

      if (error) throw error;

      setFavorites(prev => [...prev, data]);
      setNewCityName('');
      setIsAddingNew(false);
      toast.success(`${newCityName} added to favorites`);
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Failed to add to favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string, cityName: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.id !== id));
      toast.success(`${cityName} removed from favorites`);
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const addCurrentCity = async () => {
    if (!currentCity) return;

    const exists = favorites.some(fav => 
      fav.city_name.toLowerCase() === currentCity.toLowerCase()
    );

    if (exists) {
      toast.info('City is already in favorites');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ city_name: currentCity }])
        .select()
        .single();

      if (error) throw error;

      setFavorites(prev => [...prev, data]);
      toast.success(`${currentCity} added to favorites`);
    } catch (error) {
      console.error('Error adding current city:', error);
      toast.error('Failed to add to favorites');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-glass/30 backdrop-blur-sm border-glass-border shadow-soft animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-destructive" />
          <h3 className="font-semibold text-foreground">Favorites</h3>
        </div>
        {currentCity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addCurrentCity}
            disabled={loading}
            className="text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Current
          </Button>
        )}
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="flex items-center justify-between p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group"
          >
            <button
              onClick={() => onCitySelect(favorite.city_name)}
              className="flex items-center gap-2 flex-1 text-left hover:text-primary transition-colors"
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{favorite.city_name}</span>
              {favorite.country && (
                <span className="text-xs text-muted-foreground">
                  {favorite.country}
                </span>
              )}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFavorite(favorite.id, favorite.city_name)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}

        {isAddingNew && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
            <Input
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 h-8 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') addToFavorites();
                if (e.key === 'Escape') {
                  setIsAddingNew(false);
                  setNewCityName('');
                }
              }}
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={addToFavorites}
              disabled={loading || !newCityName.trim()}
              className="h-8 px-2"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {!isAddingNew && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAddingNew(true)}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground border-dashed border border-glass-border hover:border-primary/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New City
        </Button>
      )}

      {favorites.length === 0 && !isAddingNew && (
        <p className="text-center text-muted-foreground text-sm py-4">
          No favorites yet. Add some cities to get started!
        </p>
      )}
    </Card>
  );
};