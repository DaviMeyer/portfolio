'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Dumbbell, Mountain, Gamepad2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HobbyItem {
    id: number;
    name: string;
    desc: string;
    icon: React.ReactNode;
}

const hobbiesData: HobbyItem[] = [
    { id: 1, name: 'Piano', desc: 'Classical & Modern', icon: <Music className="w-10 h-10" /> },
    { id: 2, name: 'Gym', desc: 'Fitness & Discipline', icon: <Dumbbell className="w-10 h-10" /> },
    { id: 3, name: 'Hiking', desc: 'Nature & Endurance', icon: <Mountain className="w-10 h-10" /> },
    { id: 4, name: 'Gaming', desc: 'Strategy & Fun', icon: <Gamepad2 className="w-10 h-10" /> },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Hobbies = () => {
    const { theme } = useTheme();

    return (
        <section id="hobbies" className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Beyond Coding</h2>
                    <p className="text-slate-400">Balance and passions outside of the digital world.</p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {hobbiesData.map((hobby) => (
                        <motion.div
                            key={hobby.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/5 hover:border-${theme.tailwind}-500/30 group text-center backdrop-blur-sm transition-all`}
                        >
                            <div className={`mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-${theme.tailwind}-500/20 group-hover:to-${theme.secondary}-500/20 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-${theme.tailwind}-400 group-hover:to-${theme.secondary}-400 transition-all duration-300 text-slate-300`}>
                                {hobby.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{hobby.name}</h3>
                            <p className="text-sm text-slate-400">{hobby.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hobbies;
