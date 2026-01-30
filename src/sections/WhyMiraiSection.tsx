import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Rocket, MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyMiraiSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Users,
      title: 'Cohort-based learning',
      description: 'Learn with peers. Stay accountable. Finish strong.',
    },
    {
      icon: Rocket,
      title: 'Project-proven',
      description: 'Ship real work, not just complete lessons.',
    },
    {
      icon: MapPin,
      title: 'Local context',
      description: 'Examples, tools, and mentors that fit Malaysia.',
    },
    {
      icon: Sparkles,
      title: 'Future-ready',
      description: 'Skills that stay relevant as technology changes.',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Orb parallax
      gsap.to(orbRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-mirai-navy py-20 lg:py-32 z-[70] overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[60vw] h-[60vw] bg-mirai-coral/15"
        style={{ top: '20%', right: '-20%', opacity: 0.25 }}
      />

      <div className="relative w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left - Headline */}
          <div ref={headlineRef} className="lg:w-[46vw] text-center lg:text-left">
            <h2
              className="font-display font-bold text-mirai-white mb-4 lg:mb-6 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3.6vw,56px)]"
              style={{ lineHeight: 1.05 }}
            >
              Why learn with Mirai?
            </h2>
            <p className="text-mirai-gray text-sm lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              We combine local context with a future-ready curriculum—so learners build skills that last.
            </p>
          </div>

          {/* Right - Feature Cards */}
          <div ref={cardsRef} className="lg:w-[38vw] space-y-3 lg:space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-card p-5 lg:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.02] cursor-pointer group"
              >
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-mirai-coral/20 flex items-center justify-center group-hover:bg-mirai-coral/30 transition-colors">
                    <feature.icon size={18} className="text-mirai-coral" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-mirai-white text-base lg:text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-mirai-gray text-xs lg:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMiraiSection;
