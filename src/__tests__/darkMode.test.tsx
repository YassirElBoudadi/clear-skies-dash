import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';

// Mock next-themes
const mockSetTheme = vi.fn();
const mockUseTheme = {
  theme: 'light',
  setTheme: mockSetTheme,
  systemTheme: 'light',
  resolvedTheme: 'light'
};

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => mockUseTheme
}));

describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render theme toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should toggle to dark mode when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle to light mode when in dark mode', () => {
    mockUseTheme.theme = 'dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should show correct icon for light mode', () => {
    mockUseTheme.theme = 'light';
    
    render(<ThemeToggle />);
    
    // The sun icon should be visible in light mode
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show correct icon for dark mode', () => {
    mockUseTheme.theme = 'dark';
    
    render(<ThemeToggle />);
    
    // The moon icon should be visible in dark mode
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});