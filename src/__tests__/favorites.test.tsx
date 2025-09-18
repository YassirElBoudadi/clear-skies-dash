import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { FavoritesPanel } from '@/components/weather/FavoritesPanel';

// Mock Supabase
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockDelete = vi.fn();
const mockEq = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
      insert: mockInsert,
      delete: mockDelete
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
    
    // Default mock setup
    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [], error: null })
    });
    
    mockInsert.mockResolvedValue({ data: [], error: null });
    
    mockDelete.mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: [], error: null })
    });
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

    // Setup mock to return favorites
    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: mockFavorites, error: null })
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="Berlin" 
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

    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: mockFavorites, error: null })
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="Paris" 
      />
    );

    await waitFor(() => {
      const londonButton = screen.getByText('London');
      expect(londonButton).toBeInTheDocument();
    });

    const londonButton = screen.getByText('London');
    fireEvent.click(londonButton);
    
    expect(mockOnCitySelect).toHaveBeenCalledWith('London');
  });

  it('should handle empty favorites state', async () => {
    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [], error: null })
    });

    render(
      <FavoritesPanel 
        onCitySelect={mockOnCitySelect} 
        currentCity="London" 
      />
    );

    await waitFor(() => {
      expect(screen.getByText('No favorite cities yet')).toBeInTheDocument();
    });
  });
});