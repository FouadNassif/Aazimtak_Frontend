import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sections from "../components/Sections";
import PoweredBy from "@/components/PowerBy";

export default function home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Sections />
      <PoweredBy/>
    </div>
  );
}
