import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Orb pulse
      gsap.to(orbRef.current, {
        opacity: 0.7,
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Hero image entrance
      loadTl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06, x: '-6vw' },
        { opacity: 1, scale: 1, x: 0, duration: 0.7 },
        0
      );

      // Wordmark + URL pill
      loadTl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.15
      );

      // Headline lines
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        loadTl.fromTo(
          headlineLines,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.35
        );
      }

      // Subheadline + CTAs
      loadTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        0.65
      );

      // Micro line
      loadTl.fromTo(
        microRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.85
      );

      // Only apply scroll-driven animation on desktop
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        // Scroll-driven animation (exit only)
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([imageRef.current, wordmarkRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, microRef.current], {
                opacity: 1,
                x: 0,
                y: 0,
              });
            },
          },
        });

        // Exit animations (70-100%)
        scrollTl.fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          [subheadlineRef.current, ctaRef.current, microRef.current],
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );

        scrollTl.fromTo(
          wordmarkRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-mirai-navy z-10 overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[80vw] h-[80vw] bg-mirai-coral/20"
        style={{ top: '-20%', right: '-20%', opacity: 0.4 }}
      />

      <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-start px-6 lg:px-0 py-20 lg:py-0">
        {/* Hero Image - Mobile: top, Desktop: left */}
        <div
          ref={imageRef}
          className="relative lg:absolute lg:left-[6vw] lg:top-[14vh] w-full max-w-[320px] lg:max-w-none lg:w-[42vw] h-[300px] lg:h-[72vh] rounded-3xl overflow-hidden shadow-card mb-8 lg:mb-0"
        >
          <img
            src="/hero_kid_robot.jpg"
            alt="Cute friendly robot in learning environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mirai-navy/40 to-transparent" />
        </div>

        {/* Right Content */}
        <div className="relative lg:absolute lg:left-[56vw] lg:top-[10vh] w-full lg:w-[38vw] text-center lg:text-left">
          {/* Wordmark + URL */}
          <div ref={wordmarkRef} className="mb-6 lg:mb-16">
            <h2 className="font-display font-bold text-xl lg:text-3xl text-mirai-white mb-2 lg:mb-3">
              Mirai School
            </h2>
            <span className="glass-pill text-[10px] lg:text-[11px]">
              www.miraischool.com.my
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6 lg:mb-8">
            <h1 className="font-display font-bold text-mirai-white leading-[0.95] text-[36px] sm:text-[44px] lg:text-[clamp(44px,5vw,78px)]">
              <span className="headline-line block">Play AI.</span>
              <span className="headline-line block">Grow AI.</span>
              <span className="headline-line block text-gradient">Build AI.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <div ref={subheadlineRef} className="mb-6 lg:mb-8">
            <p className="text-mirai-gray text-sm lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              AI education built for the long run. Cohort-based. Project-proven. Made for Malaysia.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-4 lg:mb-6">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary w-full sm:w-auto"
            >
              Join a Cohort
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollToSection('pathways')}
              className="btn-secondary w-full sm:w-auto"
            >
              Explore Pathways
            </button>
          </div>

          {/* Micro trust line */}
          <div ref={microRef}>
            <p className="font-mono text-[10px] lg:text-xs text-mirai-gray/70 uppercase tracking-wider">
              Next cohort starts soon — limited seats.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Desktop only */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-mirai-gray/50">
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
