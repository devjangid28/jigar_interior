'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    name: 'Architecture & design',
    description: 'We create visionary architectural concepts that blend functionality, aesthetics, and context, shaping spaces that inspire and endure.',
    link: '/service/architecture-design',
  },
  {
    number: '02',
    name: 'Construction & Project Management',
    description: 'We deliver end-to-end project management and construction services, ensuring every build is completed on time, within budget, and to the highest standards of quality and safety.',
    link: '/service/construction-and-project-management',
  },
  {
    number: '03',
    name: 'Interior Design & Build',
    description: 'From concept to completion, we craft immersive interior environments that reflect brand identity, enhance user experience, and elevate the way people live and work.',
    link: '/service/interior-design-and-build',
  },
  {
    number: '04',
    name: 'Interior Fit-Out',
    description: 'We transform shell and core spaces into fully functional, beautifully finished environments — managing every detail from partitioning and MEP to joinery and furnishing.',
    link: '/service/interior-fit-out',
  },
  {
    number: '05',
    name: 'Workplace Consultancy',
    description: 'We help organizations reimagine their workplaces through strategic planning, space utilization analysis, and human-centric design that drives productivity and well-being.',
    link: '/service/workplace-consultancy',
  },
];

const serviceSvgs = [
  <svg key="arc" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 154 154" fill="none" className="shrink-0 text-white/60">
    <path d="M77.6812 0H75.6091V23.7145H77.6812V0Z" fill="currentColor" />
    <path d="M130.104 21.7196L113.336 38.4883L114.801 39.9534L131.57 23.1847L130.104 21.7196Z" fill="currentColor" />
    <path d="M153.28 75.6094H129.576V77.6814H153.28V75.6094Z" fill="currentColor" />
    <path d="M114.815 113.359L113.35 114.824L130.119 131.593L131.584 130.128L114.815 113.359Z" fill="currentColor" />
    <path d="M77.6812 129.574H75.6091V153.289H77.6812V129.574Z" fill="currentColor" />
    <path d="M38.4785 113.344L21.717 130.105L23.1822 131.571L39.9437 114.809L38.4785 113.344Z" fill="currentColor" />
    <path d="M23.7147 75.6094H0V77.6814H23.7147V75.6094Z" fill="currentColor" />
    <path d="M23.1751 21.7028L21.71 23.168L38.4714 39.9293L39.9366 38.4642L23.1751 21.7028Z" fill="currentColor" />
    <path d="M104.312 5.14987L95.4551 27.1484L97.3772 27.9223L106.234 5.92372L104.312 5.14987Z" fill="currentColor" />
    <path d="M146.771 45.6565L124.951 54.9453L125.763 56.8518L147.582 47.5629L146.771 45.6565Z" fill="currentColor" />
    <path d="M126.175 95.5274L125.4 97.4492L147.386 106.31L148.161 104.388L126.175 95.5274Z" fill="currentColor" />
    <path d="M98.3153 125.029L96.4087 125.84L105.694 147.661L107.6 146.85L98.3153 125.029Z" fill="currentColor" />
    <path d="M55.8873 125.33L47.0305 147.328L48.9526 148.102L57.8094 126.103L55.8873 125.33Z" fill="currentColor" />
    <path d="M27.536 96.4065L5.71631 105.695L6.52792 107.602L28.3476 98.313L27.536 96.4065Z" fill="currentColor" />
    <path d="M5.89455 46.9804L5.12036 48.9023L27.1175 57.7629L27.8917 55.841L5.89455 46.9804Z" fill="currentColor" />
    <path d="M47.5731 5.80591L45.6665 6.61719L54.9475 28.4289L56.8542 27.6176L47.5731 5.80591Z" fill="currentColor" />
  </svg>,
  <svg key="constr" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 154 154" fill="none" className="shrink-0 text-white/60">
    <circle cx="77" cy="51" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="51" cy="103" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="103" cy="103" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="77" cy="77" r="18" fill="currentColor" fillOpacity="0.5" />
  </svg>,
  <svg key="interior" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 154 154" fill="none" className="shrink-0 text-white/60">
    <path d="M77 10L84.5 39H125L92.5 57L105 87L77 68L49 87L61.5 57L29 39H69.5L77 10Z" fill="currentColor" fillOpacity="0.7" />
    <circle cx="77" cy="77" r="10" fill="currentColor" />
  </svg>,
  <svg key="fitout" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 154 154" fill="none" className="shrink-0 text-white/60">
    <rect x="20" y="107" width="114" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
    <rect x="20" y="95" width="114" height="8" rx="4" fill="currentColor" fillOpacity="0.5" />
    <rect x="20" y="83" width="114" height="8" rx="4" fill="currentColor" fillOpacity="0.7" />
    <rect x="20" y="71" width="55" height="8" rx="4" fill="currentColor" />
  </svg>,
  <svg key="workplace" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 154 154" fill="none" className="shrink-0 text-white/60">
    <rect x="20" y="20" width="114" height="114" rx="4" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
    <rect x="38" y="38" width="78" height="78" rx="3" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.5" />
    <rect x="56" y="56" width="42" height="42" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="77" cy="77" r="6" fill="currentColor" />
  </svg>,
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.services-fade', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-fade', start: 'top 85%' },
      });
      gsap.to('.service-card', {
        opacity: 1, x: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.service-card', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-black text-white w-full py-20 md:py-28 px-4 md:px-8">
      <div className="flex flex-col gap-8 lg:gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
          <div>
            <div className="services-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <span className="text-theme-dark-green text-xs leading-[120%] tracking-[0.03rem] uppercase font-inter">SERVICES</span>
            </div>
          </div>
          <div>
            <div className="services-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              <div className="text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 text-white font-nohemi">
                <p>Design <br />Meets Purpose</p>
              </div>
            </div>
          </div>
        </div>
        <div className="services-fade text-white indent-16 text-sm leading-[130%] tracking-[0.035rem] uppercase max-w-xl font-inter" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <p>We provide integrated design and build solutions that combine architectural expertise with advanced technology. Our services are structured to support projects from early concept through execution ensuring clarity, efficiency, and high-quality outcomes at every stage.</p>
        </div>
      </div>
      <div className="flex overflow-x-auto mt-12 lg:mt-16 gap-6 lg:gap-12 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {services.map((service, i) => (
          <div key={service.number} className="service-card flex-shrink-0 border border-white/20 px-8 py-8 lg:py-12 flex flex-col justify-between gap-8 transition-transform duration-500 hover:-translate-y-1 service-card-special-styles" style={{
            opacity: 0, x: 40,
            minWidth: '20rem', maxWidth: '28rem',
            maxHeight: '32rem',
          }}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-white text-[1.125rem] lg:text-[1.75rem] leading-normal uppercase font-nohemi">{service.name}</h3>
              {serviceSvgs[i]}
            </div>
            <div className="text-white/70 text-sm lg:text-base font-light leading-[150%] tracking-[-0.022rem] uppercase line-clamp-4 font-inter">
              <p>{service.description}</p>
            </div>
            <a href={service.link} className="inline-flex items-center gap-2 text-sm uppercase text-white no-underline relative w-fit pb-1 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[1px] after:w-full after:bg-white/50 after:transition-transform after:duration-500 after:ease-out after:scale-x-100 after:origin-left hover:after:scale-x-0 font-inter">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
