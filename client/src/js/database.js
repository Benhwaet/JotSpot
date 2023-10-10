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
  const db = await openDB('jot', 1);
  const tx = db.transaction('jot', 'readwrite');
  const store = tx.objectStore('jot');
  const request = store.put({ id:1 , value: content });

  const result = await request;
  console.log('🚀 - data saved to the database', result);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jot', 1);
  const tx = db.transaction('jot', 'readonly');
  const store = tx.objectStore('jot');
  const request = store.get(1);
 
  const result = await request;
  request
  ? console.log('🚀 - data retrieved from the database', result.value)
  : console.log('🚀 - no data found in the database');
};

initdb();
