import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../../components/SEO';
import { buildArticleJsonLd } from '../../utils/structuredData';

gsap.registerPlugin(ScrollTrigger);

const ARTICLE_PATH = '/research/it-migrations';
const HERO_IMAGE = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200';
const PUBLISHED = '2025-03-15T12:00:00.000Z';

export default function ITMigrations() {
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
        type="article"
        publishedTime={PUBLISHED}
        modifiedTime={PUBLISHED}
        title="The Psychology of Resistance to Change | Daniel Ozoani"
        description="Why our brains fight the future—the biological and psychological friction that makes technology adoption and IT migrations a human challenge first."
        image={HERO_IMAGE}
        jsonLd={buildArticleJsonLd({
          headline: 'The Psychology of Resistance to Change',
          description: 'Why our brains fight the future—the biological and psychological friction that makes technology adoption and IT migrations a human challenge first.',
          pathname: ARTICLE_PATH,
          datePublished: '2025-03-15',
          image: HERO_IMAGE,
        })}
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/research" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#C75B39] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Research
          </Link>
          <div className="p-anim sec-tag mb-6">Research · Behavioral Psychology</div>
          <h1 className="p-anim font-display font-black text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.95] tracking-tight mb-4">
            The Psychology of<br /><span className="text-[#8B7EC8]">Resistance to Change</span>
          </h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-8">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Why our brains fight the future. An exploration of the biological and psychological friction points that make technology adoption a human challenge first.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Published Research</div>
              <div className="flex flex-wrap gap-2">
                {['IT Migrations', 'Psychology', 'Change Management'].map(t => (
                  <span key={t} className="chip-dark border-[#8B7EC8]/30" style={{ color: '#8B7EC8' }}>{t}</span>
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
              We’ve all been there. You introduce a brilliant new project management tool, map out a highly efficient new workflow, and suddenly half the team develops a passionate, undying loyalty to their battered old spreadsheets.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When you spend your time managing the full life cycle of products and trying to ship meaningful technology, you quickly learn a hard truth: the biggest friction point is rarely the software. It is the user.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Why do we stubbornly cling to broken systems and inefficient routines? Resistance to change is not laziness, stubbornness, or a character flaw. It is biology, deeply wired, evolutionarily sensible, and surprisingly predictable once you understand the mechanics.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              Our brains are essentially running on legacy code. Here is why we fight the future, and how to actually get things moving.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">01. Cognitive Cost</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">The Cognitive Cost of Shifting Gears</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Let’s start with the hardware. Your brain is an energy miser that evolved in a world where the "unknown" usually meant a predator, not a software update.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When you perform a familiar task, your brain relies on the basal ganglia, the ancient, habit-forming region. It requires almost zero cognitive overhead. Habits run on autopilot, freeing up mental bandwidth. When a change is introduced, you are forced to use the prefrontal cortex, the energy-hungry part of your brain responsible for complex problem-solving.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Change disrupts the neural pathways we’ve spent years paving. When you propose a new system, you are not just asking people to do something differently; you are asking them to burn more mental calories. To the brain, this feels like an unnecessary threat.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              Researchers William Samuelson and Richard Zeckhauser first documented this perfectly in 1988 as the <a href="https://link.springer.com/article/10.1007/BF00055573" target="_blank" rel="noopener noreferrer" className="text-[#8B7EC8] hover:underline">Status Quo Bias</a>: given a choice between sticking with the current option or switching, most people stay put even when switching is objectively, undeniably better.
            </p>
            
            <div className="reveal-item my-12 group">
              <a 
                href="https://thedecisionlab.com/biases/status-quo-bias" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block rounded-3xl overflow-hidden border border-white/10 glass-light p-4 transition-all duration-500 hover:border-[#8B7EC8]/40 hover:bg-[#8B7EC8]/5 group/img"
              >
                <img 
                  src="https://images.prismic.io/thedecisionlab/0c5c5546-cea6-4621-982e-80562a800f4e_Status-Quo-Bias.jpeg?auto=compress,format" 
                  alt="Status Quo Bias Comic: Stick figures choosing a spoon over a shovel" 
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover/img:scale-[1.02]"
                />
              </a>
              <p className="mt-4 font-inter text-sm text-white/50 text-center italic">
                The Status Quo Bias in action. It is not rational, but to our brains, it is comfortable.
              </p>
            </div>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">02. Loss Aversion</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">Loss Aversion: The Devil You Know</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Thanks to Daniel Kahneman and Amos Tversky’s Nobel-winning work on <a href="https://www.jstor.org/stable/1914185" target="_blank" rel="noopener noreferrer" className="text-[#8B7EC8] hover:underline">Prospect Theory</a>, we know that the psychological pain of losing something stings about twice as much as the pleasure of gaining something of equal value.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              If you find a $20 bill, you will be happy. If you lose a $20 bill, it will ruin your afternoon.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              When confronting a new change, we do not look at the bright, shiny features of the future first. We fixate on what we are losing today, such as control, competence, or social status. That is why the phrase "We’re updating your workflow" lands like "We’re taking away your workflow."
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              It is the psychological equivalent of refusing to upgrade from a flip phone because, "What if the new one doesn't have Snake?" Even if the current system is flawed, we understand its flaws. We know the workarounds.
            </p>
          </div>

          <div>
            <div className="reveal-item sec-tag mb-4">03. The Lifecycle</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">The Illusion of the "Overnight" Upgrade</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              We tend to treat change like an app update. You hit install, the screen goes dark for a minute, and suddenly everything is running flawlessly on version 2.0. But human psychology does not work in discrete jumps. Change is a slow, messy lifecycle.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Psychologists have mapped this resistance for decades. In the 1940s, Kurt Lewin introduced the foundational "Unfreeze-Change-Refreeze" model, noting that people do not resist the new as much as they resist letting go of the old.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              More famously, organizational psychologists adapted the <a href="https://www.bitesizelearning.co.uk/resources/change-curve-management-model" target="_blank" rel="noopener noreferrer" className="text-[#8B7EC8] hover:underline">Kübler-Ross Change Curve</a> to map how teams process new initiatives.
            </p>

            <div className="reveal-item my-12 group">
              <a 
                href="https://www.bitesizelearning.co.uk/resources/change-curve-management-model" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block rounded-3xl overflow-hidden border border-white/10 glass-light p-6 transition-all duration-500 hover:border-[#8B7EC8]/40 hover:bg-[#8B7EC8]/5 bg-white/5 group/img"
              >
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/6348398d9d21fd6277c64f96/7008646b-5818-4d08-9402-47173ac898db/change%2Bcurve%2Bmanagement%2Bmodel.png" 
                  alt="The Change Curve Graph showing stages from Shock to Integration" 
                  className="w-full h-auto rounded-xl transition-transform duration-500 group-hover/img:scale-[1.02]"
                />
              </a>
              <p className="mt-4 font-inter text-sm text-white/50 text-center italic">
                The Change Curve. That dip in morale mid-project is not a failure; it is a biological feature of transition. (Source: BiteSize Learning)
              </p>
            </div>

            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              When people are in the "Frustration" or "Anger & Blame" phase—complaining that the new way is stupid and the old way was faster—they are not necessarily toxic. They are just in the middle of the process. Expecting immediate, cheerful compliance is like expecting a flawless product launch on version 1.0. It is a myth.
            </p>
          </div>

          <div className="reveal-item p-10 glass-light rounded-3xl border border-white/10 bg-gradient-to-br from-[#8B7EC8]/10 to-transparent">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">How to Ship Change Without Crashing the System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#8B7EC8]">Shrink the Delta</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Don’t demand a total overhaul all at once. Break the change into micro-steps. Small, reversible experiments lower perceived risk and let the brain build new, positive associations without triggering the amygdala's alarm bells.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#8B7EC8]">Frame the Gain</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Be honest about the friction. Address losses head-on. Validating the pain of transition, such as acknowledging it will be clunky for a couple of weeks, diffuses emotional resistance.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#8B7EC8]">Create Psychological Safety</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  Google’s 'Project Aristotle' showed that psychological safety is the number one predictor of team success. Give people time to adjust and permission to voice concerns without fear.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-[#8B7EC8]">Co-Create the Solution</h3>
                <p className="font-inter text-sm text-white/70 leading-relaxed">
                  If people feel like they helped build the strategy, they will defend it instead of destroying it. Participation restores agency and reduces psychological reactance.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-item space-y-6">
            <h2 className="font-display font-bold text-3xl text-white">Final Thoughts</h2>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              Resistance to change is not a bug in the human operating system; it is a survival feature that kept our ancestors alive. Whether you're managing a complex technical rollout, navigating a personal shift, or just trying to get someone to see a different perspective, remember that you are not just fighting bad habits—you're playing chess with human evolution.
            </p>
            <p className="font-inter text-lg text-white/80 leading-relaxed">
              The trick is not to force the change. The trick is to make the new path feel safer, more familiar, and entirely worth the effort.
            </p>
          </div>

          <div className="reveal-item p-8 glass-light rounded-2xl border border-white/10">
            <h3 className="font-display font-bold text-xl text-white mb-4">References & Further Reading</h3>
            <ul className="space-y-3 font-inter text-sm text-white/70">
              <li>
                <span className="text-white/50 mr-2">1.</span>
                <a href="https://www.jstor.org/stable/1914185" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7EC8] transition-colors">Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">2.</span>
                <a href="https://hbr.org/2008/07/choosing-strategies-for-change" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7EC8] transition-colors">Kotter, J.P., & Schlesinger, L.A. (1979). Choosing strategies for change. Harvard Business Review.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">3.</span>
                <a href="https://psycnet.apa.org/record/2003-05955-010" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7EC8] transition-colors">Oreg, S. (2003). Resistance to change: Developing an individual differences measure. Journal of Applied Psychology.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">4.</span>
                <a href="https://link.springer.com/article/10.1007/BF00055573" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7EC8] transition-colors">Samuelson, W., & Zeckhauser, R. (1988). Status quo bias in decision making. Journal of Risk and Uncertainty.</a>
              </li>
              <li>
                <span className="text-white/50 mr-2">5.</span>
                <a href="https://www.bitesizelearning.co.uk/resources/change-curve-management-model" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7EC8] transition-colors">BiteSize Learning. The Change Curve Management Model.</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
