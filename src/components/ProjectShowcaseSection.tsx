'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  id: string;
  title: string;
  location: string;
  description: string;
  link: string;
  heroImages: string[];
  galleryImages: string[];
  layout: 'leftSticky' | 'rightSticky';
}

const projectsData: ProjectData[] = [
  {
    id: 'greenstone',
    title: 'Greenstone Equity Partners office',
    location: 'Burj Khalifa, Dubai, UAE',
    description:
      'A workspace envisioned as a living system — where technology, light, and form converge to elevate the rhythm of modern work.',
    link: '/our-projects/greenstone-equity-partners-office',
    heroImages: [
      'https://cp.abvtek.com/assets/projects/greenstone/greenstone-hero.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/08-greenstone-cafe-02-new.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/01-greenstone-reception.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/18-greenstone-ceo-office.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/12-greenstone-manager-office.webp',
    ],
    galleryImages: [
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/08-greenstone-cafe-02-new.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/01-greenstone-reception.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/18-greenstone-ceo-office.webp',
      'https://cp.abvtek.com/assets/projects/greenstone/gallery/12-greenstone-manager-office.webp',
    ],
    layout: 'leftSticky',
  },
  {
    id: 'ina',
    title: 'Ina Office',
    location: 'Burj Khalifa, Dubai, UAE',
    description:
      'Located in Burj Khalifa, the INA Office is a culturally driven corporate space that brings together the essence of Japanese refinement and UAE regional identity. Delivered as a full Design & Build project, the office reflects the client\'s brand values through a thoughtful balance of minimalism, craftsmanship, and symbolic detail.',
    link: '/our-projects/ina-office',
    heroImages: [
      'https://cp.abvtek.com/assets/projects/ina-office/ina-office-hero-20240407-ina-office-18.webp',
      'https://cp.abvtek.com/assets/ina-01.webp',
      'https://cp.abvtek.com/assets/ina-03.webp',
      'https://cp.abvtek.com/assets/ina-04.webp',
      'https://cp.abvtek.com/assets/ina-02.webp',
    ],
    galleryImages: [
      'https://cp.abvtek.com/assets/ina-01.webp',
      'https://cp.abvtek.com/assets/ina-03.webp',
      'https://cp.abvtek.com/assets/ina-04.webp',
      'https://cp.abvtek.com/assets/ina-02.webp',
    ],
    layout: 'rightSticky',
  },
  {
    id: 'lucky-punch',
    title: 'Lucky Punch Gym',
    location: 'Boxpark , Dubai, UAE',
    description:
      'Lucky Punch redefines the traditional boxing gym by transforming it into a high-energy lifestyle destination. Designed to merge raw athletic intensity with bold visual identity, the space captures the spirit of movement, community, and urban culture, where fitness meets entertainment.',
    link: '/our-projects/lucky-punch-gym',
    heroImages: [
      'https://cp.abvtek.com/assets/projects/lucky-punch-dubai/lucky-punch-home-dubaidsc01247-s.webp',
      'https://cp.abvtek.com/assets/lucky-punch-03.webp',
      'https://cp.abvtek.com/assets/lucky-punch-01.webp',
      'https://cp.abvtek.com/assets/lucky-punch-02.webp',
      'https://cp.abvtek.com/assets/projects/lucky-punch-dubai/gallery/lucky-punch-dubaidsc01213b.webp',
    ],
    galleryImages: [
      'https://cp.abvtek.com/assets/lucky-punch-03.webp',
      'https://cp.abvtek.com/assets/lucky-punch-01.webp',
      'https://cp.abvtek.com/assets/lucky-punch-02.webp',
      'https://cp.abvtek.com/assets/projects/lucky-punch-dubai/gallery/lucky-punch-dubaidsc01213b.webp',
    ],
    layout: 'leftSticky',
  },
];

