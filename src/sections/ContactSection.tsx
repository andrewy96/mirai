import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enrollingFor: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left block animation
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 40, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        enrollingFor: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-mirai-offwhite py-20 lg:py-32 z-[90]"
    >
      <div className="relative w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 max-w-7xl mx-auto">
          {/* Left - Contact Info */}
          <div ref={leftRef} className="lg:w-[40vw] text-center lg:text-left">
            <h2
              className="font-display font-bold text-mirai-navy mb-4 lg:mb-6 text-[28px] sm:text-[36px] lg:text-[clamp(32px,3.6vw,56px)]"
              style={{ lineHeight: 1.05 }}
            >
              Ready to start?
            </h2>
            <p className="text-gray-600 text-sm lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0">
              Tell us who you're enrolling for. We'll recommend the right pathway and schedule.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 lg:space-y-4 flex flex-col items-center lg:items-start">
              <a
                href="mailto:hello@miraischool.com.my"
                className="flex items-center gap-3 text-mirai-navy hover:text-mirai-coral transition-colors group"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center group-hover:bg-mirai-coral/20 transition-colors flex-shrink-0">
                  <Mail size={16} className="text-mirai-navy group-hover:text-mirai-coral" />
                </div>
                <span className="font-mono text-xs lg:text-sm">hello@miraischool.com.my</span>
              </a>
              
              <a
                href="tel:+60123456789"
                className="flex items-center gap-3 text-mirai-navy hover:text-mirai-coral transition-colors group"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center group-hover:bg-mirai-coral/20 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-mirai-navy group-hover:text-mirai-coral" />
                </div>
                <span className="font-mono text-xs lg:text-sm">+60 12-345 6789</span>
              </a>
              
              <div className="flex items-center gap-3 text-mirai-navy">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-mirai-navy" />
                </div>
                <span className="text-xs lg:text-sm">Kuala Lumpur / Johor Bahru</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            ref={formRef}
            className="lg:w-[42vw]"
          >
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-10">
              {submitted ? (
                <div className="text-center py-10 lg:py-12">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 lg:mb-6">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-xl lg:text-2xl text-mirai-navy mb-2 lg:mb-3">
                    Message sent!
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-mirai-navy mb-1.5 lg:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:border-mirai-coral focus:ring-2 focus:ring-mirai-coral/20 outline-none transition-all text-mirai-white text-sm"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-mirai-navy mb-1.5 lg:mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:border-mirai-coral focus:ring-2 focus:ring-mirai-coral/20 outline-none transition-all text-mirai-white text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-mirai-navy mb-1.5 lg:mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:border-mirai-coral focus:ring-2 focus:ring-mirai-coral/20 outline-none transition-all text-mirai-white text-sm"
                        placeholder="+60 XX-XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-mirai-navy mb-1.5 lg:mb-2">
                      I'm enrolling for
                    </label>
                    <select
                      name="enrollingFor"
                      value={formData.enrollingFor}
                      onChange={handleChange}
                      required
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:border-mirai-coral focus:ring-2 focus:ring-mirai-coral/20 outline-none transition-all text-mirai-white text-sm bg-white"
                    >
                      <option value="">Select an option</option>
                      <option value="myself">Myself</option>
                      <option value="child">My child</option>
                      <option value="team">My team / company</option>
                      <option value="school">School / institution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-mirai-navy mb-1.5 lg:mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border border-gray-200 focus:border-mirai-coral focus:ring-2 focus:ring-mirai-coral/20 outline-none transition-all text-mirai-white text-sm resize-none"
                      placeholder="Tell us more about your goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary justify-center disabled:opacity-70 disabled:cursor-not-allowed text-sm py-2.5 lg:py-3"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 lg:h-5 lg:w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="mt-16 lg:mt-24 pt-10 lg:pt-12 border-t border-gray-200"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-col items-center gap-6 lg:gap-8">
            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs lg:text-sm text-gray-600 hover:text-mirai-navy transition-colors">
                Courses
              </button>
              <button onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs lg:text-sm text-gray-600 hover:text-mirai-navy transition-colors">
                Pathways
              </button>
              <button onClick={() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs lg:text-sm text-gray-600 hover:text-mirai-navy transition-colors">
                Business
              </button>
              <button className="text-xs lg:text-sm text-gray-600 hover:text-mirai-navy transition-colors">
                Privacy
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 lg:gap-4">
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center hover:bg-mirai-coral/20 transition-colors group">
                <Instagram size={16} className="text-mirai-navy group-hover:text-mirai-coral" />
              </a>
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center hover:bg-mirai-coral/20 transition-colors group">
                <Linkedin size={16} className="text-mirai-navy group-hover:text-mirai-coral" />
              </a>
              <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-mirai-navy/10 flex items-center justify-center hover:bg-mirai-coral/20 transition-colors group">
                <Youtube size={16} className="text-mirai-navy group-hover:text-mirai-coral" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs lg:text-sm text-gray-500">
              © Mirai School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
