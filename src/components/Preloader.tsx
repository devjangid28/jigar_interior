'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

const insightCards = [
  'https://cp.abvtek.com/assets/home-page/insight-card-01.webp',
  'https://cp.abvtek.com/assets/home-page/insight-card-02.webp',
  'https://cp.abvtek.com/assets/home-page/insight-card-03.webp',
  'https://cp.abvtek.com/assets/home-page/insight-card-04.webp',
  'https://cp.abvtek.com/assets/home-page/insight-card-05.webp',
  'https://cp.abvtek.com/assets/home-page/insight-card-06.webp',
];

export default function Preloader() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();

    tl.to('.preloader__images', { opacity: 0, duration: 0.4, ease: 'power2.out' }, '+=0.8')
      .to('.preloader__line', { scaleX: 1, transformOrigin: 'left center', duration: 1.8, ease: 'power2.inOut' }, '-=0.1')
      .to('.preloader__logo', { opacity: 0, duration: 0.3 }, '-=0.2')
      .to('.preloader__top', { yPercent: -100, duration: 0.85, ease: 'power3.inOut' }, '-=0.1')
      .to('.preloader__bottom', { yPercent: 100, duration: 0.85, ease: 'power3.inOut' }, '<')
      .set('.preloader', { display: 'none' });
  }, []);

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-[#0b0b0b] flex flex-col items-center justify-center overflow-hidden">
      <div className="preloader__top absolute inset-0 bg-[#0b0b0b]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
      <div className="preloader__bottom absolute inset-0 bg-[#0b0b0b]" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />

      <div className="preloader__images relative z-10 flex gap-3 mb-8">
        {insightCards.map((src, i) => (
          <div
            key={i}
            className="w-[72px] h-[100px] md:w-20 md:h-28 rounded-md overflow-hidden opacity-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: `preloaderCardIn 0.5s ease forwards ${0.1 + i * 0.08}s`,
            }}
          />
        ))}
      </div>

      <div className="preloader__line relative z-10 mt-4 w-48 h-[1px] bg-[#b89a6a] origin-left scale-x-0" />

      <div className="preloader__logo relative z-10 mt-6">
        <span className="text-white text-lg tracking-[0.15em] font-nohemi font-medium uppercase">Jigar Interiors</span>
      </div>

      <div className="preloader__tagline relative z-10 mt-6 text-[#b89a6a] text-[10px] tracking-[0.2em] uppercase text-center font-inter leading-relaxed">
        A technology-first design & build studio crafting intelligent,<br />data-driven spaces that elevate human experience.
      </div>

      <style>{`
        @keyframes preloaderCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
