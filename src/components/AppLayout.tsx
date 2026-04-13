import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './Header'

export function AppLayout() {
  const navigate = useNavigate()

  const handleAddNote = () => {
    navigate('/notes/new')
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
