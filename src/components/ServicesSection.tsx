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
  <svg key="arc" xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="shrink-0 group-hover:text-theme-dark-green transition-colors duration-300 size-16 md:size-18 lg:size-30 2xl:size-38">
    <path d="M114.421 115.429H38.8506L37.8506 114.429V38.8594L38.8506 37.8594H114.421L115.421 38.8594V114.429L114.421 115.429ZM39.8606 113.429H113.431V39.8594H39.8606V113.429Z" fill="currentColor" />
    <path d="M95.3599 96.3697H57.9199L56.9199 95.3697V57.9297L57.9199 56.9297H95.3599L96.3599 57.9297V95.3697L95.3599 96.3697ZM58.9199 94.3697H94.3599V58.9297H58.9199V94.3697Z" fill="currentColor" />
    <path d="M75.9304 115.142L38.1504 77.3619V75.9519L75.9304 38.1719H77.3404L115.12 75.9519V77.3619L77.3404 115.142H75.9304ZM40.2704 76.6519L76.6404 113.022L113.01 76.6519L76.6404 40.2819L40.2704 76.6519Z" fill="currentColor" />
    <path d="M77.35 153.29H75.94L0 77.35V75.94L75.93 0H77.34L153.28 75.94V77.35L77.34 153.29H77.35ZM2.10999 76.65L76.64 151.18L151.17 76.65L76.64 2.12L2.10999 76.65Z" fill="currentColor" />
  </svg>,
  <svg key="constr" xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="shrink-0 group-hover:text-theme-dark-green transition-colors duration-300 size-16 md:size-18 lg:size-30 2xl:size-38">
    <path d="M49.5975 98.8793C22.2453 98.8793 0 76.7048 0 49.4397C0 22.1745 22.2554 0 49.5975 0C76.9395 0 99.1949 22.1745 99.1949 49.4397C99.1949 76.7048 76.9395 98.8793 49.5975 98.8793ZM49.5975 2.02414C23.3723 2.02414 2.0306 23.2979 2.0306 49.4397C2.0306 75.5814 23.3723 96.8552 49.5975 96.8552C75.8227 96.8552 97.1643 75.5814 97.1643 49.4397C97.1643 23.2979 75.8227 2.02414 49.5975 2.02414Z" fill="currentColor" />
    <path d="M103.683 98.8793C76.3304 98.8793 54.0852 76.7048 54.0852 49.4397C54.0852 22.1745 76.3304 0 103.683 0C131.035 0 153.28 22.1745 153.28 49.4397C153.28 76.7048 131.025 98.8793 103.683 98.8793ZM103.683 2.02414C77.4574 2.02414 56.1158 23.2979 56.1158 49.4397C56.1158 75.5814 77.4574 96.8552 103.683 96.8552C129.908 96.8552 151.249 75.5814 151.249 49.4397C151.249 23.2979 129.908 2.02414 103.683 2.02414Z" fill="currentColor" />
    <path d="M49.5975 153.289C22.2453 153.289 0 131.115 0 103.85C0 76.5846 22.2554 54.4102 49.5975 54.4102C76.9395 54.4102 99.1949 76.5846 99.1949 103.85C99.1949 131.115 76.9395 153.289 49.5975 153.289ZM49.5975 56.4242C23.3723 56.4242 2.0306 77.6979 2.0306 103.84C2.0306 129.981 23.3723 151.255 49.5975 151.255C75.8227 151.255 97.1643 129.981 97.1643 103.84C97.1643 77.6979 75.8227 56.4242 49.5975 56.4242Z" fill="currentColor" />
    <path d="M103.683 153.289C76.3304 153.289 54.0852 131.115 54.0852 103.85C54.0852 76.5846 76.3406 54.4102 103.683 54.4102C131.025 54.4102 153.28 76.5846 153.28 103.85C153.28 131.115 131.025 153.289 103.683 153.289ZM103.683 56.4242C77.4574 56.4242 56.1158 77.6979 56.1158 103.84C56.1158 129.981 77.4574 151.255 103.683 151.255C129.908 151.255 151.249 129.981 151.249 103.84C151.249 77.6979 129.908 56.4242 103.683 56.4242Z" fill="currentColor" />
  </svg>,
  <svg key="interior" xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="shrink-0 group-hover:text-theme-dark-green transition-colors duration-300 size-16 md:size-18 lg:size-30 2xl:size-38">
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
    <path d="M77.6812 44.1172H75.6091V54.177H77.6812V44.1172Z" fill="currentColor" />
    <path d="M98.91 52.914L91.7966 60.0273L93.2618 61.4925L100.375 54.3792L98.91 52.914Z" fill="currentColor" />
    <path d="M109.166 75.6094H99.106V77.6814H109.166V75.6094Z" fill="currentColor" />
    <path d="M93.2669 91.8317L91.8018 93.2969L98.9151 100.41L100.38 98.945L93.2669 91.8317Z" fill="currentColor" />
    <path d="M77.6812 99.1172H75.6091V109.177H77.6812V99.1172Z" fill="currentColor" />
    <path d="M60.0174 91.8047L52.9041 98.918L54.3692 100.383L61.4826 93.2698L60.0174 91.8047Z" fill="currentColor" />
    <path d="M54.1739 75.6094H44.114V77.6814H54.1739V75.6094Z" fill="currentColor" />
    <path d="M54.3719 52.8786L52.9067 54.3438L60.0201 61.4571L61.4853 59.9919L54.3719 52.8786Z" fill="currentColor" />
    <path d="M87.8249 46.0744L84.0679 55.4062L85.99 56.1801L89.7471 46.8483L87.8249 46.0744Z" fill="currentColor" />
    <path d="M106.175 62.9347L96.9192 66.875L97.7308 68.7815L106.987 64.8411L106.175 62.9347Z" fill="currentColor" />
    <path d="M97.8172 84.0194L97.043 85.9414L106.374 89.7001L107.148 87.7781L97.8172 84.0194Z" fill="currentColor" />
    <path d="M86.3888 96.97L84.4822 97.7812L88.421 107.038L90.3276 106.227L86.3888 96.97Z" fill="currentColor" />
    <path d="M67.2673 97.0822L63.5103 106.414L65.4324 107.188L69.1895 97.856L67.2673 97.0822Z" fill="currentColor" />
    <path d="M55.5614 84.4776L46.3054 88.418L47.117 90.3244L56.373 86.3841L55.5614 84.4776Z" fill="currentColor" />
    <path d="M46.8223 63.4804L46.0481 65.4023L55.3793 69.161L56.1535 67.239L46.8223 63.4804Z" fill="currentColor" />
    <path d="M64.8511 46.2743L62.9446 47.0859L66.885 56.3419L68.7915 55.5303L64.8511 46.2743Z" fill="currentColor" />
  </svg>,
  <svg key="fitout" xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="shrink-0 group-hover:text-theme-dark-green transition-colors duration-300 size-16 md:size-18 lg:size-30 2xl:size-38">
    <path d="M77.3557 73.5655H76.3549L0 36.7886L0.0232981 34.6887L76.3781 0H77.3557L153.28 35.7328V37.8327L77.3557 73.5655ZM3.23528 35.7676L76.8553 71.222L150.045 36.777L76.8437 2.33192L3.23528 35.7676Z" fill="currentColor" />
    <path d="M77.3557 99.8701H76.3549L0 63.0932L0.0232981 60.9933L76.3781 26.3047H77.3557L153.28 62.0375V64.1374L77.3557 99.8701ZM3.23528 62.0839L76.8553 97.5383L150.045 63.0932L76.8437 28.6482L3.23528 62.0839Z" fill="currentColor" />
    <path d="M77.3557 126.991H76.3549L0 90.2144L0.0232981 88.1144L76.3781 53.4258H77.3557L153.28 89.1586V91.2585L77.3557 126.991ZM3.23528 89.205L76.8553 124.659L150.045 90.2144L76.8437 55.7693L3.23528 89.205Z" fill="currentColor" />
    <path d="M77.3557 153.288H76.3549L0 116.511L0.0232981 114.411L76.3781 79.7227H77.3557L153.28 115.455V117.555L77.3557 153.288ZM3.23528 115.502L76.8553 150.956L150.045 116.511L76.8437 82.0662L3.23528 115.502Z" fill="currentColor" />
  </svg>,
  <svg key="workplace" xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="shrink-0 group-hover:text-theme-dark-green transition-colors duration-300 size-16 md:size-18 lg:size-30 2xl:size-38">
    <path d="M76.64 153.289C34.3849 153.289 0 118.902 0 76.6443C0 34.3869 34.3849 0 76.64 0C118.895 0 153.28 34.3869 153.28 76.6443C153.28 118.902 118.895 153.289 76.64 153.289ZM76.64 2.27803C35.6378 2.27803 2.2779 35.6398 2.2779 76.6443C2.2779 117.649 35.6378 151.011 76.64 151.011C117.642 151.011 151.002 117.649 151.002 76.6443C151.002 35.6398 117.642 2.27803 76.64 2.27803Z" fill="currentColor" />
    <path d="M76.6395 153.292C48.7011 153.292 25.979 130.568 25.979 102.628C25.979 74.6883 48.7011 51.9648 76.6395 51.9648C104.578 51.9648 127.3 74.6883 127.3 102.628C127.3 130.568 104.578 153.292 76.6395 153.292ZM76.6395 54.2429C49.9653 54.2429 28.2569 75.9526 28.2569 102.628C28.2569 129.304 49.9653 151.014 76.6395 151.014C103.314 151.014 125.022 129.304 125.022 102.628C125.022 75.9526 103.314 54.2429 76.6395 54.2429Z" fill="currentColor" />
    <path d="M76.6404 153.289C59.2828 153.289 45.1598 139.165 45.1598 121.807C45.1598 104.448 59.2828 90.3242 76.6404 90.3242C93.998 90.3242 108.121 104.448 108.121 121.807C108.121 139.165 93.998 153.289 76.6404 153.289ZM76.6404 92.5908C60.5356 92.5908 47.4377 105.69 47.4377 121.795C47.4377 137.901 60.5356 151 76.6404 151C92.7451 151 105.843 137.901 105.843 121.795C105.843 105.69 92.7451 92.5908 76.6404 92.5908Z" fill="currentColor" />
    <path d="M76.6404 153.286C69.932 153.286 64.4764 147.831 64.4764 141.122C64.4764 134.413 69.932 128.957 76.6404 128.957C83.3488 128.957 88.8044 134.413 88.8044 141.122C88.8044 147.831 83.3488 153.286 76.6404 153.286ZM76.6404 131.235C71.1849 131.235 66.7543 135.666 66.7543 141.122C66.7543 146.578 71.1849 151.008 76.6404 151.008C82.096 151.008 86.5265 146.578 86.5265 141.122C86.5265 135.666 82.096 131.235 76.6404 131.235Z" fill="currentColor" />
  </svg>,
];

