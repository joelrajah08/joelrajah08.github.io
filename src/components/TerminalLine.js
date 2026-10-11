import { useEffect, useState } from 'react';

const bannerText = 'Dedicated to the service of humanity and the progress of society.';

export default function TerminalLine({ text = bannerText, enabled = true }) {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (!enabled) return;
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
  }, [text, enabled]);
  return (
    <p className="terminal-line" data-typing={typed.length < text.length}>
      <span className="visually-hidden">&gt; {text}</span>
      <span className="terminal-reserve" aria-hidden="true">&gt; {text} ▍</span>
      <span className="terminal-visual" aria-hidden="true"><span className="terminal-prompt">&gt;</span> {typed}<span className="terminal-cursor">▍</span></span>
    </p>
  );
}
