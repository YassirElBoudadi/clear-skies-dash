import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavoritesPanel } from '@/components/weather/FavoritesPanel';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      insert: vi.fn(() => Promise.resolve({ data: [], error: null })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}));

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn()
}));

describe('FavoritesPanel', () => {
  const mockOnCitySelect = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render favorites panel', () => {
    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="London" 
      />
    );

    expect(screen.getByText('Favorite Cities')).toBeInTheDocument();
    expect(screen.getByText('Add Current City')).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="London" 
      />
    );

    expect(screen.getByText('Loading favorites...')).toBeInTheDocument();
  });

  it('should handle adding current city to favorites', async () => {
    const mockInsert = vi.fn(() => Promise.resolve({ data: [], error: null }));
    (supabase.from as any).mockReturnValue({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: mockInsert
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="London" 
      />
    );

    const addButton = screen.getByText('Add Current City');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith({
        city_name: 'London',
        lat: null,
        lon: null,
        country: null
      });
    });
  });

  it('should display favorites when loaded', async () => {
    const mockFavorites = [
      { id: '1', city_name: 'London', country: 'GB' },
      { id: '2', city_name: 'Paris', country: 'FR' }
    ];

    (supabase.from as any).mockReturnValue({
      select: () => ({
        order: () => Promise.resolve({ data: mockFavorites, error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: [], error: null })
      })
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="London" 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });
  });

  it('should handle city selection', async () => {
    const mockFavorites = [
      { id: '1', city_name: 'London', country: 'GB' }
    ];

    (supabase.from as any).mockReturnValue({
      select: () => ({
        order: () => Promise.resolve({ data: mockFavorites, error: null })
      })
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="Paris" 
      />
    );

    await waitFor(() => {
      const londonButton = screen.getByText('London');
      fireEvent.click(londonButton);
      expect(mockOnCitySelect).toHaveBeenCalledWith('London');
    });
  });
});