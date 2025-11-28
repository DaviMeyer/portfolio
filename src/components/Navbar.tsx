'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const { theme, resolvedMode } = useTheme();

    return (
        <nav className={`fixed top-0 w-full z-40 backdrop-blur-md border-b transition-colors duration-500 ${resolvedMode === 'dark' ? 'border-white/5 bg-slate-950/70' : 'border-slate-200/50 bg-white/70'}`}>
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${theme.tailwind}-400 to-${theme.secondary}-400`}>
                    DM.
                </span>
                <div className={`flex gap-6 text-sm font-medium ${resolvedMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    <a href="#about" className={`hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-${theme.tailwind}-400 hover:to-${theme.secondary}-400 transition-all`}>About</a>
                    <a href="#cv" className={`hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-${theme.tailwind}-400 hover:to-${theme.secondary}-400 transition-all`}>Resume</a>
                    <a href="#projects" className={`hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-${theme.tailwind}-400 hover:to-${theme.secondary}-400 transition-all`}>Projects</a>
                    <a href="#hobbies" className={`hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-${theme.tailwind}-400 hover:to-${theme.secondary}-400 transition-all`}>Hobbies</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
