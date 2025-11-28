'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Code2, Terminal, Layers } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface TimelineItem {
    id: number;
    year: string;
    title: string;
    place: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        year: '2025 - Present',
        title: 'Full Stack Developer',
        place: 'SIX Group',
        description: 'Working in a specialized department developing end-to-end solutions. Designing robust backend architectures and crafting intuitive frontend experiences.',
        icon: <Server className="w-6 h-6" />,
        tags: ['React', 'Node.js', 'TypeScript', 'SQL', 'Angular']
    },
    {
        id: 5,
        year: '2024 - 2025',
        title: 'C++ Development',
        place: 'SIX Group',
        description: 'Deep dive into low-level programming and performance optimization. Learned core C++ concepts and applied them in a professional environment.',
        icon: <Code2 className="w-6 h-6" />,
        tags: ['C++', 'Backend', 'Performance']
    },
    {
        id: 2,
        year: '2023 - 2024',
        title: 'IT-Lab',
        place: 'SIX Group',
        description: 'Intensive practical year in the Innovation Lab. Developed internal tools and deepened knowledge in agile methodologies (Scrum).',
        icon: <Terminal className="w-6 h-6" />,
        tags: ['Innovation', 'Fullstack', 'Agile', 'SQL', 'MariaDB', 'Angular', 'Springboot']
    },
    {
        id: 3,
        year: '2022 - 2023',
        title: 'Apprenticeship Basic Training',
        place: 'BBC (Berufsbildungscenter)',
        description: 'Solid foundation in software engineering. Covered database management, web basics, and Clean Code principles.',
        icon: <Layers className="w-6 h-6" />,
        tags: ['SQL', 'Basics', 'Education', 'Python', 'Java', 'HTML', 'CSS', 'JavaScript']
    },
    {
        id: 4,
        year: '2019 - 2022',
        title: 'Secondary School',
        place: 'Level A',
        description: 'Successfully completed secondary education with a focus on natural sciences and mathematics.',
        icon: <Layers className="w-6 h-6 opacity-70" />,
        tags: ['School', 'Math', 'Logic']
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const Timeline = () => {
    const { theme, resolvedMode } = useTheme();

    return (
        <section id="cv" className="py-24 px-6 max-w-4xl mx-auto z-10 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${resolvedMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>My Journey</h2>
                    <div className={`w-20 h-1 bg-gradient-to-r from-${theme.tailwind}-500 to-${theme.secondary}-500 mx-auto rounded-full mb-8`} />

                    <p className={`max-w-2xl mx-auto leading-relaxed ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        I am Davi Meyer, currently in my 4th and final year of apprenticeship at Six Group AG, and I expect to complete my apprenticeship in Summer 2026.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className={`relative border-l ml-3 md:ml-6 space-y-12 ${resolvedMode === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {timelineData.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className={`absolute -left-[5px] top-2 h-[11px] w-[11px] rounded-full border-2 border-${theme.tailwind}-500 z-10 shadow-[0_0_10px_rgba(255,255,255,0.2)] ${resolvedMode === 'dark' ? 'bg-slate-950' : 'bg-white'}`}></span>

                        <div className={`group relative p-6 border rounded-2xl hover:border-${theme.tailwind}-500/30 transition-all duration-300 backdrop-blur-sm ${resolvedMode === 'dark' ? 'bg-slate-900/40 border-white/5 hover:bg-slate-900/60' : 'bg-white/60 border-slate-200 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50'}`}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg group-hover:text-${theme.tailwind}-500 transition-colors ${resolvedMode === 'dark' ? 'bg-slate-800/50 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold ${resolvedMode === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{item.title}</h3>
                                        <p className={`font-medium bg-clip-text text-transparent bg-gradient-to-r from-${theme.tailwind}-400 to-${theme.secondary}-400`}>{item.place}</p>
                                    </div>
                                </div>
                                <span className={`mt-2 md:mt-0 px-3 py-1 text-xs font-mono rounded-full border ${resolvedMode === 'dark' ? 'bg-white/5 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {item.year}
                                </span>
                            </div>

                            <p className={`leading-relaxed mb-4 ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className={`text-xs px-2 py-1 rounded border ${resolvedMode === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700/50' : 'bg-white text-slate-600 border-slate-200'}`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Timeline;
