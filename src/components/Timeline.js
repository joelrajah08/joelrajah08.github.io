import React from 'react';

export default function Timeline({ entries = [] }) {
  return (
    <section id="leadership" className="section timeline-section">
      <h2>Leadership & Experience</h2>
      <div className="timeline">
        {entries.map((e, idx) => (
          <div className="timeline-item" key={e.role + idx}>
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="timeline-role">{e.role}</h3>
                <div className="timeline-meta">
                  <span className="timeline-org">{e.org}</span>
                  <span className="timeline-date">{e.date}</span>
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
