import { useState } from 'react';
import DisplayImage from './DisplayImange';
import Slider from './Slider';

export default function App() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [constrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const filterStyle = `
    blur(${blur}px)
    brightness(${brightness}%)
    contrast(${constrast}%)
    saturate(${saturate}%)
    sepia(${sepia}%)
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
          deferred={blur}
          onChange={(e) => setBlur(e.target.value)}
        />
        <Slider
          name="brightness"
          max={200}
          value={brightness}
          deferred={brightness}
          onChange={(e) => setBrightness(e.target.value)}
        />
        <Slider
          name="contrast"
          max={200}
          value={constrast}
          deferred={constrast}
          onChange={(e) => setContrast(e.target.value)}
        />
        <Slider
          name="saturate"
          max={200}
          value={saturate}
          deferred={saturate}
          onChange={(e) => setSaturate(e.target.value)}
        />
        <Slider
          name="sepia"
          max={100}
          value={sepia}
          deferred={sepia}
          onChange={(e) => setSepia(e.target.value)}
        />
      </ul>
    </div>
  );
}
