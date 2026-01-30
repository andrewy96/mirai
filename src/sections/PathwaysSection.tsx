import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PathwaysSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const pathways = [
    {
      image: '/pathway_kids_scene.jpg',
      title: 'Play AI',
      ages: '7–12 years old',
      tagline: 'Play. Learn. Adapt.',
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      image: '/pathway_youth_scene.jpg',
      title: 'Grow AI',
      ages: '13–18 years old',
      tagline: 'Gain. Refine. Operate.',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      image: '/pathway_adult_scene.jpg',
      title: 'Build AI',
      ages: '19–25 years old',
      tagline: 'Build. Utilize. Innovate.',
      color: 'from-orange-500/20 to-mirai-coral/20',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Orb parallax
      gsap.to(orbRef.current, {
        y: -30,
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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Columns animation
      const columns = columnsRef.current?.querySelectorAll('.pathway-card');
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 80, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image parallax within cards
      const images = columnsRef.current?.querySelectorAll('.pathway-image');
      if (images) {
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { y: 0 },
            {
              y: -20,
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pathways"
      className="relative bg-mirai-navy py-20 lg:py-32 z-[80] overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[50vw] h-[50vw] bg-mirai-coral/12"
        style={{ bottom: '10%', left: '-10%', opacity: 0.2 }}
      />

      <div className="relative w-full px-6 lg:px-12">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-bold text-mirai-white text-center mb-10 lg:mb-16 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3.6vw,56px)]"
          style={{ lineHeight: 1.05 }}
        >
          A pathway for every age.
        </h2>

        {/* Columns */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8"
        >
          {pathways.map((pathway, index) => (
            <div
              key={index}
              className="pathway-card rounded-3xl overflow-hidden glass-card group cursor-pointer transition-all duration-500 hover:shadow-card-hover hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 lg:h-64 overflow-hidden">
                <div className="pathway-image absolute inset-0">
                  <img
                    src={pathway.image}
                    alt={pathway.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${pathway.color} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-mirai-navy via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 lg:p-8">
                <span className="font-mono text-[10px] lg:text-xs text-mirai-coral uppercase tracking-wider mb-1 lg:mb-2 block">
                  {pathway.ages}
                </span>
                <h3 className="font-display font-bold text-xl lg:text-3xl text-mirai-white mb-1 lg:mb-2">
                  {pathway.title}
                </h3>
                <p className="text-mirai-gray text-sm mb-4 lg:mb-6">
                  {pathway.tagline}
                </p>
                <button className="text-mirai-white text-sm font-medium flex items-center gap-2 group/btn hover:text-mirai-coral transition-colors">
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathwaysSection;
