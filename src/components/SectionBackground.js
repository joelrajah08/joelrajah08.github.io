import { useEffect, useState } from 'react';
import CircuitBoard from './CircuitBoard';
import { sectionPhotos } from '../data/photos';

export default function SectionBackground({ activeSection }) {
  const desiredScene = ['skills', 'projects'].includes(activeSection)
    ? 'pcb' : sectionPhotos[activeSection] ? activeSection : 'base';
  const [visited, setVisited] = useState([]);
  const [loaded, setLoaded] = useState([]);
  const [visibleScene, setVisibleScene] = useState('base');

  useEffect(() => {
    if (sectionPhotos[desiredScene]) {
      setVisited(previous => previous.includes(desiredScene) ? previous : [...previous, desiredScene]);
    }
  }, [desiredScene]);

  useEffect(() => {
    const photos = sectionPhotos[desiredScene];
    // Keep the prior scene until every image in the next scene has actually loaded.
    if (!photos || photos.every(src => loaded.includes(src))) setVisibleScene(desiredScene);
  }, [desiredScene, loaded]);

  function markLoaded(src) {
    setLoaded(previous => previous.includes(src) ? previous : [...previous, src]);
  }

  return (
    <div className="section-background" aria-hidden="true">
      <div className={`background-scene background-pcb ${visibleScene === 'pcb' ? 'is-active' : ''}`}><CircuitBoard /></div>
      {Object.entries(sectionPhotos).map(([section, photos]) => (
        <div className={`background-scene ${visibleScene === section ? 'is-active' : ''}`} key={section} data-background={section}>
          {visited.includes(section) && photos.map((src, index) => (
            <img key={src} className={`background-photo ${photos.length > 1 ? `background-blend background-blend-${index}` : ''}`} src={`${process.env.PUBLIC_URL}/${src}`} alt="" decoding="async" onLoad={() => markLoaded(src)} />
          ))}
        </div>
      ))}
      <div className="background-overlay" />
    </div>
  );
}
