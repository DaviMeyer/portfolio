'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export type EffectType =
    | 'off'
    | 'liquid-flow'
    | 'galaxy-swirl'
    | 'dna-waves'
    | 'quantum-field'
    | 'magnetic-field'
    | 'gravity-well'
    | 'aurora-beams'
    | 'fire-flies';

interface ParticleBackgroundProps {
    effect: EffectType;
}

const ParticleBackground = ({ effect }: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMouseMoveRef = useRef(0);
    const autoMouseRef = useRef({ x: 0, y: 0 });
    const { theme, resolvedMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        let width = containerRef.current.clientWidth;
        let height = containerRef.current.clientHeight;

        autoMouseRef.current = { x: width / 2, y: height / 2 };

        // Helper to get current theme color in HSL format for canvas
        const getThemeColor = (opacity = 1) => {
            return `hsl(${theme.primary} / ${opacity})`;
        };

        // --- Init Logic ---

        const initLiquidFlow = () => {
            particles = [];
            for (let i = 0; i < 600; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    history: [],
                    maxLength: Math.random() * 20 + 10,
                    age: Math.random() * 100,
                    lifeSpan: Math.random() * 200 + 100,
                    vx: 0, vy: 0
                });
            }
        };

        const initGalaxySwirl = () => {
            particles = [];
            for (let i = 0; i < 300; i++) {
                particles.push({
                    angle: Math.random() * Math.PI * 2,
                    radius: Math.random() * (Math.min(width, height) / 2),
                    speed: (Math.random() * 0.02) + 0.005,
                    size: Math.random() * 2 + 0.5
                });
            }
        };

        const initDnaWaves = () => {
            particles = [];
            for (let i = 0; i < width; i += 10) {
                particles.push({ x: i, y: height / 2, offset: i * 0.02 });
            }
        };

        const initQuantumField = () => {
            particles = [];
            const gap = 40;
            for (let x = 0; x < width; x += gap) {
                for (let y = 0; y < height; y += gap) {
                    particles.push({
                        x, y,
                        baseX: x, baseY: y,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        };

        const initMagneticField = () => {
            const gap = 30;
            particles = [];
            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    particles.push({ x, y, angle: 0 });
                }
            }
        };

        const initGravityWell = () => {
            particles = [];
            for (let i = 0; i < 200; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 3 + 1
                });
            }
        };

        const initAuroraBeams = () => {
            particles = [];
            for (let i = 0; i < 3; i++) {
                particles.push({
                    yBase: height * 0.6 + (i * 50),
                    amplitude: 100 + Math.random() * 50,
                    frequency: 0.002 + Math.random() * 0.001,
                    speed: 0.0002 + Math.random() * 0.0004,
                    offset: Math.random() * 1000,
                    color: i === 0 ? getThemeColor(0.4) : getThemeColor(0.2)
                });
            }
        };

        const initFireFlies = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 2,
                    opacity: Math.random(),
                    pulseSpeed: Math.random() * 0.05 + 0.01
                });
            }
        };

        const init = () => {
            canvas.width = width;
            canvas.height = height;

            switch (effect) {
                case 'liquid-flow': initLiquidFlow(); break;
                case 'galaxy-swirl': initGalaxySwirl(); break;
                case 'dna-waves': initDnaWaves(); break;
                case 'quantum-field': initQuantumField(); break;
                case 'magnetic-field': initMagneticField(); break;
                case 'gravity-well': initGravityWell(); break;
                case 'aurora-beams': initAuroraBeams(); break;
                case 'fire-flies': initFireFlies(); break;
                case 'off': particles = []; break;
            }
        };

        const getTargetPosition = () => {
            const now = Date.now();
            const timeSinceMove = now - lastMouseMoveRef.current;
            if (timeSinceMove > 2500) {
                const t = now * 0.0005;
                autoMouseRef.current.x = (width / 2) + Math.sin(t) * (width * 0.35);
                autoMouseRef.current.y = (height / 2) + Math.cos(t * 0.5) * (height * 0.2);
                return autoMouseRef.current;
            }
            return mouseRef.current;
        };

        // --- Draw Logic ---

        // Define background clear color based on mode
        const clearColor = resolvedMode === 'dark' ? 'rgba(2, 6, 23, 0.1)' : 'rgba(248, 250, 252, 0.15)';
        const particleBaseAlpha = resolvedMode === 'dark' ? 0.5 : 0.8;

        const drawLiquidFlow = () => {
            const target = getTargetPosition();
            ctx.fillStyle = clearColor;
            ctx.fillRect(0, 0, width, height);
            const noise = (x: number, y: number) => Math.sin(x * 0.005) + Math.cos(y * 0.005);

            particles.forEach(p => {
                p.age++;
                if (p.age > p.lifeSpan || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                    p.x = Math.random() * width;
                    p.y = Math.random() * height;
                    p.history = [];
                    p.age = 0;
                }
                const angle = noise(p.x, p.y) * Math.PI * 4;
                const dx = p.x - target.x;
                const dy = p.y - target.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const repAngle = Math.atan2(dy, dx);
                    p.vx += Math.cos(repAngle) * 0.5;
                    p.vy += Math.sin(repAngle) * 0.5;
                } else {
                    p.vx += Math.cos(angle) * 0.1;
                    p.vy += Math.sin(angle) * 0.1;
                }
                p.vx *= 0.9; p.vy *= 0.9;
                p.x += p.vx * 2; p.y += p.vy * 2;

                p.history.push({ x: p.x, y: p.y });
                if (p.history.length > p.maxLength) p.history.shift();

                if (p.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.history[0].x, p.history[0].y);
                    for (let i = 1; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y);
                    ctx.strokeStyle = getThemeColor(particleBaseAlpha);
                    ctx.stroke();
                }
            });
        };

        const drawGalaxySwirl = () => {
            const target = getTargetPosition();
            // Slightly more opaque clear for galaxy to reduce trailing mess
            ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(2, 6, 23, 0.2)' : 'rgba(248, 250, 252, 0.2)';
            ctx.fillRect(0, 0, width, height);
            const cx = width / 2;
            const cy = height / 2;
            const targetCx = cx + (target.x - cx) * 0.1;
            const targetCy = cy + (target.y - cy) * 0.1;

            particles.forEach(p => {
                p.angle += p.speed;
                const x = targetCx + Math.cos(p.angle) * p.radius;
                const y = targetCy + Math.sin(p.angle) * p.radius;
                const alpha = 0.8 - (p.radius / Math.min(width, height));
                ctx.fillStyle = getThemeColor(alpha);
                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const drawDnaWaves = () => {
            ctx.clearRect(0, 0, width, height);
            const target = getTargetPosition();
            const t = Date.now() * 0.001;
            const strands = 2;
            const amplitude = 50;

            for (let s = 0; s < strands; s++) {
                particles.forEach((p, i) => {
                    const waveY = Math.sin(p.offset + t + (s * Math.PI)) * amplitude;
                    const x = p.x;
                    const y = p.y + waveY;
                    const dx = x - target.x;
                    const dy = y - target.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    let size = 2;

                    if (dist < 100) {
                        size = 5;
                        ctx.fillStyle = resolvedMode === 'dark' ? '#fff' : '#000';
                    } else {
                        ctx.fillStyle = s === 0 ? getThemeColor() : getThemeColor(0.5);
                    }
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();

                    if (s === 0 && particles[i]) {
                        const y2 = p.y + Math.sin(p.offset + t + Math.PI) * amplitude;
                        ctx.beginPath();
                        ctx.strokeStyle = resolvedMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y2);
                        ctx.stroke();
                    }
                });
            }
        };

        const drawQuantumField = () => {
            const target = getTargetPosition();
            ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(2, 6, 23, 0.2)' : 'rgba(248, 250, 252, 0.2)';
            ctx.fillRect(0, 0, width, height);
            const t = Date.now() * 0.002;

            particles.forEach(p => {
                const distMouse = Math.sqrt((p.baseX - target.x) ** 2 + (p.baseY - target.y) ** 2);
                const mouseInfluence = Math.max(0, (300 - distMouse) / 300);
                const offset = Math.sin(p.phase + t) * 10 + (Math.random() - 0.5) * 5;
                const activeOffset = offset + (Math.random() * 20 * mouseInfluence);
                const x = p.baseX + activeOffset;
                const y = p.baseY + activeOffset;
                const size = (mouseInfluence * 3) + 1;
                const color = mouseInfluence > 0.5 ? (resolvedMode === 'dark' ? '#fff' : '#000') : getThemeColor();
                ctx.fillStyle = color;
                ctx.fillRect(x, y, size, size);
            });
        };

        const drawMagneticField = () => {
            const target = getTargetPosition();
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                const dx = target.x - p.x;
                const dy = target.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const targetAngle = Math.atan2(dy, dx);
                let activeAngle = targetAngle;
                let length = 10;
                let color = resolvedMode === 'dark' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(71, 85, 105, 0.2)';

                if (dist < 300) {
                    const influence = 1 - (dist / 300);
                    length = 10 + (influence * 15);
                    color = getThemeColor(0.3 + influence * 0.7);
                } else {
                    activeAngle = Math.PI / 4;
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(activeAngle);
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-length / 2, 0);
                ctx.lineTo(length / 2, 0);
                ctx.stroke();
                ctx.restore();
            });
        };

        const drawGravityWell = () => {
            const target = getTargetPosition();
            ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(2, 6, 23, 0.2)' : 'rgba(248, 250, 252, 0.2)';
            ctx.fillRect(0, 0, width, height);
            particles.forEach(p => {
                const dx = target.x - p.x;
                const dy = target.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 5) {
                    const force = 500 / (dist * dist);
                    const angle = Math.atan2(dy, dx);
                    const clampedForce = Math.min(force, 0.5);
                    p.vx += Math.cos(angle) * clampedForce;
                    p.vy += Math.sin(angle) * clampedForce;
                }
                p.vx *= 0.99; p.vy *= 0.99;
                p.x += p.vx; p.y += p.vy;
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const color = speed > 3 ? (resolvedMode === 'dark' ? '#fff' : '#000') : getThemeColor();
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const drawAuroraBeams = () => {
            ctx.clearRect(0, 0, width, height);
            const t = Date.now() * 1;

            // In light mode, 'lighter' composite mode doesn't show up on white bg
            if (resolvedMode === 'dark') {
                ctx.globalCompositeOperation = 'lighter';
            }

            particles.forEach(p => {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 10) {
                    const sine1 = Math.sin(x * p.frequency + t * p.speed + p.offset);
                    const sine2 = Math.sin(x * p.frequency * 2 + t * p.speed * 1.5);
                    const y = p.yBase + (sine1 + sine2) * p.amplitude;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.lineTo(width, 0);
                ctx.lineTo(0, 0);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, height / 2, 0, 0);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(0.5, p.color.replace('0.4', '0.1').replace('0.2', '0.05'));
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = gradient;
                ctx.fill();
            });

            ctx.globalCompositeOperation = 'source-over';
        };

        const drawFireFlies = () => {
            const target = getTargetPosition();
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;
                p.vx = Math.max(-1, Math.min(1, p.vx));
                p.vy = Math.max(-1, Math.min(1, p.vy));
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                p.opacity += p.pulseSpeed;
                const alpha = (Math.sin(p.opacity) + 1) / 2 * 0.8 + 0.2;
                const dx = target.x - p.x;
                const dy = target.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                }
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                gradient.addColorStop(0, getThemeColor(alpha));
                gradient.addColorStop(1, getThemeColor(0));
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const animate = () => {
            if (!canvas || !ctx) return;

            if (effect === 'off') {
                ctx.clearRect(0, 0, width, height);
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            switch (effect) {
                case 'liquid-flow': drawLiquidFlow(); break;
                case 'galaxy-swirl': drawGalaxySwirl(); break;
                case 'dna-waves': drawDnaWaves(); break;
                case 'quantum-field': drawQuantumField(); break;
                case 'magnetic-field': drawMagneticField(); break;
                case 'gravity-well': drawGravityWell(); break;
                case 'aurora-beams': drawAuroraBeams(); break;
                case 'fire-flies': drawFireFlies(); break;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = containerRef.current!.clientWidth;
            height = containerRef.current!.clientHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            lastMouseMoveRef.current = Date.now();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [effect, theme, resolvedMode]);

    return (
        <div ref={containerRef} className={`fixed inset-0 z-[-1] transition-colors duration-500 ${resolvedMode === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <div className={`absolute inset-0 bg-gradient-to-b ${resolvedMode === 'dark' ? 'from-slate-950/20 via-slate-900/20 to-slate-950/20' : 'from-slate-50/50 via-white/50 to-slate-50/50'} pointer-events-none z-0`}></div>
            <canvas ref={canvasRef} className="block w-full h-full z-10" />
        </div>
    );
};

export default ParticleBackground;
