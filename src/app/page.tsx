import React from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Hobbies from '@/components/Hobbies';
import Footer from '@/components/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen text-slate-200 selection:bg-orange-500/30 selection:text-orange-200 font-sans">
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Hobbies />
      </main>
      <Footer />
    </div>
  );
}
