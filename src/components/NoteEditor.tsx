import { useCallback, useState } from 'react'
import type { Note } from '../types/note'

type NoteEditorProps = {
  mode: 'create' | 'edit'
  /** Required when mode is 'edit'. */
  note?: Note
  onSave: (title: string, body: string) => void
  onCancel: () => void
  onDelete?: () => void
}

export function NoteEditor({ mode, note, onSave, onCancel, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(() => (mode === 'edit' && note ? note.title : ''))
  const [body, setBody] = useState(() => (mode === 'edit' && note ? note.body : ''))

  const handleSave = useCallback(() => {
    onSave(title, body)
  }, [onSave, title, body])

  const primaryLabel = mode === 'create' ? 'Save' : 'Update'

  return (
    <div className="note-editor">
      <div className="note-editor-toolbar">
        <div className="note-editor-toolbar-actions">
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            {primaryLabel}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
        {mode === 'edit' && onDelete ? (
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        ) : null}
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
