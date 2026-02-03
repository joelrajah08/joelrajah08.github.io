import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">Source</a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">Live</a>
        )}
      </div>
    </article>
  );
}
