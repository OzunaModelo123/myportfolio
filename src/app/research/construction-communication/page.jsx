import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConstructionComm() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.p-anim');
    if (els) {
      gsap.set(els, { opacity: 0, y: 40 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15
      });
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.reveal-section').forEach(section => {
      const els = section.querySelectorAll('.reveal-item');
      if (els.length) {
        gsap.set(els, { opacity: 0, y: 45 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => gsap.to(els, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out'
          }),
          once: true
        });
      }
    });
  }, []);

  return (
    <div>
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/research" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#C75B39] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Research
          </Link>
          <div className="p-anim sec-tag mb-6">Research · Operations & Systems</div>
          <h1 className="p-anim font-display font-black text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.95] tracking-tight mb-4">
            The Hidden Cost Of<br /><span className="text-[#E8856E]">Poor Communication</span>
          </h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-8">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Why tech debt is usually just talk debt. An analysis of the information degradation that happens across a product's lifecycle and how to fix it before the first line of code.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Published Research</div>
              <div className="flex flex-wrap gap-2">
                {['Technical PM', 'Lifecycle Management', 'Product Strategy'].map(t => (
                  <span key={t} className="chip-dark border-[#E8856E]/30" style={{ color: '#E8856E' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-20">
          <div>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When your entire job revolves around managing the full life cycle of products, you quickly learn a harsh truth: the biggest point of failure in any system is almost never the code. It is the people talking about the code.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              We love to obsess over tech stacks, sprint velocities, and optimize our agile workflows. But none of that matters if the blueprint is based on a misunderstanding. Poor communication doesn't usually look like a screaming match in a boardroom. It looks like a polite nod of agreement in a kickoff meeting where absolutely no one understood what the client actually wanted.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              A miscommunication is not just a typo; it is a compounding debt. Let's look at the actual cost of getting it wrong and how to fix it before it ruins your next sprint.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">The Real Cost</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">Burned Capital and Broken Morale</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              In project management, we often talk about "rework." But rework is a sterile word that hides the true bleeding of a project.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When a requirement is poorly communicated at the discovery phase, the cost multiplies at every subsequent stage. The designer builds the wrong wireframe. The developer writes the wrong logic. QA tests against the wrong parameters. By the time it hits user testing, fixing a single misaligned feature costs exponentially more than it would have to just ask three clarifying questions a month earlier.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              But the financial cost is not even the worst part. The hidden cost is <strong>team morale</strong>. Developers hate throwing away good code. When you force a team to scrap two weeks of work because a stakeholder "meant something else," you erode trust. Do that enough times, and your team stops caring. They stop innovating and start defensively coding—just building exactly what they are told, knowing it's probably going to change anyway.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">The Visual Metaphor</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">The Tree Swing Theory</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              If you want to understand the lifecycle of a bad requirement, look no further than the holy grail of project management memes: <strong>The Tree Swing</strong>. It has been passed around IT departments since the 1970s, and it perfectly illustrates what happens when the gap between the client's request, the PM's understanding, and the engineer's build is filled with assumptions instead of clarity.
            </p>

            <div className="reveal-item my-12 group">
              <div className="rounded-3xl overflow-hidden border border-white/10 glass-light p-8 transition-all duration-500 hover:border-white/20 bg-white/5">
                <img 
                  src="https://www.smart-words.org/jokes/project-tree-swing.png" 
                  alt="The Classic Project Management Tree Swing Parody" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <p className="mt-4 font-inter text-sm text-white/50 text-center italic">
                The Classic Project Management Tree Swing Parody. "I thought you meant..." is the most expensive phrase in tech.
              </p>
            </div>
          </div>

          <div className="reveal-item p-10 glass-light rounded-3xl border border-white/10 bg-gradient-to-br from-[#E8856E]/10 to-transparent">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">How to Debug Your Communication</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#E8856E]">1. The Playback Method</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Never accept a requirement and just say "Got it." You have to play it back in your own words, exposing any hidden assumptions. Ask: "By 'faster,' do you mean fewer fields or quicker database processing?"
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#E8856E]">2. Wireframes Over Words</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Human language is ambiguous. Code is not. Before anyone touches React, draw it on a whiteboard or build a quick mockup. People don't know what they want until they see what they <em>don't</em> want.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#E8856E]">3. Define "Done"</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Before a line of code is written, everyone must agree on the Definition of Done. If it’s not in the writing (e.g., does the search have auto-complete?), it doesn't exist.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-item space-y-6">
            <h2 className="font-display font-bold text-3xl text-white">Final Thoughts</h2>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              Communication is not a soft skill; it is the core operational infrastructure of your project. When a project fails, it is rarely because the engineers weren't smart enough or the software wasn't fast enough.
            </p>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              It is almost always because the transfer of information degraded at a critical juncture. The best builders don't just communicate until they are understood; they communicate until they cannot possibly be misunderstood.
            </p>
          </div>

          <div className="reveal-item p-8 glass-light rounded-2xl border border-white/10">
            <h3 className="font-display font-bold text-xl text-white mb-4">References & Further Reading</h3>
            <ul className="space-y-3 font-inter text-sm text-white/70">
              <li>
                <span className="text-white/50 mr-2">1.</span>
                <a href="https://en.wikipedia.org/wiki/The_Mythical_Man-Month" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8856E] transition-colors">Brooks, F. P. (1975). The Mythical Man-Month: Essays on Software Engineering.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">2.</span>
                <a href="https://www.pmi.org/learning/library/communications-role-high-performance-performance-6066" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8856E] transition-colors">Project Management Institute (PMI). (2013). The High Cost of Low Performance: The Essential Role of Communications.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">3.</span>
                <a href="https://psycnet.apa.org/record/1998-03828-005" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8856E] transition-colors">Gilovich, T., Savitsky, K., & Medvec, V. H. (1998). The illusion of transparency. Journal of Personality and Social Psychology.</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
