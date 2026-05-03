import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import FeaturedMagazineRow from '../components/FeaturedMagazineRow';
import BuildingSoonModal from '../components/BuildingSoonModal';
import { buildingSoonVariants } from '../content/buildingSoonCopy';

gsap.registerPlugin(ScrollTrigger);

const INDEX_PROJECTS = [
  {
    num: '01', name: 'Recaller', tag: 'B2B SaaS',
    desc: 'Training intelligence that proves ROI. 10-second Slack assessments reveal who actually knows their stuff.',
    color: '#C75B39', href: '/projects/recaller',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2560',
  },
  {
    num: '02', name: 'API Creations', tag: 'Infrastructure',
    desc: 'Architecting robust, scalable, and secure backend microservices for enterprise-level applications.',
    color: '#5B8C6F', href: '/projects/api-creations',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2560',
  },
  {
    num: '03',
    name: 'Learning Lab',
    tag: 'Study apps · Coming soon',
    desc: 'Working on some genuinely fun tools so studying and leveling up feels less miserable. Stay tuned!',
    color: '#5EC8D8',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2560',
    modalKey: 'education',
  },
  {
    num: '04', name: 'Social Wellness', tag: 'Intentional Social',
    desc: 'Building products that elevate user psychology. Focusing on mindfulness and intentional interaction through daily photography.',
    color: '#8B7EC8', href: '/projects/social-wellness',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2560',
  },
];

export default function WorkIndex() {
  const heroRef = useRef(null);
  const [eduModalOpen, setEduModalOpen] = useState(false);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.w-anim');
    if (els) { gsap.set(els, { opacity: 0, y: 35 }); gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.15 }); }
  }, []);

  return (
    <div>
      <SEO title="Projects | Daniel Ozoani" description="B2B SaaS, APIs I ship, study apps I'm finishing, intentional social experiments." />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="w-anim sec-tag mb-6 text-white/80">Portfolio Index</div>
          <h1 className="w-anim font-display font-black text-[clamp(4rem,12vw,8rem)] text-white leading-[0.88] tracking-tight mb-5">
            Projects <br /><span className="text-white drop-shadow-lg">I am working on.</span>
          </h1>
          <p className="w-anim font-inter text-base md:text-xl text-white/90 max-w-prose leading-relaxed">
            A categorized look at my professional engineering and product management work—from infrastructure to intentional social experiments.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {INDEX_PROJECTS.map((p, i) => (
            <FeaturedMagazineRow
              key={`${p.num}-${p.name}`}
              project={p}
              onOpenModal={(key) => {
                if (key === 'education') setEduModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      <BuildingSoonModal
        open={eduModalOpen}
        onClose={() => setEduModalOpen(false)}
        {...buildingSoonVariants.education}
        IconComponent={GraduationCap}
        secondarySlot={(
          <Link
            to={{ pathname: '/', hash: 'working-on' }}
            onClick={() => setEduModalOpen(false)}
            className="inline-flex text-sm font-semibold underline underline-offset-4 decoration-white/25 hover:text-white transition-colors"
            style={{ color: buildingSoonVariants.education.accentColor }}
          >
            Snag the Learning Lab bit on Home
          </Link>
        )}
      />
    </div>
  );
}
