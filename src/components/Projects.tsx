'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Train } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
    const { theme } = useTheme();

    return (
        <section id="projects" className="py-24 px-6 bg-slate-900/30 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Projects</h2>
                    <p className="text-slate-400">Recent work and personal applications.</p>
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
                            className={`block p-8 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/5 hover:border-${theme.tailwind}-500/30 group backdrop-blur-sm transition-all relative overflow-hidden`}
                        >
                            <div className={`absolute top-4 right-4 text-slate-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-${theme.tailwind}-400 group-hover:to-${theme.secondary}-400 transition-colors`}>
                                <ExternalLink className="w-5 h-5" />
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-slate-800/50 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-${theme.tailwind}-400 group-hover:to-${theme.secondary}-400 transition-colors`}>
                                    {/* Clone element to add dynamic classes to the icon */}
                                    {React.cloneElement(project.icon as any, { className: `w-10 h-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-${theme.tailwind}-400 group-hover:to-${theme.secondary}-400 transition-colors` })}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-${theme.tailwind}-400 group-hover:to-${theme.secondary}-400 transition-colors`}>{project.title}</h3>
                                    <p className="text-sm text-slate-500">Web Application</p>
                                </div>
                            </div>

                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
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
