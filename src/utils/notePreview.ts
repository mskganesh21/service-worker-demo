import type { Note } from '../types/note'

export function noteDisplayTitle(note: Note): string {
  const t = note.title.trim()
  if (t) return t
  const firstLine = note.body.trim().split('\n')[0] ?? ''
  return firstLine || 'Untitled note'
}

export function noteBodyPreview(note: Note): string {
  const raw = note.body.trim()
  if (raw) return raw
  return 'No content yet'
}
