import { useEffect, useRef, useState } from 'react';
import TerminalLine from './TerminalLine';
import EmailRow from './EmailRow';

const icons = {
  LinkedIn: 'M5 12V23M5 6V7M12 23V12M12 17C12 10 23 10 23 17V23',
  GitHub: 'M10 23C3 25 3 18 1 18M10 27V23C10 21 10 20 9 19C3 19 2 16 2 12C2 9 3 8 4 7L4 2L10 5C13 4 16 4 19 5L24 2V7C26 9 27 11 26 14C25 18 23 19 19 19C18 20 18 21 18 23V27',
  Resume: 'M7 2H18L24 8V26H7ZM18 2V8H24M11 14H20M11 19H20',
};

function Port({ label, href }) {
  const contents = <>
    <svg className="contact-branch" viewBox="0 0 100 44" aria-hidden="true">
      <path className="contact-wire" d="M0 2H100M50 2V38" />
      <path className="contact-wire-pulse" d="M0 2H50V38" pathLength="100" />
      <circle cx="50" cy="38" r="4" />
    </svg>
    <svg className="contact-port-icon" viewBox="-4 -4 36 36" aria-hidden="true">
      <rect className="contact-connector" x="-3" y="-3" width="34" height="34" rx="6" />
      <path d={icons[label]} />
    </svg>
    <span>{label}</span>
  </>;
  return <a className="contact-port" href={href} target="_blank" rel="noopener noreferrer">{contents}</a>;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <span className="section-label" aria-hidden="true">{'// contact'}</span>
      <TerminalLine text="establish_connection --with Joel" enabled={started} />
      <h2 className="section-heading">Contact</h2>
      <div className="section-body surface-card contact-console">
        <p className="contact-invitation">Whether it's a project, an opportunity, or just a conversation about building things that matter, my inbox is open.</p>
        <p className="contact-location">Based in New York City, New York</p>
        <div className="contact-ports">
          <Port label="LinkedIn" href="https://www.linkedin.com/in/joelrajah" />
          <Port label="GitHub" href="https://github.com/joelrajah08" />
          <Port label="Resume" href="resume/Joel-Rajah-Resume.pdf" />
        </div>
        <div className="contact-emails">
          <EmailRow label="Personal" email="joelrajah82@gmail.com" />
          <EmailRow label="School" email="jr7178@nyu.edu" />
        </div>
        <p>Phone: <a href="tel:+12017053755">(201) 705-3755</a></p>
      </div>
    </section>
  );
}
