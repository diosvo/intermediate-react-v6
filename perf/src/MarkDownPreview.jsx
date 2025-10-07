// A technical term describing when scrolling or rendering pauses and jumps, causing a stuttering or unsmooth visual experience in web interfaces
const JANK_DELAY = 100;

export default function MarkdownPreview({ render, options }) {
  const expensiveRender = () => {
    const start = performance.now();

    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <div>
      <h1>Last Render: {Date.now()}</h1>
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: render(options.text) }}
        style={{ color: options.theme }}
      ></div>
      {expensiveRender()}
    </div>
  );
}
