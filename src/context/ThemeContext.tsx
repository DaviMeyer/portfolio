'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const presetColors = [
    { name: 'Blue', primary: '210 100% 60%', accent: '220 30% 15%', tailwind: 'blue', secondary: 'cyan' },
    { name: 'Green', primary: '142 76% 36%', accent: '142 30% 15%', tailwind: 'green', secondary: 'emerald' },
    { name: 'Purple', primary: '262 83% 58%', accent: '262 30% 15%', tailwind: 'purple', secondary: 'fuchsia' },
    { name: 'Orange', primary: '24 95% 53%', accent: '24 30% 15%', tailwind: 'orange', secondary: 'amber' },
    { name: 'Pink', primary: '330 81% 60%', accent: '330 30% 15%', tailwind: 'pink', secondary: 'rose' },
    { name: 'Teal', primary: '173 80% 40%', accent: '173 30% 15%', tailwind: 'teal', secondary: 'emerald' },
];

export type ThemeMode = 'dark' | 'light' | 'system';

interface ThemeContextType {
    theme: typeof presetColors[0];
    setTheme: (theme: typeof presetColors[0]) => void;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    resolvedMode: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType>({
    theme: presetColors[3], // Default to Orange
    setTheme: () => { },
    mode: 'dark',
    setMode: () => { },
    resolvedMode: 'dark',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(presetColors[3]);
    const [mode, setMode] = useState<ThemeMode>('dark');
    const [resolvedMode, setResolvedMode] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        document.documentElement.style.setProperty('--theme-primary', theme.primary);
    }, [theme]);

    // Handle System Preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (mode === 'system') {
                setResolvedMode(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        // Initial check
        if (mode === 'system') {
            setResolvedMode(mediaQuery.matches ? 'dark' : 'light');
        } else {
            setResolvedMode(mode);
        }

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, resolvedMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
