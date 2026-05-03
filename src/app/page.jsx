import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, Target, Code2, Zap, Crown } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ChessPlayground = React.lazy(() => import('@/components/ChessPlayground'));
const ParticlePlayground = React.lazy(() => import('@/components/ParticlePlayground'));
const AnimatedAtom = React.lazy(() => import('@/components/AnimatedAtom'));

gsap.registerPlugin(ScrollTrigger);

// Custom SVG icons
const Brain = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /></svg>;
const Rocket = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.76.22-2.09-.45-2.77a2.14 2.14 0 0 0-2.55-.23z" /><path d="m3.29 15 2.85.91L12 10l-.91-2.85" /><path d="M6.3 11.7A8 8 0 0 1 20.5 3.5S21 8 18 11l-5 5c-3 3-7.5 3.5-7.5 3.5" /></svg>;
const Lightbulb = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
const Coffee = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>;



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


// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const atomRef = useRef(null);
  const heroRectRef = useRef(null);
  const [playgroundMode, setPlaygroundMode] = useState('particles'); // 'particles' or 'chess'
  const [age, setAge] = useState(24); // Default to avoid flash, will update in useEffect

  useEffect(() => {
    const birthDate = new Date('2002-02-24');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);

    const handleResize = () => { heroRectRef.current = null; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current || !atomRef.current) return;
    if (!heroRectRef.current) {
      heroRectRef.current = heroRef.current.getBoundingClientRect();
    }
    const { left, top, width, height } = heroRectRef.current;
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
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full viewport with background image + physics overlay
          ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-[100dvh] flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Animated Custom Atom Simulation replacing the camera image */}
        <Suspense fallback={null}><AnimatedAtom atomRef={atomRef} /></Suspense>
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
                { icon: <Zap className="w-6 h-6" />, title: 'Cinematography', sub: 'Framing the perfect shot', color: '#4A90D9' },
              ].map((c, i) => (
                <div key={i}
                  className="glass-light rounded-2xl p-6 flex flex-col gap-3 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  style={{ border: `1px solid ${c.color}20` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 100% 0%, ${c.color}, transparent)` }} />
                  <span style={{ color: c.color }} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 w-fit drop-shadow-lg">{c.icon}</span>
                  <div>
                    <div className="font-display font-bold text-lg text-white mb-1 tracking-wide">{c.title}</div>
                    <div className="font-inter text-sm text-white/80 leading-relaxed">{c.sub}</div>
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
              {playgroundMode === 'particles' ? <Suspense fallback={null}><ParticlePlayground /></Suspense> : <Suspense fallback={null}><ChessPlayground /></Suspense>}
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
