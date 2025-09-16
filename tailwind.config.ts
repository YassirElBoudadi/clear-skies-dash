import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          blue: "hsl(var(--card-blue))",
          "blue-foreground": "hsl(var(--card-blue-foreground))",
          green: "hsl(var(--card-green))",
          "green-foreground": "hsl(var(--card-green-foreground))",
          orange: "hsl(var(--card-orange))",
          "orange-foreground": "hsl(var(--card-orange-foreground))",
          purple: "hsl(var(--card-purple))",
          "purple-foreground": "hsl(var(--card-purple-foreground))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass))",
          border: "hsl(var(--glass-border))",
        },
        weather: {
          sunny: "hsl(var(--sunny))",
          "sunny-foreground": "hsl(var(--sunny-foreground))",
          cloudy: "hsl(var(--cloudy))",
          "cloudy-foreground": "hsl(var(--cloudy-foreground))",
          rainy: "hsl(var(--rainy))",
          "rainy-foreground": "hsl(var(--rainy-foreground))",
          stormy: "hsl(var(--stormy))",
          "stormy-foreground": "hsl(var(--stormy-foreground))",
          snowy: "hsl(var(--snowy))",
          "snowy-foreground": "hsl(var(--snowy-foreground))",
        },
        time: {
          sunrise: "hsl(var(--sunrise))",
          sunset: "hsl(var(--sunset))",
          golden: "hsl(var(--golden))",
        },
        sky: {
          morning: "hsl(var(--sky-morning))",
          day: "hsl(var(--sky-day))",
          evening: "hsl(var(--sky-evening))",
          night: "hsl(var(--sky-night))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-sky': 'var(--gradient-sky)',
        'gradient-sunset': 'var(--gradient-sunset)',
        'gradient-night': 'var(--gradient-night)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-weather': 'var(--gradient-weather)',
        'gradient-blue': 'var(--gradient-blue)',
        'gradient-green': 'var(--gradient-green)',
        'gradient-orange': 'var(--gradient-orange)',
        'gradient-purple': 'var(--gradient-purple)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'glass': 'var(--shadow-glass)',  
        'elevation': 'var(--shadow-elevation)',
        'glow': 'var(--shadow-glow)',
        'inner': 'var(--shadow-inner)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "weather-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        "glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.3))" },
          "50%": { filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))" }
        },
        "scale-bounce": {
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" }
        },
        "blur-in": {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" }
        },
        "fall": {
          "0%": { transform: "translateY(-100vh)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" }
        },
        "drift": {
          "0%": { transform: "translateX(-20px)" },
          "50%": { transform: "translateX(20px)" },
          "100%": { transform: "translateX(-20px)" }
        },
        "spin-slow": {
          "0%": { transform: "translateX(-50%) rotate(0deg)" },
          "100%": { transform: "translateX(-50%) rotate(360deg)" }
        },
        "snow": {
          "0%": { transform: "translateY(-100vh) translateX(0px)", opacity: "1" },
          "100%": { transform: "translateY(100vh) translateX(100px)", opacity: "0" }
        },
        "lightning": {
          "0%, 90%, 100%": { opacity: "0" },
          "10%": { opacity: "1" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
        "weather-pulse": "weather-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "scale-bounce": "scale-bounce 0.6s ease-out",
        "blur-in": "blur-in 0.6s ease-out",
        "fall": "fall 1s linear infinite",
        "drift": "drift 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "snow": "snow 5s linear infinite",
        "lightning": "lightning 0.1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
