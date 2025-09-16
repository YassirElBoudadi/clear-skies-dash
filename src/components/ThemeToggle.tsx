import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-10 h-10 p-0 rounded-2xl bg-glass/50 backdrop-blur-sm border-glass-border hover:bg-glass/70 hover:shadow-soft transition-all duration-300"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 p-0 rounded-2xl bg-glass/50 backdrop-blur-sm border-glass-border hover:bg-glass/70 hover:shadow-soft transition-all duration-300 hover:scale-105"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 animate-glow text-time-golden" />
      ) : (
        <Moon className="h-5 w-5 text-sky-night" />
      )}
    </Button>
  );
};