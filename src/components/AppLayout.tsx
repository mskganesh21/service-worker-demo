import { Outlet, useNavigate } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { AppStatusPanel } from './AppStatusPanel'
import { Header } from './Header'
import { UpdateBanner } from './UpdateBanner'

export function AppLayout() {
  const { notes, isHydrated } = useNotesContext()
  const isOnline = useOnlineStatus()
  const navigate = useNavigate()
  const hasUpdate = false
  const serviceWorkerStatus = 'not-registered' as const

  const handleAddNote = () => {
    navigate('/notes/new')
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <Header onAddNote={handleAddNote} />
      <UpdateBanner visible={hasUpdate} onRefresh={handleRefresh} />
      <AppStatusPanel
        isOnline={isOnline}
        isHydrated={isHydrated}
        noteCount={notes.length}
        serviceWorkerStatus={serviceWorkerStatus}
        hasUpdate={hasUpdate}
      />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
