import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  ["home", "Home"], ["about", "About"], ["skills", "Skills"],
  ["vaididea", "Vaididea"], ["projects", "Projects"],
  ["learning", "Learning"], ["contact", "Contact"],
];

export default function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (current) setActive(current.target.id);
    }, { rootMargin: "-24% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Divyanshu Singh Chauhan home">
        <span>DS</span><strong>Divyanshu</strong>
      </a>
      <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="visually-hidden">{menuOpen ? "Close" : "Open"} navigation</span>
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>
      <nav id="primary-navigation" className={menuOpen ? "menu-open" : ""} aria-label="Main navigation">
        {links.map(([id, label]) => (
          <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
