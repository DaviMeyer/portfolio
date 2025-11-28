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

const ThemeSwitcher = ({ current, onChange }: ThemeSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const effects: { id: EffectType, label: string }[] = [
        { id: 'off', label: 'No Animation' },
        { id: 'liquid-flow', label: 'Liquid Flow' },
        { id: 'galaxy-swirl', label: 'Galaxy Swirl' },
        { id: 'dna-waves', label: 'DNA Waves' },
        { id: 'quantum-field', label: 'Quantum Field' },
        { id: 'magnetic-field', label: 'Magnetic Field' },
        { id: 'gravity-well', label: 'Gravity Well' },
        { id: 'aurora-beams', label: 'Aurora Beams' },
        { id: 'fire-flies', label: 'Fire Flies' },
    ];

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={`absolute bottom-16 right-0 w-72 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${resolvedMode === 'dark' ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'}`}
                    >
                        {/* Appearance Mode */}
                        <div className={`mb-6 border-b pb-4 ${resolvedMode === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                Appearance
                            </h3>
                            <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg ${resolvedMode === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`}>
                                {(['dark', 'light', 'system'] as const).map((m) => {
                                    const label = m === 'light' ? 'Bright' : m.charAt(0).toUpperCase() + m.slice(1);
                                    return (
                                        <button
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className={`
                                                flex items-center justify-center py-2 rounded-md transition-all text-xs font-medium
                                                ${mode === m
                                                    ? (resolvedMode === 'dark' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm')
                                                    : (resolvedMode === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                                                }
                                            `}
                                        >
                                            {m === 'dark' && <Moon className="w-3.5 h-3.5 mr-1" />}
                                            {m === 'light' && <Sun className="w-3.5 h-3.5 mr-1" />}
                                            {m === 'system' && <Laptop className="w-3.5 h-3.5 mr-1" />}
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className={`mb-6 border-b pb-4 ${resolvedMode === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                Color Theme
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {presetColors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setTheme(color)}
                                        className={`
                                            relative h-10 rounded-lg border transition-all overflow-hidden flex items-center justify-center
                                            ${theme.name === color.name
                                                ? `border-${color.tailwind}-400 ring-1 ring-${color.tailwind}-400/50`
                                                : (resolvedMode === 'dark' ? 'border-white/10 hover:border-white/30' : 'border-slate-200 hover:border-slate-400')
                                            }
                                        `}
                                        style={{
                                            background: `linear-gradient(135deg, hsl(${color.primary}) 0%, hsl(${color.accent}) 100%)`
                                        }}
                                    >
                                        {theme.name === color.name && (
                                            <div className="bg-black/30 rounded-full p-0.5">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Effect Selection */}
                        <div className={`flex items-center justify-between mb-4 border-b pb-2 ${resolvedMode === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                Background FX
                            </h3>
                            <button onClick={() => setIsOpen(false)} className={`${resolvedMode === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}>
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-1 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {effects.map((effect) => (
                                <button
                                    key={effect.id}
                                    onClick={() => onChange(effect.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${current === effect.id
                                        ? `bg-${theme.tailwind}-500/20 text-${theme.tailwind}-500 border border-${theme.tailwind}-500/30`
                                        : (resolvedMode === 'dark' ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
                                        }`}
                                >
                                    {effect.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 bg-${theme.tailwind}-500 text-white rounded-full shadow-lg shadow-${theme.tailwind}-500/20 hover:bg-${theme.tailwind}-400 transition-colors flex items-center justify-center`}
            >
                {isOpen ? <ChevronDown className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default ThemeSwitcher;
