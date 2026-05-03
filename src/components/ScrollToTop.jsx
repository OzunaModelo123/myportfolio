'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY > 400;
      if (isVisible !== visible) {
        setVisible(isVisible);
        gsap.to(btnRef.current, {
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          y: isVisible ? 0 : 20,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#C75B39]/50 hover:bg-[#C75B39]/10 transition-all duration-500 opacity-0 pointer-events-none group shadow-2xl"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      title="Scroll to top"
    >
      <div className="absolute inset-0 rounded-full bg-[#C75B39]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <ArrowUp className="w-6 h-6 relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
    </button>
  );
}
