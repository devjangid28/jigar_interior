'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.footer-fade', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-fade', start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const links = [
    { label: 'About US', href: '/about-us' },
    { label: 'Technology & Innovation', href: '/technology-and-innovation' },
    { label: 'Projects', href: '/our-projects' },
    { label: 'Contact US', href: '/contact-us' },
    { label: 'Architecture & design', href: '/service/architecture-design' },
    { label: 'Construction and project management', href: '/service/construction-and-project-management' },
    { label: 'Interior design & build', href: '/service/interior-design-and-build' },
    { label: 'Interior fitout', href: '/service/interior-fit-out' },
    { label: 'workplace consultancy', href: '/service/workplace-consultancy' },
  ];

  return (
    <footer ref={ref} className="bg-black px-4 py-20 md:px-8 md:pt-28 md:pb-8">
      <div className="pb-16 md:pb-28 flex items-start flex-col gap-16 md:justify-between md:flex-row md:gap-20">
        <div className="flex-1">
          <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
            <div className="footer-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <span className="text-white font-nohemi text-xs leading-[120%] tracking-[0.03rem] uppercase">
                Write us
              </span>
            </div>
            <div className="footer-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="font-nohemi text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 text-white">
                Great interiors <br /> begins with a <br className="md:hidden" /> conversation
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <form id="form-contact-form-contact">
            <div className="flex flex-col w-full gap-7">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="NAME"
                  autoComplete="off"
                  className="placeholder:text-white/40 text-white bg-transparent text-base outline-none h-9 w-full py-1 border-b-[0.3px] border-white disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL"
                  autoComplete="off"
                  className="placeholder:text-white/40 text-white bg-transparent text-base outline-none h-9 w-full py-1 border-b-[0.3px] border-white disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex gap-2 bg-transparent border-b-[0.3px] border-white border-t-0 border-x-0 shadow-none rounded-none h-7 text-white text-sm pr-1 pl-0 pb-3 cursor-pointer"
                  >
                    <span className="flex w-[29.7px] h-5 overflow-hidden rounded-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" className="size-full">
                        <title>IN</title>
                        <path fill="#F93" d="M0 0h513v114H0z" />
                        <path fill="#fff" d="M0 114h513v114H0z" />
                        <path fill="#138808" d="M0 228h513v114H0z" />
                        <circle cx="256.5" cy="171" r="34.2" stroke="navy" strokeWidth="4" fill="none" />
                        <circle cx="256.5" cy="171" r="3.42" fill="navy" />
                        <path d="m265.3 138.159-17.6 65.682m17.6-65.682-17.6 65.682m25.8-62.286-34 58.89m41.042-53.487-48.084 48.084M285.945 154l-58.89 34m62.286-25.8-65.682 17.6M290.5 171h-68m66.841 8.8-65.682-17.6m62.286 25.8-58.89-34m53.487 41.042-48.084-48.084m41.042 53.487-34-58.89m25.8 62.286-17.6-65.682M256.5 205v-68m-8.8 66.841 17.6-65.682m-25.8 62.286 34-58.89m-41.042 53.487 48.084-48.084M227.055 188l58.89-34m-62.286 25.8 65.682-17.6M222.5 171h68m-66.841-8.8 65.682 17.6M227.055 154l58.89 34m-53.487-41.042 48.084 48.084M239.5 141.555l34 58.89m-25.8-62.286 17.6 65.682" stroke="navy" strokeWidth="2" />
                      </svg>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5 transition-transform duration-300 ease-in-out">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="099876 54321"
                    autoComplete="tel"
                    className="placeholder:text-white/40 text-white bg-transparent outline-none w-full py-1 border-b-[0.3px] border-white disabled:opacity-50 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="COMPANY"
                  autoComplete="off"
                  className="placeholder:text-white/40 text-white bg-transparent text-base outline-none h-9 w-full py-1 border-b-[0.3px] border-white disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col w-full">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="DETAILS ABOUT YOUR PROJECTS"
                  rows={1}
                  className="placeholder:text-white/40 text-white bg-transparent text-base outline-none w-full border-b-[0.3px] border-white py-3 resize-none disabled:opacity-50 field-sizing-content"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              form="form-contact-form-contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium relative rounded-none border-0 bg-transparent hover:bg-transparent cursor-pointer text-white w-fit px-0 leading-[131%] uppercase transition-all hover:shadow-none font-normal md:text-base after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:h-[1px] after:w-full after:bg-white after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0"
            >
              SEND
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="text-white font-nohemi text-4xl md:text-9xl tracking-[0.15em] uppercase font-bold w-full py-4 text-center">
        Jigar Interiors
      </div>

      <ul className="flex items-center flex-wrap gap-x-1 gap-y-0.5 md:gap-x-4 md:gap-y-1 uppercase text-white justify-center font-nohemi pt-4 text-[6px] md:text-xs">
        {links.map((link, i) => (
          <li key={i} className="flex items-center gap-x-1 md:gap-x-4">
            <a href={link.href} className="hover:opacity-70 transition-opacity no-underline">{link.label}</a>
            <span>/</span>
          </li>
        ))}
        <li className="flex items-center gap-x-1 md:gap-x-4">
          <span>Copyright Jigar Interiors 2026. All Rights Reserved</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
            <circle cx="12.1" cy="12.1" r="1" />
          </svg>
        </li>
        <li className="flex items-center gap-x-1 md:gap-x-4">
          <a href="/privacy-and-cookies" className="hover:opacity-70 transition-opacity no-underline">Privacy & Cookies</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
            <circle cx="12.1" cy="12.1" r="1" />
          </svg>
        </li>
        <li className="flex items-center gap-x-1 md:gap-x-4">
          <a href="/terms-and-conditions" className="hover:opacity-70 transition-opacity no-underline">Terms & Conditions</a>
        </li>
      </ul>
    </footer>
  );
}
