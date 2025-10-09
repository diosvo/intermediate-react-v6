import { useDeferredValue, useState } from 'react';
import DisplayImage from './DisplayImange';
import Slider from './Slider';

export default function App() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [constrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const deferredBlur = useDeferredValue(blur);
  const deferredBrightness = useDeferredValue(brightness);
  const deferredContrast = useDeferredValue(constrast);
  const deferredSaturate = useDeferredValue(saturate);
  const deferredSepia = useDeferredValue(sepia);

  const filterStyle = `
    blur(${deferredBlur}px)
    brightness(${deferredBrightness}%)
    contrast(${deferredContrast}%)
    saturate(${deferredSaturate}%)
    sepia(${deferredSepia}%)
  `;

  return (
    <div className="app">
      <h1>Deferred Value</h1>
      <DisplayImage filterStyle={filterStyle} />
      <ul>
        <Slider
          name="blur"
          max={20}
          value={blur}
          deferred={deferredBlur}
          onChange={(e) => setBlur(e.target.value)}
        />
        <Slider
          name="brightness"
          max={200}
          value={brightness}
          deferred={deferredBrightness}
          onChange={(e) => setBrightness(e.target.value)}
        />
        <Slider
          name="contrast"
          max={200}
          value={constrast}
          deferred={deferredContrast}
          onChange={(e) => setContrast(e.target.value)}
        />
        <Slider
          name="saturate"
          max={200}
          value={saturate}
          deferred={deferredSaturate}
          onChange={(e) => setSaturate(e.target.value)}
        />
        <Slider
          name="sepia"
          max={100}
          value={sepia}
          deferred={deferredSepia}
          onChange={(e) => setSepia(e.target.value)}
        />
      </ul>
    </div>
  );
}
