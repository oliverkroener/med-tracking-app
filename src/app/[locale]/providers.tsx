"use client"

import { FluentProvider } from "@fluentui/react-components";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import { customDarkTheme, customLightTheme } from "@/theme/theme";

const THEME_KEY = 'theme-preference';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // First check localStorage
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    
    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState<boolean>(false); // Default to false for SSR

    // Initialize theme after mount
    useEffect(() => {
        const initialTheme = getInitialTheme();
        setIsDark(initialTheme);
        setMounted(true);
    }, []);

    // Persist theme changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
        }
    }, [isDark, mounted]);

    const toggleTheme = () => setIsDark(prev => !prev);

    // Handle system theme changes
    useEffect(() => {
        if (!mounted) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem(THEME_KEY)) {
                setIsDark(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mounted]);

    // Prevent theme flash on initial load
    if (!mounted) {
        return null;
    }

    return (
        <SessionProvider>
            <ThemeContext.Provider value={{ isDark, toggleTheme }}>
                <FluentProvider theme={isDark ? customDarkTheme : customLightTheme}>
                    {children}
                </FluentProvider>
            </ThemeContext.Provider>
        </SessionProvider>
    );
}