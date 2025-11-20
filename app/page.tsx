import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturedProjects />
      <CTASection />
    </div>
  );
}
