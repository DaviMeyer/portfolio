import React from 'react';
import {
    Code2,
    Terminal,
    Gamepad2,
    Music,
    Dumbbell,
    Mountain,
    Monitor,
    Layers,
} from 'lucide-react';
import { TimelineItem, HobbyItem } from '@/types';

export const timelineData: TimelineItem[] = [
    {
        id: 1,
        year: '2025 - Present',
        title: 'Software Engineer (Frontend Focus)',
        place: 'SIX Group',
        description: 'Working in a specialized department with a strong focus on modern frontend technologies, User Experience (UX), and complex web applications.',
        icon: React.createElement(Monitor, { className: "w-6 h-6 text-orange-400" }),
        tags: ['React', 'TypeScript', 'Frontend', 'SIX']
    },
    {
        id: 2,
        year: '2023 - 2024',
        title: 'IT-Lab Assignment',
        place: 'SIX Group',
        description: 'Intensive practical year in the Innovation Lab. Developed internal tools, prototyping, and deepened knowledge in agile methodologies (Scrum).',
        icon: React.createElement(Terminal, { className: "w-6 h-6 text-amber-400" }),
        tags: ['Innovation', 'Fullstack', 'Agile', 'Prototyping']
    },
    {
        id: 3,
        year: '2022 - 2023',
        title: 'Apprenticeship Basic Training',
        place: 'BBC (Berufsbildungscenter)',
        description: 'Solid foundation in software engineering. Covered C#, database management, web basics, and Clean Code principles.',
        icon: React.createElement(Code2, { className: "w-6 h-6 text-red-400" }),
        tags: ['C#', 'SQL', 'Basics', 'Education']
    },
    {
        id: 4,
        year: '2019 - 2022',
        title: 'Secondary School',
        place: 'Level A',
        description: 'Successfully completed secondary education with a focus on natural sciences and mathematics.',
        icon: React.createElement(Layers, { className: "w-6 h-6 text-slate-400" }),
        tags: ['School', 'Math', 'Logic']
    }
];

export const hobbiesData: HobbyItem[] = [
    { id: 1, name: 'Piano', desc: 'Classical & Modern', icon: React.createElement(Music, { className: "w-10 h-10" }) },
    { id: 2, name: 'Gym', desc: 'Fitness & Discipline', icon: React.createElement(Dumbbell, { className: "w-10 h-10" }) },
    { id: 3, name: 'Hiking', desc: 'Nature & Endurance', icon: React.createElement(Mountain, { className: "w-10 h-10" }) },
    { id: 4, name: 'Gaming', desc: 'Strategy & Fun', icon: React.createElement(Gamepad2, { className: "w-10 h-10" }) },
];
