'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Hero = () => {
    const { theme } = useTheme();

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 pt-16 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center max-w-3xl z-10"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <span className={`inline-flex items-center px-3 py-1 rounded-full border border-${theme.tailwind}-500/30 bg-${theme.tailwind}-500/10 text-${theme.tailwind}-400 text-xs font-mono tracking-wider`}>
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r from-${theme.tailwind}-500 to-${theme.secondary}-500 mr-2 animate-pulse`}></span>
                        AVAILABLE FOR PROJECTS
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
                    Davi Meyer
                </h1>

                <h2 className="text-2xl md:text-4xl font-light text-slate-400 mb-8">
                    Full Stack Developer <span className={`bg-clip-text text-transparent bg-gradient-to-r from-${theme.tailwind}-400 to-${theme.secondary}-400`}>&</span> Software Engineer
                </h2>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                    Building digital experiences at <strong className="text-white">SIX Group</strong>.
                    Specialized in building scalable full-stack applications, from database design to responsive user interfaces.
                </p>

                <div className="flex gap-4 justify-center">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact"
                        className={`px-8 py-3 bg-gradient-to-r from-${theme.tailwind}-500 to-${theme.secondary}-500 text-slate-950 font-bold rounded-lg hover:from-${theme.tailwind}-400 hover:to-${theme.secondary}-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                    >
                        Contact Me
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#cv"
                        className="px-8 py-3 bg-slate-800/50 border border-white/10 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors backdrop-blur-sm"
                    >
                        View Resume
                    </motion.a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10"
            >
                <ChevronDown className="text-slate-500 w-6 h-6" />
            </motion.div>
        </section>
    );
};

export default Hero;
