import { useEffect, useRef, useState } from 'react';
import TerminalLine from './TerminalLine';
import ContactForm from './ContactForm';

const email = 'joelrajah82@gmail.com';
const icons = {
  Email: 'M3 6H25V22H3ZM3 6L14 15L25 6',
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
  const external = !href.startsWith('mailto:');
  return <a className="contact-port" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{contents}</a>;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const resetTimer = useRef(null);
  const emailRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(sectionRef.current);
    return () => { observer.disconnect(); window.clearTimeout(resetTimer.current); };
  }, []);
  async function copyEmail() {
    window.clearTimeout(resetTimer.current);
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch { /* Try the legacy method if clipboard access is denied. */ }
    if (!copied) {
      const previousFocus = document.activeElement;
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.readOnly = true;
      textarea.setAttribute('aria-hidden', 'true');
      textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
      document.body.appendChild(textarea);
      try {
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, email.length);
        copied = document.execCommand('copy');
      } catch { /* Keep the visible email available for manual copying. */ }
      finally {
        textarea.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    if (copied) {
      setFeedback('Copied!');
      resetTimer.current = window.setTimeout(() => setFeedback(''), 2000);
    } else {
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setFeedback('Press Ctrl/Cmd+C to copy');
    }
  }
  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <span className="section-label" aria-hidden="true">{'// contact'}</span>
      <TerminalLine text="establish_connection --with Joel" enabled={started} />
      <h2 className="section-heading">Contact</h2>
      <div className="section-body surface-card contact-console">
        <p className="contact-invitation">Whether it's a project, an opportunity, or just a conversation about building things that matter, my inbox is open.</p>
        <p className="contact-location">Based in New York City, New York</p>
        <div className="contact-ports">
          <div className="contact-email-port">
            <Port label="Email" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} />
            <a className="contact-mail-app" href={`mailto:${email}`}>Open in mail app</a>
          </div>
          <Port label="LinkedIn" href="https://www.linkedin.com/in/joelrajah" />
          <Port label="GitHub" href="https://github.com/joelrajah08" />
          <Port label="Resume" href="resume/Joel-Rajah-Resume.pdf" />
        </div>
        <p className="contact-feedback" role="status" aria-live="polite">{feedback}</p>
        <p className="contact-email-row">Email: <a ref={emailRef} href={`mailto:${email}`}>{email}</a> <button className="contact-copy" type="button" onClick={copyEmail} aria-label="Copy email address">Copy</button></p>
        <p>School email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>Phone: <a href="tel:+12017053755">(201) 705-3755</a></p>
        <ContactForm />
      </div>
    </section>
  );
}
