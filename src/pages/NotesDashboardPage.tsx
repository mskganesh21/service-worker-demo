import { Link } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { formatUpdatedAt } from '../utils/formatUpdatedAt'
import { noteBodyPreview, noteDisplayTitle } from '../utils/notePreview'

export function NotesDashboardPage() {
  const { notes } = useNotesContext()

  if (notes.length === 0) {
    return (
      <div className="dashboard-empty">
        <p className="dashboard-empty-title">No notes yet</p>
        <p className="dashboard-empty-text">
          Use <strong>Add note</strong> in the top right to create your first
          note.
        </p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-heading">All notes</h2>
      <ul className="note-card-grid">
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`} className="note-card">
              <p className="note-card-title">{noteDisplayTitle(note)}</p>
              <p className="note-card-body">{noteBodyPreview(note)}</p>
              <p className="note-card-meta">{formatUpdatedAt(note.updatedAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
