'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hobbiesData } from '@/data/portfolio';

const Hobbies = () => {
    return (
        <section id="hobbies" className="py-24 px-6 bg-slate-900/30 relative z-10">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hobbiesData.map((hobby, index) => (
                        <motion.div
                            key={hobby.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/5 hover:border-orange-500/30 group text-center backdrop-blur-sm transition-all"
                        >
                            <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all duration-300 text-slate-300">
                                {hobby.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{hobby.name}</h3>
                            <p className="text-sm text-slate-400">{hobby.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hobbies;
