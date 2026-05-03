import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

export default function DigitalTransformation() {
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
      <SEO
        title="Surviving the Retail Tech Refresh — Daniel Ozoani"
        description="How to upgrade retail store technology without halting revenue, burning out teams, or ruining customer experience."
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.stockcake.com/public/2/6/2/262dff79-4f2d-4d47-aa83-7ce6b2b90730/busy-supermarket-scene-stockcake.jpg" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/research" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#4A90D9] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Research
          </Link>
          <div className="p-anim sec-tag mb-6">Research · Product Operations</div>
          <h1 className="p-anim font-display font-black text-[clamp(2rem,6vw,4rem)] text-white leading-[0.95] tracking-tight mb-4 max-w-4xl">
            Surviving the Retail Refresh:<br /><span className="text-[#4A90D9]">Upgrade Store Tech Without Killing Sales</span>
          </h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-8">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              How to pull off a physical retail technology refresh without halting revenue, burning out your cashiers, or turning customers into a riot.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Published Research</div>
              <div className="flex flex-wrap gap-2">
                {['Retail Strategy', 'Product Lifecycle', 'Operations'].map(t => (
                  <span key={t} className="chip-dark border-[#4A90D9]/30" style={{ color: '#4A90D9' }}>{t}</span>
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
              Managing a full digital-product lifecycle in the cloud is almost civilized. Push the update, watch the servers hum, maybe tweak a button color. Done.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              But when you’re ripping out the old checkout lanes in a 100,000-square-foot big-box store to install shiny new self-checkout hubs—while the doors stay wide open and Saturday shoppers keep rolling in with overflowing carts—that’s not a “deployment.” That’s open-heart surgery on a patient who’s still trying to finish their grocery list.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              I’ve seen enough of these retail tech refreshes (and heard the war stories from PMs who lived through them) to know the truth: the tech almost never fails. The process does—unless you treat the store like the living, breathing, revenue-generating organism it is.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">Tactical Error #1</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">The “Big Bang” Is a Terrible Idea</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              In software, a big-bang launch can be exhilarating. Flip the switch, old system dies, new one rises. In a physical store? That’s operational Russian roulette.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              Rip out all 15 legacy registers overnight and pray the new cloud-connected pods work perfectly at 6 a.m.? You’re gambling the entire weekend’s revenue on zero glitches in scanners, network handshakes, or payment terminals. One hiccup and you’ve got lines snaking to the back of the store.
            </p>
            
            <div className="reveal-item my-12">
              <div className="rounded-3xl overflow-hidden border border-white/10 glass-light p-6 bg-white/5">
                <img 
                  src="https://images.stockcake.com/public/b/f/a/bfa2ebd1-89e0-4b70-9c61-6b7f984d49af/grocery-checkout-line-stockcake.jpg" 
                  alt="Busy big-box retail store with customers and carts" 
                  className="w-full h-[400px] object-cover rounded-xl"
                />
                <p className="mt-4 font-inter text-sm text-white/40 italic">
                  The unglamorous truth of a retail rollout—managing new tech amidst the relentless rhythm of a busy store.
                </p>
              </div>
            </div>

            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              The fix everyone eventually learns: <strong>Phased deployment</strong>. Replace a quarter of the lanes at a time. Keep 75% of the old system humming as your safety net. Yes, it stretches the timeline. No, it doesn’t tank your weekend sales. The math is brutal but obvious.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">The Human Element</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">Muscle Memory Bites Back Hard</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Your cashiers aren’t “resistant to change.” They’ve been swiping, scanning, and tendering on the same POS for years. Their hands know exactly where every button lives. They don’t even look.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              Drop a sleek new touchscreen in front of them and suddenly every transaction crawls. Add 15 seconds per customer and you’ve got a front-end bottleneck that turns happy shoppers into ex-customers. The only thing that works: <strong>Floor walkers</strong>. Real humans standing right behind the cashiers for the first few days to point, whisper fixes, and keep them from melting down.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">Risk Management</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">The Saturday-Afternoon Fallback</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              In e-commerce, a crash just means a sad “Sorry” page. In retail, the system dies at 2 p.m. on Saturday and you’ve got 200 people with melting groceries and growing murder eyes. Every new piece of retail tech must have a bulletproof offline survival mode.
            </p>

            <div className="reveal-item my-12">
              <div className="rounded-3xl overflow-hidden border border-white/10 glass-light p-6 bg-white/5">
                <img 
                  src="https://www.insider-trends.com/wp-content/uploads/2020/05/future-store-design-scaled.jpg" 
                  alt="Crowded big-box store checkout with long lines" 
                  className="w-full h-[400px] object-cover rounded-xl"
                />
                <p className="mt-4 font-inter text-sm text-white/40 italic">
                  Peak chaos. This is where your fancy new POS gets its real stress test—not in a lab, but under fluorescent lights and real human pressure.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-item p-10 glass-light rounded-3xl border border-white/10 bg-gradient-to-br from-[#4A90D9]/10 to-transparent">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-8">The Playbook That Actually Works</h2>
            <div className="space-y-6">
              {[
                { title: 'Over-communicate with store managers', desc: 'Map every hardware swap around their peak hours and holiday calendars, not your Gantt chart.' },
                { title: 'Stage hardware like a military operation', desc: 'No customer-visible pallets or dangling cables until the exact moment of install.' },
                { title: 'Listen to the frontline', desc: 'Heavy scanners or screen glare aren’t complaints—they’re early warning signals. Fix them fast.' },
                { title: 'Shadow mode testing', desc: 'Run the new system in parallel for a week before anyone touches a customer transaction.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#4A90D9]/20 flex items-center justify-center flex-shrink-0 text-[#4A90D9] font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">{item.title}</h3>
                    <p className="font-inter text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-item space-y-6">
            <h2 className="font-display font-bold text-3xl text-white">Final Thoughts: Upgrades Should Feel Invisible</h2>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              The greatest retail project managers don’t just install new tech. They weave it into the store’s rhythm so seamlessly that the only thing customers notice is that the line actually moved faster today.
            </p>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              It is messy, physical, and human. But when you respect the muscle memory, protect the revenue, and plan for the worst-case Saturday, the refresh doesn’t just modernize the store—it makes it better without anyone remembering the pain.
            </p>
          </div>

          <div className="reveal-item p-8 glass-light rounded-2xl border border-white/10">
            <h3 className="font-display font-bold text-xl text-white mb-4">References</h3>
            <ul className="space-y-3 font-inter text-sm text-white/70">
              <li>Ton, Z. (2014). The Good Jobs Strategy. (The bible on treating frontline workers as the make-or-break factor.)</li>
              <li>Berman, B., & Evans, J. R. (2018). Retail Management: A Strategic Approach.</li>
              <li>WWT Case Study: Jack in the Box nationwide POS modernization (phased rollout).</li>
              <li>AMS Retail Solutions & NCR Counterpoint offline-mode research (2026).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
