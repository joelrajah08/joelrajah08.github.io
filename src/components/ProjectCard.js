import React, { useState } from 'react';
import Modal from './Modal';

function TechIcon({ name }) {
  // Inline SVGs for a couple common techs; fall back to text badge
  const key = name.toLowerCase();
  if (key === 'react') {
    return (
      <svg className="tech-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <g stroke="#61dafb" strokeWidth="1.2" fill="none">
          <ellipse cx="12" cy="12" rx="9.5" ry="4.5"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="9.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="9.5" transform="rotate(120 12 12)"/>
        </g>
        <circle cx="12" cy="12" r="1.4" fill="#61dafb" />
      </svg>
    );
  }
  if (key === 'javascript' || key === 'js') {
    return (
      <svg className="tech-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="2" fill="#f7df1e" />
        <path d="M9.3 17.2l1-0.63c0.2 0.33 0.39 0.6 0.83 0.6 0.42 0 0.69-0.17 0.69-0.83V10h1.42v6.9c0 1.5-0.88 2.2-2.16 2.2-1.18 0-1.86-0.6-2.19-1.33zM15.8 17.47l1-0.58c0.3 0.5 0.68 0.87 1.35 0.87 0.56 0 0.92-0.28 0.92-0.67 0-0.46-0.36-0.62-0.97-0.89l-0.33-0.14c-0.95-0.4-1.58-0.9-1.58-1.95 0-0.97 0.74-1.71 1.9-1.71 0.82 0 1.41 0.28 1.84 1l-0.99 0.64c-0.22-0.39-0.46-0.54-0.85-0.54-0.39 0-0.64 0.25-0.64 0.54 0 0.38 0.25 0.54 0.83 0.78l0.33 0.14c1.12 0.48 1.78 1.05 1.78 2.18 0 1.25-0.98 1.74-2.3 1.74-1.29 0-2.12-0.6-2.52-1.4z" fill="#000"/>
      </svg>
    );
  }
  return null;
}

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="project-card" onClick={() => setOpen(true)} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') setOpen(true); }} role="button" aria-pressed="false">
        <div className="project-top">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-tech">
            {(project.tech || []).map((t, i) => (
              <span className="tech-badge" key={i} title={t}>
                <span className="tech-inline">{TechIcon({ name: t })}</span>
                <span className="tech-text">{t}</span>
              </span>
            ))}
          </div>
        </div>

        <p className="project-desc">{project.description}</p>

        <div className="project-actions">
          {project.link && (
            <a className="project-link" href={project.link} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>View</a>
          )}
          {project.github && (
            <a className="project-link muted" href={project.github} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>Source</a>
          )}
        </div>
      </article>

      {open && (
        <Modal title={project.title} onClose={() => setOpen(false)}>
          <p style={{marginTop:0}}>{project.description}</p>
          <h4>Tech</h4>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {(project.tech||[]).map((t,i)=>(
              <span key={i} className="tech-badge">{TechIcon({name:t})} <span style={{marginLeft:6}}>{t}</span></span>
            ))}
          </div>
          <div style={{marginTop:12}}>
            {project.link && <a className="project-link" href={project.link} target="_blank" rel="noreferrer">Open project</a>}
            {project.github && <a className="project-link muted" style={{marginLeft:8}} href={project.github} target="_blank" rel="noreferrer">View source</a>}
          </div>
        </Modal>
      )}
    </>
  );
}
