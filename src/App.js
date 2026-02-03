import './App.css';
import ProjectCard from './components/ProjectCard';
import projects from './data/projects';

function App() {
  return (
    <div className="portfolio">
      <header className="hero">
        <div className="container">
          <h1>Joel Rajah</h1>
          <p className="tagline">Frontend developer — React & JavaScript</p>
          <p className="cta">
            I'm Joel. I build accessible, performant web apps. Browse a few
            projects below or get in touch.
          </p>
          <a className="btn" href="#projects">See projects</a>
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
