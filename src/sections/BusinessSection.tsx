import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Monitor, BadgeCheck, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BusinessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: FileText, text: 'Custom curriculum' },
    { icon: Monitor, text: 'On-site or virtual' },
    { icon: BadgeCheck, text: 'HRD Corp claimable' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Orb animation
      gsap.to(orbRef.current, {
        opacity: 0.5,
        scale: 1.1,
        duration: 5,
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

        // Card entrance
        scrollTl.fromTo(
          cardRef.current,
          { y: '90vh', opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );

        // Image inner parallax
        scrollTl.fromTo(
          imageRef.current,
          { scale: 1.1, x: -20 },
          { scale: 1, x: 0, ease: 'none' },
          0
        );

        // Content entrance
        scrollTl.fromTo(
          contentRef.current,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );

        // EXIT (70-100%)
        scrollTl.fromTo(
          cardRef.current,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business"
      className="relative min-h-screen lg:h-screen bg-mirai-navy z-[60] overflow-hidden py-16 lg:py-0"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[90vw] h-[90vw] bg-mirai-coral/20"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.25 }}
      />

      <div className="relative w-full min-h-screen flex items-center justify-center px-6">
        {/* Large Card */}
        <div
          ref={cardRef}
          className="w-full max-w-6xl h-auto lg:h-[62vh] lg:min-h-[500px] rounded-3xl overflow-hidden glass-card flex flex-col lg:flex-row"
        >
          {/* Image - Left side */}
          <div className="relative w-full lg:w-[55%] h-48 lg:h-full overflow-hidden">
            <div ref={imageRef} className="w-full h-full">
              <img
                src="/business_workshop_scene.jpg"
                alt="AI Business Workshop with cute robot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mirai-navy/30 lg:to-transparent" />
          </div>

          {/* Content - Right side */}
          <div
            ref={contentRef}
            className="w-full lg:w-[45%] p-6 lg:p-12 flex flex-col justify-center"
          >
            {/* Micro label */}
            <span className="glass-pill mb-4 lg:mb-6 inline-flex w-fit text-[10px] lg:text-xs">
              For Teams
            </span>

            {/* Headline */}
            <h2
              className="font-display font-bold text-mirai-white mb-3 lg:mb-4 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3vw,48px)]"
              style={{ lineHeight: 1.05 }}
            >
              AI for Business
            </h2>

            {/* Body */}
            <p className="text-mirai-gray text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
              A practical workshop designed for teams. Learn to integrate AI into daily workflows, improve decisions, and move faster.
            </p>

            {/* Features */}
            <div className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 lg:gap-3 text-mirai-white/90"
                >
                  <feature.icon size={16} className="text-mirai-coral flex-shrink-0" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 lg:gap-4">
              <button className="btn-primary text-sm w-full sm:w-auto">
                Request a workshop
                <ArrowRight size={16} />
              </button>
              <button className="text-mirai-gray hover:text-mirai-white text-sm font-medium flex items-center gap-2 transition-colors">
                <Download size={14} />
                Download syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
