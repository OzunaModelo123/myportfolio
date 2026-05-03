'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';

const ParticlePlayground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, down: false, active: false });
  const animRef = useRef(null);
  const [count, setCount] = useState(0);
  const countTimerRef = useRef(0);

  // Constants
  const COLORS = ['#C75B39', '#8B7EC8', '#5B8C6F', '#E8856E', '#4A90D9'];
  const MAX_PARTICLES = 850;
  const PROXIMITY_THRESHOLD = 90;
  const GRAVITY_STRENGTH = 0.15;
  const MAGNET_STRENGTH = 0.25;
  const SPIRAL_FORCE = 0.08;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization
    let W, H;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = 420;
    };
    resize();
    window.addEventListener('resize', resize);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };

    const handleDown = (e) => {
      mouseRef.current.down = true;
      mouseRef.current.active = true;
      const p = getPos(e);
      mouseRef.current.x = p.x;
      mouseRef.current.y = p.y;
    };
    const handleUp = () => { mouseRef.current.down = false; };
    const handleMove = (e) => {
      mouseRef.current.active = true;
      const p = getPos(e);
      mouseRef.current.x = p.x;
      mouseRef.current.y = p.y;
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.down = false;
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleUp);
    canvas.addEventListener('mouseleave', handleLeave);
    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleUp);

    class Particle {
      constructor(x, y, isEmitted = false) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = isEmitted ? (Math.random() * 6 + 2) : (Math.random() * 2 + 0.5);
        this.vx = Math.cos(angle) * speed;
        this.vy = isEmitted ? (Math.sin(angle) * speed - 3) : (Math.sin(angle) * speed);
        this.size = Math.random() * 3 + 1.2; // Slightly smaller for performance
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = 1.0;
        this.decay = Math.random() * 0.005 + 0.002;
        this.friction = 0.98;
      }

      update(mouse, W, H) {
        if (mouse.active && !mouse.down) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 90000) { // 300^2
            const dist = Math.sqrt(distSq);
            const force = (300 - dist) / 300;
            this.vx += (dx / dist) * force * MAGNET_STRENGTH;
            this.vy += (dy / dist) * force * MAGNET_STRENGTH;
            this.vx += (dy / dist) * force * SPIRAL_FORCE;
            this.vy -= (dx / dist) * force * SPIRAL_FORCE;
          }
        }

        this.vy += GRAVITY_STRENGTH;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        if (this.x < this.size) { this.x = this.size; this.vx *= -0.6; }
        if (this.x > W - this.size) { this.x = W - this.size; this.vx *= -0.6; }
        if (this.y > H - this.size) { this.y = H - this.size; this.vy *= -0.6; }
        if (this.y < this.size) { this.y = this.size; this.vy *= -0.6; }

        return this.life > 0;
      }

      draw(ctx) {
        // Optimization: Avoid shadowBlur and transparency changes where possible
        // Sub-pixel optimization: use | 0 to convert floats to integers
        ctx.beginPath();
        ctx.arc(this.x | 0, this.y | 0, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Faint outer glow without shadowBlur
        ctx.beginPath();
        ctx.arc(this.x | 0, this.y | 0, this.size * this.life * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.15;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 18, 0.22)'; // Faster clear
      ctx.fillRect(0, 0, W, H);

      if (mouseRef.current.down) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(new Particle(mouseRef.current.x, mouseRef.current.y, true));
        }
      }

      if (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES);
      }

      // SPATIAL GRID OPTIMIZATION
      const cellSize = PROXIMITY_THRESHOLD;
      const cols = Math.ceil(W / cellSize);
      const rows = Math.ceil(H / cellSize);
      const grid = new Array(cols * rows);

      // Populate Grid
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const c = Math.floor(p.x / cellSize);
        const r = Math.floor(p.y / cellSize);
        if (c >= 0 && c < cols && r >= 0 && r < rows) {
          const idx = c + r * cols;
          if (!grid[idx]) grid[idx] = [];
          grid[idx].push(p);
        }
      }

      // Draw Constellation Lines using Grid
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      const thresholdSq = PROXIMITY_THRESHOLD * PROXIMITY_THRESHOLD;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = c + r * cols;
          const cell = grid[idx];
          if (!cell) continue;

          // Check this cell and neighbors (right, bottom-right, bottom, bottom-left)
          // to avoid double checking
          const neighbors = [
            [0, 0], [1, 0], [1, 1], [0, 1], [-1, 1]
          ];

          for (const [dc, dr] of neighbors) {
            const nc = c + dc;
            const nr = r + dr;
            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
              const nIdx = nc + nr * cols;
              const nCell = grid[nIdx];
              if (!nCell) continue;

              for (let i = 0; i < cell.length; i++) {
                const p1 = cell[i];
                // If checking same cell, start from i+1
                const startJ = (dc === 0 && dr === 0) ? i + 1 : 0;
                for (let j = startJ; j < nCell.length; j++) {
                  const p2 = nCell[j];
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  const dSq = dx * dx + dy * dy;

                  if (dSq < thresholdSq) {
                    const opacity = (1 - Math.sqrt(dSq) / PROXIMITY_THRESHOLD) * Math.min(p1.life, p2.life) * 0.4;
                    ctx.strokeStyle = `rgba(139, 126, 200, ${opacity})`;
                    // Sub-pixel optimization: convert floats to integers using | 0
                    ctx.moveTo(p1.x | 0, p1.y | 0);
                    ctx.lineTo(p2.x | 0, p2.y | 0);
                  }
                }
              }
            }
          }
        }
      }
      // Batch stroke
      ctx.stroke();

      // Update and Draw Particles
      particlesRef.current = particlesRef.current.filter(p => {
        const active = p.update(mouseRef.current, W, H);
        if (active) {
          p.draw(ctx);
        }
        return active;
      });

      // Throttle count updates to ~2fps instead of 60fps to reduce React re-renders
      countTimerRef.current++;
      if (countTimerRef.current % 30 === 0) {
        setCount(particlesRef.current.length);
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[#C75B39]/5 blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <canvas
        ref={canvasRef}
        className="w-full rounded-3xl border border-white/10 cursor-none relative z-10"
        style={{ height: 420, touchAction: 'none', background: '#0a0a12' }}
      />

      {/* Dynamic Cursor for Playground */}
      <div id="playground-cursor" className="hidden" />

      <div className="absolute top-6 right-6 flex items-center gap-4 z-20">
        <div className="flex flex-col items-end">
          <span className="font-mono text-[0.6rem] text-[#8B7EC8] uppercase tracking-[0.2em] font-bold">Neural Load</span>
          <span className="font-mono text-xs text-white/40">{count} / {MAX_PARTICLES}</span>
        </div>
        <button
          onClick={() => { particlesRef.current = []; setCount(0); }}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/30 hover:text-[#C75B39] hover:border-[#C75B39]/50 transition-all duration-500 group/btn"
        >
          <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-6 left-6 hidden md:flex gap-8 z-20">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.55rem] text-white/20 uppercase tracking-widest">Hover</span>
          <span className="font-mono text-[0.62rem] text-white/60">Singularity Mode</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.55rem] text-white/20 uppercase tracking-widest">Drag</span>
          <span className="font-mono text-[0.62rem] text-white/60">Neural Emission</span>
        </div>
      </div>

      <style>{`
        canvas:hover ~ #playground-cursor { display: block; }
      `}</style>
    </div>
  );
};

export default ParticlePlayground;
