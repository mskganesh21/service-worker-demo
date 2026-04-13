import { useCallback, useMemo, useReducer } from 'react'
import type { Note } from '../types/note'

type NotesState = {
  notes: Note[]
}

type NotesAction =
  | { type: 'add'; note: Note }
  | { type: 'update'; id: string; title: string; body: string }
  | { type: 'delete'; id: string }

function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
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

export function useNotes() {
  const [state, dispatch] = useReducer(notesReducer, initialState)

  const notes = state.notes

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
      getNote,
      addNote,
      updateNote,
      deleteNote,
    }),
    [notes, getNote, addNote, updateNote, deleteNote],
  )
}
