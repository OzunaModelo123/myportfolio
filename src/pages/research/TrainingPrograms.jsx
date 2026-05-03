import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

export default function TrainingPrograms() {
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
        title="Why Training Programs Fail — Daniel Ozoani"
        description="The science behind skill retention, the forgetting curve, and why most corporate training never sticks—plus what actually works."
      />
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2560" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/research" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#C75B39] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Research
          </Link>
          <div className="p-anim sec-tag mb-6">Research · Corporate L&D</div>
          <h1 className="p-anim font-display font-black text-[clamp(2.5rem,7vw,5rem)] text-white leading-[0.95] tracking-tight mb-4"><span className="text-[#5B8C6F]">Why Training</span><br/>Programs Fail</h1>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-8">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              Most corporate training gets forgotten within a week. Research the science behind behavioral change at work—what actually makes skills stick—and propose a better model.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Published Research</div>
              <div className="flex flex-wrap gap-2">
                {['B2B SaaS', 'HR & L&D', 'Behavioral Science'].map(t => <span key={t} className="chip-dark border-[#5B8C6F]/30" style={{color: '#5B8C6F'}}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <div className="reveal-item sec-tag mb-4">Introduction</div>
            <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">Let me paint you a picture.</h2>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              It's a Monday morning. Your company just wrapped up a two-day training session. Decent food, a good presenter, and everyone left nodding their heads saying "yeah, that was actually useful." Fast forward three weeks and nothing has changed. Same habits, same processes, same mistakes. The binder is somewhere under a desk and nobody remembers what was on slide 47.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Sound familiar?
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              This isn't a coincidence and it isn't laziness either. It's a systemic problem that companies keep funding without questioning. According to <a href="https://www.bizlibrary.com/blog/learning-methods/learning-retention-key-employee-training/" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">BizLibrary</a>, Americans spent an estimated $83 billion on corporate training in 2019 alone. Eighty-three billion dollars. And yet a survey by <a href="https://www.shiftelearning.com/blog/statistics-on-corporate-training-and-what-they-mean-for-your-companys-future" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">24x7 Learning</a> found that only 12% of employees actually apply the skills from their training to their jobs.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              So where is the other 88% going? Let's talk about it.
            </p>
          </div>

          <div>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-6 tracking-tight">The Brain Was Never Designed for a Slideshow</h3>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Back in the 1880s, a German psychologist named Hermann Ebbinghaus ran a series of experiments on himself, studying how quickly the human brain forgets newly learned information. What he found became known as the <span className="text-white font-semibold">Forgetting Curve</span>, and over a century later it is still one of the most ignored findings in corporate history.
            </p>
            <div className="reveal-item glass p-8 rounded-2xl border-l-4 border-l-[#5B8C6F] mb-6">
              <p className="font-inter text-lg text-white italic">
                "His conclusion? Without reinforcement, we forget roughly 50% of new information within an hour. 70% within a day. Up to 90% within a week."
              </p>
            </div>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              You could sit through the best training of your life on a Tuesday, and by Wednesday morning, most of it is already gone.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              This isn't a modern problem. It isn't because people have short attention spans or because remote work ruined focus. <a href="https://www.go1.com/blog/overcome-the-forgetting-curve-in-corporate-training" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">Ebbinghaus proved this in the 19th century.</a> The problem is that we have known about this for over 100 years and still design training the same way, one room, one presenter, one shot, done.
            </p>
          </div>

          <div>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-6 tracking-tight">Knowing Something and Doing Something Are Not the Same Thing</h3>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Here's where it gets even more interesting. Stanford professors Jeffrey Pfeffer and Robert Sutton wrote an entire book on this called <em>The Knowing-Doing Gap</em> (Harvard Business School Press, 2000). Their argument was straightforward: organizations keep confusing knowledge transfer with behaviour change. Just because someone can pass a test or sit through a workshop does not mean they will do anything differently on the job.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Think about it from your own life. How many times have you known exactly what you should be doing — a better habit, a smarter process, a more efficient way of working and still defaulted to the old way? That is not a character flaw. That is how the brain works.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Declarative memory, which is where facts and concepts live, is processed differently from procedural memory, where habits and skills are stored. You can explain a new process to someone perfectly. But until they practise it, repeat it, and apply it in a real context, it stays theoretical. It never becomes instinct.
            </p>
            <p className="reveal-item font-inter text-xl text-white font-semibold leading-relaxed">
              A PowerPoint cannot rewire behaviour. That is just the reality.
            </p>
          </div>

          <div>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-6 tracking-tight">The Real-World Proof</h3>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              I have seen this firsthand. When I was leading an IT migration project for a wholesale company, we had to onboard a customer service team onto a completely new helpdesk platform. At first we ran the standard approach: gather everyone, show them the system, answer questions, send them off. Within two weeks, half the team had quietly gone back to doing things the old way. Not because they were resistant, but because the new system hadn't become natural to them yet. We hadn't given the learning the conditions it needed to stick.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              The fix wasn't another training session. It was changing how and when people were expected to practise. We built hands-on repetition directly into the workflow, created peer accountability structures, and followed up with real adoption data. The difference was immediate.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              Research backs this up. A study by <a href="https://onlinelibrary.wiley.com/doi/10.1002/hrm.20131" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">Saks and Belcourt published in the Human Resource Management Journal</a> found that one year after training, only 34% of employees still apply what they learned. That number drops sharply without deliberate follow-through. But here is the flip side: according to <a href="https://worldmetrics.org/training-retention-statistics/" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">WorldMetrics</a>, employees who apply their training within seven days are <span className="text-white font-bold">88% more likely to retain it long-term.</span> The window matters more than the workshop.
            </p>
          </div>

          <div>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-6 tracking-tight">So What Actually Works?</h3>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              This isn't about scrapping training altogether. Learning and development genuinely matters. But the format needs to match how people actually retain things. Here is what the research and real experience both point to:
            </p>
            <ul className="reveal-item space-y-4 mb-6">
              <li className="font-inter text-lg text-white/80 leading-relaxed flex items-start gap-4">
                <span className="text-[#5B8C6F] mt-1">●</span>
                <span><strong>Spaced repetition over one-off sessions:</strong> Instead of a full-day workshop, break content into shorter touch-points spread across several weeks. Ebbinghaus also showed that relearning is faster than initial learning, meaning revisiting material at the right intervals is far more effective than a single session no matter how good it is.</span>
              </li>
              <li className="font-inter text-lg text-white/80 leading-relaxed flex items-start gap-4">
                <span className="text-[#5B8C6F] mt-1">●</span>
                <span><strong>Application windows:</strong> Build practice into the days immediately after training, not weeks later. The seven-day window is not a suggestion. It is biology.</span>
              </li>
              <li className="font-inter text-lg text-white/80 leading-relaxed flex items-start gap-4">
                <span className="text-[#5B8C6F] mt-1">●</span>
                <span><strong>Measure behaviour, not completion:</strong> Most organizations track who finished the training module. That is the wrong metric. The real question is: what actually changed in how this person does their job? If the answer is nothing, the training did not work regardless of what the attendance sheet says.</span>
              </li>
              <li className="font-inter text-lg text-white/80 leading-relaxed flex items-start gap-4">
                <span className="text-[#5B8C6F] mt-1">●</span>
                <span><strong>Manager reinforcement:</strong> Training that lives only in a classroom dies in the classroom. <a href="https://www.copc.com/training-and-development-as-an-employee-retention-strategy/" target="_blank" rel="noopener noreferrer" className="text-[#5B8C6F] hover:underline font-semibold">Research from COPC</a> found that employees receiving structured, ongoing check-ins were significantly more likely to stay and perform, because learning was embedded into their daily environment rather than separated from it.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-6 tracking-tight">The Bottom Line</h3>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Companies are not failing at training because they do not care. Most organisations genuinely want their people to grow. The failure is in the assumption that exposure equals change.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-6">
              Information alone does not transform behaviour. Repetition does. Practice does. Follow-through does. Context does.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed mb-8">
              Until organizations stop measuring training by how many people sat in a room and start measuring it by what actually shifted in how people work, that $83 billion is going to keep producing the same 12% return. The gap between knowing and doing is not a mystery. We have had the research for over a century. The question is whether anyone is willing to actually do something different with it.
            </p>

            <div className="reveal-item flex flex-col items-center justify-center p-12 glass-light rounded-3xl border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#5B8C6F]/5" />
              <h4 className="font-display font-bold text-2xl text-white mb-4 relative z-10">What has been your experience?</h4>
              <p className="font-inter text-white/70 max-w-lg mb-8 relative z-10">
                Did your corporate training actually change how you worked, or was it mostly forgotten by the following week? I would love to hear your thoughts.
              </p>
              <a href="https://www.linkedin.com/pulse/why-most-training-programs-waste-everyones-time-what-actually-ozoani-4o7ue/" target="_blank" rel="noopener noreferrer" className="btn-glow relative z-10">
                Join the discussion on LinkedIn
              </a>
            </div>
          </div>

          <div className="reveal-item pt-12 border-t border-white/10">
            <h4 className="font-inter text-sm font-bold text-white/40 uppercase tracking-widest mb-4">References & Further Reading</h4>
            <ol className="list-decimal list-inside font-inter text-sm text-white/40 space-y-2 opacity-70">
              <li>BizLibrary — Employee training retention and the Forgetting Curve: <a href="https://www.bizlibrary.com/blog/learning-methods/learning-retention-key-employee-training/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">bizlibrary.com</a></li>
              <li>Shift eLearning — 12% skill application statistic: <a href="https://www.shiftelearning.com/blog/statistics-on-corporate-training-and-what-they-mean-for-your-companys-future" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">shiftelearning.com</a></li>
              <li>Go1 — Ebbinghaus Forgetting Curve in corporate training: <a href="https://www.go1.com/blog/overcome-the-forgetting-curve-in-corporate-training" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">go1.com</a></li>
              <li>Pfeffer, J. & Sutton, R.I. (2000) — <em>The Knowing-Doing Gap</em>, Harvard Business School Press</li>
              <li>Saks, A.M. & Belcourt, M. (2006) — Training transfer research: <a href="https://onlinelibrary.wiley.com/doi/10.1002/hrm.20131" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">onlinelibrary.wiley.com</a></li>
              <li>WorldMetrics — 7-day application and retention statistics: <a href="https://worldmetrics.org/training-retention-statistics/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">worldmetrics.org</a></li>
              <li>COPC Inc. — Manager reinforcement and structured check-ins: <a href="https://www.copc.com/training-and-development-as-an-employee-retention-strategy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">copc.com</a></li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
