'use client';

import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-white/5 bg-slate-950/70">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">
                    DM.
                </span>
                <div className="flex gap-6 text-sm font-medium text-slate-300">
                    <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
                    <a href="#cv" className="hover:text-orange-400 transition-colors">Resume</a>
                    <a href="#projects" className="hover:text-orange-400 transition-colors">Projects</a>
                    <a href="#hobbies" className="hover:text-orange-400 transition-colors">Hobbies</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
