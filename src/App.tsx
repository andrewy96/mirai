import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import PlayAISection from './sections/PlayAISection';
import GrowAISection from './sections/GrowAISection';
import BuildAISection from './sections/BuildAISection';
import CourseCardsSection from './sections/CourseCardsSection';
import BusinessSection from './sections/BusinessSection';
import WhyMiraiSection from './sections/WhyMiraiSection';
import PathwaysSection from './sections/PathwaysSection';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only setup global snap on desktop
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    // Global snap configuration for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-mirai-navy min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Play AI */}
        <PlayAISection />
        
        {/* Section 3: Grow AI */}
        <GrowAISection />
        
        {/* Section 4: Build AI */}
        <BuildAISection />
        
        {/* Section 5: Course Cards */}
        <CourseCardsSection />
        
        {/* Section 6: Business Workshop */}
        <BusinessSection />
        
        {/* Section 7: Why Mirai */}
        <WhyMiraiSection />
        
        {/* Section 8: Age Pathways */}
        <PathwaysSection />

        {/* Section 9: Customer Reviews */}
        <ReviewsSection />

        {/* Section 10: Contact */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
