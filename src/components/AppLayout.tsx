import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useNotesContext } from '../hooks/useNotesContext'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { useReachabilityStatus } from '../hooks/useReachabilityStatus'
import { useServiceWorkerStatus } from '../hooks/useServiceWorkerStatus'
import { AppStatusPanel } from './AppStatusPanel'
import { Header } from './Header'
import { UpdateBanner } from './UpdateBanner'

export function AppLayout() {
  const [showUpdatedNotice, setShowUpdatedNotice] = useState(() => {
    const marker = sessionStorage.getItem('sw-update-applied')
    if (!marker) return false
    sessionStorage.removeItem('sw-update-applied')
    return true
  })
  const { notes, isHydrated } = useNotesContext()
  const isOnline = useOnlineStatus()
  const reachabilityStatus = useReachabilityStatus(isOnline)
  const { status: serviceWorkerStatus, hasUpdate, applyUpdate } = useServiceWorkerStatus()
  const navigate = useNavigate()

  const handleAddNote = () => {
    navigate('/notes/new')
  }

  const handleRefresh = () => {
    sessionStorage.setItem('sw-update-applied', '1')
    void applyUpdate()
  }

  useEffect(() => {
    if (!showUpdatedNotice) return
    const timeoutId = window.setTimeout(() => {
      setShowUpdatedNotice(false)
    }, 5000)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showUpdatedNotice])

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
        showUpdatedNotice={showUpdatedNotice}
      />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
