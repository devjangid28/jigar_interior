'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.fonts.ready.then(() => {
      gsap.to('.hero-text', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.3 });
      gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
    });
  }, []);

  return (
    <div className="h-dvh w-full relative">
      <video className="absolute inset-0 w-full h-screen object-cover z-0" autoPlay muted playsInline loop>
        <source src="https://cp.abvtek.com/assets/home-page/website-intro-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute z-10 inset-0 size-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)' }} />
      <div className="z-20 relative h-full w-full flex flex-col md:flex-row justify-end items-end gap-8 md:gap-20 pb-8 md:pb-10 px-4 md:px-8">
        <div>
          <div className="hero-text" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div className="text-[40px] leading-10 md:leading-none uppercase md:text-6xl font-medium text-white font-nohemi">
              <h1>where design meet data where ideas become built realities</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-subtitle" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div className="text-sm text-white flex items-end justify-end font-inter">
              <h2>At Jigar Interiors, we blend innovation and intelligence to design the spaces of tomorrow</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
