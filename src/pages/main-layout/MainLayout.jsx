import Footer from "../landing-page/Footer";
import NavBar from "../landing-page/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../scrollToTop/ScrollToTop";

export default function MainLayout() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-primary text-footer overflow-x-clip">
      <NavBar />
      <main>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
