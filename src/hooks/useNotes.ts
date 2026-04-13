import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { Note } from '../types/note'
import { loadNotesFromDb, saveNotesToDb } from '../services/notesDb'

type NotesState = {
  notes: Note[]
}

type NotesAction =
  | { type: 'hydrate'; notes: Note[] }
  | { type: 'add'; note: Note }
  | { type: 'update'; id: string; title: string; body: string }
  | { type: 'delete'; id: string }

function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'hydrate':
      return {
        notes: action.notes,
      }
    case 'add':
      return {
        notes: [action.note, ...state.notes],
      }
    case 'update': {
      const now = Date.now()
      return {
        notes: state.notes.map((n) =>
          n.id === action.id
            ? { ...n, title: action.title, body: action.body, updatedAt: now }
            : n,
        ),
      }
    }
    case 'delete':
      return {
        notes: state.notes.filter((n) => n.id !== action.id),
      }
    default:
      return state
  }
}

const initialState: NotesState = { notes: [] }

function isValidNote(value: unknown): value is Note {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.body === 'string' &&
    typeof candidate.createdAt === 'number' &&
    Number.isFinite(candidate.createdAt) &&
    typeof candidate.updatedAt === 'number' &&
    Number.isFinite(candidate.updatedAt)
  )
}

function parseStoredNotes(raw: unknown): Note[] {
  if (!Array.isArray(raw)) return []
  return raw.filter(isValidNote)
}

export function useNotes() {
  const [state, dispatch] = useReducer(notesReducer, initialState)
  const [isHydrated, setIsHydrated] = useState(false)

  const notes = state.notes

  useEffect(() => {
    let isCancelled = false

    void loadNotesFromDb()
      .then((stored) => {
        if (isCancelled) return
        const parsed = parseStoredNotes(stored)
        dispatch({ type: 'hydrate', notes: parsed })
      })
      .catch(() => {
        if (isCancelled) return
        dispatch({ type: 'hydrate', notes: [] })
      })
      .finally(() => {
        if (!isCancelled) {
          setIsHydrated(true)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    void saveNotesToDb(notes).catch(() => {
      // Ignore write failures for now; in-memory editing should still work.
    })
  }, [notes, isHydrated])

  const getNote = useCallback(
    (id: string) => notes.find((n) => n.id === id) ?? null,
    [notes],
  )

  const addNote = useCallback((title: string, body: string): string => {
    const id = crypto.randomUUID()
    const now = Date.now()
    const note: Note = {
      id,
      title,
      body,
      createdAt: now,
      updatedAt: now,
    }
    dispatch({ type: 'add', note })
    return id
  }, [])

  const updateNote = useCallback((id: string, title: string, body: string) => {
    dispatch({ type: 'update', id, title, body })
  }, [])

  const deleteNote = useCallback((id: string) => {
    dispatch({ type: 'delete', id })
  }, [])

  return useMemo(
    () => ({
      notes,
      isHydrated,
      getNote,
      addNote,
      updateNote,
      deleteNote,
    }),
    [notes, isHydrated, getNote, addNote, updateNote, deleteNote],
  )
}
