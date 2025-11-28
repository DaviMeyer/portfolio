'use client';

import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
    const { theme, resolvedMode } = useTheme();

    return (
        <footer id="contact" className={`py-12 border-t relative overflow-hidden z-10 ${resolvedMode === 'dark' ? 'border-white/5 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-gradient-to-r from-${theme.tailwind}-500/10 to-${theme.secondary}-500/10 blur-[80px]`} />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
                <h2 className={`text-2xl font-bold mb-8 ${resolvedMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Let's build something great together!</h2>

                <div className="flex justify-center gap-6 mb-12">
                    <a href="https://github.com/DaviMeyer" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full border transition-all group ${resolvedMode === 'dark' ? 'bg-slate-900 border-white/10 hover:border-${theme.tailwind}-400 hover:text-${theme.tailwind}-400 text-slate-400' : 'bg-white border-slate-200 hover:border-${theme.tailwind}-500 hover:text-${theme.tailwind}-500 text-slate-600 shadow-sm'}`}>
                        <Github className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="mailto:contact@davimeyer.dev" className={`p-3 rounded-full border transition-all group ${resolvedMode === 'dark' ? 'bg-slate-900 border-white/10 hover:border-${theme.secondary}-400 hover:text-${theme.secondary}-400 text-slate-400' : 'bg-white border-slate-200 hover:border-${theme.secondary}-500 hover:text-${theme.secondary}-500 text-slate-600 shadow-sm'}`}>
                        <Mail className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                    </a>
                </div>

                <p className={`text-sm ${resolvedMode === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
                    © {new Date().getFullYear()} Davi Meyer. Built with Next.js, Tailwind & Framer Motion.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
