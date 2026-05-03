import React, { useEffect, useRef, useState, Suspense, lazy, memo, useCallback, useLayoutEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from './components/SEO';
import { ArrowRight, Menu, X, Mail, Github, Linkedin, ExternalLink, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

// Eagerly load Home (LCP route) and lightweight pages
import Home from './pages/Home';
import WorkIndex from './pages/WorkIndex';
import Contact from './pages/Contact';

// Lazy-load heavier pages for code-splitting
const RecallerProject = lazy(() => import('./pages/RecallerProject'));
const Research = lazy(() => import('./pages/Research'));
const ApiCreationsProject = lazy(() => import('./pages/ApiCreationsProject'));
const SocialAppsProject = lazy(() => import('./pages/SocialAppsProject'));
const FrameDayProject = lazy(() => import('./pages/FrameDayProject'));
const About = lazy(() => import('./pages/About'));
const ITMigrations = lazy(() => import('./pages/research/ITMigrations'));
const AICopilot = lazy(() => import('./pages/research/AICopilot'));
const DigitalContentMarketing = lazy(() => import('./pages/research/DigitalContentMarketing'));
const TrainingPrograms = lazy(() => import('./pages/research/TrainingPrograms'));
const ConstructionComm = lazy(() => import('./pages/research/ConstructionComm'));
const DigitalTransformation = lazy(() => import('./pages/research/DigitalTransformation'));

gsap.registerPlugin(ScrollTrigger);

function isLightweightExperience() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-[#C75B39] border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Loading</span>
    </div>
  </div>
);

// 404 Page
const NotFound = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-6">
    <SEO
      title="Page not found | Daniel Ozoani"
      description="The page you're looking for does not exist on danbuilds.work."
      noIndex
    />
    <div className="text-center">
      <h1 className="font-display font-black text-[clamp(5rem,15vw,10rem)] text-white/10 leading-none">404</h1>
      <p className="font-inter text-lg text-white/60 mb-8">This page doesn't exist.</p>
      <Link to="/" className="btn-glow">Go home <ArrowRight className="w-4 h-4" /></Link>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// REFRACTIVE GLASS SHAPE — DOM shell (transforms applied inside physics ticker)
// ─────────────────────────────────────────────────────────────────────────────
const RefractiveShapePiece = memo(({ particle, bindDom }) => {
  const shellRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    bindDom(particle.id, shellRef.current);
    return () => bindDom(particle.id, null);
  }, [particle.id, bindDom]);

  return (
    <div
      ref={shellRef}
      className={`refractive-glass ${isHovered ? 'glowing' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: particle.radius * 2,
        height: particle.radius * 2,
        background: `${particle.color}0.005)`,
        borderRadius: particle.type === 'circle' ? '50%' : (particle.sides === 3 ? '10%' : '20%'),
        clipPath: particle.type === 'poly' ? (
          particle.sides === 3 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
            particle.sides === 4 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' :
              'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
        ) : 'none',
        transform: `translateZ(${particle.z}px)`,
      }}
    />
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS BACKGROUND — Hybrid DOM/Canvas System
// ─────────────────────────────────────────────────────────────────────────────
const PhysicsBackground = () => {
  const [litePhysics] = useState(() => isLightweightExperience());
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0 });
  const scrollRef = useRef({ y: 0, velocity: 0 });
  const shapesRef = useRef([]);
  const shapeDomByIdRef = useRef({});
  const [shapes, setShapes] = useState([]);

  const bindDomShape = useCallback((id, node) => {
    if (node) shapeDomByIdRef.current[id] = node;
    else delete shapeDomByIdRef.current[id];
  }, []);

  useEffect(() => {
    if (litePhysics) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const setterCache = new WeakMap();
    const getDomSetters = (el) => {
      let ge = setterCache.get(el);
      if (!ge) {
        ge = {
          x: gsap.quickSetter(el, 'x', 'px'),
          y: gsap.quickSetter(el, 'y', 'px'),
          rotateX: gsap.quickSetter(el, 'rotateX', 'deg'),
          rotateY: gsap.quickSetter(el, 'rotateY', 'deg'),
          rotateZ: gsap.quickSetter(el, 'rotateZ', 'deg'),
        };
        setterCache.set(el, ge);
      }
      return ge;
    };

    const palettes = [
      'rgba(255, 89, 94, ',  // Red-Pink
      'rgba(255, 202, 58, ', // Yellow-Gold
      'rgba(138, 201, 38, ', // Green
      'rgba(25, 130, 196, ', // Blue
      'rgba(106, 76, 147, ', // Purple
      'rgba(255, 146, 76, ', // Orange
      'rgba(175, 252, 255, ' // Crystal
    ];

    let layoutMobile = false;

    const createShapes = (w, h) => {
      const mobile = w < 768;
      layoutMobile = mobile;
      const count = mobile ? 6 : 10;
      const proximity = mobile ? 150 : 250;

      const newShapes = [];
      for (let i = 0; i < count; i++) {
        newShapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: mobile ? 0 : (Math.random() - 0.5) * 400,
          vx: (Math.random() - 0.5) * (mobile ? 0.8 : 1.5),
          vy: (Math.random() - 0.5) * (mobile ? 0.8 : 1.5),
          radius: mobile ? (Math.random() * 25 + 20) : (Math.random() * 40 + 30),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          color: palettes[Math.floor(Math.random() * palettes.length)],
          type: Math.random() > 0.3 ? 'poly' : 'circle',
          sides: Math.floor(Math.random() * 4) + 3,
          proximityLink: proximity,
          id: i
        });
      }
      shapesRef.current = newShapes;
      setShapes([...newShapes]);
    };

    const resize = () => {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      // Reset transform before scaling to prevent compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
      createShapes(window.innerWidth, window.innerHeight);
    };

    let lastScroll = window.scrollY;
    const onMouse = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onScroll = () => {
      const currentScroll = window.scrollY;
      scrollRef.current.velocity = currentScroll - lastScroll;
      scrollRef.current.y = currentScroll;
      lastScroll = currentScroll;
    };

    let time = 0;
    const updatePhysics = () => {
      time += 0.005;
      const sW = window.innerWidth;
      const sH = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, sW, sH);
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 0.5;

      shapesRef.current.forEach((p, i) => {
        p.vy -= scrollRef.current.velocity * (0.005 + (Math.abs(p.z) / 4000));

        const dx = mx - p.x;
        const dy = my - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 300 && dist > 0) {
          const repelForce = (300 - dist) / 300;
          p.vx -= (dx / dist) * repelForce * 0.8;
          p.vy -= (dy / dist) * repelForce * 0.8;
        }

        p.vx += Math.sin(time * 3 + i) * 0.015;
        p.vy += Math.cos(time * 2 + i) * 0.015;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed + (p.vx * 0.002);

        const margin = 150;
        if (p.x < -margin) p.x = sW + margin;
        if (p.x > sW + margin) p.x = -margin;
        if (p.y < -margin) p.y = sH + margin;
        if (p.y > sH + margin) p.y = -margin;

        // Collision Detection + Resolution (Anti-clumping)
        for (let j = i + 1; j < shapesRef.current.length; j++) {
          const p2 = shapesRef.current[j];
          const ldx = p2.x - p.x;
          const ldy = p2.y - p.y;
          const ldistSq = ldx * ldx + ldy * ldy;
          const minDist = p.radius + p2.radius;

          if (ldistSq < minDist * minDist) {
            const ldist = Math.sqrt(ldistSq);
            const overlap = (minDist - ldist) * 0.05;
            const nx = ldx / ldist;
            const ny = ldy / ldist;

            // Push away
            p.vx -= nx * overlap;
            p.vy -= ny * overlap;
            p2.vx += nx * overlap;
            p2.vy += ny * overlap;
          }

          // Blueprint lines
          const proximity = p.proximityLink;
          if (ldistSq < proximity * proximity) {
            const opacity = 1 - (Math.sqrt(ldistSq) / proximity);
            ctx.strokeStyle = `rgba(199, 91, 57, ${opacity * 0.15})`;
            // Sub-pixel optimization: convert floats to integers using | 0
            ctx.moveTo(p.x | 0, p.y | 0);
            ctx.lineTo(p2.x | 0, p2.y | 0);
          }
        }

        const shell = shapeDomByIdRef.current[p.id];
        if (shell) {
          const gx = getDomSetters(shell);
          gx.x(p.x - p.radius);
          gx.y(p.y - p.radius);
          if (!layoutMobile) {
            const mdx = mx - p.x;
            const mdy = my - p.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < 300 && md > 0) {
              const influence = (300 - md) / 300;
              gx.rotateX(-(mdy / 300) * 45 * influence);
              gx.rotateY((mdx / 300) * 45 * influence);
            } else {
              gx.rotateX(0);
              gx.rotateY(0);
            }
          } else {
            gx.rotateX(0);
            gx.rotateY(0);
          }
          gx.rotateZ(p.rotation * (180 / Math.PI));
        }
      });

      ctx.stroke();
      scrollRef.current.velocity *= 0.9;
    };

    resize();
    gsap.ticker.add(updatePhysics);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      gsap.ticker.remove(updatePhysics);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, [litePhysics]);

  if (litePhysics) {
    return (
      <div className="lite-physics-bg" aria-hidden="true">
        <span className="lite-physics-grid" />
        <span className="lite-physics-blob lite-physics-blob--a" />
        <span className="lite-physics-blob lite-physics-blob--b" />
        <span className="lite-physics-blob lite-physics-blob--c" />
        <span className="lite-physics-blob lite-physics-blob--d" />
        <span className="lite-physics-accent" />
      </div>
    );
  }

  return (
    <>
      <canvas ref={canvasRef} className="blueprint-canvas" />
      <div className="glass-background-container">
        {shapes.map(s => (
          <RefractiveShapePiece key={s.id} particle={s} bindDom={bindDomShape} />
        ))}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const skipCursor = useState(() =>
    typeof window !== 'undefined' &&
    ((window.matchMedia('(pointer: coarse)').matches) ||
      (window.matchMedia('(max-width: 768px)').matches)),
  )[0];
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (skipCursor) return undefined;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickSetter for hardware accelerated translation
    const cursorX = gsap.quickSetter(cursor, "x", "px");
    const cursorY = gsap.quickSetter(cursor, "y", "px");
    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    
    // Initial centering to work with the CSS
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    let isHovering = false;
    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const render = () => {
      cursorX(mouseX);
      cursorY(mouseY);
      dotX(mouseX);
      dotY(mouseY);
      rafId = null;
    };

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea, select, [role="button"]')) {
        if (!isHovering) {
          isHovering = true;
          cursor.classList.add('hovering');
        }
      } else if (isHovering) {
        isHovering = false;
        cursor.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [skipCursor]);

  if (skipCursor) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR — Floating pill, magnetic
// ─────────────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => setMobileOpen(false), [location]);

  const goSection = (id) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Research', to: '/research' },

    { label: 'Play', action: () => goSection('playground') },
  ];

  return (
    <>
      <div className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] items-center gap-1 p-1.5 glass rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl transition-all">
        {links.map(l => (
          l.to ? (
            <Link key={l.label} to={l.to} className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${location.pathname === l.to ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              {l.label}
            </Link>
          ) : (
            <button key={l.label} onClick={l.action} className="px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
              {l.label}
            </button>
          )
        ))}
        <div className="w-px h-5 bg-white/20 mx-2" />
        <Link to="/contact" className="px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-white/70 hover:bg-[#C75B39] hover:text-white transition-all duration-300">
          Contact
        </Link>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-4 right-4 z-[100]">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-[#0a0a12]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map(l => (
            l.to ? (
              <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)}
                className="font-display text-4xl font-bold text-white/70 hover:text-white transition-colors">
                {l.label}
              </Link>
            ) : (
              <button key={l.label} onClick={l.action}
                className="font-display text-4xl font-bold text-white/70 hover:text-white transition-colors bg-transparent border-none">
                {l.label}
              </button>
            )
          ))}
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-glow mt-4 px-8 py-4 text-base">
            Let's Talk
          </Link>
        </div>
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative z-10 pt-20 pb-10 px-6 md:px-10 border-t border-white/20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-display font-black text-2xl tracking-tight text-white mb-4">Daniel Ozoani</div>
          <p className="font-inter text-sm text-white/70 max-w-sm leading-relaxed mb-6">
            Developer, builder, chess player. Working on things that matter.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <Mail className="w-4 h-4" />, href: '/contact', isInternal: true },
              { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/daniel-ozoani-b20539252/', isInternal: false },
              { icon: <Github className="w-4 h-4" />, href: 'https://github.com/OzunaModelo123', isInternal: false },
            ].map((s, i) => (
              s.isInternal ? (
                <Link key={i} to={s.href}
                  className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all">
                  {s.icon}
                </Link>
              ) : (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all">
                  {s.icon}
                </a>
              )
            ))}
          </div>
        </div>
        {[
          { title: 'Work', items: [{ l: 'Projects', href: '/projects' }, { l: 'Research', href: '/research' }] },
          { title: 'Connect', items: [{ l: 'Contact', href: '/contact' }, { l: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-ozoani-b20539252/' }, { l: 'GitHub', href: 'https://github.com/OzunaModelo123' }] },
        ].map(col => (
          <div key={col.title}>
            <div className="font-mono text-[0.65rem] text-[#C75B39] tracking-widest uppercase mb-5">{col.title}</div>
            <ul className="space-y-3">
              {col.items.map(item => (
                <li key={item.l}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} className="font-inter text-sm text-white/70 hover:text-white transition-colors">{item.l}</Link>
                  ) : (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer" className="font-inter text-sm text-white/70 hover:text-white transition-colors">{item.l}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="section-divider mb-6 bg-white/20 h-px w-full" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="status-live bg-white/10 px-3 py-1.5 rounded-full border border-white/20 text-white/80">
          <span className="status-dot-green" />
          Available for opportunities
        </div>
        <div className="font-mono text-[0.65rem] text-white/50 tracking-widest">
          © {new Date().getFullYear()} Daniel Ozoani
        </div>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    let scheduled = false;

    const flush = () => {
      scheduled = false;
      const isVisible = window.scrollY > 400;
      if (isVisible === visibleRef.current) return;
      visibleRef.current = isVisible;
      setVisible(isVisible);
      gsap.to(btn, {
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    flush();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#C75B39]/50 hover:bg-[#C75B39]/10 transition-all duration-500 opacity-0 pointer-events-none group shadow-2xl"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      title="Scroll to top"
    >
      <div className="absolute inset-0 rounded-full bg-[#C75B39]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <ArrowUp className="w-6 h-6 relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      <PhysicsBackground />
      <CustomCursor />
      <Navbar />
      <main className="content-layer">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<WorkIndex />} />
            <Route path="/projects/recaller" element={<RecallerProject />} />
            <Route path="/projects/api-creations" element={<ApiCreationsProject />} />
            <Route path="/projects/social-wellness" element={<SocialAppsProject />} />
            <Route path="/projects/social-wellness/frameday" element={<FrameDayProject />} />

            <Route path="/research" element={<Research />} />
            <Route path="/research/it-migrations" element={<ITMigrations />} />
            <Route path="/research/ai-copilot" element={<AICopilot />} />
            <Route path="/research/digital-content-marketing" element={<DigitalContentMarketing />} />
            <Route path="/research/training-programs" element={<TrainingPrograms />} />
            <Route path="/research/construction-communication" element={<ConstructionComm />} />
            <Route path="/research/digital-transformation" element={<DigitalTransformation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <Analytics />
    </div>
  );
}
