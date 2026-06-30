'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = document.querySelector('.cursor-dot') as HTMLElement | null;
    if (!cursor) return;

    const label = cursor.querySelector('.cursor-label') as HTMLElement | null;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, img, video, [data-cursor]');
      if (target) {
        cursor.classList.add('is-expanded');
        const customLabel = (target as HTMLElement).getAttribute('data-cursor');
        if (label) label.textContent = customLabel || 'VIEW';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, img, video, [data-cursor]');
      if (target) cursor.classList.remove('is-expanded');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 99999,
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#fff', mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
      }}>
        <span className="cursor-label" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', fontSize: '10px',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: '#000', opacity: 0, transition: 'opacity 0.3s ease',
        }}>VIEW</span>
      </div>
      <style>{`
        .cursor-dot.is-expanded { width: 56px !important; height: 56px !important; background: #fff !important; }
        .cursor-dot.is-expanded .cursor-label { opacity: 1 !important; }
      `}</style>
    </>
  );
}
