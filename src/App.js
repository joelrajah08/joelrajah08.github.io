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
          <p>
            Want to work together or have a question? Email me at{' '}
            <a href="mailto:joel@example.com">joel@example.com</a> or find me on{' '}
            <a href="https://github.com/joelrajah08" target="_blank" rel="noreferrer">GitHub</a>.
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
