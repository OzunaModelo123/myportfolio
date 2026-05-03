import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Homepage / project-index magazine row — wraps a route link or teaser button.
 */
export default function FeaturedMagazineRow({ project: p, onOpenModal }) {
  const shell = (
    <>
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
            {p.modalKey ? 'Peek at the teaser' : 'Deep dive'}
            <ArrowRight className={`w-4 h-4 ${p.modalKey ? '' : 'group-hover:translate-x-2'} transition-transform`} />
          </div>
        </div>
      </div>
    </>
  );

  const wrapClass = 'block w-full project-card group overflow-hidden rounded-3xl border border-white/20 transition-all duration-500 hover:border-white/40';

  return (
    <div className="reveal-item">
      {p.href ? (
        <Link to={p.href} className={wrapClass}>
          {shell}
        </Link>
      ) : (
        <button type="button" className={`${wrapClass} text-left bg-transparent p-0 cursor-pointer`} onClick={() => p.modalKey && onOpenModal(p.modalKey)}>
          {shell}
        </button>
      )}
    </div>
  );
}
