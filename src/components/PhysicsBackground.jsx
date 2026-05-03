'use client';

import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────────────────────
// REFRACTIVE GLASS SHAPE — Individual premium entity
// ─────────────────────────────────────────────────────────────────────────────
const RefractiveShape = memo(({ data, mouseRef, isMobile }) => {
  const shapeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!shapeRef.current) return;

    const xSetter = gsap.quickSetter(shapeRef.current, "x", "px");
    const ySetter = gsap.quickSetter(shapeRef.current, "y", "px");
    const rotateXSetter = gsap.quickSetter(shapeRef.current, "rotateX", "deg");
    const rotateYSetter = gsap.quickSetter(shapeRef.current, "rotateY", "deg");
    const rotateZSetter = gsap.quickSetter(shapeRef.current, "rotateZ", "deg");

    const update = () => {
      if (!shapeRef.current) return;
      xSetter(data.x - data.radius);
      ySetter(data.y - data.radius);

      // Disable 3D tilt on mobile for smoothness/performance
      if (!isMobile) {
        const dx = mouseRef.current.x - data.x;
        const dy = mouseRef.current.y - data.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300) {
          const influence = (300 - dist) / 300;
          rotateXSetter(-(dy / 300) * 45 * influence);
          rotateYSetter((dx / 300) * 45 * influence);
        } else {
          rotateXSetter(0);
          rotateYSetter(0);
        }
      }

      rotateZSetter(data.rotation * (180 / Math.PI));
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [data, mouseRef, isMobile]);

  return (
    <div
      ref={shapeRef}
      className={`refractive-glass ${isHovered ? 'glowing' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: data.radius * 2,
        height: data.radius * 2,
        background: `${data.color}0.005)`,
        borderRadius: data.type === 'circle' ? '50%' : (data.sides === 3 ? '10%' : '20%'),
        clipPath: data.type === 'poly' ? (
          data.sides === 3 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
            data.sides === 4 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' :
              'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
        ) : 'none',
        transform: `translateZ(${data.z}px)`,
      }}
    />
  );
});

RefractiveShape.displayName = 'RefractiveShape';

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS BACKGROUND — Hybrid DOM/Canvas System
// ─────────────────────────────────────────────────────────────────────────────
export default function PhysicsBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0 });
  const scrollRef = useRef({ y: 0, velocity: 0 });
  const shapesRef = useRef([]);
  const [shapes, setShapes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const palettes = [
      'rgba(255, 89, 94, ',  // Red-Pink
      'rgba(255, 202, 58, ', // Yellow-Gold
      'rgba(138, 201, 38, ', // Green
      'rgba(25, 130, 196, ', // Blue
      'rgba(106, 76, 147, ', // Purple
      'rgba(255, 146, 76, ', // Orange
      'rgba(175, 252, 255, ' // Crystal
    ];

    const createShapes = (w, h) => {
      const mobile = w < 768;
      const count = mobile ? 6 : 15;
      const proximity = mobile ? 150 : 250;

      const newShapes = [];
      for (let i = 0; i < count; i++) {
        newShapes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: mobile ? 0 : (Math.random() - 0.5) * 400,
          vx: (Math.random() - 0.5) * (mobile ? 0.8 : 1.5),
          vy: (Math.random() - 0.5) * (mobile ? 0.8 : 1.5),
          radius: mobile ? (Math.random() * 25 + 20) : (Math.random() * 40 + 30),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          color: palettes[Math.floor(Math.random() * palettes.length)],
          type: Math.random() > 0.3 ? 'poly' : 'circle',
          sides: Math.floor(Math.random() * 4) + 3,
          proximityLink: proximity,
          id: i
        });
      }
      shapesRef.current = newShapes;
      setShapes([...newShapes]);
      setIsMobile(mobile);
    };

    const resize = () => {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      // Reset transform before scaling to prevent compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
      createShapes(window.innerWidth, window.innerHeight);
    };

    let lastScroll = window.scrollY;
    const onMouse = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onScroll = () => {
      const currentScroll = window.scrollY;
      scrollRef.current.velocity = currentScroll - lastScroll;
      scrollRef.current.y = currentScroll;
      lastScroll = currentScroll;
    };

    let time = 0;
    const updatePhysics = () => {
      time += 0.005;
      const sW = window.innerWidth;
      const sH = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, sW, sH);
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 0.5;

      shapesRef.current.forEach((p, i) => {
        p.vy -= scrollRef.current.velocity * (0.005 + (Math.abs(p.z) / 4000));

        const dx = mx - p.x;
        const dy = my - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 300 && dist > 0) {
          const repelForce = (300 - dist) / 300;
          p.vx -= (dx / dist) * repelForce * 0.8;
          p.vy -= (dy / dist) * repelForce * 0.8;
        }

        p.vx += Math.sin(time * 3 + i) * 0.015;
        p.vy += Math.cos(time * 2 + i) * 0.015;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed + (p.vx * 0.002);

        const margin = 150;
        if (p.x < -margin) p.x = sW + margin;
        if (p.x > sW + margin) p.x = -margin;
        if (p.y < -margin) p.y = sH + margin;
        if (p.y > sH + margin) p.y = -margin;

        // Collision Detection + Resolution (Anti-clumping)
        for (let j = i + 1; j < shapesRef.current.length; j++) {
          const p2 = shapesRef.current[j];
          const ldx = p2.x - p.x;
          const ldy = p2.y - p.y;
          const ldistSq = ldx * ldx + ldy * ldy;
          const minDist = p.radius + p2.radius;

          if (ldistSq < minDist * minDist) {
            const ldist = Math.sqrt(ldistSq);
            const overlap = (minDist - ldist) * 0.05;
            const nx = ldx / ldist;
            const ny = ldy / ldist;

            // Push away
            p.vx -= nx * overlap;
            p.vy -= ny * overlap;
            p2.vx += nx * overlap;
            p2.vy += ny * overlap;
          }

          // Blueprint lines
          const proximity = p.proximityLink;
          if (ldistSq < proximity * proximity) {
            const opacity = 1 - (Math.sqrt(ldistSq) / proximity);
            ctx.strokeStyle = `rgba(199, 91, 57, ${opacity * 0.15})`;
            // Sub-pixel optimization: convert floats to integers using | 0
            ctx.moveTo(p.x | 0, p.y | 0);
            ctx.lineTo(p2.x | 0, p2.y | 0);
          }
        }
      });

      ctx.stroke();
      scrollRef.current.velocity *= 0.9;
    };

    resize();
    gsap.ticker.add(updatePhysics);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      gsap.ticker.remove(updatePhysics);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <canvas ref={canvasRef} className="blueprint-canvas" />
      <div className="glass-background-container">
        {shapes.map(s => (
          <RefractiveShape key={s.id} data={s} mouseRef={mouseRef} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
}
