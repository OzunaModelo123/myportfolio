import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickSetter for hardware accelerated translation
    const cursorX = gsap.quickSetter(cursor, "x", "px");
    const cursorY = gsap.quickSetter(cursor, "y", "px");
    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    
    // Initial centering to work with the CSS
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    let isHovering = false;
    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const render = () => {
      cursorX(mouseX);
      cursorY(mouseY);
      dotX(mouseX);
      dotY(mouseY);
      rafId = null;
    };

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea, select, [role="button"]')) {
        if (!isHovering) {
          isHovering = true;
          cursor.classList.add('hovering');
        }
      } else if (isHovering) {
        isHovering = false;
        cursor.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
}
