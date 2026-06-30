'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Greenstone Equity Partners office',
    location: 'Burj Khalifa, Dubai, UAE',
    description: 'A workspace envisioned as a living system — where technology, light, and form converge to elevate the rhythm of modern work.',
    link: '/our-projects/greenstone-equity-partners-office',
    images: [
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/08-greenstone-cafe-02-new.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/01-greenstone-reception.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/18-greenstone-ceo-office.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/12-greenstone-manager-office.webp',
    ],
  },
  {
    title: 'Ina Office',
    location: 'Burj Khalifa, Dubai, UAE',
    description: 'Located in Burj Khalifa, the INA Office is a culturally driven corporate space that brings together the essence of Japanese refinement and UAE regional identity.',
    link: '/our-projects/ina-office',
    images: [
      'https://cp.abvtek.com/assets/ina-01.webp',
      'https://cp.abvtek.com/assets/ina-03.webp',
      'https://cp.abvtek.com/assets/ina-04.webp',
      'https://cp.abvtek.com/assets/ina-02.webp',
    ],
  },
  {
    title: 'Lucky Punch Gym',
    location: 'Boxpark, Dubai, UAE',
    description: 'Lucky Punch redefines the traditional boxing gym by transforming it into a high-energy lifestyle destination.',
    link: '/our-projects/lucky-punch-gym',
    images: [
      'https://cp.abvtek.com/assets/lucky-punch-03.webp',
      'https://cp.abvtek.com/assets/lucky-punch-01.webp',
      'https://cp.abvtek.com/assets/lucky-punch-02.webp',
      'https://cp.abvtek.com/assets/projects/lucky-punch-dubai/gallery/lucky-punch-dubaidsc01213b.webp',
    ],
  },
];

function ProjectSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative group">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className="min-w-full flex-shrink-0">
            <img src={src} alt={`Slide ${i + 1}`} className="w-full h-96 object-cover" draggable={false} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white px-3 py-1 rounded-full text-sm font-medium tabular-nums bg-black/30 font-inter">
        {String(current + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
      </div>
      <button onClick={prev} className="project-slider-btn project-slider-btn--prev" aria-label="Previous">‹</button>
      <button onClick={next} className="project-slider-btn project-slider-btn--next" aria-label="Next">›</button>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.project-card', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-0 bg-theme-iron">
      <div className="md:hidden px-4">
        {projects.map((project) => (
          <div key={project.title} className="mb-16 last:mb-0 project-card text-center">
            <div className="relative overflow-hidden">
              <ProjectSlider images={project.images} />
            </div>
            <div className="mt-8">
              <h2 className="text-center text-[28px] uppercase leading-9 text-black font-nohemi">{project.title}</h2>
              <p className="text-sm uppercase mt-4 text-black/60 font-inter">{project.location}</p>
            </div>
            <p className="text-black/70 text-sm mt-4 text-center max-w-md mx-auto font-inter">
              {project.description}
            </p>
            <a href={project.link} className="inline-flex items-center gap-2 text-sm uppercase text-black no-underline relative w-fit pb-1 mt-6 border-b border-black hover:border-transparent transition-all duration-500 group font-inter">
              more about the project
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        ))}
        <div className="flex justify-center pb-16">
          <a href="/our-projects" className="inline-flex items-center gap-2 text-sm uppercase text-black no-underline relative w-fit pb-1 border-b border-black hover:border-transparent transition-all duration-500 group font-inter">
            VIEW ALL PROJECTS
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
              <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hidden md:block" style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
        <div className="flex flex-col sticky top-0 h-dvh overflow-hidden">
          <div className="grow flex items-center overflow-hidden px-4 md:px-8">
            <div className="flex items-start my-auto gap-8 lg:gap-16 will-change-transform overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {projects.map((project) => (
                <div key={project.title} className="flex-shrink-0" style={{ minWidth: '500px', maxWidth: '600px' }}>
                  <div className="flex flex-col gap-6">
                    <div className="relative overflow-hidden">
                      <ProjectSlider images={project.images} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-[28px] uppercase leading-9 text-black font-nohemi">{project.title}</h2>
                      <p className="text-sm uppercase mt-2 text-black/60 font-inter">{project.location}</p>
                    </div>
                    <p className="text-black/70 text-sm max-w-md font-inter">
                      {project.description}
                    </p>
                    <a href={project.link} className="inline-flex items-center gap-2 text-sm uppercase text-black no-underline relative w-fit pb-1 border-b border-black hover:border-transparent transition-all duration-500 group font-inter">
                      more about the project
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                        <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-8">
            <a href="/our-projects" className="inline-flex items-center gap-2 text-sm uppercase text-black no-underline relative w-fit pb-1 border-b border-black hover:border-transparent transition-all duration-500 group font-inter">
              VIEW ALL PROJECTS
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
