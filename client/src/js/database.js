import { openDB } from 'idb';

const initdb = async () =>
  openDB('jot', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jot')) {
        console.log('jot database already exists');
        return;
      }
      db.createObjectStore('jot', { keyPath: 'id', autoIncrement: true });
      console.log('jot database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the ase');
  const jotDb = await openDB('jot', 1);
  const tx = jotDb.transaction('jot', 'readwrite');
  const store = tx.objectStore('jot');
  const request = store.add({ jot: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the base');
  const jotDb = await openDB('jot', 1);
  const tx = jotDb.transaction('jot', 'readonly');
  const store = tx.objectStore('jot');
  const request = store.getAll();
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result;
}

initdb();
