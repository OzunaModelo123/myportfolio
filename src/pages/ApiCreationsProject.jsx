import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ExternalLink, Server, Database, Activity } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import BuildingSoonModal from '../components/BuildingSoonModal';
import { apiRapidComingSoonCopy } from '../content/buildingSoonCopy';

gsap.registerPlugin(ScrollTrigger);

const APICard = ({ api, isOpen, onToggle, onComingSoon, index }) => {
  const handleAccess = (e) => {
    e.stopPropagation();
    if (api.rapidUrl) {
      window.open(api.rapidUrl, '_blank', 'noopener,noreferrer');
    } else {
      onComingSoon();
    }
  };

  return (
    <div className={`reveal-item glass-light rounded-2xl overflow-hidden border transition-all duration-500 mb-4 ${isOpen ? 'border-[#5B8C6F]/50 shadow-[0_0_40px_rgba(91,140,111,0.15)] bg-white/[0.03]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'}`}>
      <button type="button" onClick={onToggle} className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none group">
        <div className="flex items-center gap-6">
          <span className="font-mono text-sm text-white/30 tracking-widest hidden md:block">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`font-display font-bold text-xl md:text-3xl transition-colors duration-300 ${isOpen ? 'text-[#5B8C6F]' : 'text-white group-hover:text-white/90'}`}>
            {api.name}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 flex-shrink-0 ${isOpen ? 'rotate-180 bg-[#5B8C6F]/20 border-[#5B8C6F]/50 text-[#5B8C6F]' : 'bg-white/5 border-white/10 text-white/50 group-hover:bg-white/10 group-hover:text-white'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-8 pt-2">
            <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
              <p className="font-inter text-lg text-white/70 leading-relaxed max-w-3xl">
                {api.desc}
              </p>
              <button
                type="button"
                onClick={handleAccess}
                className="btn-glass whitespace-nowrap group/btn relative overflow-hidden"
                style={{ borderColor: isOpen ? '#5B8C6F40' : undefined }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {api.rapidUrl ? 'View on RapidAPI' : 'Access API'}
                  <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#5B8C6F]/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              {['RESTful', 'JSON', 'Auth: Bearer'].map((badge, i) => (
                <span key={i} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full font-mono text-xs text-white/50 tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ApiCreationsProject() {
  const heroRef = useRef(null);
  const [openApiId, setOpenApiId] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

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

  const apis = [
    {
      id: 0,
      name: 'Review Aggregation API',
      desc: 'A high-throughput microservice that seamlessly aggregates user reviews from Google, Yelp, Trustpilot, and custom sources into a standardized, analyzable data stream.',
      rapidUrl: 'https://rapidapi.com/OzunaModelo123/api/review-aggregation',
    },
    {
      id: 1,
      name: 'Receipt & Invoice Parser API',
      desc: 'Leverages computer vision and OCR layers to extract structured financial data (totals, taxes, line items, vendors) from raw receipt and invoice images with high fidelity.',
      rapidUrl: 'https://rapidapi.com/OzunaModelo123/api/receiptparser',
    },
    { id: 2, name: 'AI Agent Tool API (MCP-ready)', desc: 'A sophisticated toolset built on the Model Context Protocol, allowing autonomous AI agents to easily discover, authenticate, and interact with your backend services.' },
    { id: 3, name: 'Local Business Data API', desc: 'Provides real-time, enriched metadata on local brick-and-mortar businesses, combining geospatial queries with operational metrics.' },
    { id: 4, name: 'Social Sentiment & Mention API', desc: 'Monitors targeted keywords across major social networks, applying NLP to quantify public sentiment, alert spikes, and track brand velocity.' },
    { id: 5, name: 'Compliance & Regulatory Alert API', desc: 'Constantly scans governmental and regulatory endpoints localized to your industry, emitting webhooks the moment a relevant compliance change is detected.' },
    { id: 6, name: 'Niche News & Content Scraper API', desc: 'A distributed scraping intelligence that crawls deeply specialized, hard-to-index forums and news sites to provide clean, structured content feeds.' },
  ];

  return (
    <div>
      <SEO
        title="API Creations & Microservices | Daniel Ozoani"
        description="Robust REST and MCP-ready APIs—enterprise microservices for data pipelines, scraping, sentiment, reviews, receipts, compliance, and AI agents."
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#5B8C6F] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="p-anim sec-tag mb-6" style={{ color: '#5B8C6F', borderColor: '#5B8C6F40' }}>API Creations & Infrastructure</div>
          <h1 className="p-anim font-display font-black text-[clamp(4rem,9vw,7rem)] text-white leading-[0.85] tracking-tight mb-6">Backend Systems & <br />Microservices</h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Architecting robust, scalable, and secure backend microservices designed for enterprise-level applications and AI-driven automation.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Production Ready</div>
              <div className="flex flex-wrap gap-2">
                {['REST API', 'Node.js', 'Python', 'Webhooks'].map(t => <span key={t} className="chip-dark">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div>
            <div className="reveal-item sec-tag mb-4">01 · The Approach</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-5xl text-white mb-6 tracking-tight">Built for scale.</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When building data pipelines and microservices, latency and reliability are non-negotiable. I focus on developing decoupled APIs that do one thing exceptionally well—whether it's scraping volatile niche news sources or providing a stable MCP layer for AI agents.
            </p>
            
            <div className="reveal-item grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                { icon: <Database className="w-6 h-6" />, title: 'High Availability', desc: 'Resilient architectures.' },
                { icon: <Server className="w-6 h-6" />, title: 'Decoupled', desc: 'Independent microservices.' },
                { icon: <Activity className="w-6 h-6" />, title: 'Low Latency', desc: 'Optimized event loops.' }
              ].map((f, i) => (
                <div key={i} className="glass rounded-2xl p-6 border border-white/5">
                  <div className="text-[#5B8C6F] mb-4">{f.icon}</div>
                  <div className="font-display font-bold text-white mb-1">{f.title}</div>
                  <div className="font-inter text-sm text-white/60">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="api-collection">
            <div className="reveal-item sec-tag mb-4">02 · API Collection</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-5xl text-white mb-6 tracking-tight">The Services I've Built.</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-12">
              A curated suite of specialized APIs designed for robust data extraction, aggregation, and AI augmentation. Click to explore the underlying functionality of each service.
            </p>
            
            <div className="flex flex-col gap-2">
              {apis.map((api, index) => (
                <APICard
                  key={api.id}
                  api={api}
                  index={index}
                  isOpen={openApiId === api.id}
                  onToggle={() => setOpenApiId(openApiId === api.id ? null : api.id)}
                  onComingSoon={() => setShowComingSoon(true)}
                />
              ))}
            </div>
          </div>
          
        </div>
      </section>

      <section className="reveal-section py-20 px-6 md:px-10 mt-10">
        <div className="max-w-4xl mx-auto rounded-3xl glass p-10 md:p-16 border border-[#5B8C6F]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B8C6F]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Need a custom API?</h2>
              <p className="font-inter text-white/70 max-w-md">
                I regularly build specialized integrations, scrapers, and data pipelines for evolving business needs. Let's see if we can solve your data problem.
              </p>
            </div>
            <Link to="/contact" className="btn-glow flex-shrink-0" style={{ '--glow-color': '#5B8C6F' }}>
              Discuss Architecture <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <BuildingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} {...apiRapidComingSoonCopy} />

    </div>
  );
}
