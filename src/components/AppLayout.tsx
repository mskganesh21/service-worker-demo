import { Outlet, useNavigate } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { useReachabilityStatus } from '../hooks/useReachabilityStatus'
import { useServiceWorkerStatus } from '../hooks/useServiceWorkerStatus'
import { AppStatusPanel } from './AppStatusPanel'
import { Header } from './Header'
import { UpdateBanner } from './UpdateBanner'

export function AppLayout() {
  const { notes, isHydrated } = useNotesContext()
  const isOnline = useOnlineStatus()
  const reachabilityStatus = useReachabilityStatus(isOnline)
  const { status: serviceWorkerStatus, hasUpdate, applyUpdate } = useServiceWorkerStatus()
  const navigate = useNavigate()

  const handleAddNote = () => {
    navigate('/notes/new')
  }

  const handleRefresh = () => {
    void applyUpdate()
  }

  return (
    <div className="app">
      <Header onAddNote={handleAddNote} />
      <UpdateBanner visible={hasUpdate} onRefresh={handleRefresh} />
      <AppStatusPanel
        isOnline={isOnline}
        reachabilityStatus={reachabilityStatus}
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
