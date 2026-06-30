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

      <div className="preloader__logo relative z-10 mt-6 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="118" height="25" viewBox="0 0 118 25" fill="none" className="text-white">
          <path d="M52.989 20.9816L57.8321 5.95312H61.8917L55.8289 23.4761H52.0381" fill="currentColor" />
          <path d="M60.1316 20.9816L64.9747 5.95312H69.0342L62.9715 23.4761H59.1807" fill="currentColor" />
          <path d="M8.68222 6.00162C13.9292 6.00162 17.0636 8.83056 17.0636 13.6063V24.0012H13.0909V19.408C12.2751 22.5552 9.6959 24.4778 6.14964 24.4778C2.60338 24.4778 0 22.3872 0 19.2481C0 16.1089 2.65165 14.0102 7.02816 14.0102H13.0909V13.6047C13.0909 10.9583 11.3886 9.32979 8.60338 9.32979C5.81818 9.32979 4.47949 10.6643 4.47949 12.7387H0.514883C0.514883 8.59791 3.64924 6 8.68222 6V6.00162ZM7.25825 16.8085C5.09735 16.8085 3.95817 17.5549 3.95817 18.9783C3.95817 20.4727 5.22446 21.3064 7.51247 21.3064C10.7578 21.3064 13.0925 19.6293 13.0925 17.3093V16.8085H7.25986H7.25825Z" fill="currentColor" />
          <path d="M23.2324 11.8327C24.0707 8.19275 26.3185 6.00036 29.4142 6.00036C33.6331 6.00036 36.6242 9.82291 36.6242 15.2352C36.6242 20.6475 33.6331 24.4782 29.4142 24.4782C26.3201 24.4782 24.0723 22.2842 23.2324 18.6458V24.0016H19.2598V0.476562H23.2324V11.8327ZM27.9806 21.0111C31.012 21.0111 32.6339 19.0012 32.6339 15.2336C32.6339 11.466 31.012 9.46424 27.9806 9.46424C24.9492 9.46424 23.2324 11.5936 23.2324 15.2336C23.2324 18.8736 24.9975 21.0111 27.9806 21.0111Z" fill="currentColor" />
          <path d="M54.5522 6.47852L48.4895 24.0015H42.7115L36.7051 6.47852H40.8595L45.648 21.507L50.4911 6.47852H54.5506H54.5522Z" fill="currentColor" />
          <path d="M77.4531 23.9918C73.7894 23.9918 71.8425 21.7752 71.8425 17.4825V9.24125H69.5625L70.7323 5.9987H71.8425V1.96289H75.8151V6.00032H81.2133V9.24286H75.8151V17.4922C75.8151 19.662 76.5826 20.6475 78.3236 20.6475C79.0122 20.6475 79.9454 20.4973 81.2117 20.1628V23.3892C79.7958 23.7947 78.544 23.9935 77.4531 23.9935V23.9918Z" fill="currentColor" />
          <path d="M99.0578 17.6503C98.131 21.6085 95.0288 23.9996 90.8663 23.9996C85.666 23.9996 82.168 20.2724 82.168 14.7422C82.168 9.21189 85.6273 5.52344 90.7713 5.52344C95.9154 5.52344 99.1366 9.13111 99.1366 14.7018C99.1366 15.1154 99.1205 15.5209 99.0738 15.9733H86.094C86.427 18.8894 88.2227 20.6375 90.9693 20.6375C93.0513 20.6375 94.4512 19.6278 95.2267 17.6486H99.0578V17.6503ZM95.2026 13.112C94.7826 10.338 93.2557 8.85161 90.7858 8.85161C88.316 8.85161 86.5831 10.4252 86.1487 13.112H95.2026Z" fill="currentColor" />
          <path d="M108.312 14.9008L118 23.5234H112.682L105.006 16.5148V23.5234H101.033V0H105.006V13.589L112.39 6.0004H117.241L108.312 14.9008Z" fill="currentColor" />
        </svg>
        <div className="flex items-center gap-1">
          <span className="w-[5px] h-[5px] bg-white rounded-full" />
          <span className="w-[5px] h-[5px] bg-white rounded-full" />
          <span className="w-[5px] h-[5px] bg-white rounded-full" />
        </div>
        <span className="text-[#b89a6a] text-lg tracking-[0.3em] font-nohemi">T E K</span>
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
