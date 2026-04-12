import { Outlet, useNavigate } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { Header } from './Header'

export function AppLayout() {
  const { addNote } = useNotesContext()
  const navigate = useNavigate()

  const handleAddNote = () => {
    const id = addNote()
    navigate(`/notes/${id}`)
  }

  return (
    <div className="app">
      <Header onAddNote={handleAddNote} />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
