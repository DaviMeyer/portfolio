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

export default function Portfolio() {
  const [currentEffect, setCurrentEffect] = useState<EffectType>('magnetic-field');

  return (
    <div className="min-h-screen text-slate-200 selection:bg-orange-500/30 selection:text-orange-200 font-sans">
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
}
