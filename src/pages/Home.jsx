import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, Target, Code2, Zap, Crown } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO, { SITE_URL } from '../components/SEO';

const ChessPlayground = lazy(() => import('../components/ChessPlayground'));

gsap.registerPlugin(ScrollTrigger);

// Custom SVG icons
const Brain = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /></svg>;
const Rocket = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.76.22-2.09-.45-2.77a2.14 2.14 0 0 0-2.55-.23z" /><path d="m3.29 15 2.85.91L12 10l-.91-2.85" /><path d="M6.3 11.7A8 8 0 0 1 20.5 3.5S21 8 18 11l-5 5c-3 3-7.5 3.5-7.5 3.5" /></svg>;
const Lightbulb = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
const Coffee = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>;

const AnimatedAtom = ({ atomRef }) => {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none z-0">
      {/* Outer wrapper that provides global 3D rotation/precession + mouse tilt */}
      <div ref={atomRef} className="relative w-[400px] h-[400px] md:w-[750px] md:h-[750px] animate-atom-master"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}>

        {/* Core Nucleus with complex wobble and internal spin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ transformStyle: 'preserve-3d' }}>
          <div className="w-16 h-16 md:w-32 md:h-32 bg-[#C75B39] rounded-full shadow-[0_0_120px_50px_rgba(199,91,57,0.45),inset_0_0_40px_rgba(232,133,110,0.8)] animate-nucleus-wobble flex items-center justify-center overflow-hidden">
            {/* Internal "energy" spin */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent)] mix-blend-overlay animate-spin-slow" />
          </div>
          <div className="absolute inset-0 w-full h-full bg-[#E8856E]/25 rounded-full blur-3xl animate-ping opacity-20" />
        </div>

        {/* Orbit 1 - Internal (Fastest) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full border-[2.5px] border-[#C75B39]/80 shadow-[0_0_30px_rgba(199,91,57,0.4)]"
          style={{ '--rx': '70deg', '--ry': '15deg', animation: 'atomSpin 6s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#E8856E] rounded-full shadow-[0_0_30px_#E8856E] border border-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#E8856E]/90 rounded-full shadow-[0_0_20px_#E8856E]" />
        </div>

        {/* Orbit 2 - Main slanted */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border-[2.5px] border-[#8B7EC8]/80 shadow-[0_0_35px_rgba(139,126,200,0.4)]"
          style={{ '--rx': '75deg', '--ry': '80deg', animation: 'atomSpinRev 12s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#8B7EC8] rounded-full shadow-[0_0_45px_#8B7EC8] border border-white/40" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#8B7EC8]/90 rounded-full shadow-[0_0_25px_#8B7EC8]" />
        </div>

        {/* Orbit 3 - Wide slant */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-[2.5px] border-[#4A90D9]/80 shadow-[0_0_40px_rgba(74,144,217,0.4)]"
          style={{ '--rx': '75deg', '--ry': '150deg', animation: 'atomSpin 18s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#4A90D9] rounded-full shadow-[0_0_60px_#4A90D9] border border-white/40" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#4A90D9]/90 rounded-full shadow-[0_0_30px_#4A90D9]" />
        </div>

        {/* Orbit 4 - Vertical (Slowest, massive) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-[2px] border-[#5B8C6F]/70 shadow-[0_0_35px_rgba(91,140,111,0.4)]"
          style={{ '--rx': '0deg', '--ry': '90deg', animation: 'atomSpinRev 28s linear infinite' }}>
          <div className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#5B8C6F] rounded-full shadow-[0_0_40px_#5B8C6F] border border-white/40" />
        </div>
      </div>
      <style>{`
        @keyframes atomSpin { 0% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(0deg); } 100% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(360deg); } }
        @keyframes atomSpinRev { 0% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(360deg); } 100% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(0deg); } }
        
        @keyframes atom-master { 
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: translateY(-30px) rotateX(5deg) rotateY(10deg) rotateZ(180deg); }
          100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg); }
        }
        @keyframes nucleus-wobble {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.08) rotate(10deg); }
          66% { transform: scale(0.95) rotate(-10deg); }
        }
        .animate-atom-master { animation: atom-master 40s linear infinite; }
        .animate-nucleus-wobble { animation: nucleus-wobble 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};


// ── SHUFFLER CARD ───────────────────────────────────────────────────────
const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Sarah K. · Engineering', score: 94, label: 'Field Ready', color: '#5B8C6F' },
    { id: 2, name: 'Marcus T. · Sales', score: 42, label: 'High Risk', color: '#C75B39' },
    { id: 3, name: 'Priya M. · Support', score: 77, label: 'Improving', color: '#8B7EC8' },
  ]);
  useEffect(() => {
    const id = setInterval(() => {
      setItems(p => { const n = [...p]; n.unshift(n.pop()); return n; });
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-44 w-full">
      {items.map((item, i) => (
        <div key={item.id}
          className="absolute inset-x-0 p-4 glass rounded-2xl"
          style={{
            transform: `translateY(${i * 18}px) scale(${1 - i * 0.04})`,
            opacity: 1 - i * 0.3, zIndex: 10 - i,
            transition: 'all 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
          <div className="flex justify-between items-start mb-2">
            <span className="font-mono text-[0.6rem] text-white/30 tracking-wider">Readiness Score</span>
            <span className="font-mono text-[0.6rem] font-semibold" style={{ color: item.color }}>{item.label}</span>
          </div>
          <div className="font-display font-extrabold text-3xl" style={{ color: item.color }}>
            {item.score}<span className="text-lg">%</span>
          </div>
          <div className="font-inter text-xs text-white/25 mt-1">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

// ── PARTICLE PLAYGROUND (MINI-GAME) ─────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const atomRef = useRef(null);
  const [playgroundMode, setPlaygroundMode] = useState('particles'); // 'particles' or 'chess'

  // Dynamic age calculation based on Feb 24, 2002
  const age = (() => {
    const birthDate = new Date('2002-02-24');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  })();

  const handleMouseMove = (e) => {
    if (!heroRef.current || !atomRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (((e.clientX - left) / width) - 0.5) * 2;
    const y = (((e.clientY - top) / height) - 0.5) * 2;
    
    // Smooth, hardware-accelerated transformation via GSAP
    gsap.to(atomRef.current, {
      y: y * -20,
      rotateX: y * 15,
      rotateY: x * 15,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  // Entrance animations
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.h-anim');
    if (els) {
      gsap.set(els, { opacity: 0, y: 40 });
      gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2 });
    }
  }, []);

  // Parallax hero image
  useEffect(() => {
    const img = document.querySelector('.hero-bg-image');
    if (img) {
      gsap.to(img, {
        y: 200,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }
  }, []);

  // Scroll reveals for each section
  useEffect(() => {
    document.querySelectorAll('.reveal-section').forEach(section => {
      const els = section.querySelectorAll('.reveal-item');
      if (els.length) {
        gsap.set(els, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' }),
          once: true,
        });
      }
    });
  }, []);

  const skills = [
    { icon: <Rocket className="w-5 h-5" />, label: 'TPM', color: '#C75B39' },
    { icon: <Code2 className="w-5 h-5" />, label: 'Developer', color: '#5B8C6F' },
    { icon: <Brain className="w-5 h-5" />, label: 'AI & Cognition', color: '#8B7EC8' },
    { icon: <Crown className="w-5 h-5" />, label: 'Chess', color: '#E8856E' },
    { icon: <Zap className="w-5 h-5" />, label: 'Emerging Tech', color: '#4A90D9' },
    { icon: <Coffee className="w-5 h-5" />, label: 'Good Coffee', color: '#D4C4A8' },
  ];

  const projects = [
    {
      num: '01', name: 'Recaller', tag: 'B2B SaaS',
      desc: 'Training intelligence that proves ROI. 10-second Slack assessments reveal who actually knows their stuff.',
      color: '#C75B39', href: '/projects/recaller',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2560',
      icon: <Target className="w-5 h-5" />,
    },
    {
      num: '02', name: 'API Creations', tag: 'Infrastructure',
      desc: 'Architecting robust, scalable, and secure backend microservices for enterprise-level applications.',
      color: '#5B8C6F', href: '/projects/api-creations',
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2560',
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      num: '03', name: 'Social Wellness', tag: 'Intentional Social',
      desc: 'Building products that elevate user psychology. Focusing on mindfulness and intentional interaction through daily photography.',
      color: '#8B7EC8', href: '/projects/social-wellness',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2560',
      icon: <Brain className="w-5 h-5" />,
    },
  ];

  return (
    <div>
      <SEO
        title="Builder, TPM & Developer | Daniel Ozoani"
        description="I'm a Technical Project Manager and developer who loves building products, exploring AI, and thinking in systems."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Daniel Ozoani — Portfolio',
            description: 'Portfolio of Daniel Ozoani — Technical Project Manager and developer.',
            url: SITE_URL,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Daniel Ozoani',
            url: SITE_URL,
            jobTitle: 'Technical Project Manager & Developer',
            sameAs: [
              'https://www.linkedin.com/in/daniel-ozoani-b20539252/',
              'https://github.com/OzunaModelo123',
            ],
          },
        ]}
      />
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full viewport with background image + physics overlay
          ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-[100dvh] flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Animated Custom Atom Simulation replacing the camera image */}
        <AnimatedAtom atomRef={atomRef} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent pointer-events-none" />

        <div className="relative z-10 px-6 md:px-10 lg:px-16 max-w-7xl w-full">
          <div className="h-anim mb-8">
            <div className="status-live inline-flex">
              <span className="status-dot-green" />
              Open to new projects
            </div>
          </div>

          <div className="h-anim mb-2">
            <p className="font-inter text-lg md:text-xl text-white/90 tracking-wide">Hi, my name is</p>
          </div>

          <div className="h-anim mb-6 group cursor-default relative z-20">
            <h1 className="hero-mega max-w-full">
              {"Daniel".split('').map((l, i) => <span key={'d' + i} className="inline-block transition-all duration-300 hover:-translate-y-6 hover:scale-[1.2] hover:text-[#C75B39] hover:-rotate-6 hover:z-10 relative">{l}</span>)}<br />
              <span className="">{"Ozoani.".split('').map((l, i) => <span key={'o' + i} className="inline-block transition-all duration-300 hover:-translate-y-6 hover:scale-[1.2] hover:text-white hover:rotate-6 hover:z-10 relative text-[#C75B39] drop-shadow-xl">{l}</span>)}</span>
            </h1>
          </div>

          <p className="h-anim font-inter text-lg md:text-xl text-white max-w-prose leading-relaxed mb-10 text-shadow-sm">
            I’m a {age}-year-old developer and builder who genuinely just loves making things. I get wildly excited about exploring new AI patterns, whole product lifecycles, and a good game of chess.
          </p>

          <div className="h-anim flex flex-wrap gap-3 mb-10">
            <Link to="/projects" className="btn-glow">
              See what I'm building
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-glass">
              Say hi
            </Link>
          </div>

          <div className="h-anim flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <div key={i} className="chip-dark hoverable">
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 md:right-14 flex flex-col items-center gap-2 opacity-25 h-anim">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-[#C75B39]/60" />
          <ChevronDown className="w-4 h-4 text-[#C75B39]"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes scrollBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }`}</style>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT — Split layout with visual identity
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="reveal-section py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="reveal-item sec-tag mb-8 text-white/80">Who I Am</div>
              <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[0.95] tracking-tight mb-8">
                I love to <span className="font-serif italic" style={{ color: '#C75B39' }}>build things.</span>
              </h2>
              <p className="reveal-item font-inter text-base md:text-lg text-white/90 max-w-prose leading-relaxed mb-5">
                I'm a Technical Project Manager by trade, but what really drives me is being part of the full journey of a product. From the early ideas all the way to seeing it actually ship and live in the world. That whole process genuinely excites me.
              </p>
              <p className="reveal-item font-inter text-base md:text-lg text-white/90 max-w-prose leading-relaxed mb-5">
                I spend a lot of my free time researching AI. Not just reading the news about it, but actually digging into how it works, what people are building with it, and where it's all going. It's a pretty exciting time to be paying attention to that space and I'm all in on it.
              </p>
              <p className="reveal-item font-inter text-base md:text-lg text-white/90 max-w-prose leading-relaxed mb-5">
                I also enjoy coding and cinematography. Two pretty different things, but they scratch the same itch for me. Creating something from nothing, whether it's a working piece of software or a well put together shot.
              </p>
              <p className="reveal-item font-inter text-base md:text-lg text-white/90 max-w-prose leading-relaxed mb-10">
                Oh, and I play chess. Still terrible at it, but I keep playing. At the end of the day I'm just someone who loves to create, loves to learn, and wants to be involved in building things that matter.
              </p>
              <div className="reveal-item flex flex-wrap gap-3">
                <Link to="/about" className="btn-glow">
                  Full story <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-glass">
                  Drop me a message
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal-item lg:mt-56">
              {[
                { icon: <Rocket className="w-6 h-6" />, title: 'Technical Project Manager', sub: 'Driving product lifecycles', color: '#5B8C6F' },
                { icon: <Brain className="w-6 h-6" />, title: 'AI Engineering', sub: 'LLMs and cognitive intelligence', color: '#8B7EC8' },
                { icon: <Lightbulb className="w-6 h-6" />, title: 'Product Builder', sub: 'Taking ideas to deployment', color: '#E8856E' },
                { icon: <Target className="w-6 h-6" />, title: 'Systems Design', sub: 'Architecting for the long term', color: '#C75B39' },
                { icon: <Crown className="w-6 h-6" />, title: 'Chess', sub: 'Terrible at it, but love it', color: '#D4C4A8' },
                { icon: <Zap className="w-6 h-6" />, title: 'Filmmaking', sub: 'Framing the perfect shot', color: '#4A90D9' },
              ].map((c, i) => (
                <div key={i}
                  className="glass-light rounded-2xl p-4 sm:p-6 flex flex-col gap-3 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] min-w-0"
                  style={{ border: `1px solid ${c.color}20` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 100% 0%, ${c.color}, transparent)` }} />
                  <span style={{ color: c.color }} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 w-fit drop-shadow-lg shrink-0">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-base sm:text-lg text-white mb-1 leading-snug">{c.title}</div>
                    <div className="font-inter text-sm text-white/80 leading-relaxed break-words">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS — Magazine cards with images
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="reveal-section py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="reveal-item sec-tag mb-6 text-white/80">Working On</div>
              <h2 className="reveal-item font-display font-black text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.92] tracking-tight">
                Projects I am<br />
                <span className="text-white drop-shadow-lg">working on.</span>
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {projects.map((p, i) => (
              <div key={i} className="reveal-item">
                {p.href ? (
                  <Link to={p.href} className="block project-card group overflow-hidden rounded-3xl border border-white/20 transition-all duration-500 hover:border-white/40">
                    <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}08, transparent 70%)` }} />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
                      {/* Image side */}
                      <div className="h-56 md:h-full w-full">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      </div>
                      {/* Content side */}
                      <div className="p-8 md:p-12 flex flex-col justify-between glass-light">
                        <div>
                          <div className="flex items-center gap-4 mb-5">
                            <span className="font-mono text-xs text-white/70 tracking-widest">{p.num}</span>
                            <div className="chip-dark" style={{ color: p.color, borderColor: `${p.color}40` }}>{p.tag}</div>
                          </div>
                          <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 group-hover:text-[#C75B39] transition-colors">
                            {p.name}
                          </h3>
                          <p className="font-inter text-base text-white/90 leading-relaxed max-w-prose">{p.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 font-inter text-sm font-semibold mt-6" style={{ color: p.color }}>
                          Deep dive
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="project-card opacity-60">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
                      <div className="parallax-img h-56 md:h-72 relative">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale" loading="lazy" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-mono text-[0.7rem] text-white/60 tracking-[0.3em] glass px-4 py-2 rounded-full">COMING SOON</span>
                        </div>
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-5">
                            <span className="font-mono text-[0.6rem] text-white/20 tracking-widest">{p.num}</span>
                            <div className="chip-dark" style={{ color: p.color, borderColor: `${p.color}25` }}>{p.tag}</div>
                          </div>
                          <h3 className="font-display font-bold text-3xl md:text-4xl text-white/40 mb-3">{p.name}</h3>
                          <p className="font-inter text-sm text-white/20 leading-relaxed max-w-md">{p.desc}</p>
                        </div>
                        <div className="font-inter text-xs text-white/15 mt-6">Details dropping soon</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/projects" className="btn-glass hoverable">
              See project deep-dive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RESEARCH — Visual tiles
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="reveal-section py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="reveal-item sec-tag mb-6">Research & Insights</div>
              <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[0.95] tracking-tight">
                Thinking out loud.
              </h2>
            </div>
            <Link to="/research" className="reveal-item btn-glass hidden md:inline-flex">
              All research <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tag: 'IT Migrations', title: 'The Psychology of Resistance to Change', desc: 'Why employees push back against new systems.',
                img: 'https://miro.medium.com/v2/resize:fit:1190/format:webp/1*I3J-lTJobQSk_1LLVesRog.jpeg', color: '#8B7EC8', status: 'Published', link: '/research/it-migrations'
              },
              {
                tag: 'AI Systems', title: "AI as a PM's Co-Pilot", desc: 'Where AI helps and exactly where it falls short.',
                img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600', color: '#C75B39', status: 'Published', link: '/research/ai-copilot'
              },
              {
                tag: 'Corporate L&D', title: 'Why Training Programs Fail', desc: 'The science behind behavioral change and making skills stick.',
                img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600', color: '#5B8C6F', status: 'Published', link: '/research/training-programs'
              },
            ].map((r, i) => (
              <Link to={r.link} key={i}
                className="reveal-item project-card group flex flex-col h-full overflow-hidden">
                <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${r.color}15, transparent 70%)` }} />
                <div className="parallax-img h-48">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />
                  <span className="absolute top-4 right-4 font-mono text-[0.62rem] font-bold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    style={{ color: r.color, filter: 'brightness(1.5)' }}>{r.status}</span>
                </div>
                <div className="p-6 flex flex-col flex-grow gap-2.5">
                  <span className="font-mono text-[0.58rem] text-white/90 tracking-widest uppercase">{r.tag}</span>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#C75B39] transition-colors leading-tight">{r.title}</h3>
                  <p className="font-inter text-sm text-white leading-relaxed opacity-90">{r.desc}</p>
                  <div className="flex items-center gap-2 text-base font-inter font-bold mt-4" style={{ color: r.color, filter: 'brightness(1.5)' }}>
                    Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PLAYGROUND
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="playground" className="reveal-section py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="reveal-item sec-tag justify-center mb-6">The Playground</div>
            <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,7vw,4.5rem)] text-white leading-[0.95] tracking-tight mb-4">
              Go ahead, <span className="font-serif italic" style={{ color: '#C75B39' }}>play.</span>
            </h2>
            <p className="reveal-item font-inter text-base text-white/90 max-w-prose mx-auto leading-relaxed mb-8">
              {playgroundMode === 'particles' 
                ? "Click and drag to create an explosive gravity-powered particle painting. I think every portfolio needs a little interactive fun."
                : "Think you can beat the machine? Play a game of chess against my lightweight AI engine. (Fair warning: I'm still teaching it to be merciful.)"
              }
            </p>

            {/* Mode Toggle */}
            <div className="reveal-item inline-flex p-1.5 glass rounded-2xl border border-white/05 mb-8">
              <button 
                onClick={() => setPlaygroundMode('particles')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-500 font-mono text-[0.65rem] tracking-[0.2em] uppercase ${
                  playgroundMode === 'particles' 
                    ? 'bg-[#C75B39] text-white shadow-lg shadow-[#C75B39]/20' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> Particles
              </button>
              <button 
                onClick={() => setPlaygroundMode('chess')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-500 font-mono text-[0.65rem] tracking-[0.2em] uppercase ${
                  playgroundMode === 'chess' 
                    ? 'bg-[#C75B39] text-white shadow-lg shadow-[#C75B39]/20' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Crown className="w-3.5 h-3.5" /> Chess AI
              </button>
            </div>
          </div>

          <div className="reveal-item overflow-hidden">
            <div className="transition-all duration-700 ease-in-out" style={{ transform: playgroundMode === 'particles' ? 'none' : 'scale(0.98)', opacity: 1 }}>
              {playgroundMode === 'particles' ? (
                <ParticlePlayground />
              ) : (
                <Suspense fallback={(
                  <div className="min-h-[22rem] flex items-center justify-center rounded-3xl glass border border-white/10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-[#C75B39] border-t-transparent rounded-full animate-spin" aria-hidden />
                      <span className="font-mono text-[0.65rem] text-white/35 tracking-[0.2em] uppercase">Loading chess…</span>
                    </div>
                  </div>
                )}
                >
                  <ChessPlayground />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="reveal-section py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal-item sec-tag justify-center mb-8" style={{ color: '#E8856E' }}>Let's Connect</div>
          <h2 className="reveal-item font-display font-bold text-[clamp(3rem,8vw,6rem)] text-white leading-[0.88] tracking-tight mb-6">
            Got an idea?<br />
            <span className="font-serif italic" style={{ color: '#E8856E' }}>Let's talk about it.</span>
          </h2>
          <p className="reveal-item font-inter text-base md:text-xl text-white/30 max-w-lg mx-auto leading-relaxed mb-12">
            Whether it's a project collab, a TPM conversation, AI chat, or a chess match — I'm always down.
          </p>
          <div className="reveal-item flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-glow">
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://www.linkedin.com/in/daniel-ozoani-b20539252/" target="_blank" rel="noopener noreferrer" className="btn-glass">
              LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
