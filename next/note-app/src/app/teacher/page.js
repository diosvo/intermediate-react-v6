import ClientPage from './clientPage';
import fetchNotes from './fetchNotes';

export default async function TeacherView() {
  const initialNotes = await fetchNotes();

  return <ClientPage initialNotes={initialNotes} fetchNotes={fetchNotes} />;
}
