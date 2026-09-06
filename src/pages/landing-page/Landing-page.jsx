// import TopBar from "../compenants/TopBar";

import Hero from "./Hero";
import InfoStrip from "./InfoStrip";
import CategorySection from "./CategorySection";
import PromoSection from "./PromoSection";
import NewArrivalsSection from "./NewArrivalsSection";
import Newsletter from "./Newsletter";

// import { useRef } from "react";
import AboutSection from "@/pages/landing-page/AboutSection";

export default function LandingPage() {
  // const newArrivalsRef = useRef(null);
  // const aboutUsRef = useRef(null);
  // const scrollToNewArrivals = () => {
  //   newArrivalsRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // const scrollToAboutUs = () => {
  //   aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <div className="min-h-screen bg-primary text-footer overflow-x-clip">
      {/* <TopBar /> */}
      <main>
        <Hero />
        <InfoStrip />
        <CategorySection />
        <NewArrivalsSection />

        <AboutSection />
        <PromoSection />
        <Newsletter />
      </main>
    </div>
  );
}
