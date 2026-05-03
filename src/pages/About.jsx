import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MapPin, ExternalLink, ChevronDown, ChevronUp, GraduationCap, Award, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SkillBadge = ({ label, color }) => (
  <span
    className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wide border transition-all duration-300 hover:-translate-y-0.5 inline-block"
    style={{ color, borderColor: `${color}35`, background: `${color}0a` }}
  >
    {label}
  </span>
);

const TimelineCard = ({ company, role, period, summary, bullets, color, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: index * 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
    );
  }, [index]);

  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-[#1a1a2e]"
        style={{ background: color, boxShadow: `0 0 14px ${color}70` }} />
      <div
        className="glass-light rounded-2xl p-6 border cursor-pointer group transition-all duration-400 hover:border-opacity-50"
        style={{ borderColor: `${color}25` }}
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[0.58rem] tracking-widest uppercase block mb-1" style={{ color }}>{period}</span>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{company}</h3>
            <p className="font-inter text-sm mt-0.5" style={{ color }}>{role}</p>
            <p className="font-inter text-sm text-white/65 mt-3 leading-relaxed">{summary}</p>
          </div>
          <button className="shrink-0 w-7 h-7 rounded-full glass flex items-center justify-center text-white/30 group-hover:text-white/70 transition-colors mt-1">
            {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
        {open && (
          <ul className="mt-4 pt-4 border-t border-white/08 space-y-2.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 font-inter text-sm text-white/65 leading-relaxed">
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, tag, desc, color, to, external }) => (
  <Link
    to={to}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="group block glass-light rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
    style={{ borderColor: `${color}20` }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(circle at 0% 0%, ${color}0a, transparent 65%)` }} />
    <div className="flex items-start justify-between mb-3">
      <span className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color }}>{tag}</span>
      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
    </div>
    <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-[#C75B39] transition-colors leading-tight">{title}</h3>
    <p className="font-inter text-sm text-white/60 leading-relaxed">{desc}</p>
  </Link>
);

export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.h-anim');
    if (els?.length) {
      gsap.set(els, { opacity: 0, y: 28 });
      gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.15 });
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.sr').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%', once: true } }
      );
    });
  }, []);

  const skillGroups = [
    {
      label: 'Project Management',
      color: '#C75B39',
      skills: ['End-to-End Delivery', 'RAID Governance', 'Risk & Schedule', 'Budget Tracking', 'Change Control'],
    },
    {
      label: 'Technology & Systems',
      color: '#4A90D9',
      skills: ['SaaS Implementation', 'IT Infrastructure', 'Systems Integration', 'POS & Retail Tech', 'API Config'],
    },
    {
      label: 'Leadership & Comms',
      color: '#5B8C6F',
      skills: ['Stakeholder Mgmt', 'Cross-Team Coordination', 'Executive Reporting', 'Vendor Management'],
    },
    {
      label: 'Tools',
      color: '#8B7EC8',
      skills: ['Jira', 'Asana', 'MS Project', 'Freshdesk', 'SharePoint', 'Microsoft Office'],
    },
  ];

  const experiences = [
    {
      company: 'Elevated Project Management',
      role: 'Technical Project Manager',
      period: 'Jan 2024 to Nov 2025',
      color: '#C75B39',
      summary: 'Contributed to end-to-end delivery across retail technology deployments and enterprise SaaS migrations. My focus was on supporting budgets, cross-functional teams, and stakeholder communication.',
      bullets: [
        'Helped coordinate a major retail launch for a Global Luxury Fashion Brand at Yorkdale Mall. This included IT infrastructure, POS refresh, and vendor procurement, resulting in zero post-launch defects.',
        'Played a key role in a multiple six-figure enterprise SaaS migration (Outlook to Freshdesk), maintaining tight budget variance and supporting a 30% growth in tracked sales revenue post-launch.',
        'Contributed to improving team delivery efficiency by 60% YoY through structured RAID governance and proactive risk mitigation strategies.',
      ],
    },
    {
      company: 'AG Retail',
      role: 'IT Implementation & Operations Coordinator',
      period: 'Sep 2021 to May 2023',
      color: '#4A90D9',
      summary: 'Assisted in managing the full lifecycle of multi-site retail buildouts, from construction and fit-out through technology deployment across multiple locations.',
      bullets: [
        'Supported the coordination of building modifications, POS software selection, hardware staging, and tech rollouts across active sites.',
        'Helped increase automated workflow efficiency by 30% per quarter through structured process refinement and coordination.',
        'Maintained a live RAID log and assisted in delivering weekly RAG status reports to executive leadership.',
      ],
    },
    {
      company: 'Crown Homes',
      role: 'Construction Site & Procurement Coordinator',
      period: 'Nov 2020 to Aug 2021',
      color: '#5B8C6F',
      summary: 'Supported construction project operations, including material estimation, vendor procurement, site inspections, and inventory management.',
      bullets: [
        'Prepared detailed estimation records for key building materials to support cost planning and budget management.',
        'Assisted in sourcing, purchasing, and coordinating supplier deliveries aligned with active project schedules.',
        'Conducted regular site inspections alongside the primary team to monitor progress, material usage, and operational risks.',
      ],
    },
    {
      company: 'National Hospital',
      role: 'IT Coordinator / Project Support',
      period: '2019 to 2020',
      color: '#E8856E',
      summary: 'Supported technical infrastructure and coordinated IT projects within a fast-paced healthcare environment.',
      bullets: [
        'Assisted in deploying and maintaining critical hospital IT systems and hardware.',
        'Collaborated with medical and administrative staff to troubleshoot and resolve technical issues efficiently.',
        'Contributed to the planning and execution of internal technology upgrades to ensure minimal downtime for patient care services.',
      ],
    },
  ];

  const corporateProjects = [
    {
      title: 'Global Luxury Fashion Brand',
      tag: 'Retail Deployment · 2024',
      desc: 'Supported end-to-end coordination of a high-profile luxury store opening. Assisted with IT, POS, procurement, and vendor management from pre-build through handover.',
      color: '#C75B39',
      to: '/projects',
    },
    {
      title: 'Enterprise SaaS Migration',
      tag: 'Outlook to Freshdesk · 2024 to 2025',
      desc: 'Key contributor to the delivery of a CRM platform migration. Supported vendor selection, a multiple six-figure budget, API config, data migration, and staff training.',
      color: '#8B7EC8',
      to: '/projects',
    },
    {
      title: 'Multi-Site Retail Buildout',
      tag: 'AG Retail · 2021 to 2023',
      desc: 'Collaborated on the full lifecycle build across multiple locations. This encompassed building works, POS implementation, technology rollout, and post-launch upgrade cycles.',
      color: '#4A90D9',
      to: '/projects',
    },
  ];

  const personalProjects = [
    {
      title: 'Recaller',
      tag: 'B2B SaaS · Training Intelligence',
      desc: '10-second Slack assessments that prove training ROI and identify who actually retained their knowledge.',
      color: '#C75B39',
      to: '/projects/recaller',
    },
    {
      title: 'API Creations',
      tag: 'Backend Infrastructure',
      desc: 'Scalable, secure microservice APIs, including a receipt/invoice parser built for marketplace-grade reliability.',
      color: '#5B8C6F',
      to: '/projects/api-creations',
    },
    {
      title: 'Social Wellness',
      tag: 'Intentional Social · FrameDay',
      desc: 'Building products that elevate user psychology. Focusing on mindfulness and intentional interaction through daily photography.',
      color: '#8B7EC8',
      to: '/projects/social-wellness',
    },
  ];

  const facts = [
    { label: 'Location', value: 'Toronto, ON, Canada' },
    { label: 'Education', value: 'BSc Computer Science, Salem University' },
    { label: 'Cert', value: 'Mobile App Dev & Mgmt, Cambrian College' },
    { label: 'Open to', value: 'Full-time · Contract · Collab' },
    { label: 'Interests', value: 'AI, Product, Chess, Cinematography' },
    { label: 'Contact', value: 'ozoanibarzali@gmail.com' },
  ];

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-24 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C75B39]/05 via-transparent to-[#8B7EC8]/03 pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="h-anim mb-5">
            <div className="status-live inline-flex">
              <span className="status-dot-green" />
              Open to new opportunities
            </div>
          </div>
          <h1 className="h-anim font-display font-black text-[clamp(3.5rem,9vw,7rem)] text-white leading-[0.87] tracking-tight mb-4">
            Daniel<br />
            <span style={{ color: '#C75B39' }}>Ozoani.</span>
          </h1>
          <p className="h-anim font-mono text-xs text-white/40 tracking-[0.22em] uppercase mb-7">
            Technical Project Manager&nbsp;&nbsp;·&nbsp;&nbsp;Developer&nbsp;&nbsp;·&nbsp;&nbsp;Builder
          </p>
          <div className="h-anim flex flex-wrap items-center gap-5 mb-10 text-sm font-inter text-white/55">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C75B39]" /> Toronto, ON
            </span>
            <a href="https://www.linkedin.com/in/daniel-ozoani-b20539252/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors">
              <LinkedinIcon /> LinkedIn <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
            <a href="https://github.com/OzunaModelo123" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors">
              <GithubIcon /> GitHub <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
          <div className="h-anim flex flex-wrap gap-3">
            <Link to="/contact" className="btn-glow">Get in touch <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/projects" className="btn-glass">See my work</Link>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── ABOUT ME ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="sr sec-tag mb-6">About Me</div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3.2rem)] text-white leading-[0.95] tracking-tight mb-7">
                Bridging <span className="font-serif italic" style={{ color: '#C75B39' }}>tech and delivery.</span>
              </h2>
              <p className="sr font-inter text-base text-white/75 leading-relaxed mb-4">
                As a Technical Project Manager, I thrive in the space where complex problems meet practical solutions. I enjoy taking a messy, early-stage idea and figuring out the moving parts needed to bring it to life. I don't just track tasks; I work closely with teams to clear roadblocks and keep momentum going.
              </p>
              <p className="sr font-inter text-base text-white/75 leading-relaxed mb-4">
                When I'm not managing projects, I'm usually writing code. I build custom tools, experiment with new AI models, and explore how technology can solve everyday inefficiencies. Having hands-on technical experience helps me bridge the gap between engineering teams and stakeholders.
              </p>
              <p className="sr font-inter text-base text-white/75 leading-relaxed">
                Off the clock, you can find me playing chess (I'm still terrible, but I keep trying), shooting video, and staying curious about where the tech industry is heading next.
              </p>
            </div>
            <div className="sr">
              {facts.map((f, i) => (
                <div key={f.label} className={`flex gap-4 py-3.5 ${i < facts.length - 1 ? 'border-b border-white/06' : ''}`}>
                  <span className="font-mono text-[0.58rem] text-[#C75B39] tracking-widest uppercase shrink-0 w-16 mt-0.5">{f.label}</span>
                  <span className="font-inter text-sm text-white/65 leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── SKILLS ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="sr sec-tag mb-4">Core Skills</div>
          <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-tight mb-12">
            What I bring to the table.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {skillGroups.map(g => (
              <div key={g.label} className="sr">
                <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-4" style={{ color: g.color }}>{g.label}</p>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map(s => <SkillBadge key={s} label={s} color={g.color} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── WORK EXPERIENCE ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="sr sec-tag mb-4">Work Experience</div>
          <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-tight mb-12">
            Where I've worked.
          </h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#C75B39]/50 via-[#4A90D9]/30 to-[#5B8C6F]/20" />
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <TimelineCard key={exp.company} {...exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── CORPORATE PROJECTS ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="sr sec-tag mb-4">Corporate Work</div>
          <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-tight mb-10">
            Projects I've delivered.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {corporateProjects.map(p => (
              <div key={p.title} className="sr"><ProjectCard {...p} /></div>
            ))}
          </div>

          {/* ── PERSONAL PROJECTS ─────────────────────────────────── */}
          <div className="sr sec-tag mb-4">Personal Builds</div>
          <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-tight mb-10">
            Things I've built.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {personalProjects.map(p => (
              <div key={p.title} className="sr"><ProjectCard {...p} /></div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── EDUCATION & CERTIFICATIONS ────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="sr sec-tag mb-4">Education & Certifications</div>
          <h2 className="sr font-display font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-tight mb-12">
            Always learning.
          </h2>

          {/* Education cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              { school: 'Cambrian College', degree: 'Certificate, Mobile Application Development & Management', period: '2023 – 2024', color: '#C75B39' },
              { school: 'Salem University', degree: 'Bachelor of Science, Computer Science', period: '2018 – 2022', color: '#4A90D9' },
            ].map(ed => (
              <div key={ed.school} className="sr glass-light rounded-2xl p-6 border transition-all duration-400 hover:-translate-y-1"
                style={{ borderColor: `${ed.color}20` }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <GraduationCap className="w-5 h-5" style={{ color: ed.color }} />
                  <span className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color: ed.color }}>{ed.period}</span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-1">{ed.school}</h3>
                <p className="font-inter text-sm text-white/60">{ed.degree}</p>
              </div>
            ))}
          </div>

          {/* Certification card */}
          <div className="sr glass-light rounded-2xl p-6 border relative overflow-hidden" style={{ borderColor: '#8B7EC820' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7EC8]/05 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#8B7EC815', border: '1px solid #8B7EC830' }}>
                <Award className="w-5 h-5" style={{ color: '#8B7EC8' }} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-[0.58rem] tracking-widest uppercase text-[#8B7EC8]">Issued Apr 2026 · Alison</span>
                  <span className="font-mono text-[0.55rem] px-2 py-0.5 rounded-full border border-[#8B7EC830] text-[#8B7EC8]">Active</span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-1">AI for Product Managers</h3>
                <p className="font-inter text-sm text-white/60 mb-1">Advance Learning — Management, Leadership & Strategy</p>
                <p className="font-inter text-sm text-white/45 leading-relaxed">
                  Deepened understanding of how AI and machine learning are transforming product strategy — from NLP for customer insights to real-world AI applications in product decision-making.
                </p>
                <div className="mt-4 flex items-center gap-2 font-inter text-sm text-[#8B7EC8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B7EC8] animate-pulse" />
                  Actively pursuing more certifications in AI, product management, and project delivery.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-10" />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="sr sec-tag justify-center mb-6" style={{ color: '#E8856E' }}>Let's Connect</div>
          <h2 className="sr font-display font-bold text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.9] tracking-tight mb-6">
            Got something<br />
            <span className="font-serif italic" style={{ color: '#E8856E' }}>worth building?</span>
          </h2>
          <p className="sr font-inter text-base text-white/50 max-w-md mx-auto leading-relaxed mb-10">
            Whether it's a project collab, a TPM conversation, or just a good AI debate — I'm always down.
          </p>
          <div className="sr flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-glow">Get in touch <ArrowRight className="w-4 h-4" /></Link>
            <a href="https://www.linkedin.com/in/daniel-ozoani-b20539252/" target="_blank" rel="noopener noreferrer" className="btn-glass">
              LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
