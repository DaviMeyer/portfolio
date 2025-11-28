'use client';

import React, { useState } from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleBackground, { EffectType } from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Hobbies from '@/components/Hobbies';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ThemeSafelist from '@/components/ThemeSafelist';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

const PortfolioContent = () => {
  const [currentEffect, setCurrentEffect] = useState<EffectType>('magnetic-field');
  const { theme, resolvedMode } = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${resolvedMode === 'dark' ? 'text-slate-200' : 'text-slate-900'} selection:bg-${theme.tailwind}-500/30 selection:text-${theme.tailwind}-500`}>
      <ThemeSafelist />
      <ScrollProgress />
      <ParticleBackground effect={currentEffect} />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Projects />
        <Hobbies />
      </main>
      <Footer />
      <ThemeSwitcher current={currentEffect} onChange={setCurrentEffect} />
    </div>
  );
};

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
