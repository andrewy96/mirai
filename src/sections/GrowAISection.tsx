import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderGit2, Trophy, MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GrowAISection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Orb animation
      gsap.to(orbRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const isMobile = window.innerWidth < 1024;
      
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // ENTRANCE (0-30%) - Image from right this time
        scrollTl.fromTo(
          imageRef.current,
          { x: '60vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          headlineRef.current,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

        scrollTl.fromTo(
          bodyRef.current,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

        scrollTl.fromTo(
          ctaRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.18
        );

        // EXIT (70-100%)
        scrollTl.fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '22vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          bodyRef.current,
          { y: 0, opacity: 1 },
          { y: '-4vh', opacity: 0, ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(
          ctaRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: FolderGit2, text: 'Project-based learning' },
    { icon: Trophy, text: 'Portfolio-ready work' },
    { icon: MessageCircle, text: 'Mentor feedback loops' },
  ];

  return (
    <section
      ref={sectionRef}
      id="grow-ai"
      className="relative min-h-screen lg:h-screen bg-mirai-navy z-30 overflow-hidden py-16 lg:py-0"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[70vw] h-[70vw] bg-mirai-coral/18"
        style={{ top: '15%', left: '-20%', opacity: 0.3 }}
      />

      <div className="relative w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-0">
        {/* Content Block - Left side (Mobile: below, Desktop: left) */}
        <div
          ref={contentRef}
          className="relative lg:absolute lg:left-[6vw] lg:top-[18vh] w-full lg:w-[42vw] text-center lg:text-left mt-8 lg:mt-0"
        >
          {/* Micro label */}
          <span className="glass-pill mb-4 lg:mb-6 inline-block text-[10px] lg:text-xs">
            Youth · 13–18 Years Old
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-display font-bold text-mirai-white mb-4 lg:mb-6 text-[36px] sm:text-[40px] lg:text-[clamp(40px,4vw,64px)]"
            style={{ lineHeight: 1.05 }}
          >
            Grow AI
          </h2>

          {/* Body */}
          <div ref={bodyRef}>
            <p className="text-mirai-gray text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
              Skill development with real projects and measurable outcomes. Youth turn interest into ability—portfolios, competitions, and confidence.
            </p>

            {/* Features */}
            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8 flex flex-col items-center lg:items-start">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-mirai-white/90"
                >
                  <feature.icon size={18} className="text-mirai-coral flex-shrink-0" />
                  <span className="text-sm lg:text-base">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button ref={ctaRef} className="btn-secondary text-sm">
            View Youth Pathway
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Portrait Card - Right side (Mobile: top, Desktop: right) */}
        <div
          ref={imageRef}
          className="relative lg:absolute lg:right-[6vw] lg:top-[16vh] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none lg:w-[38vw] h-[350px] lg:h-[68vh] rounded-3xl overflow-hidden glass-card"
        >
          <img
            src="/grow_teen_glasses.jpg"
            alt="Asian youth learning AI"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GrowAISection;
