import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <h3 className="project-title">{project.title}</h3>
        <div className="project-tech">
          {(project.tech || []).map((t, i) => (
            <span className="tech-badge" key={i}>{t}</span>
          ))}
        </div>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-actions">
        {project.link && (
          <a className="project-link" href={project.link} target="_blank" rel="noreferrer">View</a>
        )}
        {project.github && (
          <a className="project-link muted" href={project.github} target="_blank" rel="noreferrer">Source</a>
        )}
      </div>
    </article>
  );
}
