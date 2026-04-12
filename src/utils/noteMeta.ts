import type { Note } from '../types/note'

/** True until the first successful save (created and updated timestamps still match). */
export function isNoteNew(note: Note): boolean {
  return note.updatedAt === note.createdAt
}
