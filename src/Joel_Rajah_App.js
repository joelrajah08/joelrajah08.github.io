import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectCard from './components/ProjectCard';
import projects from './data/projects';
import Timeline from './components/Timeline';
import experience from './data/experience';
import activities from './data/activities';
import HeroBanner from './components/HeroBanner';
import SectionBackground from './components/SectionBackground';
import CircuitNavigation from './components/CircuitNavigation';

const navigation = [
  ['home', 'Home'],
  ['about', 'About'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['leadership', 'Experience'],
  ['projects', 'Projects'],
  ['activities', 'Activities'],
  ['contact', 'Contact'],
];

function revealSection(section) {
  if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = section.querySelectorAll('.surface-card, .card-points li');
  items.forEach((item, index) => {
    item.classList.add('reveal-item');
    item.style.setProperty('--reveal-delay', `${Math.min(90 + index * 70, 580)}ms`);
  });
  section.classList.remove('is-revealing');
  window.requestAnimationFrame(() => {
    // Flush the removed animation before replaying an already-visible section.
    void section.offsetWidth;
    section.classList.add('is-revealing');
  });
}

function App() {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) revealSection(entry.target);
        else entry.target.classList.remove('is-revealing');
      });
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    document.querySelectorAll('main .section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
      <SectionBackground activeSection={activeSection} />
      <header className="site-nav" role="banner" ref={navRef}>
        <div className="container nav-inner">
          <div className="brand">Joel Rajah</div>
          <CircuitNavigation entries={navigation} activeSection={activeSection || 'home'} onNavigate={id => {
            const section = document.getElementById(id);
            const bounds = section.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) revealSection(section);
          }} />
          <div className="status">
            <span className="status-dot" aria-hidden="true"></span>
            <span className="status-label">Open to work</span>
          </div>
        </div>
      </header>
      <HeroBanner />

      <main className="content-sections">
        <section id="about" className="section about">
          <span className="section-label" aria-hidden="true">{'// about'}</span>
          <h2 className="section-heading">About</h2>
          <div className="section-body surface-card">
            <p>
              Currently a Computer Engineering student at New York University, focused on machine learning and intelligent systems, but what really drives me is seeing true human ideas come to life. At some point, I stopped being satisfied with just understanding concepts and started chasing the moment where something I built actually works in the real world. That shift is what pushed me to develop things like a real-time facial recognition system and to keep going deeper into how these systems are designed and applied.
            </p>
            <p>
              Professionally, I am interested in the intersection of AI, software engineering, and product development, where ideas move beyond theory and become real, usable systems. I enjoy going deep into how things work, whether that's understanding models, systems, or the full process behind building something from start to finish.
            </p>
            <p>
              At the same time, I value being part of something bigger than just technical work. Through my involvement in organizations like NSBE and the Indo-Caribbean Student Association, I stay connected to communities that are often underrepresented in tech, because creating a more inclusive space is part of how I approach this field. As I continue to grow, I'm looking for opportunities and people that challenge me, expand how I think, and allow me to build work that has real impact.
            </p>
          </div>
        </section>

        <section id="education" className="section">
          <span className="section-label" aria-hidden="true">{'// education'}</span>
          <h2 className="section-heading">Education</h2>
          <div className="section-body education-entries">
            <div className="surface-card">
              <h3 className="card-title">New York University Tandon School of Engineering</h3>
              <p>B.S. Computer Engineering · <span className="date-label">Class of 2029</span></p>
              <p>Brooklyn, New York</p>
            </div>
            <div className="surface-card">
              <h3 className="card-title">Dr. Ronald E. McNair Academic High School</h3>
              <p className="date-label">Class of 2025</p>
              <p>Jersey City, New Jersey</p>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <span className="section-label" aria-hidden="true">{'<skills />'}</span>
          <h2 className="section-heading">Skills</h2>

          <div className="section-body content-grid skills-grid">
            <div className="skills-architecture" aria-label="Technical skills architecture stack, highest layer first">
              <h3 className="card-title">Technical</h3>
              {[
                ['AI / ML', ['Python']],
                ['Software', ['HTML', 'CSS', 'React']],
                ['Embedded / Systems', []],
                ['Hardware', ['CAD']],
              ].map(([layer, skills]) => (
                <div className="architecture-layer surface-card" key={layer}>
                  <h4>{layer}</h4>
                  <div className="skill-pills">
                    {skills.map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}
                  </div>
                </div>
              ))}
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
          <span className="section-label" aria-hidden="true">{'// projects'}</span>
          <h2 className="section-heading">Projects</h2>
          <div className="section-body content-grid grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <Timeline entries={activities} id="activities" title="Activities" />

        <section id="contact" className="section contact">
          <span className="section-label" aria-hidden="true">{'// contact'}</span>
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
          <small>Computer Engineering Student — NYU Tandon • New York City, New York</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
