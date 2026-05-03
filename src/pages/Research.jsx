import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const BookOpen = ({ className = '' }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;

export default function Research() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.r-anim');
    if (els) { gsap.set(els, { opacity: 0, y: 35 }); gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.15 }); }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.reveal-section').forEach(section => {
      const els = section.querySelectorAll('.reveal-item');
      if (els.length) { gsap.set(els, { opacity: 0, y: 45 }); ScrollTrigger.create({ trigger: section, start: 'top 80%', onEnter: () => gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' }), once: true }); }
    });
  }, []);

  const papers = [
    {
      tag: 'Research · Digital Marketing', title: 'How Digital Content Has Transformed and Reshaped Marketing', desc: 'How digital content has transformed and reshaped marketing across six distinct eras, from the first clickable banner ad in 1994 to the AI-augmented content landscape of today.',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800', status: 'Published', color: '#8B7EC8', tags: ['Content Strategy', 'Digital Marketing', 'History'], link: '/research/digital-content-marketing'
    },
    {
      tag: 'Research · Behavioral Psychology', title: 'The Psychology of Resistance to Change', desc: 'Why our brains fight the future. An exploration of the biological and psychological friction points that make technology adoption a human challenge first.',
      img: 'https://miro.medium.com/v2/resize:fit:1190/format:webp/1*I3J-lTJobQSk_1LLVesRog.jpeg', status: 'Published', color: '#8B7EC8', tags: ['IT Migrations', 'Psychology', 'Change Management'], link: '/research/it-migrations'
    },
    {
      tag: 'Research · AI Systems', title: "AI as a Project Manager's Co-Pilot", desc: 'A balanced analysis of tools like Claude, Copilot, and Notion AI in real project workflows. Where it helps and where it falls short.',
      img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800', status: 'Published', color: '#C75B39', tags: ['AI', 'Project Management'], link: '/research/ai-copilot'
    },
    {
      tag: 'Research · Corporate L&D', title: 'Why Training Programs Fail', desc: 'Most corporate training gets forgotten within a week. Research the science behind behavioral change—what makes skills stick.',
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800', status: 'Published', color: '#5B8C6F', tags: ['L&D', 'Behavioral Science'], link: '/research/training-programs'
    },
    {
      tag: 'Research · Operations & Systems', title: 'The Hidden Cost Of Poor Communication', desc: 'Why tech debt is usually just talk debt. An analysis of the information degradation that happens across a product\'s lifecycle.',
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', status: 'Published', color: '#E8856E', tags: ['Technical PM', 'Lifecycle Management', 'Strategy'], link: '/research/construction-communication'
    },
    {
      tag: 'Research · Product Operations', title: 'Surviving the Retail Refresh', desc: 'How to upgrade store tech without killing sales or your team’s sanity. A playbook for high-stakes physical rollouts.',
      img: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfgn1zOnonl-Ca8Rxqi-Z1zq1WMgEZ83aquMduBhgOuygAng3nue0YChY_RtuGHK0nF0GFwVrNSWheOt-_pjNZxiA7v4LiaiKQ683tjbClpdvoW1lbkDfhzfONfa18e-7qSbgmXHg?key=_kxf0ddm8skc95IVUND_lYGk', status: 'Published', color: '#4A90D9', tags: ['Retail', 'Product Operations', 'Strategy'], link: '/research/digital-transformation'
    },
  ];

  return (
    <div>
      <SEO title="Daniel Ozoani | Research" description="Articles and research on IT Migrations, AI Systems, and Corporate L&D." />
      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/" className="r-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#C75B39] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back home
          </Link>
          <div className="r-anim sec-tag mb-6">Research & Writing</div>
          <h1 className="r-anim font-display font-black text-[clamp(4rem,12vw,8rem)] text-white leading-[0.88] tracking-tight mb-5">
            Things I'm<br /><span className="text-[#C75B39] drop-shadow-xl inline-block mt-2">thinking about.</span>
          </h1>
          <p className="r-anim font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
            I use this space to dump my research notes, product teardowns, and ongoing case studies. Just raw thoughts, no fluff.
          </p>
        </div>
      </section>

      {/* Papers grid */}
      <section className="reveal-section py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item sec-tag mb-5">Papers & Projects</div>
          <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-white leading-[0.95] tracking-tight mb-14">Published research.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {papers.map((p, i) => (
              <Link to={p.link} key={i} className="reveal-item project-card group overflow-hidden rounded-3xl border border-white/20 transition-all duration-500 hover:border-white/40 flex flex-col">
                <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}08, transparent 70%)` }} />
                <div className="h-48 relative flex-shrink-0">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/20 to-transparent" />
                  <span className="absolute top-4 right-4 font-mono text-[0.58rem] px-2.5 py-1 rounded-full glass" style={{ color: p.color }}>{p.status}</span>
                </div>
                <div className="p-6 flex flex-col gap-2.5 glass-light flex-1">
                  <span className="font-mono text-[0.58rem] text-white/90 tracking-widest uppercase">{p.tag}</span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#C75B39] transition-colors">{p.title}</h3>
                  <p className="font-inter text-sm text-white/90 leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tags.map(t => <span key={t} className="chip-dark text-[0.55rem]" style={{ color: p.color, borderColor: `${p.color}40` }}>{t}</span>)}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm font-inter mt-2 hover:text-white transition-colors">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,4.5rem)] text-white leading-[0.95] tracking-tight mb-5">Want to follow along?</h2>
          <p className="font-inter text-base text-white/90 max-w-prose mx-auto leading-relaxed mb-10">
            If you want, just shoot me an email and I'll notify you whenever I post something new. I completely hate newsletter spam, so don't worry about that.
          </p>
          <Link to="/contact" className="btn-glow">
            Count me in <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
