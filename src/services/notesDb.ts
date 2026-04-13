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
    let settled = false
    const finishWithError = (error: Error) => {
      if (settled) return
      settled = true
      db.close()
      reject(error)
    }

    try {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const request = store.get(NOTES_KEY)

      request.onsuccess = () => {
        if (settled) return
        settled = true
        db.close()
        resolve(request.result)
      }

      request.onerror = () => {
        finishWithError(
          request.error ?? new Error('Failed to read notes from IndexedDB'),
        )
      }

      tx.onerror = () => {
        finishWithError(
          tx.error ?? new Error('IndexedDB transaction failed while reading notes'),
        )
      }

      tx.onabort = () => {
        finishWithError(new Error('IndexedDB transaction aborted while reading notes'))
      }
    } catch (error) {
      finishWithError(
        error instanceof Error ? error : new Error('Failed to read notes from IndexedDB'),
      )
    }
  })
}

export async function saveNotesToDb(notes: Note[]): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    let settled = false
    const finishWithError = (error: Error) => {
      if (settled) return
      settled = true
      db.close()
      reject(error)
    }

    try {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const request = store.put(notes, NOTES_KEY)

      request.onerror = () => {
        finishWithError(
          request.error ?? new Error('Failed to save notes to IndexedDB'),
        )
      }

      tx.oncomplete = () => {
        if (settled) return
        settled = true
        db.close()
        resolve()
      }

      tx.onerror = () => {
        finishWithError(
          tx.error ?? new Error('IndexedDB transaction failed while saving notes'),
        )
      }

      tx.onabort = () => {
        finishWithError(new Error('IndexedDB transaction aborted while saving notes'))
      }
    } catch (error) {
      finishWithError(
        error instanceof Error ? error : new Error('Failed to save notes to IndexedDB'),
      )
    }
  })
}
