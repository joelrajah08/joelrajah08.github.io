import { useEffect, useRef, useState } from 'react';

export default function EmailRow({ label, email }) {
  const textRef = useRef(null);
  const timerRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  async function copy() {
    window.clearTimeout(timerRef.current);
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch { /* Fall back if clipboard permission is denied. */ }
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
      } catch { /* Select the visible address if both methods fail. */ }
      finally {
        textarea.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    if (copied) {
      setFeedback('Copied!');
      timerRef.current = window.setTimeout(() => setFeedback(''), 2000);
    } else {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setFeedback('Press Ctrl/Cmd+C to copy');
    }
  }

  return (
    <div className="contact-email-entry">
      <p className="contact-email-row"><span>{label}:</span> <span className="contact-email-address" ref={textRef}>{email}</span> <button className="contact-copy" type="button" onClick={copy} aria-label={`Copy ${label.toLowerCase()} email`}>Copy</button></p>
      <p className="contact-copy-feedback" role="status" aria-live="polite">{feedback}</p>
    </div>
  );
}