const CTAButton = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium relative rounded-none border-0 bg-transparent hover:bg-transparent cursor-pointer text-black w-fit px-0 leading-[131%] uppercase transition-all hover:shadow-none font-normal md:text-base after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:h-[1px] after:w-full after:bg-black after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0 self-center z-50 flex items-center justify-center gap-2 ${className}`}
  >
    {children}
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
      <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
    </svg>
  </a>
);

function HeroCarousel({ images, alt, activeIndex }: { images: string[]; alt: string; activeIndex: number }) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      if (i === activeIndex) {
        gsap.set(slide, { opacity: 1, pointerEvents: 'auto', x: 0 });
      } else {
        gsap.set(slide, { opacity: 0, pointerEvents: 'none', x: 511 });
      }
    });
  }, [activeIndex]);

  return (
    <div className="embla h-full w-full">
      <div className="embla__viewport h-full">
        <div className="embla__container h-full relative">
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="embla__slide absolute inset-0"
              style={{ opacity: 0, pointerEvents: 'none', transform: 'translateX(511px)' }}
            >
              <img
                src={src}
                alt={`${alt} - ${i + 1}`}
                className="embla__slide__img h-dvh w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'top 30%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={imgRef}
      data-gallery-index={index}
      className="mx-auto w-full"
      style={{ opacity: 0.6, transform: 'translateY(40px) scale(0.85)' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full py-8"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

function DesktopProject({ data, index }: { data: ProjectData; index: number }) {
  const isLeft = data.layout === 'leftSticky';
  const [heroIndex, setHeroIndex] = useState(0);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.galleryImages.length === 0) return;

    const onScroll = () => {
      const elements = projectRef.current?.querySelectorAll('[data-gallery-index]');
      if (!elements || elements.length === 0) return;
      let closestIdx = 0;
      let minDist = Infinity;
      const center = window.innerHeight / 2;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = parseInt(el.getAttribute('data-gallery-index') || '0') + 1;
        }
      });

      setHeroIndex(closestIdx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [data.id, data.galleryImages.length]);

  return (
    <div ref={projectRef} className="grid grid-cols-2 min-h-dvh relative" data-project={data.id}>
      <div className={`min-h-dvh ${isLeft ? 'order-1' : 'order-2'}`}>
        <div className="h-dvh w-full sticky inset-0">
          <HeroCarousel images={data.heroImages} alt={data.title} activeIndex={heroIndex} />
        </div>
      </div>

      <div className={`w-full ${isLeft ? 'order-2' : 'order-1'}`}>
        <div className="flex items-center w-full h-dvh z-50 justify-center font-nohemi top-0 sticky text-black invert-100 mix-blend-difference">
          <div className="flex-col gap-2.5 flex items-center">
            <h2 className="text-center text-[40px] uppercase leading-9 max-w-md px-2">
              {data.title}
            </h2>
            <p className="text-sm uppercase tracking-widest">{data.location}</p>
          </div>
        </div>

        <div className="w-2/3 flex flex-col gap-16 mx-auto" style={{ marginTop: '-220px', marginBottom: '220px' }}>
          <div className="text-sm text-center uppercase text-black">
            <p>{data.description}</p>
          </div>

          <div className="flex flex-col w-full">
            {data.galleryImages.map((src, i) => (
              <GalleryImage key={i} src={src} alt={data.title} index={i} />
            ))}
          </div>

          <div style={{ height: '166px' }} />

          <CTAButton href={data.link}>
            more about the project
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

function MobileProject({ data }: { data: ProjectData }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = data.galleryImages;

  const goToSlide = useCallback((index: number) => {
    setSlideIndex(((index % images.length) + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-theme-iron overflow-hidden h-full flex flex-col gap-6 text-center">
      <div className="relative group">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="min-w-full flex-shrink-0">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-96 object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white font-nohemi px-3 py-1 rounded-full text-sm font-medium tabular-nums bg-black/30">
          {String(slideIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
        </div>
      </div>

      <div>
        <h2 className="text-center text-[28px] uppercase leading-9 font-nohemi text-black">
          {data.title}
        </h2>
        <p className="text-sm uppercase mt-4 text-black tracking-widest">{data.location}</p>
      </div>

      <div className="px-4">
        <p className="text-sm text-black">{data.description}</p>
      </div>

      <CTAButton href={data.link}>
        more about the project
      </CTAButton>
    </div>
  );
}

export default function ProjectShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-fade',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.showcase-fade', start: 'top 85%' },
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-theme-iron py-16 md:py-0">
      {/* Desktop */}
      <div className="hidden md:block">
        {projectsData.map((project, i) => (
          <DesktopProject key={project.id} data={project} index={i} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="px-4 pt-12 pb-8">
          <div className="showcase-fade mb-4" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">
              Portfolio
            </span>
          </div>
          <div className="showcase-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div className="text-black text-[1.75rem] leading-[100%] uppercase font-nohemi">
              <p>Premium<br />Project Showcase</p>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <div className="flex flex-col gap-16 overflow-visible">
            {projectsData.map((project) => (
              <div key={project.id} className="px-4" style={{ marginRight: '0' }}>
                <MobileProject data={project} />
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center mt-12 pb-16">
            <CTAButton href="/our-projects">
              VIEW ALL PROJECTS
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
