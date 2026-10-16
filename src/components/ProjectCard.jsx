export default function ProjectCard({ project, onOpen }) {
  const contents = (
    <>
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
