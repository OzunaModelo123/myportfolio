import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 pt-20 pb-10 px-6 md:px-10 border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-display font-black text-2xl tracking-tight text-white mb-4">Daniel Ozoani</div>
            <p className="font-inter text-sm text-white/70 max-w-sm leading-relaxed mb-6">
              Developer, builder, chess player. Working on things that matter.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Mail className="w-4 h-4" />, href: '/contact', isInternal: true },
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/daniel-ozoani-b20539252/', isInternal: false },
                { icon: <Github className="w-4 h-4" />, href: 'https://github.com/OzunaModelo123', isInternal: false },
              ].map((s, i) => (
                s.isInternal ? (
                  <Link key={i} to={s.href}
                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all">
                    {s.icon}
                  </Link>
                ) : (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all">
                    {s.icon}
                  </a>
                )
              ))}
            </div>
          </div>
          {[
            { title: 'Work', items: [{ l: 'Projects', href: '/projects' }, { l: 'Research', href: '/research' }] },
            { title: 'Connect', items: [{ l: 'Contact', href: '/contact' }, { l: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-ozoani-b20539252/' }, { l: 'GitHub', href: 'https://github.com/OzunaModelo123' }] },
          ].map(col => (
            <div key={col.title}>
              <div className="font-mono text-[0.65rem] text-[#C75B39] tracking-widest uppercase mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.items.map(item => (
                  <li key={item.l}>
                    {item.href.startsWith('/') ? (
                      <Link to={item.href} className="font-inter text-sm text-white/70 hover:text-white transition-colors">{item.l}</Link>
                    ) : (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer" className="font-inter text-sm text-white/70 hover:text-white transition-colors">{item.l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-divider mb-6 bg-white/20 h-px w-full" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="status-live bg-white/10 px-3 py-1.5 rounded-full border border-white/20 text-white/80">
            <span className="status-dot-green" />
            Available for opportunities
          </div>
          <div className="font-mono text-[0.65rem] text-white/50 tracking-widest">
            © {new Date().getFullYear()} Daniel Ozoani
          </div>
        </div>
      </div>
    </footer>
  );
}
