'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => setMobileOpen(false), [pathname]);

  const goSection = (id) => {
    if (!isHome) {
      router.push('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Research', to: '/research' },
    { label: 'Play', action: () => goSection('playground') },
  ];

  return (
    <>
      <div className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] items-center gap-1 p-1.5 glass rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl transition-all">
        {links.map(l => (
          l.to ? (
            <Link key={l.label} href={l.to} className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${pathname === l.to ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              {l.label}
            </Link>
          ) : (
            <button key={l.label} onClick={l.action} className="px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
              {l.label}
            </button>
          )
        ))}
        <div className="w-px h-5 bg-white/20 mx-2" />
        <Link href="/contact" className="px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-white/70 hover:bg-[#C75B39] hover:text-white transition-all duration-300">
          Contact
        </Link>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-4 right-4 z-[100]">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-[#0a0a12]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map(l => (
            l.to ? (
              <Link key={l.label} href={l.to} onClick={() => setMobileOpen(false)}
                className="font-display text-4xl font-bold text-white/70 hover:text-white transition-colors">
                {l.label}
              </Link>
            ) : (
              <button key={l.label} onClick={l.action}
                className="font-display text-4xl font-bold text-white/70 hover:text-white transition-colors bg-transparent border-none">
                {l.label}
              </button>
            )
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-glow mt-4 px-8 py-4 text-base">
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </>
  );
}
