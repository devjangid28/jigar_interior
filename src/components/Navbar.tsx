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
          <svg xmlns="http://www.w3.org/2000/svg" width="340" height="36" viewBox="0 0 340 36" fill="none">
            <text x="2" y="25" fill="currentColor" fontFamily="'Nohemi', 'Inter', sans-serif" fontSize="20" fontWeight="700" letterSpacing="0.12em">JIGAR INTERIORS</text>
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
