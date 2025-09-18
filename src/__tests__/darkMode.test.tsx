import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
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
    mockUseTheme.theme = 'light';
  });

  it('should render theme toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should toggle to dark mode when clicked in light mode', () => {
    mockUseTheme.theme = 'light';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle to light mode when clicked in dark mode', () => {
    mockUseTheme.theme = 'dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should handle system theme properly', () => {
    mockUseTheme.theme = undefined;
    mockUseTheme.systemTheme = 'dark';
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should be accessible', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });
});