import { useCallback } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { NoteEditor } from '../components/NoteEditor'

const NEW_NOTE_SEGMENT = 'new'

export function NoteEditPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const { notes, addNote, updateNote, deleteNote } = useNotesContext()
  const navigate = useNavigate()

  const isCreate = noteId === NEW_NOTE_SEGMENT
  const note = !isCreate && noteId ? notes.find((n) => n.id === noteId) : undefined

  const handleSaveNew = useCallback(
    (title: string, body: string) => {
      addNote(title, body)
      navigate('/', { replace: true })
    },
    [addNote, navigate],
  )

  const handleCancelNew = useCallback(() => {
    navigate('/', { replace: true })
  }, [navigate])

  const handleSaveEdit = useCallback(
    (title: string, body: string) => {
      if (!noteId) return
      updateNote(noteId, title, body)
      navigate('/', { replace: true })
    },
    [noteId, updateNote, navigate],
  )

  const handleCancelEdit = useCallback(() => {
    navigate('/', { replace: true })
  }, [navigate])

  const handleDelete = useCallback(() => {
    if (!noteId) return
    deleteNote(noteId)
    navigate('/', { replace: true })
  }, [noteId, deleteNote, navigate])

  if (!noteId) {
    return <Navigate to="/" replace />
  }

  if (isCreate) {
    return (
      <div className="edit-page">
        <div className="edit-page-toolbar">
          <Link to="/" className="link-back">
            ← All notes
          </Link>
        </div>
        <div className="edit-page-surface">
          <NoteEditor
            mode="create"
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          />
        </div>
      </div>
    )
  }

  if (!note) {
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
          mode="edit"
          note={note}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
