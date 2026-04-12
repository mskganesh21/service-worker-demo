import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

export function useNotesContext() {
  const ctx = useContext(NotesContext)
  if (!ctx) {
    throw new Error('useNotesContext must be used within NotesProvider')
  }
  return ctx
}
