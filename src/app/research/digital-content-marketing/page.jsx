import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Ref = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-[#8B7EC8] hover:underline hover:text-[#a99edb] transition-colors">
    {children}
  </a>
);

const SectionTag = ({ children }) => (
  <div className="reveal-item sec-tag mb-4">{children}</div>
);

const EraCard = ({ era, period, tagline, items }) => (
  <div className="reveal-item p-6 glass-light rounded-2xl border border-white/10 hover:border-[#8B7EC8]/40 transition-all duration-300">
    <div className="flex items-start justify-between gap-4 mb-3">
      <div>
        <span className="font-mono text-[0.6rem] text-[#8B7EC8] tracking-widest uppercase">{period}</span>
        <h4 className="font-display font-bold text-lg text-white mt-1">{era}</h4>
      </div>
      <span className="flex-shrink-0 font-mono text-[0.55rem] px-2.5 py-1 rounded-full border border-[#8B7EC8]/30 text-[#8B7EC8]">Era</span>
    </div>
    <p className="font-inter text-sm text-white/60 mb-4 italic">{tagline}</p>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 font-inter text-sm text-white/75">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B7EC8]/60 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ThemeCard = ({ num, title, body }) => (
  <div className="reveal-item p-7 glass-light rounded-2xl border border-white/10 hover:border-[#8B7EC8]/30 transition-all duration-300">
    <div className="w-10 h-10 rounded-xl bg-[#8B7EC8]/10 border border-[#8B7EC8]/20 flex items-center justify-center mb-4">
      <span className="font-mono text-sm font-bold text-[#8B7EC8]">{num}</span>
    </div>
    <h4 className="font-display font-bold text-lg text-white mb-3">{title}</h4>
    <p className="font-inter text-sm text-white/70 leading-relaxed">{body}</p>
  </div>
);

