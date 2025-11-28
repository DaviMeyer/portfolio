'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Train } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Gamepad2 } from 'lucide-react';

interface ProjectItem {
    id: number;
    title: string;
    link: string;
    description: string;
    icon: React.ReactElement;
    tags: string[];
}

const projectsData: ProjectItem[] = [
    {
        id: 1,
        title: 'Tram Departures Board',
        link: 'https://tram.davimeyer.dev',
        description: 'A real-time departure application showing live tram schedules for the two stations located near the SIX Group offices.',
        icon: <Train className="w-10 h-10" />,
        tags: ['Live Data', 'Frontend', 'API Integration']
    },
    {
        id: 2,
        title: 'Neon Gravity Game',
        link: 'https://neon-gravity.davimeyer.dev',
        description: 'A game in which you control a neon ball and aim to eat as many green balls as possible while avoiding dangerous spikes.',
        icon: <Gamepad2 className="w-10 h-10" />,
        tags: ['Game', 'Frontend', 'Canvas', 'Physics']
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
    const { theme, resolvedMode } = useTheme();

    return (
        <section id="projects" className={`py-24 px-6 relative z-10 ${resolvedMode === 'dark' ? 'bg-slate-900/30' : 'bg-slate-100/50'}`}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${resolvedMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>Projects</h2>
                    <p className={`${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Recent work and personal applications.</p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projectsData.map((project) => (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className={`block p-8 rounded-2xl border hover:border-${theme.tailwind}-500/30 group backdrop-blur-sm transition-all relative overflow-hidden ${resolvedMode === 'dark' ? 'bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-white/5' : 'bg-gradient-to-br from-white/60 to-slate-50/60 border-slate-200 hover:shadow-lg hover:shadow-slate-200/50'}`}
                        >
                            <div className={`absolute top-4 right-4 group-hover:text-${theme.tailwind}-500 transition-colors ${resolvedMode === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                                <ExternalLink className="w-5 h-5" />
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-3 rounded-xl group-hover:text-${theme.tailwind}-500 transition-colors ${resolvedMode === 'dark' ? 'bg-slate-800/50 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                    {/* Clone element to add dynamic classes to the icon */}
                                    {React.cloneElement(project.icon as any, { className: `w-10 h-10 group-hover:text-${theme.tailwind}-500 transition-colors` })}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold mb-1 group-hover:text-${theme.tailwind}-500 transition-colors ${resolvedMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                                    <p className={`text-sm ${resolvedMode === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>Web Application</p>
                                </div>
                            </div>

                            <p className={`mb-6 leading-relaxed ${resolvedMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span key={tag} className={`text-xs px-2 py-1 rounded border ${resolvedMode === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700/50' : 'bg-white text-slate-600 border-slate-200'}`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
