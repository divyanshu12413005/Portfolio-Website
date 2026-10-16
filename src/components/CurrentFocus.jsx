import { useReveal } from "../hooks/useReveal.js";

const focusAreas = [
  { number: "01", title: "DSA with Java", description: "Arrays, strings, recursion, sorting, binary search, linked lists, stacks, and problem solving." },
  { number: "02", title: "Backend with Spring Boot", description: "REST APIs, backend structure, MongoDB, Spring Security, and JWT authentication." },
  { number: "03", title: "Data & mobile apps", description: "Python data analysis and visualization, plus Kotlin Android development and Flutter." },
];

export default function CurrentFocus() {
  const reveal = useReveal();
  return (
    <section className={`section-shell focus-section ${reveal.className}`} id="learning" ref={reveal.ref} aria-labelledby="focus-title">
      <header className="section-heading"><p className="section-kicker">CURRENT FOCUS</p><h2 id="focus-title">What I am improving now</h2></header>
      <div className="focus-grid">{focusAreas.map((area) => <article className="focus-card" key={area.number}><span className="focus-number" aria-hidden="true">{area.number}</span><h3>{area.title}</h3><p>{area.description}</p></article>)}</div>
    </section>
  );
}
