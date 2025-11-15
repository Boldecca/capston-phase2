import Hero from "@/components/Hero";
import FeaturedStories from "@/components/FeaturedStories";
import CTABanner from "@/components/CTABanner";
import FeaturesGrid from "@/components/FeaturesGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <FeaturedStories />
      <CTABanner />
    </>
  );
}
