import { useEffect, useState } from "react";
import About from "./components/About.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Contact from "./components/Contact.jsx";
import CurrentFocus from "./components/CurrentFocus.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import TechStack from "./components/TechStack.jsx";
import VaidideaStrip from "./components/VaidideaStrip.jsx";

function readSavedTheme() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Browser storage can be disabled; system preference still provides a default.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function App() {
  const [theme, setTheme] = useState(readSavedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f8fb" : "#0b1020");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme remains active until this page is closed.
    }
  }, [theme]);

  useEffect(() => {
    const progress = document.querySelector(".progress-bar");
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div className="progress-bar" aria-hidden="true" />
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")} />
      <main id="main-content">
        <Hero />
        <About />
        <TechStack />
        <VaidideaStrip />
        <Projects />
        <CurrentFocus />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
