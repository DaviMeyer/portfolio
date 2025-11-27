'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const { theme } = useTheme();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-${theme.tailwind}-500 via-${theme.secondary}-500 to-${theme.tailwind}-600 origin-left z-50`}
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
