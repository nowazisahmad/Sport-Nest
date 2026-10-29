import Banner from "@/components/home/Banner";
import PopularSports from "@/components/home/PopularSports";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularSports />
      <FeaturedFacilities />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}
