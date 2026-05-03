import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function WorkIndex() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.w-anim');
    if (els) { gsap.set(els, { opacity: 0, y: 35 }); gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.15 }); }
  }, []);

  const projects = [
    {
      num: '01', name: 'Recaller', tag: 'B2B SaaS',
      desc: 'Training intelligence that proves ROI. 10-second Slack assessments reveal who actually knows their stuff.',
      color: '#C75B39', href: '/projects/recaller',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2560'
    },
    {
      num: '02', name: 'API Creations', tag: 'Infrastructure',
      desc: 'Architecting robust, scalable, and secure backend microservices for enterprise-level applications.',
      color: '#5B8C6F', href: '/projects/api-creations',
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2560'
    },
    {
      num: '03', name: 'Social Wellness', tag: 'Intentional Social',
      desc: 'Building products that elevate user psychology. Focusing on mindfulness and intentional interaction through daily photography.',
      color: '#8B7EC8', href: '/projects/social-wellness',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2560'
    }
  ];

  return (
    <div>
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="w-anim sec-tag mb-6 text-white/80">Portfolio Index</div>
          <h1 className="w-anim font-display font-black text-[clamp(4rem,12vw,8rem)] text-white leading-[0.88] tracking-tight mb-5">
            Projects <br /><span className="text-white drop-shadow-lg">I am working on.</span>
          </h1>
          <p className="w-anim font-inter text-base md:text-xl text-white/90 max-w-prose leading-relaxed">
            A categorized look at my professional engineering and product management work. From robust infrastructure to consumer-facing applications.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {projects.map((p, i) => (
            <Link key={i} to={p.href} className="block project-card group overflow-hidden rounded-3xl border border-white/20 transition-all duration-500 hover:border-white/40">
              <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}08, transparent 70%)` }} />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
                <div className="h-56 md:h-full w-full">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between glass-light">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-mono text-xs text-white/70 tracking-widest">{p.num}</span>
                      <div className="chip-dark" style={{ color: p.color, borderColor: `${p.color}40` }}>{p.tag}</div>
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4 group-hover:text-[#C75B39] transition-colors">{p.name}</h3>
                    <p className="font-inter text-base text-white/90 leading-relaxed max-w-prose">{p.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 font-inter text-sm font-semibold mt-6" style={{ color: p.color }}>
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
