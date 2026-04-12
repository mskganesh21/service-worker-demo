import { type ReactNode } from 'react'
import { useNotes } from '../hooks/useNotes'
import { NotesContext } from './NotesContext'

export function NotesProvider({ children }: { children: ReactNode }) {
  const value = useNotes()
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}
