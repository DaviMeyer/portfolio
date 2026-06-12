'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useSyncExternalStore } from 'react';

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

// WCAG relative luminance of an HSL color (h: 0-360, s/l: 0-100)
const hslLuminance = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * lin(f(0)) + 0.7152 * lin(f(8)) + 0.0722 * lin(f(4));
};

// Sets --theme-primary plus two derived variables:
//   --theme-on-primary:   readable text/icon color ON the primary color (dark navy on bright hues, white on dark hues)
//   --theme-primary-text: darkened primary for text on light surfaces
const setThemeVars = (h: number, s: number, l: number, raw: string) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', raw);
    root.style.setProperty('--theme-on-primary', hslLuminance(h, s, l) > 0.2 ? '222 47% 11%' : '0 0% 100%');
    root.style.setProperty('--theme-primary-text', `${h.toFixed(1)} ${Math.min(s, 85)}% ${Math.min(l, 30)}%`);
};

const subscribeSystemDark = (cb: () => void) => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(presetColors[3]);
    const [mode, setMode] = useState<ThemeMode>('dark');
    const animRef = useRef<number | null>(null);

    const systemDark = useSyncExternalStore(
        subscribeSystemDark,
        () => window.matchMedia('(prefers-color-scheme: dark)').matches,
        () => true, // server snapshot: default dark
    );
    const resolvedMode: 'dark' | 'light' = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;

    useEffect(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);

        if (theme.animated) {
            const tick = () => {
                const t = Date.now();
                // Rapid hue cycle (~4.8s full), full saturation, pulsing lightness 60–72%
                const hue = (t * 0.075) % 360;
                const light = 66 + 6 * Math.sin(t * 0.0018);
                setThemeVars(hue, 100, light, `${hue.toFixed(1)} 100% ${light.toFixed(1)}%`);
                animRef.current = requestAnimationFrame(tick);
            };
            animRef.current = requestAnimationFrame(tick);
        } else {
            const [h, s, l] = theme.primary.split(' ').map(parseFloat);
            setThemeVars(h, s, l, theme.primary);
        }

        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, [theme]);

    // Keep page background / native UI (scrollbar, overscroll) in sync with the resolved mode
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--background', resolvedMode === 'dark' ? '#020617' : '#f8fafc');
        root.style.setProperty('--foreground', resolvedMode === 'dark' ? '#f8fafc' : '#0f172a');
        root.style.colorScheme = resolvedMode;
    }, [resolvedMode]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, resolvedMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
