'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.contact-fade', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-fade', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={ref} className="bg-black text-white py-20 md:py-28 px-4 md:px-8" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <div className="contact-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <span className="text-white/60 text-xs tracking-[0.03rem] uppercase font-inter">Write us</span>
          </div>
          <div className="contact-fade mt-4" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div className="text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 text-white font-nohemi">
              <p>Great interiors<br />begins with a<br />conversation</p>
            </div>
          </div>
          <div className="contact-fade mt-6" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <span className="text-white/60 text-xs tracking-[0.03rem] uppercase font-inter">🇦🇪 AE</span>
          </div>
        </div>
        <div className="contact-fade self-end flex flex-col gap-6" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <div className="border-b border-white/30 pb-2 flex items-center">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 placeholder:text-white/40 font-inter"
            />
          </div>
          <div className="border-b border-white/30 pb-2 flex items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 placeholder:text-white/40 font-inter"
            />
          </div>
          <div className="border-b border-white/30 pb-2 flex items-center gap-3">
            <span className="text-sm text-white/60 font-inter shrink-0 flex items-center gap-1.5">
              <span className="text-base">🇦🇪</span>
              +971
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 placeholder:text-white/40 font-inter"
            />
          </div>
          <div className="border-b border-white/30 pb-2 flex items-center">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 placeholder:text-white/40 font-inter"
            />
          </div>
          <div className="border-b border-white/30 pb-2 flex items-start">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows={3}
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 placeholder:text-white/40 resize-none font-inter"
            />
          </div>
          <div className="flex justify-end">
            <button className="text-white text-xs tracking-[0.3em] uppercase flex items-center gap-2 hover:text-white/70 transition-colors font-inter">
              SEND →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
