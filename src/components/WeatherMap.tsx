import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';

interface WeatherMapProps {
  lat?: number;
  lon?: number;
  city?: string;
}

export const WeatherMap = ({ lat, lon, city }: WeatherMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !lat || !lon) return;

    // Use demo key - user should replace with their own Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrZXVrYXVpYTBmdHozMGxsYXJkdXYwNncifQ.demo_token';
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 10,
        center: [lon, lat],
        attributionControl: false,
      });

      // Add marker for current location
      new mapboxgl.Marker({
        color: 'hsl(var(--primary))',
        scale: 0.8,
      })
        .setLngLat([lon, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="p-2 font-medium">${city || 'Current Location'}</div>`)
        )
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true,
        }),
        'bottom-right'
      );

    } catch (error) {
      console.warn('Mapbox not configured properly. Please add your Mapbox token.');
    }

    return () => {
      map.current?.remove();
    };
  }, [lat, lon, city]);

  if (!lat || !lon) {
    return (
      <Card className="h-64 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl overflow-hidden animate-fade-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <div className="w-6 h-6 bg-primary/20 rounded-lg"></div>
            </div>
            <p className="text-muted-foreground text-sm">Map will appear when location is available</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-64 bg-gradient-card backdrop-blur-lg border-glass-border shadow-glass rounded-3xl overflow-hidden animate-scale-bounce">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-2xl px-3 py-2 text-sm font-medium border border-glass-border shadow-soft">
        📍 {city || 'Current Location'}
      </div>
    </Card>
  );
};