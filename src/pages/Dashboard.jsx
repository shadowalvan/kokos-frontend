// src/pages/LandingPage.jsx
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contacts from "../components/Contacts";
import useScrollToHash from "../hooks/useScrollToHash";
import usePreserveScroll from "../hooks/usePreserveScroll";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
   useScrollToHash();
   usePreserveScroll();
   const location = useLocation();

  // Disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: 'auto'})
  }, [location.pathname]);

  return (
    <div className="bg-t">
      <Navbar />
      <main>
        <Contacts id="contacts" />
      </main>
      <Footer />
    </div>
  );
}
