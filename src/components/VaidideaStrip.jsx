import { useReveal } from "../hooks/useReveal.js";

export default function VaidideaStrip() {
  const reveal = useReveal();
  return (
    <section className={`section-shell vaididea-strip ${reveal.className}`} id="vaididea" ref={reveal.ref} aria-labelledby="vaididea-title">
      <div><p className="section-kicker">CURRENTLY WORKING ON</p><h2 id="vaididea-title">Vaididea</h2><p>I am working on Vaididea, a healthcare technology platform.</p><p className="vaididea-role">My role: UI/UX design &amp; development</p></div>
      <a className="primary-btn" href="https://vaididea.in" target="_blank" rel="noopener noreferrer">Visit vaididea.in <span aria-hidden="true">↗</span></a>
    </section>
  );
}
