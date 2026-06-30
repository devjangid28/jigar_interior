'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.about-fade-in', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-fade-in', start: 'top 85%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = ref.current;
    const img = imageRef.current;
    if (!section || !img) return;

    const lerp = (current: number, target: number, factor: number) =>
      current + (target - current) * factor;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const visible = Math.min(1, Math.max(0,
        (windowHeight - rect.top) / (windowHeight + sectionHeight)
      ));

      targetY.current = (visible - 0.5) * 160;
      currentY.current = lerp(currentY.current, targetY.current, 0.1);
      img.style.transform = `translate3d(0, ${currentY.current}px, 0)`;

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      ref={ref}
      className="px-4 md:px-8 py-20 md:py-28 flex gap-8 md:gap-12 flex-col md:flex-row h-auto md:h-dvh"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="md:flex-1 md:flex md:flex-col h-fit md:h-full md:justify-between gap-4">
        <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
          <div>
            <div className="about-fade-in" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">
                Design as memory — crafted, intelligent, alive
              </span>
            </div>
          </div>
          <div>
            <div className="about-fade-in" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="text-black text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 font-nohemi">
                <p>We design<br />architecture<br />that tells stories.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="about-fade-in" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div className="flex-col gap-8 md:ml-20 lg:ml-24 hidden md:flex">
              <div className="text-sm uppercase font-inter">
                <a className="mr-10 text-theme-dark-green no-underline" href="/about-us">About</a>
                <span className="text-black text-sm uppercase">Founded at the crossroads of design AND technology, Jigar Interiors redefines architectural excellence. Our journey is driven by curiosity, innovation, and a commitment to creating sustainable and intelligent spaces.</span>
              </div>
              <a
                href="/technology-and-innovation"
                className="relative w-fit text-sm uppercase text-black no-underline pb-1 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[1px] after:w-full after:bg-black after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0 inline-flex items-center gap-2 font-inter"
              >
                Technology & Innovation
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-3">
                  <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img
          ref={imageRef}
          alt="Design as memory — crafted, intelligent, alive"
          title="Design as memory — crafted, intelligent, alive"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
          className="w-full object-cover"
          style={{
            height: '135%',
            objectFit: 'cover',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>
      <div>
        <div className="about-fade-in" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <div className="flex-col gap-8 md:ml-20 lg:ml-24 flex md:hidden">
            <div className="text-sm uppercase font-inter">
              <a className="mr-10 text-theme-dark-green no-underline" href="/about-us">About</a>
              <span className="text-black text-sm uppercase">Founded at the crossroads of design and technology, Jigar Interiors redefines architectural excellence through thoughtful design, premium craftsmanship, and modern innovation. Our journey is driven by creativity, precision, sustainability, and the commitment to creating intelligent interior spaces.</span>
            </div>
            <a
              href="/technology-and-innovation"
              className="relative w-fit text-sm uppercase text-black no-underline pb-1 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[1px] after:w-full after:bg-black after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0 inline-flex items-center gap-2 font-inter"
            >
              Technology & Innovation
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-3">
                <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
