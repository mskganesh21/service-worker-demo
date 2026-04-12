import { useCallback, useEffect, useRef, useState } from 'react'
import type { Note } from '../types/note'
import { isNoteNew } from '../utils/noteMeta'

type NoteEditorProps = {
  note: Note
  onChange: (title: string, body: string) => void
  onDelete: () => void
}

export function NoteEditor({ note, onChange, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const noteRef = useRef(note)
  const debounceTimerRef = useRef<number | null>(null)

  useEffect(() => {
    noteRef.current = note
  }, [note])

  const clearDebounce = useCallback(() => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
  }, [])

  const handlePrimaryAction = useCallback(() => {
    clearDebounce()
    const latest = noteRef.current
    if (isNoteNew(latest)) {
      onChange(title, body)
      return
    }
    if (title === latest.title && body === latest.body) return
    onChange(title, body)
  }, [title, body, onChange, clearDebounce])

  useEffect(() => {
    const scheduledForId = note.id
    clearDebounce()
    debounceTimerRef.current = window.setTimeout(() => {
      debounceTimerRef.current = null
      const latest = noteRef.current
      if (latest.id !== scheduledForId) return
      if (title === latest.title && body === latest.body) return
      onChange(title, body)
    }, 300)
    return () => {
      clearDebounce()
    }
  }, [title, body, note.id, onChange, clearDebounce])

  const primaryLabel = isNoteNew(note) ? 'Add' : 'Update'

  return (
    <div className="note-editor">
      <div className="note-editor-toolbar">
        <div className="note-editor-toolbar-actions">
          <button type="button" className="btn btn-primary" onClick={handlePrimaryAction}>
            {primaryLabel}
          </button>
        </div>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
      <label className="field">
        <span className="field-label">Title</span>
        <input
          className="field-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          autoComplete="off"
        />
      </label>
      <label className="field field--grow">
        <span className="field-label">Body</span>
        <textarea
          className="field-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note…"
          rows={12}
        />
      </label>
    </div>
  )
}
