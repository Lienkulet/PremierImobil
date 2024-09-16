'use client';
import Prefooter from "@/components/Prefooter";
import ApartmentSlider from "@/components/ApartmentsSlider";
import WorkProcess from "@/components/WorkProcess";
import Locations from "@/components/Locations";
import HomeHero from "@/components/HomeHero";
import Welcome from "@/components/Welcome";
import Numbers from "@/components/Numbers";
import Questions from "@/components/Questions";
import Testimonials from "@/components/Testimonials";

export default function Home() {

  return (
    <main className="bg-lightGrey flex flex-col gap-8">
      <HomeHero />
      <ApartmentSlider />
      <WorkProcess />
      <Locations />
      <Welcome />
      <Numbers />
      <Testimonials />
      <Prefooter />
      <Questions />
    </main>
  );
}
