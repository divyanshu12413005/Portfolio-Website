import { useCallback, useState } from "react";
import { projects } from "../data/projects.js";
import { useReveal } from "../hooks/useReveal.js";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";

const filters = ["All", "Backend", "Android", "Flutter", "Web", "Data", "Healthcare"];
const initialProjectCount = 6;
const filterKey = (value) => value.toLowerCase();

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const reveal = useReveal();
  const filteredProjects = projects.filter((project) => activeFilter === "all" || project.filters.includes(activeFilter));
  const visibleProjects = activeFilter !== "all" || showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialProjectCount);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section className={`section-shell projects-section ${reveal.className}`} id="projects" ref={reveal.ref} aria-labelledby="projects-title">
      <header className="projects-header">
        <div><p className="section-kicker">PROJECTS</p><h2 id="projects-title">Selected projects</h2></div>
        <a className="view-all-link" href="https://github.com/divyanshu12413005" target="_blank" rel="noopener noreferrer">View all on GitHub <span aria-hidden="true">↗</span></a>
      </header>
      <div className="filter-controls" role="group" aria-label="Filter projects">
        {filters.map((label) => {
          const key = filterKey(label);
          const selected = activeFilter === key;
          return <button className={`filter-btn${selected ? " active-filter" : ""}`} type="button" key={key} data-filter={key} aria-pressed={selected} onClick={() => { setActiveFilter(key); setShowAll(false); }}>{label}</button>;
        })}
      </div>
      <div className="project-grid" aria-live="polite">
        {visibleProjects.length === 0 ? (
          <div className="projects-empty-state" role="status">
            <p className="section-kicker">{activeFilter === "healthcare" ? "HEALTHCARE" : activeFilter.toUpperCase()}</p>
            <h3>Coming soon</h3>
            <p>New {activeFilter === "healthcare" ? "healthcare" : activeFilter} projects are on the way.</p>
            {activeFilter === "healthcare" && <a className="secondary-btn" href="https://vaididea.in" target="_blank" rel="noopener noreferrer">Explore Vaididea <span aria-hidden="true">↗</span></a>}
          </div>
        ) : visibleProjects.map((project) => (
          <ProjectCard key={`${project.id}-${activeFilter}`} project={project} onOpen={(event) => setSelectedProject({ project, opener: event.currentTarget })} />
        ))}
      </div>
      {activeFilter === "all" && filteredProjects.length > initialProjectCount && <button className="show-more-btn" type="button" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>{showAll ? "Show less" : "Show more"}</button>}
      <ProjectModal project={selectedProject?.project ?? null} onClose={closeModal} />
    </section>
  );
}
