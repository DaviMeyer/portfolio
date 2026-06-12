'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Minimize2, ChevronDown, Check, Moon, Sun, Laptop } from 'lucide-react';
import { EffectType } from './ParticleBackground';
import { useTheme, presetColors } from '@/context/ThemeContext';

interface ThemeSwitcherProps {
    current: EffectType;
    onChange: (e: EffectType) => void;
}

// CSS-variable-based colors so Prismatic animates everywhere
const themeStyle = {
    bg:         { backgroundColor: 'hsl(var(--theme-primary) / 0.18)' },
    text:       { color:           'hsl(var(--theme-primary))' },
    border:     { border: '1px solid hsl(var(--theme-primary) / 0.35)' },
    activeBtn:  {
        backgroundColor: 'hsl(var(--theme-primary) / 0.18)',
        color:           'hsl(var(--theme-primary))',
        border:          '1px solid hsl(var(--theme-primary) / 0.35)',
    },
    floatBtn:   {
        background: 'hsl(var(--theme-primary))',
        boxShadow:  '0 8px 32px hsl(var(--theme-primary) / 0.45)',
    },
    badgeBg:    { background: 'linear-gradient(135deg, hsl(var(--theme-primary)), hsl(var(--theme-primary) / 0.6))' },
    leftBorder: { borderLeft: '2px solid hsl(var(--theme-primary) / 0.35)' },
};

const ThemeSwitcher = ({ current, onChange }: ThemeSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isDark = resolvedMode === 'dark';

    const effects: { id: EffectType; label: string }[] = [
        { id: 'off',            label: 'No Animation'   },
        { id: 'liquid-flow',    label: 'Liquid Flow'    },
        { id: 'galaxy-swirl',   label: 'Galaxy Swirl'   },
        { id: 'dna-waves',      label: 'DNA Waves'      },
        { id: 'quantum-field',  label: 'Quantum Field'  },
        { id: 'magnetic-field', label: 'Magnetic Field' },
        { id: 'gravity-well',   label: 'Gravity Well'   },
        { id: 'aurora-beams',   label: 'Aurora Beams'   },
        { id: 'fire-flies',     label: 'Fire Flies'     },
    ];

    const signatureEffects: { id: EffectType; label: string; icon: string }[] = [
        { id: 'milky-way',        label: 'Milky Way',        icon: '✦' },
        { id: 'chladni-resonance',label: 'Chladni Resonance',icon: '∿' },
        { id: 'ferrofluid-peaks', label: 'Ferrofluid',       icon: '⋮' },
        { id: 'mycelium-growth',  label: 'Mycelium Growth',  icon: '⌁' },
        { id: 'turing-patterns',  label: 'Turing Patterns',  icon: '◍' },
        { id: 'strange-attractor',label: 'Strange Attractor',icon: '∞' },
    ];

    const panelCls = `absolute bottom-16 right-0 w-72 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'}`;

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={panelCls}
                    >
                        {/* ── Appearance ── */}
                        <div className={`mb-5 border-b pb-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Appearance
                            </h3>
                            <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                                {(['dark', 'light', 'system'] as const).map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setMode(m)}
                                        className={`flex items-center justify-center py-2 rounded-md transition-all text-xs font-medium ${mode === m
                                            ? (isDark ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm')
                                            : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                                        }`}
                                    >
                                        {m === 'dark'   && <Moon className="w-3.5 h-3.5 mr-1" />}
                                        {m === 'light'  && <Sun  className="w-3.5 h-3.5 mr-1" />}
                                        {m === 'system' && <Laptop className="w-3.5 h-3.5 mr-1" />}
                                        {m === 'light' ? 'Bright' : m.charAt(0).toUpperCase() + m.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── Color Theme ── */}
                        <div className={`mb-5 border-b pb-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Color Theme
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {presetColors.filter(c => !c.animated).map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => setTheme(color)}
                                        className={`relative h-10 rounded-lg border transition-all overflow-hidden flex items-center justify-center ${
                                            theme.name === color.name
                                                ? `border-${color.tailwind}-400 ring-1 ring-${color.tailwind}-400/50`
                                                : (isDark ? 'border-white/10 hover:border-white/30' : 'border-slate-200 hover:border-slate-400')
                                        }`}
                                        style={{ background: `linear-gradient(135deg, hsl(${color.primary}), hsl(${color.accent}))` }}
                                    >
                                        {theme.name === color.name && (
                                            <div className="bg-black/30 rounded-full p-0.5">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Prismatic — animated rainbow */}
                            <button
                                onClick={() => setTheme(presetColors.find(c => c.animated)!)}
                                className={`mt-2 w-full h-10 rounded-lg border transition-all overflow-hidden flex items-center justify-center gap-2 text-white text-xs font-bold tracking-wide ${
                                    theme.animated
                                        ? 'border-violet-400 ring-1 ring-violet-400/50'
                                        : (isDark ? 'border-white/10 hover:border-white/30' : 'border-slate-200 hover:border-slate-400')
                                }`}
                                style={{ background: 'linear-gradient(135deg, hsl(0,100%,65%), hsl(60,100%,65%), hsl(130,90%,52%), hsl(200,100%,62%), hsl(270,90%,66%), hsl(330,100%,65%))' }}
                            >
                                {theme.animated && <Check className="w-3 h-3 drop-shadow" />}
                                <span className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Prismatic</span>
                            </button>
                        </div>

                        {/* ── Background FX ── */}
                        <div className={`flex items-center justify-between mb-3 border-b pb-2 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Background FX
                            </h3>
                            <button onClick={() => setIsOpen(false)} className={isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}>
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-1 mb-4">
                            {effects.map(fx => (
                                <button
                                    key={fx.id}
                                    onClick={() => onChange(fx.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                        current !== fx.id && (isDark ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
                                    }`}
                                    style={current === fx.id ? themeStyle.activeBtn : {}}
                                >
                                    {fx.label}
                                </button>
                            ))}
                        </div>

                        {/* ── Signature FX ── */}
                        <div className={`border-t pt-4 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Signature FX
                                </h3>
                                <span
                                    className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full text-white"
                                    style={themeStyle.badgeBg}
                                >
                                    NEW
                                </span>
                            </div>
                            <div className="space-y-1">
                                {signatureEffects.map(fx => (
                                    <button
                                        key={fx.id}
                                        onClick={() => onChange(fx.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                                            current !== fx.id && (isDark ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
                                        }`}
                                        style={current === fx.id ? themeStyle.activeBtn : themeStyle.leftBorder}
                                    >
                                        <span className="text-base leading-none">{fx.icon}</span>
                                        <span>{fx.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating button ── */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 text-white rounded-full transition-all flex items-center justify-center"
                style={themeStyle.floatBtn}
            >
                {isOpen ? <ChevronDown className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default ThemeSwitcher;
