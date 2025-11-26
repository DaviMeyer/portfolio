'use client';

import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        // Grid Configuration
        const gap = 30; // Grid spacing
        const mouseRadius = 200; // Interaction radius
        const physicsSpeed = 0.15; // How fast points move to target (0-1)

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = 2.5;
            }

            draw() {
                if (!ctx) return;

                // Distance check for color and size
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Base color
                let colorString = 'rgba(148, 163, 184, 0.3)'; // Slate-400 very subtle
                let currentSize = this.size;

                // Dynamic effects near mouse
                if (distance < mouseRadius) {
                    const intensity = 1 - (distance / mouseRadius);
                    // Orange-500 (rgb(249, 115, 22)) with dynamic opacity
                    colorString = `rgba(249, 115, 22, ${0.4 + intensity * 0.6})`;
                    // Scale up slightly near mouse
                    currentSize = this.size + (intensity * 2.5);
                }

                ctx.fillStyle = colorString;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                const dx = mouseRef.current.x - this.baseX;
                const dy = mouseRef.current.y - this.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let targetX = this.baseX;
                let targetY = this.baseY;

                // Physics: Smooth Repulsion keeping grid structure
                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);

                    // Move point away from mouse based on angle and force
                    const moveDistance = force * 60; // Max displacement in pixels

                    targetX -= Math.cos(angle) * moveDistance;
                    targetY -= Math.sin(angle) * moveDistance;
                }

                // Lerp (Linear Interpolation) for smooth movement
                this.x += (targetX - this.x) * physicsSpeed;
                this.y += (targetY - this.y) * physicsSpeed;
            }
        }

        const init = () => {
            if (!canvas || !containerRef.current) return;
            canvas.width = containerRef.current.clientWidth;
            canvas.height = containerRef.current.clientHeight;

            particles = [];
            // Create Grid
            for (let y = 0; y < canvas.height; y += gap) {
                for (let x = 0; x < canvas.width; x += gap) {
                    particles.push(new Particle(x, y));
                }
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => init();
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-950/90 pointer-events-none z-0"></div>
            <canvas ref={canvasRef} className="block w-full h-full z-10" />
        </div>
    );
};

export default ParticleBackground;
