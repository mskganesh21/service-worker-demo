import { createContext } from 'react'
import type { useNotes } from '../hooks/useNotes'

export type NotesStore = ReturnType<typeof useNotes>

export const NotesContext = createContext<NotesStore | null>(null)