export default function DigitalContentMarketing() {
  const heroRef = useRef(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.p-anim');
    if (els) { gsap.set(els, { opacity: 0, y: 40 }); gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.15 }); }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.reveal-section').forEach(section => {
      const els = section.querySelectorAll('.reveal-item');
      if (els.length) {
        gsap.set(els, { opacity: 0, y: 45 });
        ScrollTrigger.create({ trigger: section, start: 'top 80%', onEnter: () => gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' }), once: true });
      }
    });
  }, []);

  const eras = [
    {
      era: 'The Static Web', period: '1991 – 1999', tagline: 'Flat pages, dial-up modems, and the first banner ad.',
      items: ['CPM pricing borrowed from print media', 'AT&T\'s first banner ad: 44% CTR', 'Email marketing emerges alongside spam', 'Amazon Associates affiliate programme (1996)', 'Google PageRank changes search forever'],
    },
    {
      era: 'Search & Web 2.0', period: '2000 – 2007', tagline: 'Broadband unlocks participation. Google sells intent.',
      items: ['Google AdWords introduces pay-per-click', 'SEO becomes a professional discipline', 'Blogging democratises publishing', 'YouTube founded (2005) and creator economy seeds planted', 'Google Analytics gives free measurement to all'],
    },
    {
      era: 'Social & Smartphone', period: '2008 – 2013', tagline: 'The feed, the share, and the pocket computer.',
      items: ['iPhone App Store launches (2008)', 'Facebook personalised feed changes distribution', 'Instagram acquires visual marketing language', 'Organic reach attracts brands — then gets sold back to them', 'Custom Audiences enable behavioural targeting at scale'],
    },
    {
      era: 'Content & Video', period: '2014 – 2018', tagline: 'Brands become media companies. Video becomes everything.',
      items: ['Content marketing goes mainstream (HubSpot, CMI)', 'Facebook native video + autoplay dominates feeds', 'YouTube creator economy surpasses $1B in payments', 'Programmatic RTB automates display advertising', 'Snapchat Stories creates ephemeral content mode'],
    },
    {
      era: 'Algorithms & Creators', period: '2019 – 2022', tagline: 'TikTok breaks the social graph. Privacy laws reshape data.',
      items: ['TikTok\'s interest-graph algorithm disrupts incumbent platforms', 'Creator economy valued at $250B (Goldman Sachs)', 'Apple ATT costs Meta ~$10B in annual revenue', 'GDPR and CCPA trigger first-party data race', 'Streaming ad tiers open premium video inventory'],
    },
    {
      era: 'AI-Augmented Content', period: '2023 – Present', tagline: 'Synthetic content floods the web. Authenticity becomes the premium.',
      items: ['ChatGPT shifts content production economics overnight', 'AI Overviews reduce click-through for informational queries', 'Hyper-personalisation via LLMs + CDPs becomes operational', 'UGC gains value as proof of genuine human origin', 'Answer Engine Optimisation (AEO) emerges as discipline'],
    },
  ];

  const themes = [
    {
      num: '01', title: 'The Inversion of Advertising and Content',
      body: 'In 1994, advertising was interruption. By 2025, the most effective marketing is itself content: sponsored videos that are genuinely entertaining, branded podcasts that are genuinely informative. The test shifted from "did it reach the audience?" to "did the audience choose to engage with it?"',
    },
    {
      num: '02', title: 'The Measurement Treadmill',
      body: "Every era produced a new 'precise' metric that attracted optimisation and gaming until it was superseded. CTR, impressions, followers, engagement all fell to Goodhart's Law: when a measure becomes a target, it ceases to be a good measure.",
    },
    {
      num: '03', title: 'The Organic-to-Paid Platform Cycle',
      body: "Every major platform follows the same arc: attract brands with free organic reach → scale the audience → monetise by selling paid amplification while reducing organic visibility. Facebook's page reach fell from 16% (2012) to under 2% (2018). The pattern repeated on every platform that followed.",
    },
    {
      num: '04', title: 'Trust as the Enduring Currency',
      body: "Across every era, marketing effectiveness has been mediated by consumer trust. Trust cannot be purchased in an auction. The brands that sustained effectiveness through thirty years of disruption are those that recognised they were not in the advertising business, but rather in the trust business.",
    },
  ];

  const references = [
    { num: 1, text: 'Anderson, C. (2006). The Long Tail.', href: 'https://www.amazon.com/Long-Tail-Future-Business-Selling/dp/1401302378' },
    { num: 2, text: 'Goldman Sachs (2023). The Creator Economy: Defining the Next $480B Opportunity.', href: 'https://www.goldmansachs.com/insights/pages/from-briefings-12-may-2023.html' },
    { num: 3, text: "Goodhart, C. A. E. (1975). Problems of Monetary Management.", href: 'https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4' },
    { num: 4, text: "O'Reilly, T. (2005). What is Web 2.0.", href: 'https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html' },
    { num: 5, text: 'Pulizzi, J. (2013). Epic Content Marketing.', href: 'https://contentmarketinginstitute.com/books/' },
    { num: 6, text: 'Reuters Institute (2024). Digital News Report 2024.', href: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024' },
    { num: 7, text: 'Shah & Halligan (2009). Inbound Marketing.', href: 'https://www.hubspot.com/inbound-marketing' },
    { num: 8, text: 'Zuboff, S. (2019). The Age of Surveillance Capitalism.', href: 'https://www.amazon.com/Age-Surveillance-Capitalism-Future-Frontier/dp/1610395697' },
  ];

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2560"
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <Link to="/research" className="p-anim inline-flex items-center gap-2 font-inter text-sm text-white/70 hover:text-[#8B7EC8] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Research
          </Link>
          <div className="p-anim sec-tag mb-6" style={{ color: '#8B7EC8', borderColor: '#8B7EC8' }}>Research · Digital Marketing</div>
          <h1 className="p-anim font-display font-black text-[clamp(2.2rem,5vw,4rem)] text-white leading-[1.05] tracking-tight mb-4">
            How Digital Content Has<br />
            <span style={{ color: '#8B7EC8' }}>Transformed & Reshaped Marketing.</span>
          </h1>
          <p className="p-anim font-inter text-sm text-white/50 mb-2">April 2025 · Comprehensive Research Paper</p>
          <div className="p-anim flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-6">
            <p className="font-inter text-base md:text-xl text-white/80 max-w-prose leading-relaxed">
              How digital content has transformed and reshaped marketing across six distinct eras, from the first clickable banner ad in 1994 to the AI-augmented content landscape of today.
            </p>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="status-live"><span className="status-dot-green" /> Published Research</div>
              <div className="flex flex-wrap gap-2">
                {['Content Strategy', 'Digital Marketing', 'History'].map(t => (
                  <span key={t} className="chip-dark" style={{ color: '#8B7EC8', borderColor: '#8B7EC8' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="reveal-section py-20 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionTag>Abstract</SectionTag>
          <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-8 tracking-tight">
            The Content Revolution That Reshaped Marketing
          </h2>
          <div className="space-y-5">
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              The internet was not built for marketing. When Tim Berners-Lee proposed the World Wide Web in 1989, his vision was a decentralised system for sharing scientific documents. Within a decade, however, the commercial potential of networked audiences had made digital advertising the fastest-growing media sector in history.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              At every stage of the internet's development, the nature of the content that people produced, consumed, and shared determined the tools available to marketers, the expectations of audiences, and the economics of attention. Static web pages dictated the banner ad. Search behaviour dictated keyword advertising. Social connection dictated the sponsored post. Short-form video dictated the algorithmic boost. In each case, marketing adapted to a content revolution already underway.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              This paper examines that adaptive process across six distinct eras, tracing the defining content formats, platforms, marketing methods, and measurement frameworks of each.
            </p>
          </div>
        </div>
      </section>

      {/* Six Eras Grid */}
      <section className="reveal-section py-20 px-6 md:px-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <SectionTag>The Six Eras</SectionTag>
          <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-4 tracking-tight">Thirty years of digital content evolution.</h2>
          <p className="reveal-item font-inter text-white/60 mb-12 max-w-2xl">
            Each era is defined by its dominant content format, the platforms that shaped distribution, and the marketing innovations that followed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eras.map((e, i) => <EraCard key={i} {...e} />)}
          </div>
        </div>
      </section>

      {/* Deep-dive sections */}
      <section className="reveal-section py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-20">

          <div>
            <SectionTag>Era One · 1991–1999</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">The Static Web & the Birth of Digital Marketing</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                The earliest publicly accessible web consisted almost entirely of text-based documents. At 14.4 kbps, any significant image was a multi-minute load. Content was flat, sequential, and authored by those with enough technical knowledge to write HTML. <Ref href="https://home.cern/science/computing/birth-web">Yahoo!'s human-edited directory</Ref>, launched in 1994, reflected the era's assumption that worthwhile content was finite enough to be catalogued by hand.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                The first clickable web advertisement appeared on HotWired.com on 27 October 1994. It was a banner for AT&T with the copy: <em>"Have you ever clicked your mouse right here? You will."</em> That first banner achieved a <strong className="text-white">click-through rate of approximately 44%</strong>, a figure never approached again as novelty wore off and ad blindness set in. The dominant marketing logic borrowed directly from print: purchase space, place a message, measure impressions. CPM pricing was imported wholesale from magazine advertising.
              </p>
            </div>
          </div>

          <div>
            <SectionTag>Era Two · 2000–2007</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">The Google Advertising Revolution</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                <Ref href="https://ads.google.com/intl/en_uk/home/how-it-works/">Google's introduction of AdWords in 2000</Ref>, refined into the pay-per-click auction model in 2002, may be the single most consequential development in digital marketing history. The insight was elegant: rather than selling space next to content, Google sold relevance, granting the right to appear alongside a specific query at the precise moment of user intent.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                <Ref href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html">Tim O'Reilly's Web 2.0 framework</Ref> captured the era's defining shift: the web was no longer a collection of documents published by institutions, but a platform on which users were the primary content producers. Wikipedia, Blogger, Flickr, and YouTube (founded 2005, acquired by Google for <strong className="text-white">$1.65 billion</strong> in 2006) built the infrastructure for the creator economy, even if that economy was not yet visible.
              </p>
            </div>
          </div>

          <div>
            <SectionTag>Era Three · 2008–2013</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">Social Media & the Smartphone Revolution</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                Apple's iPhone (2007) and App Store (2008) initiated the most significant shift in content consumption since the television. Mobile favoured short-form, visually-led material. Every format that succeeded, such as Twitter's 140 characters, Instagram's square photos, and Vine's six-second videos, reflected the constraints of a pocket-sized screen consumed in stolen moments.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                Facebook completed the now-familiar platform cycle: attract brands with free organic distribution, demonstrate engagement and data richness, then monetise by reducing organic distribution and selling paid amplification. The introduction of <Ref href="https://www.facebook.com/business/help/341425252616329">Custom Audiences in 2013</Ref> allowed advertisers to target based on demonstrated behaviour like purchasing history and website visits, rather than demographic proxies. A watershed in advertising precision.
              </p>
            </div>
          </div>

          <div>
            <SectionTag>Era Four · 2014–2018</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">Content Marketing Goes Mainstream</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                By 2014, converging pressures of ad-blocking software, algorithm deprioritisation of promotional content, and declining trust in traditional advertising drove content marketing from the experimental margins into mainstream strategy. <Ref href="https://contentmarketinginstitute.com">Joe Pulizzi's Content Marketing Institute</Ref> and <Ref href="https://www.hubspot.com">HubSpot's inbound methodology</Ref> gave the discipline a name, a framework, and an industry.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                Video became the dominant format. Facebook native video with autoplay rapidly made video the highest-reach content type on the platform. YouTube's creator ecosystem matured: <strong className="text-white">over $1 billion in creator payments</strong> by 2015. Programmatic RTB automated display advertising into a complex ecosystem of DSPs, SSPs, and DMPs. This promised precision but delivered ad fraud, brand safety crises, and unresolved questions about whether hyper-targeting outperformed broad reach for brand-building.
              </p>
            </div>
          </div>

          <div>
            <SectionTag>Era Five · 2019–2022</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">TikTok Breaks the Social Graph</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                TikTok's recommendation algorithm, driven by watch time and completion rate rather than social graph connections, meant that any video could reach millions of users regardless of whether the creator had any followers. This broke the Matthew effect that had reinforced established creators and brands on every prior platform. Ordinary users regularly produced viral content while major brands with large budgets struggled to crack the format.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                The creator economy, valued at <Ref href="https://www.goldmansachs.com/insights/pages/from-briefings-12-may-2023.html">approximately $250 billion by Goldman Sachs in 2022</Ref>, professionalised rapidly. Apple's App Tracking Transparency (ATT) in iOS 14.5 devastated mobile advertising data infrastructure. Meta reported ~$10 billion in lost 2022 revenue, marking one of the clearest demonstrations of how dependent digital advertising had become on tracking infrastructure that was now under threat.
              </p>
            </div>
          </div>

          <div>
            <SectionTag>Era Six · 2023–Present</SectionTag>
            <h3 className="reveal-item font-display font-bold text-2xl md:text-3xl text-white mb-5 tracking-tight">The AI-Augmented Content Frontier</h3>
            <div className="space-y-5">
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                The public release of ChatGPT in November 2022 disrupted the economics of content production. By 2024, the majority of Fortune 500 marketing departments had AI-assisted content workflows in place. But the longer-term implication became clear: if AI produced competent content at near-zero marginal cost, the value shifted to <strong className="text-white">distinctive brand voice, original research, and creator authenticity</strong>, which are precisely what AI struggles to replicate.
              </p>
              <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
                <Ref href="https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024">Reuters Institute research in 2024</Ref> found that awareness of AI-generated content correlated with elevated trust in known individuals, niche experts, and creators with demonstrable expertise and personal histories. Meanwhile, <Ref href="https://blog.google/products/search/generative-ai-search/">Google's AI Overviews</Ref> threatened the implicit bargain of the web by synthesising answers from multiple sources and reducing the need for users to click through to source pages, forcing the emergence of Answer Engine Optimisation (AEO) as a discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-cutting themes */}
      <section className="reveal-section py-20 px-6 md:px-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionTag>Cross-Cutting Themes</SectionTag>
          <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-12 tracking-tight">What thirty years actually taught us.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {themes.map((t, i) => <ThemeCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="reveal-section py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <SectionTag>Conclusion</SectionTag>
          <h2 className="reveal-item font-display font-bold text-3xl md:text-4xl text-white mb-8 tracking-tight">The audience is not a target to be reached, but a community to be earned.</h2>
          <div className="space-y-5">
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              Beneath all the technological disruption, certain continuities persist. Audiences have always sought content that serves their needs for information, entertainment, connection, or inspiration. Marketers have always sought audiences. The means by which each finds the other have changed beyond recognition; the fundamental logic of exchange has not.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              What has genuinely changed is the balance of power. The digital era has steadily redistributed control over content distribution, audience attention, and commercial exchange from institutions toward individuals: creators, consumers, and the platform algorithms that mediate between them.
            </p>
            <p className="reveal-item font-inter text-lg text-white/80 leading-relaxed">
              Looking forward, the emergence of genuinely capable AI systems raises questions that go beyond marketing strategy. If content can be produced in infinite quantities at near-zero cost, and if audiences can detect and discount synthetic content, the value of distinctively human expression, which is specific, embodied, experience-grounded, and therefore trustworthy, may prove to be the most durable marketing asset in the digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="reveal-section py-16 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="reveal-item font-display font-bold text-xl text-white mb-6">Selected References & Further Reading</h3>
          <ul className="space-y-3">
            {references.map(r => (
              <li key={r.num} className="reveal-item flex items-start gap-3 font-inter text-sm text-white/60">
                <span className="text-white/30 flex-shrink-0 pt-0.5">{r.num}.</span>
                <a href={r.href} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  {r.text}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
