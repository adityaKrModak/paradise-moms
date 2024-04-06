import Navbar from "@/components/Common/Navbar";
import Hero from "@/components/Home/Hero";
import LocationComponent from "@/components/Common/LocationComponent";
import Features from "@/components/Home/Features";
import Banners from "@/components/Home/Banners";
import Testimonials from "@/components/Home/Testimonials";
import InstagramPhotos from "@/components/Home/FollowOnInstagram";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Banners />
      <Testimonials />
      <InstagramPhotos />
    </>
  );
}
