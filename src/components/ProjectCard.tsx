'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  category: string;
  title: string;
  image: string;
  description: string;
}

export default function ProjectCard({ card }: { card: CardData }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.card-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="px-8 lg:px-16 py-[15vh] w-full">
      <div className="card-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        <span className="text-theme-dark-green text-xs tracking-[0.03rem] uppercase font-inter">
          {card.category}
        </span>
      </div>
      <div className="card-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        <h3 className="text-black text-[2rem] lg:text-[2.5rem] leading-[1.1] font-nohemi uppercase mt-3">
          {card.title}
        </h3>
      </div>
      <div className="card-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        <p className="text-black/60 text-sm lg:text-base mt-4 font-inter leading-relaxed max-w-md">
          {card.description}
        </p>
      </div>
      <div className="card-fade mt-8" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        <div className="w-full aspect-[4/3] overflow-hidden relative">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="card-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        <button className="mt-6 text-xs uppercase tracking-[0.05rem] font-inter text-black/50 hover:text-black transition-colors duration-300">
          View Project &rarr;
        </button>
      </div>
    </div>
  );
}