const description = 'We provide integrated design and build solutions that combine architectural expertise with advanced technology. Our services are structured to support projects from early concept through execution ensuring clarity, efficiency, and high-quality outcomes at every stage.';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    const updateHeight = () => {
      const totalWidth = scroller.scrollWidth;
      const vw = window.innerWidth;
      const scrollDistance = Math.max(0, totalWidth - vw);
      section.style.height = `${window.innerHeight + scrollDistance}px`;
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    const ctx = gsap.context(() => {
      const totalWidth = scroller.scrollWidth;
      const vw = window.innerWidth;
      const scrollDistance = Math.max(0, totalWidth - vw);

      if (scrollDistance <= 0) return;

      gsap.to(scroller, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.services-fade', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-fade',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white w-full relative min-h-dvh">
      <div className="flex flex-col sticky top-0 h-dvh overflow-hidden">
        {/* Header */}
        <div className="flex px-4 md:px-8 pt-16 md:pt-[6.3rem] md:pb-8 lg:pb-8 flex-col gap-8 lg:gap-12">
          <div className="flex flex-col items-start gap-2 lg:gap-4 w-full md:max-w-150">
            <div>
              <div className="services-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                <span className="text-theme-dark-green font-nohemi text-xs leading-[120%] tracking-[0.03rem] uppercase">SERVICES</span>
              </div>
            </div>
            <div>
              <div className="services-fade" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                <div className="font-nohemi text-[1.75rem] leading-[100%] md:text-[2.2rem] lg:text-[2.625rem] md:leading-[110%] uppercase -indent-16 md:-indent-20 lg:-indent-24 ml-16 md:ml-20 lg:ml-24 text-white">
                  <p>Design <br />Meets Purpose</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white indent-16 text-sm leading-[130%] tracking-[0.035rem] uppercase font-nohemi block lg:hidden">
            <p>{description}</p>
          </div>
        </div>

        {/* Scrollable area */}
        <div className="grow flex flex-col lg:flex-row items-start lg:items-center overflow-hidden px-4 md:px-8 lg:pb-12">
          <div ref={scrollerRef} className="flex flex-col lg:flex-row items-start my-auto gap-8 lg:gap-[21rem] will-change-transform pr-6 lg:pr-24">
            <div className="text-white indent-16 min-w-[35rem] max-w-[35.5rem] text-sm leading-[130%] tracking-[0.035rem] uppercase font-nohemi pr-[5.5rem] hidden lg:block">
              <p>{description}</p>
            </div>

            <div className="flex items-end gap-6 lg:gap-12 relative">
              {services.map((service, i) => (
                <div key={service.number} className="group will-change-transform relative self-stretch">
                  <div className="flex flex-col justify-between gap-8 px-8 py-8 self-stretch h-full lg:py-12 border min-w-[20rem] md:min-w-[29rem] max-h-[21rem] md:max-h-[23rem] lg:max-h-[32.5rem] min-[1800px]:min-h-[33.75rem] transition-transform duration-500 service-card-special-styles">
                    <div className="flex items-start justify-between self-stretch gap-4">
                      <h3 className="text-white text-[1.125rem] lg:text-[1.75rem] leading-normal uppercase font-nohemi">{service.name}</h3>
                      {serviceSvgs[i]}
                    </div>
                    <div className="text-white font-inter text-sm lg:text-base font-light leading-[150%] tracking-[-0.022rem] uppercase line-clamp-4">
                      <p>{service.description}</p>
                    </div>
                    <a
                      href={service.link}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium relative rounded-none border-0 bg-transparent cursor-pointer w-fit leading-[131%] uppercase font-normal after:content-[''] after:absolute after:left-0 after:bottom-1.5 after:h-[1px] after:w-full after:bg-white after:transition-transform after:duration-500 after:ease-out after:scale-x-0 after:origin-left hover:after:scale-x-100 group-hover:after:scale-x-100 flex items-center gap-2 text-white"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-2.5">
                        <path d="M9.464 0C9.87962 0 10.214 0.334375 10.214 0.75V8.25C10.214 8.66562 9.87962 9 9.464 9C9.04837 9 8.714 8.66562 8.714 8.25V2.55937L1.27893 10.0594C0.985181 10.3531 0.510181 10.3531 0.219556 10.0594C-0.0710693 9.76562 -0.0741943 9.29375 0.216431 9L7.6515 1.5H1.96087C1.54525 1.5 1.21087 1.16562 1.21087 0.75C1.21087 0.334375 1.54525 0 1.96087 0H9.46087H9.464Z" fill="currentColor" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
