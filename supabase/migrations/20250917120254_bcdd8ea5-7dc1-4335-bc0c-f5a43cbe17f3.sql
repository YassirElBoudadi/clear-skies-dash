-- Create favorites table for storing user's favorite cities
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  city_name TEXT NOT NULL,
  country TEXT,
  lat DECIMAL(10, 8),
  lon DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for favorites (allowing all users for now since no auth yet)
CREATE POLICY "Anyone can view favorites" 
ON public.favorites 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create favorites" 
ON public.favorites 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update favorites" 
ON public.favorites 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete favorites" 
ON public.favorites 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_favorites_updated_at
BEFORE UPDATE ON public.favorites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create weather_history table for caching historical data
CREATE TABLE public.weather_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city_name TEXT NOT NULL,
  date DATE NOT NULL,
  temperature_max DECIMAL(5, 2),
  temperature_min DECIMAL(5, 2),
  humidity INTEGER,
  pressure DECIMAL(6, 2),
  wind_speed DECIMAL(5, 2),
  weather_condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(city_name, date)
);

-- Enable RLS for weather history
ALTER TABLE public.weather_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view weather history" 
ON public.weather_history 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert weather history" 
ON public.weather_history 
FOR INSERT 
WITH CHECK (true);

-- Add index for better performance
CREATE INDEX idx_weather_history_city_date ON public.weather_history(city_name, date);
CREATE INDEX idx_favorites_city ON public.favorites(city_name);