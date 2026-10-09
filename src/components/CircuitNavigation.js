import { useEffect, useRef, useState } from 'react';

const symbols = {
  home: 'M5 20H14M14 10V30M21 14V26M21 20H35M10 7H18M14 3V11',
  about: 'M2 20H8L11 12L16 28L21 12L26 28L29 20H38',
  education: 'M2 20H16M16 9V31M24 9V31M24 20H38',
  skills: 'M10 10H30V30H10ZM15 4V10M25 4V10M15 30V36M25 30V36M4 15H10M4 25H10M30 15H36M30 25H36',
  leadership: 'M2 20H16M16 9V31M16 15L30 7M16 25L30 33M24 26L30 33L22 32',
  projects: 'M2 20H10M10 10L27 20L10 30ZM28 9V31M28 20H38M23 6L30 1M29 10L36 5',
  activities: 'M2 20H7C7 6 14 6 14 20C14 6 21 6 21 20C21 6 28 6 28 20C28 6 35 6 35 20H38',
  contact: 'M2 20H20M20 20V5M12 5L20 13L28 5M15 30H25M17 34H23M20 20V30',
};

export default function CircuitNavigation({ entries, activeSection, onNavigate }) {
  const viewport = useRef(null);
  const route = useRef(null);
  const links = useRef([]);
  const travelTimer = useRef(null);
  const frame = useRef(null);
  const pending = useRef(null);
  const [litSection, setLitSection] = useState(activeSection);
  const [pulse, setPulse] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const measure = () => setPositions(links.current.map(link => link.offsetLeft + link.offsetWidth / 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(route.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pending.current) setLitSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const link = links.current[entries.findIndex(([id]) => id === litSection)];
    if (!link) return;
    const container = viewport.current;
    const left = link.offsetLeft;
    if (left < container.scrollLeft || left + link.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: left - (container.clientWidth - link.offsetWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [litSection, entries]);

  useEffect(() => () => {
    window.clearTimeout(travelTimer.current);
    window.cancelAnimationFrame(frame.current);
  }, []);

  function navigate(event, id, index) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    onNavigate(id);
    window.clearTimeout(travelTimer.current);
    window.cancelAnimationFrame(frame.current);
    const from = positions[entries.findIndex(([value]) => value === litSection)] || positions[0];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || from === positions[index]) {
      pending.current = null;
      setPulse(null);
      setLitSection(id);
      return;
    }
    pending.current = id;
    setPulse({ from, to: from });
    frame.current = window.requestAnimationFrame(() => {
      frame.current = window.requestAnimationFrame(() => setPulse({ from, to: positions[index] }));
    });
    travelTimer.current = window.setTimeout(() => {
      pending.current = null;
      setLitSection(id);
      setPulse(null);
    }, 650);
  }

  const activeIndex = Math.max(0, entries.findIndex(([id]) => id === litSection));
  const start = positions[0] || 0;
  const end = positions[positions.length - 1] || 0;
  return (
    <nav className="circuit-navigation" aria-label="Primary navigation" ref={viewport}>
      <div className="circuit-route" ref={route}>
        <svg className="nav-wire" aria-hidden="true" focusable="false">
          <path className="nav-wire-base" d={`M${start} 27H${end}`} />
          <path className="nav-wire-progress" d={`M${start} 27H${positions[activeIndex] || start}`} />
          <path className="nav-current" d={`M${start} 27H${end}`} pathLength="100" />
          {pulse && <circle className="nav-transfer" cx="0" cy="27" r="4" style={{ transform: `translateX(${pulse.to}px)` }} />}
        </svg>
        {entries.map(([id, label], index) => (
          <a className="circuit-stop" href={`#${id}`} key={id} ref={element => { links.current[index] = element; }}
            aria-current={litSection === id ? 'location' : undefined} onClick={event => navigate(event, id, index)}>
            <svg className="nav-component" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path d={symbols[id]} /></svg>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
