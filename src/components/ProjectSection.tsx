'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import StickyGallery from './StickyGallery';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  category: string;
  title: string;
  image: string;
  description: string;
}

interface SectionData {
  title: string;
  location: string;
  layout: 'leftSticky' | 'rightSticky';
  cards: CardData[];
}

export default function ProjectSection({ data }: { data: SectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      data.cards.forEach((_, index) => {
        const trigger = cardRefs.current[index];
        if (!trigger) return;

        ScrollTrigger.create({
          trigger,
          start: 'top center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [data.cards]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      {/* Transparent watermark heading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <div className="text-center">
          <h2
            className="text-black/[0.04] font-nohemi font-bold whitespace-nowrap select-none leading-none tracking-tighter"
            style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
          >
            {data.title}
          </h2>
          <p
            className="text-black/[0.03] font-nohemi font-light select-none tracking-wide"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 3rem)' }}
          >
            {data.location}
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className={`relative z-10 hidden md:flex ${
          data.layout === 'rightSticky' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Sticky Gallery Side */}
        <div className="w-1/2 sticky top-0 h-screen overflow-hidden">
          <StickyGallery
            images={data.cards.map((c) => c.image)}
            activeIndex={activeIndex}
            alt={data.title}
          />
        </div>

        {/* Scrollable Cards Side */}
        <div className="w-1/2">
          {data.cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="min-h-screen flex items-center"
            >
              <ProjectCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="relative z-10 flex md:hidden flex-col">
        {data.cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="flex flex-col"
          >
            <div className="w-full h-[50vh] overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="px-4 py-12">
              <span className="text-theme-dark-green text-xs tracking-[0.03rem] uppercase font-inter">
                {card.category}
              </span>
              <h3 className="text-black text-2xl font-nohemi uppercase mt-2">
                {card.title}
              </h3>
              <p className="text-black/60 text-sm mt-4 font-inter leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
