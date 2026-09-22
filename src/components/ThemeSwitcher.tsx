'use client';

// Split into 3 independent pill triggers (Mode / Color / Effect), each opening
// its own small popover. Nothing stacks, so no popover is ever tall.
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Moon, Sun, Laptop } from 'lucide-react';
import { EffectType } from './ParticleBackground';
import { useTheme, presetColors } from '@/context/ThemeContext';

interface Props {
    current: EffectType;
    onChange: (e: EffectType) => void;
}

const effects: { id: EffectType; label: string; icon: string }[] = [
    { id: 'off',              label: 'No Animation',      icon: '○' },
    { id: 'liquid-flow',      label: 'Liquid Flow',       icon: '~' },
    { id: 'galaxy-swirl',     label: 'Galaxy Swirl',      icon: '✺' },
    { id: 'dna-waves',        label: 'DNA Waves',         icon: '⌇' },
    { id: 'quantum-field',    label: 'Quantum Field',     icon: '⚛' },
    { id: 'magnetic-field',   label: 'Magnetic Field',    icon: '⊙' },
    { id: 'gravity-well',     label: 'Gravity Well',      icon: '◉' },
    { id: 'aurora-beams',     label: 'Aurora Beams',      icon: '╱' },
    { id: 'fire-flies',       label: 'Fire Flies',        icon: '✧' },
    { id: 'milky-way',        label: 'Milky Way',         icon: '✦' },
    { id: 'chladni-resonance',label: 'Chladni Resonance', icon: '∿' },
    { id: 'ferrofluid-peaks', label: 'Ferrofluid',        icon: '⋮' },
    { id: 'mycelium-growth',  label: 'Mycelium Growth',   icon: '⌁' },
    { id: 'turing-patterns',  label: 'Turing Patterns',   icon: '◍' },
    { id: 'strange-attractor',label: 'Strange Attractor', icon: '∞' },
];

type Popover = 'mode' | 'color' | 'fx' | null;

const ThemeSwitcher = ({ current, onChange }: Props) => {
    const [open, setOpen] = useState<Popover>(null);
    const [query, setQuery] = useState('');
    const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isDark = resolvedMode === 'dark';

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(null);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const pillCls = (active: boolean) => `px-3 h-9 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
        active
            ? (isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-900/5 border-slate-300 text-slate-900')
            : (isDark ? 'bg-slate-900/90 border-white/10 text-slate-300 hover:bg-white/5' : 'bg-white/90 border-slate-200 text-slate-600 hover:bg-slate-50')
    }`;

    const popoverCls = `absolute bottom-12 right-0 backdrop-blur-xl border rounded-xl shadow-2xl ${isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'}`;

    const activeFxStyle = {
        backgroundColor: 'hsl(var(--theme-primary) / 0.18)',
        color:           isDark ? 'hsl(var(--theme-primary))' : 'hsl(var(--theme-primary-text))',
    };

    const filteredEffects = effects.filter(fx => fx.label.toLowerCase().includes(query.toLowerCase()));
    const currentFx = effects.find(fx => fx.id === current);

    const ModeIcon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Laptop;

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
            {/* Mode pill */}
            <div className="relative">
                <AnimatePresence>
                    {open === 'mode' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={`${popoverCls} p-1 flex gap-1`}
                        >
                            {(['dark', 'light', 'system'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => { setMode(m); setOpen(null); }}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${mode === m
                                        ? (isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900')
                                        : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                                    }`}
                                >
                                    {m === 'dark' && <Moon className="w-3.5 h-3.5" />}
                                    {m === 'light' && <Sun className="w-3.5 h-3.5" />}
                                    {m === 'system' && <Laptop className="w-3.5 h-3.5" />}
                                    {m === 'light' ? 'Bright' : m.charAt(0).toUpperCase() + m.slice(1)}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                <button onClick={() => setOpen(open === 'mode' ? null : 'mode')} className={pillCls(open === 'mode')}>
                    <ModeIcon className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Color pill */}
            <div className="relative">
                <AnimatePresence>
                    {open === 'color' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={`${popoverCls} p-2 flex gap-1.5`}
                        >
                            {presetColors.filter(c => !c.animated).map(color => (
                                <button
                                    key={color.name}
                                    onClick={() => { setTheme(color); setOpen(null); }}
                                    title={color.name}
                                    className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${theme.name === color.name ? 'ring-2 ring-offset-1' : ''} ${isDark ? 'ring-offset-slate-900' : 'ring-offset-white'}`}
                                    style={{ background: `hsl(${color.primary})`, ...(theme.name === color.name ? { boxShadow: `0 0 0 2px hsl(${color.primary})` } : {}) }}
                                >
                                    {theme.name === color.name && <Check className="w-3 h-3 text-white" />}
                                </button>
                            ))}
                            <button
                                onClick={() => { setTheme(presetColors.find(c => c.animated)!); setOpen(null); }}
                                title="Prismatic"
                                className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110`}
                                style={{ background: 'conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)' }}
                            >
                                {theme.animated && <Check className="w-3 h-3 text-white drop-shadow" />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button onClick={() => setOpen(open === 'color' ? null : 'color')} className={pillCls(open === 'color')}>
                    <span
                        className="w-3.5 h-3.5 rounded-full inline-block"
                        style={theme.animated
                            ? { background: 'conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)' }
                            : { background: `hsl(${theme.primary})` }}
                    />
                </button>
            </div>

            {/* Effect pill — searchable mini command palette */}
            <div className="relative">
                <AnimatePresence>
                    {open === 'fx' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={`${popoverCls} w-64 p-2`}
                        >
                            <input
                                autoFocus
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search effects..."
                                className={`w-full mb-2 px-2.5 py-1.5 rounded-lg text-xs outline-none border ${isDark ? 'bg-slate-950 border-white/10 text-white placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`}
                            />
                            <div className="max-h-56 overflow-y-auto space-y-0.5">
                                {filteredEffects.map(fx => (
                                    <button
                                        key={fx.id}
                                        onClick={() => { onChange(fx.id); setOpen(null); setQuery(''); }}
                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                                            current !== fx.id && (isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')
                                        }`}
                                        style={current === fx.id ? activeFxStyle : {}}
                                    >
                                        <span className="text-sm leading-none w-4 text-center">{fx.icon}</span>
                                        {fx.label}
                                    </button>
                                ))}
                                {filteredEffects.length === 0 && (
                                    <p className={`text-xs px-2.5 py-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No matches</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button onClick={() => setOpen(open === 'fx' ? null : 'fx')} className={pillCls(open === 'fx')}>
                    <span className="text-sm leading-none">{currentFx?.icon ?? '○'}</span>
                    <span className="max-w-[90px] truncate">{currentFx?.label ?? 'Effect'}</span>
                </button>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
