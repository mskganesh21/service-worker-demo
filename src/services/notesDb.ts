import type { Note } from '../types/note'

const DB_NAME = 'offline-notes-db'
const DB_VERSION = 1
const STORE_NAME = 'kv'
const NOTES_KEY = 'notes'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to open IndexedDB'))
    }
  })
}

export async function loadNotesFromDb(): Promise<unknown> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(NOTES_KEY)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error ?? new Error('Failed to read notes from IndexedDB'))
    }

    tx.oncomplete = () => {
      db.close()
    }
  })
}

export async function saveNotesToDb(notes: Note[]): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.put(notes, NOTES_KEY)

    tx.oncomplete = () => {
      db.close()
      resolve()
    }

    tx.onerror = () => {
      reject(tx.error ?? new Error('Failed to save notes to IndexedDB'))
    }
  })
}
