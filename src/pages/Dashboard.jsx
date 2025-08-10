// src/pages/LandingPage.jsx
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contacts from "../components/Contacts";
import useScrollToHash from "../hooks/useScrollToHash";
import usePreserveScroll from "../hooks/usePreserveScroll";

export default function Dashboard() {
   useScrollToHash();
   usePreserveScroll();

  // Disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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
