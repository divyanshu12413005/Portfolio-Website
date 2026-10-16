import { useState } from "react";
import { skillGroups } from "../data/skills.js";
import { useReveal } from "../hooks/useReveal.js";

export default function TechStack() {
  const [openGroup, setOpenGroup] = useState(skillGroups[0].id);
  const reveal = useReveal();

  return (
    <section className={`section-shell skills-section ${reveal.className}`} id="skills" ref={reveal.ref} aria-labelledby="skills-title">
      <div className="section-heading"><p className="section-kicker">Tech Stack</p><h2 id="skills-title">Tools and technologies</h2></div>
      <div className="skills-layout" aria-label="Technology categories">
        {skillGroups.map((group) => {
          const expanded = openGroup === group.id;
          const panelId = `skill-panel-${group.id}`;
          return (
            <article className={`skill-group${expanded ? " is-open" : ""}`} key={group.id}>
              <h3>
                <button className="skill-toggle" id={`skill-toggle-${group.id}`} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenGroup(expanded ? null : group.id)}>
                  <span className="skill-icon" aria-hidden="true">{group.icon}</span>
                  <span className="skill-heading">{group.category}</span>
                  <span className="skill-count">{group.skills.length} skills</span>
                  <span className="skill-chevron" aria-hidden="true">⌄</span>
                </button>
              </h3>
              <div className="skill-panel" id={panelId} role="region" aria-labelledby={`skill-toggle-${group.id}`} aria-hidden={!expanded} inert={!expanded}>
                <div className="skill-panel-inner"><div className="chip-row">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
