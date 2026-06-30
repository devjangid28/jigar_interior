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
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        description:
          'A workspace envisioned as a living system \u2014 where technology, light, and form converge to elevate the rhythm of modern work.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Collaborative Hub',
        image:
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
        description:
          'Open-plan environments designed for seamless collaboration, integrating smart technology with biophilic principles.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Executive Boardroom',
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        description:
          'An executive boardroom that balances authority with warmth, featuring custom joinery and ambient lighting systems.',
      },
      {
        category: 'CORPORATE INTERIOR',
        title: 'Wellness Zone',
        image:
          'https://images.unsplash.com/photo-1604328698692-f76ea9498e72?w=800&q=80',
        description:
          'Wellness-focused zones that promote employee wellbeing through thoughtful spatial planning and natural materiality.',
      },
    ],
  },
  {
    id: 'ina',
    title: 'INA Office',
    location: 'Burj Khalifa, Dubai, UAE',
    layout: 'rightSticky' as const,
    cards: [
      {
        category: 'CULTURAL DESIGN',
        title: 'Reception & Lounge',
        image:
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        description:
          'A reception space that embodies the meeting of Japanese minimalism and Emirati heritage through curated materiality.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Private Offices',
        image:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        description:
          'Private work sanctuaries designed for deep focus, wrapped in natural textures and diffused daylight.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Meeting Pavilion',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        description:
          'A flexible pavilion for gatherings that transforms from presentation mode to collaborative workshop seamlessly.',
      },
      {
        category: 'CULTURAL DESIGN',
        title: 'Tea Ceremony Room',
        image:
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
        description:
          'A contemplative tea room inspired by chanoyu \u2014 a space for ritual, pause, and meaningful connection.',
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
        image:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        description:
          'A main arena that pulses with energy \u2014 raw concrete, dramatic lighting, and the spirit of the ring.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Training Zone',
        image:
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
        description:
          'A training zone where every surface and sightline is engineered to push performance and motivation.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Recovery Suite',
        image:
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
        description:
          'A recovery suite designed as a calm counterpoint \u2014 soft textures, muted tones, and restorative ambiance.',
      },
      {
        category: 'FITNESS INTERIOR',
        title: 'Fuel Bar',
        image:
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
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
      <div className="px-4 md:px-8 pt-20 md:pt-28 pb-8 md:pb-16">
        <div className="showcase-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">
            Portfolio
          </span>
        </div>
        <div className="showcase-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <div className="text-black text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 font-nohemi">
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
