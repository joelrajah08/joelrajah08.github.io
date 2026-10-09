import React from 'react';

export default function Timeline({ entries = [], id = 'leadership', title = 'Leadership & Experience' }) {
  return (
    <section id={id} className="section timeline-section">
      <h2>{title}</h2>
      <div className="timeline">
        {entries.map((e, idx) => (
          <div className="timeline-item" key={e.role + idx}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="timeline-role">{e.role}</h3>
                <div className="timeline-meta">
                  <span className="timeline-org">{e.org}</span>
                  {e.location && <span>{e.location}</span>}
                  {e.date && <span className="timeline-date">{e.date}</span>}
                </div>
              </div>
              <ul className="timeline-points">
                {e.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
