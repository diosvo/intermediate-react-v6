import { marked } from 'marked';
import { useCallback, useEffect, useMemo, useState } from 'react';

import MarkdownPreview from './MarkDownPreview';
import markdownContent from './markdownContent';

export default function App() {
  const [text, setText] = useState(markdownContent);
  const [time, setTime] = useState(Date.now());
  const [theme, setTheme] = useState('green');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Without hooks, "Last Render" in Preview would update every second
  // Because they point to different memory locations, so even if their contents are the same, they are distinct objects with different references
  const options = useMemo(
    () => ({
      text,
      theme,
    }),
    [text, theme]
  );
  const render = useCallback((text) => marked.parse(text), [text]);
  // Equal to: useMemo(() => (text) => marked.parse(text), [text]); -- Any type

  return (
    <div className="app">
      <h1>Perf with React</h1>
      <h2>Current Time: {time}</h2>
      <label htmlFor="theme">
        Choose a theme
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="peru">Peru</option>
        </select>
      </label>
      <div className="markdown">
        <textarea
          className="markdown-editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <MarkdownPreview render={render} options={options} />
      </div>
    </div>
  );
}
