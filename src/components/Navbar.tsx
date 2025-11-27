'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const { theme } = useTheme();

    return (
        <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-white/5 bg-slate-950/70">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-${theme.tailwind}-400 to-${theme.secondary}-400`}>
                    DM.
                </span>
                <div className="flex gap-6 text-sm font-medium text-slate-300">
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
