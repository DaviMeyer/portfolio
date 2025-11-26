'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '@/data/portfolio';

const Timeline = () => {
    return (
        <section id="cv" className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">My Journey</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full" />
            </motion.div>

            <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
                {timelineData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Dot on timeline */}
                        <span className="absolute -left-[5px] top-2 h-[11px] w-[11px] rounded-full bg-slate-950 border-2 border-orange-500 z-10 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>

                        <div className="group relative p-6 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-orange-500/30 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-slate-800/50 text-white group-hover:text-orange-400 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-100">{item.title}</h3>
                                        <p className="text-orange-400 font-medium">{item.place}</p>
                                    </div>
                                </div>
                                <span className="mt-2 md:mt-0 px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-slate-400 border border-white/5">
                                    {item.year}
                                </span>
                            </div>

                            <p className="text-slate-400 leading-relaxed mb-4">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
