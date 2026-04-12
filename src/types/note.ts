export type Note = {
  id: string
  title: string
  body: string
  /** Set once when the note is created; unchanged on edits. */
  createdAt: number
  updatedAt: number
}
