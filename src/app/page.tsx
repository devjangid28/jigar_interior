import HeroSection from '@/components/HeroSection';
import AboutIntroSection from '@/components/AboutIntroSection';
import ProjectShowcaseSection from '@/components/ProjectShowcaseSection';
import ServicesSection from '@/components/ServicesSection';
import OurPeopleSection from '@/components/OurPeopleSection';
import ContactFormSection from '@/components/ContactFormSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <AboutIntroSection />
      <ProjectShowcaseSection />
      <ServicesSection />
      <OurPeopleSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
