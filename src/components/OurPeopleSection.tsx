'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_POOL = [
  'https://cp.abvtek.com/assets/projects/difc-office/gallery/difc-office-meeting_area_001_00004k0.webp',
  'https://cp.abvtek.com/assets/projects/kempinski-apartment/gallery/kempinski-apartment-dsc06750-s2.webp',
  'https://cp.abvtek.com/assets/projects/lapis-bespoke/lapis-bespoke-hero-cam01-1.webp',
  'https://cp.abvtek.com/assets/projects/palm-jumeirah-villa-m12/palm-jumeirah-villa-hero-m12_dining_kitchen.webp',
];

const COLS = 6;
const ROWS = 6;
const JITTER = 0.35;
const REVEAL_RADIUS = 180;
const LERP_SPEED = 0.08;

interface TrailItem {
  pctX: number;
  pctY: number;
  image: string;
}

function generateTrails(): TrailItem[] {
  const items: TrailItem[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cx = (col + 0.5) / COLS;
      const cy = (row + 0.5) / ROWS;
      const jx = (Math.random() - 0.5) * 2 * JITTER / COLS;
      const jy = (Math.random() - 0.5) * 2 * JITTER / ROWS;
      items.push({
        pctX: (cx + jx) * 90 + 5,
        pctY: (cy + jy) * 85 + 5,
        image: IMAGE_POOL[items.length % IMAGE_POOL.length],
      });
    }
  }
  return items;
}

export default function OurPeopleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);
  const [trails] = useState(generateTrails);
  const stateRef = useRef<number[]>(
    Array.from({ length: trails.length }, () => 0)
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.people-fade', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.people-fade', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const updatePositions = () => {
      const rect = section.getBoundingClientRect();
      const w = rect.width - 173;
      const h = rect.height - 173;
      trails.forEach((t, i) => {
        const el = trailRefs.current[i];
        if (!el) return;
        const px = (t.pctX / 100) * w;
        const py = (t.pctY / 100) * h;
        el.style.left = `${px}px`;
        el.style.top = `${py}px`;
        positionsRef.current[i] = { x: px + 86.5, y: py + 86.5 };
      });
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const update = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let i = 0; i < trails.length; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const pos = positionsRef.current[i];
        if (!pos) continue;
        const dx = mx - pos.x;
        const dy = my - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const targetOpacity = dist < REVEAL_RADIUS ? 1 : 0;

        stateRef.current[i] += (targetOpacity - stateRef.current[i]) * LERP_SPEED;

        el.style.opacity = String(stateRef.current[i]);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updatePositions);
      cancelAnimationFrame(rafRef.current);
    };
  }, [trails]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh px-4 md:px-8 py-28 md:py-20 overflow-hidden bg-[linear-gradient(0deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.78)_100%),var(--bg-image)] bg-[lightgray] bg-center bg-cover bg-no-repeat"
      style={{
        '--bg-image': 'url(https://cp.abvtek.com/assets/home-page/team-background.jpg)',
      } as React.CSSProperties}
    >
      <div className="relative z-10">
        <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
          <div>
            <div className="people-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <span className="text-theme-dark-green font-nohemi text-xs leading-[120%] tracking-[0.03rem] uppercase">
                OUR PEOPLE
              </span>
            </div>
          </div>
          <div>
            <div className="people-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="text-black font-nohemi text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24">
                <p>
                  Our greatest strength -<br />
                  creativity<br />
                  collaboration and<br />
                  innovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {trails.map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="trail-image"
          style={{ opacity: 0 }}
        >
          <img
            alt=""
            loading="lazy"
            width={173}
            height={173}
            className="w-full h-full object-contain"
            src={IMAGE_POOL[i % IMAGE_POOL.length]}
          />
        </div>
      ))}
    </section>
  );
}
