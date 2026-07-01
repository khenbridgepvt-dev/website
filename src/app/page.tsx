import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import ConceptSection from "@/components/ConceptSection";
import AboutSection from "@/components/AboutSection";
import DestinationsSection from "@/components/TrustedByMarquee";
import WhyChooseUs from "@/components/LovedByPeople";
import ServiceHighlights from "@/components/ProjectsPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <ConceptSection />
        <AboutSection />
        <DestinationsSection />
        <WhyChooseUs />
        <ServiceHighlights />
      </main>
      <Footer />
    </>
  );
}
