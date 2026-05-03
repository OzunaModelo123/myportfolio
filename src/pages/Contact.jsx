import React, { useEffect, useRef } from 'react';
import { Mail, Briefcase, Coffee, Github, Linkedin, Copy, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import SEO from '../components/SEO';

export default function Contact() {
  const containerRef = useRef(null);
  const [copiedWork, setCopiedWork] = React.useState(false);
  const [copiedPersonal, setCopiedPersonal] = React.useState(false);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.reveal-item');
    if (els) {
      gsap.fromTo(els, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  const handleCopy = async (email, type) => {
    try {
      if (!navigator.clipboard?.writeText) return;
      await navigator.clipboard.writeText(email);
      if (type === 'work') {
        setCopiedWork(true);
        setTimeout(() => setCopiedWork(false), 2000);
      } else {
        setCopiedPersonal(true);
        setTimeout(() => setCopiedPersonal(false), 2000);
      }
    } catch {
      // Clipboard can fail without user gesture or permissions; fail silently
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-6 md:px-10 relative overflow-hidden flex items-center justify-center">
      <SEO title="Contact | Daniel Ozoani" description="Get in touch with Daniel Ozoani. Two inboxes: one for work and contracts, one for everything else." />
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5B8C6F]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C75B39]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="reveal-item font-display font-black text-[clamp(3rem,8vw,6rem)] text-white leading-none tracking-tight mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8C6F] to-[#8A9A8F]">touch.</span>
          </h1>
          <p className="reveal-item font-inter text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Two inboxes. Work stuff goes to the work one, everything else goes to the personal one. Both get read.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Work / Business */}
          <div className="reveal-item group relative p-10 md:p-12 glass rounded-3xl border border-white/10 hover:border-[#5B8C6F]/30 transition-all duration-500 overflow-hidden flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5B8C6F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-grow">
              <div className="w-14 h-14 rounded-full bg-[#5B8C6F]/10 flex items-center justify-center text-[#5B8C6F] mb-8 border border-[#5B8C6F]/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-4">Business & engagements</h2>
              <p className="font-inter text-white/60 leading-relaxed mb-8">
                Contracts, B2B stuff, timelines, RACI, budgets. Basically anything formal.
              </p>
            </div>
            
            <div className="relative z-10 mt-auto">
              <a 
                href="mailto:bezalel@danbuilds.work" 
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white/5 hover:bg-[#5B8C6F]/20 border border-white/10 hover:border-[#5B8C6F]/40 text-white font-inter font-medium transition-all duration-300 mb-3"
              >
                <Mail className="w-4 h-4" /> Email bezalel@danbuilds.work
              </a>
              <button 
                onClick={() => handleCopy('bezalel@danbuilds.work', 'work')}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white font-inter text-sm transition-all duration-300"
              >
                {copiedWork ? <CheckCircle2 className="w-4 h-4 text-[#5B8C6F]" /> : <Copy className="w-4 h-4" />}
                {copiedWork ? 'Copied to clipboard' : 'Copy: bezalel@danbuilds.work'}
              </button>
            </div>
          </div>

          {/* Personal / Connect */}
          <div className="reveal-item group relative p-10 md:p-12 glass rounded-3xl border border-white/10 hover:border-[#C75B39]/30 transition-all duration-500 overflow-hidden flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C75B39]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-grow">
              <div className="w-14 h-14 rounded-full bg-[#C75B39]/10 flex items-center justify-center text-[#C75B39] mb-8 border border-[#C75B39]/20">
                <Coffee className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-4">General & personal</h2>
              <p className="font-inter text-white/60 leading-relaxed mb-8">
                Questions about tools, collaboration ideas, film, side projects. Anything that doesn’t need a SOW.
              </p>
            </div>
            
            <div className="relative z-10 mt-auto">
              <a
                href="mailto:ozoanibarzali@gmail.com"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white/5 hover:bg-[#C75B39]/20 border border-white/10 hover:border-[#C75B39]/40 text-white font-inter font-medium transition-all duration-300 mb-3"
              >
                <Mail className="w-4 h-4" /> Email ozoanibarzali@gmail.com
              </a>
              <button
                type="button"
                onClick={() => handleCopy('ozoanibarzali@gmail.com', 'personal')}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white font-inter text-sm transition-all duration-300"
              >
                {copiedPersonal ? <CheckCircle2 className="w-4 h-4 text-[#C75B39]" /> : <Copy className="w-4 h-4" />}
                {copiedPersonal ? 'Copied to clipboard' : 'Copy: ozoanibarzali@gmail.com'}
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="reveal-item flex flex-col items-center justify-center border-t border-white/10 pt-12">
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">Profiles</p>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/daniel-ozoani-b20539252/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-full glass hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="font-inter text-sm text-white/70 group-hover:text-white transition-colors">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/OzunaModelo123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-full glass hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              <span className="font-inter text-sm text-white/70 group-hover:text-white transition-colors">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
