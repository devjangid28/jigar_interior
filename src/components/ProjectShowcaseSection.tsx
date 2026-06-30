'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectSection from './ProjectSection';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'greenstone',
    title: 'Greenstone Equity Partners Office',
    location: 'Burj Khalifa, Dubai, UAE',
    layout: 'leftSticky' as const,
    cards: [
      {
        category: 'CORPORATE INTERIOR',
        title: 'Executive Suite',
        image: '/1.jpg',
        description:
          'A workspace envisioned as a living system — where technology, light, and form converge to elevate the rhythm of modern work.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Collaborative Hub',
        image: '/1.jpg',
        description:
          'Open-plan environments designed for seamless collaboration, integrating smart technology with biophilic principles.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Executive Boardroom',
        image: '/1.jpg',
        description:
          'An executive boardroom that balances authority with warmth, featuring custom joinery and ambient lighting systems.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Wellness Zone',
        image: '/1.jpg',
        description:
          'Wellness-focused zones that promote employee wellbeing through thoughtful spatial planning and natural materiality.',
      },
    ],
  },
  {
    id: 'ina',
    title: 'INA Office',
    location: 'Business Bay, Dubai, UAE',
    layout: 'rightSticky' as const,
    cards: [
      {
        category: 'CULTURAL DESIGN',
        title: 'Reception & Lounge',
        image: '/2.jpg',
        description:
          'A reception space that embodies the meeting of Japanese minimalism and Emirati heritage through curated materiality.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Private Offices',
        image: '/2.jpg',
        description:
          'Private work sanctuaries designed for deep focus, wrapped in natural textures and diffused daylight.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Meeting Pavilion',
        image: '/2.jpg',
        description:
          'A flexible pavilion for gatherings that transforms from presentation mode to collaborative workshop seamlessly.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Tea Ceremony Room',
        image: '/2.jpg',
        description:
          'A contemplative tea room inspired by chanoyu — a space for ritual, pause, and meaningful connection.',
      },
    ],
  },
  {
    id: 'lucky-punch',
    title: 'Lucky Punch Gym',
    location: 'Boxpark, Dubai, UAE',
    layout: 'leftSticky' as const,
    cards: [
      {
        category: 'FITNESS INTERIOR',
        title: 'Main Arena',
        image: '/3.jpg',
        description:
          'A main arena that pulses with energy — raw concrete, dramatic lighting, and the spirit of the ring.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Training Zone',
        image: '/3.jpg',
        description:
          'A training zone where every surface and sightline is engineered to push performance and motivation.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Recovery Suite',
        image: '/3.jpg',
        description:
          'A recovery suite designed as a calm counterpoint — soft textures, muted tones, and restorative ambiance.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Fuel Bar',
        image: '/3.jpg',
        description:
          'A fuel bar that fuses nutrition with social energy, featuring bold graphics and an open-kitchen concept.',
      },
    ],
  },
];

export default function ProjectShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.showcase-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showcase-fade',
          start: 'top 85%',
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F4F4] pb-12 md:pb-20">
      {/* Section Header */}
      <div className="px-4 md:px-8 pt-20 md:pt-28 pb-8 md:pb-16 max-w-screen-2xl mx-auto">
        <div className="showcase-fade mb-4" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">
            Portfolio
          </span>
        </div>
        <div className="showcase-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <div className="text-black text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase font-nohemi">
            <p>
              Premium
              <br />
              Project Showcase
            </p>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      {projectsData.map((section) => (
        <ProjectSection key={section.id} data={section} />
      ))}
    </section>
  );
}
