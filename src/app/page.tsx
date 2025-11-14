import Hero from "@/components/Hero";
import FeaturedStories from "@/components/FeaturedStories";
import CTABanner from "@/components/CTABanner";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedStories />
      <Gallery />
      <CTABanner />
    </>
  );
}
