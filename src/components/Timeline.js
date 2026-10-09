import React from 'react';

export default function Timeline({ entries = [], id = 'leadership', title = 'Leadership & Experience' }) {
  return (
    <section id={id} className="section timeline-section">
      <span className="section-label" aria-hidden="true">{`// ${id === 'leadership' ? 'leadership & experience' : id}`}</span>
      <h2 className="section-heading">{title}</h2>
      <div className="section-body timeline">
        {entries.map((e, idx) => {
          const logos = e.logos || (e.logo ? [{ src: e.logo, alt: `${e.org} logo` }] : []);
          return (
            <div className="timeline-item" key={e.role + idx}>
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-content surface-card organization-panel">
                {logos.length > 0 && (
                  <div className="organization-logos">
                    {logos.map(logo => <img className="organization-logo" key={logo.src} src={`${process.env.PUBLIC_URL}/${logo.src}`} alt={logo.alt} width="100" height="100" loading="lazy" />)}
                  </div>
                )}
                <div className="organization-details">
                  <div className="timeline-header">
                    <h3 className="timeline-role card-title">{e.role}</h3>
                    <div className="timeline-meta card-meta">
                      <span className="timeline-org">{e.org}</span>
                      {e.location && <span>{e.location}</span>}
                      {e.date && <span className="timeline-date">{e.date}</span>}
                    </div>
                  </div>
                  <ul className="card-points">
                    {e.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
