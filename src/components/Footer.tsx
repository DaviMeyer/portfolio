'use client';

import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="py-12 border-t border-white/5 bg-slate-950 relative overflow-hidden z-10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-orange-500/10 blur-[80px]" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
                <h2 className="text-2xl font-bold text-white mb-8">Let's build something great together!</h2>

                <div className="flex justify-center gap-6 mb-12">
                    <a href="https://github.com/DaviMeyer" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-900 border border-white/10 hover:border-orange-400 hover:text-orange-400 transition-all text-slate-400 group">
                        <Github className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="mailto:contact@davimeyer.dev" className="p-3 rounded-full bg-slate-900 border border-white/10 hover:border-amber-400 hover:text-amber-400 transition-all text-slate-400 group">
                        <Mail className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                    </a>
                </div>

                <p className="text-slate-600 text-sm">
                    © {new Date().getFullYear()} Davi Meyer. Built with Next.js, Tailwind & Framer Motion.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
