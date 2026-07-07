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
    | 'fire-flies'
    | 'milky-way'
    | 'chladni-resonance'
    | 'ferrofluid-peaks'
    | 'mycelium-growth'
    | 'turing-patterns'
    | 'strange-attractor';

interface ParticleBackgroundProps {
    effect: EffectType;
}

const ParticleBackground = ({ effect }: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMouseMoveRef = useRef(0);
    const autoMouseRef = useRef({ x: 0, y: 0 });
    const scrollYRef = useRef(0);
    const { theme, resolvedMode } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let particles: any[] = [];
        let width = containerRef.current.clientWidth;
        let height = containerRef.current.clientHeight;
        autoMouseRef.current = { x: width / 2, y: height / 2 };

        // Always read from CSS variable — works for static and Prismatic animated themes
        const tc = (opacity = 1) => {
            const p = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || theme.primary;
            return `hsl(${p} / ${opacity})`;
        };

        // HSL → [r,g,b] 0-255 for ImageData rendering
        const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
            s /= 100; l /= 100;
            const k = (n: number) => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
        };

        const getPrimRgb = (): [number, number, number] => {
            const p = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim() || theme.primary;
            const [h, s, l] = p.split(' ').map(parseFloat);
            return hslToRgb(h, s, l);
        };

        // ── Inits ────────────────────────────────────────────────────────────

        const initLiquidFlow = () => {
            particles = Array.from({ length: 600 }, () => ({
                x: Math.random() * width, y: Math.random() * height,
                history: [], maxLength: Math.random() * 20 + 10,
                age: Math.random() * 100, lifeSpan: Math.random() * 200 + 100,
                vx: 0, vy: 0,
            }));
        };
        const initGalaxySwirl = () => {
            particles = Array.from({ length: 300 }, () => ({
                angle: Math.random() * Math.PI * 2,
                radius: Math.random() * Math.min(width, height) / 2,
                speed: Math.random() * 0.02 + 0.005,
                size: Math.random() * 2 + 0.5,
            }));
        };
        const initDnaWaves = () => {
            particles = [];
            for (let i = 0; i < width; i += 10) particles.push({ x: i, y: height / 2, offset: i * 0.02 });
        };
        const initQuantumField = () => {
            particles = [];
            for (let x = 0; x < width; x += 40) for (let y = 0; y < height; y += 40)
                particles.push({ x, y, baseX: x, baseY: y, phase: Math.random() * Math.PI * 2 });
        };
        const initMagneticField = () => {
            particles = [];
            for (let y = 0; y < height; y += 30) for (let x = 0; x < width; x += 30)
                particles.push({ x, y });
        };
        const initGravityWell = () => {
            particles = Array.from({ length: 200 }, () => ({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
            }));
        };
        const initAuroraBeams = () => {
            particles = Array.from({ length: 3 }, (_, i) => ({
                yBase: height * 0.6 + i * 50, amplitude: 100 + Math.random() * 50,
                frequency: 0.002 + Math.random() * 0.001, speed: 0.0002 + Math.random() * 0.0004,
                offset: Math.random() * 1000, baseAlpha: i === 0 ? 0.4 : 0.2,
            }));
        };
        const initFireFlies = () => {
            particles = Array.from({ length: 50 }, () => ({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2, opacity: Math.random(),
                pulseSpeed: Math.random() * 0.05 + 0.01,
            }));
        };

        // ── Milky Way ────────────────────────────────────────────────────────
        const initMilkyWay = () => {
            const bandAngle = Math.PI * 0.19;
            const stars: any[] = [];

            // Background stars
            for (let i = 0; i < 850; i++) stars.push({
                x: Math.random() * width, y: Math.random() * height,
                size: Math.random() * 0.8 + 0.15,
                opacity: Math.random() * 0.55 + 0.1,
                tw: Math.random() * Math.PI * 2, twS: Math.random() * 0.02 + 0.004,
                layer: 0,
            });

            // Galactic band stars (concentrated along a diagonal strip)
            for (let i = 0; i < 550; i++) {
                const along = (Math.random() - 0.5) * Math.max(width, height) * 1.5;
                const spread = Math.pow(Math.random(), 1.5) * height * 0.28;
                const across = (Math.random() < 0.5 ? 1 : -1) * spread;
                stars.push({
                    x: width * 0.5 + Math.cos(bandAngle) * along - Math.sin(bandAngle) * across,
                    y: height * 0.5 + Math.sin(bandAngle) * along + Math.cos(bandAngle) * across,
                    size: Math.random() * 1.4 + 0.25,
                    opacity: Math.random() * 0.65 + 0.2,
                    tw: Math.random() * Math.PI * 2, twS: Math.random() * 0.025 + 0.006,
                    layer: 1,
                });
            }

            // Foreground bright stars with diffraction spikes
            for (let i = 0; i < 70; i++) stars.push({
                x: Math.random() * width, y: Math.random() * height,
                size: Math.random() * 2.2 + 1.0,
                opacity: Math.random() * 0.45 + 0.55,
                tw: Math.random() * Math.PI * 2, twS: Math.random() * 0.012 + 0.003,
                layer: 2,
            });

            // Nebula patches along band
            const nebulae = Array.from({ length: 6 }, (_, i) => {
                const along = (i / 5 - 0.5) * Math.max(width, height) * 1.1;
                return {
                    x: width * 0.5 + Math.cos(bandAngle) * along,
                    y: height * 0.5 + Math.sin(bandAngle) * along,
                    r: Math.random() * 90 + 55,
                };
            });

            particles = [{ stars, nebulae, bandAngle, autoAngle: 0 }];
        };

        // ── Chladni ──────────────────────────────────────────────────────────
        const initChladniResonance = () => {
            const seq = [[1,2],[2,1],[2,3],[3,2],[1,4],[4,1],[3,4],[4,3],[2,5],[5,2],[3,5],[5,3]];
            particles = [{ time: 0, idx: 0, morphT: 0, seq }];
        };

        // ── Ferrofluid ───────────────────────────────────────────────────────
        const initFerrofluidPeaks = () => {
            const hS = 60, vS = 52;
            const peaks: any[] = [];
            for (let row = -1; row * vS < height + vS; row++)
                for (let col = -1; col * hS < width + hS; col++) {
                    const off = row % 2 === 0 ? 0 : hS / 2;
                    peaks.push({ x: col * hS + off, y: row * vS, h: 0, phase: Math.random() * Math.PI * 2 });
                }
            particles = peaks;
        };

        // ── Mycelium ─────────────────────────────────────────────────────────
        const initMyceliumGrowth = () => {
            const seeds: any[] = [];
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2;
                const r = Math.min(width, height) * 0.1;
                seeds.push({ x: width / 2 + Math.cos(a) * r, y: height / 2 + Math.sin(a) * r });
            }
            const branches: any[] = [];
            seeds.forEach(s => {
                const baseA = Math.atan2(s.y - height / 2, s.x - width / 2);
                for (let b = 0; b < 3; b++) {
                    branches.push({
                        pts: [{ x: s.x, y: s.y }],
                        angle: baseA + (b - 1) * Math.PI * 0.38,
                        growing: true, age: 0, gen: 0,
                        maxLen: Math.floor(Math.random() * 110 + 110),
                        forkAt: Math.floor(Math.random() * 28 + 20),
                        forked: false, noise: 0,
                    });
                }
            });
            particles = [{ seeds, branches, pulseT: 0, done: false }];
        };

        // ── Turing ───────────────────────────────────────────────────────────
        const initTuringPatterns = () => {
            const cell = 8;
            const cols = Math.ceil(width / cell), rows = Math.ceil(height / cell);
            const U = new Float32Array(cols * rows).fill(1);
            const V = new Float32Array(cols * rows);
            const nU = new Float32Array(cols * rows), nV = new Float32Array(cols * rows);
            for (let s = 0; s < 25; s++) {
                const cx = Math.floor(Math.random() * cols), cy = Math.floor(Math.random() * rows);
                for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
                    const gx = cx + dx, gy = cy + dy;
                    if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
                    V[gy * cols + gx] = 1; U[gy * cols + gx] = 0;
                }
            }
            particles = [{ U, V, nU, nV, cols, rows, cell, imgData: ctx.createImageData(width, height) }];
        };

        // ── Strange Attractor ────────────────────────────────────────────────
        // Clifford attractor. Every preset below is numerically verified to stay a
        // rich, space-filling attractor — incl. under the ±0.09 breathing wiggle on
        // c/d (no fixed-point or periodic-window collapse). Transitions CROSSFADE
        // between two complete attractors instead of lerping a/b: linear parameter
        // paths inevitably pass through degenerate regimes (the old version
        // shrank to a dot because of this — 3 of its presets even WERE fixed points).
        const CLIFFORD_PRESETS = [
            [1.7, 1.7, 0.6, 1.2],
            [-2.0, -2.0, -1.2, 2.0],
            [2.0, -2.0, -0.5, -0.9],
            [-1.4, 1.6, 1.0, 0.7],
            [-2.0, 2.0, 0.8, -1.4],
            [1.9, -1.9, -0.5, -0.9],
        ];
        const seedAttractor = (idx: number) => {
            const [a, b, c, d] = CLIFFORD_PRESETS[idx];
            // Warm up the orbit and measure its real extent so the very first frame
            // is already scaled to fill the screen (no initial pop/zoom).
            let x = 0.1, y = 0, minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
            for (let i = 0; i < 1500; i++) {
                const nx = Math.sin(a * y) + c * Math.cos(a * x);
                const ny = Math.sin(b * x) + d * Math.cos(b * y);
                x = nx; y = ny;
                if (i < 100) continue;
                if (x < minX) minX = x; if (x > maxX) maxX = x;
                if (y < minY) minY = y; if (y > maxY) maxY = y;
            }
            return { a, b, c, d, x, y, minX, maxX, minY, maxY };
        };
        const initStrangeAttractor = () => {
            particles = [{
                frame: 0, idx: 0,
                hold: 660, fadeLen: 420,    // ~11s stable, ~7s crossfade (60fps)
                wait: 660, fade: -1,        // fade < 0 → holding
                cur: seedAttractor(0), nxt: null, nextIdx: 0,
            }];
        };

        const init = () => {
            canvas.width = width; canvas.height = height;
            switch (effect) {
                case 'liquid-flow':       initLiquidFlow(); break;
                case 'galaxy-swirl':      initGalaxySwirl(); break;
                case 'dna-waves':         initDnaWaves(); break;
                case 'quantum-field':     initQuantumField(); break;
                case 'magnetic-field':    initMagneticField(); break;
                case 'gravity-well':      initGravityWell(); break;
                case 'aurora-beams':      initAuroraBeams(); break;
                case 'fire-flies':        initFireFlies(); break;
                case 'milky-way':         initMilkyWay(); break;
                case 'chladni-resonance': initChladniResonance(); break;
                case 'ferrofluid-peaks':  initFerrofluidPeaks(); break;
                case 'mycelium-growth':   initMyceliumGrowth(); break;
                case 'turing-patterns':   initTuringPatterns(); break;
                case 'strange-attractor': initStrangeAttractor(); break;
                case 'off': particles = []; break;
            }
        };

        const target = () => {
            const now = Date.now();
            if (now - lastMouseMoveRef.current > 2500) {
                const t = now * 0.0005;
                autoMouseRef.current.x = width / 2 + Math.sin(t) * width * 0.35;
                autoMouseRef.current.y = height / 2 + Math.cos(t * 0.5) * height * 0.2;
                return autoMouseRef.current;
            }
            return mouseRef.current;
        };

        // ── Draw: Original effects ────────────────────────────────────────────

        const clear = resolvedMode === 'dark' ? 'rgba(2,6,23,0.1)' : 'rgba(248,250,252,0.15)';
        const baseAlpha = resolvedMode === 'dark' ? 0.5 : 0.8;

        const drawLiquidFlow = () => {
            const t = target(); ctx.fillStyle = clear; ctx.fillRect(0, 0, width, height);
            const noise = (x: number, y: number) => Math.sin(x * 0.005) + Math.cos(y * 0.005);
            particles.forEach(p => {
                p.age++;
                if (p.age > p.lifeSpan || p.x < 0 || p.x > width || p.y < 0 || p.y > height)
                    { p.x = Math.random() * width; p.y = Math.random() * height; p.history = []; p.age = 0; }
                const angle = noise(p.x, p.y) * Math.PI * 4;
                const dx = p.x - t.x, dy = p.y - t.y, d = Math.sqrt(dx*dx+dy*dy);
                if (d < 150) { const ra = Math.atan2(dy, dx); p.vx += Math.cos(ra)*0.5; p.vy += Math.sin(ra)*0.5; }
                else { p.vx += Math.cos(angle)*0.1; p.vy += Math.sin(angle)*0.1; }
                p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx*2; p.y += p.vy*2;
                p.history.push({ x: p.x, y: p.y });
                if (p.history.length > p.maxLength) p.history.shift();
                if (p.history.length > 1) {
                    ctx.beginPath(); ctx.moveTo(p.history[0].x, p.history[0].y);
                    for (let i = 1; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y);
                    ctx.strokeStyle = tc(baseAlpha); ctx.stroke();
                }
            });
        };
        const drawGalaxySwirl = () => {
            const t = target();
            ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(2,6,23,0.2)' : 'rgba(248,250,252,0.2)';
            ctx.fillRect(0, 0, width, height);
            const cx = width/2, cy = height/2;
            const tcx = cx + (t.x-cx)*0.1, tcy = cy + (t.y-cy)*0.1;
            particles.forEach(p => {
                p.angle += p.speed;
                ctx.fillStyle = tc(0.8 - p.radius / Math.min(width, height));
                ctx.beginPath(); ctx.arc(tcx + Math.cos(p.angle)*p.radius, tcy + Math.sin(p.angle)*p.radius, p.size, 0, Math.PI*2); ctx.fill();
            });
        };
        const drawDnaWaves = () => {
            ctx.clearRect(0, 0, width, height);
            const t = target(), ts = Date.now()*0.001;
            for (let s = 0; s < 2; s++) particles.forEach((p, i) => {
                const y = p.y + Math.sin(p.offset + ts + s*Math.PI)*50;
                const d = Math.sqrt((p.x-t.x)**2 + (y-t.y)**2);
                ctx.fillStyle = d < 100 ? (resolvedMode==='dark'?'#fff':'#000') : (s===0?tc():tc(0.5));
                ctx.beginPath(); ctx.arc(p.x, y, d<100?5:2, 0, Math.PI*2); ctx.fill();
                if (s===0) {
                    const y2 = p.y + Math.sin(p.offset+ts+Math.PI)*50;
                    ctx.beginPath(); ctx.strokeStyle = resolvedMode==='dark'?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)';
                    ctx.moveTo(p.x,y); ctx.lineTo(p.x,y2); ctx.stroke();
                }
            });
        };
        const drawQuantumField = () => {
            const t = target();
            ctx.fillStyle = resolvedMode==='dark'?'rgba(2,6,23,0.2)':'rgba(248,250,252,0.2)';
            ctx.fillRect(0,0,width,height);
            const ts = Date.now()*0.002;
            particles.forEach(p => {
                const mi = Math.max(0,(300-Math.sqrt((p.baseX-t.x)**2+(p.baseY-t.y)**2))/300);
                const off = Math.sin(p.phase+ts)*10+(Math.random()-0.5)*5+Math.random()*20*mi;
                ctx.fillStyle = mi>0.5?(resolvedMode==='dark'?'#fff':'#000'):tc();
                ctx.fillRect(p.baseX+off, p.baseY+off, mi*3+1, mi*3+1);
            });
        };
        const drawMagneticField = () => {
            const t = target(); ctx.clearRect(0,0,width,height);
            particles.forEach(p => {
                const dx=t.x-p.x, dy=t.y-p.y, d=Math.sqrt(dx*dx+dy*dy);
                const inf = d<300?1-d/300:0; const len=10+inf*15;
                ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(d<300?Math.atan2(dy,dx):Math.PI/4);
                ctx.strokeStyle = inf>0?tc(0.3+inf*0.7):(resolvedMode==='dark'?'rgba(148,163,184,0.2)':'rgba(71,85,105,0.2)');
                ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-len/2,0); ctx.lineTo(len/2,0); ctx.stroke(); ctx.restore();
            });
        };
        const drawGravityWell = () => {
            const t = target();
            ctx.fillStyle=resolvedMode==='dark'?'rgba(2,6,23,0.2)':'rgba(248,250,252,0.2)';
            ctx.fillRect(0,0,width,height);
            particles.forEach(p => {
                const dx=t.x-p.x, dy=t.y-p.y, d=Math.sqrt(dx*dx+dy*dy);
                if(d>5){const f=Math.min(500/(d*d),0.5),a=Math.atan2(dy,dx);p.vx+=Math.cos(a)*f;p.vy+=Math.sin(a)*f;}
                p.vx*=0.99;p.vy*=0.99;p.x+=p.vx;p.y+=p.vy;
                ctx.fillStyle=Math.sqrt(p.vx*p.vx+p.vy*p.vy)>3?(resolvedMode==='dark'?'#fff':'#000'):tc();
                ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
            });
        };
        const drawAuroraBeams = () => {
            ctx.clearRect(0,0,width,height); const ts=Date.now();
            if(resolvedMode==='dark') ctx.globalCompositeOperation='lighter';
            particles.forEach(p => {
                ctx.beginPath();
                for(let x=0;x<=width;x+=10){
                    const y=p.yBase+(Math.sin(x*p.frequency+ts*p.speed+p.offset)+Math.sin(x*p.frequency*2+ts*p.speed*1.5))*p.amplitude;
                    x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
                }
                ctx.lineTo(width,0);ctx.lineTo(0,0);ctx.closePath();
                const g=ctx.createLinearGradient(0,height/2,0,0);
                g.addColorStop(0,tc(p.baseAlpha));g.addColorStop(0.5,tc(p.baseAlpha*0.25));g.addColorStop(1,'rgba(0,0,0,0)');
                ctx.fillStyle=g;ctx.fill();
            });
            ctx.globalCompositeOperation='source-over';
        };
        const drawFireFlies = () => {
            const t=target();ctx.clearRect(0,0,width,height);
            particles.forEach(p=>{
                p.vx+=(Math.random()-0.5)*0.1;p.vy+=(Math.random()-0.5)*0.1;
                p.vx=Math.max(-1,Math.min(1,p.vx));p.vy=Math.max(-1,Math.min(1,p.vy));
                p.x+=p.vx;p.y+=p.vy;
                if(p.x<0)p.x=width;if(p.x>width)p.x=0;if(p.y<0)p.y=height;if(p.y>height)p.y=0;
                p.opacity+=p.pulseSpeed;
                const alpha=(Math.sin(p.opacity)+1)/2*0.8+0.2;
                const dx=t.x-p.x,dy=t.y-p.y;
                if(Math.sqrt(dx*dx+dy*dy)<200){p.x+=dx*0.01;p.y+=dy*0.01;}
                const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4);
                g.addColorStop(0,tc(alpha));g.addColorStop(1,tc(0));
                ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.size*4,0,Math.PI*2);ctx.fill();
                ctx.fillStyle=resolvedMode==='dark'?'rgba(255,255,255,0.8)':'rgba(0,0,0,0.5)';
                ctx.beginPath();ctx.arc(p.x,p.y,p.size*0.5,0,Math.PI*2);ctx.fill();
            });
        };

        // ── Draw: Signature FX ────────────────────────────────────────────────

        const drawMilkyWay = () => {
            const s = particles[0];
            const scrollOff = scrollYRef.current * 0.18;
            const t = Date.now() * 0.001;
            s.autoAngle += 0.000055;

            const bg = resolvedMode === 'dark' ? '#010209' : '#dde4f0';
            ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);

            ctx.save();
            // Scroll shifts galaxy vertically; also adds a tiny parallax rotation
            ctx.translate(width / 2, height / 2 - scrollOff);
            ctx.rotate(s.autoAngle + scrollYRef.current * 0.00015);
            ctx.translate(-width / 2, -height / 2);

            // Galactic band glow (multiple softness layers)
            const bandLen = Math.max(width, height) * 1.6;
            for (let layer = 0; layer < 4; layer++) {
                const bh = (height * 0.22 - layer * 20);
                const alpha = resolvedMode === 'dark'
                    ? [0.09, 0.055, 0.035, 0.018][layer]
                    : [0.04, 0.025, 0.015, 0.007][layer];
                ctx.save();
                ctx.translate(width / 2, height / 2);
                ctx.rotate(s.bandAngle);
                const bg2 = ctx.createLinearGradient(0, -bh * 1.6, 0, bh * 1.6);
                const col = resolvedMode === 'dark'
                    ? `rgba(210,220,255,${alpha})`
                    : `rgba(80,100,160,${alpha})`;
                bg2.addColorStop(0, 'rgba(0,0,0,0)'); bg2.addColorStop(0.35, col);
                bg2.addColorStop(0.5, resolvedMode === 'dark' ? `rgba(240,235,255,${alpha * 2.2})` : `rgba(60,80,150,${alpha * 2})`);
                bg2.addColorStop(0.65, col); bg2.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = bg2;
                ctx.fillRect(-bandLen / 2, -bh * 1.6, bandLen, bh * 3.2);
                ctx.restore();
            }

            // Galactic core
            const coreDark = resolvedMode === 'dark';
            const coreG = ctx.createRadialGradient(width*.5, height*.5, 0, width*.5, height*.5, Math.min(width,height)*.32);
            coreG.addColorStop(0, coreDark ? 'rgba(255,240,190,0.38)' : 'rgba(220,200,140,0.18)');
            coreG.addColorStop(0.18, coreDark ? 'rgba(255,200,110,0.16)' : 'rgba(200,175,110,0.08)');
            coreG.addColorStop(0.45, tc(coreDark ? 0.07 : 0.04));
            coreG.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = coreG; ctx.fillRect(0, 0, width, height);

            // Nebulae (theme-colored glow patches)
            s.nebulae.forEach((n: any) => {
                const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
                ng.addColorStop(0, tc(resolvedMode === 'dark' ? 0.11 : 0.05));
                ng.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = ng;
                ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
            });

            // Stars
            s.stars.forEach((star: any) => {
                star.tw += star.twS;
                const tw = (Math.sin(star.tw) + 1) / 2;
                const alpha = star.opacity * (0.55 + tw * 0.45);

                if (star.layer === 2) {
                    // Bright with diffraction spike
                    const col = resolvedMode === 'dark' ? `rgba(255,255,255,${alpha})` : `rgba(20,30,80,${alpha})`;
                    ctx.fillStyle = col;
                    ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
                    if (alpha > 0.55) {
                        const spk = star.size * 3.5;
                        ctx.strokeStyle = resolvedMode === 'dark' ? `rgba(255,255,255,${alpha*0.38})` : `rgba(20,30,80,${alpha*0.28})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(star.x-spk,star.y); ctx.lineTo(star.x+spk,star.y); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(star.x,star.y-spk); ctx.lineTo(star.x,star.y+spk); ctx.stroke();
                    }
                } else if (star.layer === 1) {
                    ctx.fillStyle = resolvedMode === 'dark' ? `rgba(215,222,255,${alpha})` : `rgba(45,60,120,${alpha*0.6})`;
                    ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
                } else {
                    ctx.fillStyle = resolvedMode === 'dark' ? `rgba(195,208,255,${alpha*0.7})` : `rgba(60,75,130,${alpha*0.45})`;
                    ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
                }
            });

            ctx.restore();
        };

        const drawChladniResonance = () => {
            const s = particles[0];
            s.time += 0.012; s.morphT += 0.0035;
            if (s.morphT >= 1) { s.morphT = 0; s.idx = (s.idx + 1) % s.seq.length; }
            const [m1, n1] = s.seq[s.idx], [m2, n2] = s.seq[(s.idx + 1) % s.seq.length];
            ctx.clearRect(0, 0, width, height);

            // Draw background appropriate for mode
            if (resolvedMode === 'light') {
                ctx.fillStyle = 'rgb(245, 247, 252)'; ctx.fillRect(0, 0, width, height);
            }

            const step = 8, thr = 0.068 + 0.028 * Math.sin(s.time * 0.9);
            for (let x = 0; x <= width; x += step) for (let y = 0; y <= height; y += step) {
                const nx = x/width, ny = y/height;
                const z = Math.sin(m1*Math.PI*nx)*Math.sin(n1*Math.PI*ny)*(1-s.morphT)
                        + Math.sin(m2*Math.PI*nx)*Math.sin(n2*Math.PI*ny)*s.morphT;
                const absZ = Math.abs(z);
                if (absZ < thr) {
                    const pulse = 0.55 + 0.45 * Math.sin(s.time * 1.6);
                    ctx.fillStyle = tc((1 - absZ/thr) * pulse * (resolvedMode==='dark'?0.9:0.6));
                    ctx.fillRect(x, y, step, step);
                }
            }
        };

        const drawFerrofluidPeaks = () => {
            const t = target(), ts = Date.now() * 0.001;
            ctx.fillStyle = resolvedMode === 'dark' ? '#010308' : '#e8ecf4';
            ctx.fillRect(0, 0, width, height);

            // Iridescent surface shimmer
            for (let i = 0; i < 3; i++) {
                const hue = ((ts * 14 + i * 120) % 360).toFixed(1);
                const cx = width * (0.25 + i * 0.25) + Math.sin(ts * 0.18 + i * 2) * width * 0.12;
                const cy = height * 0.5 + Math.cos(ts * 0.13 + i) * height * 0.2;
                const ig = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width,height)*0.45);
                ig.addColorStop(0, `hsla(${hue}, 70%, 35%, 0.06)`);
                ig.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = ig; ctx.fillRect(0, 0, width, height);
            }

            // Sort peaks back-to-front
            const sorted = [...particles].sort((a, b) => a.y - b.y);
            sorted.forEach((p: any) => {
                const dx = t.x - p.x, dy = t.y - p.y, d = Math.sqrt(dx*dx+dy*dy);
                p.h += (Math.max(0, (1-d/250)*0.95 + Math.sin(ts*0.9+p.phase)*0.055) - p.h) * 0.08;
                if (p.h < 0.018) return;
                const sH = p.h * 90, bW = 17 + p.h * 11;
                const tipX = p.x + Math.sin(ts*0.32+p.phase)*p.h*3.5, tipY = p.y - sH;

                ctx.beginPath(); ctx.ellipse(p.x, p.y, bW*0.75, 5, 0, 0, Math.PI*2);
                ctx.fillStyle = resolvedMode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'; ctx.fill();

                const sg = ctx.createLinearGradient(p.x, p.y, tipX, tipY);
                sg.addColorStop(0, 'rgba(4,6,16,0.98)'); sg.addColorStop(0.45, 'rgba(7,10,22,0.95)');
                sg.addColorStop(0.78, tc(p.h*0.35)); sg.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.beginPath();
                ctx.moveTo(p.x-bW*0.5, p.y);
                ctx.quadraticCurveTo(tipX-bW*0.09, p.y-sH*0.52, tipX, tipY);
                ctx.quadraticCurveTo(tipX+bW*0.09, p.y-sH*0.52, p.x+bW*0.5, p.y);
                ctx.closePath(); ctx.fillStyle = sg; ctx.fill();

                if (p.h > 0.22) {
                    const hg = ctx.createLinearGradient(p.x-bW*0.35, p.y, tipX-1, tipY+sH*0.1);
                    hg.addColorStop(0, 'rgba(0,0,0,0)'); hg.addColorStop(0.4, tc(p.h*0.5));
                    hg.addColorStop(1, resolvedMode === 'dark' ? `rgba(255,255,255,${p.h*0.88})` : `rgba(30,35,55,${p.h*0.88})`);
                    ctx.beginPath(); ctx.moveTo(p.x-bW*0.35, p.y);
                    ctx.quadraticCurveTo(tipX-bW*0.06, p.y-sH*0.5, tipX-1, tipY);
                    ctx.lineWidth = 1.2; ctx.strokeStyle = hg; ctx.stroke();
                }
            });

            const mg = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 210);
            mg.addColorStop(0, tc(0.07)); mg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = mg; ctx.fillRect(0, 0, width, height);
        };

        const drawMyceliumGrowth = () => {
            const s = particles[0]; const t = target();
            ctx.clearRect(0, 0, width, height);

            // Light mode background
            if (resolvedMode === 'light') { ctx.fillStyle = 'rgb(245,248,255)'; ctx.fillRect(0,0,width,height); }

            s.pulseT += 0.016;
            if (!s.done) {
                let anyGrowing = false;
                s.branches.forEach((b: any) => {
                    if (!b.growing) return;
                    anyGrowing = true; b.age++;
                    const last = b.pts[b.pts.length - 1];
                    b.noise += (Math.random()-0.5)*0.11; b.noise *= 0.84; b.angle += b.noise;
                    const dx=t.x-last.x, dy=t.y-last.y, d=Math.sqrt(dx*dx+dy*dy);
                    if (d < 320) {
                        const toM = Math.atan2(dy,dx);
                        b.angle += Math.atan2(Math.sin(toM-b.angle),Math.cos(toM-b.angle))*(320-d)/320*0.009;
                    }
                    const nx=last.x+Math.cos(b.angle)*3.8, ny=last.y+Math.sin(b.angle)*3.8;
                    b.pts.push({x:nx,y:ny});
                    if (b.age===b.forkAt && !b.forked && b.gen<3 && s.branches.length<300) {
                        b.forked=true;
                        s.branches.push({ pts:[{x:nx,y:ny}], angle:b.angle+(Math.random()-0.5)*Math.PI*0.6,
                            growing:true,age:0,gen:b.gen+1,maxLen:Math.floor(b.maxLen*0.65),
                            forkAt:Math.floor(Math.random()*20+14),forked:false,noise:0 });
                    }
                    if (b.pts.length>=b.maxLen||nx<0||nx>width||ny<0||ny>height) b.growing=false;
                });
                if (!anyGrowing) s.done=true;
            }

            s.branches.forEach((b: any) => {
                if (b.pts.length<2) return;
                ctx.lineWidth=Math.max(0.3,1.4-b.gen*0.36); ctx.lineCap='round';
                ctx.strokeStyle=tc(resolvedMode==='dark'?0.3-b.gen*0.06:0.45-b.gen*0.08);
                ctx.beginPath(); ctx.moveTo(b.pts[0].x,b.pts[0].y);
                for(let i=1;i<b.pts.length;i++) ctx.lineTo(b.pts[i].x,b.pts[i].y);
                ctx.stroke();
            });

            const pf = s.pulseT%1;
            s.branches.forEach((b: any) => {
                if(b.pts.length<5) return;
                const idx=Math.floor(pf*b.pts.length); if(idx>=b.pts.length) return;
                const pt=b.pts[idx]; const g=(Math.sin(s.pulseT*3)+1)/2;
                ctx.beginPath(); ctx.arc(pt.x,pt.y,2,0,Math.PI*2);
                ctx.fillStyle=tc(0.7+g*0.3);
                ctx.shadowColor=tc(1); ctx.shadowBlur=8; ctx.fill(); ctx.shadowBlur=0;
            });
            s.seeds.forEach((seed: any) => {
                const g=(Math.sin(s.pulseT*2)+1)/2;
                ctx.beginPath(); ctx.arc(seed.x,seed.y,3+g*2,0,Math.PI*2);
                ctx.fillStyle=tc(0.7+g*0.3);
                ctx.shadowColor=tc(1); ctx.shadowBlur=14+g*10; ctx.fill(); ctx.shadowBlur=0;
            });
        };

        const drawTuringPatterns = () => {
            const s = particles[0];
            const { U, V, nU, nV, cols, rows, cell, imgData } = s;
            const t = target();
            const Du=0.16, Dv=0.08, F=0.037, k=0.060;

            // Seed near mouse
            const mgx=Math.floor(t.x/cell), mgy=Math.floor(t.y/cell);
            for(let dy=-2;dy<=2;dy++) for(let dx=-2;dx<=2;dx++){
                const gx=Math.max(0,Math.min(cols-1,mgx+dx)), gy=Math.max(0,Math.min(rows-1,mgy+dy));
                V[gy*cols+gx]=Math.min(1,V[gy*cols+gx]+0.08); U[gy*cols+gx]=Math.max(0,U[gy*cols+gx]-0.04);
            }

            for(let step=0;step<4;step++){
                for(let y=0;y<rows;y++) for(let x=0;x<cols;x++){
                    const i=y*cols+x, u=U[i], v=V[i];
                    const lapU=(x>0?U[i-1]:u)+(x<cols-1?U[i+1]:u)+(y>0?U[i-cols]:u)+(y<rows-1?U[i+cols]:u)-4*u;
                    const lapV=(x>0?V[i-1]:v)+(x<cols-1?V[i+1]:v)+(y>0?V[i-cols]:v)+(y<rows-1?V[i+cols]:v)-4*v;
                    const uvv=u*v*v;
                    nU[i]=Math.max(0,Math.min(1,u+Du*lapU-uvv+F*(1-u)));
                    nV[i]=Math.max(0,Math.min(1,v+Dv*lapV+uvv-(F+k)*v));
                }
                U.set(nU); V.set(nV);
            }

            const data=imgData.data, u32=new Uint32Array(data.buffer);
            const [thR,thG,thB]=getPrimRgb();
            const bgR=resolvedMode==='dark'?2:245, bgG=resolvedMode==='dark'?6:247, bgB=resolvedMode==='dark'?23:252;
            for(let gy=0;gy<rows;gy++) for(let gx=0;gx<cols;gx++){
                const v=Math.min(1,Math.max(0,V[gy*cols+gx]));
                const r=Math.round(bgR+(thR-bgR)*v), g=Math.round(bgG+(thG-bgG)*v), b=Math.round(bgB+(thB-bgB)*v);
                const c32=(255<<24)|(b<<16)|(g<<8)|r;
                const sy=gy*cell, sx=gx*cell;
                for(let py=sy;py<Math.min(sy+cell,height);py++)
                    for(let px=sx;px<Math.min(sx+cell,width);px++)
                        u32[py*width+px]=c32;
            }
            ctx.putImageData(imgData,0,0);
        };

        const drawStrangeAttractor = () => {
            const s = particles[0]; const t = target();
            ctx.fillStyle=resolvedMode==='dark'?'rgba(2,6,23,0.014)':'rgba(245,247,252,0.014)';
            ctx.fillRect(0,0,width,height);
            s.frame++;

            // State machine: hold the current attractor, then crossfade to the next —
            // one constellation dissolves while the next materializes.
            if (s.fade < 0 && --s.wait <= 0) {
                let n; do { n = Math.floor(Math.random() * CLIFFORD_PRESETS.length); } while (n === s.idx);
                s.nxt = seedAttractor(n); s.nextIdx = n; s.fade = 0;
            }
            let k = 0;
            if (s.fade >= 0) {
                k = s.fade / s.fadeLen;
                k = k * k * (3 - 2 * k); // smoothstep
                if (++s.fade > s.fadeLen) { s.cur = s.nxt; s.idx = s.nextIdx; s.nxt = null; s.fade = -1; s.wait = s.hold; k = 1; }
            }

            // View box: blend of the two attractors' (smoothed) extents during a fade,
            // mapped anisotropically so the shape fills ~92% of the whole screen.
            const bb = s.nxt ? {
                minX: s.cur.minX + (s.nxt.minX - s.cur.minX) * k, maxX: s.cur.maxX + (s.nxt.maxX - s.cur.maxX) * k,
                minY: s.cur.minY + (s.nxt.minY - s.cur.minY) * k, maxY: s.cur.maxY + (s.nxt.maxY - s.cur.maxY) * k,
            } : s.cur;
            const bbW = Math.max(0.6, bb.maxX - bb.minX), bbH = Math.max(0.6, bb.maxY - bb.minY);
            const midX = (bb.minX + bb.maxX) / 2, midY = (bb.minY + bb.maxY) / 2;
            const scaleX = width * 0.92 / bbW, scaleY = height * 0.90 / bbH;
            // Mouse gently shifts the projection center
            const cx = width/2 + (t.x - width/2) * 0.06, cy = height/2 + (t.y - height/2) * 0.06;

            // Slow breathing on the amplitude params c/d (±0.09, verified safe) keeps
            // the shape subtly alive between the big crossfade transformations.
            const run = (o: { a:number; b:number; c:number; d:number; x:number; y:number; minX:number; maxX:number; minY:number; maxY:number }, count: number, ph: number) => {
                if (count <= 0) return;
                const a = o.a, b = o.b;
                const c = o.c + 0.09 * Math.sin(s.frame * 0.011 + ph);
                const d = o.d + 0.09 * Math.cos(s.frame * 0.0087 + ph);
                let x = o.x, y = o.y, mnX = 1e9, mxX = -1e9, mnY = 1e9, mxY = -1e9;
                for (let i = 0; i < count; i++) {
                    const nx = Math.sin(a*y) + c*Math.cos(a*x);
                    const ny = Math.sin(b*x) + d*Math.cos(b*y);
                    x = nx; y = ny;
                    if (x < mnX) mnX = x; if (x > mxX) mxX = x;
                    if (y < mnY) mnY = y; if (y > mxY) mxY = y;
                    const px = Math.floor(cx + (x - midX) * scaleX), py = Math.floor(cy + (y - midY) * scaleY);
                    if (px >= 0 && px < width && py >= 0 && py < height) ctx.rect(px, py, 1, 1);
                }
                o.x = x; o.y = y;
                // Smoothly track the real extent so the view gently breathes with the shape
                if (count > 300) {
                    o.minX += (mnX - o.minX) * 0.05; o.maxX += (mxX - o.maxX) * 0.05;
                    o.minY += (mnY - o.minY) * 0.05; o.maxY += (mxY - o.maxY) * 0.05;
                }
            };

            const N = 4200;
            ctx.fillStyle = tc(resolvedMode === 'dark' ? 0.55 : 0.45);
            ctx.beginPath();
            run(s.cur, Math.round(N * (1 - k)), 0);
            if (s.nxt) run(s.nxt, Math.round(N * k), 2.1);
            ctx.fill();
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            if (effect === 'off') { ctx.clearRect(0,0,width,height); animId=requestAnimationFrame(animate); return; }
            switch(effect){
                case 'liquid-flow':       drawLiquidFlow(); break;
                case 'galaxy-swirl':      drawGalaxySwirl(); break;
                case 'dna-waves':         drawDnaWaves(); break;
                case 'quantum-field':     drawQuantumField(); break;
                case 'magnetic-field':    drawMagneticField(); break;
                case 'gravity-well':      drawGravityWell(); break;
                case 'aurora-beams':      drawAuroraBeams(); break;
                case 'fire-flies':        drawFireFlies(); break;
                case 'milky-way':         drawMilkyWay(); break;
                case 'chladni-resonance': drawChladniResonance(); break;
                case 'ferrofluid-peaks':  drawFerrofluidPeaks(); break;
                case 'mycelium-growth':   drawMyceliumGrowth(); break;
                case 'turing-patterns':   drawTuringPatterns(); break;
                case 'strange-attractor': drawStrangeAttractor(); break;
            }
            animId = requestAnimationFrame(animate);
        };

        const onResize = () => {
            width = containerRef.current!.clientWidth;
            height = containerRef.current!.clientHeight;
            init();
        };
        const onMouse = (e: MouseEvent) => { mouseRef.current={x:e.clientX,y:e.clientY}; lastMouseMoveRef.current=Date.now(); };
        const onScroll = () => { scrollYRef.current = window.scrollY; };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouse);
        window.addEventListener('scroll', onScroll, { passive: true });
        init(); animate();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animId);
        };
    }, [effect, theme, resolvedMode]);

    return (
        <div ref={containerRef} className={`fixed inset-0 z-[-1] transition-colors duration-500 ${resolvedMode==='dark'?'bg-slate-950':'bg-slate-50'}`}>
            <div className={`absolute inset-0 bg-gradient-to-b ${resolvedMode==='dark'?'from-slate-950/20 via-slate-900/20 to-slate-950/20':'from-slate-50/50 via-white/50 to-slate-50/50'} pointer-events-none z-0`} />
            <canvas ref={canvasRef} className="block w-full h-full z-10" />
        </div>
    );
};

export default ParticleBackground;
