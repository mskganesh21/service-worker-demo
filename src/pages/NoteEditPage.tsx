import { useCallback } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { NoteEditor } from '../components/NoteEditor'

export function NoteEditPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const { notes, updateNote, deleteNote } = useNotesContext()
  const navigate = useNavigate()

  const note = noteId ? notes.find((n) => n.id === noteId) : undefined

  const handleUpdate = useCallback(
    (title: string, body: string) => {
      if (!noteId) return
      updateNote(noteId, title, body)
    },
    [noteId, updateNote],
  )

  const handleDelete = useCallback(() => {
    if (!noteId) return
    deleteNote(noteId)
    navigate('/', { replace: true })
  }, [noteId, deleteNote, navigate])

  if (!noteId || !note) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="edit-page">
      <div className="edit-page-toolbar">
        <Link to="/" className="link-back">
          ← All notes
        </Link>
      </div>
      <div className="edit-page-surface">
        <NoteEditor
          key={note.id}
          note={note}
          onChange={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
