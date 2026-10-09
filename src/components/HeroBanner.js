import { headshot } from '../data/photos';
import CircuitBoard from './CircuitBoard';
import TerminalLine from './TerminalLine';

export default function HeroBanner() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-name">
      <CircuitBoard />
      <div className="container hero-layout">
        <div className="portrait-frame">
          {headshot ? (
            <img className="headshot" src={`${process.env.PUBLIC_URL}/${headshot.src}`} alt="Joel Rajah" width="240" height="240" fetchPriority="high" />
          ) : (
            <div className="portrait-initials" aria-label="Joel Rajah">JR</div>
          )}
          <div className="portrait-orbit" aria-hidden="true"><span className="portrait-trail" /></div>
        </div>
        <div className="hero-copy">
          <h1 id="hero-name">Joel Rajah</h1>
          <TerminalLine />
          <h2>Computer Engineering Student @ NYU Tandon — New York City, New York</h2>
          <p>
            Computer Engineering student focused on applying an engineering mindset
            to design reliable systems, lead teams, and deliver measurable real-world impact.
          </p>
          <div className="hero-cta">
            <a className="btn btn-cta" href="#projects">View Projects</a>
            <a className="btn btn-cta" href="#contact">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
