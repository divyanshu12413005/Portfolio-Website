import { useReveal } from "../hooks/useReveal.js";
import { useTypewriter } from "../hooks/useTypewriter.js";
import TypingText from "./TypingText.jsx";

const focusSkills = ["Java", "Backend", "Android development"];

export default function Hero() {
  const reveal = useReveal();
  const focusText = useTypewriter(focusSkills, { reducedText: "Java · Backend · Android" });
  return (
    <section className={`hero section-shell ${reveal.className}`} id="home" ref={reveal.ref}>
      <div className="hero-copy">
        <a className="hero-project-badge" href="https://vaididea.in" target="_blank" rel="noopener noreferrer">
          <span className="status-dot" aria-hidden="true" />Currently building Vaididea <span aria-hidden="true">↗</span>
        </a>
        <h1><span>Building healthcare tech.</span><span className="hero-gradient-text">Learning backend &amp; Android.</span></h1>
        <TypingText />
        <p className="hero-text">B.Tech student at IIIT Sonepat. I work with Java, Spring Boot, Android and Python, and I share my projects and progress on GitHub.</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
          <a className="secondary-btn" href="https://github.com/divyanshu12413005" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="secondary-btn" href={`${import.meta.env.BASE_URL}Divyanshu-Singh-Chauhan-Resume.pdf`} target="_blank" rel="noopener noreferrer">View resume <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside className="profile-panel" aria-label="Profile summary">
        <img src={`${import.meta.env.BASE_URL}divyaimg.png`} alt="Divyanshu Singh Chauhan" />
        <div className="profile-heading"><h2>Divyanshu Singh Chauhan</h2><p>B.Tech · IIIT Sonepat</p></div>
        <ul className="quick-info">
          <li><span>Focus</span><strong><span className="visually-hidden">Java, Backend, Android development</span><span className="focus-typewriter" aria-hidden="true">{focusText}</span></strong></li>
          <li className="education-info"><span>Education</span><strong>CSE (DSA) · 2028</strong></li>
          <li><span>Location</span><strong>Ballia, Uttar Pradesh, India</strong></li>
        </ul>
      </aside>
    </section>
  );
}
