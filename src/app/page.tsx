import Navbar from "@/components/Navbar";
import Hero from "@/components/HomeScreen/Hero";
import Sections from "@/components/HomeScreen/Sections";
import PoweredBy from "@/components/PowerBy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Sections />
      <Footer />
      <PoweredBy />
    </div>
  );
}
