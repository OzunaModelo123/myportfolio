'use client';
import React from 'react';

const AnimatedAtom = ({ atomRef }) => {
  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none z-0">
      {/* Outer wrapper that provides global 3D rotation/precession + mouse tilt */}
      <div ref={atomRef} className="relative w-[400px] h-[400px] md:w-[750px] md:h-[750px] animate-atom-master"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}>

        {/* Core Nucleus with complex wobble and internal spin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ transformStyle: 'preserve-3d' }}>
          <div className="w-16 h-16 md:w-32 md:h-32 bg-[#C75B39] rounded-full shadow-[inset_0_0_40px_rgba(232,133,110,0.8)] drop-shadow-[0_0_40px_rgba(199,91,57,0.6)] animate-nucleus-wobble flex items-center justify-center overflow-hidden">
            {/* Internal "energy" spin */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,#fff,transparent)] mix-blend-overlay animate-spin-slow" />
          </div>
          <div className="absolute inset-0 w-full h-full bg-[#E8856E]/25 rounded-full blur-xl opacity-20" style={{ animation: 'pulseG 3s ease-in-out infinite' }} />
        </div>

        {/* Orbit 1 - Internal (Fastest) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full border-[2.5px] border-[#C75B39]/80 shadow-[0_0_30px_rgba(199,91,57,0.4)]"
          style={{ '--rx': '70deg', '--ry': '15deg', animation: 'atomSpin 6s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#E8856E] rounded-full shadow-[0_0_30px_#E8856E] border border-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-[#E8856E]/90 rounded-full shadow-[0_0_20px_#E8856E]" />
        </div>

        {/* Orbit 2 - Main slanted */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border-[2.5px] border-[#8B7EC8]/80 shadow-[0_0_35px_rgba(139,126,200,0.4)]"
          style={{ '--rx': '75deg', '--ry': '80deg', animation: 'atomSpinRev 12s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#8B7EC8] rounded-full shadow-[0_0_45px_#8B7EC8] border border-white/40" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#8B7EC8]/90 rounded-full shadow-[0_0_25px_#8B7EC8]" />
        </div>

        {/* Orbit 3 - Wide slant */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-[2.5px] border-[#4A90D9]/80 shadow-[0_0_40px_rgba(74,144,217,0.4)]"
          style={{ '--rx': '75deg', '--ry': '150deg', animation: 'atomSpin 18s linear infinite' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#4A90D9] rounded-full shadow-[0_0_60px_#4A90D9] border border-white/40" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#4A90D9]/90 rounded-full shadow-[0_0_30px_#4A90D9]" />
        </div>

        {/* Orbit 4 - Vertical (Slowest, massive) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-[2px] border-[#5B8C6F]/70 shadow-[0_0_35px_rgba(91,140,111,0.4)]"
          style={{ '--rx': '0deg', '--ry': '90deg', animation: 'atomSpinRev 28s linear infinite' }}>
          <div className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#5B8C6F] rounded-full shadow-[0_0_40px_#5B8C6F] border border-white/40" />
        </div>
      </div>
      <style>{`
        @keyframes atomSpin { 0% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(0deg); } 100% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(360deg); } }
        @keyframes atomSpinRev { 0% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(360deg); } 100% { transform: translate(-50%, -50%) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(0deg); } }
        
        @keyframes atom-master { 
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: translateY(-30px) rotateX(5deg) rotateY(10deg) rotateZ(180deg); }
          100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(360deg); }
        }
        @keyframes nucleus-wobble {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.08) rotate(10deg); }
          66% { transform: scale(0.95) rotate(-10deg); }
        }
        .animate-atom-master { animation: atom-master 40s linear infinite; }
        .animate-nucleus-wobble { animation: nucleus-wobble 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AnimatedAtom;
