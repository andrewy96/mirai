import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CourseCardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      ref: card1Ref,
      image: '/card_thumb_literacy.jpg',
      title: 'AI Literacy',
      subtitle: '6 weeks · Part-time',
      price: 'RM 1,200',
      badge: null,
    },
    {
      ref: card2Ref,
      image: '/card_thumb_builder.jpg',
      title: 'AI Builder',
      subtitle: '12 weeks · Part-time',
      price: 'RM 1,800',
      badge: 'Most popular',
    },
    {
      ref: card3Ref,
      image: '/card_thumb_business.jpg',
      title: 'AI for Business',
      subtitle: '10–12 weeks · Part-time',
      price: 'RM 2,200–2,500',
      badge: null,
    },
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
            end: '+=140%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Title entrance
        scrollTl.fromTo(
          titleRef.current,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        // Card 1 (left) entrance
        scrollTl.fromTo(
          card1Ref.current,
          { x: '-60vw', opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );

        // Card 2 (center) entrance
        scrollTl.fromTo(
          card2Ref.current,
          { y: '70vh', opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0.05
        );

        // Card 3 (right) entrance
        scrollTl.fromTo(
          card3Ref.current,
          { x: '60vw', opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.1
        );

        // EXIT (70-100%)
        scrollTl.fromTo(
          titleRef.current,
          { y: 0, opacity: 1 },
          { y: '-3vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          card1Ref.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          card2Ref.current,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.72
        );

        scrollTl.fromTo(
          card3Ref.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.74
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative min-h-screen lg:h-screen bg-mirai-navy z-50 overflow-hidden py-16 lg:py-0"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[80vw] h-[80vw] bg-mirai-coral/16"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.25 }}
      />

      <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display font-bold text-mirai-white text-center mb-8 lg:mb-12 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3.6vw,56px)]"
          style={{ lineHeight: 1.05 }}
        >
          Choose your starting point.
        </h2>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-7xl">
          {courses.map((course, index) => (
            <div
              key={index}
              ref={course.ref}
              className="w-full max-w-[340px] lg:w-[26vw] lg:max-w-[360px] h-auto lg:h-[62vh] lg:min-h-[480px] rounded-3xl overflow-hidden glass-card group cursor-pointer transition-all duration-500 hover:shadow-card-hover hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-44 lg:h-[45%] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {course.badge && (
                  <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex items-center gap-1.5 bg-mirai-coral text-white text-[10px] lg:text-xs font-semibold px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full">
                    <Star size={10} fill="currentColor" />
                    {course.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 lg:p-8 flex flex-col">
                <h3 className="font-display font-bold text-lg lg:text-2xl text-mirai-white mb-1 lg:mb-2">
                  {course.title}
                </h3>
                <p className="text-mirai-gray text-xs lg:text-sm mb-3 lg:mb-4">
                  {course.subtitle}
                </p>
                <p className="font-display font-bold text-xl lg:text-3xl text-mirai-coral mb-4 lg:mb-6">
                  {course.price}
                </p>
                <div className="mt-auto">
                  <button className="w-full btn-secondary justify-center group/btn text-sm py-2.5 lg:py-3">
                    See details
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCardsSection;
