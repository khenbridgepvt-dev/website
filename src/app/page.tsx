import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SectionPlaceholder from "@/components/SectionPlaceholder";

const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"), {
  loading: () => <SectionPlaceholder className="min-h-[400px] bg-background" />,
});

const ConceptSection = dynamic(() => import("@/components/ConceptSection"), {
  loading: () => <SectionPlaceholder className="min-h-[480px] bg-background" />,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <SectionPlaceholder className="min-h-[400px]" />,
});

const DestinationsSection = dynamic(
  () => import("@/components/TrustedByMarquee"),
  {
    loading: () => <SectionPlaceholder className="min-h-[320px] bg-background" />,
  },
);

const WhyChooseUs = dynamic(() => import("@/components/LovedByPeople"), {
  loading: () => <SectionPlaceholder className="min-h-[360px] bg-background" />,
});

const ServiceHighlights = dynamic(() => import("@/components/ProjectsPreview"), {
  loading: () => <SectionPlaceholder className="min-h-[400px] bg-background" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <SectionPlaceholder className="min-h-[200px] bg-indigo" />,
});

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
