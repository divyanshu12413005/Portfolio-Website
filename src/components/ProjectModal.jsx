import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const focusable = [...document.querySelectorAll(".project-modal-panel a[href], .project-modal-panel button:not([disabled])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  return createPortal(
    <div className="project-modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-modal-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-description">
        <button className="dialog-close" ref={closeRef} type="button" onClick={onClose} aria-label="Close project details">×</button>
        <p className="project-category">{project.category}</p>
        <h2 id="project-modal-title">{project.title}</h2>
        {project.status && <p className="dialog-status">{project.status}</p>}
        <p className="dialog-description" id="project-modal-description">{project.fullDesc}</p>
        <div className="tag-row" aria-label="Technologies">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.role && <p className="dialog-role">My role: {project.role}</p>}
        <div className="dialog-links">{project.links.map((link) => <a className={link.type === "live" ? "primary-btn" : "secondary-btn"} key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>
      </section>
    </div>,
    document.body,
  );
}
