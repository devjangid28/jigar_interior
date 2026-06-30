'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function StickyGallery({
  images,
  activeIndex,
  alt,
}: {
  images: string[];
  activeIndex: number;
  alt: string;
}) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef(0);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      // Set first image visible on mount
      if (imageRefs.current[0]) {
        gsap.set(imageRefs.current[0], { opacity: 1, scale: 1 });
      }
      initialRef.current = false;
      return;
    }

    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex) return;
    if (!images.length) return;

    const prev = imageRefs.current[prevIndex];
    const next = imageRefs.current[activeIndex];
    if (!prev || !next) return;

    // Kill any existing animations
    gsap.killTweensOf([prev, next]);

    // Prepare next image
    gsap.set(next, { opacity: 0, scale: 1.05, zIndex: 2 });
    gsap.set(prev, { zIndex: 1 });

    // Crossfade with zoom effect
    const tl = gsap.timeline({ 
      defaults: { duration: 0.8, ease: 'power2.out' },
      onComplete: () => {
        // Cleanup: hide previous image completely
        gsap.set(prev, { opacity: 0, scale: 1.05, zIndex: 0 });
        gsap.set(next, { zIndex: 1 });
      }
    });
    
    tl.to(prev, { opacity: 0, scale: 1.05 }, 0);
    tl.to(next, { opacity: 1, scale: 1 }, 0);

    prevIndexRef.current = activeIndex;
  }, [activeIndex, images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none bg-theme-iron">
      {images.map((src, index) => (
        <div
          key={index}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="absolute inset-0"
          style={{
            opacity: 0,
            scale: 1.05,
            willChange: 'transform, opacity',
            zIndex: 0,
          }}
        >
          <img
            src={src}
            alt={`${alt} - ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
