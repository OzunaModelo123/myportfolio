import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import BuildingSoonModal from '../components/BuildingSoonModal';
import { buildingSoonVariants } from '../content/buildingSoonCopy';

gsap.registerPlugin(ScrollTrigger);

export default function SocialAppsProject() {
  const heroRef = useRef(null);
  const [portfolioPeek, setPortfolioPeek] = useState(false);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.p-anim');
    if (els) { gsap.set(els, { opacity: 0, y: 40 }); gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.15 }); }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.reveal-section').forEach(section => {
      const els = section.querySelectorAll('.reveal-item');
      if (els.length) { gsap.set(els, { opacity: 0, y: 45 }); ScrollTrigger.create({ trigger: section, start: 'top 80%', onEnter: () => gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' }), once: true }); }
    });
  }, []);

  const apps = [
    {
      name: 'FrameDay',
      tag: 'Mindful Camera',
      color: '#8B7EC8',
      desc: 'Daily photo prompts engineered to unplug the autopilot doomscroll. Collaboration without clout-farming.',
      href: '/projects/social-wellness/frameday',
      icon: <Camera className="w-8 h-8" />,
    },
    {
      name: 'More mindful experiments',
      tag: 'Social lab · Teaser',
      color: '#C75B39',
      desc: 'More consent-forward prompts, tiny cohort rituals, journaling experiments that still feel good on day seven, not just launch-day fireworks.',
      icon: <Sparkles className="w-8 h-8" />,
      teaser: true,
    },
  ];

  return (
    <div>
      <SEO
        title="Social Wellness | Daniel Ozoani"
        description="Social experiments centered on dopamine hygiene. Starting with mindful camera rituals like FrameDay."
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/projects" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-white transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
          <div className="p-anim sec-tag mb-6" style={{ color: '#8B7EC8', borderColor: '#8B7EC840' }}>Social Wellness</div>
          <h1 className="p-anim font-display font-black text-[clamp(4rem,9vw,7rem)] text-white leading-[0.85] tracking-tight mb-6">Social Wellness</h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Petri dishes for humane social UX: timing, consent, boredom treated as signal. First public slice is FrameDay, more weirdness once I trust the infra.
            </p>
          </div>
        </div>
      </section>

      <section className="reveal-section py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {apps.map((app, i) => {
            const inner = (
              <div className="glass h-full rounded-[2rem] p-8 md:p-12 border border-white/10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(139,126,200,0.15)]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle at 100% 100%, ${app.color}15, transparent 70%)` }} />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-lg" style={{ backgroundColor: `${app.color}15`, borderColor: `${app.color}40`, color: app.color }}>
                        {app.icon}
                      </div>
                      <div className="chip-dark text-xs" style={{ borderColor: `${app.color}30`, color: app.color }}>{app.tag}</div>
                    </div>
                    <h2
                      className="font-display font-bold text-4xl text-white mb-4 transition-colors duration-500"
                      style={{ '--hover-color': app.color }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = app.color; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}
                    >
                      {app.name}
                    </h2>
                    <p className="font-inter text-lg text-white/70 leading-relaxed max-w-md">
                      {app.desc}
                    </p>
                  </div>
                  <div className="mt-12 flex items-center gap-2 font-inter text-sm font-semibold transition-colors duration-300" style={{ color: app.color }}>
                    {app.teaser ? 'More soon (no fake doors)' : 'See how FrameDay thinks'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            );

            return app.href ? (
              <Link key={i} to={app.href} className="reveal-item block group">
                {inner}
              </Link>
            ) : (
              <button key={i} type="button" className="reveal-item block w-full group text-left bg-transparent border-0 p-0 cursor-pointer" onClick={() => setPortfolioPeek(true)}>
                {inner}
              </button>
            );
          })}
        </div>
      </section>

      <BuildingSoonModal
        open={portfolioPeek}
        onClose={() => setPortfolioPeek(false)}
        {...buildingSoonVariants.portfolio}
        secondarySlot={(
          <Link
            to="/projects"
            onClick={() => setPortfolioPeek(false)}
            className="text-sm font-semibold underline underline-offset-4 decoration-white/25 hover:text-white transition-colors"
            style={{ color: buildingSoonVariants.portfolio.accentColor }}
          >
            Shuffle back to Projects
          </Link>
        )}
      />
    </div>
  );
}
