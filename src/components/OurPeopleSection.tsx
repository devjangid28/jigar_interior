'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trailImages = [
  'https://cp.abvtek.com/assets/home-page/team-trail-01.webp',
  'https://cp.abvtek.com/assets/home-page/team-trail-02.webp',
  'https://cp.abvtek.com/assets/home-page/team-trail-03.webp',
];

export default function OurPeopleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.people-fade', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.people-fade', start: 'top 85%' },
      });

      gsap.to('.trail-image', {
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top center' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{
        '--bg-image': 'url(https://cp.abvtek.com/assets/home-page/team-background.jpg)',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.78) 100%), var(--bg-image)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } as React.CSSProperties}
    >
      <div ref={trailRef} className="absolute inset-0 z-1 pointer-events-none">
        {trailImages.map((src, i) => (
          <div
            key={i}
            className="trail-image"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
          <div>
            <div className="people-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">OUR PEOPLE</span>
            </div>
          </div>
          <div>
            <div className="people-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 text-white font-nohemi">
                <p>Our greatest strength —<br />creativity,<br />collaboration and<br />innovation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <a href="/about-us" className="people-fade inline-flex items-center gap-2 text-sm uppercase text-white no-underline relative w-fit pb-1 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[1px] after:w-full after:bg-white/50 after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0 font-inter" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            ABOUT US
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
              <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
