'use client';

import { useEffect, useState } from 'react';

export default function ClientPage({ fetchNotes, initialNotes }) {
  const [notes, setNotes] = useState(initialNotes ?? []);

  useEffect(() => {
    const interval = setInterval(async () => {
      let since;

      if (notes.length > 0) {
        since = notes[notes.length - 1]?.id ?? null;
      }

      const newNotes = await fetchNotes(since);
      setNotes([...notes, ...newNotes]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Teacher's View</h1>
      <ul>
        {notes.map(({ id, from_user, to_user, note }) => (
          <li key={id}>
            <fieldset>
              <h2>
                from: {from_user} | to: {to_user}
              </h2>
              <p>{note}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
