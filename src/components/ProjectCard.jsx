import { useState } from "react";

export default function ProjectCard({ project, onOpen }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const contents = (
    <>
      <span className={`project-preview project-preview-${project.id}`}>
        {project.image && !imageUnavailable
          ? <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.imageAlt || `${project.title} project preview`} loading="lazy" onError={() => setImageUnavailable(true)} />
          : <span className="project-preview-placeholder" aria-hidden="true"><span className="preview-window"><span className="preview-dots">•••</span><span className="preview-title">{project.title}</span><span className="preview-category">{project.category}</span></span></span>}
      </span>
      <span className="project-category">{project.category}</span>
      <span className="project-card-title">{project.title}</span>
      <span className="project-description">{project.shortDesc}</span>
      <span className="tag-row" aria-label="Technologies">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</span>
      <span className="project-details-link">View details <span aria-hidden="true">→</span></span>
    </>
  );

  if (project.featured) {
    const liveLink = project.links.find((link) => link.type === "live");
    return (
      <article className="project-card featured-project project-filter-enter">
        <button className="project-open" type="button" aria-haspopup="dialog" aria-label={`View details for ${project.title}`} onClick={onOpen}>{contents}</button>
        {liveLink && <a className="featured-link" href={liveLink.url} target="_blank" rel="noopener noreferrer">Visit vaididea.in <span aria-hidden="true">↗</span></a>}
      </article>
    );
  }

  return <button className="project-card project-open project-filter-enter" type="button" aria-haspopup="dialog" aria-label={`View details for ${project.title}`} onClick={onOpen}>{contents}</button>;
}
