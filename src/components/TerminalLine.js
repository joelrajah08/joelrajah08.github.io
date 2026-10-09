import { useEffect, useState } from 'react';

const text = 'Computer Engineering @ NYU | Interested in ML & intelligent systems';

export default function TerminalLine() {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    function start() {
      window.clearInterval(timer);
      if (preference.matches) { setTyped(text); return; }
      let index = 0;
      setTyped('');
      timer = window.setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index >= text.length) window.clearInterval(timer);
      }, 35);
    }
    function onPreferenceChange() {
      if (preference.matches) { window.clearInterval(timer); setTyped(text); }
    }
    start();
    preference.addEventListener('change', onPreferenceChange);
    return () => { window.clearInterval(timer); preference.removeEventListener('change', onPreferenceChange); };
  }, []);
  return (
    <p className="terminal-line" data-typing={typed.length < text.length}>
      <span className="visually-hidden">&gt; {text}</span>
      <span className="terminal-reserve" aria-hidden="true">&gt; {text} ▍</span>
      <span className="terminal-visual" aria-hidden="true"><span className="terminal-prompt">&gt;</span> {typed}<span className="terminal-cursor">▍</span></span>
    </p>
  );
}
