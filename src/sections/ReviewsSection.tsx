import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ReviewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      rating: 5,
      text: "My daughter went from being intimidated by technology to confidently building her own AI projects. The instructors made complex concepts accessible and fun.",
      name: "Sarah Chen",
      role: "Parent of Play AI student",
      initials: "SC",
    },
    {
      rating: 5,
      text: "The cohort-based approach kept me accountable. I finally finished a course and have real projects to show for it. The Malaysian context made everything relatable.",
      name: "Ahmad Rizal",
      role: "Grow AI graduate",
      initials: "AR",
    },
    {
      rating: 5,
      text: "As a working professional, I needed practical skills, not theory. Mirai delivered exactly that. Within weeks I was automating tasks that used to take hours.",
      name: "Priya Nair",
      role: "Build AI graduate",
      initials: "PN",
    },
    {
      rating: 5,
      text: "The business workshop transformed how our team thinks about AI. We identified three immediate opportunities to improve our operations.",
      name: "David Lim",
      role: "Business workshop attendee",
      initials: "DL",
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
      const cards = cardsRef.current?.querySelectorAll('.review-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-mirai-coral fill-mirai-coral' : 'text-mirai-gray/30'}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-mirai-navy py-20 lg:py-32 z-[55] overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        ref={orbRef}
        className="gradient-orb w-[50vw] h-[50vw] bg-mirai-coral/15"
        style={{ top: '10%', left: '-15%', opacity: 0.2 }}
      />

      <div className="relative w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12 lg:mb-16">
          <h2
            className="font-display font-bold text-mirai-white mb-4 lg:mb-6 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3.6vw,56px)]"
            style={{ lineHeight: 1.05 }}
          >
            What our learners say
          </h2>
          <p className="text-mirai-gray text-sm lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Real stories from students, parents, and professionals who have transformed their relationship with AI.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-6xl mx-auto"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card glass-card p-6 lg:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.01] group"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote size={24} className="text-mirai-coral/40" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Review text */}
              <p className="text-mirai-gray text-sm lg:text-base leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mirai-coral/20 flex items-center justify-center group-hover:bg-mirai-coral/30 transition-colors">
                  <span className="text-mirai-coral font-semibold text-sm">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-mirai-white text-sm lg:text-base">
                    {review.name}
                  </p>
                  <p className="text-mirai-gray text-xs lg:text-sm">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
