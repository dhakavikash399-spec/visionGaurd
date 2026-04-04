'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'visionguard-theme';

function resolveInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme());

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const value = useMemo<ThemeContextValue>(() => {
        return {
            theme,
            setTheme: (next) => {
                setThemeState(next);
                try {
                    window.localStorage.setItem(STORAGE_KEY, next);
                } catch {
                    // Non-critical: ignore localStorage failures
                }
            },
            toggleTheme: () => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setThemeState(next);
                try {
                    window.localStorage.setItem(STORAGE_KEY, next);
                } catch {
                    // Non-critical
                }
            },
        };
    }, [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}

