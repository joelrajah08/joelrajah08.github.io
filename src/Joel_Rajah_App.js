import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectCard from './components/ProjectCard';
import projects from './data/projects';
import Timeline from './components/Timeline';
import experience from './data/experience';
import activities from './data/activities';
import HeroBanner from './components/HeroBanner';

const navigation = [
  ['about', 'About'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['leadership', 'Experience'],
  ['projects', 'Projects'],
  ['activities', 'Activities'],
  ['contact', 'Contact'],
];

function App() {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sections = navigation.map(([id]) => document.getElementById(id)).filter(Boolean);
    let observer;
    let frame;
    let navHeight = 0;

    function updateActiveSection() {
      frame = undefined;
      const activationLine = navHeight + (window.innerHeight - navHeight) * 0.25;
      const visible = sections.filter(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.bottom > navHeight && bounds.top < window.innerHeight;
      });
      if (!visible.length) {
        setActiveSection(null);
        return;
      }
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const aboveLine = visible.filter(section => section.getBoundingClientRect().top <= activationLine);
      const current = atBottom ? visible[visible.length - 1] : aboveLine[aboveLine.length - 1] || visible[0];
      setActiveSection(current.id);
    }

    function scheduleUpdate() {
      if (frame === undefined) frame = window.requestAnimationFrame(updateActiveSection);
    }

    function measureNavigation() {
      navHeight = navRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
      if (observer) observer.disconnect();
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(scheduleUpdate, {
          rootMargin: `-${navHeight}px 0px 0px 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        });
        sections.forEach(section => observer.observe(section));
      }
      scheduleUpdate();
    }

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measureNavigation) : null;
    if (resizeObserver) resizeObserver.observe(navRef.current);
    measureNavigation();
    // Scroll updates also handle long sections and the last short section at the page bottom.
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', measureNavigation);
    return () => {
      if (observer) observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', measureNavigation);
      document.documentElement.style.removeProperty('--nav-height');
    };
  }, []);

  return (
    <div className="portfolio">
      <header className="site-nav" role="banner" ref={navRef}>
        <div className="container nav-inner">
          <div className="brand">Joel Rajah</div>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {navigation.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="status">
            <span className="status-dot" aria-hidden="true"></span>
            <span className="status-label">Open to work</span>
          </div>
        </div>
      </header>
      <HeroBanner />

      <main className="container">
        <section id="about" className="section about">
          <h2 className="section-heading">About</h2>
          <div className="section-body surface-card">
            <p>
              I am a Computer Engineering student from Jersey City, New Jersey.
              I study at New York University Tandon School of Engineering, Class of 2029.
              My projects span real-time face recognition, embedded game controllers, and software-to-hardware interfaces.
              I also bring experience in nonprofit web development, civic leadership, and campus community initiatives.
            </p>
          </div>
        </section>

        <section id="education" className="section">
          <h2 className="section-heading">Education</h2>
          <div className="section-body surface-card">
            <h3 className="card-title">New York University Tandon School of Engineering</h3>
            <p>B.S. Computer Engineering · Class of 2029</p>
            <p>Brooklyn, New York</p>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <h2 className="section-heading">Skills</h2>

          <div className="section-body content-grid skills-grid">
            <div className="skills-group surface-card">
              <h3 className="card-title">Technical</h3>
              <div className="skill-pills">
                <span className="skill-pill">Python</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">HTML</span>
                <span className="skill-pill">CSS</span>
                <span className="skill-pill">CAD</span>
                <span className="skill-pill">React</span>
              </div>
            </div>

            <div className="skills-group surface-card">
              <h3 className="card-title">Other</h3>
              <div className="skill-pills">
                <span className="skill-pill">Leadership</span>
                <span className="skill-pill">Public Speaking</span>
                <span className="skill-pill">Research Writing</span>
                <span className="skill-pill">Event Planning</span>
              </div>
            </div>

            <div className="skills-group surface-card">
              <h3 className="card-title">Languages</h3>
              <div className="skill-pills">
                <span className="skill-pill">English (Fluent)</span>
                <span className="skill-pill">Spanish</span>
              </div>
            </div>
          </div>
        </section>

        <Timeline entries={experience} />

        <section id="projects" className="section projects">
          <h2 className="section-heading">Projects</h2>
          <div className="section-body content-grid grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <Timeline entries={activities} id="activities" title="Activities" />

        <section id="contact" className="section contact">
          <h2 className="section-heading">Contact</h2>
          <div className="section-body surface-card">
            <p>Email: <a href="mailto:joelrajah82@gmail.com">joelrajah82@gmail.com</a></p>
            <p>Phone: <a href="tel:+12017053755">(201) 705-3755</a></p>
            <p>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/joelrajah" target="_blank" rel="noreferrer">
                linkedin.com/in/joelrajah
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© {new Date().getFullYear()} Joel Rajah</small>
          <br />
          <small>Computer Engineering Student — NYU Tandon • Jersey City, New Jersey</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
