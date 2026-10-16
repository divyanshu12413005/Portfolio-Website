import { useReveal } from "../hooks/useReveal.js";

export default function About() {
  const reveal = useReveal();
  return (
    <section className={`section-shell about-grid ${reveal.className}`} id="about" ref={reveal.ref}>
      <div><p className="section-kicker">About</p><h2>Learning by building and sharing the work.</h2></div>
      <div className="about-copy">
        <p>I am a B.Tech student at IIIT Sonepat focused on software development and practical problem solving. Java, object-oriented programming, and data structures are the base I use as I build and improve projects.</p>
        <p>My recent work includes Spring Boot and REST API practice, Kotlin and Flutter app development, frontend projects, and Python data analysis with NumPy, Pandas, Matplotlib, Seaborn, and Plotly.</p>
      </div>
    </section>
  );
}
