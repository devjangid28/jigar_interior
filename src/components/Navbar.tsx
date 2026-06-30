'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Projects', href: '/our-projects' },
  { label: 'Technology & Innovation', href: '/technology-and-innovation' },
  { label: 'Contact Us', href: '/contact-us' },
];

const serviceLinks = [
  { label: 'Architecture & Design', href: '/service/architecture-design' },
  { label: 'Construction & Project Management', href: '/service/construction-and-project-management' },
  { label: 'Interior Design & Build', href: '/service/interior-design-and-build' },
  { label: 'Interior Fit-Out', href: '/service/interior-fit-out' },
  { label: 'Workplace Consultancy', href: '/service/workplace-consultancy' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const menuServicesRef = useRef<HTMLDivElement>(null);
  const menuCtaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (btnRef.current) btnRef.current.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.set(menuRef.current, { display: 'flex' })
        .fromTo(menuRef.current,
          { clipPath: 'circle(0% at 100% 0%)' },
          { clipPath: 'circle(150% at 100% 0%)', duration: 1, ease: 'power4.inOut' }
        )
        .fromTo(
          menuLinksRef.current?.children || [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          menuServicesRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          menuCtaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        );

      if (isOpen) {
        tl.play();
      } else {
        tl.reverse(0.6);
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-100 px-6 sm:px-8 py-4 flex items-center justify-between mix-blend-difference"
      >
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="118" height="25" viewBox="0 0 118 25" fill="none">
            <path d="M52.989 20.9816L57.8321 5.95312H61.8917L55.8289 23.4761H52.0381" fill="currentColor" />
            <path d="M60.1316 20.9816L64.9747 5.95312H69.0342L62.9715 23.4761H59.1807" fill="currentColor" />
            <path d="M8.68222 6.00162C13.9292 6.00162 17.0636 8.83056 17.0636 13.6063V24.0012H13.0909V19.408C12.2751 22.5552 9.6959 24.4778 6.14964 24.4778C2.60338 24.4778 0 22.3872 0 19.2481C0 16.1089 2.65165 14.0102 7.02816 14.0102H13.0909V13.6047C13.0909 10.9583 11.3886 9.32979 8.60338 9.32979C5.81818 9.32979 4.47949 10.6643 4.47949 12.7387H0.514883C0.514883 8.59791 3.64924 6 8.68222 6V6.00162ZM7.25825 16.8085C5.09735 16.8085 3.95817 17.5549 3.95817 18.9783C3.95817 20.4727 5.22446 21.3064 7.51247 21.3064C10.7578 21.3064 13.0925 19.6293 13.0925 17.3093V16.8085H7.25986H7.25825Z" fill="currentColor" />
            <path d="M23.2324 11.8327C24.0707 8.19275 26.3185 6.00036 29.4142 6.00036C33.6331 6.00036 36.6242 9.82291 36.6242 15.2352C36.6242 20.6475 33.6331 24.4782 29.4142 24.4782C26.3201 24.4782 24.0723 22.2842 23.2324 18.6458V24.0016H19.2598V0.476562H23.2324V11.8327ZM27.9806 21.0111C31.012 21.0111 32.6339 19.0012 32.6339 15.2336C32.6339 11.466 31.012 9.46424 27.9806 9.46424C24.9492 9.46424 23.2324 11.5936 23.2324 15.2336C23.2324 18.8736 24.9975 21.0111 27.9806 21.0111Z" fill="currentColor" />
            <path d="M54.5522 6.47852L48.4895 24.0015H42.7115L36.7051 6.47852H40.8595L45.648 21.507L50.4911 6.47852H54.5506H54.5522Z" fill="currentColor" />
            <path d="M77.4531 23.9918C73.7894 23.9918 71.8425 21.7752 71.8425 17.4825V9.24125H69.5625L70.7323 5.9987H71.8425V1.96289H75.8151V6.00032H81.2133V9.24286H75.8151V17.4922C75.8151 19.662 76.5826 20.6475 78.3236 20.6475C79.0122 20.6475 79.9454 20.4973 81.2117 20.1628V23.3892C79.7958 23.7947 78.544 23.9935 77.4531 23.9935V23.9918Z" fill="currentColor" />
            <path d="M99.0578 17.6503C98.131 21.6085 95.0288 23.9996 90.8663 23.9996C85.666 23.9996 82.168 20.2724 82.168 14.7422C82.168 9.21189 85.6273 5.52344 90.7713 5.52344C95.9154 5.52344 99.1366 9.13111 99.1366 14.7018C99.1366 15.1154 99.1205 15.5209 99.0738 15.9733H86.094C86.427 18.8894 88.2227 20.6375 90.9693 20.6375C93.0513 20.6375 94.4512 19.6278 95.2267 17.6486H99.0578V17.6503ZM95.2026 13.112C94.7826 10.338 93.2557 8.85161 90.7858 8.85161C88.316 8.85161 86.5831 10.4252 86.1487 13.112H95.2026Z" fill="currentColor" />
            <path d="M108.312 14.9008L118 23.5234H112.682L105.006 16.5148V23.5234H101.033V0H105.006V13.589L112.39 6.0004H117.241L108.312 14.9008Z" fill="currentColor" />
          </svg>
        </a>
        <div className="flex items-center gap-8">
          <a className="hidden lg:block text-sm uppercase tracking-[0.035rem] font-nohemi" href="/contact-us">Contact Us</a>
          <div className="relative w-10 h-10">
            <button
              ref={btnRef}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <svg width="34" height="17" viewBox="0 0 34 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="34" width="3" height="34" transform="rotate(90 34 0)" fill="currentColor" />
                <rect x="34" y="7" width="3" height="34" transform="rotate(90 34 7)" fill="currentColor" />
                <rect x="34" y="14" width="3" height="34" transform="rotate(90 34 14)" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[200] hidden flex-col justify-between bg-white text-black p-8 md:p-16"
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
      >
        <div className="flex justify-end">
          <button className="cursor-pointer" aria-label="Close menu" onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-24">
          <div ref={menuLinksRef} className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="text-4xl md:text-5xl lg:text-6xl font-nohemi uppercase leading-tight hover:text-theme-dark-green transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div ref={menuServicesRef} className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-black/40 mb-2 font-nohemi">Services</span>
            {serviceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="text-sm md:text-base font-nohemi uppercase hover:text-theme-dark-green transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div ref={menuCtaRef} className="mt-auto pt-8">
          <a
            href="/contact-us"
            onClick={toggleMenu}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.035rem] font-nohemi border-b border-black pb-1 hover:text-theme-dark-green hover:border-theme-dark-green transition-colors duration-300"
          >
            Let&apos;s Talk
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
