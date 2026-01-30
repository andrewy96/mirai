import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Lightbulb, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TechnicalDirectorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const expertise = [
    { icon: Code, text: 'AI & Machine Learning' },
    { icon: Cpu, text: 'Technical Architecture' },
    { icon: Lightbulb, text: 'Innovation Strategy' },
    { icon: Award, text: 'Curriculum Development' },
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

        // Content entrance
        scrollTl.fromTo(
          contentRef.current,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
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
      id="technical-director"
      className="relative min-h-screen lg:h-screen bg-mirai-navy z-[55] overflow-hidden py-16 lg:py-0"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[90vw] h-[90vw] bg-mirai-coral/20"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.25 }}
      />

      <div className="relative w-full min-h-screen flex items-center justify-center px-6">
        {/* Card */}
        <div
          ref={cardRef}
          className="w-full max-w-4xl rounded-3xl overflow-hidden glass-card"
        >
          <div
            ref={contentRef}
            className="p-8 lg:p-16 flex flex-col items-center text-center"
          >
            {/* Micro label */}
            <span className="glass-pill mb-6 lg:mb-8 inline-flex w-fit text-[10px] lg:text-xs">
              Leadership
            </span>

            {/* Name */}
            <h2
              className="font-display font-bold text-mirai-white mb-2 text-[32px] sm:text-[40px] lg:text-[clamp(40px,4vw,56px)]"
              style={{ lineHeight: 1.1 }}
            >
              Andrew Yap
            </h2>

            {/* Title */}
            <p className="text-mirai-coral font-display font-semibold text-lg lg:text-xl mb-6 lg:mb-8">
              Technical Director
            </p>

            {/* Bio */}
            <p className="text-mirai-gray text-sm lg:text-base leading-relaxed mb-8 lg:mb-10 max-w-2xl">
              Andrew Yap leads the technical vision at Mirai School, bringing expertise in AI and emerging technologies to shape the future of education. With a passion for making technology accessible, Andrew oversees curriculum development and ensures students receive cutting-edge, practical training that prepares them for real-world challenges.
            </p>

            {/* Expertise */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 w-full max-w-2xl">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <item.icon size={24} className="text-mirai-coral" />
                  <span className="text-mirai-white/90 text-xs lg:text-sm text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalDirectorSection;
