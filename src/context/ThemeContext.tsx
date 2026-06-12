'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export const presetColors = [
    { name: 'Blue',      primary: '210 100% 60%', accent: '220 30% 15%', tailwind: 'blue',   secondary: 'cyan',    animated: false },
    { name: 'Green',     primary: '142 76% 36%',  accent: '142 30% 15%', tailwind: 'green',  secondary: 'emerald', animated: false },
    { name: 'Purple',    primary: '262 83% 58%',  accent: '262 30% 15%', tailwind: 'purple', secondary: 'fuchsia', animated: false },
    { name: 'Orange',    primary: '24 95% 53%',   accent: '24 30% 15%',  tailwind: 'orange', secondary: 'amber',   animated: false },
    { name: 'Pink',      primary: '330 81% 60%',  accent: '330 30% 15%', tailwind: 'pink',   secondary: 'rose',    animated: false },
    { name: 'Teal',      primary: '173 80% 40%',  accent: '173 30% 15%', tailwind: 'teal',   secondary: 'emerald', animated: false },
    { name: 'Prismatic', primary: '0 100% 65%',   accent: '180 30% 15%', tailwind: 'violet', secondary: 'sky',     animated: true  },
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
    theme: presetColors[3],
    setTheme: () => {},
    mode: 'dark',
    setMode: () => {},
    resolvedMode: 'dark',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(presetColors[3]);
    const [mode, setMode] = useState<ThemeMode>('dark');
    const [resolvedMode, setResolvedMode] = useState<'dark' | 'light'>('dark');
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);

        if (theme.animated) {
            const tick = () => {
                const t = Date.now();
                // Rapid hue cycle (~8s full), full saturation, pulsing lightness 60–72%
                const hue = (t * 0.075) % 360;
                const light = 66 + 6 * Math.sin(t * 0.0018);
                document.documentElement.style.setProperty('--theme-primary', `${hue.toFixed(1)} 100% ${light.toFixed(1)}%`);
                animRef.current = requestAnimationFrame(tick);
            };
            animRef.current = requestAnimationFrame(tick);
        } else {
            document.documentElement.style.setProperty('--theme-primary', theme.primary);
        }

        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [theme]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const update = () => { if (mode === 'system') setResolvedMode(mq.matches ? 'dark' : 'light'); };
        if (mode === 'system') setResolvedMode(mq.matches ? 'dark' : 'light');
        else setResolvedMode(mode);
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, resolvedMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
