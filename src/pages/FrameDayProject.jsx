import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, MapPin, Users, Heart, Award, Camera, Repeat, Compass } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

export default function FrameDayProject() {
  const heroRef = useRef(null);

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

  return (
    <div>
      <SEO
        title="FrameDay | Daniel Ozoani"
        description="A camera habit that steals you back from the infinite feed. Collaborative prompts instead of doomscrolling by default."
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1510519133417-2407dcafb440?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/projects/social-wellness" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#8B7EC8] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Social Wellness
          </Link>
          <div className="p-anim sec-tag mb-6" style={{ color: '#8B7EC8', borderColor: '#8B7EC840' }}>Mindful Camera App</div>
          <h1 className="p-anim font-display font-black text-[clamp(4rem,9vw,7rem)] text-white leading-[0.85] tracking-tight mb-6">FrameDay</h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Basically a morning push that dares you to notice the hallway light before TikTok steals your ankles again.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live" style={{ color: '#8B7EC8', borderColor: '#8B7EC840' }}>
                <span className="status-dot" style={{ backgroundColor: '#8B7EC8' }} /> In Development
              </div>
              <div className="flex flex-wrap gap-2">
                {['Mindfulness', 'UX Design', 'Social Platform'].map(t => <span key={t} className="chip-dark" style={{ borderColor: '#8B7EC820' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* What is FrameDay */}
          <div className="reveal-item text-center">
            <div className="sec-tag justify-center mb-6">01 · What is FrameDay?</div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-8 tracking-tight">Photography homework for your eyeballs.</h2>
            <p className="font-inter text-lg text-white/80 leading-relaxed text-left">
              <strong>FrameDay</strong> is equal parts journaling and gentle peer pressure: one prompt push per day ("find something pretending to nap", "borrow someone else's shadow story") and you wander outside with purpose. 
            </p>
            <p className="font-inter text-lg text-white/80 leading-relaxed text-left mt-6">
              The win is tactile: fewer autopilot thumbs, more evidence you share a planet with weird textures. Passive feeds still exist elsewhere; FrameDay wants you mildly winded instead of glazed over.
            </p>
          </div>

          <div className="reveal-item h-px w-full bg-white/10" />

          {/* Features and Why */}
          <div className="reveal-item">
            <div className="sec-tag mb-4">02 · Mechanics of Mindfulness</div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 tracking-tight">Why the mechanics feel sneaky-good.</h2>
            <p className="font-inter text-lg text-white/80 leading-relaxed max-w-3xl mb-12">
              Every lever is biased toward wandering with a camera rather than lurking on a leaderboard. Influencer clichés discouraged; curiosity subsidized.
            </p>
            
            <div className="space-y-12">
              
              {/* Feature 1 */}
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B7EC8]" />
                <div className="flex gap-4 items-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#8B7EC8]" />
                  <h3 className="font-display font-bold text-2xl text-white">Dynamic, Contextual Prompts</h3>
                </div>
                <p className="font-inter text-white/70 leading-relaxed mb-4">
                  Prompts are location-aware and seasonal. Someone in Toronto might get a slightly different flavor than someone in Lagos, or on the first day of fall the prompt might be "find something letting go." We even inject occasional absurd "wild card" prompts to break the routine.
                </p>
                <div className="bg-[#8B7EC8]/10 rounded-xl p-4 border border-[#8B7EC8]/20">
                  <p className="font-inter text-sm text-[#8B7EC8]">
                    <strong>Why it works:</strong> By tethering the prompt to the user's actual physical reality and season, it makes them feel hyper-present. They aren't looking at generic internet trends; they are forced to examine the immediate geography and weather around them.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B7EC8]" />
                <div className="flex gap-4 items-center mb-4">
                  <Users className="w-6 h-6 text-[#8B7EC8]" />
                  <h3 className="font-display font-bold text-2xl text-white">A Deeper Social Layer</h3>
                </div>
                <p className="font-inter text-white/70 leading-relaxed mb-4">
                  Instead of generic likes, users leave one-word emotional reactions (wonder, calm, funny, eerie). We also include "Duets" where two people are paired to interpret the same prompt side-by-side, and weekly themed cohorts for small groups to compete together.
                </p>
                <div className="bg-[#8B7EC8]/10 rounded-xl p-4 border border-[#8B7EC8]/20">
                  <p className="font-inter text-sm text-[#8B7EC8]">
                    <strong>Why it works:</strong> Replacing the dopamine hit of a "like" with genuine emotional resonance shifts the motivation. Users aren't looking for the most flashy, perfectly edited photo—they are looking deeply into the world to find something that provokes a specific human feeling.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B7EC8]" />
                <div className="flex gap-4 items-center mb-4">
                  <Award className="w-6 h-6 text-[#8B7EC8]" />
                  <h3 className="font-display font-bold text-2xl text-white">Stakes and Progression</h3>
                </div>
                <p className="font-inter text-white/70 leading-relaxed mb-4">
                  Hitting a 7-day streak unlocks a harder, specialized "curator prompt." As users keep submitting, their photos organize automatically into a stunning personal visual diary. The community's highest-voted photos feature in a monthly "Best Of," potentially even printed as physical postcards.
                </p>
                <div className="bg-[#8B7EC8]/10 rounded-xl p-4 border border-[#8B7EC8]/20">
                  <p className="font-inter text-sm text-[#8B7EC8]">
                    <strong>Why it works:</strong> Seeing your own life turn into an evolving gallery gives you pride in your daily observations. Printing them as physical postcards takes the digital experience completely offline, locking in the value of the physical world.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#8B7EC8]" />
                <div className="flex gap-4 items-center mb-4">
                  <Compass className="w-6 h-6 text-[#8B7EC8]" />
                  <h3 className="font-display font-bold text-2xl text-white">Retention Without Punishment</h3>
                </div>
                <p className="font-inter text-white/70 leading-relaxed mb-4">
                  Missing a day isn't a failure. You can submit late photos into a "found moments" gallery instead of the main vote. Friends can send private prompts, and a "remix" feature lets you challenge someone's exact subject with an alternative angle.
                </p>
                <div className="bg-[#8B7EC8]/10 rounded-xl p-4 border border-[#8B7EC8]/20">
                  <p className="font-inter text-sm text-[#8B7EC8]">
                    <strong>Why it works:</strong> Grinding creates burnout. By removing the penalty for missing a day, FrameDay respects the user's mental bandwidth. Allowing "remixes" forces users to look at ordinary subjects from radically new physical angles.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
