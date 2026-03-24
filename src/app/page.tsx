import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Symptoms from "@/components/Symptoms";
import WhyRecurs from "@/components/WhyRecurs";
import Treatments from "@/components/Treatments";
import DoctorProfile from "@/components/DoctorProfile";
import KeyConditions from "@/components/KeyConditions";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import ClinicMap from "@/components/ClinicMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Symptoms />
      <WhyRecurs />
      <Treatments />
      <DoctorProfile />
      <KeyConditions />
      <Testimonials />
      <FinalCTA />
      <ClinicMap />
      <Footer />
    </>
  );
}
