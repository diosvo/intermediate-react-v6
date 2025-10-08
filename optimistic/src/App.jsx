import { useEffect, useOptimistic, useState, useTransition } from 'react';

export default function App() {
  const [isPending, startTransition] = useTransition();
  const [thoughts, setThoughts] = useState([]);
  const [thought, setThought] = useState('');
  const [optimisticThoughts, addOptimisticThoughts] = useOptimistic(
    thoughts,
    (oldThoughts, newThought) => [newThought, ...oldThoughts]
  );

  async function postDeepThouhgt() {
    startTransition(async () => {
      addOptimisticThoughts(`${thought} (Loading...)`);
      setThought('');
      const response = await fetch('/thoughts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thought }),
      });

      if (!response.ok) {
        alert('This thought was not deep enough. Do better.');
        return;
      }

      const { thoughts: newThoughts } = await response.json();

      setThoughts(newThoughts);
    });
  }

  useEffect(() => {
    fetch('/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughts(data));
  }, []);

  return (
    <div className="app">
      <h1>Deep Thoughts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postDeepThouhgt();
        }}
      >
        <label htmlFor="thought">What's on your mind?</label>
        <textarea
          name="thought"
          id="thought"
          rows={5}
          cols={3}
          value={thought}
          disabled={isPending}
          onChange={(e) => setThought(e.target.value)}
        />
        <button type="submit">Direct my thoughts into the aether</button>
      </form>
      <ul>
        {optimisticThoughts.map((thought, index) => (
          <li key={index}>{thought}</li>
        ))}
      </ul>
    </div>
  );
}
