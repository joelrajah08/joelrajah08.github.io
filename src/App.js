import './App.css';
import ProjectCard from './components/ProjectCard';
import projects from './data/projects';
import Timeline from './components/Timeline';
import experience from './data/experience';

function App() {
  return (
    <div className="portfolio">
      <header className="hero">
        <div className="container">
          <h1 className="hero-name">Joel Rajah</h1>
          <p className="hero-title">Computer Engineering Student @ University of Florida</p>
          <p className="hero-tagline">
            Building reliable engineering solutions, leading small teams, and delivering measurable impact through thoughtful software design.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#projects" aria-label="View Projects">View Projects</a>
            <a className="btn outline" href="#contact" aria-label="Contact Me">Contact Me</a>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="about" className="section about">
          <h2>About</h2>
          <p>
            I'm a software developer focusing on building responsive, user-
            friendly web applications. My primary tools are React, JavaScript,
            and modern CSS. I enjoy turning ideas into products with clean,
            maintainable code.
          </p>
        </section>

        <section id="skills" className="section skills-section">
          <h2>Skills</h2>

          <div className="skills-grid">
            <div className="skills-group">
              <h4>Technical</h4>
              <div className="skill-pills">
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">HTML</span>
                <span className="skill-pill">React</span>
              </div>
            </div>

            <div className="skills-group">
              <h4>Other</h4>
              <div className="skill-pills">
                <span className="skill-pill">Leadership</span>
                <span className="skill-pill">Public Speaking</span>
                <span className="skill-pill">Research Writing</span>
                <span className="skill-pill">Event Planning</span>
              </div>
            </div>

            <div className="skills-group">
              <h4>Languages</h4>
              <div className="skill-pills">
                <span className="skill-pill">English (Fluent)</span>
                <span className="skill-pill">Spanish</span>
              </div>
            </div>
          </div>
        </section>

        <Timeline entries={experience} />

        <section id="projects" className="section projects">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:joelrajah82@gmail.com">joelrajah82@gmail.com</a></p>
          <p>
            LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/joelrajah" target="_blank" rel="noreferrer">
              linkedin.com/in/joelrajah
            </a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <small>© {new Date().getFullYear()} Joel Rajah</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
