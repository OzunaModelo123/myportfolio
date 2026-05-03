'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Sarah K. · Engineering', score: 94, label: 'Field Ready', color: '#5B8C6F' },
    { id: 2, name: 'Marcus T. · Sales', score: 42, label: 'High Risk', color: '#C75B39' },
    { id: 3, name: 'Priya M. · Support', score: 77, label: 'Improving', color: '#8B7EC8' },
  ]);
  useEffect(() => { const id = setInterval(() => { setItems(p => { const n = [...p]; n.unshift(n.pop()); return n; }); }, 2800); return () => clearInterval(id); }, []);
  return (
    <div className="relative h-48 w-full">
      {items.map((item, i) => (
        <div key={item.id} className="absolute inset-x-0 p-4 glass rounded-2xl"
          style={{ transform: `translateY(${i * 18}px) scale(${1 - i * 0.04})`, opacity: 1 - i * 0.3, zIndex: 10 - i, transition: 'all 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div className="flex justify-between items-start mb-2">
            <span className="font-mono text-[0.6rem] text-white/70 tracking-wider">Readiness Score</span>
            <span className="font-mono text-[0.6rem] font-semibold" style={{ color: item.color }}>{item.label}</span>
          </div>
          <div className="font-display font-extrabold text-3xl" style={{ color: item.color }}>{item.score}<span className="text-lg">%</span></div>
          <div className="font-inter text-xs text-white/70 mt-1">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

const TypewriterCard = () => {
  const lines = ['> Scanning team readiness...', '> ALERT: User #402: 89% confident, 34% accurate', '> Pattern: ERROR-GANCE DETECTED ⚠', '> Topic: Safety Protocol Verification', '> Risk: CRITICAL, auto-escalated to manager', '> Re-assessment scheduled in 48 hours...', '', '> Scanning next cohort...'];
  const full = lines.join('\n');
  const [shown, setShown] = useState('');
  const [i, setI] = useState(0);
  useEffect(() => { if (i < full.length) { const t = setTimeout(() => { setShown(full.slice(0, i + 1)); setI(v => v + 1); }, 25); return () => clearTimeout(t); } else { const t = setTimeout(() => { setShown(''); setI(0); }, 2000); return () => clearTimeout(t); } }, [i, full]);
  return (
    <div className="h-52 w-full glass rounded-2xl p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/8">
        <div className="w-2.5 h-2.5 bg-[#C75B39] rounded-full" style={{ animation: 'pulseG 1.5s ease-in-out infinite', boxShadow: '0 0 10px rgba(199,91,57,0.6)' }} />
        <span className="font-mono text-[0.55rem] text-white/70 tracking-widest uppercase">Live · Sentinel AI</span>
      </div>
      <div className="font-mono text-[0.65rem] text-[#C75B39]/90 whitespace-pre-line leading-[1.8] flex-1 overflow-y-auto">
        {shown}<span className="inline-block w-0.5 h-[1.1em] bg-[#C75B39] ml-0.5 align-text-bottom" style={{ animation: 'blink 1s step-end infinite' }} />
      </div>
      <style>{`@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`}</style>
    </div>
  );
};

export default function Projects() {
  const heroRef = useRef(null);

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

  const features = [
    { num: '01', tag: 'Readiness Intelligence', title: 'The Readiness Score', body: "Instead of just checking off who watched a video, Recaller figures out an actual Readiness Score. It tracks accuracy and retention, turning it into one metric you can trust.", card: <ShufflerCard /> },
    { num: '02', tag: 'Risk Detection', title: '"Error-gance" Radar', body: "The scariest employee isn't the one who admits they don't know something, it's the one who is completely wrong but entirely confident. Recaller points out these dangerous high-confidence / low-accuracy patterns before they become an issue.", card: <TypewriterCard /> },
    {
      num: '03', tag: 'Conversational AI', title: 'Just DM the Bot', body: 'If an employee gets stuck, they can just DM the Recaller bot directly in Slack. The AI digs through the company training library and instantly replies with the exact video clip they need. No context switching, just quick answers.',
      card: <div className="h-52 glass rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(199,91,57,0.12)', border: '1px solid rgba(199,91,57,0.2)' }}>
            <MessageSquare className="w-3.5 h-3.5 text-[#C75B39]" />
          </div>
          <span className="font-mono text-[0.58rem] text-white/70">Recaller Bot · Slack</span>
        </div>
        <div className="flex-1 space-y-2.5 overflow-hidden">
          {[{ me: true, text: "I'm confused about the safety verification step" }, { me: false, text: '⚡ Found it. Jump to 3:42 in "Site Safety Module 2". The step is at 4:18 with examples.' }].map((m, i) => (
            <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2.5 rounded-2xl text-[0.7rem] font-inter max-w-[80%] leading-relaxed ${m.me ? 'bg-[#C75B39]/20 text-white/90' : 'glass-light text-white/80'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[0.55rem] text-white/60">Avg response: &lt;3 seconds</div>
      </div>
    },
    {
      num: '04', tag: 'ROI Proof Engine', title: 'Actually prove it works', body: "We test employees before a course, let them learn, wait a few weeks, and then test them again. The final result is a verifiable percentage showing exactly how much knowledge they actually retained.",
      card: <div className="h-52 glass rounded-2xl p-4 flex flex-col justify-between">
        <div className="font-mono text-[0.58rem] text-[#C75B39] tracking-widest mb-3">ROI Dashboard · Knowledge Delta</div>
        {[{ label: 'Safety Protocols', before: 42, after: 88, gain: '+46%' }, { label: 'Product Knowledge', before: 55, after: 91, gain: '+36%' }, { label: 'Compliance Basics', before: 61, after: 94, gain: '+33%' }].map((r, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-inter text-[0.62rem] text-white/70">{r.label}</span>
              <span className="font-mono text-[0.62rem] text-[#5B8C6F] font-semibold">{r.gain}</span>
            </div>
            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-white/10 rounded-full" style={{ width: `${r.before}%` }} />
              <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${r.after}%`, background: 'linear-gradient(90deg, #C75B39, #E8856E)' }} />
            </div>
          </div>
        ))}
      </div>
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0a0a12]/60 to-[#0a0a12]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link href="/projects" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#C75B39] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
          <div className="p-anim sec-tag mb-6">B2B SaaS · Training Intelligence</div>
          <h1 className="p-anim font-display font-black text-[clamp(5rem,14vw,10rem)] text-white leading-[0.85] tracking-[-0.04em] mb-4">Recaller</h1>
          <div className="p-anim font-serif italic text-[clamp(1.5rem,4vw,2.8rem)] text-[#C75B39] leading-[1.1] mb-8">Training ROI & Readiness Intelligence.</div>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              I noticed companies were burning millions on training without actually knowing if any of it worked. So, I built Recaller to figure that out.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Core platform built · In staging</div>
              <div className="flex flex-wrap gap-2">
                {['Slack', 'MS Teams', 'Email', 'AI'].map(t => <span key={t} className="chip-dark">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="reveal-section py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ val: '10s', l: 'Per micro-assessment' }, { val: '3', l: 'Platforms supported' }, { val: '0', l: 'New logins required' }, { val: '∞', l: 'ROI provability' }].map(s => (
            <div key={s.l} className="reveal-item glass-light rounded-2xl p-5">
              <div className="font-display font-extrabold text-4xl text-[#C75B39] mb-1">{s.val}</div>
              <div className="font-mono text-[0.6rem] text-white/70 tracking-widest uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="reveal-section py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="reveal-item sec-tag mb-8">The Problem</div>
            <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-white leading-[0.95] tracking-tight">
              "Completion" is not a <span className="font-serif italic text-[#C75B39]">learning outcome.</span>
            </h2>
          </div>
          <div className="reveal-item space-y-4">
            <p className="font-inter text-base text-white/90 max-w-prose leading-relaxed">Usually, L&D teams just throw training videos into clunky portals and measure 'success' by whether someone clicked play. But honestly, almost nobody is measuring if that knowledge actually stuck or changed behavior.</p>
            {['Employees ignore separate training portals', "Confidence gaps go undetected until it's too late", "L&D can't prove their impact with data"].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C75B39] mt-2 flex-shrink-0" />
                <span className="font-inter text-sm text-white/70">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="reveal-section py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item sec-tag mb-6">Features</div>
          <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-white leading-[0.95] tracking-tight mb-16">What Recaller actually does.</h2>
          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i} className="reveal-item project-card p-8 md:p-10 group">
                <div className="card-glow" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(199,91,57,0.06), transparent 70%)' }} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-mono text-[0.6rem] text-[#C75B39] tracking-widest">{f.num}</span>
                      <div className="chip-dark">{f.tag}</div>
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">{f.title}</h3>
                    <p className="font-inter text-base text-white/90 leading-relaxed max-w-prose">{f.body}</p>
                  </div>
                  <div>{f.card}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="reveal-section py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item sec-tag mb-6">How It Works</div>
          <h2 className="reveal-item font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-white leading-[0.95] tracking-tight mb-14">The Recaller loop.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '01', title: 'It lives in Slack & Teams', desc: 'No new portal. 10-second assessments arrive where employees already are.', color: '#C75B39' },
              { n: '02', title: 'Data maps the gap', desc: 'Every response (accuracy, confidence, speed) feeds the readiness engine.', color: '#8B7EC8' },
              { n: '03', title: 'ROI gets a number', desc: 'Before/after testing produces a hard knowledge-gain percentage.', color: '#5B8C6F' },
            ].map((s, i) => (
              <div key={i} className="reveal-item glass-light rounded-2xl p-7 flex flex-col gap-6 group hover:border-[#C75B39]/20 transition-all duration-500 hoverable">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-black text-xl text-white" style={{ background: s.color }}>{s.n}</div>
                <div>
                  <h4 className="font-display font-bold text-xl text-white/80 mb-3 group-hover:text-white transition-colors">{s.title}</h4>
                  <p className="font-inter text-sm text-white/80 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.92] tracking-tight mb-6">
            Curious to see<br />more of Recaller?
          </h2>
          <p className="font-inter text-base text-white/90 max-w-prose mx-auto mb-10 leading-relaxed">
            I'm always happy to walk through the architecture, discuss a potential pilot, or just geek out about the code.
          </p>
          <Link href="/contact" className="btn-glow">
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
