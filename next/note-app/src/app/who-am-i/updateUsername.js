'use server';

import { redirect } from 'next/navigation';
import { AsyncDatabase } from 'promised-sqlite3';

export default async function updateUsername(formData) {
  console.log('Update username called', formData);

  const username = formData.get('username');
  const id = formData.get('id');

  if (!username || !id) {
    throw new Error('No!!!');
  }

  const db = await AsyncDatabase.open('./notes.db');
  await db.run('UPDATE users SET name = ? WHERE id = ?', [username, id]);
  redirect('/');
}
